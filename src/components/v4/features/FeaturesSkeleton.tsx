'use client';

import React from 'react';

const FeatureItemSkeleton = () => (
	<div className="flex items-center gap-2">
		<div className="h-5 w-5 rounded-full bg-gray-200" />
		<div className="h-3 w-48 rounded bg-gray-200" />
	</div>
);

const FeaturesSkeleton = () => {
	return (
		<div className="flex items-center justify-center bg-gradient-to-b from-blue-600 to-slate-800 px-6 py-8">
			<div className="flex w-80 animate-pulse flex-col gap-4 rounded-2xl bg-white px-4 py-3 shadow-lg outline outline-slate-800">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-1">
						<div className="h-2 w-16 rounded bg-gray-300" />
						<div className="h-4 w-24 rounded bg-gray-300" />
					</div>
					<div className="h-4 w-16 rounded-xl bg-blue-100" />
				</div>

				<div className="h-px bg-indigo-200" />

				{/* Features List */}
				<div className="flex flex-col gap-3.5">
					<div className="h-2 w-20 rounded bg-gray-300" />
					<div className="flex flex-col gap-2">
						{Array.from({ length: 7 }).map((_, i) => (
							<FeatureItemSkeleton key={i} />
						))}
					</div>
				</div>

				<div className="h-px bg-indigo-200" />

				{/* CTA Button */}
				<div className="w-full">
					<div className="h-8 rounded-full bg-blue-300" />
				</div>
			</div>
		</div>
	);
};

export default FeaturesSkeleton;
