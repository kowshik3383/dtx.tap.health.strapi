'use client';

import React from 'react';
import { components } from '@/types/strapi';
import ResultVideoCard from './ResultVideoCard';

const FastResult = ({
	title,
	description,
	results,
}: components['schemas']['DynamicZoneFaResultComponent']) => {
	// const results = useMemo(
	// 	() => [
	// 		{
	// 			imageSrc: '/assets/result1.svg',
	// 			videoSrc:
	// 				'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/biryani-video/master.m3u8',
	// 			title: 'Without strict diet restrictions',
	// 		},
	// 		{
	// 			imageSrc: '/assets/dumbell.svg',
	// 			videoSrc:
	// 				'https://qbhnqxwevufkvrucyu.supabase.co/storage/v1/object/public/static.tap.health/assets/dtech25_workout.mp4',
	// 			title: 'Without a hard workout regime',
	// 		},
	// 		{
	// 			imageSrc: '/assets/result3.svg',
	// 			videoSrc:
	// 				'https://qbhnqxwevufkvrucyu.supabase.co/storage/v1/object/public/static.tap.health/assets/dtech25_photo_logging.mp4',
	// 			title: 'Without expensive coaching subscription',
	// 		},
	// 	],
	// 	[]
	// );

	return (
		<section className="bg-white py-10">
			<h2 className="text-center text-3xl font-bold text-black">
				{title}
			</h2>
			<p className="mb-8 text-center text-xl font-normal text-black">
				{description}
			</p>

			<div
				className="flex flex-col gap-6 px-4 lg:flex-row lg:items-stretch lg:justify-center"
				data-testid="ResultVideoCard">
				{results?.map((result, ind) => (
					<div
						key={ind}
						className="mx-auto w-full sm:max-w-sm lg:max-w-xs">
						{result.image?.url && result.video?.url && (
							<ResultVideoCard
								imageSrc={result.image.url}
								videoSrc={result.video.url}
								title={result.title || `Result ${ind + 1}`}
							/>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default FastResult;
