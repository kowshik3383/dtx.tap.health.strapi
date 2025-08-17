
// ExerciseCard.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import ExerciseCard from '../ExerciseCard';

/**
 * 👉 NOTE FOR STORYBOOK USERS:
 *
 * If ExerciseCard uses `next/image`, alias that module to a mock in your Storybook Vite/webpack config,
 * instead of using jest.mock here.
 *
 * See example alias/mocks at the end of the file.
 */

// --- DEMO IMAGE and DATA ---
const DEMO_IMG = 'https://images.unsplash.com/photo-1508182314991-c262df1b6e3a?auto=format&fit=crop&w=700&q=80';

const meta: Meta<typeof ExerciseCard> = {
  title: 'Wellness/ExerciseCard',
  component: ExerciseCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A compact card for exercise or lifestyle recommendations.
- Shows an image, title, and description side by side.
- Used in app onboarding, dashboard, and promo sections.
        `,
      },
    },
  },
  argTypes: {
    image: { control: 'object' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof ExerciseCard>;

// -- STORIES --

export const Default: Story = {
  args: {
    image: { url: DEMO_IMG, name: 'Yoga' },
    title: 'Morning Yoga',
    description:
      'Boost flexibility, lower blood sugar, and reduce your stress with 12 minutes daily yoga—no equipment needed.',
  },
};

export const NoImage: Story = {
  args: {
    image: undefined,
    title: 'Breathing Exercise',
    description:
      'Deep slow breaths help control sugar spikes and lower anxiety. Try 5 minutes now.',
  },
};

export const OnlyImage: Story = {
  args: {
    image: { url: DEMO_IMG, name: 'Cycling' },
    title: '',
    description: '',
  },
};

export const LongDescription: Story = {
  args: {
    image: { url: DEMO_IMG, name: 'Evening Walk' },
    title: 'Evening Walk',
    description:
      'Walking for just 15–20 minutes after dinner can significantly improve your post-meal blood sugar levels and help you unwind. Try to make it a family habit. Even a gentle stroll counts!',
  },
};

export const CustomImage: Story = {
  args: {
    image: {
      url: 'https://images.unsplash.com/photo-1517963899433-6ad6ecb1b6d8?auto=format&fit=crop&w=700&q=80',
      name: 'Resistance Band',
    },
    title: 'Resistance Band',
    description:
      'Light strength training helps maintain muscle and supports metabolism for diabetes management.',
  },
};

/**
 * --- HOW TO MOCK next/image FOR STORYBOOK ---
 * In .storybook/main.ts (Vite) or .storybook/main.js (Webpack), add:
 *
 * // main.ts (Vite example)
 * import { mergeConfig } from 'vite';
 * import path from 'path';
 * export default {
 *   // ... your config 
 *   async viteFinal(config) {
 *     return mergeConfig(config, {
 *       resolve: {
 *         alias: {
 *           'next/image': path.resolve(__dirname, 'mocks/next-image.js'),
 *         },
 *       },
 *     });
 *   },
 * };
 *
 * // .storybook/mocks/next-image.js
 * // eslint-disable-next-line @next/next/no-img-element
 * export default function NextImage(props) {
 *   return (
 *     <img
 *       {...props}
 *       style={{
 *         width: '100%',
 *         height: '100%',
 *         objectFit: props.objectFit || 'cover',
 *         borderRadius: 8,
 *         background: '#f2f6f9',
 *         ...props.style,
 *       }}
 *       alt={props.alt}
 *       src={typeof props.src === 'string' ? props.src : '/assets/placeholder_exercise.jpg'}
 *       data-testid="mocked-next-image"
 *     />
 *   );
 * }
 */

