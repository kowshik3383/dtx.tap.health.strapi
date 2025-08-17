'use client';

import { Meta, StoryObj } from '@storybook/react';
// import type { components } from '@/types/strapi';
import Hero from './Hero';

const meta: Meta<typeof Hero> = {
  title: 'sections/HeroV5',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What This Component Does\n\n' +
          '`<Hero />` is a fully responsive, mobile-first hero banner with:\n\n' +
          '- 📱 **Mobile & desktop views** (stacked text on mobile, side-by-side on large screens)\n' +
          '- 🖼️ **Logo**, **tagline**, **two-line title**, **description**, and **highlighted description**\n' +
          '- 🧠 Fully editable content via Strapi CMS (supports images, HTML-safe text)\n\n' +
          'This is usually the first fold of a landing page.\n\n' +
          '---\n\n' +
          '### How to Edit in Strapi\n\n' +
          '1. Go to any dynamic zone with `DynamicZoneHeroV5Component`.\n' +
          '2. Update the following fields:\n' +
          '   - `logo`: Media (logo image)\n' +
          '   - `tag_line`: Short tagline above the title\n' +
          '   - `title_line_1`, `title_line_2`: Main heading\n' +
          '   - `description`: Paragraph below heading\n' +
          '   - `highlighted_description`: Inline highlight with background\n' +
          '   - `hero_image`: Right-side image (desktop) or below text (mobile)\n\n' +
          '> 🔁 **Tip**: Use SVG logos and 2x quality PNG hero images for best sharpness.\n',
      },
    },
  },
  argTypes: {
    logo: { control: 'object', description: 'Logo media asset (e.g., company or app logo).' },
    tag_line: { control: 'text', description: 'Short tagline above the main heading.' },
    title_line_1: { control: 'text', description: 'First line of main hero heading.' },
    title_line_2: { control: 'text', description: 'Second line of main hero heading.' },
    description: { control: 'text', description: 'Paragraph under heading.' },
    highlighted_description: { control: 'text', description: 'Highlighted subtext inside the description.' },
    hero_image: { control: 'object', description: 'Primary hero image.' },
  },
};

export default meta;

type Story = StoryObj<typeof Hero>;

const media = (url: string, name = '') => ({ url, name });

export const Default: Story = {
  args: {
    logo: media('/assets/v4/tlogo.svg', 'Logo'),
    tag_line: 'India’s #1 Diabetes App',
    title_line_1: 'Effortless Health',
    title_line_2: 'for Busy Lives',
    description: 'Your glucose, meals, sleep & steps – all in one place.',
    highlighted_description: '100% personalized.',
    hero_image: media('https://placehold.co/600x400/png', 'Hero Image'),
  },
};

export const NoHeroImage: Story = {
  args: {
    ...Default.args,
// @ts-expect-error tested without image
    hero_image: null, 
  },
};

export const OnlyText: Story = {
  args: {
// @ts-expect-error tested without image
    logo: null,
    tag_line: 'Smart Health for All',
    title_line_1: 'Simple. Fast. Accurate.',
    title_line_2: '',
    description: '',
    highlighted_description: '',
// @ts-expect-error tested without hero image
    hero_image: null, 
  },
};

export const LongText: Story = {
  args: {
    logo: media('/assets/v4/tlogo.svg'),
    tag_line: 'India’s leading personalized diabetes platform with 24x7 support',
    title_line_1: 'Manage diabetes',
    title_line_2: 'with AI + Experts',
    description:
      'From CGM-based recommendations to nutrition, workouts, sleep, and more — our app adapts to your lifestyle and builds healthy habits every day.',
    highlighted_description: 'Join 1M+ users today!',
    hero_image: media('https://placehold.co/600x400/png'),
  },
};

export const BrokenLogoImage: Story = {
  args: {
    ...Default.args,
    logo: media('/assets/invalid.svg', 'Broken Logo'),
  },
};
