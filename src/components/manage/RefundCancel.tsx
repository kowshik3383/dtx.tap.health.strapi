import { Typography } from '@mui/material';
import Image from 'next/image';
import router from 'next/router';
import CustomButton from '@/components/manage/CustomButton';
import cross_icon from '../../../public/assets/close.svg';
import sad_image from '../../../public/assets/sad.svg';

// Extend the Window interface to include ReactNativeWebView properties
declare global {
	interface Window {
		ReactNativeWebView?: {
			postMessage: (message: string) => void;
		};
		navigateInApp?: (screen: string) => void;
	}
}

const RefundCancel = ({ text, checker }: { text: string; checker: string }) => {
	const handleRefundClick = () => {
		if (window.ReactNativeWebView) {
			// If in WebView, use the injected function
			window.navigateInApp?.('splashScreen');
		} else {
		}
	};

	const handleButtonClick = () => {
		if (checker === 'cancelled') {
			router.push('/manage_subscription_cancel_request');
		} else {
			handleRefundClick();
		}
	};

	return (
		<div className="flex h-[93vh] w-[100vw] flex-col justify-between bg-[#FFFFFF] px-3 pt-2 pb-4">
			<div
				className="flex cursor-pointer justify-end"
				onClick={() => {
					router.push('/manage_subscription_cancel_request');
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
					<Typography
						sx={{
							color: '#252E49',
							fontFamily: 'Urbanist',
							fontSize: '24px',
							fontWeight: 700,
							lineHeight: '28px',
							textAlign: 'center',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
						}}>
						We're sorry to see you go
					</Typography>
					<div
						style={{
							fontFamily: 'Urbanist',
							fontSize: '16px',
							fontWeight: 500,
							width: '100%',
							lineHeight: '25px',
							letterSpacing: '-0.008em',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
							color: '#252E49',
						}}
						className="flex w-[100%] items-center justify-center">
						<div
							className="w-[90%] text-center"
							dangerouslySetInnerHTML={{ __html: text }}
						/>
					</div>
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
