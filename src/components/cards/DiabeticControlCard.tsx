'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';

const DiabeticControlCard = ({
	image,
	text,
	isReversed = false,
}: components['schemas']['SharedImageTextComponent']) => {
	const { ref: containerRef, inView } = useInView({
		triggerOnce: true,
		threshold: 0.3,
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.1,
			},
		},
	};

	const imageVariants = {
		hidden: {
			opacity: 0,
			x: isReversed ? 100 : -100,
			scale: 0.8,
		},
		visible: {
			opacity: 1,
			x: 0,
			scale: 1,
			transition: {
				type: 'spring',
				damping: 20,
				stiffness: 100,
			},
		},
	};

	const textVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			filter: 'blur(10px)',
		},
		visible: {
			opacity: 1,
			y: 0,
			filter: 'blur(0px)',
			transition: {
				duration: 0.8,
				ease: 'easeOut',
			},
		},
	};

	return (
		<AnimatePresence>
			<motion.div
				ref={containerRef}
				className="mb-20 flex h-80 items-center justify-center bg-white px-4 py-6"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? 'visible' : 'hidden'}>
				<div
					className={`relative flex h-32 w-full max-w-4xl items-center px-4 ${
						isReversed ? 'flex-row-reverse' : ''
					} md:h-64 lg:h-80`}>
					
					{/* Background Card */}
					<motion.div
						className="absolute right-0 left-0 z-0 h-32 rounded-3xl border-2 border-gray-200 bg-[#F2F5F9] md:h-64 lg:h-80"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={
							inView
								? { scale: 1, opacity: 1 }
								: { scale: 0.9, opacity: 0 }
						}
						transition={{ duration: 0.5 }}
					/>

					{/* Image */}
					{image?.url && (
						<motion.div
							className="relative z-10 h-80 w-1/2"
							variants={imageVariants}>
							<Image
								src={optimisedImageUrl(image)}
								alt={image.alternativeText || ''}
								width={224}
								height={448}
								className="transform drop-shadow-xl transition-transform"
								priority
							/>
						</motion.div>
					)}

					{/* Text */}
					<motion.div
						className="z-10 w-1/2 pl-7"
						variants={textVariants}>
						<h2 className="leading-relaxed font-bold break-words whitespace-normal text-gray-800">
							{text?.split('\n').map((line, i) => (
								<motion.span
									key={i}
									className="block"
									initial={{ opacity: 0, y: 20 }}
									animate={
										inView
											? { opacity: 1, y: 0 }
											: { opacity: 0, y: 20 }
									}
									transition={{
										delay: i * 0.1,
										duration: 0.5,
									}}>
									{line}
								</motion.span>
							))}
						</h2>
					</motion.div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default React.memo(DiabeticControlCard);
