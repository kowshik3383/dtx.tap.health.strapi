'use client';
import {
	Backdrop as MuiBackdrop,
	Modal as MuiModal,
	styled,
	Typography,
} from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CustomButton from '@/components/manage/CustomButton';
import CustomTextArea from '@/components/manage/CustomTextArea';
import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import left_icon from '../../../../public/assets/Left icon-2.svg';

const CancelFeedback = () => {
	const [text, setText] = useState('');
	const { token } = useAuth();
	const { subscribedPlan, isRefundEligible, cancelSubscription } =
		useSubscriptionStore();

	const handleTextChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setText(event.target.value);
	};
	const router = useRouter();

	const purpose = 'Cancel Subscription';
	const buttonText = 'Cancel subscription';

	return (
		<div className="flex h-[100vh] bg-[#F2F5F9]">
			<div className="flex h-[93vh] w-[100vw] flex-col justify-between bg-[#F2F5F9] py-2 pb-6">
				<div className="flex flex-col gap-5">
					<div className="flex items-center justify-start">
						<button
							className="h-[100%]"
							onClick={() => {
								router.push('/manage_subscription_cancel');
							}}>
							<Image
								className="h-[50px] w-[50px]"
								src={left_icon}
								alt="back_icon"
							/>
						</button>
						<Typography
							color="#252E49"
							sx={{
								fontFamily: 'Urbanist',
								fontSize: '16px',
								fontWeight: 700,
								lineHeight: '19.2px',
								letterSpacing: '-0.008em',
								textAlign: 'left',
								textUnderlinePosition: 'from-font',
								textDecorationSkipInk: 'none',
							}}>
							{purpose}
						</Typography>
					</div>
					<div className="flex flex-col px-[20px]">
						<Typography
							sx={{
								fontFamily: 'Urbanist',
								fontSize: '24px',
								fontWeight: 700,
								lineHeight: '28.8px',
								color: '#252E49',
								letterSpacing: '-0.008em',
								textAlign: 'left',
								textUnderlinePosition: 'from-font',
								textDecorationSkipInk: 'none',
							}}>
							Why are you cancelling?
						</Typography>
						<Typography
							sx={{
								fontFamily: 'Urbanist',
								fontSize: '16px',
								fontWeight: 500,
								lineHeight: '19.2px',
								marginTop: '5px',
								textAlign: 'left',
								color: '#5D6A85',
								textUnderlinePosition: 'from-font',
								textDecorationSkipInk: 'none',
							}}>
							This helps us improve and serve you better
						</Typography>
					</div>
					{/* <div className="flex w-[100%] items-center flex-col gap-2 justify-center">
         <div className="w-[95%]">
         <HeaderContent
            content={"Not helping me improve"}
            className="rounded-[12px] py-[25px]"
          />
         </div>
          <HeaderContent
            content={"I like it, but just not using it"}
            className="rounded-[12px] py-[25px]"
          />
          <HeaderContent
            content={"Doesn't work as intended"}
            className="rounded-[12px] py-[25px]"
          />
        </div>
        <div class="flex items-center justify-center mx-4 ">
          <div class="border-t-2 border-solid border-[#9EA7B8] flex-grow"></div>
          <span class="mx-1 text-[#9EA7B8]">
            <Typography
              sx={{
                fontFamily: "Urbanist",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "21.6px",
                letterSpacing: "-0.008em",
                textAlign: "center",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
              }}
            >
              or
            </Typography>
          </span>
          <div class="border-t-2 border-solid border-[#9EA7B8] flex-grow"></div>
        </div> */}
					<div className="flex items-center justify-center">
						<CustomTextArea
							placeholder="Type your reason here..."
							value={text}
							onChange={handleTextChange}
						/>
					</div>
				</div>
				<div
					className="flex w-[100%] justify-center"
					onClick={() => {
						const subscriptionId =
							subscribedPlan[0]?.subscriptionId || 'N/A';

						// Call backend function
						cancelSubscription(
							subscriptionId,
							isRefundEligible || false,
							token || '',
						);

						// Navigate after event tracking
						router.push('/manage_subscription_cancel_clicked');
					}}>
					<CustomButton
						text={buttonText}
						bgColor="#F2F5F9"
						className="text-[12px] text-[#DA1E2E]"
						isVisible={true}
						onClick={() => {}}
						link={undefined}
					/>
				</div>
			</div>
		</div>
	);
};
export default CancelFeedback;
const _Backdrop = React.forwardRef<
	HTMLDivElement,
	{ open?: boolean; className?: string; [key: string]: unknown }
