'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';

const Features = ({
	brand_name,
	highlighted_title,
	tag_name,
	features_title,
	features,
	button_text,
}: components['schemas']['DynamicZoneTransformPlanComponent']) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { login, isAuthenticated } = useAuth();
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	// Check if URL includes v6, v7, v8
	const isV6V7V8 = /v6|v7|v8/.test(pathname);

	// Random number between 200-450 (only for v6/v7/v8)
	const randomMembers = React.useMemo(() => {
		return Math.floor(Math.random() * (450 - 200 + 1)) + 200;
	}, []);

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
		<div className="flex items-center justify-center bg-gradient-to-b from-blue-600 to-slate-800 px-6 py-8">
			<div className="flex w-80 flex-col gap-4 rounded-2xl bg-white px-4 py-3 shadow-lg outline outline-slate-800">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<p className="text-xs font-semibold text-slate-800">
							{brand_name || 'Tap Health'}
						</p>
						<p className="text-xl font-bold text-blue-600">
							{highlighted_title || 'Transform Plan'}
						</p>
					</div>

					{/* Badge */}
					{isV6V7V8 ? (
						<div className="rounded-xl bg-blue-100 px-4 py-1 text-[14px] font-bold text-blue-600 shadow">
							{randomMembers} Members <br />{' '}
							<span className="flex justify-end text-[12px] font-bold text-black">
								joined today
							</span>
						</div>
					) : (
						<div className="rounded-xl bg-blue-100 px-4 py-1.5 text-[10px] font-bold text-blue-600 shadow">
							{tag_name || 'Most Popular'}
						</div>
					)}
				</div>

				<div className="h-px bg-indigo-200" />

				{/* Features */}
				<div className="flex flex-col gap-3.5">
					<p className="text-[10px] font-bold text-slate-800">
						{features_title || 'Features included'}
					</p>
					<div className="flex flex-col gap-2">
						{features?.map((f, i) => (
							<div key={i} className="flex items-center gap-2">
								{f.icon && f.icon.url && (
									<div className="relative h-5 w-5 overflow-hidden rounded-full">
										<Image
											src={f.icon.url}
											alt={
												f.icon.alternativeText ||
												`icon${i}`
											}
											fill
											className="object-contain"
										/>
									</div>
								)}

								<p className="font-urbanist text-xs leading-snug text-slate-800">
									{f.text_content?.map((item, ind) => (
										<span
											key={ind}
											className={`${
												item.is_bold
													? 'font-bold'
													: 'font-normal'
											} `}>
											{item.text}
										</span>
									))}
									{/* {f.normal && (
										<span className="font-normal">
											{f.normal}
										</span>
									)}
									{f.bold && (
										<span className="font-bold">
											{f.bold}
										</span>
									)}
									{f.medium && (
										<span className="font-medium">
											{f.medium}
										</span>
									)}
									{f.normalEnd && (
										<span className="font-normal">
											{f.normalEnd}
										</span>
									)} */}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="h-px bg-indigo-200" />

				{/* CTA */}
				<div className="w-full">
					<button
						onClick={handleJoinNow}
						className="font-urbanist relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[28px] bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors duration-200 sm:px-8 sm:py-3 md:px-10">
						{/* Shine overlay */}
						<span className="pointer-events-none absolute top-1/2 left-[-40%] z-[1] h-[58px] w-full rotate-[-63deg] animate-[moveShine_3s_linear_infinite] bg-white/40 backdrop-blur-[3px]" />
						{/* Border overlay */}
						<span className="pointer-events-none absolute inset-0 z-0 rounded-[28px] bg-blue-600 [mask-composite:exclude] p-[2px] [mask:linear-gradient(white,white)_content-box,linear-gradient(white,white)]" />
						{/* Button content */}
						<span className="relative z-10 text-white">
							{button_text || 'Join Now'}
						</span>
					</button>
				</div>

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
		</div>
	);
};

export default Features;
