/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TapHealthPricing from '../PricingComparison';
import '@testing-library/jest-dom';

// Mocking next/image for SSR environments
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'mock-image'} />,
}));

const mockPlans = [
  {
    logo: { url: '/logo1.png', alternativeText: 'Plan 1 Logo' },
    included: [{ value: true }, { value: false }],
    price: '₹499',
  },
  {
    logo: { url: '/logo2.png', alternativeText: 'Plan 2 Logo' },
    included: [{ value: false }, { value: true }],
    price: '₹699',
  },
];

const mockFeatures = [
  { text1: '24x7 Doctor Access', text1_bold: true, text2: '', text2_bold: false },
  { text1: 'Home Sample Pickup', text1_bold: false, text2: '', text2_bold: false },
];

describe('TapHealthPricing', () => {
  it('does not render anything when plans are empty', () => {
    const { container } = render(
      <TapHealthPricing title="Test" primaryTitle="Primary" plans={[]} features={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders headings, prices, features, and logos', () => {
    render(
      <TapHealthPricing
        title="Top Features"
        primaryTitle="Choose the best plan"
        plans={mockPlans}
        features={mockFeatures}
      />
    );

    // Titles
    expect(screen.getByText('Top Features')).toBeInTheDocument();
    expect(screen.getByText('Choose the best plan')).toBeInTheDocument();

    // Prices
    expect(screen.getByText('₹499')).toBeInTheDocument();
    expect(screen.getByText('₹699')).toBeInTheDocument();

    // Features
    expect(screen.getByText('24x7 Doctor Access')).toBeInTheDocument();
    expect(screen.getByText('Home Sample Pickup')).toBeInTheDocument();

    // Logos
    expect(screen.getByAltText('Plan 1 Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Plan 2 Logo')).toBeInTheDocument();
  });

  it('renders correct number of logos and prices', () => {
    render(
      <TapHealthPricing
        title="Compare"
        primaryTitle="Benefits"
        plans={mockPlans}
        features={mockFeatures}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(2);

    const price1 = screen.getByText('₹499');
    const price2 = screen.getByText('₹699');
    expect(price1).toBeInTheDocument();
    expect(price2).toBeInTheDocument();
  });
});
