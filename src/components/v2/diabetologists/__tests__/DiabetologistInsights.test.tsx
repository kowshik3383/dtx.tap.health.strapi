/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// ---- Mocks ----

// Lucide-react icons
vi.mock('lucide-react', () => ({
  Volume2: (props: any) => <svg data-testid="vol2" {...props} />,
  VolumeX: (props: any) => <svg data-testid="volx" {...props} />,
  Maximize: (props: any) => <svg data-testid="maxi" {...props} />,
}));

// next/image as simple <img>
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// VideoPlayer
vi.mock('../VideoPlayer', () => ({
  __esModule: true,
  default: React.forwardRef<HTMLDivElement, any>(
    ({ url, muted, playing, onReady }, ref) => {
      React.useEffect(() => {
        if (typeof onReady === 'function') {
          onReady();
        }
      }, [onReady]);

      return (
        <div data-testid="video-player" ref={ref}>
          <span data-testid="vp-url">{url}</span>
          <span data-testid="vp-muted">{muted ? 'muted' : 'unmuted'}</span>
          <span data-testid="vp-playing">{playing ? 'playing' : 'paused'}</span>
        </div>
      );
    }
  )
}));

import DiabetologistInsights from '../DiabetologistInsights';

// ---- Tests ----

describe('DiabetologistInsights', () => {
  const baseProps = {
    title_line1_part1: "Learn",
    highlighted_title: "Better",
    title_line1_part2: "with us",
    title_line2: "Diabetologist's Tips",
    video: { file: { url: '/media/video.mp4' } },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all title parts, highlighted title, and title_line2', () => {
    render(<DiabetologistInsights {...baseProps} />);
    expect(screen.getByText(/Learn/)).toBeInTheDocument();
    expect(screen.getByText(/Better/)).toBeInTheDocument();
    expect(screen.getByText(/with us/)).toBeInTheDocument();
    expect(screen.getByText(/Diabetologist's Tips/)).toBeInTheDocument();
  });

  it('renders VideoPlayer using video_url if provided', () => {
    render(<DiabetologistInsights {...baseProps} video_url="/myvid.mp4" />);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('vp-url')).toHaveTextContent('/myvid.mp4');
  });

  it('renders VideoPlayer using video.file.url if video_url is undefined', () => {
    render(<DiabetologistInsights {...baseProps} video_url={undefined} />);
    expect(screen.getByTestId('video-player')).toBeInTheDocument();
    expect(screen.getByTestId('vp-url')).toHaveTextContent('/media/video.mp4');
  });

  it('video is initially muted and playing', () => {
    render(<DiabetologistInsights {...baseProps} video_url={undefined} />);
    expect(screen.getByTestId('vp-muted')).toHaveTextContent('muted');
    expect(screen.getByTestId('vp-playing')).toHaveTextContent('playing');
  });

  it('renders VolumeX icon and "Unmute" label when muted, toggles to Volume2 and "Mute"', async () => {
    render(<DiabetologistInsights {...baseProps} />);
    expect(screen.getByTestId('volx')).toBeInTheDocument();
    expect(screen.getByText('Unmute')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /unmute/i }));
    await waitFor(() => {
      expect(screen.getByTestId('vol2')).toBeInTheDocument();
      expect(screen.getByText('Mute')).toBeInTheDocument();
    });
  });

  it('renders Maximize icon and "Fullscreen" label for the fullscreen button', () => {
    render(<DiabetologistInsights {...baseProps} />);
    expect(screen.getByTestId('maxi')).toBeInTheDocument();
    expect(screen.getByText('Fullscreen')).toBeInTheDocument();
  });

  it('calls handleFullscreen when clicking fullscreen button', async () => {
    const requestFullscreenMock = vi.fn(() => Promise.resolve());
    const playMock = vi.fn(() => Promise.resolve());
    Object.defineProperty(HTMLDivElement.prototype, 'querySelector', {
      value: function () {
        return {
          requestFullscreen: requestFullscreenMock,
          play: playMock,
          muted: true,
        };
      },
      configurable: true,
    });

    render(<DiabetologistInsights {...baseProps} />);
    fireEvent.click(screen.getByRole('button', { name: /fullscreen/i }));
    await waitFor(() => expect(requestFullscreenMock).toHaveBeenCalled());
  });

  it('does not render VideoPlayer if no video_url and no video.file.url', () => {
    render(
      <DiabetologistInsights
        title_line1_part1="A"
        highlighted_title="B"
        title_line1_part2="C"
        title_line2="Whatever"
      />
    );
    expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
  });

  it('remutes when exiting fullscreen (fullscreenchange event)', () => {
    render(<DiabetologistInsights {...baseProps} />);
    fireEvent(
      document,
      new Event('fullscreenchange', { bubbles: true })
    );
    expect(screen.getByText('Unmute')).toBeInTheDocument();
  });
});
