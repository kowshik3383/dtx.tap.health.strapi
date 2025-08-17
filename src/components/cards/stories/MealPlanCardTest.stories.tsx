/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react';
import MealPlanCardTest from '../MealPlanCard';

const meta: Meta<typeof MealPlanCardTest> = {
  title: 'Cards/MealPlanCardTest',
  component: MealPlanCardTest,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## 🥗 MealPlanCardTest

This component visually presents a personalized meal recommendation, optimized for diabetic users. It uses iconography, color blocks, and sliders to communicate food values.

---

### 🔧 Props Table

| Prop            | Type                   | Required | Description |
|------------------|------------------------|----------|-------------|
| \`title\`          | \`string\`              | ✅ Yes   | Main card heading |
| \`description\`    | \`string\`              | ✅ Yes   | Subtext under the title |
| \`icon.url\`       | \`string\`              | ✅ Yes   | Left icon image (SVG recommended) |
| \`upperSlider\`    | \`Array<{...}>\`         | ✅ Yes   | Nutrient-rich foods to promote |
| \`lowerSlider\`    | \`Array<{...}>\`         | ✅ Yes   | Foods to avoid or moderate |

---

### ✅ Slider Entry Structure

Each entry in \`upperSlider\` or \`lowerSlider\` includes:

| Field             | Type     | Description |
|------------------|----------|-------------|
| \`icon\`          | \`string\` | Emoji or image |
| \`title\`         | \`string\` | Food name |
| \`description\`   | \`string\` | Why it's relevant |
| \`backgroundColor\` | \`string\` | Tailored background hex |

---

### ✍️ Content Management (Strapi)

This card may be powered by Strapi components such as:

- **Shared Meal Plan Component**
- **Slider Entry Subcomponent**

Upload images, add emojis, and customize color blocks from the CMS panel.

---

### 🧪 Edge Cases Handled

- ✅ Default layout
- ✅ Missing icon
- ✅ Empty sliders
- ✅ Long food names
- ✅ Missing fields
- ✅ Emojis-only cards

> Ensure consistent padding for layout safety and avoid slider overflow with more than 4+ items.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MealPlanCardTest>;

// ✅ Default working case
export const Default: Story = {
  args: {
    title: 'Personalised Meal Plans',
    description: 'Eat what you love, perfectly portioned for diabetes.',
    icon: {
      url: 'https://storage.googleapis.com/tap-health-dev-strapi/apple_99fe3abe6c/apple_99fe3abe6c.svg',
      name: 'Apple Icon',
      alternativeText: 'Apple',
    },
    upperSlider: [
      {
        icon: '🍎',
        title: 'Apple',
        description: 'Rich in fiber & controls sugar.',
        backgroundColor: '#FFEFEF',
      },
    ],
    lowerSlider: [
      {
        icon: '🥚',
        title: 'Boiled Eggs',
        description: 'Protein-rich & low carb.',
        backgroundColor: '#EFFFF1',
      },
    ],
  },
};

// 🧪 No Icon
export const NoIcon: Story = {
  name: 'Missing Icon',
  args: {
    ...Default.args,
    icon: undefined as any,
  },
};

// 🧪 Empty Sliders
export const NoSliders: Story = {
  name: 'No Sliders Provided',
  args: {
    ...Default.args,
    upperSlider: [],
    lowerSlider: [],
  },
};

// 🧪 Long Text
export const LongText: Story = {
  name: 'Overflow Text Test',
  args: {
    ...Default.args,
    title: 'Personalised Diabetes-Friendly Meal Planning with Nutritional Guidance for Every Region',
    description:
      'We tailor your meals with portion control, cultural fit, and macro breakdown for healthy blood sugar management.',
    upperSlider: [
      {
        icon: '🥑',
        title: 'Avocado Slices with Himalayan Pink Salt and Chia Seeds',
        description:
          'Rich in healthy fats, micronutrients, and great for heart health and glycemic control',
        backgroundColor: '#FFEFEF',
      },
    ],
    lowerSlider: [
      {
        icon: '🥤',
        title: 'Sugary Soda Drinks with Artificial Sweeteners',
        description:
          'Avoid high glycemic beverages that cause blood sugar spikes and insulin resistance.',
        backgroundColor: '#FFF6E9',
      },
    ],
  },
};

// 🧪 Emojis only
export const EmojisOnly: Story = {
  name: 'Emoji Only Items',
  args: {
    ...Default.args,
    upperSlider: [
      {
        icon: '🍇',
        title: 'Grapes',
        description: 'High in antioxidants',
        backgroundColor: '#F4EFFF',
      },
    ],
    lowerSlider: [
      {
        icon: '🍩',
        title: 'Donuts',
        description: 'High sugar, avoid daily.',
        backgroundColor: '#FFEBEB',
      },
    ],
  },
};

export const EmptyProps: Story = {
  args: {} as any,
};
