/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as Sentry from '@sentry/nextjs';
import { Maximize, Volume2, VolumeX } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import type ReactPlayer from 'react-player';
import { components } from '@/types/strapi'; // Make sure this path is correct
import VideoPlayer from './VideoPlayer';

type DiabetologistProps =
	components['schemas']['DynamicZoneDiabetologistComponent'];

const DiabetologistInsights = ({
	title_line1_part1,
	highlighted_title,
	title_line1_part2,
	title_line2,
	video = {},
	video_url,
}: DiabetologistProps) => {
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
		const video = containerRef.current?.querySelector(
			'video',
		) as HTMLVideoElement | null;
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
			if (
				!fullscreenVideoRef.current ||
				fullscreenVideoRef.current !== video
			)
				return;

			if (!isAnyElementFullscreen()) {
				setMute(false);
				if (video) {
					video.muted = false;
					video.play().catch(err => {
						console.warn(
							'Playback failed after fullscreen exit:',
							err,
						);
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
			document.addEventListener(event, handleFullscreenChange),
		);

		return () => {
			events.forEach(event =>
				document.removeEventListener(event, handleFullscreenChange),
			);
		};
	}, []);

	// 🎯 Pause video when not in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setIsPlaying(true);
					} else {
						setIsPlaying(false);
					}
				});
			},
			{ threshold: 0.25 }, // Trigger when 25% of the video is visible
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
	}, []);

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
				{/* Title Section */}
				{pathname === '/v2' ? (
					<h1 className="text-center text-[20px] leading-snug font-bold text-gray-900 sm:text-xl">
						{title_line1_part1}{' '}
						<span className="font-bold text-[#2563EB]">
							{highlighted_title}
						</span>{' '}
						{title_line1_part2}
						<br className="hidden sm:inline" />
						{title_line2 && <div>{title_line2}</div>}
					</h1>
				) : (
					<h1 className="text-center text-3xl leading-snug font-bold text-gray-900">
						{title_line1_part1}{' '}
						<span className="font-bold text-[#2563EB]">
							{highlighted_title}
						</span>{' '}
						{title_line1_part2}
						<br className="hidden sm:inline" />
						{title_line2 && <div>{title_line2}</div>}
					</h1>
				)}

				<div
					ref={containerRef}
					className="mt-8 w-full overflow-hidden rounded-xl shadow-lg">
					{video_url && (
						<VideoPlayer
							ref={playerRef}
							url={video_url}
							muted={isMuted}
							playing={isPlaying}
						/>
					)}
					{!video_url && video?.file?.url && (
						<VideoPlayer
							ref={playerRef}
							url={video.file.url}
							muted={isMuted}
							playing={isPlaying}
						/>
					)}
				</div>

				<div className="mt-4 flex items-center justify-center gap-6">
					<button
						onClick={toggleMute}
						className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
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
						className="flex flex-col items-center text-sm text-gray-700 hover:text-blue-600">
						<Maximize className="mb-1 h-6 w-6" />
						<span>Fullscreen</span>
					</button>
				</div>
			</div>
		</section>
	);
};

export default DiabetologistInsights;
