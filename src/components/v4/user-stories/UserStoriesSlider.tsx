'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { components } from '@/types/strapi';
import UserStoryCard from './UserStoryCard';
import VideoModal from './VideoModal';

const UserStoriesSlider = ({
	title,
	highlighted_title_line1,
	highlighted_title_line2,
	stories,
}: components['schemas']['DynamicZoneDoctorStoriesComponent']) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		align: 'start',
		dragFree: false, // Snap quickly
	});

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isVideoOpen, setIsVideoOpen] = useState(false);
	const [currentVideoUrl, setCurrentVideoUrl] = useState('');
	const [isScrolling, setIsScrolling] = useState(false);

	const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect();
		emblaApi.on('select', onSelect);

		const handleScroll = () => {
			setIsScrolling(true);

			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}

			scrollTimeoutRef.current = setTimeout(() => {
				setIsScrolling(false);
			}, 150);
		};

		emblaApi.on('scroll', handleScroll);
	}, [emblaApi, onSelect]);

	const openVideo = (videoUrl: string) => {
		setCurrentVideoUrl(videoUrl);
		setIsVideoOpen(true);
	};

	const closeVideo = () => {
		setIsVideoOpen(false);
		setCurrentVideoUrl('');
	};

	return (
		<div className="bg-white">
			<div
				className="font-urbanist flex h-[650px] flex-col items-center gap-4
					bg-[radial-gradient(ellipse_87.74%_126.07%_at_46.40%_-6.78%,_rgba(188,_149,_255,_0.70)_0%,_rgba(166,_203,_255,_0.70)_28%,_rgba(209,_250,_229,_0.70)_50%,_rgba(242,_245,_249,_0.70)_100%)]
					py-6 text-center">
				<p className="text-[16px] font-medium tracking-wide text-slate-600">
					{title || 'Smart Technology'}
				</p>
				<h3 className="line-clamp-2 text-[24px] leading-snug font-bold text-blue-700">
					{highlighted_title_line1 || 'Trusted & Recommended'}
					<br />
					{highlighted_title_line2 || 'by Doctors'}
				</h3>

				<div
					ref={emblaRef}
					className="relative mx-auto w-full max-w-[99%] overflow-hidden">
					<div className="flex gap-4 pr-[10%]">
						{stories?.map((story, index) => (
							<div
								key={story.id}
								className="flex h-[500px] flex-shrink-0 basis-[80%] items-center sm:basis-[60%] md:basis-[55%] lg:basis-[45%]">
								<UserStoryCard
									{...story}
									isActive={index === selectedIndex}
									isScrolling={isScrolling}
									onVideoPlay={() =>
										openVideo(
											story.video_url ||
												story?.video?.url ||
												''
										)
									}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			<VideoModal
				videoUrl={currentVideoUrl}
				isOpen={isVideoOpen}
				onClose={closeVideo}
			/>
		</div>
	);
};

export default UserStoriesSlider;
