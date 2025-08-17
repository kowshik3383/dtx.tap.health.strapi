'use client';

import dynamic from 'next/dynamic';
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { useInView } from 'react-intersection-observer';
import type { ReactPlayerProps } from 'react-player';
import type ReactPlayer from 'react-player';
import { trackFacebookPixelEvent } from '@/utils/analytics';

// Dynamically import ReactPlayer with SSR disabled
const DynamicReactPlayer = dynamic(() => import('react-player'), {
	ssr: false,
});

interface VideoPlayerProps extends ReactPlayerProps {
	className?: string;
}

const VideoPlayer = forwardRef<ReactPlayer, VideoPlayerProps>(
	(
		{
			url,
			playing = true,
			muted = true,
			loop = true,
			controls = true,
			className = '',
			...rest
		},
		ref,
	) => {
		const internalRef = useRef<ReactPlayer | null>(null);
		const { ref: inViewRef, inView } = useInView({
			threshold: 0.5,
			triggerOnce: false,
		});

		// Track if the event has already been sent
		const watchedRef = useRef(false);

		// Combine forwarded ref with inView observer
		const combinedRef = (node: HTMLElement | null) => {
			inViewRef(node);
		};

		useImperativeHandle(ref, () => internalRef.current as ReactPlayer);

		const videoAttrs = {
			muted,
			crossOrigin: 'anonymous' as const,
			playsInline: true,
		};

		useEffect(() => {
			const resetZoom = () => {
				const html = document.documentElement;
				const body = document.body;

				// Reset styles to prevent zoom persistence
				html.style.zoom = '1';
				body.style.zoom = '1';
				html.style.transform = 'none';
				body.style.transform = 'none';

				// Minor scroll nudge to trigger redraw
				setTimeout(() => {
					window.scrollTo(window.scrollX, window.scrollY - 1);
					window.scrollTo(window.scrollX, window.scrollY + 1);
				}, 100);
			};

			const events = [
				'orientationchange',
				'fullscreenchange',
				'webkitfullscreenchange',
				'mozfullscreenchange',
				'MSFullscreenChange',
			];

			events.forEach(event => window.addEventListener(event, resetZoom));

			window.addEventListener('resize', resetZoom);

			return () => {
				events.forEach(event =>
					window.removeEventListener(event, resetZoom),
				);
				window.removeEventListener('resize', resetZoom);
			};
		}, []);

		return (
			<div
				ref={combinedRef}
				className={`w-full max-w-full overflow-hidden ${
					controls ? 'rounded-md' : ''
				} ${className} mt-4`}>
				<DynamicReactPlayer
					ref={internalRef}
					url={url}
					playing={playing && inView}
					muted={muted}
					loop={loop}
					controls={controls}
					width="100%"
					height="100%"
					playsinline
					style={{
						borderRadius: controls ? '16px' : '16px',
						overflow: 'hidden',
					}}
					config={{
						file: {
							attributes: videoAttrs,
						},
					}}
					onProgress={({ playedSeconds }) => {
						if (!watchedRef.current && playedSeconds >= 40) {
							trackFacebookPixelEvent('VideoWatched40Seconds', {
								url,
							});
							watchedRef.current = true;
						}
					}}
					onError={e => console.log('Video playback error:', e)}
					{...rest}
				/>
			</div>
		);
	},
);

VideoPlayer.displayName = 'VideoPlayer';

export default VideoPlayer;
