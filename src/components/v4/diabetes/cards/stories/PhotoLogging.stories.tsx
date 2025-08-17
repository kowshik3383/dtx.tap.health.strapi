'use client';

import { Meta, StoryObj } from '@storybook/react';
import PhotoLogging from '../PhotoLogging';

const meta: Meta<typeof PhotoLogging> = {
	title: 'cards/PhotoLogging',
	component: PhotoLogging,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'### What This Component Does\n\n' +
					'`<PhotoLogging />` highlights a dual interaction method — **camera logging** and **voice input** — to help users record their meals.\n\n' +
					'**Key Features:**\n' +
					'- Card with a camera icon and instructions (title + description)\n' +
					'- Voice input button styled as a circular mic\n' +
					'- Optionally supports dynamic images and text\n\n' +
					'---\n\n' +
					'### How to Edit in Strapi\n\n' +
					'1. Locate the `DynamicZoneDataLoggingComponent`.\n' +
					'2. Update the following fields:\n' +
					'   - `title` (Text): Heading at the top of the card\n' +
					'   - `sub_title` (Text): Subtext under the heading\n' +
					'   - `card.image` (Media): Icon inside the left box\n' +
					'   - `card.title` (Text): Main CTA like “Take a photo of your meal”\n' +
					'   - `card.description` (Text): Subtext for the CTA\n' +
					'   - `image` (Media): Voice mic icon on the right\n\n' +
					'> 🧠 Best used in food tracking, journaling, or logging workflows.\n',
			},
		},
	},
	argTypes: {
		title: {
			description: 'Main title shown at the top.',
			control: 'text',
		},
		sub_title: {
			description: 'Optional subtitle shown below the title.',
			control: 'text',
		},
		card: {
			description: 'Inner left card with icon, title, and description.',
			control: 'object',
		},
		image: {
			description: 'Right-side mic image for voice logging.',
			control: 'object',
		},
	},
};

export default meta;

type Story = StoryObj<typeof PhotoLogging>;

const media = (url: string) => ({ url });

export const Default: Story = {
	args: {
		title: 'Smart Meal Logging',
		sub_title: 'Choose how you want to record your meals',
		card: {
			image: media('/assets/v4/foodscanning.svg'),
			title: 'Snap your meal',
			description: 'Well estimate calories and nutrients',
		},
		image: media('/assets/v4/mic.svg'),
	},
};

export const NoVoiceImage: Story = {
	args: {
		title: 'Photo-Only Logging',
		sub_title: 'Mic button hidden (image missing)',
		card: {
			image: media('/assets/v4/foodscanning.svg'),
			title: 'Click your food photo',
			description: 'Well analyze your plate',
		},

		image: {
			url:''
		},
	},
};

export const EmptyCardFields: Story = {
	args: {
		title: 'Empty Card Test',
		sub_title: 'Missing title + description in card',
		card: {
			image: media('/assets/v4/foodscanning.svg'),
			title: '',
			description: '',
		},
		image: media('/assets/v4/mic.svg'),
	},
};

export const BrokenAssets: Story = {
	args: {
		title: 'Broken Asset URLs',
		sub_title: 'Should gracefully fallback or not crash',
		card: {
			image: media('/broken/food.svg'),
			title: 'Take a snap',
			description: 'Broken asset scenario',
		},
		image: media('/broken/mic.svg'),
	},
};
