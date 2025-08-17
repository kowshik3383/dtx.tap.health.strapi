//@typescript-eslint/no-unused-vars

'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { components } from '@/types/strapi';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type DynamicVideoPlayerType =
	components['schemas']['DynamicZoneVideoplayerComponent'];

interface VideoPlayerProps extends DynamicVideoPlayerType {
	className?: string;
	video?: components['schemas']['SharedVideoComponent'];
	onReady?: () => void;
}

export default function VideoPlayer({
	url,
	playing = true,
	muted = true,
	loop = true,
	controls = true,
	className = '',
	video,
	onReady,
}: VideoPlayerProps) {
	const playerRef = useRef(null);
	const pathname = usePathname();
	const isV2Path =
		pathname === '/v2' ||
		pathname === '/v2o' ||
		pathname === '/v2o1' ||
		pathname === '/v2o3' ||
		pathname === '/v6' ||
		pathname === '/v7' ||
		pathname === '/v2o4' ||
		pathname === '/v2o2';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [watchTime, setWatchTime] = useState(0);
	const [eventTracked, setEventTracked] = useState(false);

	const _handleProgress = (state: { playedSeconds: number }) => {
		if (!eventTracked && state.playedSeconds >= 40) {
			trackFacebookPixelEvent('VideoWatched40Seconds', {
				page: pathname,
				url,

				value: 50,
				currency: 'INR',
			});
			registerIntentEvent('VideoWatched40Seconds');

			setEventTracked(true);
		}
		setWatchTime(state.playedSeconds);
	};

	const videoAttrs = {
		muted,
		crossOrigin: 'anonymous' as const,
	};

	const style: React.CSSProperties = isV2Path
		? { pointerEvents: 'none', margin: 0 }
		: { borderRadius: '16px', overflow: 'hidden' };

	return (
		<div className={`${className} ${isV2Path ? '' : 'mt-4'}`}>
			{url && (
					<ReactPlayer
						ref={playerRef}
						url={url}
						playing={playing}
						muted={muted}
						onReady={onReady}
						loop={loop}
						controls={!isV2Path && controls}
						width={isV2Path ? undefined : '100%'}
						height={isV2Path ? undefined : '100%'}
						playsinline
						style={style}
						config={{
							file: {
								attributes: videoAttrs,
							},
						}}
						preload="metadata"
						onError={e => console.log('Video playback error:', e)}
					/>
			)}
			{video && video.file && video.file?.url && (
				<ReactPlayer
					ref={playerRef}
					url={video.file.url}
					playing={playing}
					muted={muted}
					onReady={onReady}
					loop={loop}
					controls={!isV2Path && controls}
					width={isV2Path ? undefined : '100%'}
					height={isV2Path ? undefined : '100%'}
					playsinline
					style={style}
					preload="metadata"
					config={{
						file: {
							attributes: videoAttrs,
						},
					}}
					onError={e => console.log('Video playback error:', e)}
				/>
			)}
		</div>
	);
}
