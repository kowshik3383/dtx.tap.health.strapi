/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as Sentry from '@sentry/nextjs';

import mixpanel from 'mixpanel-browser';
import { env } from '../env.mjs';

// Facebook Pixel standard events
export const FB_STANDARD_EVENTS = [
	'PageView',
	'ViewContent',
	'Search',
	'AddToCart',
	'AddToWishlist',
	'InitiateCheckout',
	'AddPaymentInfo',
	'Purchase',
	'Lead',
	'CompleteRegistration',
	'Contact',
	'Subscribe',
	'CustomizeProduct',
	'Donate',
	'FindLocation',
	'Schedule',
	'StartTrial',
	'SubmitApplication',
];

// Add fbq to Window interface
declare global {
	interface Window {
		fbq?: (
			action: 'track' | 'trackCustom' | 'init' | 'set',
			eventName: string,
			params?: Record<string, any>,
		) => void;
		gtag?: (...args: any[]) => void;
	}
}

// Flag to track initialization status for each provider
interface AnalyticsStatus {
	mixpanel: boolean;
	// Add other analytics platforms here as needed
	// google: boolean;
	// segment: boolean;
	// etc.
}

const analyticsStatus: AnalyticsStatus = {
	mixpanel: false,
};

/**
 * Initialize Mixpanel analytics
 */

const initMixpanel = (): boolean => {
	if (typeof window === 'undefined' || analyticsStatus.mixpanel)
		return analyticsStatus.mixpanel;

	const token = env.NEXT_PUBLIC_MIXPANEL_TOKEN;

	if (!token) {
		console.warn('Mixpanel token is not defined in environment variables');
		return false;
	}

	try {
		mixpanel.init(token, {
			debug: true,
			track_pageview: false,
			persistence: 'localStorage',
		});
		analyticsStatus.mixpanel = true;
		console.log('✅ Mixpanel initialized');
	} catch (error) {
		console.error('❌ Error initializing Mixpanel:', error);

		// ✅ Optimized Sentry logging
		Sentry.captureException(error, {
			tags: {
				module: 'analytics',
				integration: 'mixpanel',
			},
			extra: {
				message: 'Mixpanel initialization failed',
				tokenPresent: Boolean(token),
			},
			level: 'error',
		});
	}

	return analyticsStatus.mixpanel;
};

/**
 * Initialize all enabled analytics providers
 */
export const initAnalytics = (): Promise<boolean> => {
	return new Promise(resolve => {
		// Initialize Mixpanel first
		const mixpanelInitialized = initMixpanel();

		// Add initialization of other analytics platforms here
		// const googleInitialized = initGoogleAnalytics();
		// const segmentInitialized = initSegment();

		// Resolve with whether any provider was initialized
		resolve(mixpanelInitialized);
	});
};

/**
 * Track an event across all enabled analytics providers
 */
export const trackGA4Event = (
	eventName: string,
	properties?: Record<string, any>,
): void => {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function')
		return;

	try {
		window.gtag('event', eventName, {
			...properties,
			event_id: properties?.event_id || `evt_${Date.now()}`,
		});

		console.log(`📈 GA4 Event Tracked: ${eventName}`, properties);
	} catch (err) {
		console.error(`❌ GA4 tracking failed for "${eventName}":`, err);
		Sentry.captureException(err, {
			tags: {
				module: 'analytics',
				integration: 'GA4',
			},
			extra: {
				eventName,
				properties,
			},
			level: 'error',
		});
	}
};

