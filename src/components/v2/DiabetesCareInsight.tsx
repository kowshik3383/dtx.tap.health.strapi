/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as Sentry from '@sentry/nextjs';
import { Maximize, Volume2, VolumeX } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import type ReactPlayer from 'react-player';
import { components } from '@/types/strapi';
import VideoPlayer from './diabetologists/VideoPlayer';

const DiabetesCareInsight = ({
	title,
	description,
	video,
	video_url,
}: components['schemas']['DynamicZoneTransformVideoComponent']) => {
	const playerRef = useRef<ReactPlayer | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
	const [isMuted, setIsMuted] = useState(false); // 🔄 Start unmuted
	const [isPlaying, setIsPlaying] = useState(true);
	const pathname = usePathname();

	const setMute = (mute: boolean) => {
		const videoEl = containerRef.current?.querySelector('video');
		if (videoEl) videoEl.muted = mute;
		setIsMuted(mute);
	};

	const toggleMute = () => setMute(!isMuted);

	const handleFullscreen = async () => {
		const video = containerRef.current?.querySelector('video') as HTMLVideoElement | null;
		if (!video) return;

		try {
			fullscreenVideoRef.current = video;
			await video.requestFullscreen();
			setTimeout(async () => {
				await video.play();
				video.muted = false;
				setIsMuted(false);
				setIsPlaying(true);
			}, 200);
		} catch (error) {
			console.error('Fullscreen or autoplay failed:', error);
			Sentry.captureException(error, {
				tags: {
					component: 'DiabetesCareInsight',
					action: 'handleFullscreenChange',
				},
			});
		}
	};

	const isAnyElementFullscreen = (): boolean => {
		return Boolean(
			document.fullscreenElement ||
			(document as any).webkitFullscreenElement ||
			(document as any).mozFullScreenElement ||
			(document as any).msFullscreenElement,
		);
	};

	// 🖥 Listen for exiting fullscreen → Mute video
	useEffect(() => {
		const handleFullscreenChange = () => {
			const video = containerRef.current?.querySelector('video');
			// Only act if THIS component's video was the one that entered fullscreen
			if (!fullscreenVideoRef.current || fullscreenVideoRef.current !== video) return;

			if (!isAnyElementFullscreen()) {
				setMute(false);
				if (video) {
					video.muted = false;
					video.play().catch(err => {
						console.warn("Playback failed after fullscreen exit:", err);
					});
				}
				setIsPlaying(true);
				fullscreenVideoRef.current = null; // Clear ref after exit
			}
		};

		const events = [
			'fullscreenchange',
			'webkitfullscreenchange',
			'mozfullscreenchange',
			'MSFullscreenChange',
		];

		events.forEach(event =>
			document.addEventListener(event, handleFullscreenChange)
		);

		return () => {
			events.forEach(event =>
				document.removeEventListener(event, handleFullscreenChange)
			);
		};
	}, []);


	// 🎯 Pause video when not in view, play with audio when in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const video = containerRef.current?.querySelector('video');
					if (!video) return;

					if (entry.isIntersecting) {
						setIsPlaying(true);
					} else {
						setIsPlaying(false);
					}

				});
			},
			{ threshold: 0.25 }
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
			observer.disconnect();
		};
	}, [isMuted]);

	// ✅ Try playing with audio after mount
	useEffect(() => {
		const video = containerRef.current?.querySelector('video');
		if (video) {

			video.muted = false;
			const playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						setIsMuted(false);
						setIsPlaying(true);
					})
					.catch(err => {
						console.warn('Autoplay with sound failed:', err);
						video.muted = true;
						setIsMuted(true);
					});
			}
		}
	}, []);

	return (
		<section className="w-full bg-white px-4 py-10">
			<div className="mx-auto max-w-5xl space-y-6 text-center">
				{pathname === '/v2' ? (
					<>
						<h1 className="line-clamp-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
							{title}
						</h1>
						<p className="line-clamp-4 text-[14px] leading-relaxed text-gray-700 sm:text-lg">
							{description}
						</p>
					</>
				) : (
					<div className="flex w-full flex-col items-start gap-3">
						<div className="w-full">
							<h2 className="font-urbanist text-center text-3xl font-bold text-neutral-800">
								{title}
								<span className="text-blue-600">
									{description}
								</span>
							</h2>
						</div>
					</div>
				)}
				{video_url && (
					<div
						ref={containerRef}
						className="mt-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
						<VideoPlayer
							ref={playerRef}
							url={video_url}
							muted={isMuted}
							playing={isPlaying}
						/>
					</div>
				)}
				{!video_url && video?.url && (
					<div
						ref={containerRef}
						className="mt-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg">
						<VideoPlayer
							ref={playerRef}
							url={video.url}
							muted={isMuted}
							playing={isPlaying}
						/>
					</div>
				)}

				<div className="mt-4 flex items-center justify-center gap-6">
					<button
						onClick={toggleMute}
						className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600"
					>
						{isMuted ? (
							<>
								<VolumeX className="mb-1 h-6 w-6" />
								<span>Unmute</span>
							</>
						) : (
							<>
								<Volume2 className="mb-1 h-6 w-6" />
								<span>Mute</span>
							</>
						)}
					</button>

					<button
						onClick={handleFullscreen}
						className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600"
					>
						<Maximize className="mb-1 h-6 w-6" />
						<span>Fullscreen</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default DiabetesCareInsight;
