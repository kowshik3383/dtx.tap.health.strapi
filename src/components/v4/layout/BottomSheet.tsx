'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';

export default function BottomSheet({
	join_message,
	mrp,
	discounted_price,
	per_tag,
	buttonText,
	message,
	refund_message,
}: components['schemas']['DynamicZoneV4BottomSheetComponent']) {
	const sheetRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const isV6 = pathname.includes('/v6');
	const isV7 = pathname.includes('/v7');
	const isV8 = pathname.includes('/v8');
	const { login, isAuthenticated } = useAuth();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const getPrice = (): number | null => {
		if (isV6) return 1299;
		if (isV7) return 2399;
		if (isV8) return 2399;
		return null;
	};

	const handleJoinNow = () => {
		trackEvent('Join Now Clicked', {
			url: window.location.href,
			button_source: 'pricing section desktop',
			value: 40,
			currency: 'INR',
		});

		const price = getPrice();
		if (price !== null) {
			localStorage.setItem('selectedPrice', price.toString());
		}

		if (isAuthenticated) {
			router.push(
				`/plans?slug=${encodeURIComponent(
					pathname,
				)}&${searchParams.toString()}`,
			);
		} else {
			setIsModalOpen(true);
		}
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

	return (
		<>
			<AnimatePresence>
				<motion.div
					ref={sheetRef}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ type: 'spring', stiffness: 120, damping: 20 }}
					className="pb-safe fixed bottom-0 left-1/2 z-50 w-screen -translate-x-1/2 px-0 sm:w-screen sm:px-0 md:w-screen md:px-0 lg:w-[400px] lg:px-6">
					{/* Show refund banner for v7 and v8 */}
					{refund_message && (
						<div className="-mb-2 w-full rounded-t-2xl bg-[#059669] px-4 py-3 text-start text-[12px] font-semibold text-white shadow-sm sm:text-sm">
							{refund_message}
						</div>
					)}

					{/* Main pricing card */}
					<div className="z-50 mt-0 flex h-[78px] w-full items-center justify-between rounded-[16px] border bg-white px-4 shadow-lg sm:h-[88px] sm:px-6 md:px-8">
						{isV8 ? (
							<>
								{/* Replace content for v8 only here, keep layout */}
								<div className="flex flex-col justify-start gap-1">
									<div className="font-['Urbanist'] text-xl font-bold text-slate-800">
										{mrp}
									</div>
									<div className="font-['Urbanist'] text-sm font-semibold text-slate-500">
										{message}
									</div>
								</div>
								<button
									onClick={handleJoinNow}
									className="relative inline-flex items-center justify-center rounded-[28px] bg-blue-600 px-6 py-3 text-sm font-semibold text-white">
									{buttonText}
								</button>
							</>
						) : isV6 ? (
							<div className="flex flex-col justify-center">
								<p className="text-[10px] font-semibold text-[#121826] opacity-60 sm:text-xs">
									{join_message}
								</p>
								<p className="text-[18px] font-extrabold text-[#121826] sm:text-[20px]">
									{discounted_price}
								</p>
							</div>
						) : (
							<div className="flex flex-col justify-center">
								<p className="mb-[2px] text-left text-[10px] font-semibold text-[#121826] opacity-60 sm:text-xs">
									{join_message}
								</p>
								<div className="flex items-baseline space-x-1">
									<span className="text-[12px] font-medium text-[#2563EB] line-through opacity-40 sm:text-sm">
										{mrp}
									</span>
									<span className="text-[18px] font-extrabold text-[#121826] sm:text-[20px]">
										{discounted_price}
									</span>
									<span className="text-[12px] font-bold text-[#121826] opacity-70 sm:text-sm">
										{per_tag}
									</span>
								</div>
								{isV7 && (
									<p className="mt-[2px] text-[11px] font-medium text-[#4b5563] sm:text-xs">
										{message}
									</p>
								)}
							</div>
						)}

						{/* Join Now button for v6 and v7 */}
						{!isV8 && (
							<button
								onClick={handleJoinNow}
								className="relative inline-flex max-w-full min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-[28px] bg-white px-6 py-2.5 text-sm font-semibold whitespace-nowrap text-black ring-0 focus:outline-none sm:px-8 sm:py-3 md:px-10 lg:max-w-[300px]">
								<span className="pointer-events-none absolute top-1/2 left-[-40%] z-[1] h-[58px] w-[150px] rotate-[-63deg] animate-[moveShine_3s_linear_infinite] bg-white/40 backdrop-blur-[3px]" />
								<span className="pointer-events-none absolute inset-0 z-0 rounded-[28px] bg-blue-600 [mask-composite:exclude] p-[2px] [mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)]" />
								<span className="relative z-10 text-white">
									{buttonText}
								</span>
							</button>
						)}
					</div>
				</motion.div>
			</AnimatePresence>

			<OtpLoginModal
				open={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				onLoginSuccess={handleLoginSuccess}
				isPartner={false}
				partnerName="Tap Health"
				price={0}
				planId=""
			/>
		</>
	);
}
