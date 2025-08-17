'use client';

import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';

const PhotoLogging = ({
	title,
	sub_title,
	card,
	image,
}: components['schemas']['DynamicZoneDataLoggingComponent']) => {
	return (
		<div className="font-urbanist mb-5 flex w-full flex-col gap-5 overflow-hidden rounded-2xl bg-[linear-gradient(128.31deg,_#FFFFFF_14.41%,_#C4EDFD_120.26%)] px-5 py-6">
			{/* Heading */}
			<div className="flex w-full flex-col items-center gap-2 text-center">
				<h2 className="text-[20px] font-semibold text-black">{title}</h2>
				<p className="text-xs font-medium text-slate-400">
					{sub_title}
				</p>
			</div>

			{/* Logging Card */}
			<div className="relative h-20 w-full sm:h-16">
				{/* Card */}
				<div className="absolute top-0 left-0 z-10 flex h-full w-[88%] max-w-[300px] items-center gap-2.5 rounded-xl bg-white px-3 py-2">
					{/* Image + Text Block */}
					<div className="flex items-center gap-2.5">
						{/* Icon Frame */}
						{card?.image && card.image.url && (
							<div className="relative h-7 w-7 shrink-0">
								<Image
									src="/assets/v4/foodscanning.svg"
									alt="Camera Icon"
									fill
									className="object-contain"
								/>
							</div>
						)}

						{/* Text (AFTER image) */}
						<div className="flex flex-col justify-start gap-[3px]">
							<p className="text-left text-xs leading-none font-bold text-blue-700">
								{card?.title || 'Take a photo of your meal'}
							</p>
							<p className="max-w-[160px] text-left text-[9.15px] leading-tight font-medium text-slate-700">
								{card?.description ||
									'Automatically detects your food and provides nutritional value'}
							</p>
						</div>
					</div>
				</div>

				{/* Voice Button */}
				<div className="absolute top-1/2 right-0 z-20 h-16 w-16 -translate-y-1/2">
					<div className="absolute inset-0 rounded-full bg-blue-700/20 shadow-[0px_4px_12px_rgba(61,73,102,0.21)]" />
					<div className="absolute inset-[5px] rounded-3xl bg-blue-700/20 shadow-[0px_4px_12px_rgba(61,73,102,0.21)]" />
					<div className="absolute inset-[8.4px] rounded-full bg-zinc-300" />
					{image && image.url && (
						<Image
							src="/assets/v4/mic.svg"
							alt="Voice Input"
							fill
							className="rounded-full object-contain"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default PhotoLogging;
