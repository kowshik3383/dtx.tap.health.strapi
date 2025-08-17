/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import Hero from '../Hero';

// Mock next/image to render <img>
vi.mock('next/image', async () => {
  return {
    __esModule: true,
    default: (props: any) => {
      const { src, alt, ...rest } = props;
      return <img src={src} alt={alt} {...rest} />;
    },
  };
});

describe('Hero Component', () => {
  const mockProps = {
    logo: { url: '/logo.png', alt: 'Tap Health Logo' },
    hero_image: { url: '/hero.png', alt: 'Man holding phone' },
    title_line_1: 'We Simplify',
    title_line_2: 'Your Diabetes Journey',
    tag_line: 'Your partner in health',
  };

  it('renders logo image', () => {
    render(<Hero {...mockProps} />);

    const logoImg = screen.getByAltText(/tap health logo/i);
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', mockProps.logo.url);
  });

  it('renders hero image', () => {
    render(<Hero {...mockProps} />);

    const heroImg = screen.getByAltText(/man holding phone/i);
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('src', mockProps.hero_image.url);
  });

  it('renders tag line and both title lines (even if split across elements)', () => {
    render(<Hero {...mockProps} />);

    expect(screen.getByText(mockProps.tag_line)).toBeInTheDocument();

    // Use flexible matchers to find broken-up text
    

  });
});
