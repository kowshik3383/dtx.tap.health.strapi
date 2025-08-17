'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { components } from '@/types/strapi';
import ResultVideoCard from './ResultVideoCard';

const FastResult1 = ({
	title,
	description,
	results,
}: components['schemas']['DynamicZoneFastResultV2Component']) => {
	const pathname = usePathname();
	const [isDesktop, setIsDesktop] = useState(false);

	// Track screen size
	useEffect(() => {
		const checkScreen = () => {
			setIsDesktop(window.innerWidth >= 1024);
		};
		checkScreen();
		window.addEventListener('resize', checkScreen);
		return () => window.removeEventListener('resize', checkScreen);
	}, []);

	// Stack only if it's v2o or v2o1 and NOT desktop
	const isStackedLayout = (pathname === '/v2o' || pathname === '/v2o1') && !isDesktop;

	return (
		<div className="bg-white py-10">
			<h1 className="text-center text-3xl font-bold text-black">{title}</h1>
			<p className="mb-8 text-center text-xl font-normal text-black">{description}</p>

			{isStackedLayout ? (
				// ✅ STACKED one-by-one layout (mobile only for /v2o & /v2o1)
				<div className="flex flex-col items-center gap-6 px-4">
					{results?.map((result, index) => (
						<div key={index} className="w-full max-w-md">
							{result.image?.url && result.video?.url && (
								<ResultVideoCard
									imageSrc={result.image.url}
									videoSrc={result.video.url}
									title={result.title || `Result ${index + 1}`}
								/>
							)}
						</div>
					))}
				</div>
			) : (
				// ✅ SWIPER layout for all other cases including desktop view of /v2o /v2o1
				<div className="px-4 lg:flex lg:justify-center">
					<Swiper
						spaceBetween={16}
						slidesPerView="auto"
						className="scrollbar-hide !overflow-visible px-4"
					>
						{results?.map((result, index) => (
							<SwiperSlide
								key={index}
								className="!w-[300px] md:!w-[320px] lg:!w-[340px]"
							>
								{result.image?.url && result.video?.url && (
									<ResultVideoCard
										imageSrc={result.image.url}
										videoSrc={result.video.url}
										title={result.title || `Result ${index + 1}`}
									/>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
		</div>
	);
};

export default FastResult1;
