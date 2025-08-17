// filepath: /src/components/v2/fast-results/FastResult1.stories.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import FastResult1 from './FastResult1';

const meta: Meta<typeof FastResult1> = {
	title: 'Sections/FastResult1',
	component: FastResult1,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
## 💡 FastResult1 Section

The **FastResult1** section showcases results through a series of video cards, allowing users to visualize different outcomes based on their health journey.

### 🧩 What It Includes

- 📝 Title and description for the section
- 🎥 A series of **video cards** displayed in a Swiper component
- 📱 Optimized for responsive layouts (mobile/tablet/desktop)

---

### 📦 Props Structure (from Strapi)

| Prop                      | Type       | Description                                                  |
|---------------------------|------------|--------------------------------------------------------------|
| \`title\`                 | string     | Main section heading (e.g., "Your Results")                 |
| \`description\`           | string     | Short section intro text                                     |
| \`results\`              | Array      | List of video cards                                         |
| ↳ \`image.url\`           | string     | Image URL for the card                                       |
| ↳ \`video.url\`           | string     | Video URL for the card                                       |
| ↳ \`title\`               | string     | Title for the video card                                     |

---

### 🧪 Variants & Edge Case Coverage

- ✅ Standard with 3 results
- ✅ Missing video URL (fallback state)
- ✅ All results with titles
- ✅ No results (renders nothing or empty state message)
        `,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof FastResult1>;

const mockData: components['schemas']['DynamicZoneFastResultV2Component'] = {
	title: 'Your Results',
	description: 'See how you can achieve your health goals.',
	results: [
		{
			image: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/result1_6387aa839d/result1_6387aa839d.svg',
			},
			video: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_meal_options_79cbe2089c/dtech25_meal_options_79cbe2089c.mp4',
			},
			title: 'Without strict diet restrictions',
		},
		{
			image: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/dumbell_07560379c1/dumbell_07560379c1.svg',
			},
			video: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_workout_65ca98b631/dtech25_workout_65ca98b631.mp4',
			},
			title: 'Without a hard workout regime',
		},
		{
			image: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/result3_37a3449a1b/result3_37a3449a1b.svg',
			},
			video: {
				url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_photo_logging_4e7469c192/dtech25_photo_logging_4e7469c192.mp4',
			},
			title: 'Without expensive coaching subscription',
		},
	],
};

export const Default: Story = {
	name: 'Default - 3 Results',
	args: mockData,
};

export const MissingVideo: Story = {
	name: 'Missing Video URL',
	args: {
		...mockData,
		results: [
			{
				image: {
					url: '/assets/result1.svg',
				},
				video: {
					url: undefined as any, // simulate video field not being set
				},
				title: 'Without strict diet restrictions',
			},
		],
	},
};

export const NoResults: Story = {
	name: 'No Results_',
	args: {
		title: 'Your Results',
		description: 'No results available yet.',
		results: [],
	},
};
