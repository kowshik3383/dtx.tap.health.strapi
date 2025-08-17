import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React,{ ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';

interface SectionProps {
	title: string;
	description: string;
	icon: components['schemas']['SharedMediaComponent']['file'];
	children: ReactNode;
}

const Section = ({ title, description, icon, children }: SectionProps) => {
	const controls = useAnimation();
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	useEffect(() => {
		if (inView) {
			controls.start('visible');
		}
	}, [controls, inView]);

	const headingVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: 'easeInOut',
			},
		},
	};

	const textVariants = {
		hidden: { opacity: 0, y: -10 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: 'easeInOut',
			},
		},
	};

	return (
		<section className="mb-6">
			<div className="mb-0 overflow-visible rounded-3xl border-2 border-gray-200 bg-[#F2F5F9]">
				<div className="flex flex-row gap-4 p-4">
					{icon && icon.url && (
						<div className="flex h-12 w-12 shrink-0 justify-center rounded-full">
							<Image
								src={optimisedImageUrl(icon)}
								alt={icon.name || 'Section icon'}
								width={40}
								height={40}
								className="text-green-500"
							/>
						</div>
					)}

					<div className="text-left">
						<motion.h2
							ref={ref}
							className="text-[18px] leading-tight font-bold text-gray-800"
							variants={headingVariants}
							initial="hidden"
							animate={controls}>
							{title}
						</motion.h2>

						<motion.p
							className="mt-1 text-[14px] font-semibold text-gray-600"
							variants={textVariants}
							initial="hidden"
							animate={controls}>
							{description}
						</motion.p>
					</div>
				</div>

				{children}
			</div>
		</section>
	);
};

export default Section;
