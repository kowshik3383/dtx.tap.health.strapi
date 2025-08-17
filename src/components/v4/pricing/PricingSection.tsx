'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';
import PricingSectionDesktop from './PricingSectionDesktop';

type PricingSection_ = components['schemas']['DynamicZonePricingComponent'];
type PricingPlans = components['schemas']['Plan'];
interface PricingSectionProps extends PricingSection_ {
	plans: PricingPlans[]; // From Strapi
}
type PlanPosition = 'left' | 'center' | 'right';
type Theme = 'light' | 'dark';

type PricingPlan = {
	position: PlanPosition;
	isPopular?: boolean;
	title: string;
	planTitle: string;
	topDescription: string;
	bottomDescription: string;
	originalPrice?: string;
	currentPrice: string;
	perMonth: string;
	savePercent?: string;
	showSaveOnLarge?: boolean;
	theme: Theme;
};

const plans: PricingPlan[] = [
	{
		position: 'left',
		title: 'Tap Health',
		planTitle: '3 Months Plan',
		topDescription: 'Begin your healthy life',
		bottomDescription: 'Quarterly Plan',
		currentPrice: '₹1299',
		perMonth: '₹433 /month',
		theme: 'light',
	},
	{
		position: 'center',
		title: 'Tap Health',
		planTitle: '12 Months Plan',
		topDescription: 'Commit to your health',
		bottomDescription: 'Annual Plan',
		originalPrice: '₹2799',
		currentPrice: '₹2399',
		perMonth: '₹200 /month',
		savePercent: '54%',
		showSaveOnLarge: true,
		isPopular: true,
		theme: 'dark',
	},
	{
		position: 'right',
		title: 'Tap Health',
		planTitle: '6 Months Plan',
		topDescription: 'Keep getting healthier',
		bottomDescription: 'Half Yearly Plan',
		originalPrice: '₹2598',
		currentPrice: '₹1999',
		perMonth: '₹334 /month',
		savePercent: '43%',
		showSaveOnLarge: false, // Hide on large devices
		theme: 'light',
	},
];