>((props, ref) => {
	const { open, className, ...other } = props;
	return (
		<div
			className={clsx(
				{ 'base-Backdrop-open': open },
				className as string,
			)}
			ref={ref}
			{...other}
		/>
	);
});

const blue = {
	200: '#99CCFF',
	300: '#66B2FF',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	700: '#0066CC',
};

const grey = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};

const StyledModal = styled(MuiModal)(({  }) => ({
	position: 'fixed',
	zIndex: 1300,
	inset: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledBackdrop = styled(MuiBackdrop)(({  }) => ({
	zIndex: -1,
	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	WebkitTapHighlightColor: 'transparent',
}));

const ModalContent = styled('div')(({ theme }) => ({
	fontFamily: '"IBM Plex Sans", sans-serif',
	fontWeight: 500,
	textAlign: 'start',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	gap: '8px',
	overflow: 'hidden',
	backgroundColor: theme.palette.mode === 'dark' ? grey[900] : '#fff',
	border: `1px solid ${
		theme.palette.mode === 'dark' ? grey[700] : grey[200]
	}`,
	boxShadow: `0 4px 12px ${
		theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'
	}`,
	padding: '24px',
	color: theme.palette.mode === 'dark' ? grey[50] : grey[900],
	borderRadius: '8px',
	maxWidth: '500px',
	width: '90%',
	margin: '20px',

	'& .modal-title': {
		margin: 0,
		lineHeight: '1.5rem',
		marginBottom: '8px',
	},

	'& .modal-description': {
		margin: 0,
		lineHeight: '1.5rem',
		fontWeight: 400,
		color: theme.palette.mode === 'dark' ? grey[400] : grey[800],
		marginBottom: '4px',
	},
}));

const TriggerButton = styled('button')(({ theme }) => ({
	fontFamily: '"IBM Plex Sans", sans-serif',
	fontWeight: 600,
	fontSize: '0.875rem',
	lineHeight: 1.5,
	padding: '8px 16px',
	transition: 'all 150ms ease',
	cursor: 'pointer',
	backgroundColor: theme.palette.mode === 'dark' ? grey[900] : '#fff',
	border: `1px solid ${
		theme.palette.mode === 'dark' ? grey[700] : grey[200]
	}`,
	color: theme.palette.mode === 'dark' ? grey[200] : grey[900],
	boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
	borderRadius: '6px',

	'&:hover': {
		backgroundColor: theme.palette.mode === 'dark' ? grey[800] : grey[50],
		borderColor: theme.palette.mode === 'dark' ? grey[600] : grey[300],
	},

	'&:active': {
		backgroundColor: theme.palette.mode === 'dark' ? grey[700] : grey[100],
	},

	'&:focus-visible': {
		boxShadow: `0 0 0 4px ${
			theme.palette.mode === 'dark' ? blue[300] : blue[200]
		}`,
		outline: 'none',
	},
}));

// Example usage of the modal components:
const _ModalExample = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<TriggerButton onClick={() => setOpen(true)}>
				Open Modal
			</TriggerButton>

			<StyledModal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
				slots={{ backdrop: StyledBackdrop }}>
				<ModalContent>
					<h2 id="modal-title" className="modal-title">
						Modal Title
					</h2>
					<p id="modal-description" className="modal-description">
						Modal content goes here
					</p>
				</ModalContent>
			</StyledModal>
		</>
	);
};