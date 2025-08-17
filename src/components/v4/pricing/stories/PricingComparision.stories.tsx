'use client';

import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { components } from '@/types/strapi';
import PricingComparisonSection from '../PricingComparisionSection';

type PricingComparisonComponentType =
  components['schemas']['DynamicZonePricingComparisonComponent'];

const defaultData: PricingComparisonComponentType = {
  id: 1,
  title: 'Choose Your Plan',
  primaryTitle: 'Flexible Pricing for Every Need',
};

const missingTitle: PricingComparisonComponentType = {
  id: 2,
  title: '',
  primaryTitle: 'Only Primary Title Visible',
};

const missingPrimaryTitle: PricingComparisonComponentType = {
  id: 3,
  title: 'Only Subtitle Visible',
  primaryTitle: '',
};

const missingBoth: PricingComparisonComponentType = {
  id: 4,
  title: '',
  primaryTitle: '',
};

const meta: Meta<typeof PricingComparisonSection> = {
  title: 'Components/Pricing/PricingComparisonSection',
  component: PricingComparisonSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 📊 PricingComparisonSection

Displays a flexible pricing layout with subtitle and primary title pulled from Strapi's \`DynamicZonePricingComparisonComponent\`.

#### 🔌 Input Type (Strapi)
\`\`\`ts
type PricingComparisonComponentType = {
  id: number;
  title?: string;
  primaryTitle?: string;
};
\`\`\`

#### ✅ Edge Cases Covered:
- Default usage with all fields
- Missing \`title\`
- Missing \`primaryTitle\`
- Missing both fields
- Dark mode rendering
- Mobile viewport simulation
        `,
      },
    },
  },
};

export default meta;

// ✅ Default Case
export const Default: StoryObj<typeof PricingComparisonSection> = {
  name: '✅ Default',
  render: () => <PricingComparisonSection {...defaultData} />,
};

// ⚠️ Missing Subtitle (title)
export const MissingTitle: StoryObj<typeof PricingComparisonSection> = {
  name: '⚠️ Missing Subtitle',
  render: () => <PricingComparisonSection {...missingTitle} />,
};

// ⚠️ Missing Main Title (primaryTitle)
export const MissingPrimaryTitle: StoryObj<typeof PricingComparisonSection> = {
  name: '⚠️ Missing Main Title',
  render: () => <PricingComparisonSection {...missingPrimaryTitle} />,
};

// ❌ Missing Both Fields
export const MissingBothFields: StoryObj<typeof PricingComparisonSection> = {
  name: '❌ Missing Both Fields',
  render: () => <PricingComparisonSection {...missingBoth} />,
};

// 🌙 Dark Mode Test
export const DarkMode: StoryObj<typeof PricingComparisonSection> = {
  name: '🌙 Dark Mode',
  render: () => (
    <div className="dark bg-black text-white p-10">
      <PricingComparisonSection {...defaultData} />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 📱 Mobile Viewport Test
export const MobileViewport: StoryObj<typeof PricingComparisonSection> = {
  name: '📱 Mobile Viewport',
  render: () => <PricingComparisonSection {...defaultData} />,
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};