export const trackEvent = (
	eventName: string,
	properties?: Record<string, any>,
	options?: {
		providers?: ('mixpanel' | 'facebook' | 'ga4' | string)[];
		providerSpecificNames?: {
			mixpanel?: string;
			facebook?: string;
			ga4?: string;
			[key: string]: string | undefined;
		};
	},
): void => {
	if (typeof window === 'undefined') return;

	// Log all track events to console for debugging
	console.log(`📊 Analytics Event: ${eventName}`, {
		properties,
		timestamp: new Date().toISOString(),
		url: window.location.href,
		providers: options?.providers || 'all',
		providerSpecificNames: options?.providerSpecificNames,
	});

	const { providers, providerSpecificNames } = options || {};

	// Track with Mixpanel
	if (
		(!providers || providers.includes('mixpanel')) &&
		analyticsStatus.mixpanel
	) {
		try {
			const mixpanelEventName =
				providerSpecificNames?.mixpanel || eventName;
			mixpanel.track(mixpanelEventName, properties);
			console.log(
				`✅ Event "${mixpanelEventName}" tracked with Mixpanel`,
			);
		} catch (error) {
			console.error(`❌ Mixpanel error for "${eventName}":`, error);

			Sentry.captureException(error, {
				tags: {
					provider: 'mixpanel',
					module: 'analytics',
				},
				extra: {
					eventName,
					properties,
					mixpanelInitialized: analyticsStatus.mixpanel,
				},
			});
		}
	} else if (
		(!providers || providers.includes('mixpanel')) &&
		!analyticsStatus.mixpanel
	) {
		console.warn(
			`⏳ Mixpanel not initialized. Event "${eventName}" skipped.`,
		);
	}

	// Track with Facebook Pixel
	if (window.fbq && (!providers || providers.includes('facebook'))) {
		const fbEventName = providerSpecificNames?.facebook || eventName;

		try {
			const eventType = FB_STANDARD_EVENTS.includes(
				fbEventName as FBStandardEvent,
			)
				? 'track'
				: 'trackCustom';

			window.fbq(eventType, fbEventName, properties);

			if (eventType === 'track') {
				console.log(
					`✅ Standard event "${fbEventName}" tracked with Facebook Pixel`,
				);
			} else {
				console.log(
					`✅ Custom event "${fbEventName}" tracked with Facebook Pixel`,
				);
			}

			// ✅ Send to Conversion API
			fetch('/api/conversion-api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					eventName: fbEventName,
					event_id: `evt_${Date.now()}`,
					email: properties?.email,
					phone: properties?.phone,
					properties,
				}),
			})
				.then(async res => {
					const result = await res.json();
					if (!res.ok) throw result;
					console.log(
						`🟢 Event "${fbEventName}" sent to Conversion API`,
					);
				})
				.catch(err => {
					console.error(
						`❌ Failed to send "${fbEventName}" to Conversion API:`,
						err,
					);

					Sentry.captureException(err, {
						tags: {
							provider: 'facebook',
							module: 'conversion-api',
						},
						extra: {
							eventName: fbEventName,
							properties,
						},
					});
				});
		} catch (error) {
			console.error(`❌ Facebook Pixel error for "${eventName}":`, error);

			Sentry.captureException(error, {
				tags: {
					provider: 'facebook',
					module: 'analytics',
				},
				extra: {
					eventName,
					properties,
				},
			});
		}
	}

	// Track with GA4
	if (!providers || providers.includes('ga4')) {
		try {
			const ga4EventName = providerSpecificNames?.ga4 || eventName;
			trackGA4Event(ga4EventName, properties);
		} catch (error) {
			console.error(`❌ GA4 error for "${eventName}":`, error);

			Sentry.captureException(error, {
				tags: {
					provider: 'ga4',
					module: 'analytics',
				},
				extra: {
					eventName,
					properties,
				},
			});
		}
	}
};

/**
 * Identify a user across all enabled analytics providers
 */

export const identifyUser = (
	userId: string,
	traits?: Record<string, any>,
	options?: {
		providers?: ('mixpanel' | string)[];
	},
): void => {
	if (typeof window === 'undefined') return;

	const { providers } = options || {};

	// Identify with Mixpanel if enabled or if providers is not specified
	if (
		(!providers || providers.includes('mixpanel')) &&
		analyticsStatus.mixpanel
	) {
		try {
			mixpanel.alias(userId);
			mixpanel.identify(userId);
			if (traits) mixpanel.people.set(traits);
		} catch (error) {
			console.error(
				`❌ Error identifying user "${userId}" with Mixpanel:`,
				error,
			);

			// ✅ Optimized Sentry logging
			Sentry.captureException(error, {
				tags: {
					module: 'analytics',
					action: 'identifyUser',
					provider: 'mixpanel',
				},
				extra: {
					userId,
					traits,
					mixpanelInitialized: analyticsStatus.mixpanel,
				},
			});
		}
	}

	// Add user identification for other analytics platforms here
	// if ((!providers || providers.includes('google')) && analyticsStatus.google) { ... }
	// if ((!providers || providers.includes('segment')) && analyticsStatus.segment) { ... }
};

