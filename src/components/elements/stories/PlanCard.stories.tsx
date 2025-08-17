// PlanCard.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { Variants } from 'framer-motion';
import PlanCard from '../PlanCard';

// (No mocking needed. framer-motion motion.* just works in Storybook.)

const meta: Meta<typeof PlanCard> = {
  title: 'Pricing/PlanCard',
  component: PlanCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**PlanCard**

A styled, animated subscription or plan card.
- Animates in (slide/fade) on scroll into view.
- Supports title, price, subtitle.
- Variants for text and highlight animation with Framer Motion.

Props:
- \`title\`: Plan title (required)
- \`subtitle\`: Plan subtitle (optional)
- \`price\`: Display price (optional)
- \`className\`: Optional custom classes
- \`cardVariants\`, \`textVariants\`, \`highlightVariants\`: Framer-motion animation configs (advanced/customization)
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    price: { control: 'text' },
    className: { control: 'text' },
    cardVariants: { control: false },
    textVariants: { control: false },
    highlightVariants: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof PlanCard>;

// ----- STORIES -----

export const Default: Story = {
  args: {
    title: 'Annual Plan',
    subtitle: 'Best Value',
    price: '₹2,399/year',
  },
};

export const WithSubtitleAndPrice: Story = {
  args: {
    title: 'Quarterly Plan',
    subtitle: 'Most Flexible',
    price: '₹799/3 months',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Premium',
    subtitle: '',
    price: '',
  },
};

export const OnlyPrice: Story = {
  args: {
    title: '',
    subtitle: '',
    price: '₹299/month',
  },
};

export const CustomVariants: Story = {
  args: {
    title: 'Plan with Springy Animation',
    subtitle: 'Attention Grabbing!',
    price: '₹1,499',
    cardVariants: {
      hidden: { opacity: 0, scale: 0.8, rotate: -8 },
      visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 120, damping: 11 },
      },
    } as Variants,
    highlightVariants: {
      hidden: { opacity: 0.8, scale: 0.7 },
      visible: {
        opacity: 1,
        scale: 1.1,
        transition: { repeat: Infinity, repeatType: 'reverse', duration: 0.8, ease: 'easeInOut' },
      },
    } as Variants,
  },
};

export const LoadingState: Story = {
  args: {
    title: '',
    subtitle: 'Loading...',
    price: '',
  },
};

