/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HowItWorks1 from '../HowItWorks1';

// Mock Swiper and SwiperSlide
vi.mock('swiper/react', () => {
  return {
    Swiper: ({ children }: any) => <div data-testid="swiper">{children}</div>,
    SwiperSlide: ({ children }: any) => <div data-testid="slide">{children}</div>,
  };
});

describe('HowItWorks1 Component', () => {
  const steps = [
    {
      id: 1,
      title: 'Register',
      image: { url: '/step1.png' },
    },
    {
      id: 2,
      title: 'Get Consultation',
      image: { url: '/step2.png' },
    },
    {
      id: 3,
      title: 'Start Treatment',
      image: { url: '/step3.png' },
    },
  ];

  it('renders the tag correctly', () => {
    render(<HowItWorks1 steps={steps} tag="HOW IT WORKS" />);
    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
  });

  it('renders all step titles and step numbers', () => {
    render(<HowItWorks1 steps={steps} />);
    steps.forEach((step, index) => {
      const paddedNumber = String(index + 1).padStart(2, '0');
      expect(screen.getAllByText(step.title).length).toBeGreaterThan(0);
      expect(screen.getAllByText(paddedNumber).length).toBeGreaterThan(0);
    });
  });

  it('renders Swiper slides for mobile', () => {
    render(<HowItWorks1 steps={steps} />);
    expect(screen.getAllByTestId('slide').length).toBe(steps.length);
    expect(screen.getByTestId('swiper')).toBeInTheDocument();
  });
});
