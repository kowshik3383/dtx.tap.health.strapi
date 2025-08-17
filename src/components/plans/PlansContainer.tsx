/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErrorPopup } from '@/components/elements/ErrorPopup';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import { trackEvent } from '@/utils/analytics';
import { registerHigherIntentEvent } from '@/utils/registerIntentEvent';
// import { checkHigherIntentEvent } from '@/utils/registerIntentEvent';
import { Plan, Promotion } from './constants/types';
import { usePlans, usePromotion } from './hooks';
import { BuyButton, PlanCard, PromotionBanner } from './ui';
// Helper function for better logging
const logger = {
	info: (message: string, data?: unknown) => {
		console.info(`[PLANS_CONTAINER] ${message}`, data ? data : '');
	},
	warn: (message: string, data?: unknown) => {
		console.warn(`[PLANS_CONTAINER] ${message}`, data ? data : '');
	},
	error: (message: string, data?: unknown) => {
		console.error(`[PLANS_CONTAINER] ${message}`, data ? data : '');
	},
	debug: (message: string, data?: unknown) => {
		console.debug(`[PLANS_CONTAINER] ${message}`, data ? data : '');
	},
};

interface PlansContainerProps {
	isAuthenticated?: boolean;
	token?: string | null;
	navigate?: (path: string) => void;
	onPaymentInitiated?: () => void;
	onPaymentCancelled?: () => void;
}

