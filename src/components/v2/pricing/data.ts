// data.ts
import type { FeatureItem, Plan } from './types';

export const plans: Plan[] = [
	{
		title: 'Quarterly',
		price: 1299,
		duration: '3 months',
		perMonth: '₹433/mon',
	},
	{
		title: 'Yearly',
		price: 2399,
		duration: '12 months',
		perMonth: '₹200/mon',
		recommended: true,
		discount: 'SAVE 54%',
	},
	{
		title: 'Half-Yearly',
		price: 1999,
		duration: '6 months',
		perMonth: '₹333/mon',
		discount: 'SAVE 23%',
	},
];

export const features: FeatureItem[] = [
	{ icon: '/assets/blood.svg', text: 'Glucose Login' },
	{ icon: '/assets/result1.svg', text: 'Meal Planning' },
	{ icon: '/assets/insight.svg', text: 'Meal Insights' },
	{ icon: '/assets/dumbell.svg', text: 'Easy Home Workouts' },

	{ icon: '', text: 'HbA1c Results' }, // special case with checkmark handled in UI
];
