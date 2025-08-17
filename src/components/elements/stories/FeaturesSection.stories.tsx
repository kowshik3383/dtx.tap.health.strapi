
// FeaturesSection.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import FeaturesSection from '../FeaturesSection';

// -------- META -----------
const meta: Meta<typeof FeaturesSection> = {
  title: 'App/FeaturesSection',
  component: FeaturesSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### FeaturesSection

Lists app or product features in a styled list, optionally with icons.
- Receives features as an array of objects (from Strapi or similar CMS).
- Each feature can provide an icon (with name and url).
- \`title\`: Optional heading above the list.
        `,
      },
    },
  },
  argTypes: {
    features: { control: 'object' },
    title: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof FeaturesSection>;

// --------- DEMO DATA --------

const iconUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg';

const featuresWithIcons = [
  {
    icon: {
      url: iconUrl,
      name: 'SVG icon',
    },
    feature: 'Realtime blood sugar insights',
  },
  {
    icon: {
      url: iconUrl,
      name: 'SVG icon',
    },
    feature: 'Personalized meal plans',
  },
  {
    icon: {
      url: iconUrl,
      name: 'SVG icon',
    },
    feature: '24/7 AI health coach',
  },
];

const featuresWithoutIcons = [
  { feature: 'Realtime blood sugar insights', icon: undefined },
  { feature: 'Daily health reminders', icon: undefined },
  { feature: 'AI-powered chat coaching', icon: undefined },
];

const longListFeatures = Array.from({ length: 10 }).map((_, i) => ({
  feature: `Amazing Feature ${i + 1}`,
  icon: i % 2 === 0
    ? { url: iconUrl, name: `Icon ${i + 1}` }
    : undefined,
}));

// ---------- STORIES ----------

export const WithIcons: Story = {
  args: {
    title: 'All Features (with icons)',
    features: featuresWithIcons,
  },
};

export const WithoutIcons: Story = {
  args: {
    title: 'Features (no icons)',
    features: featuresWithoutIcons,
  },
};

export const Empty: Story = {
  args: {
    title: 'No Features Available',
    features: [],
  },
};

export const LongList: Story = {
  args: {
    title: 'All Features (long list, some with icons)',
    features: longListFeatures,
  },
};
