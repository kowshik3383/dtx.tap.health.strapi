// ActionButton.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import ActionButton, { ArrowIcon } from '../ActionButton';
describe('ActionButton', () => {
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(
      <ActionButton
        onClick={handleClick}
        leftContent={<span>Left</span>}
        rightContent={<ArrowIcon />}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders left and right content', () => {
    render(
      <ActionButton
        onClick={() => {}}
        leftContent={<span>Left Content</span>}
        rightContent={<span>Right Content</span>}
      />
    );

    expect(screen.getByText('Left Content')).toBeInTheDocument();
    expect(screen.getByText('Right Content')).toBeInTheDocument();
  });
});
