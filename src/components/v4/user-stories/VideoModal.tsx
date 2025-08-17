'use client';

import { useEffect } from 'react';
import VideoPlayer from '@/components/elements/VideoPlayer';

interface VideoModalProps {
	videoUrl: string;
	isOpen: boolean;
	onClose: () => void;
}

const VideoModal = ({ videoUrl, isOpen, onClose }: VideoModalProps) => {
	useEffect(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', handleKeydown);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	}, [onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-1000 flex h-full w-full items-center justify-center bg-black">
			<div className="relative mx-auto h-full w-full max-w-7xl">
				<div className="flex h-full w-full items-center justify-center">
					<VideoPlayer
						url={videoUrl}
						controls={true}
						playing={true}
						muted={false}
						loop={false}
						className="aspect-video"
					/>
				</div>
				<button
					onClick={onClose}
					className="bg-opacity-70 absolute top-4 right-4 z-10 rounded-full bg-black px-3 py-1 text-white">
					Close ✕
				</button>
			</div>
		</div>
	);
};

export default VideoModal;
