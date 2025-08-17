'use client';

import React from 'react';
import { InView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { components } from '@/types/strapi';
import ResultVideoCard from './cards/ResultVideoCard';
const FastResult = ({
	title,
	description,
	results,
	fullscreen = false,
}: components['schemas']['DynamicZoneFastResultComponent']) => {
	return (
		<div className="bg-[#F2F5F9]">
			<div className="px-4 md:px-8">
				{title && (
					<h1 className="pt-10 text-center text-3xl font-bold text-black">
						{title}
					</h1>
				)}

				{description && (
					<p className="pb-9 text-center text-xl font-normal text-black">
						{description}
					</p>
				)}
			</div>

			<div
				className={cn(
					'grid gap-6  pb-10',
					fullscreen
						? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
						: 'grid-cols-1',
				)}>
				{results?.map((result, index) => (
					<InView
						key={index}
						triggerOnce
						className="w-full"
						rootMargin="0px 0px -100px 0px">
						{({ inView, ref }) => (
							<div
								ref={ref}
								className={`w-full transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}
								style={{ height: '100%' }}
							>
								<ResultVideoCard {...result} />
							</div>
						)}

					</InView>
				))}
			</div>
		</div>
	);
};

export default React.memo(FastResult);
