import type { Meta, StoryObj } from '@storybook/react';
import DiabeticControl from './DiabeticControl';

const meta: Meta<typeof DiabeticControl> = {
  title: 'Components/DiabeticControl',
  component: DiabeticControl,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof DiabeticControl>;

export const Default: Story = {
  args: {},
};
