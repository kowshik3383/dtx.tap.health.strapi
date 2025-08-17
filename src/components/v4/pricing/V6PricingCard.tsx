'use client';

import { Check, X } from 'lucide-react';
import Image from 'next/image';
import { components } from '@/types/strapi';
const features: (string | { text: string; bold?: boolean })[][] = [
	[
		{ text: '🥙 ', bold: false },
		{ text: 'Personalised diet plans', bold: true },
	],
	[
		{ text: '🥗 ', bold: false },
		{ text: 'Indian meal suggestions', bold: true },
	],
	[
		{ text: '📝 ', bold: false },
		{ text: 'Easy meal logging', bold: true },
	],
	[
		{ text: '📷 ', bold: false },
		{ text: 'Click a photo', bold: false },
		{ text: ', get ', bold: false },
		{ text: 'meal insights', bold: true },
	],
	[
		{ text: '🩸 ', bold: false },
		{ text: 'Track sugar level', bold: false },
		{ text: ' with ', bold: false },
		{ text: 'smart trends', bold: true },
	],
	[
		{ text: '💊 ', bold: false },
		{ text: 'Smart ', bold: true },
		{ text: ' medicine reminders', bold: false },
	],
	[
		{ text: '🕤 ', bold: false },
		{ text: '24×7 Diabetes AI coach', bold: true },
	],
	[
		{ text: '📄 ', bold: false },
		{ text: 'Doctor-shareable ', bold: true },
		{ text: 'reports ', bold: false },
	],
	[
		{ text: '📚 ', bold: false },
		{ text: 'Diabetes ', bold: false },
		{ text: ' knowledge bank', bold: true },
	],
	[
		{ text: '🏃', bold: false },
		{ text: 'Integrated', bold: false },
		{ text: 'activity tracker', bold: true },
	],
	[
		{ text: '🙆🏻 ', bold: false },
		{ text: 'Easy ', bold: false },
		{ text: 'home workout videos', bold: true },
	],
];

const plans = [
	{
		image: '/assets/v4/pricing/logo1.svg',

		included: [
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true,
		],
		bg: 'bg-blue-100',
		text: 'text-blue-600',
		bold: true,
	},
];

export default function V6PricingCard({
	title_line1,
	title_line2,
	title_line3,
	plans = [],
	features = [],
}: components['schemas']['DynamicZonePricingComparison2Component']) {
	if (plans.length === 0) return null;

	return (
		<div
			className="font-urbanist flex w-screen flex-col items-start gap-11 overflow-x-hidden py-8"
			style={{
				background:
					'linear-gradient(179.56deg, #2563EB 0.38%, #253D77 97.63%)',
			}}>
			{/* Header */}
			<div className="w-screen px-0">
				<div className="h-px bg-indigo-200/20" />
			</div>
			<div className="flex w-full flex-col items-center justify-center gap-3 text-center">
				<h2 className="font-['Urbanist'] text-2xl font-extrabold text-white">
					{title_line1}
					<br />
					{title_line2} <br />
					{title_line3}
				</h2>
			</div>

			<div className="block md:hidden">
				<div className="flex overflow-x-auto">
					{/* Features list column */}
					<div className="flex w-[70vw] shrink-0 flex-col pt-6">
						<p className="mb-4 ml-3 text-[16px] font-semibold text-white">
							Features
						</p>
						<div className="ml-3 rounded-l-xl bg-slate-100 p-2">
							<ul className="pb-2">
								{features.map((feature, idx) => (
									<li
										key={idx}
										className="flex h-10 items-center text-[14px] leading-4 text-slate-600">
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
										{/* )} */}
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Plan Columns */}
					<div className="flex">
						{plans.map((plan, i) => (
							<div
								key={i}
								className="flex min-w-[100px] flex-col items-center rounded-xl pb-11 shadow-md"
								style={{
									background:
										'linear-gradient(180deg, #FFFFFF 0%, #D0E4FF 106.5%)',
									border: '1.13px solid #2563EB',
								}}>
								{plan.logo?.url && (
									<div className="relative mb-2 h-10 w-12 overflow-hidden">
										<Image
											src={plan.logo.url}
											alt="plan logo"
											fill
											className="object-contain"
										/>
									</div>
								)}

								<div className="flex flex-col pt-4">
									{plan?.included?.map((ok, fi) => (
										<div
											key={fi}
											className="flex h-10 w-full items-center justify-center">
											{ok.value ? (
												<Check className="text-green-600" />
											) : (
												<X className="text-red-500" />
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Desktop Layout */}
			<div className="hidden w-screen md:block">
				<div className="w-screen px-0">
					<div className="overflow-hidden rounded-none bg-slate-100">
						{/* Plan headers */}
						<div className="flex border-b-2 border-slate-200 bg-white">
							<div className="w-80 shrink-0 p-6">
								<p className="text-lg font-bold text-slate-800">
									Features
								</p>
							</div>
							<div className="flex flex-1 justify-start gap-8 px-8">
								{plans.map((plan, pi) => (
									<div
										key={pi}
										className={`flex w-32 flex-col items-center gap-3 rounded-lg bg-blue-100 p-4`}>
										{plan.logo?.url && (
											<div className="relative h-16 w-16 overflow-hidden">
												<Image
													src={plan.logo.url}
													alt="plan logo"
													fill
													className="object-contain"
												/>
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Features rows */}
						{features.map((feature, idx) => (
							<div
								key={idx}
								className="flex items-center border-b border-slate-200 py-4 last:border-b-0 hover:bg-slate-50">
								<div className="w-80 shrink-0 px-6">
									<p className="text-sm font-medium text-slate-700">
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
									</p>
								</div>
								<div className="flex flex-1 justify-start gap-8 px-8">
									{plans.map((plan, pi) => (
										<div
											key={pi}
											className="flex w-32 justify-center">
											{plan.included?.[idx]?.value ? (
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
			{/* Footer divider */}
		</div>
	);
}
