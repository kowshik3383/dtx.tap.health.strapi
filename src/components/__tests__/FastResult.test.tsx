import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import FastResult from '../FastResult';

// Mock ResultVideoCard just to verify rendering without logic
vi.mock('../cards/ResultVideoCard', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe('FastResult', () => {
  const mockProps = {
    title: 'See Real Results Fast',
    description: 'Watch how people improved in weeks.',
    results: [
      {
        id: 1,
        title: 'Result A',
        video: {
          url: '/videos/result-a.mp4',
          name: 'Result A',
        },
        user: {
          name: 'John',
          age: 40,
        },
      },
      {
        id: 2,
        title: 'Result B',
        video: {
          url: '/videos/result-b.mp4',
          name: 'Result B',
        },
        user: {
          name: 'Priya',
          age: 35,
        },
      },
    ],
  };

  it('renders title and description if provided', () => {
    render(<FastResult {...mockProps} />);
    expect(screen.getByText('See Real Results Fast')).toBeInTheDocument();
    expect(
      screen.getByText('Watch how people improved in weeks.')
    ).toBeInTheDocument();
  });

  it('renders all result video cards', () => {
    render(<FastResult {...mockProps} />);
    expect(screen.getByText('Result A')).toBeInTheDocument();
    expect(screen.getByText('Result B')).toBeInTheDocument();
  });

  it('renders grid with fullscreen layout when fullscreen=true', () => {
    const { container } = render(<FastResult {...mockProps} fullscreen={true} />);
    const gridDiv = container.querySelector('div.grid');
    expect(gridDiv?.className).toMatch(/grid-cols-1/);
    expect(gridDiv?.className).toMatch(/md:grid-cols-2/);
    expect(gridDiv?.className).toMatch(/xl:grid-cols-4/);
  });

  it('renders grid with single column layout when fullscreen=false', () => {
    const { container } = render(<FastResult {...mockProps} fullscreen={false} />);
    const gridDiv = container.querySelector('div.grid');
    expect(gridDiv?.className).toContain('grid-cols-1');
    expect(gridDiv?.className).not.toContain('md:grid-cols-2');
  });

  it('does not render title/description if not provided', () => {
    const { queryByText } = render(
      <FastResult results={mockProps.results} fullscreen={false} />
    );
    expect(queryByText('See Real Results Fast')).not.toBeInTheDocument();
    expect(
      queryByText('Watch how people improved in weeks.')
    ).not.toBeInTheDocument();
  });
});
