'use client';

import { Meta, StoryObj } from '@storybook/react';
import GlucoseTracking from '../GlucoseTracking';

const meta: Meta<typeof GlucoseTracking> = {
  title: 'cards/GlucoseTracking',
  component: GlucoseTracking,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What This Component Does\n\n' +
          '`<GlucoseTracking />` is a visually rich card component that helps users understand their glucose patterns.\n\n' +
          '**Key Features:**\n' +
          '- Displays a **title** and **subtitle** at the top of the card for quick context\n' +
          '- Renders a **graphical image** (typically a glucose chart or trend line)\n' +
          '- Applies a subtle **bottom gradient** overlay to enhance aesthetics\n\n' +
          'This is commonly used on landing pages, app dashboards, or onboarding flows to give users insights into their glucose monitoring journey.\n\n' +
          '---\n\n' +
          '### How to Edit in Strapi\n\n' +
          '1. Navigate to the page containing the `DynamicZoneGlucoseTrackingComponent`.\n' +
          '2. Update the following fields:\n' +
          '   - **`title`** (Text): Heading displayed on the card\n' +
          '   - **`sub_title`** (Text): Description or supplementary text\n' +
          '   - **`image`** (Media): Upload a chart or graph image\n' +
          '3. Save and publish your changes.\n\n' +
          '> ✅ Tip: Use images with transparent backgrounds or SVGs for best results in UI.\n',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Title of the glucose tracking section.',
      control: 'text',
    },
    sub_title: {
      description: 'Subtitle under the title.',
      control: 'text',
    },
    image: {
      description: 'Media image object with url and alt text.',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof GlucoseTracking>;

const sampleImage = (url: string, alternativeText = 'Graph') => ({
  url,
  alternativeText,
});

export const Default: Story = {
  args: {
    title: 'Glucose Trends',
    sub_title: 'Visualize your sugar levels effortlessly',
    image: sampleImage('https://placehold.co/400x200/png'),
  },
};

export const NoImage: Story = {
  args: {
    title: 'Graph Not Available',
    sub_title: 'No image uploaded in CMS',
// @ts-expect-error intentionally null
    image: null, 
  },
};

export const EmptyText: Story = {
  args: {
    title: '',
    sub_title: '',
    image: sampleImage('https://placehold.co/400x200/png', 'Fallback Chart'),
  },
};

export const LongText: Story = {
  args: {
    title: 'Continuous Glucose Monitoring for Diabetes Management and Trend Visualization Over 7 Days',
    sub_title: 'Track and monitor your blood sugar level changes with accurate visual analytics and AI insights.',
    image: sampleImage('https://placehold.co/400x200/png'),
  },
};

export const BrokenImageUrl: Story = {
  args: {
    title: 'Faulty Image Source',
    sub_title: 'Should gracefully handle broken image URLs',
    image: sampleImage('/nonexistent/image.png'),
  },
};