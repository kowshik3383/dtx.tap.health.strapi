'use client';

import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';

type Step = components['schemas']['SharedStepsComponent'];

interface HowItWorksProps {
	className?: string;
	tag: string;
	title_part1?: string;
	highlighted_title?: string;
	title_part2?: string;
	steps?: Step[];
}

const HowItWorks: React.FC<HowItWorksProps> = ({
	className = '',
	tag,
	title_part1,
	highlighted_title,
	title_part2,
	steps = [],
}) => {
	return (
		<div className={`bg-white px-4 py-16 ${className}`}>
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<div className="mb-8">
					<div className="lg:flex lg:items-center lg:justify-center">
						<div className="inline-block rounded-md border border-blue-100 bg-[#E5F9FF] px-3 py-3 shadow-sm">
							<span className="text-sm font-semibold tracking-wide text-blue-600 uppercase">
								{tag}
							</span>
						</div>
					</div>
				</div>

				{/* Title */}
				<div className="mb-8 text-left md:text-center">
					<h2 className="text-2xl font-bold text-gray-900 md:text-5xl">
						{title_part1}{' '}
						{highlighted_title && (
							<span className="text-blue-600">
								{highlighted_title}
							</span>
						)}{' '}
						{title_part2}
					</h2>
				</div>

				{/* Desktop Grid */}
				<div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
					{steps.map((step, index) => (
						<div
							key={step.id ?? index}
							className="mx-auto flex h-full w-[280px] flex-col items-center rounded-2xl bg-white p-2 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
						>
							{step.image?.url && (
								<div className="relative mb-2 h-32 w-full">
									<Image
										src={step.image.url}
										alt={step.title || `Step ${index + 1}`}
										fill
										className="object-contain"
										priority
									/>
								</div>
							)}
							<div className="mt-2 flex items-center space-x-3">
								<span className="text-4xl leading-none font-extrabold text-[#9EEFF0]">
									{String(index + 1).padStart(2, '0')}
								</span>
								<div className="text-left">
									<h3 className="mb-1 text-base font-bold text-gray-900">
										{step.title}
									</h3>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Mobile Vertical Layout */}
				<div className="space-y-4 md:hidden">
					{steps.map((step, index) => (
						<div
							key={step.id ?? index}
							className="flex w-full flex-col items-start rounded-2xl border border-gray-200 bg-white p-2 shadow-lg transition-shadow duration-300 hover:shadow-xl"
						>
							{step.image?.url && (
								<div className="relative mb-2 h-36 w-full">
									<Image
										src={step.image.url}
										alt={step.title || `Step ${index + 1}`}
										fill
										className="object-cover"
										priority
									/>
								</div>
							)}
							<div className="mt-2 flex items-center space-x-3 py-3">
								<span className="text-4xl leading-none font-extrabold text-[#9EEFF0]">
									{String(index + 1).padStart(2, '0')}
								</span>
								<div className="text-left">
									<h3 className="mb-1 text-base font-bold text-gray-900">
										{step.title}
									</h3>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HowItWorks;
