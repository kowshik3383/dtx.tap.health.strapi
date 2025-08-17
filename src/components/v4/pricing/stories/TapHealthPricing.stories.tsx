'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import PricingSection from '../PricingSection';
// If you have a PricingSectionDesktop.story.tsx, keep title: 'Sections/PricingSection' unique!

const meta: Meta<typeof PricingSection> = {
	title: 'Sections/PricingSection',
	component: PricingSection,
	tags: ['autodocs'],
	parameters: {
		nextjs: { appDirectory: true }, // App Router context!
		docs: {
			description: {
				component: `
### PricingSection

A mobile/desktop adaptive pricing section with:
- Overlapping highlighted plan cards
- "Most Popular" highlighting
- CTA that opens login modal (if not authenticated; redirects otherwise)
- Uses \`useRouter\`, \`useAuth\`, and analytics as in app

No manual mocks or jest needed. Add context provider in \`.storybook/preview.tsx\` if you use a custom auth hook.
        `,
			},
		},
	},
	argTypes: {
		title_line_1: { control: 'text' },
		title_line_2: { control: 'text' },
		popular_plan_message: { control: 'text' },
		plans: { control: 'object' },
	},
};
export default meta;
type Story = StoryObj<typeof PricingSection>;

// --- DEMO Data for Strapi Plans ---

const mockPlan = (
	overrides?: Partial<components['schemas']['Plan']>,
): components['schemas']['Plan'] => ({
	id: overrides?.id ?? Math.floor(Math.random() * 1000000), // <-- Fix here
	recommended: false,
	price: '₹2399',
	mrp: '₹3599',
	subscription_plan: 'Yearly',
	subscription_plan2: 'Annual',
	plan_message: 'Best for long-term care',
	price_per_month_v2: 'Just ₹200/month',
	save: 'Save 34%',
  title:overrides?.title ?? '',
	...overrides,
	position: overrides?.position ?? 'center',
	theme: overrides?.theme ?? 'light',
});

const demoPlans: components['schemas']['Plan'][] = [
	mockPlan({
		id: 0,
		subscription_plan: 'Quarterly',
		subscription_plan2: '3 Months',
		price: '₹699',
		mrp: '₹999',
		plan_message: 'Try our program, risk-free',
		price_per_month_v2: 'Just ₹230/month',
		save: 'Save 20%',
		recommended: false,
	}),
	mockPlan({
		id: 1,
		subscription_plan: 'Quarterly',
		subscription_plan2: '1 Year',
		price: '₹2399',
		mrp: '₹3599',
		plan_message: 'Best value',
		price_per_month_v2: 'Just ₹200/month',
		save: 'Save 34%',
		recommended: true,
	}),
	mockPlan({
		id: 2,
		subscription_plan: 'Half-Yearly',
		subscription_plan2: '6 Months',
		price: '₹1299',
		mrp: '₹1999',
		plan_message: 'Most flexible',
		price_per_month_v2: 'Just ₹216/month',
		save: 'Save 20%',
		recommended: false,
	}),
];

// --- STORIES ---

// Standard 3-plan setup, one recommended, all visual fields
export const Default: Story = {
	args: {
		title_line_1: 'Get started with expert diabetes care',
		title_line_2: 'Flexible plans for everyone',
		plans: demoPlans,
		popular_plan_message:
			'Most members choose Annual Plan for the best value.',
	},
};

// Only one plan (should center in layout)

// No recommended plan (highlight gone)
export const NoRecommended: Story = {
	args: {
		...Default.args,
		plans: demoPlans.map(plan => ({ ...plan, recommended: false })),
		popular_plan_message: 'No plan highlighted as most popular.',
	},
};

// Some plans with missing values

// No plans (should show empty UI gracefully)
export const EmptyPlans: Story = {
	args: {
		title_line_1: 'No pricing available',
		title_line_2: '',
		plans: [],
		popular_plan_message: '',
	},
};

/**
 * # If you use a custom Auth context/useAuth for login status and want interactive login/redirect testing:
 * Provide a stub/provider in .storybook/preview.tsx. E.g.:
 *
 * // .storybook/preview.tsx
 * import { AuthProvider } from '@/hooks/useAuth';
 * export const decorators = [
 *   (Story) => <AuthProvider value={{ login: () => {}, isAuthenticated: false }}>{Story()}</AuthProvider>,
 * ];
 *
 * Or make your hook fallback gracefully for SB.
 */
