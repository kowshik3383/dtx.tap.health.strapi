/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FewerMedsHero from '../FewerMedsHero';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock VideoPlayer component
vi.mock('../../elements/VideoPlayer', () => ({
  default: ({ url }: { url: string }) => <div data-testid="video-player">Video: {url}</div>,
}));

describe('FewerMedsHero Component', () => {
  const baseProps = {
    logo: { url: '/logo.svg' },
    title: 'Fewer Medicines, Better Health',
    line1: 'We help reduce your meds',
    line2: 'while improving outcomes.',
    video: {
      file: {
        url: 'https://example.com/file-video.mp4',
      },
    },
    video_url: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

 it('renders the title, line1 and line2', () => {
  render(<FewerMedsHero {...baseProps} />);
  expect(screen.getByText('Fewer Medicines, Better Health')).toBeInTheDocument();

  expect(
    screen.getByText((content) =>
      content.includes('We help reduce your meds') &&
      content.includes('while improving outcomes.')
    )
  ).toBeInTheDocument();
});


  it('renders the logo when logo.url is present', () => {
    render(<FewerMedsHero {...baseProps} />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('alt', 'Tap Health Logo');
  });

  it('does not render logo if logo or logo.url is missing', () => {
    render(<FewerMedsHero {...{ ...baseProps, logo: undefined }} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders VideoPlayer with video_url if provided', () => {
    render(
      <FewerMedsHero
        {...{
          ...baseProps,
          video_url: 'https://example.com/direct-url-video.mp4',
          video: undefined,
        }}
      />
    );
    expect(screen.getByTestId('video-player')).toHaveTextContent(
      'https://example.com/direct-url-video.mp4'
    );
  });

  it('renders VideoPlayer with video.file.url if video_url is not provided', () => {
    render(<FewerMedsHero {...baseProps} />);
    expect(screen.getByTestId('video-player')).toHaveTextContent(
      'https://example.com/file-video.mp4'
    );
  });

  it('does not render VideoPlayer if neither video_url nor video.file.url is present', () => {
    render(
      <FewerMedsHero
        {...{
          ...baseProps,
          video_url: '',
          video: undefined,
        }}
      />
    );
    expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
  });
});
