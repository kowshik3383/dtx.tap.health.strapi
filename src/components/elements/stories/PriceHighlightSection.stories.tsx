// PriceHighlightSection.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import PriceHighlightSection from '../PriceHighlightSection';

const meta: Meta<typeof PriceHighlightSection> = {
  title: 'Marketing/PriceHighlightSection',
  component: PriceHighlightSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
_A hero/attention block highlighting app pricing with animated illustration (Lottie mock), stylized title copy, and a price note._

**Edge cases covered below ensure layout and animation are robust for all real-world and broken input scenarios._
        `,
      },
    },
  },
  argTypes: {
    // If PriceHighlightSection allows props, add controls here.
    title: { control: 'text', description: 'Main title text' },
    highlight1: { control: 'text', description: 'First highlight word', if: { arg: 'title' }},
    highlight2: { control: 'text', description: 'Second highlight word', if: { arg: 'title' }},
    priceInfo: { control: 'text', description: 'Price string' },
    animation: { control: false, description: 'Lottie JSON object (mocked)' },
  },
};
export default meta;

type Story = StoryObj<typeof PriceHighlightSection>;

// --- STANDARD STORY ---
export const Default: Story = {
  args: {
    // If PriceHighlightSection takes props, set your standard used values here.
    title: 'The simplest diabetes program',
    highlight1: 'cheapest',
    highlight2: 'safest',
    priceInfo: '₹199 per month on annual plan',
    // animation: [imported mock Lottie json]
  },
};

// --- EDGE CASES ---

// 1. Only one highlight word (second is missing)
export const OneHighlight: Story = {
  name: 'One Highlight Only',
  args: {
    ...Default.args,
    highlight2: '',
  },
};

// 2. No highlights (edge layout—should show plain title)
export const NoHighlights: Story = {
  args: {
    ...Default.args,
    highlight1: '',
    highlight2: '',
  },
};

// 3. Extremely long title text (overflow check)
export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: 'India’s most comprehensive and affordable diabetes digital health subscription—for every stage of life and every lifestyle.',
  },
};

// 4. No price information (should hide or show fallback)
export const NoPrice: Story = {
  name: 'No Price Info',
  args: {
    ...Default.args,
    priceInfo: '',
  },
};

// 5. Animation JSON prop is missing or broken
export const NoAnimation: Story = {
  args: {
    ...Default.args,
    animation: undefined, // If your component takes an animation prop
  },
};

// 6. Animation JSON is empty object (broken file)
export const BrokenAnimation: Story = {
  name: 'Animation is Empty',
  args: {
    ...Default.args,
    animation: {}, // Simulates an invalid or broken Lottie file
  },
};

// 7. All fields empty (pure blank—does component handle well?)
export const EmptySection: Story = {
  name: 'Completely Empty',
  args: {
    title: '',
    highlight1: '',
    highlight2: '',
    priceInfo: '',
    animation: undefined,
  },
};

// 8. Very short text (minimal input)
export const Minimal: Story = {
  name: 'Minimal Input',
  args: {
    title: 'Hi',
    highlight1: '!',
    highlight2: '',
    priceInfo: '₹1',
    animation: undefined,
  },
};

// 9. All valid but with strange unicode
export const WithUnicode: Story = {
  name: 'Unicode Input',
  args: {
    title: '最便宜的糖尿病计划 🌏💪',
    highlight1: '安全',
    highlight2: '24/7',
    priceInfo: '¥299/月',
    animation: undefined,
  },
};

