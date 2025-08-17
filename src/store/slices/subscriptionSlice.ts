'use client';
import * as Sentry from '@sentry/nextjs';
import mixpanel from 'mixpanel-browser';
import { toast } from 'sonner';
import { StateCreator } from 'zustand';
import { PaymentStatusData } from '@/types/payment.types';
import { trackEvent } from '@/utils/analytics';
import { env } from '../../env.mjs';
import { paymentService } from '../../services/payment/paymentService';
import { subscriptionService } from '../../services/subscription/subscriptionService';
import {
	ApiError,
	NavigateFunction,
	PaymentData,
	Plan,
	PlanDetails,
	RazorpayResponse,
	SubscriptionData,
	SubscriptionStoreState,
	UserData,
} from '../types/subscription.types';

const razorpayKeyId = env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

export interface SubscriptionSlice {
	// State
	plans: SubscriptionStoreState['plans'];
	promotions: SubscriptionStoreState['promotions'];
	subscriptionData: SubscriptionData | null;
	storeloading: SubscriptionStoreState['storeloading'];
	fetchLoading: SubscriptionStoreState['fetchLoading'];
	error: SubscriptionStoreState['error'];
	storeselectedIndex: SubscriptionStoreState['storeselectedIndex'];
	isSubscribed: SubscriptionStoreState['isSubscribed'];
	isRefundEligible: SubscriptionStoreState['isRefundEligible'];
	subscribedPlan: SubscriptionData[];
	promotionCode: SubscriptionStoreState['promotionCode'];
	planInterval: SubscriptionStoreState['planInterval'];
	paymentId: SubscriptionStoreState['paymentId'];
	subscribedUser: SubscriptionStoreState['subscribedUser'];
	redeemedVoucherCode: SubscriptionStoreState['redeemedVoucherCode'];
	planDetails: SubscriptionStoreState['planDetails'];
	userData: SubscriptionStoreState['userData'];
	paymentData: PaymentStatusData | null;
	paymentSuccessData: PaymentStatusData | null; // Add state for successful payment data
	selectedPlan: Plan | null; // Add selected plan storage
	subscriptionStatus: SubscriptionStoreState['subscriptionStatus'];

	// Actions
	setPlanDetails: (details: PlanDetails) => void;
	setUserData: (data: UserData) => void;
	getPlanDetails: () => PlanDetails | null;
	fetchPlanData: () => Promise<void>;
	setStoreSelectedIndex: (index: number) => Promise<void>;
	fetchSubscriptionStatus: (
		token: string,
		subscriptionStatus: boolean,
	) => Promise<{
		currentSubStatus: string | null;
		currentSubPlan: SubscriptionData | null;
	}>;
	fetchRefundStatus: (
		subscriptionId: string,
		token: string,
	) => Promise<boolean | null>;
	fetchPaymentStatus: (
		paymentId: string,
		token: string,
	) => Promise<PaymentStatusData | null>;
	initiateRazorpayPayment: (
		data: PaymentData,
		token: string,
		navigate: NavigateFunction,
		onPaymentCancelled?: () => void,
	) => Promise<void>;
	createSubscription: (
		planId: string,
		promotionCode: string,
		token: string,
		_navigate: NavigateFunction,
		onPaymentCancelled?: () => void,
	) => Promise<void>;
	createTrialSubscription: (
		token: string,
		navigate: NavigateFunction,
		partnerCode?: string,
		partnerName?: string,
	) => Promise<void>;
	cancelSubscription: (
		subscriptionId: string,
		refundStatus: boolean,
		token: string,
	) => Promise<void>;
	setRedeemedVoucherCode: (code: string) => void;
	loadRazorpayScript: () => Promise<boolean>;
	setSelectedPlan: (plan: Plan) => void; // Add method to set selected plan
	setPaymentSuccessData: (data: PaymentStatusData | null) => void; // Add method to set payment success data
}

