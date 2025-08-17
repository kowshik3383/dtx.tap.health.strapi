'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';

type Step = components['schemas']['SharedStepsComponent'];

interface HowItWorks1Props {
	className?: string;
	tag?: string;
	title_part1?: string;
	highlighted_title?: string;
	title_part2?: string;
	steps?: Step[];
}

const HowItWorks1: React.FC<HowItWorks1Props> = ({
	className = '',
	tag = 'HOW IT WORKS',
	steps = [],
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<div className={`bg-white px-4 py-16 ${className}`}>
			<div className="max-w-6xl">
				{/* Header */}
				<div className="mb-8">
					<div className="lg:flex lg:items-center lg:justify-center">
						<div className="inline-block rounded-full border border-blue-100 bg-white px-3 py-1 shadow-sm">
							<span className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
								{tag}
							</span>
						</div>
					</div>
				</div>

				{/* Desktop Grid */}
				<div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
					{steps.map((step, index) => (
						<div
							key={step.id || index}
							className="mx-auto flex h-full w-[280px] flex-col items-center rounded-2xl bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl">
							<div className="relative mb-2 h-32 w-full">
								{step.image?.url && (
									<Image
										src={step.image.url}
										alt={
											step.image.name ||
											step.title ||
											'Step Image'
										}
										fill
										className="object-contain"
										priority
									/>
								)}
							</div>
							<div className="mt-2 flex items-center space-x-3">
								<span className="text-4xl leading-none font-extrabold text-[#9EEFF0]">
									{String(index + 1).padStart(2, '0')}
								</span>
								<div className="text-left">
									<h3 className="mb-1 text-base font-bold text-gray-900">
										{step.title}
									</h3>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Mobile Swiper */}
				<div className="md:hidden">
					<Swiper
						spaceBetween={16}
						slidesPerView="auto"
						centeredSlides={false}
						onSlideChange={swiper => {
							const newIndex = swiper.activeIndex;
							setCurrentIndex(newIndex);
							trackEvent('how_it_works_swipe', {
								step: newIndex + 1,
								stepTitle:
									steps[newIndex]?.title || 'Unknown Step',
							});
						}}
						className="pl-0 md:pl-8"
						style={{ paddingBottom: '40px' }}>
						{steps.map((step, index) => (
							<SwiperSlide
								key={step.id || index}
								style={{ width: '280px' }}>
								<div className="mx-0 flex h-[230px] w-[280px] flex-col items-center justify-start rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl">
									<div className="relative mb-2 h-32 w-full">
										{step.image?.url && (
											<Image
												src={step.image.url}
												alt={
													step.image.name ||
													step.title ||
													'Step Image'
												}
												fill
												className="object-contain"
												priority
											/>
										)}
									</div>
									<div className="mt-2 flex items-center space-x-3">
										<span className="text-4xl leading-none font-extrabold text-[#9EEFF0]">
											{String(index + 1).padStart(2, '0')}
										</span>
										<div className="text-left">
											<h3 className="mb-1 text-base font-bold text-gray-900">
												{step.title}
											</h3>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					{/* Custom Slider Bar */}
					<div className="mt-4 flex justify-center space-x-2">
						{steps.map((_, index) => (
							<div
								key={index}
								className={`rounded-full transition-all duration-300 ${
									index === currentIndex
										? 'h-2 w-6 bg-[#2563EB]'
										: 'h-2 w-2 bg-[#D9D9D9]'
								}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowItWorks1;
