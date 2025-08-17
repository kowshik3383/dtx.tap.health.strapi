'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useInView } from 'react-intersection-observer';

// Dynamically import Lottie to avoid document/window errors on SSR
const Lottie = dynamic(() => import('react-lottie'), { ssr: false });

// Import the animation JSON
import priceAnimation from '../../../public/price.json';

const PriceHighlightSection = () => {
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 1 });

	const defaultOptions = {
		loop: false,
		autoplay: false,
		animationData: priceAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div
			className="w-full rounded-lg pt-6"
			style={{
				background:
					'radial-gradient(50% 50% at 50% 50%, #A4FFFF 0%, #FFFFFF 100%)',
			}}>
			<h2 className="font-urbanist px-4 text-center text-2xl leading-snug font-bold text-[#252E49] md:text-3xl">
				Get smart diabetes care for the price of a{' '}
				<span className="bg-yellow-300 px-1">monthly newspaper</span>{' '}
				<span className="bg-yellow-300 px-1">subscription.</span>
			</h2>

			<div className="mt-4 flex w-full justify-center" ref={ref}>
				<div className="mt-10 h-[80px] w-full max-w-lg overflow-hidden rounded-xl">
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
				per month on annual plan
			</p>
		</div>
	);
};

export default PriceHighlightSection;
