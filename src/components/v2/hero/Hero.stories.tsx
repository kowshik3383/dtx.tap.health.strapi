'use client';

import type { Meta, StoryObj } from '@storybook/react';
import Hero from './Hero';

/**
 * Storybook best practices for Next.js App Router (2024+):
 * - Do NOT alias/mock 'next/navigation', 'next/image', analytics, Zustand, or VideoPlayer modules.
 * - Let the Next.js framework inject router context; everything "just works".
 * - If you do need to mock app-specific state/hooks, use .storybook/preview.ts or a decorator.
 */

const DEMO_IMG = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80';
const DEMO_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';
const DEMO_VIDEO_OBJ = { url: DEMO_VIDEO, name: 'Promo Video' };

const meta: Meta<typeof Hero> = {
  title: 'Landing/HeroV2',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    nextjs: { appDirectory: true }, // ✅ App Router context for next/navigation
    docs: {
      description: {
        component: `
**Hero section v2:**  
Animated headline, subheading, "Join Now" CTA, price guarantee, and image/video.
- Handles sticky button visibility via Zustand.
- Logs analytics and triggers in-app routing—all work out of the box in Storybook.
- No jest.mock required.  
        `
      }
    }
  },
  argTypes: {
    mainTitile: { control: 'text', name: 'Main Title' },
    primaryTitle: { control: 'text', name: 'Primary Title' },
    join_now_message: { control: 'text' },
    refund_message: { control: 'text' },
    hero_image: { control: 'object' },
    hero_video: { control: 'object' },
    hero_video_url: { control: 'text' },
  }
};
export default meta;
type Story = StoryObj<typeof Hero>;

export const WithImage: Story = {
  args: {
    mainTitile: "Get smart diabetes care now",
    primaryTitle: "India's #1 Digital Diabetes Coach",
    hero_image: { url: DEMO_IMG, name: 'Smiling person' },
    hero_video: undefined,
    refund_message: "100% refund if you're not happy in 14 days.",
    join_now_message: "Join Now for ₹2399 per year",
    hero_video_url: '',
  },
};

export const WithVideo: Story = {
  args: {
    mainTitile: "Take back control with Tap Health",
    primaryTitle: "Diabetes, managed for you",
    hero_image: { url: DEMO_IMG, name: 'Smiling person' },
    hero_video: DEMO_VIDEO_OBJ,
    refund_message: "Cancel any time in first 2 weeks, full refund.",
    join_now_message: "Unlock your plan today!",
    hero_video_url: '',
  },
};

export const WithVideoUrl: Story = {
  args: {
    mainTitile: "Smarter, safer, simpler.",
    primaryTitle: "Your diabetes journey, rebooted",
    hero_image: { url: DEMO_IMG, name: 'Team walk' },
    hero_video: undefined,
    refund_message: "Zero risk – full refund guarantee.",
    join_now_message: "Start for ₹549/month",
    hero_video_url: DEMO_VIDEO,
  },
};

export const TextOnly: Story = {
  args: {
    mainTitile: "No more sugar spikes, no more confusion.",
    primaryTitle: "Try personalized care for life — with Tap.",
    hero_image: undefined,
    refund_message: "100% money-back in 14 days if not satisfied.",
    join_now_message: "Join Now",
    hero_video: undefined,
    hero_video_url: '',
  },
};

export const LongText: Story = {
  args: {
    mainTitile: "Backed by the nation’s top endocrinologists, now available for you. Smarter tracking, habit nudges, and cost savings—no guesswork.",
    primaryTitle: "Tap Health: Raising the bar for digital diabetes care.",
    hero_image: { url: DEMO_IMG, name: 'Smiling person' },
    hero_video: undefined,
    join_now_message: "Join Tap Health for just ₹500/month",
    refund_message: "Limited time: Save 40%, cancel risk-free for 14 days.",
    hero_video_url: '',
  },
};

export const WithEmptyProps: Story = {
  args: {
    mainTitile: "",
    primaryTitle: "",
    hero_image: undefined,
    hero_video: undefined,
    refund_message: "",
    join_now_message: "",
    hero_video_url: "",
  },
};