export default function PricingSection({
	title_line_1,
	title_line_2,
	plans,
}: PricingSectionProps) {
	const router = useRouter();
	const pathname = usePathname();
	const isV6 = pathname === '/v6';
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const searchParams = useSearchParams();
	const { login, isAuthenticated } = useAuth();

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
	const getCardPosition = (id: PlanPosition) => {
		switch (id) {
			case 'left':
				return 'left-0 top-16 xl:left-0 xl:top-8 xl:relative xl:transform-none';
			case 'center':
				return 'left-1/2 transform -translate-x-1/2 top-8 xl:left-auto xl:top-8 xl:translate-x-0 xl:relative';
			case 'right':
				return 'right-0 top-16 xl:right-0 xl:top-8 xl:relative xl:transform-none';
		}
	};
	const isV678 =
		pathname.includes('/v6') ||
		pathname.includes('/v7') ||
		pathname.includes('/v8');
	return (
		<section
			className="bg-[#2563EB]"
			style={{
				background:
					'linear-gradient(179.56deg, #2563EB 0.38%, #253D77 97.63%)',
			}}>
			<div className="mb-8 flex w-full flex-col items-center gap-3 text-center xl:mb-12 xl:gap-4">
				<p className="font-urbanist text-sm font-semibold text-white/80 xl:text-base">
					{title_line_1}
				</p>
				<h2 className="font-urbanist text-2xl font-extrabold text-white xl:text-4xl 2xl:text-5xl">
					{title_line_2}
				</h2>
			</div>

			<div className="flex w-full items-center justify-center">
				<div className="w-full max-w-sm xl:max-w-6xl 2xl:max-w-7xl">
					{/* ✅ Mobile Layout: Overlapping stacked cards */}
					<div className="relative h-[360px] w-full xl:hidden">
						{plans.map((plan, ind) => (
							<div
								key={`${plan.title}-${ind}`}
								className={`absolute ${
									plan.position === 'center'
										? 'w-36 xl:w-40'
										: 'w-32'
								} ${getCardPosition(plan.position)} ${
									plan.position === 'center' ? 'z-30' : 'z-20'
								}`}>
								{plan.recommended && (
									<div className="absolute -top-4 left-1/2 z-10 w-20 -translate-x-1/2">
										<div
											style={{
												background:
													'linear-gradient(159deg, #FFDE72 0%, #FFEAA7 37%, #DAAC19 43%, #FFD654 59%, #DAAC19 67%, #FFEAA7 80%, #DAAC19 91%, #FFDE72 100%)',
											}}
											className="rounded-3xl border border-yellow-300 text-center shadow-md">
											<span className="font-sans text-xs font-semibold text-slate-800">
												Most Popular
											</span>
										</div>
									</div>
								)}

								<div
									className={`${
										plan.theme === 'dark'
											? 'bg-gradient-to-b from-slate-800 to-slate-900 outline-1 outline-amber-200'
											: 'bg-white/90 outline-2 outline-blue-200 backdrop-blur-sm'
									} ${
										isV6
											? plan.position === 'center'
												? 'h-64'
												: 'h-56'
											: plan.position === 'center'
											? 'h-72'
											: 'h-64'
									} flex flex-col justify-between rounded-xl p-3 shadow-lg`}>
									<div className="flex flex-col items-center gap-4">
										<div className="flex flex-col items-center gap-2 text-center">
											{!isV678 && (
												<div
													className={`${
														plan.theme === 'dark'
															? 'text-white'
															: 'text-slate-800'
													} font-sans text-[10px] font-semibold`}>
													{plan.title}
												</div>
											)}
											<div
												className={`${
													plan.theme === 'dark'
														? 'text-base text-amber-200'
														: 'text-sm text-blue-600'
												} font-sans font-extrabold`}>
												{plan.subscription_plan2}
											</div>
										</div>

										<div
											className={`${
												plan.theme === 'dark'
													? 'w-28 bg-slate-600'
													: 'w-24 bg-indigo-200'
											} h-px`}
										/>

										<div className="text-center">
											{!isV678 && (
												<div
													className={`${
														plan.theme === 'dark'
															? 'text-white'
															: 'text-slate-800'
													} font-sans text-[10px] font-bold`}>
													{plan.plan_message}
												</div>
											)}
											{!isV678 && (
												<div
													className={`${
														plan.theme === 'dark'
															? 'text-slate-400'
															: 'text-slate-500'
													} font-sans text-[10px] font-medium`}>
													{`${plan.subscription_plan} Plan`}
												</div>
											)}
										</div>

										<div className="flex flex-col items-center gap-1">
											{plan.mrp ? (
												<div className="flex items-end gap-1">
													<div className="relative">
														<span
															className={`${
																plan.theme ===
																'dark'
																	? 'text-xs text-slate-400'
																	: 'text-[10px] text-gray-400'
															} font-sans font-medium line-through`}>
															{plan.mrp}
														</span>
													</div>
													<span
														className={`${
															plan.theme ===
															'dark'
																? 'text-xl text-amber-200'
																: 'text-base text-slate-800'
														} font-sans font-extrabold`}>
														{plan.price}
													</span>
												</div>
											) : (
												<div className="font-sans text-base font-extrabold text-slate-800">
													{plan.price}
												</div>
											)}
											<div
												className={`${
													plan.theme === 'dark'
														? 'text-amber-200'
														: 'text-slate-500'
												} font-sans text-[10px] font-medium`}>
												{isV678
													? plan.price_per_month
													: `Costs you ${plan.price_per_month}`}
											</div>

											{plan.save && (
												<div
													className={`rounded-full px-2 py-0 ${
														plan.theme === 'dark'
															? 'bg-white/10'
															: 'bg-blue-600/10'
													}`}>
													<span
														className={`${
															plan.theme ===
															'dark'
																? 'font-medium text-white/70'
																: 'font-semibold text-blue-600'
														} font-sans text-[10px]`}>
														You Save{' '}
													</span>
													<span
														className={`${
															plan.theme ===
															'dark'
																? 'text-white'
																: 'text-blue-600'
														} font-sans text-[10px] font-extrabold`}>
														{plan.save}
													</span>
												</div>
											)}
										</div>
									</div>
									<button
										onClick={handleJoinNow}
										className={`${
											plan.theme === 'dark'
												? 'bg-white px-5 py-2.5 text-sm text-blue-600 outline-1 outline-blue-600 hover:bg-gray-100'
												: 'bg-blue-100 px-4 py-2 text-xs text-blue-700 outline-1 outline-blue-300 hover:bg-blue-200'
										} w-full rounded-full font-sans font-bold transition-colors`}>
										Join now
									</button>
								</div>
							</div>
						))}
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

					{/* Desktop */}
					<PricingSectionDesktop />

					{/* Bottom CTA */}
				</div>
			</div>
		</section>
	);
}
