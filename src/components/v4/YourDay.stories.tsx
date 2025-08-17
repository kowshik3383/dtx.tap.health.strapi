'use client';

import { Meta, StoryObj } from '@storybook/react';
import YourDay from './YourDay';

const meta: Meta<typeof YourDay> = {
  title: 'sections/YourDayVideo',
  component: YourDay,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What This Component Does\n\n' +
          '`<YourDay />` is a full-screen responsive section that displays a background **video** (HLS or static file), with a **fallback image** that fades out when the video is ready.\n\n' +
          '**Key Features:**\n' +
          '- Full viewport height video background\n' +
          '- Initial fallback image (with fade effect)\n' +
          '- Custom `video_url` or Strapi `video` asset support\n\n' +
          '---\n\n' +
          '### How to Edit in Strapi\n\n' +
          '1. Use `DynamicZoneYourDayComponent` in a page builder.\n' +
          '2. Upload fields:\n' +
          '   - `image`: Used as fallback while video loads\n' +
          '   - `video`: Media (MP4 or HLS .m3u8 file, optional)\n' +
          '   - `video_url`: Custom string URL (used if `video` is not present)\n\n' +
          '> 🧪 The component shows fallback image until `onReady` triggers from `<VideoPlayer />`.\n',
      },
    },
  },
  argTypes: {
    image: {
      control: 'object',
      description: 'Fallback image shown before video is ready.',
    },
    video_url: {
      control: 'text',
      description: 'Custom string-based video URL.',
    },
    video: {
      control: 'object',
      description: 'Strapi video object (URL + alt text).',
    },
  },
};

export default meta;

type Story = StoryObj<typeof YourDay>;

const media = (url: string, alternativeText = '') => ({ url, alternativeText });

export const DefaultVideoWithFallback: Story = {
  args: {
    image: media('/assets/v4/player.svg', 'Preview Image'),
    video: media('https://storage.googleapis.com/dtx-assets-prod/marketing/videos/timeline-mobile/master.m3u8', 'Hero video'),
  },
};

export const VideoURLOnly: Story = {
  args: {
    image: media('/assets/v4/player.svg'),
    video_url: 'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/timeline-mobile/master.m3u8',
  },
};

export const NoVideo: Story = {
  args: {
    image: media('/assets/v4/player.svg'),
  },
};

export const BrokenVideoURL: Story = {
  args: {
    image: media('/assets/v4/player.svg'),
    video_url: 'https://invalid-url/video.mp4',
  },
};

export const BrokenFallbackImage: Story = {
  args: {
    image: media('/invalid/image.png', 'Broken fallback'),
    video_url: 'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/timeline-mobile/master.m3u8',
  },
};
