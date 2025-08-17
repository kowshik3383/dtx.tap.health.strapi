'use client';

import Hls from 'hls.js';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { components } from '@/types/strapi';
const YourDay = ({
	image,
	video_url,
	video,
}: components['schemas']['DynamicZoneYourDayComponent']) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isVideoReady, setIsVideoReady] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		const src = video_url ||
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/timeline-mobile/master.m3u8';

		if (video) {
			if (video.canPlayType('application/vnd.apple.mpegurl')) {
				// Safari native HLS
				video.src = src;
			} else if (Hls.isSupported()) {
				// hls.js for other browsers
				const hls = new Hls();
				hls.loadSource(src);
				hls.attachMedia(video);

				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					video.play().catch(err => {
						console.warn('Autoplay blocked:', err);
					});
				});

				return () => {
					hls.destroy();
				};
			}
		}
	}, []);

	return (
		<div className="relative h-screen w-full overflow-hidden bg-sky-200">
			{/* Fallback image */}
			<div
				className={`absolute inset-0 z-50 transition-opacity duration-500 ease-in-out ${
					isVideoReady ? 'opacity-0' : 'opacity-100'
				}`}>
				{image && image.url && (
					<Image
						src="/assets/v4/player.svg"
						alt="Loading video preview"
						fill
						className="object-cover"
						priority
					/>
				)}
			</div>

			{/* Direct <video> with controls */}
			<video
				ref={videoRef}
				className="absolute inset-0 h-full w-full object-contain "
				autoPlay
				muted
				playsInline
				controls
				onCanPlay={() => setIsVideoReady(true)}
			/>
		</div>
	);
};

export default YourDay;
