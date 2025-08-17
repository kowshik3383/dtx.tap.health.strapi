import { useMemo } from 'react';
import { Promotion } from '../constants/types';

export function usePromotion(promotions: Promotion[] | null) {
	// Check if promotions exist and find a valid one based on start and end dates
	const activePromotion = useMemo(() => {
		if (
			!promotions ||
			!Array.isArray(promotions) ||
			promotions.length === 0
		)
			return null;

		// Find the first active promotion based on date criteria
		const now = new Date();

		// First try to find a promotion that's within its date range (has both start and end dates)
		const activePromotion = promotions.find(promo => {
			if (!promo) return false;

			const startDate = promo.startDate
				? new Date(promo.startDate)
				: null;
			const endDate = promo.endDate ? new Date(promo.endDate) : null;

			// If both dates exist, check if current date is within range
			if (startDate && endDate) {
				return now >= startDate && now <= endDate;
			}

			// If only end date exists, check if current date is before end date
			if (!startDate && endDate) {
				return now <= endDate;
			}

			// If only start date exists, check if current date is after start date
			if (startDate && !endDate) {
				return now >= startDate;
			}

			// If no dates are specified, consider it active
			return true;
		});

		// If we found an active promotion, return it
		if (activePromotion) return activePromotion;

		// Otherwise, return null as no active promotions were found
		return null;
	}, [promotions]);

	// Calculate time remaining until promotion ends
	const timeUntilEnd = useMemo(() => {
		if (!activePromotion || !activePromotion.endDate) return null;

		const endDate = new Date(activePromotion.endDate);
		const now = new Date();

		// If promotion has already ended, don't show timer
		if (endDate <= now) return null;

		return endDate;
	}, [activePromotion]);

	return {
		activePromotion,
		timeUntilEnd,
	};
}
