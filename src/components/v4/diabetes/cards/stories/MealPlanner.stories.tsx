'use client';

import { Meta, StoryObj } from '@storybook/react';
import type { components } from '@/types/strapi';
import MealPanner from '../MealPanner';

const meta: Meta<typeof MealPanner> = {
	title: 'cards/MealPlanner',
	component: MealPanner,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'### What This Component Does\n\n' +
					'`<MealPlanner />` is a horizontally scrolling animated meal suggestion carousel.\n\n' +
					'**Key Features:**\n' +
					'- Title and subtitle for context\n' +
					'- Continuously scrolling **marquee effect** powered by Framer Motion\n' +
					'- Each meal card includes:\n' +
					'  - A circular image\n' +
					'  - Meal title\n' +
					'  - Description or calorie value\n\n' +
					'---\n\n' +
					'### How to Edit in Strapi\n\n' +
					'1. Navigate to the page using `DynamicZoneMealPlannerComponent`.\n' +
					'2. You can configure:\n' +
					'   - `title` (Text)\n' +
					'   - `sub_title` (Text)\n' +
					'   - `cards` (Repeatable component): each includes\n' +
					'     - `image` (Media)\n' +
					'     - `title` (Text)\n' +
					'     - `description` (Text or Calories info)\n\n' +
					'> 💡 Use optimized SVG or WebP images for smooth animations.',
			},
		},
	},
	argTypes: {
		title: {
			description: 'Main title shown above the meal carousel.',
			control: 'text',
		},
		sub_title: {
			description: 'Subtitle shown under the main title.',
			control: 'text',
		},
		cards: {
			description:
				'Array of meal cards, each with an image, title, and description.',
			control: 'object',
		},
	},
};

export default meta;

type Story = StoryObj<typeof MealPanner>;
interface image_ {
	url: string;
}
const sampleCard = (image: image_, title: string, description: string) => ({
	image,
	title,
	description,
});

const sampleCards: components['schemas']['SharedGridimageFeatureComponent'][] =
	[
		sampleCard(
			{ url: '/assets/v4/meal1.svg' },
			'1x Besan Chilla',
			'180 kcal',
		),
		sampleCard(
			{ url: '/assets/v4/diet1.svg' },
			'1x Moong Dal Chaat',
			'200 kcal',
		),
		sampleCard(
			{ url: '/assets/v4/meal2.svg' },
			'1x Puri with Aloo Poori',
			'280 kcal',
		),
	];

export const Default: Story = {
	args: {
		title: 'Today’s Meal Plan',
		sub_title: 'Curated with diabetic-friendly options',
		cards: sampleCards,
	},
};

export const NoCards: Story = {
	args: {
		title: 'Empty Meals',
		sub_title: 'No cards available in CMS',
		cards: [],
	},
};

export const LongTextCards: Story = {
	args: {
		title: 'Extended Meal Recommendations',
		sub_title: 'For high-calorie energy intake days',
		cards: [
			sampleCard(
				{ url: '/assets/v4/meal2.svg' },
				'Super Energizing Lentil Mix with Chia and Organic Greens',
				'Approx. 450 kcal with added fiber and protein',
			),
		],
	},
};

export const BrokenImageURL: Story = {
	args: {
		title: 'Broken Image Meals',
		sub_title: 'Image path does not resolve correctly',
		cards: [
			sampleCard(
				{ url: '/broken/path.svg' },
				'Broken Meal Card',
				'123 kcal',
			),
		],
	},
};
