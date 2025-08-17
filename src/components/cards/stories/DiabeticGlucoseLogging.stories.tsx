'use client';

import { Meta, StoryObj } from '@storybook/react';
import Glucometer from '../../../../public/Glucometer.json';
import DiabeticGlucoseLogging from '../DiabeticGlucoseLogging';

const meta: Meta<typeof DiabeticGlucoseLogging> = {
	title: 'Cards/DiabeticGlucoseLogging',
	component: DiabeticGlucoseLogging,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
## 💉 DiabeticGlucoseLogging Card

The **DiabeticGlucoseLogging** component visually highlights blood glucose tracking using Lottie animations and supporting content.

---

### 🔧 Component Breakdown

| Prop              | Type       | Required | Description |
|-------------------|------------|----------|-------------|
| \`title\`           | \`string\`  | ✅ Yes   | Main heading |
| \`description\`     | \`string\`  | ✅ Yes   | Subtext or explanation |
| \`icon.url\`        | \`string\`  | ✅ Yes   | Icon shown on the left |
| \`lottie_json\`     | \`object\`  | ✅ Yes   | Animation file (JSON object) |
| \`animation_loop\`  | \`boolean\` | No      | Should animation repeat |
| \`lottie_animation\`| \`object\`  | No      | Strapi-uploaded meta for animation |

---

### 🛠 Usage in Strapi

- Go to **Components > GlucoseLogging**
- Set:
  - ✅ Title
  - ✅ Description
  - ✅ Icon (SVG preferred)
  - ✅ Lottie animation (upload .json)
  - ✅ Loop toggle

---

### 🧪 Edge Case Tests Covered

| Test | Behavior |
|------|----------|
| ✅ Default | All data present |
| ✅ NoIcon | Icon missing |
| ✅ NoAnimation | Lottie missing |
| ✅ LongText | Overflow-safe UI |
| ✅ NoLoop | Animation runs once |
| ✅ EmptyProps | Defensive fallback |

---

### 💡 Dev Tip

Avoid animations over **1MB** to preserve mobile performance. Always test SSR-safe behavior with dynamic imports if needed.
        `,
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof DiabeticGlucoseLogging>;

const defaultIcon = {
  url: 'https://cdn-icons-png.flaticon.com/512/1752/1752616.png',
  name: 'Blood Drop Icon',
};

export const Default: Story = {
  name: 'Default with local Lottie',
  args: {
    title: 'Glucose Monitoring Simplified',
    description: 'Track your glucose effortlessly with visual feedback.',
    icon: defaultIcon,
    lottie_json: Glucometer,
    animation_loop: true,
  },
};

export const WithRemoteLottie: Story = {
  name: 'Remote Lottie JSON',
  args: {
    title: 'Remote Glucose Animation',
    description: 'Loads Lottie from URL dynamically.',
    icon: defaultIcon,
    lottie_animation: {
      url: 'https://storage.googleapis.com/tap-health-dev-strapi/Glucometer_c9184ccff5/Glucometer_c9184ccff5.json',
    },
    animation_loop: true,
  },
};

export const BrokenRemoteFallback: Story = {
  name: 'Broken URL fallback to local',
  args: {
    title: 'Fallback Example',
    description: 'If Lottie URL fails, local Glucometer animation is shown.',
    icon: defaultIcon,
    lottie_animation: {
      url: 'https://broken-url.com/invalid.json',
    },
    animation_loop: false,
  },
};

export const Minimal: Story = {
  name: 'Minimal Props (Uses Defaults)',
  args: {},
};
