'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { components } from '@/types/strapi';

// interface Expert {
// 	id: number;
// 	src: string;
// 	alt: string;
// 	name: string;
// 	credentials: string;
// 	quote: string;
// 	experience: string;
// 	achievements: string[];
// 	hasLinkedIn: boolean;
// }

interface ImagePosition {
	left: number;
	top: number;
	width: number;
	height: number;
	rotate: number;
	borderRadius: number;
	bg: string;
	boxShadow: string;
	border: string;
}

const ExpertCarousel = ({
	title_line_1,
	title_line_2,
	experts = [],
}: components['schemas']['DynamicZoneExpertCarouselComponent']) => {
	const imagePositions: ImagePosition[] = [
		{
			left: 413.14,
			top: 253,
			width: 78,
			height: 91,
			rotate: 71,
			borderRadius: 10.74,
			bg: '#F6F2FF',
			boxShadow: '',
			border: '',
		},
		{
			left: 320.71,
			top: 152,
			width: 78,
			height: 91,
			rotate: 50,
			borderRadius: 10.74,
			bg: '#F6F2FF',
			boxShadow: '',
			border: '',
		},
		{
			left: 200.25,
			top: 45,
			width: 108,
			height: 126,
			rotate: 25,
			borderRadius: 10.74,
			bg: '#F6F2FF',
			boxShadow: '',
			border: '',
		},
		{
			left: 21,
			top: 4,
			width: 130,
			height: 151,
			rotate: 0,
			borderRadius: 10.74,
			bg: '#F6F2FF',
			boxShadow: '0px 4px 12px rgba(152, 167, 205, 0.5)',
			border: '1.18px solid #33C9FF',
		},
		{
			left: -111,
			top: 109,
			width: 78,
			height: 91,
			rotate: -25,
			borderRadius: 10.74,
			bg: '#F6F2FF',
			boxShadow: '',
			border: '',
		},
		{
			left: -211,
			top: 212,
			width: 78,
			height: 91,
			rotate: -50,
			borderRadius: 10.74,
			bg: '#F6F2FF',
			boxShadow: '',
			border: '',
		},
	];

	const centerPosIndex = 3;
	const [positionsOrder, setPositionsOrder] = useState<number[]>([
		0, 1, 2, 3, 4, 5,
	]);
	const experts_ = [...experts, ...experts]; // repeat to ensure enough items for rotation
	const getActiveIndex = (): number =>
		positionsOrder.findIndex(pos => pos === centerPosIndex);

	const rotateOnce = (order: number[]): number[] => {
		const first = order[0]!;
		return [...order.slice(1), first];
	};

	const rotateToCenter = (clickedExpertIndex: number): void => {
		let newOrder = [...positionsOrder];
		let steps = 0;
		while (
			newOrder.findIndex(pos => pos === centerPosIndex) !==
			clickedExpertIndex
		) {
			newOrder = rotateOnce(newOrder);
			steps++;
			if (steps > (experts_?.length ?? 0)) break;
		}
		setPositionsOrder(newOrder);
	};

	const activeExpert = useMemo(
		() => experts_?.[getActiveIndex()],
		[positionsOrder],
	);

	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => {
			setPositionsOrder(prev => {
				if (prev.length === 0) return prev;
				const [first, ...rest] = prev;
				if (first === undefined) return prev;
				return [...rest, first];
			});
		},

		onSwipedRight: () => {
			setPositionsOrder(prev => {
				if (prev.length === 0) return prev;
				const last = prev[prev.length - 1];
				if (last === undefined) return prev;
				return [last, ...prev.slice(0, -1)];
			});
		},

		trackMouse: true,
	});
	const TOTAL_DOTS = experts?.length; // fixed number of dots
	return (
		<section className="w-full px-4 py-10" {...swipeHandlers}>
			<h1 className="mb-8 text-center text-3xl font-bold text-black md:text-4xl">
				{title_line_1} <br className="hidden md:block" /> {title_line_2}
			</h1>

			<div
				{...swipeHandlers}
				style={{
					width: 480,
					height: 300,
					position: 'relative',
					margin: '0 auto',
					overflow: 'visible',
					userSelect: 'none',
				}}>
				{experts_?.map((expert, index) => {
					const posIndex = positionsOrder[index];
					if (posIndex === undefined) return null;

					const pos = imagePositions[posIndex];
					if (pos === undefined) return null;

					const isActive = posIndex === centerPosIndex;
					const isFar = posIndex === 0 || posIndex === 5;

					return (
						<div
							key={index}
							onClick={() => rotateToCenter(index)}
							style={{
								position: 'absolute',
								left: pos.left,
								top: pos.top,
								width: pos.width,
								height: pos.height,
								background: pos.bg,
								borderRadius: pos.borderRadius,
								boxShadow: pos.boxShadow,
								border: pos.border,
								transform: `rotate(${pos.rotate}deg)`,
								cursor: 'pointer',
								transition: 'all 0.5s ease',
								zIndex: isActive ? 10 : 5,
								overflow: 'hidden',
								opacity: isFar ? 0 : 1,
								visibility: isFar ? 'hidden' : 'visible',
								pointerEvents: isFar ? 'none' : 'auto',
							}}>
							{expert.image && expert.image.url && (
								<Image
									src={expert.image.url}
									alt={
										expert.image.name ||
										`Expert ${expert.id}`
									}
									width={pos.width}
									height={pos.height}
									style={{
										objectFit: 'cover',
										borderRadius: pos.borderRadius,
									}}
									draggable={false}
								/>
							)}
						</div>
					);
				})}
			</div>

			{activeExpert && (
				<div className="relative mx-auto -mt-20 min-h-[270px] w-full max-w-3xl overflow-hidden text-left select-none">
					<AnimatePresence mode="popLayout">
						<motion.div
							key={activeExpert.id}
							initial={{ opacity: 0, x: 40 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -40 }}
							transition={{ duration: 0.5 }}
							className="absolute w-full">
							<blockquote className="mb-4 max-w-[290px] text-xl font-semibold text-gray-800 italic md:text-2xl">
								"{activeExpert.quote}"
							</blockquote>
							<h3 className="text-xl font-bold text-gray-900 md:text-2xl">
								{activeExpert.name}
							</h3>
							<p className="mb-4 text-sm text-gray-600 md:text-lg">
								{activeExpert.credentials}
							</p>

							<div className="mb-4 flex flex-wrap justify-start gap-3">
								{activeExpert.linkedin_url && (
									<div className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
										<Linkedin
											className="text-blue-700"
											size={18}
										/>
										<span className="text-sm font-medium text-black">
											LinkedIn
										</span>
									</div>
								)}
								<div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1">
									<span className="text-sm font-bold text-teal-600">
										{activeExpert.experience}
									</span>
								</div>
							</div>

							<div className="flex flex-wrap justify-start gap-2">
								{activeExpert.achievements?.map((ach, i) => (
									<div
										key={i }
										className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
										<span className="text-amber-500">
											🏆
										</span>
										<span className="text-sm font-medium text-black">
											{ach.input}
										</span>
									</div>
								))}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			)}

			<div className="mt-10 flex justify-center space-x-2">
				{Array.from({ length: TOTAL_DOTS }).map((_, index) => (
					<div
						key={index}
						onClick={() => rotateToCenter(index)} // you might need to map index back to item
						className={`cursor-pointer rounded-full transition-all duration-300 ${
							index === getActiveIndex() % TOTAL_DOTS
								? 'h-2 w-6 bg-[#2563EB]'
								: 'h-2 w-2 bg-[#D9D9D9]'
						}`}
					/>
				))}
			</div>
		</section>
	);
};

export default ExpertCarousel;
