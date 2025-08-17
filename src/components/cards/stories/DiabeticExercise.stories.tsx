import { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import DiabeticExercise from '../DiabeticExercise';

const meta: Meta<typeof DiabeticExercise> = {
  title: 'Cards/DiabeticExercise',
  component: DiabeticExercise,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '### What this Component Does\n\n' +
          '`<DiabeticExercise />` is a compact, informative card that highlights exercise options for diabetics or health-conscious users.\n\n' +
          'It typically includes:\n' +
          '- 🧍 **Title** (e.g., "Simple Home Exercises")\n' +
          '- 📄 **Description** (e.g., "Get workouts tailored...")\n' +
          '- 🏋️ **Icon** (represents exercise category)\n' +
          '- 🖼️ **Illustration Image** (visual aid or thumbnail)\n\n' +
          'This card is often used in **grid layouts** or **sections promoting lifestyle features** like exercise, diet, or yoga.\n\n' +
          '---\n\n' +
          '### How to Edit in Strapi\n\n' +
          'This component is sourced from the `Items Exercise Component` content type or reusable component.\n\n' +
          '1. Go to **Strapi Admin > Components > Items Exercise Component**\n' +
          '2. For each card item, fill the following fields:\n' +
          '   - `title` (string)\n' +
          '   - `description` (short informative text)\n' +
          '   - `icon` (media field — small image like a dumbbell)\n' +
          '   - `image` (media field — main card visual)\n\n' +
          'This data is typically embedded in a larger section like "How It Helps" or "Diabetes Support Features".\n\n' +
          '---\n\n' +
          '### Edge Cases & Visual Tests\n\n' +
          'These stories help ensure the component handles a variety of inputs gracefully:\n\n' +
          '- ✅ **Default** — All fields populated\n' +
          '- ✅ **Missing Image** — Fallback if main image is undefined\n' +
          '- ✅ **Missing Icon** — Tests icon fallback or empty slot\n' +
          '- ✅ **Long Text** — Very long title and description\n' +
          '- ✅ **Empty Props** — Handles undefined or partial props without breaking',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DiabeticExercise>;

const baseData: components['schemas']['ItemsExerciseComponent'] = {
  title: 'Simple Home Exercises',
  description: 'Get workouts tailored to your age, fitness level and health condition',
  icon: {
    url: 'https://storage.googleapis.com/tap-health-dev-strapi/dumbell_07560379c1/dumbell_07560379c1.svg',
    name: 'Exercise Icon',
    alternativeText: 'Exercise icon',
  },
  image: {
    url: 'https://storage.googleapis.com/tap-health-dev-strapi/exercise1_e74e249cd3/exercise1_e74e249cd3.svg',
    name: 'Home workout',
    alternativeText: 'Workout',
  },
};

// ✅ Main Story
export const Default: Story = {
  args: baseData,
};

// 🧪 Missing main image
export const NoImage: Story = {
  name: 'Missing Image',
  args: {
    ...baseData,
    image: undefined,
  },
};

// 🧪 Missing icon
export const NoIcon: Story = {
  name: 'Missing Icon',
  args: {
    ...baseData,
    icon: undefined,
  },
};

// 🧪 Very long text
export const LongText: Story = {
  name: 'Long Title and Description',
  args: {
    ...baseData,
    title: 'This is an extremely long title to test layout overflow and wrapping behavior in the card',
    description:
      'This description is intentionally verbose and includes additional content to evaluate how the card scales when the text exceeds normal limits. It ensures that layout, truncation, or wrapping behaves predictably on various screen sizes.',
  },
};

// 🧪 Empty state (minimal)
export const EmptyProps: Story = {
args: {} as Partial<components['schemas']['ItemsExerciseComponent']>,
};
