/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import FeatureCard from '../FeatureCard';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt = '', ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

describe('FeatureCard', () => {
  const mockProps = {
    title: 'Try 2 Exercises',
    logo: { url: '/tap.png' },
    bold_title_part1: 'to lower',
    bold_title_part2: 'blood sugar',
    bold_title_part3: 'before your next meal',
    cards: [
      {
        image: { url: '/card1.png', alternativeText: 'Walk' },
        title: '10-Min Walk',
        description: 'After meals to lower sugar',
      },
      {
        image: { url: '/card2.png', alternativeText: 'Squat' },
        title: 'Chair Squats',
        description: 'Build strength and control sugar',
      },
    ],
  };

  it('renders main title and bold title parts', () => {
    render(<FeatureCard {...mockProps} />);

    expect(screen.getByText(mockProps.title!)).toBeInTheDocument();
    expect(screen.getByText(mockProps.bold_title_part1!)).toBeInTheDocument();
    expect(screen.getByText(mockProps.bold_title_part2!)).toBeInTheDocument();
    expect(screen.getByText(mockProps.bold_title_part3!)).toBeInTheDocument();
  });

  it('renders logo image', () => {
    render(<FeatureCard {...mockProps} />);
    const images = screen.getAllByRole('img');
    const logoImage = images.find((img) => img.getAttribute('src') === mockProps.logo?.url);
    expect(logoImage).toBeTruthy();
  });

  it('renders all exercise cards', () => {
    render(<FeatureCard {...mockProps} />);

    mockProps.cards.forEach((card) => {
      expect(screen.getByText(card.title!)).toBeInTheDocument();
      expect(screen.getByText(card.description!)).toBeInTheDocument();
    });
  });
});
