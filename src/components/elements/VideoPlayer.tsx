'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react';
import { components } from '@/types/strapi';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

// Lazy-load ReactPlayer only on client + when visible
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
  loading: () => <div className="h-48 w-full animate-pulse bg-gray-200 rounded-lg" />,
});

type DynamicVideoPlayerType = components['schemas']['DynamicZoneVideoplayerComponent'];

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
  const playerRef = useRef<typeof ReactPlayer | null>(null);
  const pathname = usePathname();
  const [eventTracked, setEventTracked] = useState(false);

  const isV2Path = useMemo(
    () =>
      ['/v2', '/v2o', '/v2o1', '/v2o3', '/v6', '/v7', '/v2o4', '/v2o2'].includes(pathname),
    [pathname]
  );

  const src = url || video?.file?.url;
  if (!src) return null;

  const handleProgress = (state: { playedSeconds: number }) => {
    if (!eventTracked && state.playedSeconds >= 40) {
      trackFacebookPixelEvent('VideoWatched40Seconds', {
        page: pathname,
        url: src,
        value: 50,
        currency: 'INR',
      });
      registerIntentEvent('VideoWatched40Seconds');
      setEventTracked(true);
    }
  };

  const style: React.CSSProperties = isV2Path
    ? { pointerEvents: 'none', margin: 0 }
    : { borderRadius: '16px', overflow: 'hidden' };

  return (
    <div className={`${className} ${isV2Path ? '' : 'mt-4'}`}>
      <ReactPlayer
        ref={playerRef}
        url={src}
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
          file: { attributes: { muted, crossOrigin: 'anonymous' } },
        }}
        onError={(e) => console.error('Video playback error:', e)}
        onProgress={handleProgress}
      />
    </div>
  );
}
