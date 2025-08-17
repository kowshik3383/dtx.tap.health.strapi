'use client';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import animationData from '../../../public/price.json';

interface Props {
	setJoinNowVisible?: (visible: boolean) => void;
}

const PriceHighlightSection = ({ setJoinNowVisible }: Props) => {
	const router = useRouter();
	const lottieRef = useRef<LottieRefCurrentProps>(null);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { ref: joinNowRef, inView: joinNowVisible } = useInView({
		threshold: 0.8,
		triggerOnce: false,
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const { login, isAuthenticated } = useAuth();

	useEffect(() => {
		if (setJoinNowVisible) setJoinNowVisible(joinNowVisible);
		if (joinNowVisible) {
			lottieRef.current?.stop();
			lottieRef.current?.play();
		}
	}, [joinNowVisible, setJoinNowVisible]);

	const handleJoinNow = () => {
		if (isAuthenticated) {
			router.push(
				`/plans?slug=${encodeURIComponent(
					pathname,
				)}&${searchParams.toString()}`,
			);
			return;
		}
		setIsModalOpen(true);
	};

	const handleCloseModal = () => setIsModalOpen(false);

	const handleLoginSuccess = (token: string) => {
		if (token) {
			login(token);
			router.push(
				`/plans?slug=${encodeURIComponent(
					pathname,
				)}&${searchParams.toString()}`,
			);
		}
	};

	return (
		<div
			className="mt-6 flex w-full flex-col items-center rounded-lg pt-6 text-center"
			style={{
				background:
					'radial-gradient(50% 50% at 50% 50%, #A4FFFF 0%, #FFFFFF 100%)',
			}}>
			<h2 className="font-urbanist mb-6 py-3 text-2xl leading-relaxed font-bold text-[#252E49] md:text-3xl">
				Get smart diabetes care for the price of a{' '}
				<span className="bg-yellow-300 px-1">monthly newspaper</span>{' '}
				<span className="bg-yellow-300 px-1">subscription.</span>
			</h2>

			<div
				className="mt-4 mb-7 flex w-full justify-center px-4"
				ref={joinNowRef}>
				<Lottie
					lottieRef={lottieRef}
					animationData={animationData}
					loop={false}
					autoplay={false}
					style={{
						width: '100%',
						maxWidth: 600,
						height: 100,
						cursor: 'pointer',
					}}
					onClick={handleJoinNow}
				/>
				<OtpLoginModal
					open={isModalOpen}
					handleClose={handleCloseModal}
					onLoginSuccess={handleLoginSuccess}
					isPartner={false}
					partnerName="Tap Health"
					price={0}
					planId=""
				/>
			</div>

			<div className="mt-6 mb-6 flex w-full justify-center px-2">
				<button
					onClick={handleJoinNow}
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#2563EB',
						borderRadius: '28px',
						padding: '14px 24px',
						fontFamily: "'Urbanist', sans-serif",
						boxSizing: 'border-box',
						position: 'relative',
						overflow: 'hidden',
						transition: 'background-color 0.2s ease-in-out',
						textTransform: 'none',
						color: 'white',
						fontWeight: 600,
						fontSize: '17px',
						width: '100%',
						maxWidth: '800px',
						boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)',
					}}>
					{/* Gradient border shine layer */}
					<span
						style={{
							position: 'absolute',
							inset: 0,
							padding: '2px',
							borderRadius: '28px',
							background:
								'linear-gradient(106.38deg, rgba(234,230,223,0.83) 3.07%, #FBBF24 39.93%)',
							WebkitMask:
								'linear-gradient(white, white) content-box, linear-gradient(white, white)',
							WebkitMaskComposite: 'destination-out',
							maskComposite: 'exclude',
							zIndex: 0,
							pointerEvents: 'none',
						}}
					/>

					{/* Button Text */}
					<span
						className="z-10 flex items-center justify-center gap-2"
						style={{ position: 'relative', zIndex: 2 }}>
						Join Tap Health
					</span>

					{/* Shine animation */}
					<span
						style={{
							position: 'absolute',
							top: '50%',
							left: '-40%',
							width: '150px',
							height: '58px',
							background: 'rgba(255, 255, 255, 0.4)',
							backdropFilter: 'blur(3px)',
							transform: 'translate(-50%, -50%) rotate(-63deg)',
							animation: 'moveShine 3s infinite linear',
							zIndex: 1,
							pointerEvents: 'none',
						}}
					/>
				</button>
			</div>
		</div>
	);
};

export default PriceHighlightSection;
