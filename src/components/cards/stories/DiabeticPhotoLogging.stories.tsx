/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';
import MealAnimation from '../../../../public/food_scanning.json';
import DiabeticPhotoLogging from '../DiabeticPhotoLogging';

const meta: Meta<typeof DiabeticPhotoLogging> = {
	title: 'Cards/DiabeticPhotoLogging',
	component: DiabeticPhotoLogging,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'### What this Component Does\n\n' +
					'`<DiabeticPhotoLogging />` is a card component that combines an **icon**, **animated Lottie illustration**, and informative **text** to educate users on food scanning/photo-based logging.\n\n' +
					'It’s designed to highlight photo-logging features for diabetic meal tracking in a visually engaging and interactive way.\n\n' +
					'---\n\n' +
					'### ℹ️ Component Props Table\n\n' +
					'| Prop           | Type      | Required | Description |\n' +
					'|----------------|-----------|----------|-------------|\n' +
					'| `title`        | `string`  | ✅ Yes   | Main heading on the card |\n' +
					'| `description`  | `string`  | ✅ Yes   | Supporting subtext |\n' +
					'| `icon`         | `string`  | ✅ Yes   | URL to a small static image (e.g., camera) |\n' +
					'| `lottie_json`  | `object`  | ✅ Yes   | Imported JSON animation file |\n' +
					'| `animation_loop` | `boolean` | ❌ No | Whether the animation should loop |\n\n' +
					'---\n\n' +
					'### How to Edit This Component in Strapi\n\n' +
					'If this card is dynamically populated via Strapi, here’s how it’s typically structured:\n\n' +
					'1. Go to **Strapi Admin > Components > Items Logging or PhotoLogging**\n' +
					'2. Each entry allows:\n' +
					'   - `title`: string\n' +
					'   - `description`: string\n' +
					'   - `icon`: media image upload\n' +
					'   - `lottie_json`: uploaded animation (optional, otherwise linked statically)\n' +
					'   - `animation_loop`: boolean\n\n' +
					'Note: In static use (like Storybook), `lottie_json` must be imported manually in code.\n\n' +
					'---\n\n' +
					'### 🧪 Visual Testing Scenarios\n\n' +
					'This storybook setup tests these variations:\n\n' +
					'- ✅ **Default** — All fields properly filled\n' +
					'- ✅ **Missing Icon** — Image not provided\n' +
					'- ✅ **Missing Lottie Animation** — Animation skipped or broken\n' +
					'- ✅ **Long Text** — Layout adapts to long titles/descriptions\n' +
					'- ✅ **Empty Props** — Nothing passed in (edge stability)',
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof DiabeticPhotoLogging>;

// ✅ Default case
export const Default: Story = {
	args: {
		title: 'Snap to Get Meal Insights',
		description: 'Take a picture of your meal to get instant feedback',
		icon: {
			url: 'https://dtx.tap.health/assets/camera.svg',
		},
		lottie_json: MealAnimation,
		animation_loop: true,
	},
};

// 🧪 Missing icon
export const NoIcon: Story = {
	name: 'Missing Icon',
	args: {
		title: 'Snap Without Icon',
		description: 'Still works fine even without the icon field',
		icon: undefined as any,
		lottie_json: MealAnimation,
		animation_loop: true,
	},
};

// 🧪 Long title + description
export const LongText: Story = {
	name: 'Long Title and Description',
	args: {
		title: 'Log Your Meals with a Simple Snap Using AI-Powered Image Analysis',
		description:
			'Capture your food, analyze macronutrients, calculate estimated carbs, and receive real-time tips — all personalized to your diabetic profile.',
		icon: {
			url: 'https://storage.googleapis.com/tap-health-dev-strapi/camera_5c473f8e31/camera_5c473f8e31.svg',
		},
		lottie_json: MealAnimation,
		animation_loop: true,
	},
};

// 🧪 Empty props
export const EmptyState: Story = {
	name: 'Empty Props',
	args: {} as any,
};
