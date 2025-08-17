/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Testimonial1 from '../Testimonial1';

// ⛔ Disable external side-effects
vi.mock('@/utils/analytics', () => ({ trackFacebookPixelEvent: vi.fn() }));
vi.mock('@/utils/registerIntentEvent', () => ({ registerIntentEvent: vi.fn() }));
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Replace <Image /> with <img />
    return <img {...props} alt={props.alt || 'mock-img'} />;
  },
}));

describe('Testimonial1', () => {
  const mockTestimonials = [
    {
      id: 1,
      name: 'Alice',
      plan: 'Basic',
      quote: 'Love the program!',
      description: 'It helped me manage diabetes better.',
      rating: 4,
      image: { url: '/image-1.jpg' },
      avatar: { url: '/avatar-1.jpg' },
    },
    {
      id: 2,
      name: 'Bob',
      plan: 'Premium',
      quote: 'Excellent support!',
      description: 'Customer service was great.',
      rating: 5,
      image: { url: '/image-2.jpg' },
      avatar: { url: '/avatar-2.jpg' },
    },
  ];


  it('renders all testimonial quotes and names', () => {
    render(<Testimonial1 testimonial_v_2s={mockTestimonials} />);

    expect(screen.getByText('Love the program!')).toBeInTheDocument();
    expect(screen.getByText('Excellent support!')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('does not render if no testimonials', () => {
    const { container } = render(<Testimonial1 testimonial_v_2s={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders carousel dots and allows navigation', () => {
    render(<Testimonial1 testimonial_v_2s={mockTestimonials} />);

    const dots = screen.getAllByRole('button');
    expect(dots.length).toBe(2);

    if (dots[1]) {
      fireEvent.click(dots[1]);
      expect(dots[1]).toHaveAttribute('aria-current', 'true');
    }
    expect(dots[1]).toHaveAttribute('aria-current', 'true');
  });
});
