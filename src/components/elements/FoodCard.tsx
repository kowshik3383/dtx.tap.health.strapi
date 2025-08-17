import React from 'react';
import { components } from '@/types/strapi';
export default function FoodCard({
	icon,
	title,
	description,
	backgroundColor,
}: components['schemas']['SharedGridiconFeatureComponent']) {
	return (
		<div className="mx-2 transform transition-transform duration-300 hover:scale-105">
			<div className="flex h-[72px] w-[328px] items-center gap-3 rounded-[16px] bg-white px-3 shadow-[0_2px_8px_0px_rgba(0,0,0,0.08)]">
				<div
					style={backgroundColor ? { backgroundColor } : {}}
					className={`flex h-12 w-12 items-center justify-center rounded-[12px] text-xl`}>
					{icon}
				</div>

				<div className="flex flex-1 flex-col">
					<h3 className="text-[16px] leading-[22px] font-medium text-[#1C1C1E]">
						{title}
					</h3>
					<div className="flex items-center gap-2">
						{description && (
							<span className="text-[14px] leading-[18px] text-[#8E8E93]">
								{description}
							</span>
						)}
					</div>
				</div>
				<svg
					width="8"
					height="12"
					viewBox="0 0 8 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="ml-2">
					<path
						d="M1.5 1L6.5 6L1.5 11"
						stroke="#8E8E93"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
}
