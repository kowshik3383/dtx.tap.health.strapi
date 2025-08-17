// TestimonialCard.tsx
'use client';

import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { Testimonial } from './TestimonialSlider';

type Props = {
	testimonial: Testimonial;
	isExpanded: boolean;
	ind: number;
	toggleExpand: (id: number) => void;
	initialRender: boolean;
};

const TestimonialCard = ({
	testimonial,
	isExpanded,
	ind,
	toggleExpand,
	initialRender,
}: Props) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	// Only render content if it's part of initial render or has come into view
	if (!initialRender && !inView) {
		return <div ref={ref} className="h-[500px] w-full max-w-xs" />;
	}

	const isLong = (testimonial?.testimony?.length ?? 0) > 200;
	const rating = testimonial.rating || 5;

	return (
		<div ref={ref} className="flex items-center justify-center">
			<div className="mx-auto flex h-[500px] w-full max-w-xs flex-col overflow-hidden rounded-[10px] bg-[#2563EB] shadow-lg">
				<div className="mt-3 flex h-full w-full items-center justify-center overflow-hidden rounded-t-[10px] p-4 pt-4">
					{testimonial.image && testimonial.image.url && (
						<div className="relative mt-4 h-[288px] w-[288px] pt-2">
							<Image
								src={optimisedImageUrl(testimonial.image)}
								alt={testimonial.name}
								fill
								className="rounded-[10px] object-cover"
								sizes="(max-width: 768px) 100vw, 288px"
								loading="lazy"
							/>
						</div>
					)}
				</div>

				<div className="flex flex-1 flex-col justify-between p-5 pt-3 text-white">
					<div>
						<div className="mb-1 flex items-center justify-between">
							<div>
								<h3 className="text-sm font-bold text-white">
									{testimonial.name},{' '}
									<span className="text-sm font-normal text-blue-100">
										Age {testimonial.age}
									</span>
								</h3>
								<p className="text-xs text-blue-100">
									From {testimonial.location}
								</p>
							</div>
							<div className="flex">
								{[...Array(rating)].map((_, i) => (
									<svg
										key={i}
										className="h-4 w-4 fill-current text-yellow-400"
										viewBox="0 0 24 24">
										<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
									</svg>
								))}
							</div>
						</div>
					</div>

					<p
						className={`mt-2 text-[15px] leading-relaxed font-medium ${
							!isExpanded && isLong ? 'line-clamp-4' : ''
						}`}>
						{testimonial.testimony}
					</p>
				</div>

				{isLong && (
					<button
						onClick={() => toggleExpand(ind)}
						className="mt-2 text-sm text-blue-200 underline hover:text-white">
						{isExpanded ? 'See less' : 'See more'}
					</button>
				)}
			</div>
		</div>
	);
};

export default React.memo(TestimonialCard);
