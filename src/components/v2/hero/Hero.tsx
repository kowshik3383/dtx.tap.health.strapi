'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname, useRouter , useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import VideoPlayer from '@/components/elements/VideoPlayer';
import { useJoinNowStore } from '@/store/useJoinNowStore'; // ✅ Zustand store
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';

type Props = components['schemas']['DynamicZoneHerov2Component'];

const Hero = React.memo(({
	mainTitile = '',
	primaryTitle = '',
	hero_image,
	hero_video,
	refund_message,
	join_now_message,
	hero_video_url
}: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { setJoinNowVisible } = useJoinNowStore(); // ✅ Zustand state manager
	const { ref: joinNowRef, inView } = useInView({ threshold: 1 });

	useEffect(() => {
		setJoinNowVisible(inView); // ✅ no need to pass via props
	}, [inView, setJoinNowVisible]);

	const [videoLoading, setVideoLoading] = useState(true);
	const words = mainTitile.split(' ');

	const isV2o1 = pathname.includes('v2o1');
	const isV2o2 = pathname.includes('v2o2');
	const isV2o3 = pathname.includes('v2o3');

	const imageUrl = hero_image?.url || '';
	const videoUrl = hero_video_url || hero_video?.url || '';
	const isV2o4 = pathname.includes('v2o4');

	const wordVariants = {
		initial: { opacity: 0, filter: 'blur(6px)' },
		animate: { opacity: 1, filter: 'blur(0px)' },
	};

	const containerVariants = {
		animate: {
			transition: {
				staggerChildren: 0.15,
			},
		},
	};

	const fadeUpVariant = {
		initial: { opacity: 0, y: 30 },
		animate: { opacity: 1, y: 0 },
	};

	const handleJoinNow = () => {
		trackEvent('Join Now Clicked', {
			url: pathname,
			button_source: 'hero section',
			value: 40,
			currency: 'INR',
		});

		let displayPrice: number | null = null;
		if (isV2o1 || isV2o2) {
			displayPrice = 1299;
		} else {
			displayPrice = 2399;
		}

		if (displayPrice !== null) {
			localStorage.setItem('selectedPrice', displayPrice.toString());
		}

		let redirectUrl;

		if (isV2o3) {
			redirectUrl = '/v3plans';
		} else if (isV2o1 || isV2o2 || isV2o4) {
			redirectUrl = '/v2plans';
		} else {
			redirectUrl = '/plans';
		}

		router.push(
			`${redirectUrl}?slug=${encodeURIComponent(pathname)}&${searchParams.toString()}`
		);

	};


	return (
		<section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-[50px]">
			<div className="mx-auto w-full max-w-7xl">
				{/* Mobile Layout */}
				<div className="mt-8 flex flex-col items-center space-y-6 text-center lg:hidden">
					<motion.p
						className="mb-0 text-[20px] leading-relaxed font-semibold text-[#3D4966]"
						variants={fadeUpVariant}
						initial="initial"
						animate="animate"
						transition={{ delay: 0.3 }}>
						{primaryTitle}
					</motion.p>

					<motion.h1
						className="mt-3 flex w-full flex-wrap items-center justify-center text-center text-[39px] leading-tight font-bold text-gray-900 sm:text-3xl md:text-4xl"
						variants={containerVariants}
						initial="initial"
						animate="animate">
						{words.map((word, i) => (
							<motion.span
								key={i}
								variants={wordVariants}
								className="mx-1">
								{word}
							</motion.span>
						))}
					</motion.h1>

					{(isV2o1 || isV2o2 || isV2o3 || isV2o4) && (
						<p className="-pt-2 pb-2 text-center text-xl font-normal text-black">
							Reduce Your HbA1C and sugar levels
						</p>
					)}

					<motion.div
						className="w-full flex-col justify-center px-4"
						variants={fadeUpVariant}
						initial="initial"
						animate="animate"
						transition={{ delay: 0.5 }}>
						<button
							ref={joinNowRef}
							onClick={handleJoinNow}
							className="font-urbanist relative mx-auto flex w-[90%] items-center justify-center overflow-hidden rounded-[28px] bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 ease-in-out">
							<span
								aria-hidden
								className="before:mask-composite-exclude pointer-events-none absolute inset-0 z-0 rounded-[28px] p-[2px] before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-r before:from-[#2563EB] before:to-[#2563EB] before:mask-[linear-gradient(white,white)_content-box,linear-gradient(white,white)]"
							/>
							<span className="relative z-10 flex items-center justify-center gap-2">
								{join_now_message}
							</span>
							<span
								aria-hidden
								className="pointer-events-none absolute top-1/2 left-[-40%] z-[1] h-[58px] w-[150px] -translate-x-1/2 -translate-y-1/2 rotate-[-63deg] animate-[moveShine_3s_linear_infinite] bg-white/40 backdrop-blur-sm"
							/>
						</button>
						<p className="mt-3 mb-3 text-sm font-medium text-[#3D4966]">
							{refund_message}
						</p>
					</motion.div>

					<motion.div className="relative -mt-6 flex h-[400px] w-full items-center justify-center sm:h-[550px]">
						{videoUrl ? (
							<>
								{videoLoading && (
									<Image
										src={imageUrl}
										alt="Loading Preview"
										fill
										className="z-10 object-contain"
										sizes="(max-width: 1024px) 100vw, 50vw"
									/>
								)}
								<VideoPlayer
									url={videoUrl}
									className="absolute z-20 object-contain"
									onReady={() => setVideoLoading(false)}
								/>
							</>
						) : (
							<Image
								src={imageUrl}
								alt="Hero illustration"
								fill
								className="object-contain"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority
							/>
						)}
					</motion.div>
				</div>

				{/* Desktop Layout */}
				<div className="hidden items-center gap-10 lg:grid lg:grid-cols-2">
					<motion.div
						className="space-y-6"
						initial="initial"
						animate="animate"
						variants={fadeUpVariant}>
						<p className="text-lg font-semibold text-[#3D4966]">
							{primaryTitle}
						</p>

						<motion.h1
							className="flex flex-wrap text-4xl leading-tight font-bold text-gray-900 lg:text-[40px]"
							variants={containerVariants}
							initial="initial"
							animate="animate">
							{words.map((word, i) => (
								<motion.span
									key={i}
									variants={wordVariants}
									className="mx-1">
									{word}
								</motion.span>
							))}
						</motion.h1>

						{(isV2o1 || isV2o2 || isV2o3) && (
							<p className="pb-4 text-xl font-normal text-black">
								Reduce Your HbA1C and sugar levels
							</p>
						)}

						<div>
							<button
								ref={joinNowRef}
								onClick={handleJoinNow}
								className="font-urbanist relative flex w-[50%] items-center justify-center overflow-hidden rounded-[28px] bg-[#2563EB] px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 ease-in-out">
								<span
									aria-hidden
									className="before:mask-composite-exclude pointer-events-none absolute inset-0 z-0 rounded-[28px] p-[2px] before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-r before:from-[#2563EB] before:to-[#2563EB] before:mask-[linear-gradient(white,white)_content-box,linear-gradient(white,white)]"
								/>
								<span className="relative z-10 flex items-center justify-center gap-2">
									{join_now_message}
								</span>
								<span
									aria-hidden
									className="pointer-events-none absolute top-1/2 left-[-40%] z-[1] h-[58px] w-[150px] -translate-x-1/2 -translate-y-1/2 rotate-[-63deg] animate-[moveShine_3s_linear_infinite] bg-white/40 backdrop-blur-sm"
								/>
							</button>

							<p className="pt-3 pl-1 text-base font-medium text-[#3D4966]">
								{refund_message}
							</p>
						</div>
					</motion.div>

					<motion.div
						className="relative mt-32 h-[450px] w-full xl:h-[500px]"
						initial="initial"
						animate="animate"
						variants={fadeUpVariant}
						transition={{ delay: 0.3 }}>
						{videoUrl ? (
							<>
								{videoLoading && (
									<Image
										src={imageUrl}
										alt="Loading Preview"
										fill
										className="z-10 object-contain"
										sizes="(max-width: 1024px) 100vw, 50vw"
									/>
								)}
								<VideoPlayer
									url={videoUrl}
									className="absolute z-20 object-contain"
									onReady={() => setVideoLoading(false)}
								/>
							</>
						) : (
							<Image
								src={imageUrl}
								alt="Hero illustration"
								fill
								className="object-contain"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority
							/>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
});

export default Hero;
