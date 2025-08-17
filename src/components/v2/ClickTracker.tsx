'use client';

import { useEffect } from 'react';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

const CLICKS_KEY = 'tap_click_count';
const EVENT_SENT_KEY = 'tap_click_event_sent';

const ClickTracker = () => {
	useEffect(() => {
		const handleClick = () => {
			const sent = sessionStorage.getItem(EVENT_SENT_KEY);
			if (sent) return;

			const raw = sessionStorage.getItem(CLICKS_KEY);
			let count = raw ? parseInt(raw, 10) : 0;

			count += 1;
			sessionStorage.setItem(CLICKS_KEY, count.toString());

			if (count >= 5) {
				trackFacebookPixelEvent('HighClickEngagement', {
					clickCount: count,
					timestamp: new Date().toISOString(),
					value: 60,
					currency: 'INR',
				});
				registerIntentEvent('HighClickEngagement');
				sessionStorage.setItem(EVENT_SENT_KEY, 'true');
			}
		};

		document.body.addEventListener('click', handleClick);

		return () => {
			document.body.removeEventListener('click', handleClick);
		};
	}, []);

	return null;
};

export default ClickTracker;
