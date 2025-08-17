'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';
import { testimonials } from './data';
import type { Testimonial } from './types';

const Testimonial: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		const checkSize = () => {
			setIsMobile(window.innerWidth < 768);
			setContainerWidth(window.innerWidth);
		};
		checkSize();
		window.addEventListener('resize', checkSize);
		return () => window.removeEventListener('resize', checkSize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex(prev => (prev + 1) % testimonials.length);
	};

	const prevSlide = () => {
		setCurrentIndex(
			prev => (prev - 1 + testimonials.length) % testimonials.length,
		);
	};

	const handlers = useSwipeable({
		onSwipedLeft: () => {
			nextSlide();

			trackFacebookPixelEvent('testimonial_swipe', {
				direction: 'left',
				currentIndex,
				timestamp: new Date().toISOString(),
				value: 50,
				currency: 'INR',
			});

			registerIntentEvent('testimonial_swipe'); // ✅ match event name
		},

		onSwipedRight: () => {
			prevSlide();

			trackFacebookPixelEvent('testimonial_swipe', {
				direction: 'right',
				currentIndex,
				timestamp: new Date().toISOString(),
				value: 50,
				currency: 'INR',
			});

			registerIntentEvent('testimonial_swipe'); // ✅ same fix
		},

		trackMouse: true,
	});

	const gap = isMobile ? 16 : 32;
	const visiblePercent = 0.85;
	const cardWidth = isMobile ? containerWidth * visiblePercent : 320;
	const slideWidth = cardWidth + gap;
	const translateX = -(currentIndex * slideWidth);

	return (
		<div className="bg-[#E5F9FF]">
			<div className="container py-12">
				{/* Header */}
				<div className="mb-10 text-center">
					<div className="inline-block rounded-md border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-[#2563EB]">
						REAL RESULTS. REAL IMPACT
					</div>

					<h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
						Join 150,000+ Indians
						<br /> Already Using Tap Health.
					</h1>
				</div>

				{/* Swiper */}
				<div
					className="relative mx-auto w-full max-w-6xl overflow-x-visible px-4"
					{...handlers}>
					<div
						className="flex transition-transform duration-700 ease-in-out"
						style={{
							transform: `translateX(${translateX}px)`,
							gap: `${gap}px`,
							width: 'max-content',
						}}>
						{testimonials.map(testimonial => (
							<div
								key={testimonial.id}
								className="flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-none"
								style={{
									width: isMobile
										? `${cardWidth}px`
										: '320px',
								}}>
								<div className="flex h-[320px] flex-col justify-between overflow-hidden">
									<h3 className="mb-3 flex items-center justify-center gap-1 px-6 pt-5 text-[22px] font-extrabold text-gray-900">
										<span className="relative inline-block text-center">
											{testimonial.quote}
											<span className="ml-1 inline-block align-middle">
												<Image
													src="/assets/v2/comma.svg"
													alt="Quote Icon"
													width={20}
													height={20}
												/>
											</span>
										</span>
									</h3>

									<p className="line-clamp-3 flex-grow px-7 pt-3 text-xs text-gray-600">
										{testimonial.description}
									</p>
									<div className="my-1 flex justify-center">
										{[...Array(testimonial.rating)].map(
											(_, i) => (
												<Star
													key={i}
													className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400"
												/>
											),
										)}
									</div>
									<div className="mb-5 text-center">
										<Image
											src={testimonial.avatar}
											alt={testimonial.name}
											width={36}
											height={36}
											className="mx-auto mb-0.5 rounded-full object-cover"
										/>
										<div className="text-xs font-medium text-gray-900">
											{testimonial.name}
										</div>
										<div className="text-[10px] text-gray-500">
											{testimonial.age} years ({testimonial.plan} plan)
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Arrows for Desktop */}
				</div>

				{/* Dots */}
				<div className="mt-8 flex justify-center space-x-4">
					{testimonials.map((_, index) => (
						<div
							key={index}
							className={`rounded-full transition-all duration-300 ${index === currentIndex
									? 'h-2 w-6 bg-[#2563EB] md:w-8'
									: 'h-2 w-2 bg-[#D9D9D9]'
								}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
