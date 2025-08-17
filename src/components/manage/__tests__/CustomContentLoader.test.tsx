/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';


// Mock ContentLoader - because we just want to see it renders with the right props
vi.mock('react-content-loader', () => ({
  __esModule: true,
  default: ({ height, ...rest }: any) => (
    <svg data-testid="content-loader" height={height} {...rest}>
      <rect
        data-testid="content-rect"
        x="0"
        y="0"
        width="100%"
        height={height}
        rx="12"
        ry="12"
      />
    </svg>
  ),
}));

import CustomContentLoader from '../CustomContentLoader';

describe('CustomContentLoader', () => {
  it('renders the loader with default height', () => {
    render(<CustomContentLoader />);
    // svg with height attribute 70
    expect(screen.getByTestId('content-loader')).toHaveAttribute('height', '70');
    // rect with correct height
    expect(screen.getByTestId('content-rect')).toHaveAttribute('height', '70');
  });

  it('renders the loader with given custom height', () => {
    render(<CustomContentLoader height={120} />);
    expect(screen.getByTestId('content-loader')).toHaveAttribute('height', '120');
    expect(screen.getByTestId('content-rect')).toHaveAttribute('height', '120');
  });

  it('uses the correct container classes', () => {
    render(<CustomContentLoader />);
    expect(screen.getByTestId('content-loader').parentElement).toHaveClass(
      'mt-2',
      'flex',
      'items-center',
      'justify-center'
    );
  });

  it('renders without error if no props are provided', () => {
    render(<CustomContentLoader />);
    expect(screen.getByTestId('content-loader')).toBeInTheDocument();
  });
});