export const createSubscriptionSlice: StateCreator<SubscriptionSlice> = (
	set,
	get,
) => ({
	// Initial state
	plans: [],
	promotions: null,
	subscriptionData: null,
	storeloading: true,
	fetchLoading: true,
	error: null,
	storeselectedIndex: 1,
	isSubscribed: '',
	isRefundEligible: false,
	subscribedPlan: [],
	promotionCode: '',
	planInterval: 0,
	paymentId: '',
	subscribedUser: false,
	redeemedVoucherCode: '',
	planDetails: null,
	userData: null,
	paymentData: null,
	paymentSuccessData: null, // Initialize payment success data as null
	selectedPlan: null, // Initialize selected plan as null
	subscriptionStatus: false,

	// Actions
	setPlanDetails: (details: PlanDetails) => set({ planDetails: details }),

	setUserData: (data: UserData) => set({ userData: data }),

	getPlanDetails: () => get().planDetails,

	fetchPlanData: async () => {
		try {
			// 🛜 Fetch plans and promotions simultaneously for performance
			const [plansResponse, promotionsResponse] = await Promise.all([
				subscriptionService.getPlans(),       // API call to fetch all pricing plans
				subscriptionService.getPromotions(),  // API call to fetch any active promotions
			]);

			// ✅ Safely extract plans array from the API response, or fallback to empty
			const plans = plansResponse?.data?.plans || [];

			// 📍 This will be the index of the selected plan (default is 0)
			let selectedIndex = 0;

			// 🧠 Only access localStorage on the client side (prevent SSR crash)
			const storedPrice =
				typeof window !== 'undefined' ? localStorage.getItem('selectedPrice') : null;

			// 🔢 Parse the stored price into a number if it exists
			const parsedPrice = storedPrice ? parseInt(storedPrice, 10) : null;

			// 🧹 Clear stored price immediately to avoid stale selection


			// 🔁 Map specific prices to corresponding billing intervals
			const priceToIntervalMap: Record<number, number> = {
				1299: 3,  // quarterly
				1999: 6,  // half-yearly
				2399: 12, // yearly
			};

			// 🔄 If the price exists and maps correctly, use that interval. Else default to 12 (yearly).
			const intervalToFind =
				parsedPrice && priceToIntervalMap[parsedPrice]
					? priceToIntervalMap[parsedPrice]
					: 12;

			// 🔍 Find a plan that matches the calculated interval (e.g., 12 for yearly)
			const matchIndex = plans.findIndex(plan => plan.interval === intervalToFind);

			// ✅ If a matching plan is found, use that index
			if (matchIndex !== -1) {
				selectedIndex = matchIndex;
				console.log(
					`✅ Found price from storage: ${parsedPrice ?? 'none'}, selectedIndex: ${selectedIndex}`
				);
				if (typeof window !== 'undefined') {
					setTimeout(() => {
						localStorage.removeItem('selectedPrice');
					}, 7000); // or 100ms for extra safety
				}

			} else {
				// ❌ If no matching interval, fallback to yearly plan or first available
				console.log(
					`❌ Interval ${intervalToFind} not matched with any plan. Fallback to yearly.`
				);
				selectedIndex = plans.findIndex(plan => plan.interval === 12) || 0;
			}

			// 🧠 Update Zustand store with fetched and computed values
			set({
				plans, // store all available plans
				promotions:
					promotionsResponse?.data && Array.isArray(promotionsResponse.data)
						? promotionsResponse.data
						: null, // only store promotions if it's a valid array
				storeloading: false, // mark loading as done
				storeselectedIndex: selectedIndex, // store the index of selected plan
				promotionCode: plans[selectedIndex]?.promotion?.code, // get the code for selected plan
				planInterval: plans[selectedIndex]?.interval, // save interval for UI handling
			} as Partial<SubscriptionStoreState>);
		} catch (err) {
			// 🧯 In case anything breaks — log the error and update state
			console.error('🔥 Error fetching data:', err);
			set({ error: err as Error, storeloading: false });
		}
	},

	setStoreSelectedIndex: async (index: number) => {
		set({ storeselectedIndex: index });
	},

	fetchSubscriptionStatus: async (
		token: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		subscriptionStatus: boolean,
	) => {
		try {
			set({ fetchLoading: true });
			const response =
				await subscriptionService.getSubscriptionStatus(token);
			console.log('Subscription status response:', response);
			Sentry.captureMessage('Fetched subscription status', {
				tags: { feature: 'get_subscription_status' },
				extra: { response },
			});

			if (response?.data) {
				const subscriptionData = response.data;
				set({
					subscriptionData,
					subscribedUser: true,
					fetchLoading: false,
					subscriptionStatus: false,
				});

				if (response.status === 'success') {
					if (
						subscriptionData.status === 'ACTIVE' ||
						subscriptionData.status === 'TRIAL'
					) {
						set({
							subscribedPlan: [subscriptionData],
							isSubscribed: 'ACTIVE',
							storeloading: false,
							subscriptionStatus: true,
						});
					} else if (subscriptionData.status === 'EXPIRED') {
						set({
							subscribedPlan: [subscriptionData],
							isSubscribed: 'CANCELLED',
							storeloading: false,
							subscriptionStatus: false,
						});
					}
					return {
						currentSubStatus: subscriptionData.status,
						currentSubPlan: subscriptionData,
					};
				}
			}

			set({ fetchLoading: false });
			return { currentSubStatus: null, currentSubPlan: null };
		} catch (error) {
			console.error('Error fetching subscription status:', error);
			set({ fetchLoading: false });

			return { currentSubStatus: null, currentSubPlan: null };
		}
	},

	fetchRefundStatus: async (subscriptionId: string, token: string) => {
		try {
			const response = await subscriptionService.getRefundEligibility(
				subscriptionId,
				token,
			);
			set({ isRefundEligible: response?.data?.isEligible });
			return response?.data?.isEligible;
		} catch (error) {
			console.error('Error fetching refund status:', error);
			Sentry.captureException(error, {
				tags: { feature: 'fetch_refund_status' },
				extra: {
					subscriptionId,
					token: token ? 'provided' : 'missing',
				},
			});
			return null;
		}
	},

	fetchPaymentStatus: async (paymentId: string, token: string) => {
		try {
			set({ fetchLoading: true });
			const response = await paymentService.getPaymentStatus(
				paymentId,
				token,
			);

			if (response?.data) {
				const paymentData = response.data;
				// Store payment data in general state
				set({
					paymentData,
					fetchLoading: false,
				});

				set({ paymentSuccessData: paymentData });

				return paymentData;
			}

			set({ fetchLoading: false });
			return null;
		} catch (error) {
			console.error('Error fetching payment status:', error);
			Sentry.captureException(error, {
				tags: { feature: 'fetch_payment_status' },
				extra: {
					paymentId,
					token: token ? 'provided' : 'missing',
				},
			});
			set({ fetchLoading: false });
			return null;
		}
	},

	initiateRazorpayPayment: async (
		data: PaymentData,
		token: string,
		navigate: NavigateFunction,
		onPaymentCancelled?: () => void,
	) => {
		const userData = get().userData;
		const options = {
			key: razorpayKeyId,
			order_id: data.subscriptionId,
			name: 'Tap Health',
			currency: 'INR',
			amount: data.nextBillingAmount ? data.nextBillingAmount / 100 : 0,
			description: 'Subscription Payment',
			prefill: userData
				? {
					contact: userData.phone,
				}
				: undefined,
			handler: async (response: RazorpayResponse) => {
				try {
					const verify_response = await paymentService.verifyPayment(
						{
							type: 'ONE_TIME',
							payload: {
								razorpay_order_id: response.razorpay_order_id,
								razorpay_payment_id:
									response.razorpay_payment_id,
								razorpay_signature: response.razorpay_signature,
							},
						},
						token,
					);
					if (verify_response.status !== 'success') {
						toast.error('Payment verification failed');
						Sentry.captureMessage('Payment verification failed', {
							level: 'warning',
							tags: { feature: 'razorpay_payment' },
							extra: {
								verify_response,
								userData,
								subscriptionId: data.subscriptionId,
							},
						});

						return;
					}
					// Store payment ID immediately so it's available
					set({ paymentId: response.razorpay_payment_id });

					// Get payment details using payment ID
					const paymentDetails = await get().fetchPaymentStatus(
						response.razorpay_payment_id,
						token,
					);
					console.log('Payment details:', paymentDetails);
					if (paymentDetails) {
						// Store successful payment data in state
						set({ paymentSuccessData: paymentDetails });
						// Register super properties in Mixpanel
						mixpanel.register({
							phone_number: userData?.phone || '',
							amount_paid: paymentDetails.amount
								? paymentDetails.amount / 100
								: 0,
							paid_by: paymentDetails.paymentMode || '',
							transaction_id: response.razorpay_payment_id || '',
							order_id: response.razorpay_order_id || '',
							card_network: paymentDetails.card?.network || '',
							card_last4: paymentDetails.card?.last4 || '',
							upi_details: paymentDetails.upi || null,
							payment_status: paymentDetails.status || '',
							payment_timestamp: new Date().toISOString(),
							plan_id: get().selectedPlan?.id || '',
							plan_interval: get().selectedPlan?.interval || 0,
							plan_isPromotional:
								get().selectedPlan?.isPromotional || false,
						});

						// Track payment success event with all available data
						trackEvent('dtx_paid_landing_payment_success', {
							phone_number: userData?.phone || '',
							amount_paid: paymentDetails.amount
								? paymentDetails.amount / 100
								: 0, // Convert from paise to rupees
							paid_by: paymentDetails.paymentMode || '',
							transaction_id: response.razorpay_payment_id || '',
							order_id: response.razorpay_order_id || '',
							card_details: paymentDetails.card
								? {
									network:
										paymentDetails.card.network || '',
									last4: paymentDetails.card.last4 || '',
								}
								: null,
							upi_details: paymentDetails.upi || null,
							payment_status: paymentDetails.status || '',
							payment_timestamp: new Date().toISOString(),
							plan_details:
								get().selectedPlan &&
									get().selectedPlan !== null
									? {
										id: get().selectedPlan?.id || '',
										interval:
											get().selectedPlan?.interval ||
											0,
										isPromotional:
											get().selectedPlan
												?.isPromotional || false,
									}
									: null,
							value: paymentDetails.amount
								? paymentDetails.amount / 100
								: 0,
							currency: 'INR',
						});

						// Navigate directly to success page with payment details
						// navigate('plans/success');
					} else {
						// Fallback to processing page if payment details aren't available yet
						// navigate('processing-page');
					}
					navigate('processing-page');
				} catch (error) {
					console.error('Payment Verification Error:', error);
					Sentry.captureException(error, {
						tags: { feature: 'razorpay_payment' },
						extra: {
							userData,
							subscriptionId: data.subscriptionId,
						},
					});
					const isFromV2 = localStorage.getItem('isFromV2plans') === 'true';
					if (isFromV2) {
						console.log(' Detected user came from V2 plans. Redirecting to /v2plans');
						navigate('v2plans');
						localStorage.removeItem('isFromV2plans');

						return;
					}
					const isFromV3 = localStorage.getItem('isFromV3plans') === 'true';
					if (isFromV3) {
						console.log('Detected user came from V3 plans. Redirecting to /v3plans');
						navigate('v3plans');
						localStorage.removeItem('isFromV3plans');
						return;
					}
					const isFromUpgradePlans = localStorage.getItem('isUpgradePlans') === 'true';
					if (isFromUpgradePlans) {
						console.log('Detected user came from V3 plans. Redirecting to /v3plans');
						navigate('upgrade-plans');
						localStorage.removeItem('isFromUpgradePlans');
						return;
					}

					navigate('plans');


				}
			},
			// Handle modal closing/payment cancellation
			modal: {
				ondismiss: function () {
					console.log('Payment modal closed or cancelled by user');
					// Track cancellation event
					trackEvent('dtx_paid_landing_payment_cancelled', {
						plan_details: get().selectedPlan
							? {
								id: get().selectedPlan?.id || '',
								interval: get().selectedPlan?.interval || 0,
								isPromotional:
									get().selectedPlan?.isPromotional ||
									false,
							}
							: null,
					});
					// Call the onPaymentCancelled callback if provided
					if (onPaymentCancelled) {
						onPaymentCancelled();
					}
					// Redirect back to plans page
					const isFromV2 = localStorage.getItem('isFromV2plans') === 'true';
					if (isFromV2) {
						console.log(' Detected user came from V2 plans. Redirecting to /v2plans');
						navigate('v2plans');
						localStorage.removeItem('isFromV2plans');
						return;
					}
					const isFromV3 = localStorage.getItem('isFromV3plans') === 'true';
					if (isFromV3) {
						console.log('Detected user came from V3 plans. Redirecting to /v3plans');
						navigate('v3plans');
						localStorage.removeItem('isFromV3plans');
						return;
					}
					const isFromUpgradePlans = localStorage.getItem('isUpgradePlans') === 'true';
					if (isFromUpgradePlans) {
						console.log('Detected user came from V3 plans. Redirecting to /v3plans');
						navigate('upgrade-plans');
						localStorage.removeItem('isFromUpgradePlans');
						return;
					}

					navigate('plans');
				},
				escape: true, // Allow ESC key to close the modal
			},
		};

		const razorpay = new window.Razorpay(options);
		razorpay.open();
	},

	createSubscription: async (
		planId: string,
		promotionCode: string,
		token: string,
		navigate: NavigateFunction,
		onPaymentCancelled?: () => void,
	) => {
		try {
			set({ storeloading: true });

			console.log('Creating subscription with planId:', planId);
			console.log('get().plans:', get().plans);
			// Store the selected plan before creating subscription
			const selectedPlan =
				get().plans.find(plan => plan.razorpayPlanId === planId) ||
				null;
			console.log('Selected plan:', selectedPlan);
			set({ selectedPlan });

			const response = await subscriptionService.createSubscription(
				planId,
				promotionCode,
				token,
			);
			if (!response?.data || response.status !== 'success') {
				toast.error('Failed to create subscription');
				return;
			}
			// set({sub})
			if (response.status === 'success') {
				toast.success('Subscription created successfully');
			}
			const isLoaded = await get().loadRazorpayScript();
			if (!isLoaded) {
				toast.error('Failed to load payment gateway');
				return;
			}

			// Create payment data from response with properly typed data
			const paymentData: PaymentData = {
				subscriptionId: response.data.subscription?.subscriptionId,
				nextBillingAmount: response.data.subscription.nextBillingAmount,
			};
			await get().initiateRazorpayPayment(
				paymentData,
				token,
				navigate,
				onPaymentCancelled,
			);
		} catch (error) {
			console.error('Subscription Creation Error:', error);
			Sentry.captureException(error, {
				tags: { feature: 'create_subscription' },
				extra: {
					planId,
					promotionCode,
					token: token ? 'provided' : 'missing',
				},
			});

			const apiError = error as ApiError;

			// Special handling for existing subscription error
			if (
				apiError?.response?.data?.message ===
				'An active or pending subscription already exists.'
			) {
				toast.error(
					'You already have an active or pending subscription.',
					{ style: { color: 'red' } },
				);
				// Set a short timeout to allow the toast to be seen before navigating
			} else {
				toast.error(
					apiError?.response?.data?.message ||
					'An error occurred while creating the subscription.',
					{ style: { color: 'red' } },
				);
			}
		} finally {
			set({ storeloading: false });
		}
	},

	createTrialSubscription: async (
		token: string,
		navigate: NavigateFunction,
		partnerCode = 'SINOCARE_CGM',
		partnerName?: string,
	) => {
		try {
			const response = await subscriptionService.createTrialSubscription(
				token,
				partnerCode,
			);

			if (response?.data) {
				set({ subscriptionData: response.data as SubscriptionData });

				if (partnerName) {
					// navigate(`/${partnerName}/success`);
				}
			}
		} catch (error) {
			const apiError = error as ApiError;
			toast.error(
				apiError?.response?.data?.message ||
				'An error occurred while creating the subscription.',
				{ style: { color: 'red' } },
			);
			Sentry.captureException(error, {
				tags: { feature: 'create_trial_subscription' },
				extra: {
					errorMessage:
						apiError?.response?.data?.message || 'Unknown error',
				},
			});
		} finally {
			set({ storeloading: false });
		}
	},

	cancelSubscription: async (
		subscriptionId: string,
		refundStatus: boolean,
		token: string,
	) => {
		try {
			await subscriptionService.cancelSubscription(
				subscriptionId,
				refundStatus,
				token,
			);
		} catch (error) {
			console.error('Error Cancelling status:', error);
			Sentry.captureException(error, {
				tags: { feature: 'cancel_subscription' },
			});
		}
	},

	setRedeemedVoucherCode: (code: string) => {
		set({ redeemedVoucherCode: code });
	},

	setSelectedPlan: (plan: Plan) => set({ selectedPlan: plan }),

	setPaymentSuccessData: (data: PaymentStatusData | null) =>
		set({ paymentSuccessData: data }),

	loadRazorpayScript: () => {
		return new Promise(resolve => {
			if (typeof window === 'undefined') {
				resolve(false);
				return;
			}

			if (window.Razorpay) {
				// Before resolving, set up a window event listener for page navigation/unload
				// This helps detect when a user navigates away during payment
				window.addEventListener(
					'beforeunload',
					() => {
						// When user is about to leave page during payment, record this as a likely cancellation
						if (document.querySelector('.razorpay-container')) {
							// If Razorpay container is present, user is likely abandoning payment
							try {
								// Store a flag in sessionStorage that payment was likely cancelled
								sessionStorage.setItem(
									'razorpay_payment_cancelled',
									'true',
								);
							} catch (e) {
								console.error(
									'Failed to set sessionStorage flag',
									e,
								);
							}
						}
					},
					{ once: true },
				);

				resolve(true);
				return;
			}

			const script = document.createElement('script');
			script.src = 'https://checkout.razorpay.com/v1/checkout.js';
			script.onload = () => {
				// After script loads, set up event listener for navigation/unload
				window.addEventListener(
					'beforeunload',
					() => {
						if (document.querySelector('.razorpay-container')) {
							try {
								sessionStorage.setItem(
									'razorpay_payment_cancelled',
									'true',
								);
							} catch (e) {
								console.error(
									'Failed to set sessionStorage flag',
									e,
								);
							}
						}
					},
					{ once: true },
				);

				resolve(true);
			};
			script.onerror = () => resolve(false);
			document.body.appendChild(script);
		});
	},
});
