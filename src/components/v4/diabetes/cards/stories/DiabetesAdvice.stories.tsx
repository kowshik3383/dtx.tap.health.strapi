'use client';

import { Meta, StoryObj } from '@storybook/react';
import DiabetesAdvice from '../DiabetesAdvice';

const meta: Meta<typeof DiabetesAdvice> = {
  title: 'cards/DiabetesAdvice',
  component: DiabetesAdvice,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What this Component Does\n\n' +
          '`<DiabetesAdvice />` displays a friendly message from an AI assistant meant to offer tips to people with diabetes.\n\n' +
          '- Includes a **title** and **subtitle** for context\n' +
          '- Shows a message bubble from the assistant\n' +
          '- Optionally includes an assistant **avatar**\n\n' +
          '---\n\n' +
          '### How to Edit This in Strapi\n\n' +
          '1. Go to the page where the `DynamicZoneDiabeticAdviceComponent` is used.\n' +
          '2. You can update:\n' +
          '   - `title` (Text)\n' +
          '   - `sub_title` (Text)\n' +
          '   - `ai_message` (Text)\n' +
          '   - `bot` (Media - for avatar image)\n' +
          '3. Save and publish to see changes reflected.\n\n' +
          'This component is used on pages to **improve user engagement** with human-like tips. Useful for health-focused apps or landing pages.',
      },
    },
  },
  argTypes: {
    title: {
      description: 'Main heading of the advice block.',
      control: 'text',
      type: { name: 'string', required: true },
    },
    sub_title: {
      description: 'Subtitle shown under the title.',
      control: 'text',
      type: { name: 'string', required: false },
    },
    ai_message: {
      description: 'The AI-generated message shown inside the bubble.',
      control: 'text',
      type: { name: 'string', required: false },
    },
    bot: {
      description: 'Avatar object with a `url` key. Shown as AI assistant image.',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DiabetesAdvice>;

const sampleBot = (url: string = '/assets/gif1.gif') => ({ url });

export const Default: Story = {
  args: {
    title: 'Daily Diabetic Tip',
    sub_title: 'Tips to improve your sleep and sugar levels',
    ai_message:
      'Try to maintain consistent meal times. It helps control sugar spikes and improves energy!',
    bot: sampleBot(),
  },
};

export const LongMessage: Story = {
  args: {
    title: 'Evening Advice',
    sub_title: 'Stay on track after 6 PM',
    ai_message:
      'If you’re feeling hungry after dinner, try drinking a glass of warm milk or chamomile tea. Avoid sugary snacks as they spike insulin overnight.',
    bot: sampleBot(),
  },
};

export const NoAvatar: Story = {
  args: {
    title: 'AI Assistant',
    sub_title: 'No avatar shown here',
    ai_message: 'Hydration is key—drink water frequently during the day.',
    bot: { url: '' },
  },
};

export const NoMessage: Story = {
  args: {
    title: 'Message Missing',
    sub_title: 'Fallback message should appear',
    ai_message: '',
    bot: sampleBot(),
  },
};

export const EmptyTitleAndSubtitle: Story = {
  args: {
    title: '',
    sub_title: '',
    ai_message: 'Content remains visible even when headers are empty.',
    bot: sampleBot(),
  },
};

export const InvalidBotData: Story = {
  args: {
    title: 'Invalid Bot Input',
    sub_title: 'Should still render safely',
    // @ts-expect-error: testing edge case with null bot
    bot: null,
    ai_message: 'We can still show this message without crashing.',
  },
};