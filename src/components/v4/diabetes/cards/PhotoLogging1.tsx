/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { components } from '@/types/strapi';
import MealAnimation from '../../../../../public/food_scanning.json';
import { set } from 'zod';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
async function lottiejson(url: string): Promise<object | null> {
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error('Invalid response');
		// Assert the result as object (if you are sure your API returns a plain object)
		return (await response.json()) as object;
	} catch (e) {
		if (process.env.NODE_ENV === 'development') {
			console.error('Error loading Lottie JSON:', e);
		}
		return null;
	}
}
const PhotoLogging1 = ({
	title,
	lottie_animation,
}: components['schemas']['DynamicZoneDataLogging1Component']) => {
	const [lottieData, setLottieData] = useState<object | null>(null);
	useEffect(() => {
		async function fetchAnimation(lottie_url: string) {
			try {
				const data = await lottiejson(lottie_url);
				if (data) {
					setLottieData(data);
				}
				console.log('Lottie animation loaded successfully');
			} catch (error) {
				console.error('Failed to load Lottie animation:', error);
			}
		}
		if (lottie_animation?.url) {
			fetchAnimation(lottie_animation.url || '')
				.then()
				.catch(error => {
					console.error('Error fetching Lottie animation:', error);
				});
		}
	}, []);
	return (
		<div className="font-urbanist mb-5 flex w-full flex-col overflow-hidden rounded-2xl bg-[linear-gradient(128.31deg,_#FFFFFF_14.41%,_#C4EDFD_120.26%)] px-5">
			{/* Heading */}
			<div className="flex w-full flex-col items-center gap-2 pt-6 text-center">
				<h2 className="text-[20px] font-semibold text-black">
					{title}
				</h2>
			</div>

			{/* Lottie Animation */}
			<div className="flex h-32 w-full justify-center">
				<Lottie
					animationData={lottieData}
					loop
					className="!mb-0 !block h-44 w-44 !pb-0 !leading-none md:h-56 md:w-56"
				/>
			</div>
		</div>
	);
};

export default PhotoLogging1;
