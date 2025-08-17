import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import FeaturePromoCard from '../FeaturePromoCard';

// 🔧 Mock Lottie animation
vi.mock('react-lottie', () => ({
  default: () => <div data-testid="lottie-animation" />,
}));

// 🔧 Mock react-intersection-observer
vi.mock('react-intersection-observer', () => ({
  useInView: () => [{ ref: vi.fn() }, true], // [ref, inView]
}));

// 🔧 Mock fetch for Lottie JSON
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ mock: 'lottie data' }),
    })
  ) as unknown as typeof fetch;
});

afterEach(() => {
  vi.clearAllMocks();
});

// 🧪 Mock Props
const mockProps = {
  title: 'Get smart diabetes care for the price of a',
  animatedSection: {
    lottie_animation: { url: 'https://example.com/lottie.json' },
  },
  animated_loop: false,
  highlighted_title1: 'monthly newspaper',
  highlighted_title2: 'subscription.',
  price_per_tag: 'per month',
  features_title: 'What will you get in the app?',
  features: [
    {
      id: 1,
      feature: 'Feature 1',
      icon: undefined,
    },
    {
      id: 2,
      feature: 'Feature 2',
      icon: undefined,
    },
  ],
};

// ✅ Test Suite
describe('FeaturePromoCard', () => {
  it('renders titles and highlights correctly', () => {
    render(<FeaturePromoCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.highlighted_title1)).toBeInTheDocument();
    expect(screen.getByText(mockProps.highlighted_title2)).toBeInTheDocument();
    expect(screen.getByText(mockProps.price_per_tag)).toBeInTheDocument();
  });

  it('renders Lottie animation component', () => {
    render(<FeaturePromoCard {...mockProps} />);
    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
  });

  it('fetches Lottie JSON on mount', async () => {
    render(<FeaturePromoCard {...mockProps} />);
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        'https://example.com/lottie.json'
      )
    );
  });

  it('renders feature section title and feature items', () => {
    render(<FeaturePromoCard {...mockProps} />);
    expect(screen.getByText(mockProps.features_title)).toBeInTheDocument();
    mockProps.features.forEach((feature) => {
      expect(screen.getByText(feature.feature)).toBeInTheDocument();
    });
  });
});
