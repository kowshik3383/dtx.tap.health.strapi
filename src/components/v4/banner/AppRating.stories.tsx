'use client';

import { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import AppRating from './AppRating';

const meta: Meta<typeof AppRating> = {
	title: 'Sections/AppRating',
	component: AppRating,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'### What This Component Does\n\n' +
					'`<AppRating />` displays app rating slides (usually star ratings) dynamically in a swiper format. It supports both App Store and Play Store ratings.\n\n' +
					'---\n\n' +
					'### How to Edit in Strapi\n\n' +
					'1. Go to the page with the `DynamicZoneAppRatingComponent`.\n' +
					'2. Add objects to the `ratings` array with:\n' +
					'   - `stars` (number of stars, e.g., 4, 5)\n' +
					'   - `rating_value` (e.g., 4.9)\n' +
					'   - `label` (e.g., "App Store" or "Play Store")\n\n' +
					'> 🚀 Useful for boosting trust with mobile app ratings.',
			},
		},
	},
	argTypes: {
		ratings: {
			control: 'object',
			description: 'List of app ratings with stars, label, and value.',
		},
	},
};

export default meta;

type Story = StoryObj<typeof AppRating>;

const baseRatings: components['schemas']['SharedAppRatingComponent'][] = [
	{
		stars: 5,
		rating_value: 4.9,
		label: 'App Store',
	},
	{
		stars: 5,
		rating_value: 5.0,
		label: 'Play Store',
	},
];

export const Default: Story = {
	args: {
		ratings: baseRatings,
	},
};

export const SingleRating: Story = {
	args: {
		ratings: [
			baseRatings[0] || {
				stars: 5,
				rating_value: 4.9,
				label: 'App Store',
			},
		],
	},
};

export const NoStars: Story = {
	args: {
		ratings: [
			{
				stars: 0,
				rating_value: 4.0,
				label: 'Play Store',
			},
		],
	},
};

export const ManyRatings: Story = {
	args: {
		ratings: Array.from({ length: 8 }).map((_, i) => ({
			stars: 5,
			rating_value: 4.8,
			label: i % 2 === 0 ? 'App Store' : 'Play Store',
		})),
	},
};

export const EmptyState: Story = {
	args: {
		ratings: [],
	},
};
