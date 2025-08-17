// MemberCard.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import MemberCard from '../MemberCard';

/**
 * If MemberCard uses Next.js 'Image', Storybook recommends aliasing "next/image" to a file that exports a plain img for Storybook, e.g.:
 * // .storybook/mocks/next-image.js
 * export default function NextImage(props) {
 *   return <img {...props} alt={props.alt} src={typeof props.src === 'string' ? props.src : '/assets/dp_placeholder.png'} />;
 * }
 *
 * Then, in .storybook/main.js (or vite.config.ts):
 * // Webpack example:
 * resolve: { alias: { 'next/image': path.resolve(__dirname, 'mocks/next-image.js') } }
 */

const meta: Meta<typeof MemberCard> = {
  title: 'About/MemberCard',
  component: MemberCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Displays a stylized profile card for a team member, with photo, name, position, description, and LinkedIn badge+link.

Props:
- \`name\`: Full name string
- \`position\`: Role/title string
- \`text\`: Description or bio
- \`imgSrc\`: Photo URL or static image data
- \`linkedInLink\`: LinkedIn profile URL
        `,
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    position: { control: 'text' },
    text: { control: 'text' },
    imgSrc: { control: 'text' },
    linkedInLink: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof MemberCard>;

// -------- DEMO DATA --------
const demoImg = 'https://randomuser.me/api/portraits/men/75.jpg';
const demoLinkedin = 'https://www.linkedin.com/in/johndoe';

// -------- STORIES ----------
export const Default: Story = {
  args: {
    name: 'John Doe',
    position: 'Co-founder & CTO',
    text: 'AI engineer with 10+ years in digital health, leading product and engineering initiatives with a passion for user-centered design.',
    imgSrc: demoImg,
    linkedInLink: demoLinkedin,
  },
};

export const WithLongText: Story = {
  args: {
    ...Default.args,
    text: 'Enthusiastic about digital therapeutics, user education, and practical healthcare AI. Previously at MajorTech and HealthStartups. Loves trail running and sudoku. Believes health solutions should be both powerful and simple to use for everyone.',
  },
};

export const NoImage: Story = {
  args: {
    ...Default.args,
    imgSrc: '',
  },
};

export const NoLinkedIn: Story = {
  args: {
    ...Default.args,
    linkedInLink: '',
  },
};

export const CustomProfile: Story = {
  args: {
    name: 'Dr. Anita Verma',
    position: 'Chief Medical Advisor',
    text: 'Endocrinologist with 15+ years at Apollo & Medanta. Advisor for evidence-based care, clinical trial design, and data review.',
    imgSrc: 'https://randomuser.me/api/portraits/women/44.jpg',
    linkedInLink: 'https://www.linkedin.com/in/anita-verma-md',
  },
};
