import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import animationData from '../../../../public/successAnimation.json';

// Import Lottie with noSSR
const Lottie = dynamic(() => import('lottie-react'), {
	ssr: false,
});

interface SuccessAnimationProps {
	plan: {
		duration: number;
		amount: number;
		transactionId: string;
		paymentMethod?: string;
	};
}

export function SuccessAnimation({ plan }: SuccessAnimationProps) {
	const [animationComplete, setAnimationComplete] = useState(false);
	const [showDetails, setShowDetails] = useState(false);

	const handleOpenStore = () => {
		const userAgent = navigator.userAgent || navigator.vendor;

		if (/android/i.test(userAgent)) {
			window.location.href =
				'https://play.google.com/store/apps/details?id=com.taphealthapp&amp%3Bhl=en_US';
		} else if (/iPhone|iPad|iPod/i.test(userAgent)) {
			window.location.href =
				'https://apps.apple.com/in/app/tap-health-ai-health-app/id6478812140';
		} else {
			alert('Your platform is not supported for direct download.');
		}
	};

	return (
		<div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#FFFFFF]">
			{/* Main animation container */}
			<motion.div
				className="absolute flex w-full items-center justify-center"
				initial={{ y: 0 }}
				animate={{ y: animationComplete ? '-36vh' : 0 }}
				transition={{ duration: 0.5, delay: 1.5 }}
				style={{ height: '100vh' }}>
				<div className="circle-container absolute flex items-center justify-center">
					{/* Expanding green circle */}
					<motion.div
						className="absolute rounded-full bg-[#059669]"
						initial={{ scale: 0 }}
						animate={{ scale: 4 }}
						transition={{ duration: 1.5, ease: 'easeOut' }}
						style={{ width: '64vw', height: '64vw' }}
						onAnimationComplete={() => {
							setAnimationComplete(true);
							setTimeout(() => setShowDetails(true), 300);
						}}
					/>

					{/* Check icon container */}
					<div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white">
						<Check className="h-16 w-16 text-[#059669]" />
					</div>
				</div>

				{/* Success text */}
				<div className="absolute bottom-1/4 z-10 text-center text-white">
					<h1 className="mb-2 text-2xl font-bold">You're in!</h1>
					<p className="text-sm">
						Your {plan.duration} months plan is now active
					</p>
				</div>
			</motion.div>

			{/* Plan details section */}
			<motion.div
				className="absolute right-0 bottom-0 left-0 rounded-t-[32px] bg-white p-6 shadow-lg"
				initial={{ y: '100%' }}
				animate={{ y: showDetails ? 0 : '100%' }}
				transition={{ duration: 0.5, ease: 'easeOut' }}>
				<div className="space-y-6">
					{/* Plan details */}
					<div className="space-y-4">
						<div className="flex justify-between">
							<Typography sx={{ fontSize: 14, color: '#64748B' }}>
								Duration
							</Typography>
							<Typography
								sx={{
									fontSize: 14,
									fontWeight: 600,
									color: '#1E293B',
								}}>
								{plan.duration} months
							</Typography>
						</div>
						<div className="flex justify-between">
							<Typography sx={{ fontSize: 14, color: '#64748B' }}>
								Amount paid
							</Typography>
							<Typography
								sx={{
									fontSize: 14,
									fontWeight: 600,
									color: '#1E293B',
								}}>
								₹{plan.amount}
							</Typography>
						</div>
						<div className="flex justify-between">
							<Typography sx={{ fontSize: 14, color: '#64748B' }}>
								Payment method
							</Typography>
							<Typography
								sx={{
									fontSize: 14,
									fontWeight: 600,
									color: '#1E293B',
								}}>
								{plan.paymentMethod || 'Online payment'}
							</Typography>
						</div>
						<div className="flex justify-between">
							<Typography sx={{ fontSize: 14, color: '#64748B' }}>
								Transaction ID
							</Typography>
							<Typography
								sx={{
									fontSize: 14,
									fontWeight: 600,
									color: '#1E293B',
								}}>
								{plan.transactionId}
							</Typography>
						</div>
					</div>

					{/* Download button */}
					<button
						onClick={handleOpenStore}
						className="w-full rounded-full bg-[#2563EB] py-4 text-white">
						<Typography sx={{ fontSize: 16, fontWeight: 700 }}>
							Download Tap Health
						</Typography>
					</button>
				</div>
			</motion.div>

			{/* Confetti animation */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: [0, 1, 1, 0] }}
				transition={{ duration: 2, times: [0, 0.2, 0.8, 1], delay: 1 }}
				className="absolute inset-0 z-20">
				<Lottie
					animationData={animationData}
					loop={false}
					style={{ width: '100%', height: '100%' }}
				/>
			</motion.div>
		</div>
	);
}
