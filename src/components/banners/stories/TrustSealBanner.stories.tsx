'use client';

import { Meta, StoryObj } from '@storybook/react';

import { components } from '@/types/strapi';
import TrustSealBanner from '../TrustSealBanner';

const meta: Meta<typeof TrustSealBanner> = {
	title: 'Banners/TrustSealBanner',
	component:TrustSealBanner,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'### What this Component Does\n\n' +
					'`<TrustSealBanner />` displays a row of **trust badges** or **seals** with:\n\n' +
					'- Logos (e.g., Google Play, ET Awards)\n' +
					'- Star ratings (e.g., ★★★★★)\n' +
					'- Optional ratings text (like "4.9/5")\n' +
					'- Optional supporting text (like "Designed by Endocrinologists")\n\n' +
					'It is typically used to **boost user trust** on landing pages or conversion sections.\n\n' +
					'---\n\n' +
					'### How to Edit Seals in Strapi\n\n' +
					'1. Go to the **Shared Trusted Seal Component** content type.\n' +
					'2. Each entry allows you to:\n' +
					'   - Upload a **logo** (`Media`)\n' +
					'   - Set a **star count** (`Number`)\n' +
					'   - Add a **rating label** (e.g., “4.9/5”)\n' +
					'   - Add **first and second line text** (optional)\n\n' +
					'3. This component expects an **array** of such seals from Strapi (called `trusted_seals`).\n\n' +
					'Preview changes live via Storybook when connected to real or mocked data.',
			},
		},
	},
	argTypes: {
		trusted_seals: {
			description:
				'Array of trust seal objects, each with logo, star count, rating text, and optional supporting text.',
			control: { type: 'object' },
		},
	},
};

export default meta;

type Story = StoryObj<typeof TrustSealBanner>;

const sampleLogo = (url: string, name = 'Seal') => ({ url, name });

const DefaultData: components['schemas']['SharedTrustedSealComponent'][] = [
	{
		logo: sampleLogo('https://storage.googleapis.com/tap-health-dev-strapi/googleplay_logo_5374c7d686/googleplay_logo_5374c7d686.svg', 'Google Play'),
		stars: 5,
		rating: '4.9/5',
		first_line_text: '',
		second_line_text: '',
	},
	{
		logo: sampleLogo('https://storage.googleapis.com/tap-health-dev-strapi/et_0613349a13/et_0613349a13.svg', 'ET Award'),
		stars: 4,
		rating: '4.5/5',
		first_line_text: 'ET',
		second_line_text: 'Award Winner',
	},
	{
		logo: sampleLogo('https://storage.googleapis.com/tap-health-dev-strapi/avatar_85a3cee018/avatar_85a3cee018.svg', 'Designed By'),
		stars: 4,
		rating: '4.8/5',
		first_line_text: 'Designed by',
		second_line_text: 'Endocrinologists',
	},
];

export const Default: Story = {
	args: {
		trusted_seals: DefaultData,
	},
};

export const OnlyLogos: Story = {
	args: {
		trusted_seals: DefaultData.map(seal => ({
			logo: seal.logo,
		})),
	},
};

export const LogosAndStars: Story = {
	args: {
		trusted_seals: DefaultData.map(seal => ({
			logo: seal.logo,
			stars: 5,
		})),
	},
};

export const LogosAndText: Story = {
	args: {
		trusted_seals: DefaultData.map(seal => ({
			logo: seal.logo,
			first_line_text: seal.first_line_text,
			second_line_text: seal.second_line_text,
		})),
	},
};

export const EmptyState: Story = {
	args: {
		trusted_seals: [],
	},
};

export const ManySeals: Story = {
	args: {
		trusted_seals: Array.from({ length: 10 }).map((_, i) => ({
			logo: sampleLogo('https://storage.googleapis.com/tap-health-dev-strapi/avatar_85a3cee018/avatar_85a3cee018.svg', `Seal ${i + 1}`),
			stars: 5,
			rating: '4.9/5',
			first_line_text: `Partner ${i + 1}`,
			second_line_text: `Award ${i + 1}`,
		})),
	},
};


