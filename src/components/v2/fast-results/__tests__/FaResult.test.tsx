/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';


// Mock ResultVideoCard so we can check props and rendering
const mockResultVideoCard = vi.fn();
vi.mock('../ResultVideoCard', () => ({
  __esModule: true,
  default: (props: any) => {
    mockResultVideoCard(props);
    return (
      <div data-testid="ResultVideoCard" key={props.title}>
        <span>{props.title}</span>
        <span>{props.imageSrc}</span>
        <span>{props.videoSrc}</span>
      </div>
    );
  },
}));

import FastResult from '../FaResult';

describe('FastResult', () => {
  beforeEach(() => {
    mockResultVideoCard.mockClear();
  });

  it('renders section with title and subtitle', () => {
    render(<FastResult />);
    expect(screen.getByText('Fast results')).toBeInTheDocument();
    expect(screen.getByText('Reduce Your HbA1C in 3 Months')).toBeInTheDocument();
  });

  it('renders all results as ResultVideoCard components with proper props', () => {
    render(<FastResult />);
    // Should render three cards (may be duplicated in StrictMode)
    const cards = screen.getAllByTestId('ResultVideoCard');
    // Check there are at least three cards rendered
    expect(cards.length).toBeGreaterThanOrEqual(3);

    // Assert the three titles are present in the DOM (robust and matches user intent)
    expect(screen.getByText('Without strict diet restrictions')).toBeInTheDocument();
    expect(screen.getByText('Without a hard workout regime')).toBeInTheDocument();
    expect(screen.getByText('Without expensive coaching subscription')).toBeInTheDocument();
  });

 it('renders the cards in a flex container', () => {
  render(<FastResult />);
  const card = screen.getByText('Without strict diet restrictions');

  let container: HTMLElement | null = card.closest('div');

  for (let i = 0; i < 5 && container; ++i) {
    if (
      typeof container.className === 'string' &&
      container.className.includes('flex')
    ) {
      break;
    }
    container = container.parentElement;
  }

  expect(container).not.toBeNull();
  expect(container?.className).toMatch(/flex/);
});

});
