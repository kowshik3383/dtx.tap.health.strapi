// SliderComponent.stories.tsx
import { Meta, StoryObj } from '@storybook/react';

import SliderComponent from '../FoodSlider';

const meta: Meta<typeof SliderComponent> = {
  title: 'Sliders/SliderComponent',
  component: SliderComponent,
};

export default meta;
type Story = StoryObj<typeof SliderComponent>;

export const Default: Story = {
  args: {
    upperSlider: [
      {
        icon: '🌱',
        title: 'Salad Bowl',
        description: 'Great for digestion',
        backgroundColor: '#F0FFF0',
      },
    ],
    lowerSlider: [
      {
        icon: '🥣',
        title: 'Veg Soup',
        description: 'Light & nutritious',
        backgroundColor: '#FFF0F5',
      },
    ],
  },
};
