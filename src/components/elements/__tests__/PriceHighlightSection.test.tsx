/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import PriceHighlightSection from '../PriceHighlightSection';
// Mock Lottie component
vi.mock('react-lottie', () => ({
  __esModule: true,

  default: ({ isStopped }: any) => (
    <div data-testid="lottie-mock">{`Lottie animation - isStopped: ${isStopped}`}</div>
  ),
}));

// Mock price.json
vi.mock('../../../public/price.json', () => ({}));

// Mock Intersection Observer
vi.mock('react-intersection-observer', async () => {
  return {
    useInView: () => [vi.fn(), true], // true = inView
  };
});

describe('PriceHighlightSection', () => {
  it('renders the heading text', () => {
    render(<PriceHighlightSection />);
    expect(
      screen.getByText(/Get smart diabetes care for the price of a/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/monthly newspaper/i)).toBeInTheDocument();
    expect(screen.getByText(/subscription./i)).toBeInTheDocument();
  });

  it('renders Lottie animation container', () => {
    render(<PriceHighlightSection />);
    expect(screen.getByTestId('lottie-mock')).toBeInTheDocument();
  });

  it('displays price note text', () => {
    render(<PriceHighlightSection />);
    expect(
      screen.getByText(/per month on annual plan/i)
    ).toBeInTheDocument();
  });

  it('plays animation when in view', () => {
    render(<PriceHighlightSection />);
    expect(screen.getByTestId('lottie-mock')).toHaveTextContent(
      'isStopped: false'
    );
  });
});
