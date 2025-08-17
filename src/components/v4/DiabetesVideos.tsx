'use client';

import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';
import { components } from '@/types/strapi';

type VideoData = {
	videoSrc: string;
	boldText: string;
	text: string;
};

const videos: VideoData[] = [
	{
		videoSrc:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/biryani-video/master.m3u8',
		boldText: 'Diet plan is tasty & healthy.',
		text: 'We make sure your',
	},
	{
		videoSrc:
			'https://qbhnqxwevufrfkvrucyu.supabase.co/storage/v1/object/public/static.tap.health/assets/dtech25_workout.mp4',
		boldText: 'Home based exercises.',
		text: 'Simple and easy',
	},
	{
		videoSrc:
			'https://rcbnmverfijrkbjyotmp.supabase.co/storage/v1/object/public/asianpaints//2228889_Exercising_Health_1280x720.mp4',
		boldText: 'Daily activity tracking .',
		text: 'with the device you already use',
	},
];

const DiabetesVideos: React.FC = ({
	title_line1,
	title_line2,
	title_line3,
	cards,
}: components['schemas']['DynamicZoneDiabetesvideoComponent']) => {
	return (
		<section className="flex flex-col items-center gap-6 bg-white px-4 py-6">
			<h2 className="text-center text-xl font-bold text-[#1A73E8]">
				{title_line1}
				{title_line2 && (
					<>
						<br />
						{title_line2}
					</>
				)}
				{title_line3 && (
					<>
						<br />
						{title_line3}
					</>
				)}
			</h2>

			<div className="flex flex-col gap-6">
				{cards?.map((video, index) => {
					const videoRef = useRef<HTMLVideoElement | null>(null);

					useEffect(() => {
						let hls: Hls | null = null;

						if (videoRef.current) {
							const isHLS = video.video_url?.endsWith('.m3u8');

							if (isHLS && Hls.isSupported()) {
								hls = new Hls();
								hls.loadSource(video.video_url ?? '');
								hls.attachMedia(videoRef.current);
								hls.on(Hls.Events.ERROR, (_, data) => {
									console.error('HLS error:', data);
								});
							} else {
								videoRef.current.src = video.video_url || '';
							}
						}

						return () => {
							if (hls) {
								hls.destroy();
							}
						};
					}, [video.video_url]);

					return (
						<div key={index} className="relative h-64 w-72">
							{/* Gradient background behind text */}
							<div className="absolute top-[148px] left-0 h-28 w-72 rounded-xl border border-blue-300 bg-gradient-to-b from-blue-100 via-white to-blue-100"></div>

							{/* Text */}
							<div className="absolute top-[192px] w-full px-4 text-center">
								<span
									className={`text-base leading-normal ${
										video.is_text1_bold
											? 'font-bold'
											: 'font-medium'
									} text-slate-800`}>
									{video.text1}
									<br />
								</span>
								<span
									className={`text-base leading-normal ${
										video.is_text2_bold
											? 'font-bold'
											: 'font-medium'
									} text-slate-800`}>
									{video.text2}
								</span>
							</div>

							{/* Video container */}
							<div className="absolute top-0 left-[20px] h-44 w-60 overflow-hidden rounded-[20px] shadow-[-10px_10px_20px_0px_rgba(61,73,102,0.4)] outline outline-offset-[-2px] outline-blue-100">
								<video
									ref={videoRef}
									muted
									autoPlay
									loop
									playsInline
									className="absolute h-full w-full object-cover"
								/>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default DiabetesVideos;
