/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// ErrorPopup.stories.tsx
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPopup } from '../ErrorPopup';

// ----------- MOCK/STUBS FOR STORYBOOK ----------- //

// Prevents navigation/alerts in Storybook:
if (typeof window !== 'undefined') {
  window.location.href = '';
  window.alert = (...args: any[]) => {
    // Optionally, log as Storybook action here
    // action('window.alert')(args);
  };
}

// ---------- META ---------- //
const meta: Meta<typeof ErrorPopup> = {
  title: 'Feedback/ErrorPopup',
  component: ErrorPopup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### ErrorPopup

A full-screen modal dialog for critical error and action.

- Displays a red error icon, custom message, and an "Open app" CTA.
- Clicking the button attempts to redirect to the Play Store/App Store based on user device (stubbed in Storybook).
- Used when user hits restricted pages on web, prompting them to download or open the app.

**Props:**
- \`show\` (boolean): whether to display the modal.
- \`message\` (string): error or informative text to show.
        `
      }
    }
  },
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Show/hide the popup modal',
      defaultValue: true,
    },
    message: {
      control: 'text',
      description: 'Error or info message to display',
      defaultValue: 'Please open this link in the Tap Health app to continue.',
    }
  }
};

export default meta;
type Story = StoryObj<typeof ErrorPopup>;

// ---------- STORIES ---------- //

export const Default: Story = {
  args: {
    show: true,
    message: 'Please open this link in the Tap Health app to continue.',
  },
};

export const CustomMessage: Story = {
  args: {
    show: true,
    message: 'Access denied. This feature is only accessible inside our app.',
  },
};

export const LongMessage: Story = {
  args: {
    show: true,
    message: 'It appears you are trying to access a secure feature. For your safety and the best experience, please download or open the Tap Health app via the links provided.',
  },
};

export const Hidden: Story = {
  args: {
    show: false,
    message: 'You should not see this popup.',
  },
};

