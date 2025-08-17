import { motion, Variants } from 'framer-motion';
import React from 'react';
import { components } from '@/types/strapi';

type PlanCard = components['schemas']['DynamicZonePlanCardComponent'];

interface PlanCardProps extends PlanCard {
	title: string;
	subtitle?: string;
	secondaryTitle?: string; 
	price?: string;
	currency?: string;
	className?: string;
	cardVariants?: Variants;
	textVariants?: Variants;
	highlightVariants?: Variants;
}

const PlanCard: React.FC<PlanCardProps> = ({
	title,
	subtitle,
	secondaryTitle, 
	price,
	className = '-mt-8 sm:-mt-20',
	cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
				when: 'beforeChildren',
				staggerChildren: 0.2,
			},
		},
	},
	textVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	},
	highlightVariants = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.7,
				ease: 'easeOut',
				yoyo: Infinity,
				repeatDelay: 10,
			},
		},
	},
}) => {
	return (
		<div
			className={`relative z-50 mx-auto w-full max-w-xl px-4 py-2 sm:px-6 sm:py-6 ${className}`}>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={cardVariants}
				className="flex flex-col items-center justify-center rounded-[16px] border-[2px] border-gray-100 bg-white p-4 text-center shadow-xl sm:p-6"
			>
				{secondaryTitle && (
					<motion.p
						variants={textVariants}
						className="mb-2 text-base font-semibold text-gray-800 sm:mb-3 sm:text-lg"
					>
						{secondaryTitle}
					</motion.p>
				)}

				{/* Subtitle */}
				{subtitle && (
					<motion.p
						variants={textVariants}
						className="mb-2 text-base font-semibold text-gray-800 sm:mb-3 sm:text-lg"
					>
						{subtitle}
					</motion.p>
				)}

				{/* Main Title */}
				<motion.h1
					variants={highlightVariants}
					className="mb-2 text-2xl font-bold text-[#2563EB] sm:mb-4 sm:text-4xl"
				>
					{title}
				</motion.h1>

				{/* Price */}
				{price && (
					<motion.p
						variants={textVariants}
						className="text-base font-bold text-gray-800 sm:text-xl"
					>
						{price}
					</motion.p>
				)}
			</motion.div>
		</div>
	);
};

export default PlanCard;
