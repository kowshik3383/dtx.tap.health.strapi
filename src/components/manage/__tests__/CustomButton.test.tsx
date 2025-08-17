import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import CustomButton from '../CustomButton';

describe('CustomButton', () => {
  it('renders with default props', () => {
    render(<CustomButton />);
    const button = screen.getByRole('button', { name: /proceed to buy/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Proceed To Buy');
    // Parent div uses default bgColor (#2563EB)
    expect(button.closest('div')).toHaveStyle({ backgroundColor: '#2563EB' });
    // Button should not be disabled by default
    expect(button).toBeEnabled();
  });

  it('renders with custom text and background color', () => {
    render(<CustomButton text="Pay Now" bgColor="#FFAA00" />);
    const button = screen.getByRole('button', { name: /pay now/i });
    expect(button).toBeInTheDocument();
    expect(button.closest('div')).toHaveStyle({ backgroundColor: '#FFAA00' });
  });

  it('applies custom className to button', () => {
    render(<CustomButton className="custom-class" />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('links to the provided href and sets title', () => {
    render(<CustomButton link="https://example.com" />);
    const link = screen.getByTitle('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    // The button should be inside the link
    expect(link.querySelector('button')).toBeInTheDocument();
  });

  it('calls onClick when button is clicked and isVisible', () => {
    const onClick = vi.fn();
    render(<CustomButton onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when isVisible is false', () => {
    const onClick = vi.fn();
    render(<CustomButton isVisible={false} onClick={onClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Disabled buttons won't fire click events
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not crash without optional props', () => {
    render(<CustomButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
