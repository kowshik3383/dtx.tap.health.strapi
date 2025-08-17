'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';
import Section from '../layout/Section';

const DiabeticExercise: React.FC = ({
	title = 'Simple Home Exercises',
	description = 'Get workouts tailored to your age, fitness level and health condition',
	icon,
	image,
}: components['schemas']['ItemsExerciseComponent']) => {
	const ref = useRef(null);

	const isInView = useInView(ref, {
		once: false, // 🔄 Allow animation every time it enters the view
		margin: '0px 0px -100px 0px',
	});

	const controls = useAnimation();

	useEffect(() => {
		if (isInView) {
			controls.start({ x: 0, opacity: 1 });
		} else {
			controls.set({ x: 200, opacity: 0 }); // 👈 Reset when it goes out
		}
	}, [isInView, controls]);

	return (
		<Section
			title={title || 'Simple Home Exercises'}
			description={description}
			icon={icon}>
			{image && image.url && (
				<div className="mt-6 overflow-hidden" ref={ref}>
					<motion.img
						src={optimisedImageUrl(image)}
						alt={image.name || 'Exercise illustration'}
						initial={{ x: 200, opacity: 0 }}
						animate={controls}
						transition={{ duration: 0.6, ease: 'easeInOut' }}
					/>
				</div>
			)}
		</Section>
	);
};

export default DiabeticExercise;