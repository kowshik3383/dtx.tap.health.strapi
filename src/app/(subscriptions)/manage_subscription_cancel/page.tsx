'use client';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import CustomButton from '@/components/manage/CustomButton';
// import { useEffect } from "react";

import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import { calculateDaysLeft } from '@/utils/manage';
import check_icon from '../../../../public/assets/check.svg';
import cross_icon from '../../../../public/assets/close.svg';
import left_icon from '../../../../public/assets/Left icon-2.svg';
import sad_image from '../../../../public/assets/sad.svg';

const RequestRefundEndSubscription = () => {
	const { token } = useAuth();
	const { fetchSubscriptionStatus, subscriptionData } =
		useSubscriptionStore();
	const router = useRouter();
	const searchParams = useSearchParams();

	// Get query parameters using searchParams
	const buttonText = searchParams.get('buttonText') || 'Cancel subscription';
	// const text = searchParams.get('text') || "We're sorry to hear you want to go";

	useEffect(() => {
		if (token) {
			fetchSubscriptionStatus(token, false);
		}
	}, [token, fetchSubscriptionStatus]);

	// const calculateDaysLeft = () => {
	//   // Check if subscriptionData and nextRenewalDate exist
	//   if (!subscriptionData?.nextRenewalDate) {
	//     return "0 days";
	//   }

	//   try {
	//     // Parse the renewal date
	//     const endDate = new Date(subscriptionData.nextRenewalDate);

	//     // Validate if the date is valid
	//     if (isNaN(endDate.getTime())) {
	//       return "0 days";
	//     }

	//     // Add 3 days to the renewal date
	//     endDate.setDate(endDate.getDate() + 3);

	//     // Get today's date
	//     const today = new Date();

	//     // Calculate the difference in milliseconds
	//     const timeDifference = endDate.getTime() - today.getTime();

	//     // If the target date has passed
	//     if (timeDifference <= 0) {
	//       return "0 days";
	//     }

	//     // Calculate the difference in days
	//     const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	//     return `${daysLeft} days`;
	//   } catch (error) {
	//     console.error('Error calculating days left:', error);
	//     return "0 days";
	//   }
	// };
	const tempText = calculateDaysLeft(
		subscriptionData?.nextRenewalDate,
		subscriptionData?.updatedAt,
	);
	return (
		<div
			className="min-h-screen overflow-y-scroll"
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
				className="min-h-[32%] flex-1 flex-col items-center justify-between px-3 pt-4 pb-2">
				<div className="flex items-center gap-2">
					<button onClick={() => router.push('/manage_subscription')}>
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
				<div className="flex h-[80%] max-w-md flex-col items-center justify-center gap-5">
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
						<p className="flex w-[70%] flex-wrap text-center text-2xl font-bold text-[#252E49]">
							{`We’re sorry to hear 
you want to go`}
						</p>
					</div>
				</div>
			</div>
			<div className="-mt-4 flex min-h-[50%] max-w-md flex-col justify-between gap-3 rounded-t-[24px] bg-[#FFFFFF] px-[24px] pt-5">
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
								? `Your data will be permanently deleted instantly and you will miss out on these premium features:`
								: `Your data will be permanently deleted after ${tempText} and you will miss out on these premium features:`}
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
								router.push('/manage_subscription');
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
								// const isCancel =
								// 	buttonText === 'Cancel subscription';

								// Event details based on action
								// const eventData = {
								// 	event: isCancel
								// 		? 'subscription_cancelled'
								// 		: 'refund_requested',
								// 	status: isCancel
								// 		? 'User Cancelled Subscription'
								// 		: 'User Requested Refund',
								// 	buttonText: buttonText,
								// };

								if (buttonText == 'Cancel subscription') {
									router.push(
										'/manage_subscription_cancel_request',
									);
								} else {
									router.push(
										'/manage_subscription_cancel_request',
									);
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
