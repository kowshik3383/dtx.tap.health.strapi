'use client';

import Hls from 'hls.js';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

interface ResultVideoCardProps {
	imageSrc: string;
	videoSrc: string;
	title: string;
}

const ResultVideoCard = ({
	imageSrc,
	videoSrc,
	title,
}: ResultVideoCardProps) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (!videoRef.current) return;

		// Check if video is HLS
		const isHls = videoSrc.endsWith('.m3u8');

		if (isHls && Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(videoSrc);
			hls.attachMedia(videoRef.current);

			return () => {
				hls.destroy();
			};
		} else {
			// Fallback for Safari
			videoRef.current.src = videoSrc;
		}
	}, [videoSrc]);

	return (
		<div className="flex w-full flex-col overflow-hidden rounded-[32px] bg-[#E5F9FF] shadow-md">
			<div className="flex items-center gap-4 p-3">
				<div className="relative h-[52px] w-[52px] overflow-hidden rounded-full">
					<Image
						src={imageSrc}
						alt="Result"
						fill
						className="object-cover"
						sizes="52px"
						priority
					/>
				</div>
				<h2 className="text-[20px] font-semibold text-black">
					{title}
				</h2>
			</div>

			<div className="" role="video">
				<video
					ref={videoRef}
					className="h-[275px] w-full rounded-[20px] object-cover shadow-xl"
					autoPlay
					loop
					muted
					playsInline
					controls={false}
				/>
			</div>
		</div>
	);
};

export default ResultVideoCard;
