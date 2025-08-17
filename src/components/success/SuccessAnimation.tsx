import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useEffect } from 'react';
import { ANIMATION_VARIANTS, STYLE_CONSTANTS } from './constants/animations';
import { useSuccessAnimation } from './hooks/useSuccessAnimation';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import successAnimationData from '../../../public/successAnimation.json';

interface SuccessAnimationProps {
	subtitle: string;
	onClose?: () => void;
	onAnimationComplete?: () => void;
}

const SuccessAnimation: FC<SuccessAnimationProps> = ({
	subtitle,
	onClose,
	onAnimationComplete,
}) => {
	const { animationComplete, textReduced } = useSuccessAnimation({
		onAnimationComplete,
	});

	useEffect(() => {
		if (textReduced) console.log('Text reduced state activated');
		if (animationComplete) console.log('Animation completed');
	}, [textReduced, animationComplete]);

	return (
		<motion.div
			className="relative flex w-full flex-col items-center justify-center"
			initial={{ height: '100vh' }}
			animate={{ height: textReduced ? '50vh' : '100vh' }}
			transition={{ duration: 0.8, ease: 'easeInOut' }}
			style={{
				overflow: 'hidden',
				position: 'relative',
				background: 'white',
			}}>
			{/* Top semi-hemisphere background */}
			<motion.div
				className="absolute top-0 left-1/2 -translate-x-1/2 transform"
				initial={{
					height: '100vh',
					borderBottomLeftRadius: '0%',
					borderBottomRightRadius: '0%',
				}}
				animate={{
					height: textReduced ? '30vh' : '100vh',
					borderBottomLeftRadius: textReduced ? '100%' : '0%',
					borderBottomRightRadius: textReduced ? '100%' : '0%',
				}}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
				style={{
					width: '200vw',
					background: '#059669',
					zIndex: 0,
				}}
			/>

			{/* Close button */}
			{onClose && (
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			)}

			{/* Confetti animation */}
			<motion.div
				className="absolute inset-0 z-0"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}>
				<Lottie
					animationData={successAnimationData}
					loop={false}
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
					}}
				/>
			</motion.div>

			{/* Main content */}
			<motion.div
				className="relative z-10 flex w-full flex-col items-center justify-center pt-16"
				style={STYLE_CONSTANTS.CONTENT_STYLE}
				animate={{
					top: textReduced ? '20%' : '50%',
				}}
				transition={{
					type: 'spring',
					stiffness: 120,
					damping: 15,
					duration: 0.7,
				}}>
				<motion.div
					className="mb-6 flex items-center justify-center rounded-full"
					style={STYLE_CONSTANTS.CHECKMARK_CONTAINER}
					variants={ANIMATION_VARIANTS.checkmark}
					initial="initial"
					animate="animate">
					<Image
						src="/assets/right.svg"
						alt="Success check mark"
						width={58}
						height={58}
						className="object-contain"
					/>
				</motion.div>

				<motion.div
					className="text-center"
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						scale: textReduced ? 0.85 : 1,
					}}
					transition={{
						opacity: { duration: 0.5, delay: 0.5 },
						scale: { duration: 0.4, delay: 0.1 },
					}}>
					<h2
						className="font-urbanist mb-2 text-[26px] leading-none font-extrabold text-white"
						style={STYLE_CONSTANTS.TEXT_STYLE}>
						You're in!
					</h2>
					<p
						className="font-urbanist text-sm leading-none font-medium text-white"
						style={STYLE_CONSTANTS.TEXT_STYLE}>
						{subtitle || 'Your plan is now active'}
					</p>
				</motion.div>
			</motion.div>

			{/* Bottom curve (optional, for design symmetry) */}
			<motion.div
				className="absolute bottom-0 w-full"
				style={{
					...STYLE_CONSTANTS.CURVED_EDGE,
					height: '25vh',
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: textReduced ? 1 : 0 }}
				transition={{ duration: 0.4 }}>
				<div
					className="absolute left-[-50%] h-full w-[200%] bg-white"
					style={{
						...STYLE_CONSTANTS.CURVED_SHAPE,
						bottom: '-40%',
					}}
				/>
			</motion.div>
		</motion.div>
	);
};

export default SuccessAnimation;
