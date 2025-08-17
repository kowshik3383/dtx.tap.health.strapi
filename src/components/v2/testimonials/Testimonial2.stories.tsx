'use client';

import { Meta, StoryObj } from '@storybook/react';
import { testimonials } from './data';
import Testimonial from './Testimonial2';

const meta: Meta<typeof Testimonial> = {
  title: 'Sections/TestimonialCarousel',
  component: Testimonial,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What This Component Does\n\n' +
          '`<Testimonial />` renders a swipeable testimonial carousel with avatars, ratings, quotes, and names.\n\n' +
          '**Key Features:**\n' +
          '- Swipe left/right to navigate (desktop + mobile)\n' +
          '- Touch gestures (via `react-swipeable`)\n' +
          '- Tracks analytics: `testimonial_swipe` via FB Pixel & intent logger\n' +
          '- Responsive layout\n\n' +
          '---\n\n' +
          '### How to Edit Testimonials in Strapi\n\n' +
          'Currently, this component uses **mocked data** (`./data.ts`).\n\n' +
          'To edit via Strapi, follow these steps:\n' +
          '1. Go to **Shared Testimonial** Collection Type.\n' +
          '2. Fields include:\n' +
          '   - `quote` (short title)\n' +
          '   - `description` (optional paragraph)\n' +
          '   - `rating` (number of stars)\n' +
          '   - `avatar` (media)\n' +
          '   - `name`\n' +
          '   - `plan`\n\n' +
          '3. Publish and link the data source in the frontend.\n\n' +
          '> If connecting to Strapi, replace `./data.ts` with API integration.'
      }
    }
  },
};

export default meta;

type Story = StoryObj<typeof Testimonial>;

export const Default: Story = {
  name: 'Default Testimonials',
  render: () => <Testimonial />,
};

export const FewerTestimonials: Story = {
  name: 'Only 1 Testimonial',
  render: () => {
    const original = [...testimonials];
    testimonials.length = 1; // simulate fewer entries
    const Comp = <Testimonial />;
    testimonials.length = original.length; // reset after render
    return Comp;
  }
};



export const NoDescription: Story = {
  name: 'No Descriptions',
  render: () => {
    const original = [...testimonials];
    testimonials.forEach(t => (t.description = ''));
    const Comp = <Testimonial />;
    testimonials.length = original.length; // reset
    return Comp;
  }
};

export const LongDescriptions: Story = {
  name: 'Long Text Testimonials',
  render: () => {
    const original = [...testimonials];
    testimonials.forEach(t => (t.description = 'A very long detailed testimonial that includes more information about the benefits of the program, lifestyle changes, improvements in HbA1c, and overall quality of life after using Tap Health.'));
    const Comp = <Testimonial />;
    testimonials.length = original.length; // reset
    return Comp;
  }
};
