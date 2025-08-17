import type { Meta, StoryObj } from '@storybook/react';
import HeroSecondary from './HeroSecondary';

const meta: Meta<typeof HeroSecondary> = {
	title: 'Components/Layout/HeroSecondary',
	component: HeroSecondary,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof HeroSecondary>;

export const Default: Story = {
	args: {
		logo: {
			url: 'https://dtx.tap.health/assets/logo.svg',
		},
		titlePrimary: 'Less medicines.',
		titleSecondary: 'More sugar control',
		description: '8 out of 10 Tap Health users saw',
		highlightedDescription: '₹199/mo',
	},
};

export const WithImage: Story = {
	args: {
		logo: {
			url: 'https://dtx.tap.health/assets/logo.svg',
		},
		titlePrimary: 'Less medicines.',
		titleSecondary: 'More sugar control',
		description: '8 out of 10 Tap Health users saw',
		highlightedDescription: '₹199/mo',
		image: {
			url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_Man_in_50s_1_2af0e1ff65/thumbnail_Man_in_50s_1_2af0e1ff65.png',
			name: 'thumbnail_Man_in_50s_1_2af0e1ff65',
		},
	},
};

export const WithAlternativeTitles: Story = {
	args: {
		logo: {
			url: 'https://dtx.tap.health/assets/logo.svg',
		},
		line1: 'Your Health',
		line2: 'Your Way',
		description: 'Customized plans that adapt to your lifestyle and needs',
		image: {
			url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_Man_in_50s_1_2af0e1ff65/thumbnail_Man_in_50s_1_2af0e1ff65.png',
			name: 'thumbnail_Man_in_50s_1_2af0e1ff65',
		},
	},
};
