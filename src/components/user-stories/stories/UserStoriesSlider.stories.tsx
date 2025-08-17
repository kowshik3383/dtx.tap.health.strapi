import type { Meta, StoryObj } from '@storybook/react';
import type { components } from '@/types/strapi';
import UserStoriesSlider from '../UserStoriesSlider';

export type TransformationStory = components['schemas']['TransformationStory'];

export interface UserStory {
  title_line_1: string;
  title_line_2: string;
  transformation_stories: TransformationStory[];
}

const meta: Meta<typeof UserStoriesSlider> = {
  title: 'Components/UserStoriesSlider',
  component: UserStoriesSlider,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof UserStoriesSlider>;

const mockStories: UserStory = {
  title_line_1: 'Real People',
  title_line_2: 'Incredible Transformations',
  transformation_stories: [
    {
      id: 1,
      name: 'Priya',
      reduction_value: '3.2%',
      reductionType: 'Hb1ac',
      stars: 5,
      video_url: 'https://www.example.com/video1.mp4',
      thumbnail_url: 'https://www.example.com/thumb1.jpg',
    },
    {
      id: 2,
      name: 'Ravi',
      reduction_value: '12 kg',
      reductionType: 'Weight',
      stars: 4,
      video_url: 'https://www.example.com/video2.mp4',
      thumbnail_url: 'https://www.example.com/thumb2.jpg',
    },
  ],
};

export const Default: Story = {
  args: mockStories,
};
