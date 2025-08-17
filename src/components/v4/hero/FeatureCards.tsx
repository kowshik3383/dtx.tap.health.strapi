'use client';

import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { components } from '@/types/strapi';

// const features_: Feature[] = [
// 	{
// 		image: 'https://i.ibb.co/7t2LJBjk/meals.png',
// 		boldText: 'Daily Meal Recommendations',
// 		normalText: 'Tailored to your lifestyle',
// 	},
// 	{
// 		image: '/assets/glucose.png',
// 		boldText: 'Make sense of your Glucose Readings',
// 		normalText: 'To help you keep track of your progress',
// 	},
// 	{
// 		image: '/assets/exercise.png',
// 		boldText: 'Easy, Guided Exercise Routine',
// 		normalText: 'Based on your fitness level',
// 	},
// 	{
// 		image: '/assets/meals.png',
// 		boldText: 'Instant Food Scoring',
// 		normalText: 'To count your calories and make better choices',
// 	},
// 	{
// 		image: '/assets/ai_coach.png',
// 		boldText: '24×7 AI Coach',
// 		normalText: 'Your always-available support system',
// 	},
// 	{
// 		image: '/assets/medicine.png',
// 		boldText: 'Smart Medication Reminders',
// 		normalText: 'So that you never miss a dose',
// 	},
// ];

export default function FeatureCards({
	features,
}: {
	features: components['schemas']['SharedFeaturesV4Component'][];
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="w-full px-4 pb-6">
			<Swiper
				modules={[Navigation, Pagination]}
				spaceBetween={10}
				slidesPerView={1.2}
				centeredSlides
				onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}>
				{features?.map((item, index) => (
					<SwiperSlide key={index}>
						<div className="flex w-[270px] flex-col items-center overflow-hidden rounded-3xl">
							{/* Image section */}
							{item.image && item.image.url && (
								<div className="relative h-[200px] w-full">
									<Image
										src={item.image.url}
										alt={`Image-${index}-${item.boldText}`}
										fill
										className="object-contain"
										priority
									/>
								</div>
							)}

							{/* Text section */}
							<div className="-mt-3.5 flex h-[140px] w-full flex-col justify-center bg-white p-4 text-center">
								<h3 className="line-clamp-2 text-lg leading-snug font-bold break-words text-[#2563EB]">
									{item.boldText}
								</h3>
								<p className="mt-1 line-clamp-3 text-sm text-gray-600">
									{item.normalText}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Custom progress bar */}
			<div className="mt-4 flex justify-center gap-2">
				{features.map((_, i) => (
					<div
						key={i}
						className={`h-2 rounded-full transition-all duration-300 ${
							activeIndex === i
								? 'w-6 bg-blue-500'
								: 'w-2 bg-gray-300'
						}`}
					/>
				))}
			</div>
		</div>
	);
}
