'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { components } from '@/types/strapi';

import { userStories } from './userData';
import UserStoryCard from './UserStoryCard';
import VideoModal from './VideoModal';

export type TransformationStory = components['schemas']['TransformationStory'];

export interface UserStory extends TransformationStory {
	title_line_1: string;
	title_line_2: string;
	description: string;
	transformation_stories: TransformationStory[];
}

const UserStoriesSlider = ({
	title_line_1,
	title_line_2,
	description,
	transformation_stories,
}: UserStory) => {
	const [emblaRef] = useEmblaCarousel({
		loop: false,
		align: 'start',
		dragFree: false,  // CHANGE HERE: disable free scroll for snapping
		containScroll: 'trimSnaps',
		skipSnaps: false,
	});

	const [isVideoOpen, setIsVideoOpen] = useState(false);
	const [currentVideoUrl, setCurrentVideoUrl] = useState('');
	const pathname = usePathname();

	const openVideo = (videoUrl: string) => {
		setCurrentVideoUrl(videoUrl);
		setIsVideoOpen(true);
	};

	const closeVideo = () => {
		setIsVideoOpen(false);
		setCurrentVideoUrl('');
	};

	// Check if current path includes v6, v7, or v8
	const isV6toV8 = ['/v6', '/v7', '/v8'].some(p => pathname.includes(p));

	// Conditionally sort userStories
	const sortedUserStories = isV6toV8
		? [...userStories].sort((a, b) => a.id - b.id) // ascending: 1, 2, 3...
		: userStories;

	return (
		<div className="bg-[#F2F5F9] px-4 py-12">
			{['/v6', '/v7', '/v8'].some(v => pathname.includes(v)) ? (
				<div className="mb-4 flex w-full flex-col items-center gap-1">
					<div className="font-urbanist text-center text-2xl text-slate-900">
						<p className="font-extrabold">{title_line_1}</p>
						<p className="font-bold">{title_line_2}</p>
					</div>
					{/* <p className="text-center text-base font-medium text-slate-600 font-urbanist">
						on their reversal journey
					</p> */}
				</div>
			) : (
				<h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
					{title_line_1} <br />
					{title_line_2}
				</h2>
			)}


			<div className="relative mx-auto max-w-3xl">
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex gap-6">
						{transformation_stories?.map(
							(story: TransformationStory, index: number) => (
								<div
									key={story.id}
									className="flex-shrink-0 basis-[85%] md:basis-[70%]">
									<UserStoryCard
										id={story.id}
										name={story.name}
										reduction_value={story.reduction_value}
										reductionType={story.reductionType}
										stars={story.stars}
										video_url={story.video_url}
										thumbnail_url={story.thumbnail_url}
										ind={index}
										onVideoPlay={() =>
											openVideo(story.video_url)
										}
									/>
								</div>
							),
						)}
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

export default React.memo(UserStoriesSlider);
