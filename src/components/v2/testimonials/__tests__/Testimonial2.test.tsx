/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Testimonial from '../Testimonial2';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'mock-img'} />,
}));

// Mock swipeable hook
vi.mock('react-swipeable', () => ({
  useSwipeable: () => ({}),
}));

// Mock testimonials data
vi.mock('../data', () => ({
  testimonials: [
    {
      id: 1,
      name: 'Alice',
      plan: 'Basic',
      quote: 'Amazing app!',
      description: 'It changed my life.',
      rating: 4,
      avatar: '/avatar1.jpg',
    },
    {
      id: 2,
      name: 'Bob',
      plan: 'Pro',
      quote: 'So helpful!',
      description: 'Now I manage my health better.',
      rating: 5,
      avatar: '/avatar2.jpg',
    },
  ],
}));

describe('Testimonial Component', () => {
  it('renders the header text', () => {
    render(<Testimonial />);
    expect(screen.getByText(/REAL RESULTS\. REAL IMPACT/i)).toBeInTheDocument();
    expect(screen.getByText(/Join 150,000\+ Indians/i)).toBeInTheDocument();
  });

  it('renders testimonial cards', () => {
    render(<Testimonial />);
    expect(screen.getByText('Amazing app!')).toBeInTheDocument();
    expect(screen.getByText('So helpful!')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });


});
