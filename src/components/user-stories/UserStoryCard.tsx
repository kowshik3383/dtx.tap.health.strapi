/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TransformationStory } from './UserStoriesSlider';

interface UserStoryCardProps extends TransformationStory {
	ind: number;
	onVideoPlay: () => void;
}

const UserStoryCard = React.memo(
	({
		ind,
		name,
		reduction_value,
		reductionType,
		stars,
		thumbnail_url,
		onVideoPlay,
	}: UserStoryCardProps) => {
		const [isImageLoading, setIsImageLoading] = useState(true);
		const [imageError, setImageError] = useState(false);
		const { ref, inView } = useInView({
			triggerOnce: true,
			rootMargin: '200px 0px',
		});

		return (
			<div
				ref={ref}
				className="min-w-[300px] flex-shrink-0 overflow-hidden rounded-2xl md:min-w-[350px]">
				<div className="relative w-full overflow-hidden rounded-2xl">
					{/* Video Thumbnail_url */}
					<div
						className="relative h-[330px] w-full cursor-pointer overflow-hidden rounded-2xl"
						onClick={onVideoPlay}>
						{/* Placeholder while loading */}
						{isImageLoading && (
							<div className="absolute inset-0 animate-pulse rounded-2xl bg-gray-200" />
						)}

						{/* Fallback for error */}
						{imageError ? (
							<div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-100">
								<span className="text-gray-500">
									Image not available
								</span>
							</div>
						) : (
							inView && (
								<Image
									src={thumbnail_url}
									alt={`Thumbnail of ${name}'s success story`}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									loading="lazy"
									className={`rounded-2xl object-cover transition-opacity duration-300 ${isImageLoading
											? 'opacity-0'
											: 'opacity-100'
										}`}
									onLoadingComplete={() =>
										setIsImageLoading(false)
									}
									onError={() => {
										setIsImageLoading(false);
										setImageError(true);
									}}
								/>
							)
						)}

						<div className="absolute inset-0 bg-black opacity-20" />

						{/* Play Button */}
						<button
							className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 transition-all duration-200 hover:scale-110 hover:bg-white focus:outline-none"
							aria-label="Play video"
						>
							<div className="ml-1 h-0 w-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-gray-800" />
						</button>


						{/* Dynamic Reduction Indicator */}
						{reductionType === 'Hb1ac' ||
							reductionType.toLowerCase() === 'hb1ac' ? (
							<div className="absolute bottom-4 left-4 flex items-center space-x-2 rounded-2xl bg-white px-3 py-2 shadow-md">
								<div className="rounded-sm bg-[#10B981] p-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 14l-7 7m0 0l-7-7m7 7V3"
										/>
									</svg>
								</div>
								<div className="flex flex-col leading-none">
									<span className="text-2xl font-bold text-gray-800">
										{reduction_value}
									</span>
									<span className="-mt-1 text-sm text-gray-500">
										HbA1c Reduction
									</span>
								</div>
							</div>
						) : (
							<div className="absolute bottom-4 left-4 flex items-center space-x-2 rounded-2xl bg-white px-3 py-2 shadow-md">
								<div className="rounded-sm bg-[#00BA88] p-1">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 14l-7 7m0 0l-7-7m7 7V3"
										/>
									</svg>
								</div>
								<div className="flex flex-col leading-none">
									<span className="text-2xl font-bold text-[#202F59]">
										{reduction_value}
									</span>
									<span className="-mt-1 text-sm text-[#5E6684]">
										Weight Reduction
									</span>
								</div>
							</div>
						)}
					</div>

					{/* Name and Rating */}
					<div className="p-4">
						<h3 className="mb-1 text-xl font-semibold text-[#38426C]">
							{name}
						</h3>
						<div className="flex items-center justify-between">
							<div className="flex space-x-1">
								{[...Array(stars)].map((_, i) => (
									<Star
										key={i}
										size={20}
										className="fill-[#FFBA49] text-[#FFBA49]"
									/>
								))}
							</div>
							{/* <Image
							src="/assets/google.svg"
							alt="Google logo"
							width={24}
							height={24}
							className="object-contain"
						/> */}
						</div>
					</div>
				</div>
			</div>
		);
	},
);

export default UserStoryCard;
