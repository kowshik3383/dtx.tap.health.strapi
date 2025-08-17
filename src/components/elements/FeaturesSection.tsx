'use client';

import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';

const FeaturesSection = ({
	features = [],
	title,
}: components['schemas']['DynamicZoneGetFeaturesComponent']) => {
	return (
		<div className="px-2">
			<h3 className="font-urbanist mb-4 text-xl font-semibold text-[#252E49]">
				{title}
			</h3>
			<ul className="space-y-6">
				{features?.map((item, index) => (
					<li key={index} className="flex items-center gap-4">
						{item.icon && item.icon.url && (
							<Image
								src={item.icon.url}
								alt={item.icon.name || 'Feature icon'}
								width={32}
								height={32}
								layout="intrinsic"
								loading="lazy"
							/>
						)}
						<span className="font-urbanist text-lg font-medium text-[#252E49]">
							{item.feature}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default React.memo(FeaturesSection);
