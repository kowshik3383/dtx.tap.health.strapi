import { useMemo } from 'react';
import { useSubscriptionStore } from '@/store';
import { Plan } from '../constants/types';

export function usePlans() {
	const { plans, storeselectedIndex, setStoreSelectedIndex } =
		useSubscriptionStore();

	// Get the selected plan
	const selectedPlan = useMemo(() => {
		return plans[storeselectedIndex] || null;
	}, [plans, storeselectedIndex]);

	// Get plan descriptions based on intervals
	const getPlanDescription = (plan: Plan): string => {
		if (plan.item.description) return plan.item.description;

		switch (plan.interval) {
			case 1:
				return 'Try it out for a month';
			case 3:
				return 'Ideal solution for trying out the plan';
			case 6:
				return 'Great for building new healthy habits';
			case 12:
				return 'For achieving the best health results';
			default:
				return `${plan.interval} month plan`;
		}
	};

	return {
		plans,
		selectedPlan,
		selectedIndex: storeselectedIndex,
		setSelectedIndex: setStoreSelectedIndex,
		getPlanDescription,
	};
}
