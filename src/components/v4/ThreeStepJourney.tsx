'use client';
import Image from 'next/image';
import { components } from '@/types/strapi';




const ThreeStepJourney = ({
	title,
	description,
	results,
}: components['schemas']['DynamicZoneThreeStepJourneyComponent']) => {
	return (
		<div className="flex flex-col items-center gap-10 bg-white px-4 py-10 text-center">
			{/* Section Header */}
			<div>
				<h2 className="text-2xl leading-tight font-extrabold text-blue-900">
					{title}
				</h2>
				<p className="mt-1 text-sm font-medium text-gray-600">
					{description}
				</p>
			</div>

			{/* Steps */}
			<div className="flex flex-col gap-16">
				{results?.map((step, index) => {
					// Make first and second images smaller
					const imageWidth = index === 0 || index === 1 ? 220 : 300;
					const imageHeight = index === 0 || index === 1 ? 440 : 600;

					return (
						<div
							key={index}
							className="mx-auto flex max-w-md flex-col items-center gap-x-4">
							<h3 className="w-[280px] text-center text-[24px] leading-snug font-extrabold text-blue-700">
								{step.title}
							</h3>
							<p className="w-[220px] max-w-xs text-center text-[12px] font-bold text-[#252E49]">
								{step.sub_title}
							</p>
							{step.image && step.image.url && (
								<Image
									src={step.image.url}
									alt={step.title || `$${title}-${index}`}
									width={imageWidth}
									height={imageHeight}
									className="mt-5 rounded-xl object-contain"
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ThreeStepJourney;
