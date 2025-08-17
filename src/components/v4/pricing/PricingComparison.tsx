'use client';

import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { components } from '@/types/strapi';

interface TapHealthProps_ {
	title?: string;
	primaryTitle?: string;
	plans: components['schemas']['DynamicZonePricingComparisonComponent']['plans'];
	features: components['schemas']['DynamicZonePricingComparisonComponent']['features'];
}
export default function TapHealthPricing({
	title,
	primaryTitle,
	plans,
	features,
}: TapHealthProps_) {
	if (plans?.length === 0) return null;

	const firstPlan = plans?.[0];
	return (
		<div
			className="font-urbanist bg-[#2563EB] flex w-full flex-col items-start gap-11 py-8"

		>
			<div className="flex w-full flex-col items-center gap-3">
				<p className="text-center text-[16px] font-semibold text-white/60">
					{title}
				</p>
				<h2 className="text-center text-[24px] font-extrabold text-white">
					{primaryTitle}
				</h2>
			</div>

			<div className="w-full md:hidden">
				<div className="flex w-full">
					{/* Features Column */}
					<div className="flex w-48 shrink-0 flex-col gap-3 pt-6">
						<p className="ml-3 text-xs font-semibold text-white">
							Features
						</p>
						<div className="ml-3 rounded-l-xl bg-slate-100 p-2">
							<ul className="flex h-80 flex-col justify-between gap-2 pb-2">
								{features?.map((feature, idx) => (
									<li
										key={idx}
										className="text-[10px] leading-4 text-slate-600">
										{/* {feature.map((part, i) =>
											typeof part === 'string' ? (
												part
											) : ( */}
										<span
											className={
												feature?.text1_bold
													? 'font-bold'
													: ''
											}>
											{feature.text1}
										</span>
										<span
											className={
												feature.text2_bold
													? 'font-bold'
													: ''
											}>
											{feature.text2}
										</span>
										{/* ),
										)} */}
									</li>
								))}
							</ul>
						</div>
						<p className="mt-2 ml-3 text-xs font-bold text-white">
							Price per year
						</p>
					</div>

					{/* Plans Grid */}
					<div className="flex-1 overflow-x-auto">
						<div className="flex w-max gap-2 pb-2">
							{/* 🔒 First Plan Fixed */}
							<div
								className={`sticky left-0 z-10 flex min-w-[80px] shrink-0 flex-col items-center gap-3 rounded-xl p-2 shadow-md`}
								style={{
									background:
										'linear-gradient(180deg, #FFFFFF 0%, #D0E4FF 106.5%)',
									border: '1.13px solid #2563EB',
								}}>
								{firstPlan &&
									firstPlan.logo &&
									firstPlan.logo.url && (
										<div className="relative h-12 w-12 overflow-hidden">
											<Image
												src={firstPlan.logo.url}
												alt={
													firstPlan.logo
														.alternativeText ||
													'plan logo'
												}
												fill
												className="object-contain"
											/>
										</div>
									)}
								<div className="flex flex-col gap-2">
									{firstPlan?.included?.map((ok, fi) => (
										<div key={fi} className="h-5 w-5">
											{ok.value ? (
												<Check className="h-5 w-5 text-green-600" />
											) : (
												<X className="h-5 w-5 text-red-500" />
											)}
										</div>
									))}
								</div>
								<div
									className={`text-base font-extrabold text-blue-600`}>
									{firstPlan?.price}
								</div>
							</div>

							{/* ➕ Remaining Plans Scrollable */}
							{plans?.slice(1).map((plan, pi) => (
								<div
									key={pi}
									className={`flex min-w-[80px] shrink-0 flex-col items-center gap-3 rounded-xl bg-blue-100 p-2`}>
									{plan.logo && plan.logo.url && (
										<div className="relative h-12 w-12 overflow-hidden">
											<Image
												src={plan.logo.url}
												alt="plan logo"
												fill
												className="object-contain"
											/>
										</div>
									)}

									<div className="flex flex-col gap-2">
										{plan?.included?.map((ok, fi) => (
											<div key={fi} className="h-5 w-5">
												{ok.value ? (
													<Check className="h-5 w-5 text-green-600" />
												) : (
													<X className="h-5 w-5 text-red-500" />
												)}
											</div>
										))}
									</div>
									<div
										className={`text-base font-bold text-slate-800`}>
										{plan.price}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				{/* Scroll Hint */}{' '}
				<div className="mr-[16px] flex items-center justify-end gap-1">
					<h1 className="text-[10px] font-semibold text-white">
						scroll to compare more
					</h1>
					<Image
						src="/assets/v4/arrows.svg"
						alt="arrows"
						height={12}
						width={18}
					/>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden w-full md:block">
				<div className="mx-auto w-full max-w-6xl">
					<div className="overflow-hidden rounded-xl bg-slate-100">
						<div className="flex border-b-2 border-slate-200 bg-white">
							<div className="w-80 shrink-0 p-6">
								<p className="text-lg font-bold text-slate-800">
									Features
								</p>
							</div>
							<div className="flex flex-1 justify-center gap-8">
								{plans?.map((plan, pi) => (
									<div
										key={pi}
										className={`flex w-32 flex-col items-center gap-3 rounded-lg bg-white p-4`}>
										{plan.logo && plan.logo.url && (
											<div className="relative h-16 w-16 overflow-hidden">
												<Image
													src={plan.logo.url}
													alt={
														plan.logo
															.alternativeText ||
														'plan logo'
													}
													fill
													className="object-contain"
												/>
											</div>
										)}

										<div
											className={`text-xl text-slate-800 ${pi === 0
													? 'font-extrabold'
													: 'font-bold'
												}`}>
											{plan.price}
										</div>
										<p className="text-xs font-semibold text-slate-600">
											per month
										</p>
									</div>
								))}
							</div>
						</div>

						{features?.map((feature, idx) => (
							<div
								key={idx}
								className="flex items-center border-b border-slate-200 py-4 transition-colors last:border-b-0 hover:bg-slate-50">
								<div className="w-80 shrink-0 px-6">
									<p className="text-sm font-medium text-slate-700">
										<span
											className={
												feature.text1_bold
													? 'font-bold'
													: ''
											}>
											{feature.text1}
										</span>
										<span
											className={
												feature.text2_bold
													? 'font-bold'
													: ''
											}>
											{feature.text2}
										</span>
									</p>
								</div>
								<div className="flex flex-1 justify-center gap-8">
									{plans?.map((plan, pi) => (
										<div
											key={pi}
											className="flex w-32 justify-center">
											{plan?.included?.[idx]?.value ? (
												<Check className="h-6 w-6 text-green-600" />
											) : (
												<X className="h-6 w-6 text-red-500" />
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="w-full px-5">
				<div className="h-px bg-indigo-200/20" />
			</div>
		</div>
	);
}
