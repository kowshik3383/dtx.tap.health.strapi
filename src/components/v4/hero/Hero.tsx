'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { memo, useEffect, useState } from 'react';
import VideoPlayer from '@/components/elements/VideoPlayer';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';
import FeatureCards from './FeatureCards';
import { log } from 'console';

interface HeroProps {
	logoSrc: string;
	tagline: string;
	heading: string[];
	highlightText: string;
	subtextBeforeHighlight: string;
	heroImageSrc: string;
	heroImageAlt?: string;
	videoSrc?: string;
}

const Hero: React.FC<components['schemas']['DynamicZoneHeroV5Component']> = ({
	logo,
	tag_line,
	title_line_1,
	title_line_2,
	highlighted_description,
	description,
	hero_image,
	hero_video_url,
	features,
	title_line_3,
}) => {
	const [isMobile, setIsMobile] = useState(false);
	const [videoLoading, setVideoLoading] = useState(true);
	const pathname = usePathname();
	const isV7Page = pathname.includes('v7');
	const isV6Page = pathname.includes('v6');
	const router = useRouter();
	const searchParams = useSearchParams();

	const isV8Page = pathname.includes('v8') || pathname.includes('homepage');

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 700);
		check();
		window.addEventListener('resize', check);
		return () => window.removeEventListener('resize', check);
	}, []);
	const handleJoinNow = () => {
		trackEvent('Join Now Clicked', {
			url: pathname,
			button_source: 'v6 hero section',
			value: 40,
			currency: 'INR',
		});

		const redirectUrl = '/plans';
		router.push(
			`${redirectUrl}?slug=${encodeURI(
				pathname,
			)}&${searchParams.toString()}`,
		);
	};
	// --- Special rendering for v8 ---
	if (isV8Page) {
		return (
			<section className="gradient-frame w-full py-8">
				<div className="flex flex-col items-center justify-center gap-6">
					{/* Logo */}
					{logo?.url && (
						<div className="relative mb-4 h-[22px] w-[106.857px]">
							<Image
								src={logo.url}
								alt="Logo"
								fill
								className="object-contain"
								sizes="100px"
								priority
							/>
						</div>
					)}

					{/* Heading */}
					<h1 className="text-center text-3xl leading-tight font-extrabold text-gray-900 md:text-5xl">
						{title_line_1}
						<br />
						{title_line_2}
						<br />
						{title_line_3}
					</h1>

					{/* Feature Cards */}
					<FeatureCards
						features={
							features as components['schemas']['SharedFeaturesV4Component'][]
						}
					/>
				</div>
			</section>
		);
	}

	// --- Default rendering for other pages ---
	return (
		<section
			className={`w-full overflow-hidden px-0 py-0 md:px-10 ${
				isV7Page ? 'bg-white' : 'gradient-frame bg-transparent'
			} ${
				isMobile
					? 'h-[100vh] [@media(min-height:700px)]:h-[75vh]'
					: 'h-[67vh] lg:h-screen xl:h-screen'
			}`}>
			{/* Mobile Layout */}
			{isMobile && (
				<div className="flex h-full w-full flex-col md:hidden">
					{/* Text */}
					<div className="flex flex-1 flex-col items-center justify-center px-6 py-4">
						{logo && logo.url && (
							<div className="relative mb-3 h-[22px] w-[106.857px]">
								<Image
									src={logo.url}
									alt="Logo"
									fill
									className="object-contain"
									sizes="100px"
									priority
								/>
							</div>
						)}

						<h1 className="text-center text-3xl leading-tight font-extrabold text-gray-900">
							{title_line_1}
							<br />
							{title_line_2}
							<br />
							{title_line_3}
						</h1>
						<p className="text-md font-bold text-black">
							{tag_line}
						</p>

						<p className="mt-4 text-center text-base leading-[2rem] font-semibold text-gray-700">
							{description}
							<br />
							<span className="rounded bg-yellow-300 px-2 py-1 text-center font-semibold">
								{highlighted_description}
							</span>
						</p>
						{isV6Page && (
							<button
								onClick={handleJoinNow}
								className="font-urbanist relative my-2 mb-2 flex w-[90%] items-center justify-center overflow-hidden rounded-[28px] bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 ease-in-out">
								<span
									aria-hidden
									className="before:mask-composite-exclude pointer-events-none absolute inset-0 z-0 rounded-[28px] p-[2px] before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-r before:from-[#2563EB] before:to-[#2563EB] before:mask-[linear-gradient(white,white)_content-box,linear-gradient(white,white)]"
								/>
								<span className="relative z-10 flex items-center justify-center gap-2">
									Start your journey
								</span>
								<span
									aria-hidden
									className="pointer-events-none absolute top-1/2 left-[-40%] z-[1] h-[58px] w-[150px] -translate-x-1/2 -translate-y-1/2 rotate-[-63deg] animate-[moveShine_3s_linear_infinite] bg-white/40 backdrop-blur-sm"
								/>
							</button>
						)}
					</div>

					{/* Mobile Media */}
					<motion.div className="relative -mt-6 flex h-[380px] w-full items-center justify-center sm:h-[550px]">
						{hero_video_url ? (
							<>
								{videoLoading && (
									<Image
										src={
											hero_image?.url ||
											'/public/assets/v2/hero1.png'
										}
										alt="Loading Preview"
										fill
										className="z-10 object-contain"
										sizes="(max-width: 1024px) 100vw, 50vw"
									/>
								)}
								<VideoPlayer
									url={hero_video_url}
									className="absolute z-20 mt-3 flex h-full items-center bg-transparent object-contain"
									onReady={() => setVideoLoading(false)}
								/>
							</>
						) : (
							<Image
								src={hero_image?.url || ''}
								alt="Hero illustration"
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority
							/>
						)}
					</motion.div>
				</div>
			)}

			{/* Desktop Layout */}
			{!isMobile && (
				<div className="mx-auto hidden h-full max-w-7xl flex-row md:flex">
					{/* Text */}
					<div className="flex h-full flex-1 flex-col items-center justify-center space-y-6 px-6 lg:items-start">
						{logo?.url && (
							<div className="relative h-[22px] w-[106.857px]">
								<Image
									src={logo.url}
									alt="Logo"
									fill
									className="object-contain"
									sizes="106.857px"
									priority
								/>
							</div>
						)}

						<h1 className="text-5xl leading-tight font-extrabold text-gray-900">
							{title_line_1}
							<br />
							{title_line_2}
							<br />
							{title_line_3}
						</h1>
						<p className="text-md font-bold text-black">
							{tag_line}
						</p>

						<p className="text-lg font-semibold text-gray-700">
							{description}
							<br />
							<span className="rounded bg-yellow-300 px-2 py-1 text-center font-semibold">
								{highlighted_description}
							</span>
						</p>
					</div>

					{/* Media */}
					<div className="flex h-full flex-1 items-center justify-center bg-transparent">
						<div className="relative h-full w-full bg-transparent">
							{hero_video_url ? (
								<VideoPlayer
									url={hero_video_url}
									className="flex h-full w-full items-center rounded-xl bg-transparent object-contain"
									onReady={() => setVideoLoading(false)}
								/>
							) : (
								<Image
									src={hero_image?.url || ''}
									alt="Hero illustration"
									fill
									className="rounded-xl object-fill"
									priority
									sizes="600px"
								/>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default memo(Hero);
