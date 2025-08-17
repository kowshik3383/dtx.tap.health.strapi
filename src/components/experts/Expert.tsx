/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { cn } from '@/lib/utils';
import { components } from '@/types/strapi';

const ExpertSlider = ({
	title_line_1 = 'Experts Behind the',
	title_line_2 = 'Program',
	experts = [],
}: components['schemas']['DynamicZoneExpertComponent']) => {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		setActiveIndex(0);
	}, [experts]);

	const handleClick = (index: number) => {
		setActiveIndex(index);
	};

	const handleDragEnd = (_: any, info: any) => {
		if (!experts.length) return;

		const threshold = 50;
		if (info.offset.x < -threshold && activeIndex < experts.length - 1) {
			setActiveIndex(prev => prev + 1);
		} else if (info.offset.x > threshold && activeIndex > 0) {
			setActiveIndex(prev => prev - 1);
		}
	};

	const ACTIVE_WIDTH = 168;
	const INACTIVE_WIDTH = 132;
	const GAP = 16;

	const slideOffset = (index: number) =>
		index * (INACTIVE_WIDTH + GAP) + (ACTIVE_WIDTH - INACTIVE_WIDTH) / 2;

	const currentExpert = experts[activeIndex] ?? null;
	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-8">
			<h1 className="mb-8 text-center text-[32px] font-bold text-gray-800 md:text-3xl">
				{title_line_1} <br className="hidden md:block" />
				{title_line_2}
			</h1>

			{/* Slider */}
			<div className="overflow-hidden">
				<motion.div
					className="flex gap-4"
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					onDragEnd={handleDragEnd}
					animate={{ x: -slideOffset(activeIndex) }}
					transition={{
						type: 'spring',
						stiffness: 250,
						damping: 25,
						mass: 0.8,
					}}>
					{experts.map((expert, index) => {
						const isActive = index === activeIndex;
						const width = isActive ? ACTIVE_WIDTH : INACTIVE_WIDTH;
						const height = isActive ? 195 : 153;

						return (
							<motion.div
								key={expert.id}
								onClick={() => handleClick(index)}
								className={cn(
									'flex-shrink-0 cursor-pointer transition-all duration-300 ease-in-out',
									isActive
										? 'z-10 scale-97 pl-6'
										: 'scale-95 pt-5 opacity-80 hover:opacity-100',
								)}>
								<div
									className="overflow-hidden rounded-xl"
									style={{ width, height }}>
									{expert.image?.url && (
										<Image
											src={optimisedImageUrl(
												expert.image,
											)}
											alt={
												expert.image.alternativeText ||
												'Expert image'
											}
											width={width}
											height={height}
											className="h-full w-full object-cover"
											loading="lazy"
										/>
									)}
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>

			{/* Expert Info Section */}
			{currentExpert && (
				<div className="relative mx-auto mt-6 min-h-[200px] w-full max-w-2xl px-4 text-left md:px-8">
					<AnimatePresence mode="sync">
						<motion.div
							key={currentExpert.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25, ease: 'easeInOut' }}
							className="absolute inset-0">
							{/* Name */}
							{currentExpert.name && (
								<motion.h3
									className="mb-1 text-lg font-bold text-gray-800"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}>
									{currentExpert.name}
								</motion.h3>
							)}

							{/* Credentials */}
							{currentExpert.credentials && (
								<motion.p
									className="mb-3 text-sm text-gray-600"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2, delay: 0.03 }}>
									{currentExpert.credentials}
								</motion.p>
							)}

							{/* Tags */}
							<div className="mb-4 flex flex-wrap justify-start gap-2">
								{currentExpert.experience && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="flex items-center rounded-full bg-teal-100 px-3 py-1">
										<span className="text-sm font-semibold text-teal-600">
											{currentExpert.experience}
										</span>
									</motion.div>
								)}

								{/* {currentExpert.linkedin_url && (
									<motion.a
										href={currentExpert.linkedin_url}
										target="_blank"
										rel="noopener noreferrer"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1">
										<Image
											src="/assets/linkedin.svg"
											alt="linkedin"
											width={20}
											height={20}
											className="object-cover"
										/>
										<span className="text-sm font-semibold text-black">
											LinkedIn
										</span>
									</motion.a>
								)} */}
								<motion.a
									href={currentExpert.linkedin_url || '/'}
									target="_blank"
									rel="noopener noreferrer"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1">
									<Image
										src="/assets/linkedin.svg"
										alt="linkedin"
										width={20}
										height={20}
										className="object-cover"
										loading="lazy"
									/>
									<span className="text-sm font-semibold text-black">
										LinkedIn
									</span>
								</motion.a>
							</div>

							{/* Quote */}
							{currentExpert.quote && (
								<motion.blockquote
									className="text-base font-semibold text-black"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: 0.25,
										delay: 0.04,
									}}>
									“{currentExpert.quote}”
								</motion.blockquote>
							)}
						</motion.div>
					</AnimatePresence>
				</div>
			)}
		</div>
	);
};

export default React.memo(ExpertSlider);
