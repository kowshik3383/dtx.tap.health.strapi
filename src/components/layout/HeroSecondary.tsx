'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';

const HeroSecondary = ({
	logo,
	mainTitle,
	titlePrimary,
	titleSecondary,
	line1,
	line2,
	subTitle,
	description,
	highlightedDescription,
	isLandscape,
	image,
}: components['schemas']['DynamicZoneHero1Component']) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const firstLine = titlePrimary || line1;
	const secondLine = titleSecondary || line2;
	const hasMultiLineTitle = useMemo(() => firstLine && secondLine, [firstLine, secondLine]);

	const baseTitleClass =
		'mb-2 text-3xl md:text-4xl leading-tight font-bold text-gray-900';
	const transition = { duration: 0.3, ease: 'easeOut' };

	const containerHeight = useMemo(() => {
		if (!image?.url) return '';
		return isLandscape
			? 'h-[clamp(500px,40vh+5vw,600px)] max-h-[70vh] min-h-[250px]'
			: 'h-[clamp(600px,60vh+10vw,920px)] max-h-[90vh] min-h-[300px]';
	}, [image?.url, isLandscape]);

	return (
		<div
			className={`relative mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-gradient-to-b from-cyan-50 via-sky-100 to-purple-100 ${containerHeight}`}
		>
			{/* Foreground Content */}
			<div className="relative z-20 p-4">
				{/* Logo */}
				{logo?.url && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ ...transition, delay: 0.05 }}
						className="mt-6 flex items-center justify-center"
					>
						<Image
							src={optimisedImageUrl(logo)}
							alt={logo.name || 'Logo'}
							width={110}
							height={80}
							priority
						/>
					</motion.div>
				)}

				{/* Text Block */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ ...transition, delay: 0.2 }}
					className="mt-6 w-full text-center"
				>
					<h1 className={baseTitleClass}>
						{hasMultiLineTitle ? (
							<>
								<div>{firstLine}</div>
								<div>{secondLine}</div>
							</>
						) : (
							mainTitle
						)}
					</h1>

					{subTitle && (
						<h2 className="mb-3 text-xl font-bold text-gray-800">{subTitle}</h2>
					)}

					<p className="font-urbanist mb-4 text-center text-[17px] leading-[140%] font-bold tracking-normal text-gray-700">
						{description}
						{highlightedDescription && (
							<span className="ml-1 rounded bg-yellow-300 px-2 py-0.5 font-bold text-black">
								{highlightedDescription}
							</span>
						)}
					</p>
				</motion.div>
			</div>

			{/* Person Image */}
			{image?.url && (
				<div className="absolute right-0 bottom-0 left-0 z-10 h-[75%]">
					<div className="relative flex h-full w-full items-end justify-center">

						{/* Skeleton loader */}
						{!imageLoaded && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="absolute bottom-0 h-[90%] w-[85%] rounded-xl bg-gray-200 animate-pulse"
							/>
						)}

						<Image
							src={image.url}
							alt="Hero Image - Man holding phone"
							width={300}
							height={400}
							className={`max-h-[90%] max-w-[85%] object-contain transition-opacity duration-700 ${
								imageLoaded ? 'opacity-100' : 'opacity-0'
							}`}
							sizes="(max-width: 768px) 100vw, 400px"
							priority
							fetchPriority="high"
							onLoadingComplete={() => setImageLoaded(true)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default React.memo(HeroSecondary);
