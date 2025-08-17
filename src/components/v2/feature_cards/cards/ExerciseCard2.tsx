'use client';

import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';

type Props = components['schemas']['SharedWhatYouGetCardsComponent'];

const ExerciseCard2 = ({ title, description, image }: Props) => {
	const imageUrl = image?.url;
	const imageAlt = image?.name ?? `${title} image`;

	return (
		<section className="flex h-[220px] w-[230px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-md">
			{/* Image Block */}
			{imageUrl && (
				<div className="relative h-[125px] w-full overflow-hidden rounded-xl">
					<Image
						src={imageUrl}
						alt={imageAlt}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 160px, 100vw"
						priority
					/>
				</div>
			)}

			{/* Text Content */}
			<div className="flex-1 px-1 pt-2 leading-tight text-black">
				<h2 className="text-md font-semibold">{title}</h2>
				<p className="mt-1 text-sm text-gray-600 line-clamp-3">{description}</p>
			</div>
		</section>
	);
};

export default ExerciseCard2;
