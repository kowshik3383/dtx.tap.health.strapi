// components/ScrollTracker.tsx
'use client';

import { useEffect, useRef } from 'react';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

const ScrollTracker = () => {
	const hasFiredRef = useRef(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const documentHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercentage = (scrollY / documentHeight) * 100;

			if (!hasFiredRef.current && scrollPercentage >= 75) {
				trackFacebookPixelEvent('DeepScrollEngagement', {
					value: 50,
					currency: 'INR',
				});
				registerIntentEvent('DeepScrollEngagement');

				hasFiredRef.current = true;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return null;
};

export default ScrollTracker;
