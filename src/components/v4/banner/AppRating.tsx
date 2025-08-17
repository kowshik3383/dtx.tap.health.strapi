'use client';

import { Star } from 'lucide-react';
import React, { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { components } from '@/types/strapi';

// const ratings = [
// 	{ rating: 4.9, label: 'App Store' },
// 	{ rating: 5.0, label: 'Play Store' },
// ];

export default function AppRating({
	ratings,
}: components['schemas']['DynamicZoneAppRatingComponent']) {
	const [activeIndex, setActiveIndex] = useState(0);
	if (!ratings?.length) return null;

	return (
		<div
			className="flex w-full flex-col items-center py-9"
			style={{
				background:
					'linear-gradient(to bottom, #2563EB 0%, #252E49 100%)',
			}}>
			<Swiper
				modules={[Autoplay]}
				slidesPerView={1}
				loop
				autoplay={{ delay: 6000 }}
				onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
				className="w-full max-w-xs">
				{ratings?.map((item, index) => (
					<SwiperSlide key={index}>
						<div className="flex flex-col items-center ">
							{/* Star icons */}
							{/* Star icons */}
							<div className="mb-2 flex">
								{[...Array(item.stars || 5)].map((_, i) => {
									const fullStars = Math.floor(item.rating_value ?? 4.9);
									const isFull = i < fullStars;
									
									// Special case: 4.9 → last star 90% fill
									if (item.rating_value ?? 4.9 >= 4.9) {
										const fillPercent = i < 4 ? 100 : 70; // first 4 stars full, last star 90%
										return (
											<div key={i} className="relative w-5 h-5">
												{/* Empty star */}
												<Star size={20} className="text-gray-300 absolute top-0 left-0" />
												{/* Fill */}
												<div
													className="absolute top-0 left-0 overflow-hidden"
													style={{ width: `${fillPercent}%` }}
												>
													<Star size={20} className="fill-yellow-400 text-yellow-400" />
												</div>
											</div>
										);
									}

									// Normal partial fill logic
									const isPartial = i === fullStars && (item.rating_value ?? 4.9) % 1 > 0;
									const fillPercent = isPartial ? 50 : 0;

									return (
										<div key={i} className="relative w-5 h-5">
											<Star size={20} className="text-gray-300 absolute top-0 left-0" />
											{(isFull || isPartial) && (
												<div
													className="absolute top-0 left-0 overflow-hidden"
													style={{ width: isFull ? '100%' : `${fillPercent}%` }}
												>
													<Star size={20} className="fill-yellow-400 text-yellow-400" />
												</div>
											)}
										</div>
									);
								})}


							</div>


							{/* Rating label */}
							<div className="text-center text-sm font-semibold text-white">
								<span className="font-bold">
									{item.rating_value}
								</span>{' '}
								star rating on {item.label}
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			{/* Dots */}
			<div className="mt-4 flex items-center gap-2">
				{ratings?.map((_, index) => (
					<div
						key={index}
						className={`rounded-full transition-all duration-300 ${index === activeIndex
							? 'h-1 w-4 bg-white'
							: 'h-1 w-1 bg-white/40'
							}`}
					/>
				))}
			</div>
		</div>
	);
}
