'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { trackEvent } from '@/utils/analytics';

type PlanPosition = 'left' | 'center' | 'right';
type Theme = 'light' | 'dark';

type PricingPlan = {
	id: PlanPosition;
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
		id: 'left',
		title: 'Tap Health',
		planTitle: '3 Months Plan',
		topDescription: 'Begin your healthy life',
		bottomDescription: 'Quarterly Plan',
		currentPrice: '₹1299',
		perMonth: '₹433 /month',
		theme: 'light',
	},
	{
		id: 'center',
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
		id: 'right',
		title: 'Tap Health',
		planTitle: '6 Months Plan',
		topDescription: 'Keep getting healthier',
		bottomDescription: 'Half Yearly Plan',
		originalPrice: '₹2598',
		currentPrice: '₹1999',
		perMonth: '₹334 /month',
		savePercent: '43%',
		showSaveOnLarge: false,
		theme: 'light',
	},
];

export default function PricingSectionDesktop() {
	const router = useRouter();
	const { login, isAuthenticated } = useAuth();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const handleJoinNow = () => {
		trackEvent('Join Now Clicked', {
			url: window.location.href,
			button_source: 'pricing section desktop',
			value: 40,
			currency: 'INR',
		});
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
		<div className="hidden xl:flex xl:items-end xl:justify-center xl:gap-8 2xl:gap-12">
			{plans.map(plan => (
				<div
					key={plan.id}
					className={`relative transition-all duration-300 xl:w-80 2xl:w-96 ${
						plan.id === 'center'
							? 'z-30 scale-105'
							: 'z-20 scale-100'
					}`}>
					{plan.isPopular && (
						<div className="absolute -top-6 left-1/2 z-10 w-28 -translate-x-1/2 2xl:w-32">
							<div
								style={{
									background:
										'linear-gradient(159deg, #FFDE72 0%, #FFEAA7 37%, #DAAC19 43%, #FFD654 59%, #DAAC19 67%, #FFEAA7 80%, #DAAC19 91%, #FFDE72 100%)',
								}}
								className="rounded-3xl border border-yellow-300 py-2 text-center shadow-md 2xl:py-3">
								<span className="font-sans text-sm font-semibold text-slate-800 2xl:text-base">
									Most Popular
								</span>
							</div>
						</div>
					)}

					<div
						className={`${
							plan.theme === 'dark'
								? 'bg-gradient-to-b from-slate-800 to-slate-900 outline-2 outline-amber-200 xl:shadow-2xl'
								: 'bg-white/95 outline-2 outline-blue-200 backdrop-blur-sm xl:shadow-xl'
						} ${
							plan.id === 'center'
								? 'xl:h-[420px] 2xl:h-[480px]'
								: 'xl:h-[360px] 2xl:h-[440px]'
						} flex flex-col justify-between rounded-2xl p-6 xl:rounded-3xl xl:transition-all xl:duration-300 xl:hover:shadow-2xl 2xl:p-8`}>
						<div className="flex flex-col items-center gap-6 2xl:gap-8">
							<div className="flex flex-col items-center gap-3 text-center 2xl:gap-4">
								<div
									className={`${
										plan.theme === 'dark'
											? 'text-white'
											: 'text-slate-800'
									} font-sans text-sm font-semibold 2xl:text-base`}>
									{plan.title}
								</div>
								<div
									className={`${
										plan.theme === 'dark'
											? 'text-2xl text-amber-200 2xl:text-3xl'
											: 'text-xl text-blue-600 2xl:text-2xl'
									} font-sans font-extrabold`}>
									{plan.planTitle}
								</div>
							</div>

							<div
								className={`${
									plan.theme === 'dark'
										? 'w-48 bg-slate-600 2xl:w-56'
										: 'w-40 bg-indigo-200 2xl:w-48'
								} h-px`}
							/>

							<div className="text-center">
								<div
									className={`${
										plan.theme === 'dark'
											? 'text-white'
											: 'text-slate-800'
									} mb-1 font-sans text-sm font-bold 2xl:text-base`}>
									{plan.topDescription}
								</div>
								<div
									className={`${
										plan.theme === 'dark'
											? 'text-slate-400'
											: 'text-slate-500'
									} font-sans text-sm font-medium 2xl:text-base`}>
									{plan.bottomDescription}
								</div>
							</div>

							<div className="flex flex-col items-center gap-2 2xl:gap-3">
								{plan.originalPrice ? (
									<div className="flex items-end gap-2 2xl:gap-3">
										<span
											className={`${
												plan.theme === 'dark'
													? 'text-lg text-slate-400 2xl:text-xl'
													: 'text-base text-gray-400 2xl:text-lg'
											} font-sans font-medium line-through`}>
											{plan.originalPrice}
										</span>
										<span
											className={`${
												plan.theme === 'dark'
													? 'text-3xl text-amber-200 2xl:text-4xl'
													: 'text-2xl text-slate-800 2xl:text-3xl'
											} font-sans font-extrabold`}>
											{plan.currentPrice}
										</span>
									</div>
								) : (
									<div className="font-sans text-2xl font-extrabold text-slate-800 2xl:text-3xl">
										{plan.currentPrice}
									</div>
								)}

								<div
									className={`${
										plan.theme === 'dark'
											? 'text-amber-200'
											: 'text-slate-500'
									} font-sans text-sm font-medium 2xl:text-base`}>
									Costs you {plan.perMonth}
								</div>

								{plan.savePercent && plan.showSaveOnLarge && (
									<div
										className={`rounded-full px-4 py-1 2xl:px-5 2xl:py-1.5 ${
											plan.theme === 'dark'
												? 'bg-white/10'
												: 'bg-blue-600/10'
										}`}>
										<span
											className={`${
												plan.theme === 'dark'
													? 'font-medium text-white/70'
													: 'font-semibold text-blue-600'
											} font-sans text-sm 2xl:text-base`}>
											You Save{' '}
										</span>
										<span
											className={`${
												plan.theme === 'dark'
													? 'text-white'
													: 'text-blue-600'
											} font-sans text-sm font-extrabold 2xl:text-base`}>
											{plan.savePercent}
										</span>
									</div>
								)}
							</div>
						</div>

						<button
							onClick={handleJoinNow}
							className={`${
								plan.theme === 'dark'
									? 'border border-blue-600 bg-white px-8 py-4 text-lg text-blue-600 hover:border-blue-700 hover:bg-gray-100 2xl:px-10 2xl:py-5 2xl:text-xl'
									: 'border border-blue-300 bg-blue-100 px-6 py-3 text-base text-blue-700 hover:border-blue-400 hover:bg-blue-200 2xl:px-8 2xl:py-4 2xl:text-lg'
							} w-full rounded-full font-sans font-bold transition-all duration-300 xl:hover:scale-105 xl:hover:shadow-lg`}>
							Join now
						</button>
					</div>
				</div>
			))}

			<OtpLoginModal
				open={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				onLoginSuccess={handleLoginSuccess}
				isPartner={false}
				partnerName="Tap Health"
				price={0}
				planId=""
			/>
		</div>
	);
}
