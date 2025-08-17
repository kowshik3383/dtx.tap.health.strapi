/* eslint-disable @typescript-eslint/no-unused-vars */
// BottomSheet.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import BottomSheet from '../BottomSheet';

/**
 * 👉 Storybook Users:
 *   - Do not use jest.mock or module alias for `next/navigation` if using @storybook/experimental-nextjs-vite + appDirectory: true
 *   - Let the framework inject router context
 *   - If your component also uses an auth or modal hook, either allow it to fallback gracefully, or provide global context/provider in .storybook/preview
 */

const meta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet/BottomSheet Component',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true }, // Ensures App Router context is injected!
    docs: {
      description: {
        component: `
### BottomSheet

A fixed bottom call-to-action component. Shows pricing, period, optional offer text, and "Join Now" (or custom) button.
- Triggers login modal if user not authenticated.
- After login, routes to /plans.
- Visible on mobile and onboarding flows.

Props:
- **price**: string, price display
- **period**: string, billing period
- **buttonText**: main CTA label
- **offerText**: highlighted marketing/campaign ribbon
- **onBottomSheetClick**: callback when CTA pressed
        `,
      },
    },
  },
  argTypes: {
    price: { control: 'text' },
    period: { control: 'text' },
    buttonText: { control: 'text' },
    offerText: { control: 'text' },
    onBottomSheetClick: { action: 'cta clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

// -------- STORIES ---------- //
export const Default: Story = {
  args: {
    price: '₹199',
    period: 'per month',
    buttonText: 'Join now',
    offerText: 'Special Offer: 20% OFF!',
  },
};

export const NoOffer: Story = {
  args: {
    price: '₹499',
    period: 'billed yearly',
    buttonText: 'Subscribe',
    offerText: '',
  },
};

export const CustomButtonText: Story = {
  args: {
    price: '₹149',
    period: 'for 3 months',
    buttonText: 'Unlock Now',
    offerText: 'Limited Time Access',
  },
};

export const DifferentPeriod: Story = {
  args: {
    price: '₹2299',
    period: 'per year',
    buttonText: 'Join Annual Plan',
    offerText: 'Save 35%',
  },
};

export const WithLongOffer: Story = {
  args: {
    price: '₹299',
    period: 'per quarter',
    buttonText: "Let's Go!",
    offerText: '🔥 Summer Deal! Get exclusive access to our premium features. Offer ends soon, act fast!',
  },
};

export const FewerMedsPage: Story = {
  args: {
    price: '₹999',
    period: 'per year',
    buttonText: 'Get Started',
    offerText: 'Fewer Meds, More Moments!',
  },
  parameters: {
    nextjsPath: '/onboarding/fewer_meds_more_moments_new',
  },
};
