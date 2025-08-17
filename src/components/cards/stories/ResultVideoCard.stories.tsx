/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/react';
import ResultVideoCard from '../ResultVideoCard';

const meta: Meta<typeof ResultVideoCard> = {
  title: 'VideoCards/ResultVideoCard',
  component: ResultVideoCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## 🎬 ResultVideoCard

\`<ResultVideoCard />\` is used to visually showcase patient success stories with a thumbnail + title + video preview combo.

---

### 📦 Props Table

| Prop         | Type     | Required | Description                                   |
|--------------|----------|----------|-----------------------------------------------|
| \`title\`     | \`string\` | ✅ Yes   | The testimonial heading or result summary     |
| \`image.url\` | \`string\` | ✅ Yes   | Thumbnail image (usually a success icon)      |
| \`video.url\` | \`string\` | ✅ Yes   | Full MP4 video source                         |

---

### ✨ Ideal Use Cases

- Testimonial sections on product landing pages
- Case study previews inside result modules
- Health program dashboards showing user improvements

---

### ✍️ Content Editing in Strapi

1. Navigate to **Components > Result Video Card**
2. For each card entry, fill:
   - ✅ \`title\`: What result the patient achieved
   - ✅ \`image\`: Upload success icon or illustration
   - ✅ \`video\`: Upload or embed video (MP4 preferred)

💡 **Pro Tip**: Keep videos under 5MB for fast load and mobile-friendly streaming.

---

### 🧪 Edge Cases to Test

- Missing image fallback
- Missing video fallback
- Long titles wrapping over 2 lines
- Multiple cards in a list/grid
- Empty prop safety

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResultVideoCard>;

const commonStyle = { marginBottom: '40px' };

// ✅ All results in vertical layout
export const AllResults: Story = {
  name: 'All Results - Vertical Stack',
  render: () => (
    <div className="space-y-10 bg-gray-50 p-8">
      <div style={commonStyle}>
        <ResultVideoCard
          image={{
            url: 'https://storage.googleapis.com/tap-health-dev-strapi/result1_6387aa839d/result1_6387aa839d.svg',
            alternativeText: 'Blood Sugar Icon',
          }}
          title="Blood Sugar Reduced from 250 to 110 in 2 Weeks"
          video={{
            url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_meal_options_79cbe2089c/dtech25_meal_options_79cbe2089c.mp4',
          }}
        />
      </div>

      <div style={commonStyle}>
        <ResultVideoCard
          image={{
            url: 'https://storage.googleapis.com/tap-health-dev-strapi/dumbell_07560379c1/dumbell_07560379c1.svg',
            alternativeText: 'Energy Boost Icon',
          }}
          title="Felt More Energetic & Active Within 7 Days"
          video={{
            url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_workout_65ca98b631/dtech25_workout_65ca98b631.mp4',
          }}
        />
      </div>

      <div style={commonStyle}>
        <ResultVideoCard
          image={{
            url: 'https://storage.googleapis.com/tap-health-dev-strapi/result3_37a3449a1b/result3_37a3449a1b.svg',
            alternativeText: 'Weight Loss Icon',
          }}
          title="Lost 5kg in 3 Weeks Without Meds"
          video={{
            url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_photo_logging_4e7469c192/dtech25_photo_logging_4e7469c192.mp4',
          }}
        />
      </div>
    </div>
  ),
};

// 🧪 Missing Image
export const MissingImage: Story = {
  args: {
    title: 'No Image Provided',
    video: {
      url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_meal_options_79cbe2089c/dtech25_meal_options_79cbe2089c.mp4',
    },
    image: undefined as any,
  },
};

// 🧪 Missing Video
export const MissingVideo: Story = {
  args: {
    title: 'Missing Video Test',
    image: {
      url: 'https://storage.googleapis.com/tap-health-dev-strapi/result1_6387aa839d/result1_6387aa839d.svg',
      alternativeText: 'Fallback Image',
    },
    video: undefined as any,
  },
};

// 🧪 Long Title Text
export const LongTitle: Story = {
  args: {
    title:
      'Patient Reversed Their Type 2 Diabetes, Lost 7kg, and Improved Energy Levels Dramatically in Just 4 Weeks Without Medication',
    image: {
      url: 'https://storage.googleapis.com/tap-health-dev-strapi/result3_37a3449a1b/result3_37a3449a1b.svg',
      alternativeText: 'Weight Loss',
    },
    video: {
      url: 'https://storage.googleapis.com/tap-health-dev-strapi/dtech25_workout_65ca98b631/dtech25_workout_65ca98b631.mp4',
    },
  },
};

// 🧪 Empty Props
export const EmptyProps: Story = {
  args: {} as any,
};
