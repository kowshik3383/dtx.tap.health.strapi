interface CardData {
	title: string;
	description?: string;
	icon?: string;
	bgColor?: string;
	image?: string;
	kcal?: number;
	duration?: string;
}

export const upperCards: CardData[] = [
	{
		title: 'Dal',
		kcal: 120,
		description: '1 cup',
		icon: '🥣',
		bgColor: 'bg-yellow-50',
	},
	{
		title: 'Roti',
		description: '70 kcal - 1 piece',
		icon: '🫓',
		bgColor: 'bg-amber-50',
	},
	{
		title: 'Curd',
		description: '98 kcal - 1 cup',
		icon: '🥛',
		bgColor: 'bg-gray-50',
	},
	{
		title: 'Sprouts',
		description: '62 kcal - 1 cup',
		icon: '🌱',
		bgColor: 'bg-green-50',
	},
	{
		title: 'Khichdi',
		description: '180 kcal - 1 cup',
		icon: '🍲',
		bgColor: 'bg-yellow-100',
	},
	{
		title: 'Auto Measure',
		description: 'Robot Assistant',
		icon: '🦾',
		bgColor: 'bg-slate-50',
	},
	{
		title: 'Sabzi',
		description: '110 kcal - 1 cup',
		icon: '🥬',
		bgColor: 'bg-green-100',
	},
];

export const lowerCards: CardData[] = [
	{
		title: 'Idli',
		description: '35 kcal - 1 piece',
		icon: '🍥',
		bgColor: 'bg-gray-50',
	},
	{
		title: 'Brown Rice',
		description: '216 kcal - 1 cup',
		icon: '🍚',
		bgColor: 'bg-amber-50',
	},
	{
		title: 'Palak Paneer',
		description: '180 kcal - 1 cup',
		icon: '🧀',
		bgColor: 'bg-green-50',
	},
	{
		title: 'Dhokla',
		description: '160 kcal - 2 pieces',
		icon: '🍰',
		bgColor: 'bg-yellow-50',
	},
	{
		title: 'Smart Scanner',
		description: 'AI Analysis',
		icon: '🤖',
		bgColor: 'bg-indigo-50',
	},
	{
		title: 'Buttermilk',
		description: '40 kcal - 1 glass',
		icon: '🥛',
		bgColor: 'bg-blue-50',
	},
	{
		title: 'Auto Calculate',
		description: 'Robot Helper',
		icon: '🦿',
		bgColor: 'bg-violet-50',
	},
	{
		title: 'Mixed Veg Curry',
		description: '135 kcal - 1 cup',
		icon: '🍛',
		bgColor: 'bg-orange-100',
	},
];
