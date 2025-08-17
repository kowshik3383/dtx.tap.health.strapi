import { trackFacebookPixelEvent } from './analytics';

// --- Standard Intent ---
const INTENT_KEY = 'tap_intent_events';
const INTENT_SENT_KEY = 'tap_high_intent_sent';

// --- Higher Intent ---
const HIGHER_INTENT_KEY = 'tap_higher_intent_events';
const HIGHER_INTENT_SENT_KEY = 'tap_higher_intent_sent';

/**
 * Registers standard intent events and fires 'HighIntentUser' after 5 unique events.
 */
export const registerIntentEvent = (eventName: string): void => {
	if (typeof window === 'undefined') return;

	try {
		const raw = sessionStorage.getItem(INTENT_KEY);
		const events: string[] = raw ? (JSON.parse(raw) as string[]) : [];

		if (!events.includes(eventName)) {
			events.push(eventName);
			sessionStorage.setItem(INTENT_KEY, JSON.stringify(events));
		}

		const alreadySent = sessionStorage.getItem(INTENT_SENT_KEY);
		if (!alreadySent && events.length >= 5) {
			trackFacebookPixelEvent('HighIntentUser', {
				eventCount: events.length,
				events,
				value: 60,
				currency: 'INR',
			});
			sessionStorage.setItem(INTENT_SENT_KEY, 'true');
		}
	} catch (err) {
		console.warn('❌ registerIntentEvent failed', err);
	}
};

/**
 * Registers higher intent events and fires 'HigherIntentUser' after 2 unique events.
 */
export const registerHigherIntentEvent = (eventName: string): void => {
	if (typeof window === 'undefined') return;

	try {
		const raw = sessionStorage.getItem(HIGHER_INTENT_KEY);
		const events: string[] = raw ? (JSON.parse(raw) as string[]) : [];

		if (!events.includes(eventName)) {
			events.push(eventName);
			sessionStorage.setItem(HIGHER_INTENT_KEY, JSON.stringify(events));
		}

		const alreadySent = sessionStorage.getItem(HIGHER_INTENT_SENT_KEY);
		if (!alreadySent && events.length >= 2) {
			trackFacebookPixelEvent('HigherIntentUser', {
				eventCount: events.length,
				events,
				value: 80,
				currency: 'INR',
			});
			sessionStorage.setItem(HIGHER_INTENT_SENT_KEY, 'true');
		}
	} catch (err) {
		console.warn('❌ registerHigherIntentEvent failed', err);
	}
};
