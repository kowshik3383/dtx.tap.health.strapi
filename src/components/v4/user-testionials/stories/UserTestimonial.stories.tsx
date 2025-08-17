/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// UserTestimonial.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import UserTestimonial from '../UserTestimonial';

/**
 * IMPORTANT: 
 * Do NOT jest.mock or alias any module in this file.
 * For modules like 'next/image', 'lucide-react', or 'swiper/react',
 * use a mock file and alias in your Storybook config (see bottom for details).
 */

// ------- Correct type-rich image mock --------
const mockImage = (url: string, name: string = '') => ({
  url,
  name,
  id: 1,
  documentId: undefined,
  alternativeText: '',
  caption: '',
  width: 256,
  height: 256,
  formats: undefined,
  hash: '',
  ext: '',
  mime: '',
  size: 0,
  previewUrl: '',
  provider: '',
  provider_metadata: undefined,
  createdAt: '',
  updatedAt: '',
  localizations: [],
});

// ------------ DEMO DATA ------------
const demoCategories = [
  { label: 'Fastest Blood Sugar', value: '80mg/dL' },
  { label: 'HbA1c', value: '0.7%' },
];

const demoTestimonials = [
  {
    id: 1,
    name: 'Arvind',
    age: 49,
    location: 'Chennai',
    testimony: 'From an HbA1c...',
    fastest_blood_sugar: '64mg/dL',
    hba1c: '1.3%',
    rating: 5,
    image: mockImage('https://randomuser.me/api/portraits/men/45.jpg', 'Arvind'),
  },
  {
    id: 2,
    name: 'Shreya',
    age: 34,
    location: 'Pune',
    testimony: 'My fasting sugar dropped...',
    fastest_blood_sugar: '54mg/dL',
    hba1c: '1.0%',
    rating: 4,
    image: mockImage('https://randomuser.me/api/portraits/women/35.jpg', 'Shreya'),
  },
  {
    id: 3,
    name: 'Dinesh',
    age: 52,
    location: 'Delhi',
    testimony: 'The support group and daily...',
    fastest_blood_sugar: '62mg/dL',
    hba1c: '1.1%',
    rating: 5,
    // Omit image property entirely if none (not image: undefined!)
  } as any,
  {
    id: 4,
    name: 'Sana',
    age: 40,
    location: 'Bangalore',
    testimony: 'As someone with PCOS and T2...',
    fastest_blood_sugar: '48mg/dL',
    hba1c: '0.8%',
    rating: 5,
    image: mockImage('https://randomuser.me/api/portraits/women/85.jpg', 'Sana'),
  },
];

const meta: Meta<typeof UserTestimonial> = {
  title: 'Marketing/UserTestimonial',
  component: UserTestimonial,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Showcases testimonials with category selector, Swiper, ratings, expand/collapse, and all types are mocked for Storybook safety.

*If you use next/image/lucide-react/swiper, mock in your Storybook config, not here!*
        `,
      },
    },
  },
  argTypes: {
    highlighted_title1: { control: 'text' },
    highlighted_title2: { control: 'text' },
    sub_title: { control: 'text' },
    testimonials: { control: 'object' },
    categories: { control: 'object' },
  }
};
export default meta;
type Story = StoryObj<typeof UserTestimonial>;

// ----------- STORIES --------------

export const Default: Story = {
  args: {
    highlighted_title1: 'Patients see control',
    highlighted_title2: 'in just 2-4 weeks',
    sub_title:
      "Real results from real users—life with fewer medicines and more celebration. Quick wins, better sugar, real-life support.",
    categories: demoCategories,
    testimonials: demoTestimonials,
  },
};

export const OnlyOneCategory: Story = {
  args: {
    ...Default.args,
    categories: [{ label: 'Fastest Blood Sugar', value: '82mg/dL' }],
  },
};

export const SingleTestimonial: Story = {
  args: {
    ...Default.args,
    testimonials: [demoTestimonials[0]],
  },
};

export const LongTestimonial: Story = {
  args: {
    ...Default.args,
    testimonials: [
      {
        ...demoTestimonials[0],
        testimony:
          `From an HbA1c of 9.4 to 7.1 in just 3 months. I was skeptical, but... Tap Health was my missing link: more guidance, less guesswork, doctor-led support, and super easy meal tips. My sugar is now less spike-y! The reminders and coach chat make it truly easy to stick to this path. My family loves our new walks after dinner!
          ...and the support goes on. If you’re tired of up-and-down sugars and worrying about "cheating" on food, I’d say just give this a try. I’m more confident with my meals, my numbers make my doctor smile, and I even signed up for their peer group!`
      },
    ]
  },
};

export const NoImages: Story = {
  args: {
    ...Default.args,
    testimonials: demoTestimonials.map(({ image, ...rest }) => rest),
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    testimonials: [],
  },
};

/**
 * --- HOW TO MOCK next/image, lucide-react, swiper FOR STORYBOOK ---
 * In .storybook/main.ts (Vite) or .storybook/main.js (Webpack), add:
 * 
 * import { mergeConfig } from 'vite';
 * import path from 'path';
 * 
 * export default {
 *   async viteFinal(config) {
 *     return mergeConfig(config, {
 *       resolve: {
 *         alias: {
 *           'next/image': path.resolve(__dirname, 'mocks/next-image.js'),
 *           'lucide-react': path.resolve(__dirname, 'mocks/lucide-react.js'),
 *           'swiper/react': path.resolve(__dirname, 'mocks/swiper-react.js'),
 *           'swiper/modules': path.resolve(__dirname, 'mocks/swiper-modules.js'),
 *         },
 *       },
 *     });
 *   },
 * };
 *
 * Then create mocks for those modules as needed. For example:
 * 
 * // .storybook/mocks/next-image.js
 * export default function NextImage(props) {
 *   return <img {...props} alt={props.alt} src={props.src || '/assets/placeholder_user.png'} />;
 * }
 * 
 * // .storybook/mocks/lucide-react.js
 * export const Eye = (props) => <span {...props}>👁️</span>;
 * export const EyeOff = (props) => <span {...props}>🙈</span>;
 * export const Star = ({ className }) => (
 *   <span
 *     role="img"
 *     aria-label="star"
 *     style={{
 *       color: className && className.includes('fill-yellow-400') ? '#ffd700' : '#ccc',
 *       fontSize: 16,
 *       marginRight: 2,
 *     }}
 *   >★</span>
 * );
 * 
 * // .storybook/mocks/swiper-react.js
 * export const Swiper = (p) => <div data-testid="swiper">{p.children}</div>;
 * export const SwiperSlide = (p) => <div data-testid="swiperslide">{p.children}</div>;
 *
 * // .storybook/mocks/swiper-modules.js
 * export const Pagination = () => null;
 */

