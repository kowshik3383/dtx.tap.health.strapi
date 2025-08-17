/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { components } from '@/types/strapi';
import PhotoLogging from '../PhotoLogging';
import '@testing-library/jest-dom';

// Mock next/image
vi.mock('next/image', () => ({
  default: (props: any) => {
    return <img {...props} alt={props.alt || 'mocked image'} />;
  },
}));


describe('PhotoLogging Component', () => {
  const mockProps: components['schemas']['DynamicZoneDataLoggingComponent'] = {
    title: 'Log Your Meals',
    sub_title: 'Automatically detect food items',
    card: {
      title: 'Take a photo of your meal',
      description: 'We’ll detect food and calculate nutrition.',
      image: {
        url: '/assets/v4/foodscanning.svg',
        name: 'foodscan',
      },
    },
    image: {
      url: '/assets/v4/mic.svg',
      name: 'mic',
    },
  };

  it('renders the title and subtitle', () => {
    render(<PhotoLogging {...mockProps} />);
    expect(screen.getByText('Log Your Meals')).toBeInTheDocument();
    expect(screen.getByText('Automatically detect food items')).toBeInTheDocument();
  });

  it('renders card title and description', () => {
    render(<PhotoLogging {...mockProps} />);
    expect(screen.getByText('Take a photo of your meal')).toBeInTheDocument();
    expect(screen.getByText('We’ll detect food and calculate nutrition.')).toBeInTheDocument();
  });

  it('renders card and mic images', () => {
    render(<PhotoLogging {...mockProps} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', '/assets/v4/foodscanning.svg');
    expect(images[1]).toHaveAttribute('src', '/assets/v4/mic.svg');
  });

  it('renders fallback text when card props are missing', () => {
    render(<PhotoLogging title="Fallback" sub_title="Check this" image={{ url: '/assets/v4/mic.svg' }} />);
    expect(screen.getByText('Take a photo of your meal')).toBeInTheDocument();
    expect(screen.getByText(/Automatically detects your food/i)).toBeInTheDocument();
  });
});
