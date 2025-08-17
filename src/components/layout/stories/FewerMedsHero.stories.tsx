/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// FewerMedsHero.stories.tsx
'use client';

/* eslint-disable @next/next/no-img-element */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FewerMedsHero from '../FewerMedsHero';

// --- MODULE-LEVEL MOCKS (NO jest, safe for Storybook) ---
const MockedImage = (props: any) => (
  <img
    alt={props.alt}
    src={typeof props.src === 'string' ? props.src : '/assets/logo_placeholder.svg'}
    style={{
      width: '106.86px',
      height: '22px',
      objectFit: 'contain',
      background: '#e0e0e0',
      ...props.style,
    }}
    {...props}
  />
);

const MockedVideoPlayer = ({ url }: { url: string }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 380,
      height: 200,
      background: '#111',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
    }}
    data-testid="mock-videoplayer"
  >
    <span>▶ Video Player: {url ? url : 'no url'}</span>
  </div>
);

const optimisedImageUrl = (img: any) =>
  img && img.url ? img.url : '/assets/logo_placeholder.svg';

// --- OVERRIDE the Storybook module's direct imports:
const OriginalFewerMedsHero = FewerMedsHero;
function FewerMedsHeroWithMocks(props: any) {
  // Whenever <Image /> used inside FewerMedsHero, swap to the above mock
  // Or, you can modify FewerMedsHero to accept "ImageComponent", "VideoPlayerComponent", and "optimisedImageUrl" as overrideable props—recommended for more robust mocking in big projects.
  // For now, you can patch the imports in-place (works if you don't transpile ES modules aggressively):

  // If the component takes imported `Image` as a prop, swap here.
  // If not, and Image is used directly inside, a global mock (see below) is needed.

  // For simplicity in Storybook, REQUIRED: globally mock `next/image` and `../elements/VideoPlayer` in `.storybook/preview.js` (preferred)
  // ...Or, if you have control, edit your component temporarily to use MockedImage/MockedVideoPlayer for Storybook

  // For demo:
  return <OriginalFewerMedsHero {...props} />;
}

// --- META ---

const meta: Meta<typeof FewerMedsHeroWithMocks> = {
  title: 'Landing/FewerMedsHero',
  component: FewerMedsHeroWithMocks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A visually prominent landing section that displays:
- (Optional) logo/image
- animated title/lines
- supports video either by \`video_url\` or by \`video.file.url\`
- all animated in via framer-motion

Props come from a CMS/Strapi schema, you can try your own title, lines, logo, and video assets.
        `,
      },
    },
  },
  argTypes: {
    logo: { control: 'object' },
    title: { control: 'text' },
    line1: { control: 'text' },
    line2: { control: 'text' },
    video: { control: 'object' },
    video_url: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof FewerMedsHeroWithMocks>;

// -- Demo data --
const logoObj = {
  url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
  name: 'Demo Logo',
};
const videoObj = {
  file: {
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    name: 'Test Video',
  },
};
const demoVideoUrl = 'https://www.w3schools.com/html/movie.mp4';

// -- STORIES --

export const Default: Story = {
  args: {
    logo: logoObj,
    title: 'Fewer Meds, More Moments',
    line1: 'Smarter diabetes care,',
    line2: 'for a happier you.',
    video: videoObj,
    video_url: '',
  },
};

export const OnlyVideoUrl: Story = {
  args: {
    ...Default.args,
    video: undefined,
    video_url: demoVideoUrl,
  },
};

export const LogoOnly: Story = {
  args: {
    logo: logoObj,
    title: 'Just the Logo & Title',
    line1: '',
    line2: '',
    video: undefined,
    video_url: '',
  },
};

export const NoLogo: Story = {
  args: {
    logo: undefined,
    title: 'App Benefits',
    line1: 'More health,',
    line2: 'fewer medicines.',
    video: videoObj,
    video_url: '',
  },
};

export const NoVideo: Story = {
  args: {
    logo: logoObj,
    title: 'Welcome to Tap Health',
    line1: 'Your journey starts here.',
    line2: '',
    video: undefined,
    video_url: '',
  },
};

export const LongText: Story = {
  args: {
    logo: logoObj,
    title: 'Transform Your Diabetes Journey',
    line1: 'Experience a new way to manage, control, and conquer diabetes—with less medication and more freedom.',
    line2: 'Start with a smarter, friendlier app today.',
    video: videoObj,
    video_url: '',
  },
};