/**
 * Reset current user across all enabled analytics providers
 */

export const resetUser = (options?: {
	providers?: ('mixpanel' | string)[];
}): void => {
	if (typeof window === 'undefined') return;

	const { providers } = options || {};

	// Reset user in Mixpanel if enabled or if providers is not specified
	if (
		(!providers || providers.includes('mixpanel')) &&
		analyticsStatus.mixpanel
	) {
		try {
			mixpanel.reset();
		} catch (error) {
			console.error('❌ Error resetting Mixpanel user:', error);

			// ✅ Sentry error logging
			Sentry.captureException(error, {
				tags: {
					module: 'analytics',
					action: 'resetUser',
					provider: 'mixpanel',
				},
				extra: {
					mixpanelInitialized: analyticsStatus.mixpanel,
					providers,
				},
			});
		}
	}

	// Add user reset for other analytics platforms here
	// if ((!providers || providers.includes('google')) && analyticsStatus.google) { ... }
	// if ((!providers || providers.includes('segment')) && analyticsStatus.segment) { ... }
};

/**
			
 * Track an event specifically with Facebook Pixel
 * This function can be used to track events directly with fbq alongside our analytics system
 */

type FBStandardEvent = (typeof FB_STANDARD_EVENTS)[number];

export const trackFacebookPixelEvent = async (
	eventName: string,
	properties?: Record<string, any>,
	options?: {
		email?: string;
		phone?: string;
		event_id?: string;
	},
): Promise<void> => {
	if (typeof window === 'undefined') return;

	// 1. Track via Facebook Pixel (client/browser)
	try {
		if (window.fbq) {
			const eventType = FB_STANDARD_EVENTS.includes(
				eventName as FBStandardEvent,
			)
				? 'track'
				: 'trackCustom';

			window.fbq(eventType, eventName, properties);
			console.log(`📊 Pixel [${eventType}] - ${eventName}`, {
				properties,
			});
		}
	} catch (err) {
		console.error(`❌ FB Pixel tracking failed for "${eventName}":`, err);

		Sentry.captureException(err, {
			tags: {
				module: 'analytics',
				provider: 'facebook_pixel',
				action: 'client_track',
			},
			extra: {
				eventName,
				properties,
			},
		});
	}

	// 2. Also track in GA4
	try {
		trackGA4Event(eventName, {
			...properties,
			event_id: options?.event_id || `evt_${Date.now()}`,
		});
	} catch (err) {
		console.error(
			`❌ GA4 tracking within FB function failed for "${eventName}":`,
			err,
		);

		Sentry.captureException(err, {
			tags: {
				module: 'analytics',
				provider: 'ga4',
				action: 'fb_wrapped_ga4_track',
			},
			extra: {
				eventName,
				properties,
			},
		});
	}

	// 3. Always send to Facebook Conversion API (server)
	try {
		const res = await fetch('/api/conversion-api', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				eventName,
				event_id: options?.event_id || `evt_${Date.now()}`,
				email: options?.email,
				phone: options?.phone,
				properties,
			}),
		});

		const result = await res.json();
		if (!res.ok) throw result;

		console.log('📬 Sent to Conversion API successfully:', result);
		console.log('🟢 Event Name:', eventName, properties ?? {});
	} catch (err) {
		console.error(`❌ CAPI failed for "${eventName}":`, err);

		Sentry.captureException(err, {
			tags: {
				module: 'analytics',
				provider: 'facebook_capi',
				action: 'server_track',
			},
			extra: {
				eventName,
				email: options?.email,
				phone: options?.phone,
				properties,
			},
		});
	}
};
