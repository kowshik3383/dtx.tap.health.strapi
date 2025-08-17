import { Meta, StoryObj } from '@storybook/react';
import type { components } from '@/types/strapi';
import HowItWorks from './HowItWorks';

const meta: Meta<typeof HowItWorks> = {
  title: 'Sections/HowItWorks',
  component: HowItWorks,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### What This Component Does

\`<HowItWorks />\` is a responsive section used to explain multi-step processes.

- **Desktop View**: Renders a 2 or 4-column grid of step cards.
- **Mobile View**: Stacks cards vertically in a single column.
- Each step contains:
  - An **image** (provided by Strapi)
  - A **step number** (auto-generated)
  - A **step title**

---

### How to Edit in Strapi

1. Navigate to **Shared Steps Component** in Strapi.
2. Each step includes:
   - 📷 **Image** (media field)
   - 📝 **Title** (text field)

---

### Props & Usage

This component accepts:

- \`steps\`: An array of step items (id, image, title).
- \`tag\`: Small label shown above the heading.
- \`title_part1\`, \`highlighted_title\`, \`title_part2\`: Compose the section heading with optional blue-highlighted middle part.
- \`className\`: Tailwind utility string to customize padding or background.
        `,
      },
    },
  },
  argTypes: {
    tag: {
      control: 'text',
      description: 'Small label shown above the section heading',
    },
    title_part1: {
      control: 'text',
      description: 'Left portion of the heading',
    },
    highlighted_title: {
      control: 'text',
      description: 'Middle portion of the heading (blue highlight)',
    },
    title_part2: {
      control: 'text',
      description: 'Right portion of the heading',
    },
    steps: {
      control: 'object',
      description: 'Array of steps (each with id, image, title)',
    },
    className: {
      control: 'text',
      description: 'Optional Tailwind CSS utility string for outer wrapper',
    },
  },
};

export default meta;

type Story = StoryObj<typeof HowItWorks>;

const mockImage = (url: string, name = 'Step') => ({
  url,
  name,
});

const stepsMock: components['schemas']['SharedStepsComponent'][] = [
  {
    id: 1,
    image: mockImage('https://via.placeholder.com/120?text=Step+1'),
    title: 'Get Started Quickly',
  },
  {
    id: 2,
    image: mockImage('https://via.placeholder.com/120?text=Step+2'),
    title: 'Consult a Specialist',
  },
  {
    id: 3,
    image: mockImage('https://via.placeholder.com/120?text=Step+3'),
    title: 'Track Your Journey',
  },
  {
    id: 4,
    image: mockImage('https://via.placeholder.com/120?text=Step+4'),
    title: 'See Real Results',
  },
];

export const Default: Story = {
  args: {
    tag: 'HOW IT WORKS',
    title_part1: 'Start your',
    highlighted_title: 'transformation',
    title_part2: 'today',
    steps: stepsMock,
  },
};

export const NoSteps: Story = {
  args: {
    tag: 'HOW IT WORKS',
    title_part1: 'No',
    highlighted_title: 'Steps',
    title_part2: 'Available',
    steps: [],
  },
};

export const PartialTitle: Story = {
  args: {
    tag: 'PROCESS',
    highlighted_title: 'Only Highlighted',
    steps: stepsMock.slice(0, 2),
  },
};

export const CustomClass: Story = {
  args: {
    tag: 'HOW TO BEGIN',
    title_part1: 'Here’s your',
    highlighted_title: 'guide',
    title_part2: '',
    steps: stepsMock,
    className: 'bg-gray-50',
  },
};