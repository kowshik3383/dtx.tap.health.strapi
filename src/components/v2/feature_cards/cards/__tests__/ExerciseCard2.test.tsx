/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
 // or 'jest' if using Jest
import ExerciseCard2 from '../ExerciseCard2';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Render img tag with passed props
    return <img {...props} alt={props.alt || 'image'} />;
  },
}));

describe('ExerciseCard2 Component', () => {
  const mockProps = {
    title: 'Yoga Stretch',
    description: 'Improves flexibility and relaxation.',
    image: {
      url: '/yoga.png',
      name: 'Yoga Image',
    },
  };

  it('renders title and description correctly', () => {
    render(<ExerciseCard2 {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('renders image with correct src and alt', () => {
    render(<ExerciseCard2 {...mockProps} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockProps.image.url);
    expect(img).toHaveAttribute('alt', mockProps.image.name);
  });

  it('handles missing image gracefully', () => {
    const noImageProps = {
      title: 'Cardio Blast',
      description: 'Increases endurance.',
      image: undefined,
    };

    render(<ExerciseCard2 {...noImageProps} />);

    expect(screen.getByText(noImageProps.title)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('fallbacks to alt text based on title when image.name is missing', () => {
    const imageWithoutName = {
      title: 'Cycling',
      description: 'Great for heart health.',
      image: {
        url: '/cycle.png',
        name: undefined,
      },
    };

    render(<ExerciseCard2 {...imageWithoutName} />);
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('alt', `${imageWithoutName.title} image`);
  });
});
