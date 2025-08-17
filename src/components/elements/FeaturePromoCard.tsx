/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { components } from '@/types/strapi';
import FeaturesSection from './FeaturesSection';
import { Skeleton } from '../ui/skeleton';

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

const FeaturePromoCard = ({
	title = 'Get smart diabetes care for the price of a',
	animatedSection,
	animated_loop = false,
	highlighted_title1 = 'monthly newspaper',
	highlighted_title2 = 'subscription.',
	price_per_tag = 'per month',
	features = [],
	features_title = 'What will you get in the app?',
}: components['schemas']['DynamicZoneFeaturesPromoComponent']) => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 1 });
	const [lottieData, setLottieData] = useState<any>(null);

	const defaultOptions = {
		loop: animated_loop,
		autoplay: false,
		animationData: lottieData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	useEffect(() => {
		async function fetchAnimation() {
			try {
				const response = await fetch(animatedSection?.lottie_animation?.url || '');
				const data = await response.json();
				if (data) {
					setLottieData(data);
				} else {
					const fallback = await import('../../../public/price.json');
					setLottieData(fallback);
				}
			} catch (error) {
				console.error('Error loading Lottie animation:', error);
				const fallback = await import('../../../public/price.json');
				setLottieData(fallback);
			}
		}

		if (!lottieData) {
			fetchAnimation();
		}
	}, []);

	// Accessibility fix: remove focusable elements inside Lottie container
	useEffect(() => {
		const container = document.getElementById('lottie-container');
		if (container) {
			const interactiveEls = container.querySelectorAll('[tabindex], [role="button"]');
			interactiveEls.forEach((el) => {
				el.removeAttribute('tabindex');
				el.removeAttribute('role');
			});
		}
	}, [lottieData]);

	if (!lottieData) {
		return <Skeleton className="h-64 w-full rounded-lg" />;
	}

	return (
		<div className="w-full space-y-6 px-4 py-6">
			{/* Highlight + Animation Section */}
			<div
				className="w-full rounded-lg pt-6"
				style={{
					background:
						'radial-gradient(50% 50% at 50% 50%, #A4FFFF 0%, #FFFFFF 100%)',
				}}>
				<h2 className="font-urbanist px-4 text-center text-2xl leading-snug font-bold text-[#252E49] md:text-3xl">
					{title}{' '}
					<span className="bg-yellow-300 px-1">
						{highlighted_title1}
					</span>{' '}
					<span className="bg-yellow-300 px-1">
						{highlighted_title2}
					</span>
				</h2>

				<div className="mt-4 flex w-full justify-center" ref={ref}>
					{/* Removed aria-hidden and added id for post-DOM cleanup */}
					<div
						id="lottie-container"
						className="mt-10 h-[80px] w-full max-w-lg overflow-hidden rounded-xl"
					>
						<Lottie
							options={defaultOptions}
							height={80}
							width="100%"
							isStopped={!inView}
							isClickToPauseDisabled
						/>
					</div>
				</div>

				<p className="font-urbanist pt-2 pr-4 text-right text-sm font-medium text-[#252E49]">
					{price_per_tag}
				</p>
			</div>

			{/* Features Section */}
			<FeaturesSection features={features} title={features_title} />
		</div>
	);
};

export default React.memo(FeaturePromoCard);