const PlansContainer = ({
	isAuthenticated = false,
	token = null,
	navigate = () => { },
	onPaymentInitiated,
	onPaymentCancelled,
}: PlansContainerProps) => {
	const router = useRouter();
	const { login } = useAuth();
	const searchParams = useSearchParams();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [utmId, setUtmId] = useState<string>('');
	const [utmSource, setUtmSource] = useState<string>('');
	const [utmCampaign, setUtmCampaign] = useState<string>('');
	const [utmMedium, setUtmMedium] = useState<string>('');
	const [utmTerm, setUtmTerm] = useState<string>('');
	const [utmContent, setUtmContent] = useState<string>('');
	const [slug, setSlug] = useState<string>('');
	const {
		promotions,
		plans: storePlans,
		storeselectedIndex,
		createSubscription,
		storeloading,
		isSubscribed,
		subscriptionStatus,
		subscriptionData,
		fetchSubscriptionStatus,
	} = useSubscriptionStore();
	// Type cast the plans array to ensure compatibility
	const plans = storePlans as unknown as Plan[];
	const mobileNumber = localStorage.getItem('mobileNumber') || '';
	const { activePromotion, timeUntilEnd } = usePromotion(
		promotions as Promotion[] | null,
	);
	const { selectedIndex, setSelectedIndex, getPlanDescription } = usePlans();

	logger.debug('PlansContainer rendered', {
		isAuthenticated,
		tokenExists: !!token,
		plansCount: plans.length,
	});

	const selectedPlan = plans[storeselectedIndex] as Plan;
	// Send the data to Interakt for tracking
	// Handle subscription process
	// const interaktCall = async (mobileNumber: string) => {
	// 	await fetch('/api/interakt/create', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			mobileNumber: mobileNumber,
	// 			tag: 'SQL',
	// 		}),
	// 	});
	// };

	const zohoSqlCall = (
		mobileNumber: string,
		UTM_Campaign: string,
		UTM_Source: string,
		UTM_Medium: string,
		UTM_Id: string,
		UTM_Term: string,
		UTM_Content: string,
		slug: string,
	) => {
		fetch('/api/zoho/sql-lead', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mobileNumber,
				UTM_Campaign,
				UTM_Source,
				UTM_Medium,
				UTM_Id,
				UTM_Term,
				UTM_Content,
				tag: 'SQL',
				slug,
			}),
		});
	};

	const handleSubscribe = async () => {
		logger.info('Subscribe button clicked');
		console.log('in here');
		if (mobileNumber.length > 0) {
			console.log('Sending mobile number to Interakt', mobileNumber);
			// interaktCall(mobileNumber);
			zohoSqlCall(
				mobileNumber,
				utmCampaign,
				utmSource,
				utmMedium,
				utmId,
				utmTerm,
				utmContent,
				slug,
			);
		}
		// Track buy plan click event
		trackEvent('dtx_paid_landing_page_buy_plan_click', {
			selected_plan: {
				id: selectedPlan?.id,
				interval: selectedPlan?.interval,
				price:
					selectedPlan?.isPromotional &&
						activePromotion &&
						selectedPlan?.promotion?.discountedAmount
						? selectedPlan.promotion.discountedAmount / 100
						: selectedPlan?.item?.unitAmount / 100,
				isPromotional: selectedPlan?.isPromotional,
			},
			value: 50,
			currency: 'INR',
		});
		registerHigherIntentEvent('dtx_paid_landing_page_buy_plan_click');

		// If not authenticated, show login modal
		if (!isAuthenticated) {
			logger.warn('User not authenticated, showing login modal');
			setIsModalOpen(true);
			return;
		}

		// ✅ Allow purchase if ACTIVE & FREE
		if (
			subscriptionData?.status === 'ACTIVE' &&
			subscriptionData?.userTier === 'PLUS'
		) {
			// 🚪 Redirect to manage subscription for PLUS tier
			router.push(
				`/manage_subscription?cancellationRequested=${subscriptionData?.cancellationRequested}`,
			);
			return;
		}

		// Create new subscription - subscription status check already done at page level
		const plan = plans[storeselectedIndex] as Plan;

		if (!plan) {
			logger.error('No plan selected');
			return;
		}

		if (!token) {
			logger.error('Missing authentication token');
			return;
		}

		// Notify parent that payment is being initiated
		if (onPaymentInitiated) {
			onPaymentInitiated();
		}

		logger.info('Creating subscription for plan', {
			planId: plan.id,
			interval: plan.interval,
			isPromotional: plan.isPromotional,
		});

		const promotionCode = plan?.isPromotional ? plan?.promotion?.code : '';

		if (promotionCode) {
			logger.debug('Using promotion code', { promotionCode });
		}

		try {
			if (plan?.id) {
				await createSubscription(
					plan.id,
					promotionCode || '',
					token,
					(path: string) => navigate(path),
					onPaymentCancelled,
				);
				logger.info('Subscription creation initiated');
			} else {
				logger.error('Missing id');
			}
		} catch (error) {
			logger.error('Error creating subscription', error);

			// Check if error contains the specific message for existing subscription
			if (error && typeof error === 'object' && 'response' in error) {
				const apiError = error as {
					response?: { data?: { message?: string } };
				};
				if (
					apiError?.response?.data?.message ===
					'An active or pending subscription already exists.'
				) {
					setErrorMessage(
						'You already have an active or pending subscription. Please manage your subscription from the dashboard.',
					);
					setShowError(true);
				} else {
					setErrorMessage(
						apiError?.response?.data?.message ||
						'Failed to create subscription. Please try again later.',
					);
					setShowError(true);
				}
			} else {
				setErrorMessage(
					'Failed to create subscription. Please try again later.',
				);
				setShowError(true);
			}
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleLoginSuccess = async (token: string) => {
		if (token) {
			login(token);
			const mno = localStorage.getItem('mobileNumber');
			if (mno && mno.length > 0) {
				// Send the mobile number to Interakt for tracking
				// interaktCall(mno);
				zohoSqlCall(
					mobileNumber,
					utmCampaign,
					utmSource,
					utmMedium,
					utmId,
					utmTerm,
					utmContent,
					slug,
				);
			}

			console.log('User logged in successfully with token:', token);
			// After login, check if user already has an active subscription

			// if (isSubscribed === 'ACTIVE') {
			// 	setErrorMessage('You already have an active subscription. Please manage your subscription from the dashboard.');
			// 	setShowError(true);
			// 	logger.warn('User has active subscription after login, showing error popup');
			// 	return;
			// }
			// Fetch subscription status after login to ensure fresh data
			const statusResult = await fetchSubscriptionStatus(token, false);
			if (
				(statusResult?.currentSubStatus === 'ACTIVE' || statusResult?.currentSubStatus === 'TRIAL') &&
				statusResult?.currentSubPlan?.userTier === 'PLUS'
			) {
				const cancellationRequested = (statusResult?.currentSubPlan )?.cancellationRequested;
				router.push(
					`/manage_subscription?cancellationRequested=${cancellationRequested}`,
				);
				return;
			}
			// After login, continue with subscription process
			const plan = plans[storeselectedIndex] as Plan;
			if (plan && plan.id) {
				// Notify parent that payment is being initiated
				if (onPaymentInitiated) {
					onPaymentInitiated();
				}

				const promotionCode = plan?.isPromotional
					? plan?.promotion?.code
					: '';

				// Create a navigate function that matches the expected signature
				const navigateFn = (path: string) => {
					router.push(path);
				};

				createSubscription(
					plan.id,
					promotionCode || '',
					token,
					navigateFn,
					onPaymentCancelled,
				)
					.then()
					.catch(error => {
						logger.error(
							'Error creating subscription after login',
							error,
						);
					});
			}
		}
	};

	console.log('activePromotion ', activePromotion);
	console.log('selectedPlan ', selectedPlan);

	useEffect(() => {
		setUtmId(searchParams.get('utm_id') || '');
		setUtmSource(searchParams.get('utm_source') || '');
		setUtmCampaign(searchParams.get('utm_campaign') || '');
		setUtmMedium(searchParams.get('utm_medium') || '');
		setUtmTerm(searchParams.get('utm_term') || '');
		setUtmContent(searchParams.get('utm_content') || '');
		setSlug(searchParams.get('slug') || '');
	}, [searchParams]);
	return (
		<div className="container mx-auto">
			{activePromotion && (
				<PromotionBanner
					promotion={activePromotion}
					endDate={timeUntilEnd || undefined}
				/>
			)}
			<div className="container mx-auto mt-6 max-w-3xl px-4">
				{plans.map((plan, index: number) => {
					// Type cast each plan to ensure compatibility
					const typedPlan = plan as Plan;
					return (
						<PlanCard
							key={typedPlan.id || index}
							padding="py-4"
							id={typedPlan.id}
							month={typedPlan.interval}
							description={getPlanDescription(typedPlan)}
							actualPrice={
								activePromotion &&
									activePromotion.discountType === 1
									? Math.round(
										typedPlan.item?.unitAmount /
										100 /
										(1 -
											activePromotion.discountValue! /
											100),
									)
									: typedPlan.item?.originalAmount / 100
							}
							discountedPrice={typedPlan.item?.unitAmount / 100}
							offerName={
								typedPlan?.interval === 12 ? 'BEST VALUE' : null
							}
							isSelected={selectedIndex === index}
							onClick={() => {
								logger.debug('Plan selected', {
									planInterval: typedPlan.interval,
									index,
								});

								// Track plan selection click event
								trackEvent(
									'dtx_paid_landing_page_plan_selection_click',
									{
										selected_plan: {
											id: typedPlan.id,
											interval: typedPlan.interval,
											price:
												typedPlan.isPromotional &&
													activePromotion &&
													typedPlan.promotion
														?.discountedAmount
													? typedPlan.promotion
														.discountedAmount /
													100
													: typedPlan.item
														?.unitAmount / 100,
											isPromotional:
												typedPlan.isPromotional,
										},
										value: 50,
										currency: 'INR',
									},
								);

								setSelectedIndex(index);
							}}
						/>
					);
				})}

				{/* Sticky Buy button */}
				<div className="fixed right-0 bottom-5 left-0 z-50 flex w-full items-center justify-center">
					{!storeloading && selectedPlan && (
						<BuyButton
							month={selectedPlan.interval}
							price={
								selectedPlan.isPromotional &&
									activePromotion &&
									selectedPlan.promotion?.discountedAmount
									? selectedPlan.promotion.discountedAmount /
									100
									: selectedPlan.item?.unitAmount / 100
							}
							_planId={selectedPlan.id || ''}
							_isPromotional={
								activePromotion
									? selectedPlan.isPromotional
									: false
							}
							_promotionalCode={
								selectedPlan.isPromotional &&
									activePromotion &&
									selectedPlan.promotion
									? selectedPlan.promotion.code
									: ''
							}
							onClick={handleSubscribe}
							text="Buy plan"
						/>
					)}
				</div>

				{/* OTP Login Modal */}
				<OtpLoginModal
					open={isModalOpen}
					handleClose={handleCloseModal}
					onLoginSuccess={handleLoginSuccess}
					isPartner={false}
					partnerName="Tap Health"
					planId={selectedPlan?.id || ''}
					price={
						selectedPlan?.isPromotional &&
							activePromotion &&
							selectedPlan?.promotion?.discountedAmount
							? selectedPlan.promotion.discountedAmount / 100
							: (selectedPlan?.item?.unitAmount || 0) / 100
					}
					isPromotional={
						activePromotion
							? selectedPlan?.isPromotional || false
							: false
					}
					promotionCode={
						selectedPlan?.isPromotional &&
							activePromotion &&
							selectedPlan?.promotion
							? selectedPlan.promotion.code
							: ''
					}
				/>

				{/* Error Popup */}
				<ErrorPopup show={showError} message={errorMessage} />
			</div>
		</div>
	);
};

export default PlansContainer;
