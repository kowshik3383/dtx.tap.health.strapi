// ActionButton.stories.tsx

'use client';

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ActionButton, { ArrowIcon } from '../ActionButton';

const meta: Meta<typeof ActionButton> = {
  title: 'Buttons/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### ActionButton

- A reusable, animated button component with:
  - MUI styling
  - Customisable colors/background
  - Left/right content slots (icons/text)
  - Used for primary actions across product.

#### Customisation

- **onClick**: Required action
- **leftContent/rightContent**: For icons or text
- **backgroundColor**/**hoverColor**: Theme flexibility
- **width**: Responsive control (default: 92%)
- Add icons or anything as left/right content.

---
        `,
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    leftContent: { control: false },
    rightContent: { control: false },
    backgroundColor: { control: 'color' },
    hoverColor: { control: 'color' },
    width: { control: 'text' }
  },
};

export default meta;

type Story = StoryObj<typeof ActionButton>;

// Stories

export const Default: Story = {
  args: {
    onClick: () => {},
    leftContent: <span>Primary</span>,
    rightContent: <ArrowIcon />
  }
};

export const WithLeftIcon: Story = {
  args: {
    onClick: () => {},
    leftContent: <ArrowIcon />,
    rightContent: <span>Next</span>
  }
};

export const WithBothIcons: Story = {
  args: {
    onClick: () => {},
    leftContent: <ArrowIcon />,
    rightContent: <ArrowIcon />
  }
};

export const CustomColors: Story = {
  args: {
    onClick: () => {},
    leftContent: <span style={{ fontWeight: 600, fontSize: '1.1em' }} >Custom</span>,
    rightContent: <ArrowIcon />,
    backgroundColor: '#F59E42',
    hoverColor: '#cc7a2f'
  }
};

export const WideButton: Story = {
  args: {
    onClick: () => {},
    leftContent: <span>Full width</span>,
    width: '100%',
    rightContent: <ArrowIcon />
  }
};

export const OnlyIcon: Story = {
  args: {
    onClick: () => {},
    leftContent: <ArrowIcon />,
    rightContent: null,
    width: '56px'
  }
};

export const NoContent: Story = {
  args: {
    onClick: () => {},
    leftContent: null,
    rightContent: null
  }
};

// You can add more stories (e.g., loading state, disabled) if your component supports them.

