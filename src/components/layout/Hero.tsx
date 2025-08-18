'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { components } from '@/types/strapi';

export default function Hero({
	logo,
	tag_line,
	title_line_1,
	title_line_2,
	hero_image,
	partnerLogo,
}: components['schemas']['DynamicZoneHeroComponent']) {
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		console.log('🔥 Hero component mounted');
		if (hero_image?.url) console.log('🖼️ Hero image URL:', hero_image.url);
		if (logo?.url) console.log('✅ Logo URL:', logo.url);
		if (partnerLogo?.url) console.log('🤝 Partner logo URL:', partnerLogo.url);
	}, [hero_image, logo, partnerLogo]);

	return (
		<section className="gradient-frame overflow-hidden">
			<div className="relative flex min-h-[45vh] w-full flex-col p-4 font-display">

				{/* Logos Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="z-20 mt-[20px] flex items-center justify-between"
				>
					{/* Tap Health Logo */}
					{logo?.url && (
						<div className="relative h-[22px] w-[106.857px]">
							<Image
								src={logo.url}
								alt="Tap Health Logo"
								fill
								className="object-contain"
								sizes="106.857px"
								fetchPriority="high"
							/>
						</div>
					)}

					{/* Partner Logo */}
					{partnerLogo?.url && (
						<div className="w-22">
							<Image
								src={partnerLogo.url}
								alt={partnerLogo.name || 'Partner Logo'}
								width={264}
								height={48}
								className="object-contain"
								fetchPriority="high"
							/>
						</div>
					)}
				</motion.div>

				{/* Headline Text */}
				<motion.div
					initial={{ opacity: 0, x: -40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, delay: 0.5 }}
					className="relative z-20 mt-6 flex flex-1 flex-col md:mt-16"
				>
					<div className="space-y-3 md:space-y-4">
						<h1 className="font-['Urbanist'] text-[17px] font-medium tracking-[-1.2%] text-[#252E49]">
							{tag_line}
						</h1>
						<p className="font-['Urbanist'] text-[32px] font-extrabold leading-[100%] tracking-[-1.2%] text-[#252E49]">
							{title_line_1} <br /> {title_line_2}
						</p>
					</div>
				</motion.div>

				{/* LCP-Critical Hero Image + Skeleton Loader */}
				{hero_image?.url && (
					<div className="absolute right-0 -bottom-20 z-10">
						<div className="relative h-[340px] w-[220px] md:h-[420px] md:w-[300px]">

							{/* Skeleton loader */}
							{!imageLoaded && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute inset-0 rounded-xl bg-gray-200 animate-pulse"
								/>
							)}

							<Image
								src={hero_image.url}
								alt="Hero Image - Man holding phone"
								fill
								className={`object-cover transition-opacity duration-700 ${
									imageLoaded ? 'opacity-100' : 'opacity-0'
								}`}
								priority
								sizes="(max-width: 768px) 220px, 300px"
								fetchPriority="high"
								onLoadingComplete={() => setImageLoaded(true)}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
