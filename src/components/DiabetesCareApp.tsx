'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import DiabeteCareAppDynamicZoneManager from '@/components/layout/section-manager';
import { components } from '@/types/strapi';

const DiabetesCareApp = React.memo(
	({
		title,
		description,
		dynamic_zone,
	}: components['schemas']['DynamicZoneDiabetesCareappComponent']) => {
		const { ref: headingRef, inView: headingInView } = useInView({
			triggerOnce: true,
			threshold: 0.2,
		});

		return (
			<section className="p-4">
				{/* Top Heading */}
				<motion.div
					className="mx-auto mb-6 max-w-sm space-y-2 text-center sm:mb-8 sm:max-w-md md:max-w-4xl"
					ref={headingRef}
					initial={{ opacity: 0 }}
					animate={{ opacity: headingInView ? 1 : 0 }}
					transition={{ duration: 0.5 }}>
					<h1 className="text-center align-middle font-['Urbanist'] text-[24px] leading-[100%] font-bold tracking-[0%] text-gray-800">
						{title || 'Everything a diabetic needs or'}
					</h1>
					<p className="text-center align-middle font-['Urbanist'] text-[16px] leading-[100%] font-medium tracking-[0%] text-gray-600">
						{description || 'in one seamless app or'}
					</p>
				</motion.div>
				{dynamic_zone && dynamic_zone.length > 0 && (
					<DiabeteCareAppDynamicZoneManager
						dynamicZone={dynamic_zone}
						locale="en"
					/>
				)}
			</section>
		);
	},
);

export default DiabetesCareApp;
