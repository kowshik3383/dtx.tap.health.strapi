
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import BottomSheet from './BottomSheet';

/**
 * If your BottomSheet depends on Next.js navigation, auth, or analytics,
 * use module aliasing or `parameters.nextjs: { appDirectory: true }` in Storybook.
 * 
 * All interactions shown here are handled by Storybook args/parameters, no context or decorator hacks.
 */

const meta: Meta<typeof BottomSheet> = {
  title: 'Pricing/BottomSheetV4',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true },    // <-- this is the only Next-specific param you need
    docs: {
      description: {
        component: `
**BottomSheet (V4 desktop sticky)**  
- Sticky at top when scrolling, absolute in middle of page by default  
- Shows offer message, MRP, discounted price, "per" text, and CTA  
- Handles login modal on click if not authenticated  
- Fully interactive, all navigation/auth/analytics are mocked by module alias or safe defaults.

This story has **no React context** and **no Storybook decorators**—only props and Storybook's built-in Next.js support.
        `,
      },
    },
  },
  argTypes: {
    join_message: { control: 'text' },
    mrp: { control: 'text' },
    discounted_price: { control: 'text' },
    per_tag: { control: 'text' },
    buttonText: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    join_message: "Join India's most trusted diabetes care, at a special offer price!",
    mrp: '₹3,999',
    discounted_price: '₹2,399',
    per_tag: 'per year',
    buttonText: 'Join Now',
  },
};

export const PerMonth: Story = {
  args: {
    join_message: 'Start your journey for less.',
    mrp: '₹699',
    discounted_price: '₹399',
    per_tag: 'per month',
    buttonText: 'Unlock Offer',
  },
};

export const WithLongMessage: Story = {
  args: {
    join_message:
      'Special limited time: Valid on annual plans for the first 50 members! Try now and get access to expert care and AI-powered advice at an unbeatable price.',
    mrp: '₹5,999',
    discounted_price: '₹2,999',
    per_tag: 'per year',
    buttonText: 'Get Started',
  },
};

export const NoStrikethrough: Story = {
  args: {
    join_message: 'Try Tap Health risk-free!',
    mrp: '',
    discounted_price: '₹249',
    per_tag: 'per month',
    buttonText: 'Join Tap Health',
  },
};

export const AlreadyLoggedIn: Story = {
  args: {
    join_message: 'Welcome back, member! Continue enjoying your benefits.',
    mrp: '₹900',
    discounted_price: '₹500',
    per_tag: 'per quarter',
    buttonText: 'Go to plans',
  },
  parameters: {
    auth: {
      login: (t: string) => { console.log('[MOCK LOGIN]', t); },
      isAuthenticated: true,
    },
  },
};
