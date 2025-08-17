'use client';

import { useEffect, useRef } from 'react';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

const TimeSpentEventTracker = () => {
	const hasFiredRef = useRef(false);

	useEffect(() => {
		const STORAGE_KEY = 'fb_time_spent_60s';
		const alreadyTracked = sessionStorage.getItem(STORAGE_KEY);

		// Prevent firing if already tracked
		if (alreadyTracked) {
			hasFiredRef.current = true;
			return;
		}

		const timer = setTimeout(() => {
			if (!hasFiredRef.current) {
				trackFacebookPixelEvent('TimeOnSite_60s', {
					duration: 60,
					value: 50,
					currency: 'INR',
				});
				registerIntentEvent('TimeOnSite_60s');
				hasFiredRef.current = true;
				sessionStorage.setItem(STORAGE_KEY, 'true');
			}
		}, 60000); // 60 seconds

		return () => clearTimeout(timer);
	}, []);

	return null;
};

export default TimeSpentEventTracker;
