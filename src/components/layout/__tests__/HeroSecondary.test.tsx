/* eslint-disable @typescript-eslint/no-explicit-any */
// HeroSecondary.test.tsx
import { render, screen } from '@testing-library/react';
import React from 'react';
import {  describe, expect, it, vi } from 'vitest';
// Mock next/image and framer-motion
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Use img directly for testing
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  },
}));
import HeroSecondary from '../HeroSecondary';

describe('HeroSecondary', () => {
  // Minimal default props for smoke rendering
  const baseProps = {
    logo: { url: '/logo.svg', name: 'Brand Logo' },
    mainTitle: 'Main Title',
    titlePrimary: undefined,
    titleSecondary: undefined,
    line1: undefined,
    line2: undefined,
    subTitle: 'This is a subtitle',
    description: 'This is a description',
    highlightedDescription: '1.6%',
    image: { url: '/person.jpg' },
    isLandscape: false,
  };

  it('renders the logo image if logo prop with url is provided', () => {
    render(<HeroSecondary {...baseProps} />);
    expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
  });

  it('renders both lines if titlePrimary and titleSecondary are provided', () => {
    render(
      <HeroSecondary
        {...baseProps}
        titlePrimary="First"
        titleSecondary="Second"
        mainTitle={undefined}
      />
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders mainTitle if only mainTitle is provided', () => {
    render(
      <HeroSecondary
        {...baseProps}
        mainTitle="The Main Title"
        titlePrimary={undefined}
        titleSecondary={undefined}
      />
    );
    expect(screen.getByText('The Main Title')).toBeInTheDocument();
  });

  it('renders both lines if line1 and line2 are provided (no titlePrimary/Secondary)', () => {
    render(
      <HeroSecondary
        {...baseProps}
        titlePrimary={undefined}
        titleSecondary={undefined}
        line1="Line 1"
        line2="Line 2"
      />
    );
    expect(screen.getByText('Line 1')).toBeInTheDocument();
    expect(screen.getByText('Line 2')).toBeInTheDocument();
  });

  it('renders the subtitle if provided', () => {
    render(<HeroSecondary {...baseProps} />);
    expect(screen.getByText(baseProps.subTitle)).toBeInTheDocument();
  });

  it('renders the description and highlightedDescription', () => {
    render(<HeroSecondary {...baseProps} />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    expect(screen.getByText(baseProps.highlightedDescription!)).toBeInTheDocument();
  });

  it('renders only description (no highlightedDescription)', () => {
    render(<HeroSecondary {...baseProps} highlightedDescription={undefined} />);
    expect(screen.getByText('This is a description')).toBeInTheDocument();
    // highlightedDescription should not render
    expect(screen.queryByText('1.6%')).not.toBeInTheDocument();
  });

  it('renders the image if image with url is provided', () => {
    render(<HeroSecondary {...baseProps} />);
    // There are now two images with alt="Person using tap.health app" and alt="Logo"
    expect(screen.getByRole('img', { name: /tap\.health app/i })).toBeInTheDocument();
  });

  it('does not render images if neither logo nor image is provided', () => {
    render(<HeroSecondary {...baseProps} logo={undefined} image={undefined} />);
    // Should not find any image by those alt texts
    expect(screen.queryByAltText(/logo/i)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/tap\.health app/i)).not.toBeInTheDocument();
  });
});
