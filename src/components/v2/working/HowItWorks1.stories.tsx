import { Meta, StoryObj } from '@storybook/react';
import type { components } from '@/types/strapi';
import HowItWorks1 from './HowItWorks1';

const meta: Meta<typeof HowItWorks1> = {
  title: 'Sections/HowItWorks1',
  component: HowItWorks1,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### What This Component Does

\`<HowItWorks1 />\` displays a multi-step process, commonly used to explain how a product or service works. It is **responsive**:

- **Desktop**: Grid layout with up to 4 steps per row.
- **Mobile**: Horizontal Swiper with pagination dots and analytics tracking.

Each step includes:

- An image
- Step number
- Title

---

### How to Edit in Strapi

1. Go to **Shared Steps Component** content type.
2. Add each step with:
   - **Image** (Media field)
   - **Title** (Short text)
3. This component expects a **\`steps\`** array in Strapi to be passed in.

To preview in Storybook, you can pass mocked data via the \`steps\` prop.
        `,
      },
    },
  },
  argTypes: {
    steps: {
      description: 'Array of steps to display in the component.',
      control: { type: 'object' },
    },
    tag: {
      description: 'Small label/tag above the title.',
      control: { type: 'text' },
    },
    className: {
      description: 'Additional custom class names for outer wrapper.',
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HowItWorks1>;

const mockImage = (url: string, name = 'Step Image') => ({
  url,
  name,
});

const mockSteps: components['schemas']['SharedStepsComponent'][] = [
  {
    id: 1,
    image: mockImage('https://via.placeholder.com/100x100?text=Step+1'),
    title: 'Sign Up in 2 Minutes',
  },
  {
    id: 2,
    image: mockImage('https://via.placeholder.com/100x100?text=Step+2'),
    title: 'Consult With Experts',
  },
  {
    id: 3,
    image: mockImage('https://via.placeholder.com/100x100?text=Step+3'),
    title: 'Start Your Reversal Plan',
  },
  {
    id: 4,
    image: mockImage('https://via.placeholder.com/100x100?text=Step+4'),
    title: 'Track Progress With Reports',
  },
];

export const Default: Story = {
  args: {
    steps: mockSteps,
    tag: 'HOW IT WORKS',
  },
};

export const FewerSteps: Story = {
  args: {
    steps: mockSteps.slice(0, 2),
  },
};

export const ManySteps: Story = {
  args: {
    steps: Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      image: mockImage(`https://via.placeholder.com/100x100?text=Step+${i + 1}`),
      title: `Step ${i + 1}`,
    })),
  },
};

export const EmptySteps: Story = {
  args: {
    steps: [],
  },
};

export const CustomTagAndClass: Story = {
  args: {
    steps: mockSteps,
    tag: 'STEP BY STEP',
    className: 'bg-gray-50',
  },
};
