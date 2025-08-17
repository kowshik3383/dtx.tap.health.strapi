/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Ensure this matches exactly how FeatureCard imports it!
const mockExerciseCard2 = vi.fn();
vi.mock('../cards/ExerciseCard2', () => ({
  __esModule: true,
  default: (props: any) => {
    mockExerciseCard2(props);
    return <div data-testid="exercise-card">{props.title}</div>;
  },
}));

import FeatureCard from '../FeatureCard';

describe('FeatureCard', () => {
  beforeEach(() => {
    mockExerciseCard2.mockClear();
  });

  it('renders the provided title', () => {
    render(<FeatureCard title="What You Get" cards={[]} />);
    expect(screen.getByText('What You Get')).toBeInTheDocument();
  });

  it('renders no cards if cards list is empty', () => {
    render(<FeatureCard title="No features" cards={[]} />);
    expect(screen.queryAllByTestId('exercise-card')).toHaveLength(0);
  });

  it('renders cards in pairs (groups of two)', () => {
    const cards = [
      { title: 'Card 1', propA: 'A1' },
      { title: 'Card 2', propA: 'A2' },
      { title: 'Card 3', propA: 'A3' },
    ];
    const { container } = render(<FeatureCard title="Grouped Cards" cards={cards} />);
    const rows = container.querySelectorAll('div.flex.justify-center.gap-4');
    expect(rows.length).toBe(2);
    expect(rows[0]!.querySelectorAll('[data-testid="exercise-card"]').length).toBe(2);
    expect(rows[1]!.querySelectorAll('[data-testid="exercise-card"]').length).toBe(1);
  });

  it('forwards all props to ExerciseCard2 for each card', () => {
    const cards = [
      { title: 'First', foo: 'bar1' },
      { title: 'Second', foo: 'bar2' },
    ];
    render(<FeatureCard title="Test Props" cards={cards} />);
    expect(mockExerciseCard2).toHaveBeenCalledWith(expect.objectContaining(cards[0]), expect.anything());
    expect(mockExerciseCard2).toHaveBeenCalledWith(expect.objectContaining(cards[1]), expect.anything());
  });
});
