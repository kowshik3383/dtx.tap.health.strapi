'use client';
import { Typography } from '@mui/material';
import * as Sentry from '@sentry/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CustomButton from '@/components/manage/CustomButton';

import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import check_icon from '../../../public/assets/check.svg';
import cross_icon from '../../../public/assets/close.svg';
import left_icon from '../../../public/assets/Left icon-2.svg';
import sad_image from '../../../public/assets/sad.svg';
const RequestRefundEndSubscription = ({
	buttonText,
	setShowCancelModal,
	setShowCancelFeedback,
}: {
	buttonText: string;
	setShowCancelModal: (show: boolean) => void;
	setShowCancelFeedback: (show: boolean) => void;
}) => {
	const { token } = useAuth();
	const { fetchSubscriptionStatus, subscriptionData } =
		useSubscriptionStore();
	const _router = useRouter();
	// const text = searchParams.get('text') || "We're sorry to hear you want to go";

	useEffect(() => {
		if (token) {
			fetchSubscriptionStatus(token, false);
		}
	}, [token, fetchSubscriptionStatus]);

	const calculateDaysLeft = () => {
		// Check if subscriptionData and nextRenewalDate exist
		if (!subscriptionData?.nextRenewalDate) {
			return '0 days';
		}

		try {
			// Parse the renewal date
			const endDate = new Date(subscriptionData.nextRenewalDate);

			// Validate if the date is valid
			if (isNaN(endDate.getTime())) {
				return '0 days';
			}

			// Add 3 days to the renewal date
			endDate.setDate(endDate.getDate() + 3);

			// Get today's date
			const today = new Date();

			// Calculate the difference in milliseconds
			const timeDifference = endDate.getTime() - today.getTime();

			// If the target date has passed
			if (timeDifference <= 0) {
				return '0 days';
			}

			// Calculate the difference in days
			const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

			return `${daysLeft} days`;
		} catch (error) {
			console.error('Error calculating days left:', error);
			Sentry.captureException(error, {
				tags: {
					context: 'calculateDaysLeft',
				},
				extra: {
					nextRenewalDate: subscriptionData?.nextRenewalDate,
				},
			});

			return '0 days';
		}
	};
	const tempText = calculateDaysLeft();
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}>
			<div
				style={{
					background:
						'linear-gradient(-180deg, rgba(233, 230, 247, 1) 15%, rgba(209, 214, 242, 1) 55%, rgba(191, 234, 244, 1) 100%)',
				}}
				className="h-[42%] flex-1 flex-col items-center justify-between px-3 pb-2">
				<div className="flex items-center gap-2">
					<button onClick={() => setShowCancelModal(false)}>
						<Image
							src={left_icon}
							alt="left_icon"
							width={36}
							height={36}
						/>
					</button>

					<p className="text-l font-bold text-[#252E49]">
						Cancel Subscription
					</p>
				</div>
				<div className="flex h-[80%] flex-col items-center justify-center gap-5">
					{/* <img
            src={sad_image}
            alt="sad_image"
            className="w-[100px] h-[100px] -mt-4"
          /> */}
					<Image
						src={sad_image}
						alt="sad_image"
						width={100}
						height={100}
					/>
					<div className="flex w-[100%] flex-col items-center justify-center gap-3">
						<Typography
							sx={{
								color: '#252E49',
								fontFamily: 'Urbanist',
								fontSize: '24px',
								fontWeight: 800,
								width: '70%',
								lineHeight: '33.6px',
								textAlign: 'center',
								textUnderlinePosition: 'from-font',
								textDecorationSkipInk: 'none',
							}}>
							{`We’re sorry to hear 
you want to go`}
						</Typography>
					</div>
				</div>
			</div>
			<div className="-mt-4 flex h-[50%] w-[100%] flex-col justify-between gap-3 rounded-t-[24px] bg-[#FFFFFF] px-[24px] pt-5">
				<div className="h-[100%] flex-1 flex-col">
					<div className="flex-1 flex-col">
						<Typography
							sx={{
								fontFamily: 'Urbanist',
								fontSize: '14px',
								fontWeight: 500,
								lineHeight: '19.6px',
								textAlign: 'left',
								textUnderlinePosition: 'from-font',
								textDecorationSkipInk: 'none',
								color: '#3D4966',
							}}>
							{buttonText === 'Request Refund'
								? `Request Refund`
								: `Your data will be permanently deleted after ${tempText} and you will miss out on these premium features`}
						</Typography>
					</div>
					<div className="flex flex-col justify-between gap-8">
						<div className="mt-2 mb-2 flex justify-between">
							<div>
								<Typography
									sx={{
										color: '#252E49',
										fontFamily: 'Urbanist',
										fontSize: '14px',
										fontWeight: 700,
										lineHeight: '16.8px',
										textAlign: 'left',
										textUnderlinePosition: 'from-font',
										textDecorationSkipInk: 'none',
									}}>
									What you get
								</Typography>
								<div className="mt-4 flex flex-col gap-3">
									<Typography
										sx={{
											color: '#252E49',
											fontFamily: 'Urbanist',
											fontSize: '14px',
											fontWeight: 500,
											lineHeight: '16.8px',
											textAlign: 'left',
											textUnderlinePosition: 'from-font',
											textDecorationSkipInk: 'none',
										}}>
										Personalised nutrition guidance
									</Typography>
									<Typography
										sx={{
											color: '#252E49',
											fontFamily: 'Urbanist',
											fontSize: '14px',
											fontWeight: 500,
											lineHeight: '16.8px',
											textAlign: 'left',
											textUnderlinePosition: 'from-font',
											textDecorationSkipInk: 'none',
										}}>
										Easy, effective exercises
									</Typography>
									<Typography
										sx={{
											color: '#252E49',
											fontFamily: 'Urbanist',
											fontSize: '14px',
											fontWeight: 500,
											lineHeight: '16.8px',
											textAlign: 'left',
											textUnderlinePosition: 'from-font',
											textDecorationSkipInk: 'none',
										}}>
										Glucose monitoring calendar
									</Typography>
									<Typography
										sx={{
											color: '#252E49',
											fontFamily: 'Urbanist',
											fontSize: '14px',
											fontWeight: 500,
											lineHeight: '16.8px',
											textAlign: 'left',
											textUnderlinePosition: 'from-font',
											textDecorationSkipInk: 'none',
										}}>
										Interactive diabetes education
									</Typography>
								</div>
							</div>
							<div className="flex flex-col justify-between">
								<Typography
									sx={{
										color: '#252E49',
										fontFamily: 'Urbanist',
										fontSize: '14px',
										fontWeight: 700,
										lineHeight: '16.8px',
										textAlign: 'left',
										textUnderlinePosition: 'from-font',
										textDecorationSkipInk: 'none',
									}}>
									Free
								</Typography>
								<div className="mt-4 flex flex-col gap-[8px]">
									<Image
										src={cross_icon}
										alt="alt"
										className="w-[20px]"
									/>
									<Image
										src={cross_icon}
										alt="alt"
										className="w-[20px]"
									/>
									<Image
										src={cross_icon}
										alt="alt"
										className="w-[20px]"
									/>
									<Image
										src={cross_icon}
										alt="alt"
										className="w-[20px]"
									/>
								</div>
							</div>
							<div className="-mt-1 rounded-[8px] bg-[#EDF5FF] px-[12px]">
								<Typography
									sx={{
										color: '#2563EB',
										fontFamily: 'Urbanist',
										fontSize: '14px',
										fontWeight: 700,
										lineHeight: '16.8px',
										textAlign: 'left',
										marginTop: '5px',
										textUnderlinePosition: 'from-font',
										textDecorationSkipInk: 'none',
									}}>
									Premium
								</Typography>
								<div className="mt-4 flex flex-col items-center justify-center gap-[8px]">
									<Image
										src={check_icon}
										alt="alt"
										className="w-[20px]"
									/>
									<Image
										src={check_icon}
										alt="alt"
										className="w-[20px]"
									/>
									<Image
										src={check_icon}
										alt="alt"
										className="w-[20px]"
									/>
									<Image
										src={check_icon}
										alt="alt"
										className="w-[20px]"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-3 flex w-[100%] flex-col items-center justify-center gap-2">
					<div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
						<CustomButton
							text={'Keep Premium'}
							className={'text-[12px] text-[#FFFFFF]'}
							onClick={() => {
								setShowCancelModal(false);
							}}
							link={undefined}
						/>
					</div>
					<div className="flex h-[100%] w-[100%] flex-col items-center justify-center">
						<CustomButton
							text={buttonText}
							bgColor="#FFFFFF"
							className={'text-[12px] text-[#DA1E2E]'}
							onClick={() => {
								const isCancel =
									buttonText === 'Cancel subscription';

								// Event details based on action
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								const eventData = {
									event: isCancel
										? 'subscription_cancelled'
										: 'refund_requested',
									status: isCancel
										? 'User Cancelled Subscription'
										: 'User Requested Refund',
									buttonText: buttonText,
								};

								if (buttonText == 'Cancel subscription') {
									setShowCancelFeedback(true);
								} else {
									setShowCancelModal(false);
								}
							}}
							link={undefined}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequestRefundEndSubscription;
