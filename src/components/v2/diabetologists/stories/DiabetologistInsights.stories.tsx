
// DiabetologistInsights.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import DiabetologistInsights from '../DiabetologistInsights';

/**
 * NOTE:
 * - If your component imports next/image, lucide-react icons, or custom VideoPlayer,
 *   you should alias/mock them in your Storybook build config, NOT in the story file.
 * - See comment at the end for how to set up Storybook aliases for those modules.
 */

// --- DEMO DATA HELPERS ---

const demoVideoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
const demoFileVideo = {
  file: {
    url: demoVideoUrl,
    name: 'Sample File Video',
  }
};

// --- META ---

const meta: Meta<typeof DiabetologistInsights> = {
  title: 'Sections/DiabetologistInsights',
  component: DiabetologistInsights,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A hero/insights section with a video, title, highlight, and mute/fullscreen controls.

**All video, images, and icons can be stubbed using module aliasing for stable Storybook previews. See below.**
        `,
      },
    },
  },
  argTypes: {
    title_line1_part1: { control: 'text' },
    highlighted_title: { control: 'text' },
    title_line1_part2: { control: 'text' },
    title_line2: { control: 'text' },
    video: { control: 'object' },
    video_url: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof DiabetologistInsights>;

// --- STORIES ---

export const WithVideoUrl: Story = {
  args: {
    title_line1_part1: 'Get expert advice from',
    highlighted_title: 'India’s top diabetologists',
    title_line1_part2: '',
    title_line2: 'Backed by years of clinical experience.',
    video_url: demoVideoUrl,
    video: {},
  },
};

export const WithFileVideo: Story = {
  args: {
    title_line1_part1: 'Clinical Knowledge:',
    highlighted_title: 'Simplified for you!',
    title_line1_part2: 'All your doubts, decoded.',
    title_line2: '',
    video: demoFileVideo,
    video_url: '',
  },
};

export const NoVideo: Story = {
  args: {
    title_line1_part1: 'This is a text-only section.',
    highlighted_title: 'No video here!',
    title_line1_part2: 'Your questions answered. Soon.',
    title_line2: 'Diabetes care made simple.',
    video: {},
    video_url: '',
  },
};

export const PosterOnly: Story = {
  args: {
    title_line1_part1: 'Expert opinions,',
    highlighted_title: 'real stories.',
    title_line1_part2: 'Stay tuned for LIVE talks.',
    title_line2: '',
    video: {},
    video_url: '',
  },
};

export const LongTitles: Story = {
  args: {
    title_line1_part1: 'Wondering how to manage your diabetes better?',
    highlighted_title: 'Watch this in-depth session',
    title_line1_part2: 'by Dr. Suresh and Dr. Anita.',
    title_line2: 'Instant clarity on low-carb diets, stress and sugar control.',
    video_url: demoVideoUrl,
    video: {},
  },
};

/**
 * --- HOW TO MOCK NEXT/IMAGE, ICONS, AND VIDEO FOR STORYBOOK ---
 *
 * In your .storybook/main.ts (Vite) or main.js (Webpack), add:
 *
 * import { mergeConfig } from 'vite';
 * import path from 'path';
 *
 * export default {
 *   // ...other config,
 *   async viteFinal(config) {
 *     return mergeConfig(config, {
 *       resolve: {
 *         alias: {
 *           // Replace with your actual file structure
 *           'next/image': path.resolve(__dirname, 'mocks/next-image.js'),
 *           'lucide-react': path.resolve(__dirname, 'mocks/lucide-react.js'),
 *           '../DiabetologistInsights/VideoPlayer': path.resolve(__dirname, 'mocks/mock-videoplayer.js'),
 *         },
 *       },
 *     });
 *   },
 * };
 *
 * # .storybook/mocks/next-image.js
 * export default function NextImage(props) {
 *   return <img {...props} alt={props.alt} src={props.src || '/assets/placeholder_user.png'} />;
 * }
 *
 * # .storybook/mocks/lucide-react.js
 * export const VolumeX = (props) => <span {...props} role="img" aria-label="volume-x">🔇</span>;
 * export const Volume2 = (props) => <span {...props} role="img" aria-label="volume">🔊</span>;
 * export const Maximize = (props) => <span {...props} role="img" aria-label="maximize">⛶</span>;
 *
 * # .storybook/mocks/mock-videoplayer.js
 * import React from 'react';
 * export default React.forwardRef((props, ref) => (
 *   <div ref={ref} data-testid="mock-videoplayer" style={{ background: '#000', color: '#fff', minHeight: 240, minWidth: 320, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 *     <div>
 *       <span>▶ Mock VideoPlayer</span>
 *       <div style={{ fontSize: 12 }}>
 *         <div><b>URL:</b> <span data-testid="video-url">{props.url}</span></div>
 *         <div><b>Muted:</b> {String(props.muted)}</div>
 *         <div><b>Playing:</b> {String(props.playing)}</div>
 *       </div>
 *     </div>
 *   </div>
 * ));
 *
 * --- END ---
 *
 * This way your SB stories remain jest-free, readable, robust, and compatible with future Storybook upgrades!
 */
