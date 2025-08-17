import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import FeatureCard from './FeatureCard1';

const meta: Meta<typeof FeatureCard> = {
	title: 'Sections/WhatYouGet',
	component: FeatureCard,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
## 💡 FeatureCard1 Section

The **FeatureCard1** section displays a title and a grid of feature cards (2 per row).

### 🧩 What It Includes

- 📝 Title for the section
- 🃏 Cards rendered in pairs per row
- 🧠 Responsive layout

---

### 📦 Props Structure (from Strapi)

| Prop      | Type   | Description                    |
|-----------|--------|--------------------------------|
| \`title\` | string | Section heading                |
| \`cards\` | Array  | List of card objects           |

---

### 🧪 Variants & Edge Case Coverage

- ✅ Standard with 4 cards
- ✅ Odd number of cards
- ✅ Empty card array
- ✅ No title

        `,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof FeatureCard>;

const mockData: components['schemas']['DynamicZoneWhatYouGetComponent'] = {
	title: `Here's what you get`,
	cards: [
		{
			title: 'Daily meal recommendations',
			description: 'Tailored to your lifestyle',
			image: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_card1_155b06a81a/thumbnail_card1_155b06a81a.webp',
				alternativeText: 'Workout',
			},
		},
		{
			title: 'Easy, guided exercise routine ',
			description: 'Based on your fitness level',
			image: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/card2_b0fb838d30/card2_b0fb838d30.svg',
				alternativeText: 'Nutrition',
			},
		},
		{
			title: 'Medication ',
			description: 'Never miss a dose',
			image: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/card3_16ce471160/card3_16ce471160.svg',
				alternativeText: 'Progress',
			},
		},
		{
			title: 'Instant food scoring ',
			description: 'To count your calories and make better choices',
			image: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_card4_3aec67048e/thumbnail_card4_3aec67048e.webp',
				alternativeText: 'Support',
			},
		},
	],
};

export const Default: Story = {
	name: 'Default - 4 Cards',
	args: mockData,
};

export const OddCards: Story = {
	name: 'Odd Number of Cards',
	args: {
		...mockData,
		cards: mockData?.cards?.slice(0, 3),
	},
};

export const NoCards: Story = {
	name: 'Empty Card Array',
	args: {
		title: 'Features',
		cards: [],
	},
};
