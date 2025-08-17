import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import type { components } from '@/types/strapi';
import FeaturesSection from '../FeaturesSection';
type Feature = NonNullable<components['schemas']['DynamicZoneGetFeaturesComponent']['features']>[number];

const mockFeatures: Feature[] = [
  {
    id: 1,
    feature: 'Track your sugar levels easily',
    icon: {
      id: 1,
      name: 'Icon1',
      url: '/test-icon.svg',
      width: 32,
      height: 32,
      formats: null,
      hash: '',
      ext: '',
      mime: '',
      size: 0,
      provider: '',
      provider_metadata: null,
      alternativeText: '',
      caption: '',
    },
  },
  {
    id: 2,
    feature: 'Monitor diet with AI',
    icon: {
      id: 2,
      name: 'Icon2',
      url: '/test-icon2.svg',
      width: 32,
      height: 32,
      formats: null,
      hash: '',
      ext: '',
      mime: '',
      size: 0,
      provider: '',
      provider_metadata: null,
      alternativeText: '',
      caption: '',
    },
  },
];

describe('FeaturesSection', () => {
  it('renders section title correctly', () => {
    render(<FeaturesSection title="Why Use Tap?" features={mockFeatures} />);
    expect(screen.getByText('Why Use Tap?')).toBeInTheDocument();
  });

  it('renders all features with correct text', () => {
    render(<FeaturesSection title="Features" features={mockFeatures} />);
    for (const feature of mockFeatures) {
      expect(screen.getByText(feature.feature!)).toBeInTheDocument();
    }
  });

  it('does not break if no features are passed', () => {
    render(<FeaturesSection title="Empty Features" features={[]} />);
    expect(screen.getByText('Empty Features')).toBeInTheDocument();
  });

  it('does not render image if icon or icon.url is missing', () => {
    const featuresWithoutIcons: Feature[] = [
      {
        id: 3,
        feature: 'No icon feature',
        icon: null,
      } as unknown as Feature,
    ];

    render(<FeaturesSection title="No Icons" features={featuresWithoutIcons} />);
    expect(screen.getByText('No icon feature')).toBeInTheDocument();
  });
});
