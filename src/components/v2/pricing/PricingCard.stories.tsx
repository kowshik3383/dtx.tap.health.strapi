'use client';

import { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import PricingCard from './Pricing';

const meta: Meta<typeof PricingCard> = {
  title: 'Sections/PricingCard',
  component: PricingCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What This Component Does\n\n' +
          '`<PricingCard />` displays dynamic pricing options for users to select a subscription plan. It highlights the currently selected plan, offers a Join Now flow, and tracks analytics events.\n\n' +
          '**Key Features:**\n' +
          '- Interactive pricing cards for Monthly/Yearly plans\n' +
          '- Highlighted "Recommended" badge\n' +
          '- Triggers phone login modal if unauthenticated\n' +
          '- Auto-tracks analytics on interactions\n\n' +
          '---\n\n' +
          '### How to Edit in Strapi\n\n' +
          '1. Navigate to the page containing the `DynamicZonePricing2Component`.\n' +
          '2. Modify the following fields:\n' +
          '   - **highlighted_title**: bold text prefix\n' +
          '   - **title_line_1** & **title_line_2**: supporting title text\n' +
          '   - **plans (Relation to Plan)**: add/update `Plan` entries\n' +
          '     - `subscription_plan` (e.g., "Monthly", "Yearly")\n' +
          '     - `price` and `price_per_month`\n' +
          '     - `plan_validity`\n' +
          '     - `recommended` (toggle badge)\n' +
          '     - `save` (optional savings label)\n\n' +
          '> ⚠️ You must have at least one `Plan` record for the pricing card to display.'
      }
    }
  },
  argTypes: {
    highlighted_title: { control: 'text', description: 'Prefix in the heading' },
    title_line_1: { control: 'text' },
    title_line_2: { control: 'text' },
    plans: { control: 'object', description: 'List of subscription plans to show' },
    selectedPlan: { control: 'text' },
    setSelectedPlan: { control: false },
    setJoinNowVisible: { control: false }
  }
};

export default meta;

type Story = StoryObj<typeof PricingCard>;

const basePlans: components['schemas']['Plan'][] = [
  {
    subscription_plan: 'Yearly',
    price: '₹1299',
    price_per_month: '₹199/mo',
    plan_validity: 'Billed every month',
    recommended: false,
    save: '10%',
    theme: 'light',
    title: '',
    position: 'center'
  },
  {
    subscription_plan: 'Yearly',
    price: '₹1299',
    price_per_month: '₹125/mo',
    plan_validity: 'Billed annually',
    recommended: true,
    save: '40%',
    theme: 'light',
    title: '',
    position: 'center'
  }
];

const defaultProps = {
  selectedPlan: 'Yearly',
  setSelectedPlan: () => {},
  setJoinNowVisible: () => {},
};

export const Default: Story = {
  args: {
    ...defaultProps,
    highlighted_title: 'Choose Your Plan',
    title_line_1: 'Affordable pricing for everyone.',
    title_line_2: 'No hidden fees.',
    plans: basePlans
  }
};

export const NoRecommended: Story = {
  args: {
    ...defaultProps,
    highlighted_title: 'No Plan Highlighted',
    title_line_1: 'Try them all.',
    title_line_2: 'Switch anytime.',
    plans: basePlans.map(p => ({ ...p, recommended: false })).filter(Boolean)
  }
};

export const OnlyOnePlan: Story = {
  args: {
    ...defaultProps,
    highlighted_title: 'Solo Plan',
    title_line_1: 'For individuals only.',
    title_line_2: '',
    plans: [basePlans[0]].filter(Boolean)
  }
};

export const LongTitle: Story = {
  args: {
    ...defaultProps,
    highlighted_title: 'Choose a Subscription that',
    title_line_1: 'Matches Your Lifestyle and Health Goals',
    title_line_2: 'Across All Seasons and Services',
    plans: basePlans
  }
};

export const NoSaveLabels: Story = {
  args: {
    ...defaultProps,
    highlighted_title: 'Flexible Plans',
    title_line_1: 'You can cancel anytime.',
    title_line_2: '',
    plans: basePlans.map(p => ({ ...p, save: undefined })).filter(Boolean)
  }
};
