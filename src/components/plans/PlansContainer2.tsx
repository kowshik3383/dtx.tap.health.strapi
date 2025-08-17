'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ErrorPopup } from '@/components/elements/ErrorPopup';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import { trackEvent } from '@/utils/analytics';
import { registerHigherIntentEvent } from '@/utils/registerIntentEvent';
import { Plan, Promotion } from './constants/types';
import { usePlans, usePromotion } from './hooks';
import { BuyButton, PlanCard2, PromotionBanner } from './ui';
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

const PlansContainer2 = ({
	isAuthenticated = false,
	token = null,
	navigate = () => { },
	onPaymentInitiated,
	onPaymentCancelled,
}: PlansContainerProps) => {
	const router = useRouter();
	const { login } = useAuth();
	const searchParams = useSearchParams();
	const [utmId, setUtmId] = useState<string>('');
	const [utmSource, setUtmSource] = useState<string>('');
	const [utmCampaign, setUtmCampaign] = useState<string>('');
	const [utmMedium, setUtmMedium] = useState<string>('');
	const [utmTerm, setUtmTerm] = useState<string>('');
	const [utmContent, setUtmContent] = useState<string>('');
	const [slug, setSlug] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
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
	const [showTooltip, setShowTooltip] = useState(true);

	logger.debug('PlansContainer rendered', {
		isAuthenticated,
		tokenExists: !!token,
		plansCount: plans.length,
	});

	const selectedPlan = plans[storeselectedIndex] as Plan;
	// Send the data to Interakt for tracking
	// Handle subscription process
	const interaktCall = async (mobileNumber: string) => {
		await fetch('/api/interakt/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mobileNumber: mobileNumber,
				tag: 'SQL',
			}),
		});
	};
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
				slug,
				tag: 'SQL',
			}),
		});
	};

	const handleSubscribe = async () => {
		logger.info('Subscribe button clicked');
		console.log('in here');
		if (mobileNumber.length > 0) {
			console.log('Sending mobile number to Interakt', mobileNumber);
			interaktCall(mobileNumber);
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
		// ✅ SET isFromV2plans in localStorage
		localStorage.setItem('isFromV3plans', 'true');

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
			logger.warn('User not authenticated, opening login modal');
			setIsModalOpen(true);
			return;
		}

		// Allow purchase if status is ACTIVE and userTier is FREE
		if (
			subscriptionData?.status === 'ACTIVE' &&
			subscriptionData?.userTier === 'PLUS'
		) {
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
				const cancellationRequested = (statusResult?.currentSubPlan)?.cancellationRequested;
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
	useEffect(() => {
		setUtmId(searchParams.get('utm_id') || '');
		setUtmSource(searchParams.get('utm_source') || '');
		setUtmCampaign(searchParams.get('utm_campaign') || '');
		setUtmMedium(searchParams.get('utm_medium') || '');
		setUtmTerm(searchParams.get('utm_term') || '');
		setUtmContent(searchParams.get('utm_content') || '');
		setSlug(searchParams.get('slug') || '');
	}, []);
	console.log('activePromotion ', activePromotion);
	console.log('selectedPlan ', selectedPlan);

	return (
		<div className="container mx-auto bg-gradient-to-b from-cyan-50 via-sky-100 to-purple-100">
			{activePromotion && (
				<PromotionBanner
					promotion={activePromotion}
					endDate={timeUntilEnd || undefined}
				/>
			)}
			<h2 className="mt-9 mb-10 text-center text-3xl font-semibold text-gray-800 sm:text-4xl">
				<span className="font-bold text-blue-600">Choose the plan</span>{' '}
				that’s
				<br />
				right for you
			</h2>
			<div className="container mx-auto mt-6 px-4">
				<div className="flex w-full flex-row items-end justify-center ">
					{plans.map((plan, index: number) => {
						// Type cast each plan to ensure compatibility
						const typedPlan = plan as Plan;
						return (
							<PlanCard2
								key={typedPlan.id || index}
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
								discountedPrice={
									typedPlan.item?.unitAmount / 100
								}
								offerName={
									typedPlan?.interval === 12
										? 'BEST VALUE'
										: null
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
															?.unitAmount /
														100,
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
				</div>

				{/* Sticky Buy button */}
				<div className="fixed right-0 bottom-5 left-0 z-50 flex w-full items-center justify-center">
					<div className="fixed right-0 bottom-5 left-0 z-50 flex w-full items-center justify-center">
						{/* Tooltip above Buy Button (aligned to left) */}
						{selectedPlan?.interval === 12 && showTooltip && (
							<div className="absolute -top-16 [@media(min-width:400px)]:left-28 left-20 md:left-44 z-50 w-[280px]  [@media(min-width:900px)]:left-96">
								<div className="relative rounded-xl bg-gray-800 px-4 py-3 text-sm text-white shadow-lg">
									<button
										className="absolute top-3 right-3 text-lg leading-none text-gray-300 transition-colors hover:text-white"
										onClick={() => setShowTooltip(false)}>
										✕
									</button>
									<p className="pr-8 text-[11px] whitespace-nowrap">
										100% refund if you're not happy within
										14 days.
									</p>
								</div>

								{/* Arrow pointing down to price (left-aligned) */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 10 5"
									className="absolute top-full left-6 -mt-[1px] h-3 w-6">
									<path d="M0 0L5 5L10 0H0Z" fill="#1F2937" />
								</svg>
							</div>
						)}

						{/* Dynamic width Buy Button */}
						{!storeloading && selectedPlan && (
							<BuyButton
								month={selectedPlan.interval}
								price={
									selectedPlan.isPromotional &&
										activePromotion &&
										selectedPlan.promotion?.discountedAmount
										? selectedPlan.promotion
											.discountedAmount / 100
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

export default PlansContainer2;
