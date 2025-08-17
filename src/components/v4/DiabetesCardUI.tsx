/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as Sentry from '@sentry/nextjs';
import { Maximize, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type ReactPlayer from 'react-player';
import VideoPlayer from '../v2/diabetologists/VideoPlayer';
import { components } from '@/types/strapi';

const DiabetesCardUI = ({
	title,
	highlighted_title1,
	highlighted_title2,
	video_url,
}: components['schemas']['DynamicZoneDiabetescarduiComponent']) => {
	const playerRef = useRef<ReactPlayer | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [isMuted, setIsMuted] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);

	const setMute = (mute: boolean) => {
		const video = containerRef.current?.querySelector('video');
		if (video) video.muted = mute;
		setIsMuted(mute);
	};

	const toggleMute = () => setMute(!isMuted);

	const handleFullscreen = async () => {
		const video = containerRef.current?.querySelector(
			'video',
		) as HTMLVideoElement | null;
		if (!video) return;

		try {
			await video.requestFullscreen();
			setTimeout(async () => {
				await video.play();
				video.muted = false;
				setIsMuted(false);
				setIsPlaying(true);
			}, 200);
		} catch (error) {
			Sentry.captureException(error);
		}
	};

	const isAnyElementFullscreen = () =>
		Boolean(
			document.fullscreenElement ||
				(document as any).webkitFullscreenElement ||
				(document as any).mozFullScreenElement ||
				(document as any).msFullscreenElement,
		);

	useEffect(() => {
		const handleFullscreenChange = () => {
			if (!isAnyElementFullscreen()) {
				setMute(false);
				const video = containerRef.current?.querySelector('video');
				if (video) {
					video.muted = false;
					video.play().catch(() => {});
				}
				setIsPlaying(true);
			}
		};

		const events = [
			'fullscreenchange',
			'webkitfullscreenchange',
			'mozfullscreenchange',
			'MSFullscreenChange',
		];
		events.forEach(event =>
			document.addEventListener(event, handleFullscreenChange),
		);
		return () =>
			events.forEach(event =>
				document.removeEventListener(event, handleFullscreenChange),
			);
	}, []);

	// Intersection Observer: play/pause based on visibility
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					setIsPlaying(entry.isIntersecting);
				});
			},
			{ threshold: 0.25 },
		);

		if (containerRef.current) observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, []);

	// Initial autoplay with muted fallback
	useEffect(() => {
		const video = containerRef.current?.querySelector('video');
		if (video) {
			video.muted = false;
			video
				.play()
				.then(() => {
					setIsMuted(false);
					setIsPlaying(true);
				})
				.catch(() => {
					video.muted = true;
					setIsMuted(true);
				});
		}
	}, []);

	return (
		<div className="relative flex h-[600px] w-screen justify-center overflow-hidden bg-white md:h-[600px] lg:h-[700px]">
			{/* Background Gradient */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_87.74%_126.07%_at_46.40%_-6.78%,_rgba(188,_149,_255,_0.70)_0%,_rgba(166,_203,_255,_0.70)_28%,_rgba(209,_250,_229,_0.70)_50%,_rgba(242,_245,_249,_0.70)_100%)] shadow-[inset_0px_4px_20px_0px_rgba(0,0,0,0.12)]"></div>

			{/* Content */}
			<div className="absolute flex w-96 flex-col items-center gap-3.5 pt-6 md:w-[500px] lg:w-[600px]">
				{/* Conditional Header */}

				{/* Header */}
				<div className="mb-8 flex flex-col items-center gap-1">
					<p className="text-sm font-medium text-gray-600">{title}</p>
					<h2 className="text-center text-2xl font-bold text-blue-600">
						{highlighted_title1} <br /> {highlighted_title2}
					</h2>
				</div>

				{/* Video Card */}
				<div className="flex w-full justify-center px-5 pb-4">
					<div className="flex h-full flex-col items-center rounded-[20px] bg-white px-3 shadow-lg">
						{/* Video */}
						{video_url && (
							<div
								ref={containerRef}
								className="-mt-12 h-96 w-72 overflow-hidden rounded-lg md:h-[500px] md:w-[350px]">
								<VideoPlayer
									ref={playerRef}
									url={
										video_url ||
										'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/mixed-testimonials-resized/master.m3u8'
									}
									muted={isMuted}
									playing={isPlaying}
									controls={false}
									className="!h-full !w-full"
								/>
							</div>
						)}

						{/* Controls */}
						<div className="mb-6 flex w-full justify-between px-14">
							<button
								onClick={toggleMute}
								className="flex flex-col items-center gap-2 text-xs font-medium text-slate-400 hover:text-blue-600">
								{isMuted ? (
									<VolumeX className="h-5 w-5" />
								) : (
									<Volume2 className="h-5 w-5" />
								)}
								<span>{isMuted ? 'Unmute' : 'Mute'}</span>
							</button>

							<button
								onClick={handleFullscreen}
								className="flex flex-col items-center gap-2 text-xs font-medium text-slate-400 hover:text-blue-600">
								<Maximize className="h-5 w-5" />
								<span>Full View</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DiabetesCardUI;
