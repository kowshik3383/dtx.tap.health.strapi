/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { trackEvent } from './analytics';
import { getProviderSpecificNames } from './eventMapper';

/**
 * Track a plan purchase click event in both analytics systems
 */
export const trackPlanPurchaseClick = (
	planId: string,
	price: number,
	month: number | string,
	isPromotional: boolean,
	promotionalCode?: string | null,
): void => {
	const eventProperties = {
		plan_id: planId,
		price: price,
		duration: month,
		is_promotional: isPromotional,
		promotional_code: isPromotional ? promotionalCode : null,
	};

	// Track in our main analytics system with provider-specific event names
	trackEvent('PlanPurchaseClick', eventProperties, {
		providerSpecificNames: getProviderSpecificNames('PLAN_PURCHASE_CLICK'),
	});
};

/**
 * Track a successful purchase event in both analytics systems
 */
export const trackPurchaseComplete = (
	planData: any,
	amount: number,
	currency: string = 'INR',
): void => {
	const eventProperties = {
		value: amount || 0,
		currency: currency,
		contents: [
			{
				id: planData?.id || 'N/A',
				name: planData?.name || 'Unknown Plan',
				price: amount || 0,
			},
		],
	};

	// Track in our main analytics system with provider-specific event names
	trackEvent('Purchase', eventProperties, {
		providerSpecificNames: getProviderSpecificNames('PURCHASE'),
	});
};

/**
 * Track the paid landing page open event
 */
export const trackPaidLandingPageOpen = (
	pageData?: Record<string, any>,
): void => {
	trackEvent('DTX Paid Landing Page Open', pageData, {
		providerSpecificNames: getProviderSpecificNames(
			'DTX_PAID_LANDING_PAGE_OPEN',
		),
	});
};

/**
 * Track the paid landing page refresh event
 */
export const trackPaidLandingPageRefresh = (
	pageData?: Record<string, any>,
): void => {
	trackEvent('DTX Paid Landing Page Refresh', pageData, {
		providerSpecificNames: getProviderSpecificNames(
			'DTX_PAID_LANDING_PAGE_REFRESH',
		),
	});
};
