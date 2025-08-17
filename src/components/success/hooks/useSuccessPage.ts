import { useState } from 'react';
import { APP_STORE_URL, PLAY_STORE_URL } from '../constants';

interface UseSuccessPageProps {
	subtitle?: string;
	onDownload?: () => void;
	onAppStoreClick?: () => void;
	onPlayStoreClick?: () => void;
}

export const useSuccessPage = ({
	subtitle,
	onDownload,
	onAppStoreClick,
	onPlayStoreClick,
}: UseSuccessPageProps) => {
	const [showOverlay, setShowOverlay] = useState(false);

	// Extract month information from subtitle if available
	const monthMatch = subtitle?.match(/(\d+)\s+months?/i);
	const month = monthMatch ? monthMatch[1] : undefined;

	// Handle animation sequence
	const handleAnimationComplete = () => {
		setShowOverlay(true);
	};

	// App store handling functions
	const handleStore = (platform: 'ios' | 'android') => {
		if (platform === 'ios') {
			window.location.href = APP_STORE_URL;
		} else {
			window.location.href = PLAY_STORE_URL;
		}
	};

	const handleDownload = () => {
		const userAgent = navigator.userAgent || navigator.vendor;
		if (/android/i.test(userAgent)) {
			handleStore('android');
		} else if (/iPad|iPhone|iPod/.test(userAgent)) {
			handleStore('ios');
		} else {
			handleStore('android'); // Default to Play Store on desktop
		}
	};

	// Use the provided callbacks or our internal handlers
	const handleAppStoreClick = onAppStoreClick || (() => handleStore('ios'));
	const handlePlayStoreClick =
		onPlayStoreClick || (() => handleStore('android'));
	const handleDownloadClick = onDownload || handleDownload;

	return {
		showOverlay,
		month,
		handleAnimationComplete,
		handleAppStoreClick,
		handlePlayStoreClick,
		handleDownloadClick,
	};
};
