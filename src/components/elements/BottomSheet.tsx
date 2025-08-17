import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { ActionButton } from '@/components/elements';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { components } from '@/types/strapi';


type bottomSheet_ = components['schemas']['DynamicZoneBottomSheetComponent']
interface BottomSheetProps extends bottomSheet_ {
	price?: string;
	period?: string;
	buttonText?: string;
	offerText?: string;
	onBottomSheetClick?: () => void; // NEW PROP
}

const BottomSheet = ({
	price = '₹199',
	period = 'per month',
	buttonText = 'Join now',
	offerText,
	onBottomSheetClick, // use this instead of calling trackEvent
}: BottomSheetProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	const { login, isAuthenticated } = useAuth();
	const pathname = usePathname(); // ✅ get current path
	const handleOpenModal = () => {
		// Track join now button click event
		onBottomSheetClick?.(); // Parent decides what happens on click
		console.log('Current pathname:', pathname);
		// If user is already logged in, redirect directly to plans page
		if (isAuthenticated) {
			router.push(
				`/plans?slug=${encodeURIComponent(
					pathname,
				)}&${searchParams.toString()}`,
			);
			return;
		}
		// Otherwise, open the login modal
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

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
	const isFewerMedsPage = pathname.includes('/fewer_meds_more_moments_new');

	return (
		<>
			<div className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-[430px]">
				<div
					className="w-full rounded-[28px]"
					style={{
						background:
							'linear-gradient(289.07deg, #F5780B 33.61%, #F9A011 100%)',
					}}>
					{/* Top banner */}
					{offerText && (
						<div
							className="font-urbanist rounded-t-[24px] px-2 py-[4px] text-center text-[12px] leading-[100%] font-bold tracking-[-0.3%] text-white uppercase"
							style={{
								background:
									'linear-gradient(289.07deg, #F5780B 33.61%, #F9A011 100%)',
							}}>
							{offerText}
						</div>
					)}

					{/* Bottom sheet content */}

					{/* Main content */}
					<div className="flex w-full items-center justify-between rounded-t-3xl bg-white p-4">
						{/* Price Block */}
						<div className="ml-2 flex flex-col">
							{isFewerMedsPage ? (
								<>
									<span className="text-sm font-semibold text-gray-500">
										{period}
									</span>
									<span className="text-2xl font-bold text-gray-800">
										{price}
									</span>
								</>
							) : (
								<>
									<span className="text-2xl font-bold text-gray-800">
										{price}
									</span>
									<span className="text-sm font-semibold text-gray-500">
										{period}
									</span>
								</>
							)}
						</div>

						{/* CTA Button */}
						<div className="mr-2 w-[239px]">
							<ActionButton
								onClick={handleOpenModal}
								id="bottom-sheet-cta-button"
								backgroundColor="#2563EB"
								width="100%"
								className="rounded-full py-3"
								rightContent={
									<div className="w-full text-center text-[16px] font-bold text-white">
										{buttonText}
									</div>
								}
							/>
						</div>
					</div>
				</div>
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
