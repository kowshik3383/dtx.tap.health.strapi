export interface FeatureItem {
	icon: string;
	text: string;
}

export const features: FeatureItem[] = [
	{ icon: '/assets/blood.svg', text: 'Blood glucose logging' },
	{ icon: '/assets/reminder.svg', text: 'Smart medication reminders' },
	{ icon: '/assets/result1.svg', text: 'Meal recommendations & plan' },
	{ icon: '/assets/insight.svg', text: 'Instant meal insights' },
	{ icon: '/assets/camera.svg', text: 'Log your meals with a photo' },
	{ icon: '/assets/dumbell.svg', text: 'Easy, guided exercise routines' },
	{ icon: '/assets/24.svg', text: '24/7 access to your AI Health Coach' },
];
