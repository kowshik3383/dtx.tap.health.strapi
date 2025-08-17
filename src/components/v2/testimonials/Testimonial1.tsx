'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useSwipeable } from 'react-swipeable';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

export type Testimonial = components['schemas']['TestimonialV2'];

interface Testimonial1Props {
	tag?: string;
	title_line_1?: string;
	title_line_2?: string;
	testimonial_v_2s?: Testimonial[];
	show_cover_image: boolean;
}

const TestimonialCard = React.memo(function Card({
	testimonial,
	isMobile,
	cardWidth,
	show_cover_image,
}: {
	testimonial: Testimonial;
	isMobile: boolean;
	cardWidth: number;
	show_cover_image: boolean;
}) {
	const imageUrl = optimisedImageUrl(testimonial.image);
	const avatarUrl = optimisedImageUrl(testimonial.avatar);
	const height_ = show_cover_image ? 'h-[270px]' : 'h-[320px]';
	return (
		<div
			className="flex-shrink-0 overflow-hidden rounded-2xl bg-white shadow-none"
			style={{ width: isMobile ? `${cardWidth}px` : '320px' }}>
			{show_cover_image && imageUrl && (
				<Image
					src={imageUrl}
					alt={`Image for testimonial by ${testimonial.name}`}
					width={300}
					height={180}
					className="h-auto w-full object-cover"
					priority
				/>
			)}
			<div
				className={`flex ${height_} flex-col justify-between overflow-hidden`}>
				{show_cover_image && (
					<div className="mb-2 flex justify-center">
						<Image
							src="/assets/v2/comma.svg"
							alt="Quote Icon"
							width={40}
							height={40}
						/>
					</div>
				)}
				{show_cover_image ? (
					<h3 className="text-md mb-1 line-clamp-2 px-7 font-semibold text-gray-900">
						{testimonial.quote}
					</h3>
				) : (
					<h3 className="mb-3 flex items-center justify-center gap-1 px-6 pt-5 text-[22px] font-extrabold text-gray-900">
						<span className="relative inline-block text-center">
							{testimonial.quote}
							<span className="ml-1 inline-block align-middle">
								<Image
									src="/assets/v2/comma.svg"
									alt="Quote Icon"
									width={20}
									height={20}
								/>
							</span>
						</span>
					</h3>
				)}

				<p className="line-clamp-3 flex-grow px-7 pt-3 text-xs text-gray-600">
					{testimonial.description}
				</p>
				<div className="my-1 flex justify-center">
					{Array.from({ length: testimonial.rating ?? 0 }).map(
						(_, i) => (
							<Star
								key={i}
								className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400"
							/>
						),
					)}
				</div>
				<div className="mb-5 text-center">
					{avatarUrl && (
						<Image
							src={avatarUrl}
							alt={testimonial.name || 'name'}
							width={36}
							height={36}
							className="mx-auto mb-0.5 rounded-full object-cover"
						/>
					)}
					<div className="text-xs font-medium text-gray-900">
						{testimonial.name}
					</div>
					<div className="text-[10px] text-gray-500">
						{testimonial.age} years ({testimonial.plan} plan)
					</div>
				</div>
			</div>
		</div>
	);
});

const Testimonial1 = ({
	tag,
	title_line_1,
	title_line_2,
	testimonial_v_2s = [],
	show_cover_image,
}: Testimonial1Props) => {
	const [isMobile, setIsMobile] = useState(false);
	const [containerWidth, setContainerWidth] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const checkSize = () => {
			setIsMobile(window.innerWidth < 768);
			setContainerWidth(window.innerWidth);
		};

		const debouncedCheckSize = () => {
			if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
			resizeTimeout.current = setTimeout(checkSize, 100);
		};

		checkSize();
		window.addEventListener('resize', debouncedCheckSize);
		return () => {
			window.removeEventListener('resize', debouncedCheckSize);
			if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
		};
	}, []);

	const gap = useMemo(() => (isMobile ? 16 : 32), [isMobile]);
	const visiblePercent = 0.85;
	const cardWidth = useMemo(
		() => (isMobile ? containerWidth * visiblePercent : 320),
		[isMobile, containerWidth, visiblePercent],
	);
	const slideWidth = useMemo(() => cardWidth + gap, [cardWidth, gap]);
	const translateX = useMemo(
		() => -(currentIndex * slideWidth),
		[currentIndex, slideWidth],
	);

	const nextSlide = useCallback(() => {
		setCurrentIndex(prev =>
			testimonial_v_2s.length ? (prev + 1) % testimonial_v_2s.length : 0,
		);
	}, [testimonial_v_2s.length]);

	const prevSlide = useCallback(() => {
		setCurrentIndex(prev =>
			testimonial_v_2s.length
				? (prev - 1 + testimonial_v_2s.length) % testimonial_v_2s.length
				: 0,
		);
	}, [testimonial_v_2s.length]);

	const onSwipedLeft = useCallback(() => {
		nextSlide();
		trackFacebookPixelEvent('testimonial_swipe', {
			direction: 'left',
			currentIndex,
			timestamp: new Date().toISOString(),
			value: 50,
			currency: 'INR',
		});
		registerIntentEvent('testimonial_swipe');
	}, [nextSlide, currentIndex]);

	const onSwipedRight = useCallback(() => {
		prevSlide();
		trackFacebookPixelEvent('testimonial_swipe', {
			direction: 'right',
			currentIndex,
			timestamp: new Date().toISOString(),
			value: 50,
			currency: 'INR',
		});
		registerIntentEvent('testimonial_swipe');
	}, [prevSlide, currentIndex]);

	const handlers = useSwipeable({
		onSwipedLeft,
		onSwipedRight,
		trackMouse: true,
	});

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			if (e.key === 'ArrowLeft') prevSlide();
			if (e.key === 'ArrowRight') nextSlide();
		},
		[prevSlide, nextSlide],
	);

	if (!testimonial_v_2s.length) return null;

	return (
		<div className="bg-[#E5F9FF]">
			<div className="container py-12">
				<div className="mb-10 text-center">
					{tag && (
						<div className="inline-block rounded-md border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-[#2563EB]">
							{tag}
						</div>
					)}
					<h1 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
						{title_line_1}
						<br /> {title_line_2}
					</h1>
				</div>

				<div
					className="relative mx-auto w-full max-w-6xl overflow-x-visible px-4"
					tabIndex={0}
					aria-label="Testimonial carousel"
					onKeyDown={handleKeyDown}
					{...handlers}>
					<div
						className="flex transition-transform duration-700 ease-in-out"
						style={{
							transform: `translateX(${translateX}px)`,
							gap: `${gap}px`,
							width: 'max-content',
						}}>
						{testimonial_v_2s.map(testimonial => (
							<TestimonialCard
								key={testimonial.id}
								testimonial={testimonial}
								isMobile={isMobile}
								cardWidth={cardWidth}
								show_cover_image={show_cover_image}
							/>
						))}
					</div>
				</div>

				<div className="mt-8 flex justify-center space-x-4">
					{testimonial_v_2s.map((_, index) => (
						<button
							key={index}
							className={`rounded-full transition-all duration-300 ${
								index === currentIndex
									? 'h-2 w-6 bg-[#2563EB] md:w-8'
									: 'h-2 w-2 bg-[#D9D9D9]'
							}`}
							aria-label={`Go to testimonial ${index + 1}`}
							aria-current={index === currentIndex}
							onClick={() => setCurrentIndex(index)}
							type="button"
							tabIndex={0}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default React.memo(Testimonial1);
