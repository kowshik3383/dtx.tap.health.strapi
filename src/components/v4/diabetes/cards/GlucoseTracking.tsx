'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { components } from '@/types/strapi';

const GlucoseTracking = ({
	title,
	sub_title,
	image,
}: components['schemas']['DynamicZoneGlucoseTrackingComponent']) => {
	const pathname = usePathname();
	return (
		<div className="font-urbanist mt-5 mb-5 flex w-full flex-col items-start gap-5 overflow-hidden rounded-2xl bg-[linear-gradient(128.31deg,_#FFFFFF_14.41%,_#C4EDFD_120.26%)]">
			{/* Heading */}
			<div className="flex w-full flex-col items-center gap-2 py-6 text-center">
				<h2 className="text-[20px] font-semibold text-black">
					{title}
				</h2>
				<p className="text-xs font-medium text-slate-400">
					{sub_title}
				</p>
			</div>
			{/* Centered Image with fade blend at bottom */}
			<div className="relative flex w-full justify-center px-12">
				{image && image.url && (
					<div className="relative w-full max-w-[400px] overflow-hidden rounded-t-xl bg-white">
						<Image
							src={image.url}
							alt={image.alternativeText || 'Graph'}
							width={400}
							height={200}
							className="h-auto w-full object-contain"
						/>
						{/* Gradient fade effect */}
						<div className="pointer-events-none absolute bottom-0 left-0 h-6 w-full bg-gradient-to-b from-transparent to-[rgba(196,237,253,1)]" />
					</div>
				)}
			</div>
		</div>
	);
};

export default GlucoseTracking;
