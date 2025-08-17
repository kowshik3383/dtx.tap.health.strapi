'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

const GlucoseLogger = () => {
	const pathname = usePathname();
	const isV2Plans = pathname === '/v2plans';

	return (
		<div
			className={`mx-auto flex max-w-md flex-col gap-2 rounded-xl border border-neutral-200 p-2 shadow-sm ${
				isV2Plans ? 'bg-white' : 'bg-white/30'
			}`}>
			<div className="flex items-center gap-2">
				{/* Image Section */}
				<div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-md">
					<Image
						src="/assets/v2/glucose.svg"
						alt="Daily Meal"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 180px"
						priority
					/>
				</div>

				{/* Text Section */}
				<div className="flex flex-col gap-2 px-1">
					<h3 className="font-['Urbanist'] text-base font-semibold text-neutral-800">
						Quick Glucose logging
					</h3>
					<p className="text-xs leading-none text-zinc-600">
						to help you keep track of your progress
					</p>
				</div>
			</div>
		</div>
	);
};

export default GlucoseLogger;
