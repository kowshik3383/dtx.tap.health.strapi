'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { components } from '@/types/strapi';
import { trackEvent, trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

type BottomSheetProps =
	| {
			price: string;
			duration: string;
			tool_tip: string;
			buttonText: string;
			hide: boolean;
			// simplified version
			plans?: never;
			selectedPlan?: never;
	  }
	| {
			tool_tip: string;
			buttonText: string;
			plans: components['schemas']['Plan'][];
			selectedPlan: string;
			hide: boolean;
			// full version
			price?: never;
			duration?: never;
	  };

const BottomSheet = (props: BottomSheetProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const isV2o1 = pathname.includes('/v2o1');
	const isV2o2 = pathname.includes('/v2o2');
	const isV2o3 = pathname.includes('/v2o3');
	const isV2o4 = pathname.includes('/v2o4');
	const isV2oVariant = isV2o1 || isV2o2 || isV2o3 || isV2o4;

	const [isFixed, setIsFixed] = useState(false);
	const [showTooltip, setShowTooltip] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { login, isAuthenticated } = useAuth();

	const isV2O1 = pathname === '/v2o1';
	useEffect(() => {
		setShowTooltip(true);
	}, [props.selectedPlan]);

	const activePlan = props.plans?.find(
		plan => plan.subscription_plan === props.selectedPlan,
	);
	const displayPrice = isV2o3
		? activePlan?.price ?? '—'
		: isV2o4
			? '₹200'
			: isV2oVariant
				? '₹1299'
				: activePlan?.price ?? '—';

	const displayDuration = isV2o4
		? 'per month'
		: isV2oVariant
			? 'for 3 months'
			: activePlan?.plan_validity ?? 'plan';

	useEffect(() => {
		if (isV2o1 || isV2o2 || isV2o3 || isV2o4) {
			setIsFixed(true);
			return;
		}

		const handleScroll = () => {
			if (window.scrollY > 300 && !props.hide) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [props.hide, pathname]);

	const handleJoinNow = () => {
		trackEvent('Join Now Clicked', {
			url: window.location.href,
			button_source: 'bottom-sheet section',
			selected_plan: props.selectedPlan,
			value: 40,
			currency: 'INR',
		});

		trackFacebookPixelEvent('Join Now Clicked', {
			url: window.location.href,
			button_source: 'bottom-sheet section',
			selected_plan: props.selectedPlan,
		});

		registerIntentEvent('Join Now Clicked');

		if (displayPrice) {
			localStorage.setItem('selectedPrice', String(displayPrice));
		}


		if (isAuthenticated) {
			let redirectUrl = '/plans';

			if (isV2o3) {
				redirectUrl = '/v3plans';
			} else if (isV2oVariant) {
				redirectUrl = '/v2plans';
			}

			router.push(
				`${redirectUrl}?slug=${encodeURI(pathname)}&${searchParams.toString()}`,
			);
			return;
		}


		setIsModalOpen(true);
	};

	const handleCloseModal = () => setIsModalOpen(false);

	const handleLoginSuccess = (token: string) => {
		if (token) {
			login(token);
			let redirectUrl = '/plans';

			if (isV2o3) {
				redirectUrl = '/v3plans';
			} else if (isV2oVariant) {
				redirectUrl = '/v2plans';
			}
			router.push(
				`${redirectUrl}?slug=${encodeURI(
					pathname,
				)}&${searchParams.toString()}`,
			);
		}
	};
	const baseClasses =
		'z-50 flex items-center justify-between rounded-2xl border border-gray-200 bg-[#2563EB] py-3 shadow-md';
	const fixedClasses = 'fixed left-1/2 bottom-4 -translate-x-1/2';
	const hiddenClasses = 'hidden';

	return (
		<>
			<div
				className={`${baseClasses} ${
					isFixed ? fixedClasses : hiddenClasses
				} ${isV2o3 ? 'max-w-fit px-4' : 'w-[95%] max-w-md px-4'}`}
				aria-hidden={!isFixed}>
				{!isV2o3 && (
					<div className="text-left">
						<p className="text-lg leading-none font-semibold text-white">
							{displayPrice}
						</p>
						<div className="group relative flex cursor-pointer items-center gap-1">
							<p className="text-sm text-[#9EA7B8]">
								{displayDuration}
							</p>
							<div className="relative">
								<span className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold text-gray-400">
									{/* info icon can go here */}
								</span>
								{!isV2o1 && !isV2o2 && showTooltip && (
									<div className="absolute bottom-full left-1/2 z-10 mb-12 -translate-x-1/2">
										<div className="relative ml-20 w-[300px] rounded-xl bg-gray-800 px-4 py-3 text-sm text-white shadow-lg">
											<button
												className="absolute top-3 right-3 text-lg leading-none text-gray-300 transition-colors hover:text-white"
												onClick={() =>
													setShowTooltip(false)
												}>
												✕
											</button>
											<p className="pr-8 text-[11px] leading-relaxed">
												{props.tool_tip}
											</p>
										</div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 10 5"
											className="absolute top-full left-28 mt-[-1px] h-3 w-6 -translate-x-1/2">
											<path
												d="M0 0L5 5L10 0H0Z"
												fill="#374151"
											/>
										</svg>
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				<button
					onClick={handleJoinNow}
					style={{
						display: 'flex',
						alignItems: 'center',
						backgroundColor: '#FFFFFF',
						borderRadius: '28px',
						padding: '12px 24px',
						fontFamily: "'Urbanist', sans-serif",
						boxSizing: 'border-box',
						position: 'relative',
						overflow: 'hidden',
						transition: 'background-color 0.2s ease-in-out',
						textTransform: 'none',
					}}
					className={`text-sm font-semibold text-black ${
						isV2o3 ? 'mx-auto' : ''
					}`}>
					<span
						style={{
							content: '""',
							position: 'absolute',
							inset: 0,
							padding: '2px',
							borderRadius: '28px',
							background: '#2563EB',
							WebkitMask:
								'linear-gradient(white, white) content-box, linear-gradient(white, white)',
							WebkitMaskComposite: 'destination-out',
							zIndex: 0,
							pointerEvents: 'none',
						}}
					/>
					<span className="z-10 flex items-center justify-center gap-2 px-10">
						{props.buttonText}
					</span>
					<span
						style={{
							content: '""',
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

			<OtpLoginModal
				open={isModalOpen}
				handleClose={handleCloseModal}
				onLoginSuccess={handleLoginSuccess}
				isPartner={false}
				partnerName="Tap Health"
				price={0}
				planId=""
			/>
		</>
	);
};

export default BottomSheet;
