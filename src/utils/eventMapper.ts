'use client';

/**
 * This utility provides mapping between standard event names and provider-specific event names.
 * It helps maintain consistency in event tracking across different analytics providers.
 */

// Define standard events and their provider-specific names
// isStandardFBEvent flag helps our system know when to use trackCustom vs track
export const EVENT_MAPPINGS = {
	// Page/Screen Views
	PAGE_VIEW: {
		default: 'Page View',
		mixpanel: 'Page View',
		facebook: 'PageView',
		isStandardFBEvent: true,
	},

	// User Actions
	USER_SIGNUP: {
		default: 'User Signup',
		mixpanel: 'User Signup',
		facebook: 'CompleteRegistration',
		isStandardFBEvent: true,
	},
	USER_LOGIN: {
		default: 'User Login',
		mixpanel: 'User Login',
		facebook: 'Login', // Not a standard FB event
		isStandardFBEvent: false,
	},

	// E-commerce Events
	VIEW_PRODUCT: {
		default: 'View Product',
		mixpanel: 'Product Viewed',
		facebook: 'ViewContent',
		isStandardFBEvent: true,
	},
	ADD_TO_CART: {
		default: 'Add To Cart',
		mixpanel: 'Product Added to Cart',
		facebook: 'AddToCart',
		isStandardFBEvent: true,
	},
	CHECKOUT_START: {
		default: 'Start Checkout',
		mixpanel: 'Checkout Started',
		facebook: 'InitiateCheckout',
		isStandardFBEvent: true,
	},
	PURCHASE: {
		default: 'Purchase',
		mixpanel: 'Purchase Completed',
		facebook: 'Purchase',
		isStandardFBEvent: true,
	},
	PLAN_PURCHASE_CLICK: {
		default: 'Plan Purchase Click',
		mixpanel: 'Plan Purchase Click',
		facebook: 'InitiateCheckout',
		isStandardFBEvent: true,
	},

	// Other Events
	SEARCH: {
		default: 'Search',
		mixpanel: 'Search Performed',
		facebook: 'Search',
		isStandardFBEvent: true,
	},
	CONTACT: {
		default: 'Contact',
		mixpanel: 'Contact Request',
		facebook: 'Contact',
		isStandardFBEvent: true,
	},
	LEAD: {
		default: 'Lead',
		mixpanel: 'Lead Generated',
		facebook: 'Lead',
		isStandardFBEvent: true,
	},

	// Custom Events (these should use trackCustom)
	DTX_PAID_LANDING_PAGE_OPEN: {
		default: 'DTX Paid Landing Page Open',
		mixpanel: 'Paid Landing Page Viewed',
		facebook: 'dtx_paid_landing_page_page_open',
		isStandardFBEvent: false,
	},
	DTX_PAID_LANDING_PAGE_REFRESH: {
		default: 'DTX Paid Landing Page Refresh',
		mixpanel: 'Paid Landing Page Refreshed',
		facebook: 'dtx_paid_landing_page_page_refresh',
		isStandardFBEvent: false,
	},
	// Custom Events
	TESTIMONIAL_SWIPE: {
		default: 'Testimonial Swipe',
		mixpanel: 'Testimonial Swiped',
		facebook: 'TestimonialSwipe', // Custom event name
		isStandardFBEvent: false, // Important: it's a custom event
	},
};

// Event types for TypeScript
export type StandardEventName = keyof typeof EVENT_MAPPINGS;
export type Provider = 'default' | 'mixpanel' | 'facebook';

/**
 * Get provider-specific event names for a standard event
 * @param standardEvent The standard event name from EVENT_MAPPINGS
 * @returns An object with provider-specific event names
 */
export const getProviderSpecificNames = (standardEvent: StandardEventName) => {
	const mapping = EVENT_MAPPINGS[standardEvent];
	if (!mapping) {
		console.warn(`No mapping found for event "${standardEvent}"`);
		return {
			mixpanel: standardEvent,
			facebook: standardEvent,
		};
	}

	return {
		mixpanel: mapping.mixpanel,
		facebook: mapping.facebook,
	};
};

/**
 * Check if a Facebook event name is a standard event
 * @param eventName The Facebook event name to check
 * @returns boolean indicating if it's a standard event
 */
export const isFacebookStandardEvent = (eventName: string): boolean => {
	// First check our mapping
	for (const key in EVENT_MAPPINGS) {
		const mapping = EVENT_MAPPINGS[key as StandardEventName];
		if (mapping.facebook === eventName) {
			return !!mapping.isStandardFBEvent;
		}
	}

	// Standard Facebook events list
	const standardEvents = [
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
		'TestimonialSwipe',
	];

	return standardEvents.includes(eventName);
};
