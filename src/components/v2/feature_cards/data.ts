export type FeatureCardData = {
	id: string;
	title: string;
	image: string;
	icons: { icon: string; text: string }[];
};

export const featureCards: FeatureCardData[] = [
	{
		id: 'dailyMeal',
		title: 'Daily Meal Recommendations',
		image: 'https://i.ibb.co/7t2LJBjk/meals.png',
		icons: [
			{
				icon: '/assets/bottomcards/card1/1.png',
				text: 'Personalised meal plans tailored to your lifestyle.',
			},
			{
				icon: '/assets/bottomcards/card1/2.png',
				text: 'Log & track your meals and calorie intake.',
			},
			{
				icon: '/assets/bottomcards/card1/3.png',
				text: 'Smart technology learn from your dietary patterns.',
			},
		],
	},
	{
		id: 'exercise',
		title: 'Easy, Guided Exercise Routine',
		image: '/assets/exercise.png',
		icons: [
			{
				icon: '/assets/bottomcards/card2/1.png',
				text: 'Easy home based workouts that suits your body.',
			},
			{
				icon: '/assets/bottomcards/card2/2.png',
				text: 'Log 50+ activities including cycling, jogging and more.',
			},
			{
				icon: '/assets/bottomcards/card2/3.png',
				text: 'Guided workout videos with instructions.',
			},
		],
	},
	{
		id: 'medication',
		title: 'Smart Medication Reminders',
		image: '/assets/medicine.png',
		icons: [
			{
				icon: '/assets/bottomcards/card3/1.png',
				text: 'Smart medication reminders around the clock.',
			},
			{
				icon: '/assets/bottomcards/card3/2.png',
				text: 'Effortless logging and track progress easily.',
			},
			{
				icon: '/assets/bottomcards/card3/3.png',
				text: 'Detailed medication log to support your medical history.',
			},
		],
	},
	{
		id: 'foodScore',
		title: 'Instant Food Scoring',
		image: '/assets/meals.png',
		icons: [
			{
				icon: '/assets/bottomcards/card5/1.png',
				text: 'Get immediate insights into your meal nutritional value.',
			},
			{
				icon: '/assets/bottomcards/card5/2.png',
				text: 'Receive a quick score on how healthy your meal is.',
			},
			{
				icon: '/assets/bottomcards/card5/3.png',
				text: 'Know how it might affect blood sugar levels.',
			},
		],
	},
	{
		id: 'aiCoach',
		title: '24x7 AI Coach',
		image: '/assets/ai_coach.png',
		icons: [
			{
				icon: '/assets/bottomcards/card4/1.png',
				text: 'Get immediate, reliable advice for any health related question.',
			},
			{
				icon: '/assets/bottomcards/card4/2.png',
				text: 'Log your meal, activity and medicine effortlessly.',
			},
			{
				icon: '/assets/bottomcards/card4/3.png',
				text: 'No waiting, available to you all around the clock. ',
			},
		],
	},
	{
		id: 'glucose',
		title: 'Quick Glucose Logging',
		image: '/assets/glucose.png',
		icons: [
			{
				icon: '/assets/bottomcards/card6/1.png',
				text: 'Easily record your blood sugar readings in seconds.',
			},
			{
				icon: '/assets/bottomcards/card6/2.png',
				text: 'Track trends in your glucose levels over time.',
			},
			{
				icon: '/assets/bottomcards/card6/3.png',
				text: 'Share clear, organised data with your doctor.',
			},
		],
	},
];
