'use client';

import { Eye, EyeOff, Star } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { components } from '@/types/strapi';

const MAX_PREVIEW_CHARS = 180;

type UserTestimonialProps =
	components['schemas']['DynamicZoneUserTestimonialComponent'];
interface userTestimonials extends UserTestimonialProps {
	testimonials: components['schemas']['Testimonial'][];
}
const UserTestimonial = ({
	highlighted_title1,
	highlighted_title2,
	sub_title,
	testimonials,
	categories,
}: userTestimonials) => {
	const [activeCategory, setActiveCategory] = useState<
		'HbA1c' | 'Fastest Blood Sugar'
	>('Fastest Blood Sugar');
	const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

	const toggleExpanded = (index: number) => {
		setExpandedMap(prev => ({ ...prev, [index]: !prev[index] }));
	};

	// const categoryConfig = [
	// 	{ label: 'Fastest Blood Sugar', value: '100mg/dL' },
	// 	{ label: 'HbA1c', value: '0.5%' },
	// ];
	const pathname = usePathname();
	const isV6 = pathname === '/v6';
	const isV7 = pathname === '/v7';
	const isV8 = pathname === '/v8';

	return (
		<div className="font-urbanist flex w-full flex-col overflow-hidden bg-cyan-50 shadow-inner lg:block">
			{/* Header */}
			<div className="w-full lg:flex lg:justify-center">
				<div className="flex w-full flex-col items-center gap-5 px-5 py-6 sm:w-96">
					<h2 className="text-center text-[24px] leading-snug font-extrabold text-blue-600">
						{highlighted_title1}
						<br />
						{highlighted_title2}
					</h2>
					<p className="line-clamp-2 w-72 text-center text-[16px] font-semibold text-slate-800">
						{sub_title}
					</p>

					<div className="flex flex-wrap items-center justify-center gap-4">
						{!isV6 || isV7 || isV8 && (
							<div className="flex flex-wrap items-center justify-center gap-4">
								{categories?.map(({ label, value }) => {
									const isActive = activeCategory === label;

									return (
										<div
											key={label}
											onClick={() =>
												setActiveCategory(
													label as typeof activeCategory,
												)
											}
											className={`w-[160px] cursor-pointer rounded-xl p-2 transition-all duration-300 sm:w-[180px] ${
												isActive
													? 'bg-[#252E49] text-white'
													: 'border border-[#2563EB] bg-[#E6F0FF] text-[#0F172A]'
											}`}>
											<p
												className={`text-center text-xs font-bold sm:text-sm ${
													isActive
														? 'text-white'
														: 'text-[#0F172A]'
												}`}>
												{label}
											</p>

											<div className="mt-3 rounded-xl bg-white px-3 py-2 text-center shadow-sm">
												<p className="text-[12px] leading-none font-medium text-gray-600">
													Avg. Reduction
												</p>
												<p className="text-lg leading-snug font-extrabold text-black">
													{value}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Testimonials */}
			<div className="w-full py-6 pl-3">
				<Swiper
					spaceBetween={16}
					modules={[Pagination]}
					breakpoints={{
						0: { slidesPerView: 1.1 },
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1280: { slidesPerView: 4 },
					}}>
					{testimonials?.map((t, index) => {
						const isExpanded = expandedMap[index] ?? false;
						const shouldShowToggle =
							t.testimony?.length || 0 > MAX_PREVIEW_CHARS;
						const displayText = isExpanded
							? t.testimony
							: t.testimony?.slice(0, MAX_PREVIEW_CHARS) +
							  (shouldShowToggle ? '...' : '');

						const achievement =
							activeCategory === 'HbA1c'
								? t.hba1c
								: t.fastest_blood_sugar;

						return (
							<SwiperSlide key={t.id}>
								<div className="flex h-[330px] flex-col justify-between gap-3 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-800 p-3 px-5 shadow-md">
									{/* Header */}
									<div>
										<div className="rounded-2xl bg-white px-3 py-2 shadow outline outline-blue-600">
											<div className="flex items-center gap-1 text-xs font-semibold text-black">
												<Image
													src="/assets/v4/down-arrow.svg"
													alt="Down Arrow"
													width={10}
													height={10}
												/>
												{achievement}
											</div>
										</div>

										<div className="mt-3 flex items-start gap-3">
											{t.image && t.image.url && (
												<div className="relative h-20 w-20 overflow-hidden rounded-xl">
													<Image
														src={t.image.url}
														alt={
															t.image.name ||
															`image-${t.id}`
														}
														fill
														className="object-cover"
													/>
												</div>
											)}

											<div className="flex flex-1 flex-col gap-1.5">
												<div className="flex items-center gap-[1px]">
													{Array.from({
														length: t.rating || 5,
													}).map((_, i) => (
														<Star
															key={i}
															size={16}
															className={
																i < t.rating
																	? 'fill-yellow-400 text-yellow-400'
																	: 'text-white/30'
															}
														/>
													))}
												</div>

												<div>
													<p className="text-xl font-bold text-white">
														{t.name}
													</p>
													<p className="text-xs font-semibold text-white/60">
														{t.age}yr | {t.location}
													</p>
												</div>
											</div>
										</div>
									</div>

									{/* Testimony */}
									<div>
										<p className="text-lg leading-normal font-medium text-white">
											{displayText}
										</p>
										{shouldShowToggle && (
											<button
												onClick={() =>
													toggleExpanded(index)
												}
												className="mt-2 flex items-center gap-1 text-xs text-white underline">
												{isExpanded ? (
													<>
														<EyeOff className="h-4 w-4" />{' '}
														Hide
													</>
												) : (
													<>
														<Eye className="h-4 w-4" />{' '}
														See More
													</>
												)}
											</button>
										)}
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default UserTestimonial;
