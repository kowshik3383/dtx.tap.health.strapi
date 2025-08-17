'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';
import PricingDynamicZoneManager from './pricing-manager';


const PricingCard: React.FC<{
	// props_: Pricingprops;
	highlighted_title: string;
	title_line_1: string;
	title_line_2: string;
	plans: components['schemas']['Plan'][];
	selectedPlan: string;
	setSelectedPlan: (plan: string) => void;
	setJoinNowVisible: (visible: boolean) => void;
	dynamic_zone?: components['schemas']['DynamicZonePricing2Component']['dynamic_zone'];
}> = ({
	selectedPlan,
	setSelectedPlan,
	setJoinNowVisible,
	highlighted_title,
	title_line_1,
	title_line_2,
	plans,
	dynamic_zone,
}) => {
	const router = useRouter();
	const { ref: joinNowRef, inView: joinNowVisible } = useInView({
		threshold: 1,
	});
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const { login, isAuthenticated } = useAuth();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	useEffect(() => {
		setJoinNowVisible(joinNowVisible);
	}, [joinNowVisible]);

	const handleJoinNow = () => {
		trackEvent('Join Now Clicked', {
			url: window.location.href,
			button_source: 'pricing section',
			value: 40,
			currency: 'INR',
		});
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

	const selectedPlanDetails = plans.find(
		p => p.subscription_plan === selectedPlan,
	);

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
			<h2 className="mt-9 mb-10 text-center text-3xl font-semibold text-gray-800 sm:text-4xl">
				<span className="font-bold text-blue-600">
					{highlighted_title}
				</span>{' '}
				{title_line_1}
				<br />
				{title_line_2}
			</h2>

			{/* Pricing Cards */}
			<div className="mb-6 flex w-full rounded-2xl bg-white">
				{plans?.map(plan => {
					const isSelected = selectedPlan === plan.subscription_plan;
					return (
						<div
							key={plan.subscription_plan}
							className={`relative flex-1 cursor-pointer overflow-hidden rounded-xl p-3 text-center transition-all duration-300 ${
								isSelected
									? 'text-white'
									: 'mx-[1px] border border-gray-200 px-2 text-gray-600 hover:bg-gray-200'
							} ${
								plan.subscription_plan === 'Yearly'
									? 'mt-[-30px] pt-12'
									: 'mt-0'
							}`}
							style={
								isSelected
									? {
											background:
												'radial-gradient(88.91% 100% at 94.32% 100%, #2563EB 0%, #03369C 100%)',
									  }
									: {}
							}
							onClick={() =>
								setSelectedPlan(plan.subscription_plan)
							}>
							{plan.recommended && (
								<div
									className="absolute -top-2 left-1/2 mb-3 -translate-x-1/2 transform rounded-md px-6 py-2 pt-5 text-[12px] font-bold text-white"
									style={{
										backgroundColor:
											plan.subscription_plan ===
												'Yearly' && isSelected
												? '#2563EB'
												: '#9EA7B8',
									}}>
									RECOMMENDED
								</div>
							)}

							<div className="mt-2">
								<p className="mb-4 flex items-center justify-center gap-6 text-sm font-bold">
									{plan.subscription_plan}
									{isSelected && (
										<span className="text-lg font-bold text-blue-400">
											<svg
												width="19"
												height="19"
												viewBox="0 0 19 19"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M9.51318 0.5C14.4837 0.5 18.5132 4.52944 18.5132 9.5C18.5132 14.4706 14.4837 18.5 9.51318 18.5C4.54262 18.5 0.513184 14.4706 0.513184 9.5C0.513184 4.52944 4.54262 0.5 9.51318 0.5ZM8.4458 11.0176L6.22021 8.79297L4.80615 10.207L8.58057 13.9814L9.28174 13.1406L14.2817 7.14062L12.7446 5.85938L8.4458 11.0176Z"
													fill="#EDF5FF"
												/>
											</svg>
										</span>
									)}
								</p>

								<div className="mb-2 h-[24px]">
									{plan.save && (
										<div
											className={`inline-block rounded px-2 py-1 text-xs ${
												isSelected
													? 'bg-white text-green-800'
													: 'bg-[#DCE1E8] font-bold text-black'
											}`}>
											{`SAVE ${plan.save}`}
										</div>
									)}
								</div>

								<p className="text-xl font-bold">
									{plan.price}
								</p>
								<span className="text-sm font-normal">
									{plan.plan_validity}
								</span>
								<p className="text-xs opacity-80">
									{plan.price_per_month}
								</p>
							</div>
						</div>
					);
				})}
			</div>

			{/* Join Now Button */}
			<button
				ref={joinNowRef}
				onClick={handleJoinNow}
				className="relative z-0 mt-4 mb-7 w-full max-w-[800px] overflow-hidden rounded-[28px] bg-blue-600 px-6 py-3 text-[17px] font-semibold text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-colors duration-200 hover:bg-blue-700 focus:outline-none">
				{/* Shine animation */}
				<span className="pointer-events-none absolute top-1/2 left-[-40%] z-10 h-[58px] w-[150px] -translate-y-1/2 -rotate-[63deg] transform animate-[moveShine_3s_linear_infinite] bg-white/40 backdrop-blur-sm" />

				{/* Blue glowing border mask effect (optional visual enhancement) */}
				<span className="pointer-events-none absolute inset-0 z-0 rounded-[28px] bg-blue-600 [mask-composite:exclude] p-[2px] [mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)]" />

				{/* Main content */}
				<span className="relative z-20 flex items-center justify-center gap-2">
					Join Now{' '}
					{selectedPlanDetails
						? `at ${selectedPlanDetails.price}`
						: ''}
				</span>
			</button>

			<OtpLoginModal
				open={isModalOpen}
				handleClose={handleCloseModal}
				onLoginSuccess={handleLoginSuccess}
				isPartner={false}
				partnerName="Tap Health"
				price={0}
				planId=""
			/>
			{dynamic_zone && dynamic_zone.length > 0 && (
				<PricingDynamicZoneManager
					dynamicZone={dynamic_zone}
					locale="en"
				/>
			)}
			
		</div>
	);
};

export default PricingCard;
