// TapHealthFooter.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import TapHealthFooter from '../Footer';

/**
 * NOTE:
 * If TapHealthFooter uses `next/image`, mock it in Storybook by aliasing
 * 'next/image' to a local mock img module in `.storybook/main.ts`.
 * Do NOT use `jest.mock` in this story file!
 */

const DEMO_LOGO = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
  name: 'React Logo'
};

const DEMO_IMAGE = {
  url: 'https://tap.health/wp-content/themes/taphealthTwo/assets/images/tap-bot.webp',
  name: 'Tap Bot'
};

const meta: Meta<typeof TapHealthFooter> = {
  title: 'Layout/TapHealthFooter',
  component: TapHealthFooter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A lightweight, stylized footer for Tap Health landing pages.

- Shows logo, copyright, and a "bubble bot" image.
- "See you soon!" message floats above illustration.
- Used on web product/marketing pages.

All images are mocked in Storybook for easy testing and preview (via module alias).
        `,
      },
    },
  },
  argTypes: {
    logo: { control: 'object' },
    copyright: { control: 'text' },
    image: { control: 'object' },
  },
};
export default meta;
type Story = StoryObj<typeof TapHealthFooter>;

// --- STORIES ---

export const Default: Story = {
  args: {
    logo: DEMO_LOGO,
    copyright: 'Copyright © 2025 Tap Health Pvt Ltd',
    image: DEMO_IMAGE,
  },
};

export const NoBubbleImage: Story = {
  args: {
    logo: DEMO_LOGO,
    copyright: '© 2025, Tap Health Digital Clinics.',
    image: undefined,
  },
};

export const CustomCopyright: Story = {
  args: {
    logo: DEMO_LOGO,
    copyright: 'All rights reserved to Tap Health, 2025',
    image: DEMO_IMAGE,
  },
};

export const OnlyLogo: Story = {
  args: {
    logo: DEMO_LOGO,
    copyright: '',
    image: undefined,
  },
};

// Edge: no props
export const Empty: Story = {
  args: {
    logo: undefined,
    copyright: '',
    image: undefined,
  },
};

/**
 * ----- HOW TO MOCK next/image FOR STORYBOOK -----
 * In .storybook/main.ts (for Vite) add the following:
 * 
 * import { mergeConfig } from 'vite';
 * import path from 'path';
 * 
 * export default {
 *   // other config ...
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
 * export default function NextImage(props) {
 *   return (
 *     <img
 *       alt={props.alt}
 *       src={typeof props.src === 'string' ? props.src : '/assets/logo_placeholder.svg'}
 *       style={{
 *         width: props.width,
 *         height: props.height,
 *         objectFit: props.objectFit || 'contain',
 *         borderRadius: 8,
 *         background: '#f1f5fd',
 *         ...props.style,
 *       }}
 *       {...props}
 *     />
 *   );
 * }
 */
