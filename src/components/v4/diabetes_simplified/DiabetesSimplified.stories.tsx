import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import DiabetesSimplified from './DiabetesSimplified';

const meta: Meta<typeof DiabetesSimplified> = {
  title: 'Sections/DiabetesSimplified',
  component: DiabetesSimplified,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## 🔍 DiabetesSimplified Component

This component visually explains how Tap Health simplifies diabetes tracking and care using dynamic image cards, titles, and descriptions from Strapi CMS.

### 🛠️ How to Edit in Strapi

Go to: **Strapi > Components > DynamicZoneDiabetesSimplefiedComponent**

### 🧩 Editable Fields
| Field | Type | Description |
|-------|------|-------------|
| \`title\` | string | Top subtitle (gray text) |
| \`highlighted_title\` | string | Bold blue title below subtitle |
| \`feature_cards\` | repeatable component | Includes image + description per step |

Within each \`feature_cards\`:
| Field | Description |
|-------|-------------|
| \`featurecard.image\` | Icon shown in blue bubble |
| \`featurecard.title\` | Overlay title |
| \`featurecard.description\` | Overlay subtitle below title |
| \`description\` | Bottom text under overlay |
| \`highlighted_description\` | Bold portion in bottom text |

### 🎯 Design Details
- Positions, gradients, and layout are defined using a hardcoded layout config (see \`diabetesCards\` fallback)
- If \`feature_cards.length < 3\`, fallback data is padded from default
- Component is fully positioned absolutely inside a fixed container

### ✅ Edge Cases Covered
- ✅ Missing overlay titles or subtitles
- ✅ Missing icons/images
- ✅ Fewer cards than expected (fallbacks applied)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DiabetesSimplified>;

const mockCards: components['schemas']['DynamicZoneDiabetesSimplefiedComponent']['feature_cards'] = [
  {
    featurecard: {
      image: { url: '/assets/v4/sugar-icon1.svg', name: 'Sugar Icon' },
      title: 'Monitor Sugar',
      description: 'Real-time insights',
    },
    description: 'Track sugar levels with our smart sensor',
    highlighted_description: 'No pricking required',
  },
  {
    featurecard: {
      image: { url: '/assets/v4/sugar-icon2.svg', name: 'Coach Icon' },
      title: 'Daily Coach',
      description: 'Reminders that motivate you',
    },
    description: 'Stay on track with updates',
    highlighted_description: 'Backed by science',
  },
  {
    featurecard: {
      image: { url: '/assets/v4/sugar-icon3.svg', name: 'Meal Icon' },
      title: 'Smart Meal Log',
      description: 'Visual meal tracking',
    },
    description: 'We recommend food based on sugar',
    highlighted_description: 'Eat healthy, stay balanced',
  },
];

export const Default: Story = {
  args: {
    title: 'Tap Health Simplifies Diabetes',
    highlighted_title: 'Live better with daily control',
    feature_cards: mockCards,
  },
};

export const MissingImages: Story = {
  args: {
    title: 'Image Errors Tolerated',
    highlighted_title: 'Icons are optional',
    feature_cards: mockCards.map(card => ({
      ...card,
      featurecard: { ...card.featurecard, image: undefined },
    })),
  },
};

export const IncompleteData: Story = {
  args: {
    title: '',
    highlighted_title: '',
    feature_cards: [], // Fallback to default layout
  },
};
