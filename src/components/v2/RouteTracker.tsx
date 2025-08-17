'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

const STORAGE_KEY = 'tap_routes_visited';
const EVENT_SENT_KEY = 'tap_multi_page_sent';

const RouteTracker = () => {
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname) return;

		let visited: string[] = [];

		try {
			const raw = sessionStorage.getItem(STORAGE_KEY);
			const parsed = raw ? JSON.parse(raw) : [];
			if (Array.isArray(parsed)) {
				visited = parsed.filter(item => typeof item === 'string');
			}
		} catch (err) {
			console.warn('Error parsing visited routes:', err);
		}

		// Add current route if not already present
		if (!visited.includes(pathname)) {
			visited.push(pathname);
			sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
		}

		// Check if event already fired
		const intentSent = sessionStorage.getItem(EVENT_SENT_KEY);
		if (!intentSent && visited.length > 1) {
			trackFacebookPixelEvent('MultiPageVisit', {
				routesVisited: visited,
				pageCount: visited.length,
				value: 60,
				currency: 'INR',
			});
			registerIntentEvent('MultiPageVisit');

			sessionStorage.setItem(EVENT_SENT_KEY, 'true');
		}
	}, [pathname]);

	return null;
};

export default RouteTracker;
