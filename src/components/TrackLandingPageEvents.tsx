'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/utils/analytics';

const TrackLandingPageEvents: React.FC = () => {
	useEffect(() => {
		if (typeof window === 'undefined' || typeof performance === 'undefined')
			return;

		const url = window.location.href;

		// Log for debugging
		console.log('[TRACK] Landing Page Open:', url);
		trackEvent('dtx_paid_landing_page_page_open', {
			url,
			value: 20,
			currency: 'INR',
		});

		const navEntries = performance.getEntriesByType('navigation');
		const navType =
			navEntries.length > 0
				? (navEntries[0] as PerformanceNavigationTiming).type
				: 'unknown';

		if (navType === 'reload') {
			console.log('[TRACK] Landing Page Refresh:', url);
			trackEvent('dtx_paid_landing_page_page_refresh', {
				url,
				value: 10,
				currency: 'INR',
			});
		}
	}, []);

	return null;
};

export default TrackLandingPageEvents;
