'use client';

import React from 'react';

const ExpertCarouselSkeleton = () => {
	// Mock positions for skeleton images (simplified version of original positions)
	const imagePositions = [
		{
			left: 413.14,
			top: 253,
			width: 78,
			height: 91,
			rotate: 71,
			opacity: 0.6,
		},
		{
			left: 320.71,
			top: 152,
			width: 78,
			height: 91,
			rotate: 50,
			opacity: 0.7,
		},
		{
			left: 200.25,
			top: 45,
			width: 108,
			height: 126,
			rotate: 25,
			opacity: 0.8,
		},
		{ left: 21, top: 4, width: 130, height: 151, rotate: 0, opacity: 1 }, // Center/active
		{
			left: -111,
			top: 109,
			width: 78,
			height: 91,
			rotate: -25,
			opacity: 0.8,
		},
		{
			left: -211,
			top: 212,
			width: 78,
			height: 91,
			rotate: -50,
			opacity: 0.7,
		},
	];

	return (
		<section className="w-full px-4 py-10">
			{/* Title skeleton */}
			<div className="mb-8 flex justify-center">
				<div className="text-center">
					<div className="mb-2 h-8 w-64 animate-pulse rounded bg-gray-200 md:h-10 md:w-80"></div>
					<div className="mx-auto h-8 w-48 animate-pulse rounded bg-gray-200 md:h-10 md:w-56"></div>
				</div>
			</div>

			{/* Carousel container skeleton */}
			<div
				style={{
					width: 480,
					height: 300,
					position: 'relative',
					margin: '0 auto',
					overflow: 'visible',
				}}>
				{imagePositions.map((pos, index) => {
					const isFar = index === 0 || index === 5;
					const isCenter = index === 3;

					return (
						<div
							key={index}
							style={{
								position: 'absolute',
								left: pos.left,
								top: pos.top,
								width: pos.width,
								height: pos.height,
								borderRadius: 10.74,
								transform: `rotate(${pos.rotate}deg)`,
								opacity: isFar ? 0 : pos.opacity,
								visibility: isFar ? 'hidden' : 'visible',
								zIndex: isCenter ? 10 : 5,
								overflow: 'hidden',
							}}
							className={`animate-pulse bg-gray-200 ${
								isCenter ? 'ring-2 ring-blue-200' : ''
							}`}>
							{/* Inner content skeleton */}
							<div className="h-full w-full animate-pulse bg-gray-300"></div>
						</div>
					);
				})}
			</div>

			{/* Expert details skeleton */}
			<div className="relative mx-auto -mt-20 min-h-[270px] w-full max-w-3xl overflow-hidden text-left">
				<div className="absolute w-full">
					{/* Quote skeleton */}
					<div className="mb-4 max-w-[290px]">
						<div className="mb-2 h-6 w-full animate-pulse rounded bg-gray-200 md:h-7"></div>
						<div className="h-6 w-4/5 animate-pulse rounded bg-gray-200 md:h-7"></div>
					</div>

					{/* Name skeleton */}
					<div className="mb-2 h-6 w-48 animate-pulse rounded bg-gray-200 md:h-7 md:w-56"></div>

					{/* Credentials skeleton */}
					<div className="mb-4 h-4 w-64 animate-pulse rounded bg-gray-200 md:h-5 md:w-80"></div>

					{/* Badges skeleton */}
					<div className="mb-4 flex flex-wrap justify-start gap-3">
						{/* LinkedIn badge skeleton */}
						<div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
							<div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
							<div className="h-3 w-16 animate-pulse rounded bg-gray-300"></div>
						</div>
						{/* Experience badge skeleton */}
						<div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
							<div className="h-3 w-20 animate-pulse rounded bg-gray-300"></div>
						</div>
					</div>

					{/* Achievement badges skeleton */}
					<div className="flex flex-wrap justify-start gap-2">
						{[1, 2, 3].map(i => (
							<div
								key={i}
								className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
								<div className="h-4 w-4 animate-pulse rounded bg-gray-300"></div>
								<div
									className={`h-3 animate-pulse rounded bg-gray-300 ${
										i === 1
											? 'w-24'
											: i === 2
											? 'w-20'
											: 'w-28'
									}`}></div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Pagination dots skeleton */}
			<div className="mt-10 flex justify-center space-x-2">
				{[1, 2, 3, 4, 5, 6].map((_, index) => (
					<div
						key={index}
						className={`animate-pulse rounded-full bg-gray-200 transition-all duration-300 ${
							index === 3 // Center active state
								? 'h-2 w-6'
								: 'h-2 w-2'
						}`}
					/>
				))}
			</div>
		</section>
	);
};

export default ExpertCarouselSkeleton;
