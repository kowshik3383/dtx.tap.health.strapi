'use client';

import Image from 'next/image';
import { useState } from 'react';
import { components } from '@/types/strapi';

type DoctorStory = components['schemas']['ItemsUserstoryCardComponent'];

interface UserStoryCardProps extends DoctorStory {
	onVideoPlay: () => void;
	isActive: boolean;
	isScrolling: boolean;
}

const UserStoryCard = ({
	name,
	credentials,
	thumbnail,
	thumbnail_url,
	onVideoPlay,
	isActive,
	isScrolling,
}: UserStoryCardProps) => {
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [imageError, setImageError] = useState(false);

	const imageSrc = thumbnail?.url || thumbnail_url || '';

	return (
		<div
			className={`mb-6 ml-2 w-[300px] flex-shrink-0 rounded-2xl bg-white shadow-md transition-all duration-300 ${
				isActive ? 'h-[460px]' : 'h-[390px]'
			} ${isActive && isScrolling ? 'scale-[1.03]' : 'scale-100'}`}>
			<div
				className={`relative w-full cursor-pointer overflow-hidden rounded-t-2xl transition-all duration-300 ${
					isActive ? 'h-[400px]' : 'h-[320px]'
				}`}
				onClick={onVideoPlay}>
				{isImageLoading && (
					<div className="absolute inset-0 animate-pulse rounded-t-2xl bg-gray-200" />
				)}

				{imageError || !imageSrc ? (
					<div className="absolute inset-0 flex items-center justify-center rounded-t-2xl bg-gray-100">
						<span className="text-sm text-gray-500">
							Image not available
						</span>
					</div>
				) : (
					<Image
						src={imageSrc}
						alt={`Thumbnail of ${name}'s testimonial`}
						fill
						className={`object-fill px-3 pt-3 transition-opacity duration-300 ${
							isImageLoading ? 'opacity-0' : 'opacity-100'
						}`}
						onLoadingComplete={() => setIsImageLoading(false)}
						onError={() => {
							setIsImageLoading(false);
							setImageError(true);
						}}
					/>
				)}
			</div>

			<div className="px-4 pt-2 pb-3">
				<h3 className="text-left text-base font-semibold text-[#1E293B]">
					{name}
				</h3>
				<p className="text-left text-xs text-gray-500">
					{credentials}
				</p>
			</div>
		</div>
	);
};

export default UserStoryCard;
