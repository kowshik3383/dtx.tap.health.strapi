'use client';

import React, { useEffect, useRef } from 'react';
import { components } from '@/types/strapi';
import FoodCard from './elements/FoodCard';
const SliderComponent = React.memo(
	({
		upperSlider,
		lowerSlider,
	}: components['schemas']['ItemsMealPlanComponent']) => {
		const leftRef = useRef<HTMLDivElement>(null);
		const rightRef = useRef<HTMLDivElement>(null);
		const upperCards = [
			...(upperSlider ?? []),
			...(upperSlider ?? []),
			...(upperSlider ?? []),
		];
		const lowerCards = [
			...(lowerSlider ?? []),
			...(lowerSlider ?? []),
			...(lowerSlider ?? []),
		];
		// const [upperSlider] = useState<CardData[]>(duplicateArray(upperCard));
		// const [lowerSlider] = useState<CardData[]>(duplicateArray(lowerCards));

		const animate = (
			element: HTMLDivElement,
			direction: 'left' | 'right',
		) => {
			let start: number | null = null;
			const speed = 40;
			let animationFrameId: number;

			const step = (timestamp: number) => {
				if (!start) start = timestamp;
				const elapsed = timestamp - start;
				const offset = (elapsed / 1000) * speed;

				const translate = direction === 'left' ? -offset : offset;
				element.style.transform = `translateX(${translate}px)`;

				if (Math.abs(translate) >= element.scrollWidth / 3) {
					start = timestamp;
					element.style.transform = 'translateX(0px)';
				}

				animationFrameId = requestAnimationFrame(step);
			};

			animationFrameId = requestAnimationFrame(step);

			return () => {
				cancelAnimationFrame(animationFrameId);
			};
		};

		useEffect(() => {
			const leftElement = leftRef.current;
			const rightElement = rightRef.current;

			if (leftElement && rightElement) {
				const leftAnimation = animate(leftElement, 'left');
				const rightAnimation = animate(rightElement, 'right');

				return () => {
					leftAnimation();
					rightAnimation();
				};
			}
		}, []);

		return (
			<div className="relative z-50 flex flex-col space-y-1">
				{/* Upper Slider */}
				<div className="relative flex w-full justify-center overflow-hidden py-2">
					<div className="flex gap-1" ref={rightRef}>
						{upperCards?.map((card, i) => (
							<FoodCard
								key={`upper-${i}`}
								icon={card.icon}
								title={card.title}
								description={card.description}
								backgroundColor={card.backgroundColor}
							/>
						))}
					</div>
				</div>
				{/* Lower Slider */}
				<div className="flex w-full justify-center overflow-hidden py-2">
					<div className="flex gap-1" ref={leftRef}>
						{lowerCards?.map((card, i) => (
							<FoodCard
								key={`lower-${i}`}
								icon={card.icon}
								title={card.title}
								description={card.description}
								backgroundColor={card.backgroundColor}
							/>
						))}
					</div>
				</div>
			</div>
		);
	},
);

export default SliderComponent;
