'use client';

import { Meta, StoryObj } from '@storybook/react';
// import type { components } from '@/types/strapi';
import Diabetes from './Diabetes';

const meta: Meta<typeof Diabetes> = {
  title: 'sections/DiabetesYourDay',
  component: Diabetes,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What This Component Does\n\n' +
          '`<Diabetes />` is a structured, multi-card UI layout showcasing four daily habit cards related to diabetic care:\n\n' +
          '- 🍽️ **Meal Planner**\n' +
          '- 📷 **Photo Logging**\n' +
          '- 💡 **Diabetic Advice**\n' +
          '- 📊 **Glucose Tracking**\n\n' +
          'Each of these subcomponents pulls structured data from Strapi dynamic zones and can be individually controlled via CMS.\n\n' +
          'It also displays a **custom heading block** with a logo and title lines.\n\n' +
          '---\n\n' +
          '### How to Edit in Strapi\n\n' +
          '1. Navigate to a section using `DynamicZoneYourDayComponent`.\n' +
          '2. You can update:\n' +
          '   - `heading`\n' +
          '   - `logo` (Media)\n' +
          '   - `logo_title1`, `logo_title2`, `logo_title3` (Text)\n' +
          '   - `mealplanner` (Nested cards)\n' +
          '   - `datalogging`\n' +
          '   - `diabeticadvice`\n' +
          '   - `glucose`\n\n' +
          '> 🧪 Each card is fully testable in isolation and in this layout.\n',
      },
    },
  },
  argTypes: {
    heading: { control: 'text', description: 'Topmost section heading.' },
    logo: { control: 'object', description: 'Logo media object.' },
    logo_title1: { control: 'text', description: 'First line of logo title.' },
    logo_title2: { control: 'text', description: 'Second line of logo title.' },
    logo_title3: { control: 'text', description: 'Third line of logo title.' },
    diabeticadvice: { control: 'object' },
    glucose: { control: 'object' },
    mealplanner: { control: 'object' },
    datalogging: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof Diabetes>;

const media = (url: string) => ({ url });

export const Default: Story = {
  args: {
    heading: 'Build Daily Habits for Diabetes Control',
    logo: media('/assets/v4/tlogo.svg'),
    logo_title1: 'Your',
    logo_title2: 'Diabetic',
    logo_title3: 'Day Plan',
    mealplanner: {
      title: 'Meal Plan',
      sub_title: 'Diabetic meals to keep you energized',
      cards: [
        {
          image: media('/assets/v4/meal1.svg'),
          title: 'Besan Chilla',
          description: '180 kcal',
        },
      ],
    },
    datalogging: {
      title: 'Log Your Meals',
      sub_title: 'Snap or speak to log your food',
      card: {
        image: media('/assets/v4/foodscanning.svg'),
        title: 'Take a photo of your meal',
        description: 'AI will calculate nutrition',
      },
      image: media('/assets/v4/mic.svg'),
    },
    diabeticadvice: {
      title: 'Daily Health Tip',
      sub_title: 'Small steps, big results',
      bot: media('/assets/gif1.gif'),
      ai_message: 'Don’t skip breakfast! Start with a protein-rich option.',
    },
    glucose: {
      title: 'Track Your Sugar',
      sub_title: 'See your trends easily',
      image: media('https://placehold.co/400x200/png'),
    },
  },
};
