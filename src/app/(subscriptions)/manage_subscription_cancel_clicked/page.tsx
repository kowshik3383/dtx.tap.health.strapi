'use client';
// import { Typography } from '@mui/material';
import Image from 'next/image';
import cross_icon from '../../../../public/assets/close.svg';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/manage/CustomButton';
import { useSubscriptionStore } from '@/store';
import { calculateDaysLeft } from '@/utils/manage';
import sad_image from '../../../../public/assets/sad.svg';

const RefundCancel = () => {
	const router = useRouter();
	const { subscriptionData } = useSubscriptionStore();

const handleButtonClick = () => {
	const isFromV2 = localStorage.getItem('isFromV2plans') === 'true';
	const isFromV3 = localStorage.getItem('isFromV3plans') === 'true';

	if (isFromV2) {
		console.log('Detected user came from V2 plans. Redirecting to /v2plans');
		router.push('/v2plans');
		localStorage.removeItem('isFromV2plans');
	} 
	else if (isFromV3) {
		console.log('Detected user came from V3 plans. Redirecting to /v3plans');
		router.push('/v3plans');
		localStorage.removeItem('isFromV3plans');
	} 
	else {
		router.push('/plans');
	}
};


	console.log(subscriptionData);

	return (
		<div className="flex h-[93vh] w-[100vw]  flex-col justify-between bg-[#FFFFFF] px-3 pt-2 pb-4">
			<div
				className="flex cursor-pointer justify-end"
				onClick={() => {
					router.push('/manage_subscription');
				}}>
				<Image src={cross_icon} alt="cross_icon" />
			</div>

			<div className="flex flex-col items-center justify-center gap-5">
				<Image
					src={sad_image}
					alt="sad_image"
					className="h-[130px] w-[130px]"
				/>
				<div className="flex flex-col gap-3">
					<p className="text-l text-center font-semibold text-[#252E49]">
						We're sorry to see you go
					</p>

					<p className="text-center text-sm text-[#252E49]">
						Your subscription is cancelled. You will only have
						access to the free version of Tap Health after{' '}
						<span className="font-semibold">{`${calculateDaysLeft(
							subscriptionData?.nextRenewalDate,
							subscriptionData?.updatedAt,
						)}`}</span>{' '}
						days.
					</p>
				</div>
			</div>

			<div className="flex items-center justify-center">
				<CustomButton
					text="Okay"
					className="text-[#FFFFFF]"
					onClick={handleButtonClick}
					link={undefined}
				/>
			</div>
		</div>
	);
};

export default RefundCancel;
