/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';


// Mock next/image as a simple img for test environment
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => (
    <img data-testid="result-image" {...props} />
  ),
}));

import ResultVideoCard from '../ResultVideoCard';

describe('ResultVideoCard', () => {
  const props = {
    imageSrc: '/assets/test.svg',
    videoSrc: '/videos/test.mp4',
    title: 'Test Card Title',
  };

  it('renders the main container with correct layout classes', () => {
    render(<ResultVideoCard {...props} />);
    // outermost div
    const main = screen.getByText('Test Card Title').closest('div');
    expect(main).toHaveClass(
      'flex items-center gap-4 p-3'
    );
  });

  it('renders the title', () => {
    render(<ResultVideoCard {...props} />);
    expect(screen.getByText('Test Card Title')).toBeInTheDocument();
  });

  it('renders the image with the correct src', () => {
    render(<ResultVideoCard {...props} />);
    const img = screen.getByTestId('result-image');
    expect(img).toHaveAttribute('src', '/assets/test.svg');
    expect(img).toHaveClass('object-cover');
  });

it('renders video with the correct src and correct attributes', () => {
  const { container } = render(<ResultVideoCard {...props} />);
  const video = container.querySelector('video') as HTMLVideoElement | null;

  expect(video).not.toBeNull();

  expect(video).toHaveAttribute('src', '/videos/test.mp4');
  expect(video).toHaveAttribute('autoplay');
  expect(video).toHaveAttribute('loop');
  expect(video).toHaveAttribute('muted');
  expect(video).toHaveAttribute('playsinline');
  expect(video).toHaveClass('flex items-center gap-4 p-3');
});


});
