
// ExerciseCard2.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import ExerciseCard2 from '../ExerciseCard2';

/**
 *  Storybook “mocking” for next/image is done using module aliasing
 *  in your SB config, not inline or via jest.mock in your story!
 *  See instructions at the end :)
 */

// --- DEMO DATA ---
const DEMO_IMG = 'https://images.unsplash.com/photo-1508182314991-c262df1b6e3a?auto=format&fit=crop&w=700&q=80';
const DEMO_IMG2 = 'https://images.unsplash.com/photo-1517963899433-6ad6ecb1b6d8?auto=format&fit=crop&w=700&q=80';

const meta: Meta<typeof ExerciseCard2> = {
  title: 'Dashboard/ExerciseCard2',
  component: ExerciseCard2,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A compact card for "What You Get" feature bullets,
with thumbnail image, title, and one or two-line description.

Props:
- \`title\` (string): Name of exercise/feature.
- \`description\` (string): Brief description text.
- \`image\`: CMS asset object ({ url, name } minimal).

_The image renders only if a \`url\` is provided._
        `,
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    image: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<typeof ExerciseCard2>;

// --- STORIES ---

export const Default: Story = {
  args: {
    title: 'Yoga for Diabetes',
    description: 'A 10-minute gentle yoga routine to lower blood sugar, reduce anxiety, and boost your energy.',
    image: {
      url: DEMO_IMG,
      name: 'Yoga Pose',
    },
  },
};

export const MinimalContent: Story = {
  args: {
    title: 'No description, only image',
    description: '',
    image: {
      url: DEMO_IMG2,
      name: 'Band',
    },
  },
};

export const NoImage: Story = {
  args: {
    title: 'Breathing Exercise',
    description: 'Mindful breathing calms stress and helps stabilize blood sugar. Try our 4-7-8 method.',
    image: undefined,
  },
};

export const LongText: Story = {
  args: {
    title: 'Smart Carb Swaps',
    description:
      "Swap white rice for brown or cauliflower, choose high-fiber rotis, and enjoy fruits with a sprinkle of seeds. See the difference in your daily sugar levels! Our guide helps you pick better, one meal at a time. (This will test the 'line-clamp-3' style, showing max 3 lines.)",
    image: {
      url: DEMO_IMG2,
      name: 'Carb Swap',
    },
  },
};

export const MissingAllProps: Story = {
  args: {
    title: '',
    description: '',
    image: undefined,
  },
};

/**
 * ---- HOW TO MOCK next/image FOR STORYBOOK ---
 * In .storybook/main.ts (Vite) or .storybook/main.js (Webpack), add:
 * 
 * // main.ts (Vite)
 * import { mergeConfig } from 'vite';
 * import path from 'path';
 * 
 * export default {
 *   // ...your config...
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
 *       alt={props.alt}
 *       src={typeof props.src === 'string' ? props.src : '/assets/placeholder_exercise.jpg'}
 *       style={{
 *         width: '100%',
 *         height: '100%',
 *         objectFit: 'cover',
 *         borderRadius: 12,
 *         background: '#f2f6f9',
 *         ...props.style,
 *       }}
 *       data-testid="mocked-next-image"
 *     />
 *   );
 * }
 */

