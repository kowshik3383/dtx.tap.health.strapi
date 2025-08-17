/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
// import left_icon from "../assets/Left icon.svg";
// import HeaderContent from "./HeaderContent";
import CustomContentLoader from '@/components/manage/CustomContentLoader';
import HeaderContent from '@/components/manage/HeaderContent';
import { useAuth } from '@/hooks/useAuth';
// import { usePlansAuth } from '@/hooks/usePlansAuth';
import { useSubscriptionStore } from '@/store';
import {
	calculateDaysLeft,
	// calculateOneYearLater,
	// calculateRefundDaysLeft,
	calculateTimeLeft,
	formatDate,
} from '@/utils/manage';
import right_arrow_icon from '../../../../public/assets/Icon.svg';
// import { useAuth } from "../hooks/useAuth";
// import { useSubscriptionStore } from "../store";
import left_icon from '../../../../public/assets/Left icon-2.svg';

// const typographyBaseStyle = {
// 	fontFamily: 'Urbanist',
// 	textUnderlinePosition: 'from-font',
// 	textDecorationSkipInk: 'none',
// };

const Manage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const cancellationRequested = searchParams.get('cancellationRequested');
	console.log('cancellationRequested', typeof cancellationRequested);
	const { token, isAuthenticated } = useAuth();
	const {
		// fetchPlanData,
		// storeloading: plansLoading,
		fetchSubscriptionStatus,
		fetchLoading,
		subscriptionData,
		// isRefundEligible,
	} = useSubscriptionStore();

	useEffect(() => {
		const fetchData = async () => {
			console.log('Auth state:', { isAuthenticated, token });
			if (isAuthenticated && token) {
				console.log('Fetching subscription data...');
				await fetchSubscriptionStatus(token, false);
				console.log('Subscription data fetched:', subscriptionData);
			}
		};
		fetchData();
	}, [isAuthenticated, token, fetchSubscriptionStatus]);

	const isInWebView = () => {
		if (typeof window === 'undefined') return false;
		const userAgent = navigator.userAgent || '';
		return (window as any).ReactNativeWebView || /wv|WebView/i.test(userAgent);
	};

	// ✅ Send message to React Native
	const sendWebViewMessage = (action: string) => {
		if (!isInWebView()) {
			alert('Not in WebView or ReactNativeWebView not available.');
			return;
		}
		try {
			const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
			const payload = isIOS ? action : JSON.stringify({ type: action });
			console.log('[WebView] Sending action to React Native:', payload);
			(window as any).ReactNativeWebView.postMessage(payload);
		} catch (err) {
			console.error('[WebView] Failed to send message:', err);
		}
	};

	// ✅ Handle button click
	const handleButtonClick = () => {
		if (isInWebView()) {
			// 🔥 Send CLOSE_WEBVIEW (or any action)
			sendWebViewMessage('CLOSE_WEBVIEW');
		} else {
			// 🔥 Fallback: normal browser navigation
			const isFromV2 = localStorage.getItem('isFromV2plans') === 'true';
			const isFromV3 = localStorage.getItem('isFromV3plans') === 'true';

			if (isFromV2) {
				router.push('/v2plans');
				localStorage.removeItem('isFromV2plans');
			} else if (isFromV3) {
				router.push('/v3plans');
				localStorage.removeItem('isFromV3plans');
			} else {
				router.push('/plans');
			}
		}
	};



	return (
		<div className="rrelative max-w-mdsm:max-w-lg mx-auto min-h-screen w-full bg-gradient-to-b from-[#AFDED6] via-[#CEE7F4] to-[#F2F5F9] md:max-w-xl lg:max-w-2xl">
			<div className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
				<div className="mb-6 flex items-center gap-3 sm:mb-8">
					<button
						onClick={() => handleButtonClick()}
						className="transition-opacity hover:opacity-80">
						<Image
							src={left_icon}
							alt="left_icon"
							width={36}
							height={36}
							className="h-8 w-8 sm:h-9 sm:w-9"
						/>
					</button>
					<h1 className="text-lg font-bold text-[#252E49] sm:text-xl md:text-2xl">
						Manage Subscription
					</h1>
				</div>

				{fetchLoading ? (
					<div className="space-y-6 sm:space-y-8">
						<CustomContentLoader height={140} />
						<CustomContentLoader />
					</div>
				) : (
					<div className="space-y-6 sm:space-y-8">
						{cancellationRequested === 'true' ? (
							<div className="flex flex-col items-center justify-center pt-20 text-center">
								<div className="flex h-[22px] w-[118px] items-center justify-center rounded-[4px] bg-[#FFF1F3] px-[8px] py-[4px] text-center">
									<Typography
										sx={{
											color: '#DA1E2E',
											fontFamily: 'Urbanist',
											fontSize: '12px',
											fontWeight: 600,
											lineHeight: '14.4px',
											letterSpacing: '-0.003em',
											textAlign: 'center',
											textUnderlinePosition: 'from-font',
											textDecorationSkipInk: 'none',
										}}>
										{'Renewal cancelled'}
									</Typography>
								</div>
								<Typography
									sx={{
										fontFamily: 'Urbanist',
										fontSize: '30px',
										fontWeight: 700,
										lineHeight: '36px',
										textAlign: 'center',
										textUnderlinePosition: 'from-font',
										textDecorationSkipInk: 'none',
										color: '#252E49',
									}}>
									{calculateDaysLeft(
										subscriptionData?.nextRenewalDate,
										subscriptionData?.updatedAt,
									)}
								</Typography>
								<Typography
									sx={{
										fontFamily: 'Urbanist',
										fontSize: '14px',
										fontWeight: 400,
										lineHeight: '16.8px',
										textAlign: 'center',
										marginTop: '15px',
										textUnderlinePosition: 'from-font',
										textDecorationSkipInk: 'none',
										color: '#252E49',
									}}>
									Your subscription will end on{' '}
									<span className="font-bold">
										{formatDate(
											subscriptionData?.nextRenewalDate,
										)}
									</span>
								</Typography>
								<Typography
									sx={{
										fontFamily: 'Urbanist',
										fontWeight: 400,
										fontSize: '12px',
										lineHeight: '14.4px',
										letterSpacing: '0%',
										textAlign: 'center',
										color: '#5D6A85',
										marginTop: '16px',
										maxWidth: '256px',
									}}>
									{' '}
									We still retain your data, if you
									resubscribe, you can pick up right where you
									left off.
								</Typography>
							</div>
						) : (
							<>
								<div className="flex flex-col space-y-3 py-8 sm:space-y-4 sm:py-10 md:py-12">
									<p className="text-center text-2xl leading-tight font-bold text-[#252E49] sm:text-3xl md:text-4xl">
										{calculateTimeLeft(
											subscriptionData?.nextRenewalDate,
										)}
									</p>

									<p className="px-2 text-center text-base leading-relaxed text-[#252E49] sm:text-lg md:text-xl">
										Your next bill is{' '}
										<span className="font-bold">
											₹
											{(subscriptionData?.nextBillingAmount ??
												0) / 100}
										</span>{' '}
										on{' '}
										<span className="font-bold">
											{formatDate(
												subscriptionData?.nextRenewalDate,
											)}
										</span>
									</p>
								</div>

								<div className="mx-2 flex flex-col justify-center sm:mx-4">
									<button
										onClick={() =>
											router.push(
												`/manage_subscription_cancel?buttonText=Cancel%20subscription&text=We're%20sorry%20to%20hear%20you%20want%20to%20go`,
											)
										}
										className="w-full">
										<HeaderContent
											content={'Cancel Subscription'}
											rightArrowIcon={right_arrow_icon}
											backgroundColor={'#FFFFFF'}
											className={
												'rounded-lg shadow-sm transition-shadow hover:shadow-md'
											}
											remainDiv={undefined}
										/>
									</button>
									{/* {isRefundEligible && (
                                <button
                                    onClick={() => router.push(`/manage_subscription_cancel?buttonText=Refund%20subscription&text=We're%20sorry%20to%20hear%20you%20want%20to%20go`)}
                                    className=" w-full"
                                >
                                    <HeaderContent
                                        content={"Request Refund"}
                                        rightArrowIcon={right_arrow_icon}
                                        remainDiv={calculateRefundDaysLeft(
                                            subscriptionData?.updatedAt
                                        )}  
                                        className={"mt-2 rounded-[12px] bg-transparent"}
                                        // backgroundColor={"#F2F5F9"}
                                        // refundableAmount={
                                        //     subscriptionData?.paymentHistory?.totalPaidAmount
                                        // }
                                    />
                                </button>
                                )} */}
								</div>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Manage;
