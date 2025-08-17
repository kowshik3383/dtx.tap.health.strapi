'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { memo, useMemo } from 'react';
import { components } from '@/types/strapi';

// Memoize component to prevent unnecessary re-renders unless props change
const ExerciseCard = memo(
	({
		image,
		title,
		description,
	}: components['schemas']['SharedGridimageFeatureComponent']) => {
		// ✅ useMemo: Only recompute image url and alt when image or title changes
		const imageUrl = useMemo(() => image?.url ?? '', [image?.url]);
		const imageAlt = useMemo(() => title || 'Exercise Image', [title]);

		const pathname = usePathname();
	const isV2Plans = pathname === '/v2plans';

	return (
			<div
			className={`mx-auto flex max-w-md flex-col gap-2 rounded-xl border border-neutral-200 ${
				isV2Plans ? 'bg-white' : 'bg-white/30'
			} p-2 shadow-sm`}
		>
				<div className="flex items-center gap-2">
					{/* ✅ Only render Image if valid URL exists */}
					{imageUrl && (
						<div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-md">
							<Image
								src={imageUrl}
								alt={imageAlt}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 180px"
								priority
							/>
						</div>
					)}

					{/* Text Section */}
					<div className="flex flex-col gap-2 px-1">
						<h3 className="font-['Urbanist'] text-base font-semibold text-neutral-800">
							{title}
						</h3>
						<p className="text-xs leading-none font-medium text-zinc-600">
							{description}
						</p>
					</div>
				</div>
			</div>
		);
	}
);

// ✅ Add display name for debugging with React DevTools
ExerciseCard.displayName = 'ExerciseCard';

export default ExerciseCard;
