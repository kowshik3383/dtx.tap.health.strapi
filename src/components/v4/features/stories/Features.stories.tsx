import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import Features from '../Features';

const meta: Meta<typeof Features> = {
  title: 'Sections/Features',
  component: Features,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true }, // Ensures App Router context for next/navigation hooks!
    docs: {
      description: {
        component: `
## ✨ Features Component

A stylized Transform Plan box with a feature list, tag, and CTA button.  
Handles login or redirect actions depending on authentication.

> Uses Strapi type: \`DynamicZoneTransformPlanComponent\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Features>;

// Typed mock data
const mockFeatures: components['schemas']['DynamicZoneTransformPlanComponent']['features'] = [
  {
    icon: {
      url: '/assets/v4/icon-check.svg',
      alternativeText: 'Check Icon',
    },
    text_content: [
      { text: 'Personalized', is_bold: true },
      { text: ' plans tailored to your needs.', is_bold: false },
    ],
  },
  {
    icon: {
      url: '/assets/v4/icon-star.svg',
      alternativeText: 'Star Icon',
    },
    text_content: [
      { text: 'Priority access', is_bold: true },
      { text: ' to expert coaches.', is_bold: false },
    ],
  },
];

// Default (everything shown)
export const Default: Story = {
  args: {
    brand_name: 'Tap Health',
    highlighted_title: 'Transform Plan',
    tag_name: 'Most Popular',
    features_title: 'Included Features',
    features: mockFeatures,
    button_text: 'Join Now',
  },
};

// Edge: missing icons on all features
export const MissingIcons: Story = {
  args: {
    ...Default.args,
    features: mockFeatures.map(f => ({
      ...f,
      icon: undefined,
    })),
  },
};

// Edge: empty features array
export const EmptyFeatures: Story = {
  args: {
    ...Default.args,
    features: [],
  },
};
