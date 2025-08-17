'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { components } from '@/types/strapi';
import ExerciseCard from './cards/ExerciseCard';

import { FeatureCardData, featureCards } from './data';
import FeatureCardModal from './FeatureCardModal';
import FeatureCardModalContent from './FeatureCardModalContent';

const FeatureCard = ({
	title,
	logo,
	bold_title_part1,
	bold_title_part2,
	bold_title_part3,
	cards,
	modal
}: components['schemas']['DynamicZoneFeaturesCardComponent']) => {
	const pathname = usePathname();
	const isV2o = pathname === '/v2o';
	const isV2o1 = pathname === '/v2o1';
	const isV2o2 = pathname === '/v2o2';
	const isV2o3 = pathname === '/v2o3';
	const isV2o4 = pathname === '/v2o4';

	const isV2Plans = pathname === '/v2plans';
	const isV3Plans = pathname === '/v3plans';

	// Modal State
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const isOpen = activeIndex !== null;
	const currentCard =
		activeIndex !== null && modal?.[activeIndex]
			? modal?.[activeIndex]
			: null;
	const openModal = (index: number) => setActiveIndex(index);
	const closeModal = () => setActiveIndex(null);

	const onNext = () => {
		if (activeIndex === null || activeIndex === featureCards.length - 1)
			return;
		setActiveIndex(prev => (prev ?? 0) + 1);
	};
	const onBack = () => {
		if (activeIndex === null || activeIndex === 0) return;
		setActiveIndex(prev => ((prev ?? 0) - 1));
	};

	return (
		<section
			className={`mt-7 ${(isV2o1 || isV2o2 || isV2o3 || isV2o4)
					? 'bg-gradient-to-b from-blue-50 to-blue-100'
					: (isV2Plans || isV3Plans || isV2o)
						? ''
						: 'bg-white'
				}`}
		>

			{/* Title block */}
			{(isV2Plans || isV3Plans) && (
				<h1 className="mb-6 pt-3 text-center text-3xl font-bold text-slate-800">
					{title}
				</h1>
			)}

			{(isV2o1 || isV2o2 || isV2o3 || isV2o4) && (
				<h1 className="mb-6 pt-3 text-center text-3xl font-bold text-slate-800">
					{title}
				</h1>
			)}

			{!isV2o && !isV2o1 && !isV2o4 && !isV2o3 && !isV2Plans && !isV3Plans && !isV2o2 && (
				<>
					<h1 className="mb-2 text-center text-[14px] font-bold text-slate-800 lg:text-lg">
						{title}
					</h1>

					<div className="mb-6 text-[24px] leading-tight font-extrabold text-slate-800">
						<div className="flex items-center justify-center gap-1">
							{logo?.url && (
								<div className="relative h-5 w-5">
									<Image
										src={logo.url}
										alt="Tap Health Logo"
										fill
										className="object-contain"
									/>
								</div>
							)}

							<span className="-ml-2 font-extrabold">
								{bold_title_part1}
							</span>
							<span className="font-extrabold">
								{bold_title_part2}
							</span>
						</div>

						<div className="text-center text-[22px] font-extrabold text-slate-800">
							{bold_title_part3}
						</div>
					</div>
				</>
			)}

			{/* Cards Section */}
			<div className="mx-3 flex flex-col gap-3">
				{cards?.map((card, index) => (
					<div
					    key={index}
						onClick={() => openModal(index)}
						className="cursor-pointer">
						<ExerciseCard
							key={index}
							image={card.image}
							title={card.title}
							description={card.description}
						/>
					</div>
				))}
			</div>

			{/* Modal */}
			<FeatureCardModal isOpen={isOpen} onClose={closeModal}>
				{currentCard && (
					<FeatureCardModalContent
						data={currentCard}
						onNext={onNext}
						onBack={onBack}
						isNextDisabled={activeIndex === featureCards.length - 1}
						isBackDisabled={activeIndex === 0}
						activeIndex={activeIndex ?? 0}
						cardData={featureCards}
						onClose={closeModal}
					/>
				)}
			</FeatureCardModal>
		</section>
	);
};

export default FeatureCard;
