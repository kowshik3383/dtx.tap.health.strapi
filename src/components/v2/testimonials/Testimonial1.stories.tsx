'use client';

import { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import Testimonial1 from './Testimonial1';

export type Testimonial = components['schemas']['TestimonialV2'];

const meta: Meta<typeof Testimonial1> = {
  title: 'Sections/Testimonial1',
  component: Testimonial1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### What this Component Does

\`<Testimonial1 />\` displays a **horizontal swipeable carousel** of user testimonials.

It supports:

- Mobile & desktop responsive layout
- Star ratings
- Avatar, name, plan, quote, and testimonial
- Swipe gestures (left/right) + Facebook Pixel + intent tracking

---

### How to Edit Testimonials in Strapi

1. Go to **Collection Types > TestimonialV2**
2. Each entry has fields for:
   - \`image\` (testimonial banner image)
   - \`avatar\` (user profile)
   - \`name\` (user’s name)
   - \`plan\` (e.g. "Basic", "Premium")
   - \`quote\` (highlighted short line)
   - \`description\` (detailed testimonial)
   - \`rating\` (number of stars 1–5)

3. To display testimonials on a page:
   - Go to the page's **Dynamic Zone**
   - Insert a **Testimonial1** section
   - Select the related \`TestimonialV2\` items

✅ Save and Publish. Changes reflect live.
        `,
      },
    },
  },
  argTypes: {
    tag: { control: 'text' },
    title_line_1: { control: 'text' },
    title_line_2: { control: 'text' },
    testimonial_v_2s: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof Testimonial1>;

// ✅ Matches full structure of Strapi Media
const mockMedia = (url: string): NonNullable<Testimonial['image']> => ({
  id: 1,
  url,
  name: '',
  alternativeText: '',
  caption: '',
  width: 300,
  height: 200,
  size: 1,
  mime: 'image/jpeg',
  provider: 'local',
  provider_metadata: null,
  formats: undefined,
  createdAt: '',
  updatedAt: '',
});

const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aarav Mehta',
    plan: 'Premium Plan',
    quote: 'Feeling lighter, healthier, and more confident!',
    description:
      'I was skeptical at first, but after 2 months my HbA1c dropped. The support was top-notch.',
    image: mockMedia('/assets/v2/testimonial-bg-1.jpg'),
    avatar: mockMedia('/assets/v2/avatar-1.jpg'),
    rating: 5,
  },
  {
    id: 2,
    name: 'Sneha Reddy',
    plan: 'Standard Plan',
    quote: 'Finally found a system that works!',
    description:
      'I’ve tried so many plans before. This one helped me reduce my sugar spikes without stress.',
    image: mockMedia('/assets/v2/testimonial-bg-2.jpg'),
    avatar: mockMedia('/assets/v2/avatar-2.jpg'),
    rating: 4,
  },
];

export const Default: Story = {
  args: {
    tag: 'Success Stories',
    title_line_1: 'Real People',
    title_line_2: 'Real Results',
    testimonial_v_2s: sampleTestimonials,
  },
};



export const NoTestimonials: Story = {
  args: {
    tag: 'Oops!',
    title_line_1: 'No Testimonials',
    title_line_2: 'Yet',
    testimonial_v_2s: [],
  },
};

export const ManyTestimonials: Story = {
  args: {
    tag: 'Happy Users',
    title_line_1: 'They Loved It',
    title_line_2: 'You Will Too',
    testimonial_v_2s: Array.from({ length: 6 }).map((_, i) => ({
      id: i + 10,
      name: `User ${i + 1}`,
      plan: i % 2 === 0 ? 'Premium' : 'Basic',
      quote: `This plan changed my life ${i + 1}`,
      description: 'Highly structured and easy to follow. Worked like magic.',
      image: mockMedia('/assets/v2/testimonial-bg-1.jpg'),
      avatar: mockMedia('/assets/v2/avatar-1.jpg'),
      rating: 4 + (i % 2),
    })),
  },
};
