/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { components } from '@/types/strapi';
import DiabetesSimplified from '../DiabetesSimplified';
import '@testing-library/jest-dom';

// Mock next/image correctly for vitest
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe('DiabetesSimplified Component', () => {
  const mockProps: components['schemas']['DynamicZoneDiabetesSimplefiedComponent'] = {
    title: 'Understand Diabetes Better',
    highlighted_title: 'Tap Health Simplifies Diabetes For You',
    feature_cards: [
      {
        featurecard: {
          title: 'Monitor Sugar Levels',
          description: 'Track glucose daily',
          image: {
            url: '/assets/v4/sugar.svg',
            name: 'sugar-icon',
          },
        },
        description: 'Helps you track daily metrics',
        highlighted_description: 'for better decisions',
      },
      {
        featurecard: {
          title: 'Diet Guidance',
          description: 'Smart food tips',
          image: {
            url: '/assets/v4/diet.svg',
            name: 'diet-icon',
          },
        },
        description: 'Personalized meal plans',
        highlighted_description: 'to manage carbs',
      },
    ],
  };

  it('renders titles correctly', () => {
    render(<DiabetesSimplified {...mockProps} />);
    expect(screen.getByText(/Understand Diabetes Better/i)).toBeInTheDocument();
    expect(screen.getByText(/Tap Health Simplifies Diabetes For You/i)).toBeInTheDocument();
  });

  it('renders feature card content', () => {
    render(<DiabetesSimplified {...mockProps} />);
    expect(screen.getByText(/Monitor Sugar Levels/i)).toBeInTheDocument();
    expect(screen.getByText(/Track glucose daily/i)).toBeInTheDocument();
    expect(screen.getByText(/Helps you track daily metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/for better decisions/i)).toBeInTheDocument();

    expect(screen.getByText(/Diet Guidance/i)).toBeInTheDocument();
    expect(screen.getByText(/Smart food tips/i)).toBeInTheDocument();
    expect(screen.getByText(/Personalized meal plans/i)).toBeInTheDocument();
    expect(screen.getByText(/to manage carbs/i)).toBeInTheDocument();
  });

  it('renders all images with correct alt text', () => {
    render(<DiabetesSimplified {...mockProps} />);
    const image1 = screen.getByAltText('sugar-icon');
    const image2 = screen.getByAltText('diet-icon');
    expect(image1).toHaveAttribute('src', '/assets/v4/sugar.svg');
    expect(image2).toHaveAttribute('src', '/assets/v4/diet.svg');
  });
});
