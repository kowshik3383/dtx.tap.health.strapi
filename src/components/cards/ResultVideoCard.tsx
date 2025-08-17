'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';

const ResultVideoCard = ({
	image,
	title,
	video,
}: components['schemas']['ItemsResultVideoComponent']) => {
	useEffect(() => {
		if (video?.url) {
			console.log('Video URL:', video.url);
		}
	}, [video]);

	return (
		<div className="relative mb-4 px-4">
			<div className="flex items-center gap-6 rounded-t-[32px] bg-white p-6 md:p-8">
				{/* Left side image */}
				{image && image.url && (
					<Image
						src={optimisedImageUrl(image)}
						alt={image.alternativeText || 'Result Video'}
						width={52}
						height={52}
						loading="lazy"
						className="h-[52px] w-[52px]"
					/>
				)}

				{/* Right side heading */}
				<div className="w-full pl-2">
					<h2 className="font-urbanist text-left align-middle text-[21px] leading-[100%] font-semibold text-black">
						{title}
					</h2>
				</div>
			</div>

			{/* Video section */}
			<div className="bg-white">
				{video && video.url && (
					<video
						preload='metadata'
						src={video.url}
						className="h-[275px] w-full object-cover shadow-xl"
						autoPlay
						loop
						muted
						playsInline
					/>
				)}
			</div>
		</div>
	);
};

export default React.memo(ResultVideoCard);
