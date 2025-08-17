
import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import DiabeticControl from '../DiabeticControl';

const meta: Meta<typeof DiabeticControl> = {
  title: 'Sections/DiabeticControl',
  component: DiabeticControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## 💡 DiabeticControl Section

The **DiabeticControl** section highlights how users can track and manage their diabetes using a sequence of visual explanation cards.

### 🧩 What It Includes

- 📝 Title and description for the section
- 🖼️ A series of **image + text cards**, optionally flipped via \`isReversed\`
- ✅ Supports alternating layouts
- 🧠 Optimized for responsive layouts (mobile/tablet/desktop)

---

### 📦 Props Structure (from Strapi)

| Prop                      | Type       | Description                                                  |
|---------------------------|------------|--------------------------------------------------------------|
| \`title\`                 | string     | Main section heading (e.g., "Manage Your Diabetes")          |
| \`description\`           | string     | Short section intro text                                     |
| \`diabetesControlCards\` | Array      | List of image-text cards                                     |
| ↳ \`image.url\`           | string     | Image URL for the card                                       |
| ↳ \`image.alternativeText\` | string  | Alt text for accessibility                                   |
| ↳ \`text\`                | string     | Content that explains the benefit                            |
| ↳ \`isReversed\`          | boolean    | If true, image and text are flipped                          |

---

### ✍️ How to Edit in Strapi

1. Go to **Content Manager → Pages**
2. Open the relevant page (e.g., Homepage)
3. In the **Dynamic Zone**, look for \`Diabetes Control Component\`
4. Edit:
   - **title** — Main heading
   - **description** — Short summary
   - **diabetesControlCards** — Add or modify cards
     - Upload image
     - Write benefit text
     - Toggle layout using \`isReversed\`

🧠 **Pro Tip:** Keep text under 2 lines and use high-res images for visual clarity on mobile.

---

### 🧪 Variants & Edge Case Coverage

- ✅ Standard with 3 cards
- ✅ Long descriptive text
- ✅ Missing image (fallback state)
- ✅ All cards reversed
- ✅ Empty card array (renders nothing or empty state message)
- ✅ Broken image URLs
- ✅ No title/description (valid fallback)
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DiabeticControl>;

const mockData: components['schemas']['DynamicZoneDiabetesControlComponent'] = {
  title: 'Manage Your Diabetes Effectively',
  description: 'A simplified way to track and control diabetes.',
  diabetesControlCards: [
    {
      image: {
        url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_1_6d3a5a94ed/thumbnail_1_6d3a5a94ed.png',
        alternativeText: 'Glucose tracking',
      },
      text: "Let Tap Health's AI coach understand your disease history.",
      isReversed: false,
    },
    {
      image: {
        url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_2_fa4f157e03/thumbnail_2_fa4f157e03.png',
        alternativeText: 'Healthy food',
      },
      text: 'Get personalized plan tailored to your unique lifestyle and goals.',
      isReversed: true,
    },
    {
      image: {
        url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_3_f39c19fe7e/thumbnail_3_f39c19fe7e.png',
        alternativeText: 'Meal plan',
      },
      text: 'Eat healthy, live well.\nFollow our guided meal plans.',
      isReversed: false,
    },
  ],
};

export const Default: Story = {
  name: 'Default - 3 Cards',
  args: mockData,
};

export const AllReversed: Story = {
  name: 'All Cards Reversed',
  args: {
    ...mockData,
    diabetesControlCards: (mockData.diabetesControlCards ?? []).map((c) => ({
      ...c,
      isReversed: true,
    })),
  },
};

export const LongText: Story = {
  name: 'Long Description in Card',
  args: {
    ...mockData,
    diabetesControlCards: [
      {
        ...((mockData.diabetesControlCards ?? [])[0]),
        text:
          'This is a very long explanation text that should wrap and still look clean on mobile and desktop. ' +
          'It helps users understand the importance of daily glucose tracking, especially for Type 2 diabetes.',
      },
    ],
  },
};

export const MissingImage: Story = {
  name: 'Missing Image Field',
  args: {
    ...mockData,
    diabetesControlCards: [
      {
        ...((mockData.diabetesControlCards ?? [])[0]),
        /* eslint-disable @typescript-eslint/no-explicit-any */
        image: undefined as any, // simulate image field not being set
      },
    ],
  },
};

export const NoCards: Story = {
  name: 'Empty Card Array',
  args: {
    title: 'Control Your Diabetes',
    description: 'No steps available yet.',
    diabetesControlCards: [],
  },
};

export const NoTitleDescription: Story = {
  name: 'Missing Title and Description',
  args: {
    title: '',
    description: '',
    diabetesControlCards: mockData.diabetesControlCards,
  },
};

export const BrokenImageURL: Story = {

  args: {
    ...mockData,
    diabetesControlCards: [
      {
        image: {
          url: 'https://invalid-url.com/broken.png',
          alternativeText: 'Broken image',
        },
        text: 'This image URL is invalid and should fallback.',
        isReversed: false,
      },
    ],
  },
};