'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';
import VideoPlayer from '../elements/VideoPlayer';

export default function FewerMedsHero({
	logo,
	title,
	line1,
	line2,
	video,
	video_url,
}: components['schemas']['DynamicZoneHero3Component']) {
	const pathname = usePathname();

	const isV1 = pathname?.includes('fewer_meds_more_moments_v1');

	return (
		<section className="overflow-hidden bg-gradient-to-b from-cyan-50 via-sky-100 to-purple-100 px-4 py-10">
			<div className="flex flex-col items-center text-center">
				{logo && logo.url && (
					<div className="relative mb-6 h-[22px] w-[106.857px]">
						<Image
							src={optimisedImageUrl(logo)}
							alt="Tap Health Logo"
							fill
							className="object-contain"
							sizes="106.857px"
						/>
					</div>
				)}

				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="mb-2 text-[30px] font-extrabold text-[#252E49]">
					{title}
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className={`mb-6 font-medium text-[#252E49] ${
						isV1 ? 'text-[16px]' : 'text-[26px]'
					}`}>
					{line1}
					<br /> {line2}
				</motion.p>

				{video_url && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="w-full max-w-md">
						<VideoPlayer url={video_url} />
					</motion.div>
				)}

				{!video_url && video?.file?.url && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="w-full max-w-md">
						<VideoPlayer url={video.file.url} />
					</motion.div>
				)}
			</div>
		</section>
	);
}
