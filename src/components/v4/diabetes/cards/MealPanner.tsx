'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { components } from '@/types/strapi';

const MealPanner = ({
	title,
	sub_title,
	cards = [],
}: components['schemas']['DynamicZoneMealPlannerComponent']) => {
	// Duplicate enough to fill full scroll width
	const marqueeItems = [...cards, ...cards, ...cards];
	const pathname = usePathname();
	const isV6toV8 = ['/v6', '/v7', '/v8'].some(path =>
		pathname.includes(path),
	);

	const meals = [
		{
			title: ' Besan Chilla',
			description: '180 kcal',
			image: { url: '/assets/v4/meal1.svg' },
		},
		{
			title: ' Moong Dal Chaat',
			description: '200 kcal',
			image: { url: '/assets/v4/diet1.svg' },
		},
		{
			title: ' Puri with Aloo Poori',
			description: '280 kcal',
			image: { url: '/assets/v4/meal2.svg' },
		},
	];

	return (
		<div className="font-urbanist mt-5 mb-5 flex w-full flex-col items-start gap-5 overflow-hidden rounded-2xl bg-[linear-gradient(128.31deg,_#FFFFFF_14.41%,_#C4EDFD_120.26%)] px-5 py-6">
			{/* Conditional Header */}
			<div className="flex w-full flex-col items-center gap-2 text-center">
				<h2 className="text-[20px] font-semibold text-black">
					{title}
				</h2>
				<p className="text-xs font-medium text-slate-400">
					{sub_title}
				</p>
			</div>

			<div className="relative w-full overflow-hidden">
				<motion.div
					className="flex w-max gap-3"
					animate={{
						x: ['0%', '-50%'],
					}}
					transition={{
						duration: 25,
						repeat: Infinity,
						ease: 'linear',
					}}>
					{marqueeItems.map((meal, index) => (
						<div
							key={index}
							className="flex min-w-[220px] items-center gap-2 rounded-lg bg-white p-2 shadow-md">
							{meal.image && meal.image.url && (
								<div className="relative h-12 w-12 overflow-hidden rounded-full">
									<Image
										src={meal.image.url}
										alt={
											meal.title ||
											`Meal Image${index + 1}`
										}
										fill
										className="object-cover"
									/>
								</div>
							)}

							<div className="flex flex-col justify-center">
								<p className="text-sm font-semibold text-black">
									{meal.title}
								</p>
								<p className="text-left text-xs font-semibold text-slate-400">
									{meal.description}
								</p>
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default MealPanner;
