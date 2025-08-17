'use client';
import mixpanel from 'mixpanel-browser';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { initAnalytics, trackEvent } from '@/utils/analytics';
import { getProviderSpecificNames } from '@/utils/eventMapper';

interface AnalyticsProviderProps {
	children: React.ReactNode;
}

/**
 * AnalyticsProvider initializes all configured analytics services on mount and tracks page views
 * This component is client-only as it depends on browser APIs and hooks
 */
export default function AnalyticsProvider({
	children,
}: AnalyticsProviderProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Initialize analytics once on component mount
	useEffect(() => {
		// Only initialize analytics in production/development, not in tests
		initAnalytics();
	}, []);

	// Track page views whenever the route changes
	useEffect(() => {
		if (pathname) {
			// Build the full URL path including query parameters
			let url = pathname;
			const params = new URLSearchParams(searchParams);
			const queryString = params.toString();

			if (queryString) {
				url = `${url}?${queryString}`;
			}

			// Define page view event properties
			const pageViewProps = {
				url,
				path: pathname,
				referrer: document.referrer || '',
			};

			// Track the page view event across all analytics providers
			// Using provider-specific event names from our centralized mapper
			mixpanel.register({
				url,
				path: pathname,
				referrer: document.referrer || '',
			});
			trackEvent('Page View', pageViewProps, {
				providerSpecificNames: getProviderSpecificNames('PAGE_VIEW'),
			});
		}
	}, [pathname, searchParams]);

	// This provider doesn't render any UI, just returns children
	return <>{children}</>;
}
