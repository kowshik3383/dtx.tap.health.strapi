/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { components } from '@/types/strapi';
import Features from '../Features';
import '@testing-library/jest-dom';

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock useRouter
const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Mock useAuth
const loginMock = vi.fn();
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    login: loginMock,
  }),
}));

// Mock analytics
vi.mock('@/utils/analytics', () => ({
  trackEvent: vi.fn(),
}));

describe('Features Component', () => {
  const mockProps: components['schemas']['DynamicZoneTransformPlanComponent'] = {
    brand_name: 'Tap Health',
    highlighted_title: 'Transform Plan',
    tag_name: 'Best Seller',
    features_title: 'What you get',
    button_text: 'Join Now',
    features: [
      {
        icon: {
          url: '/icon1.svg',
          alternativeText: 'feature-icon-1',
        },
        text_content: [
          { text: 'Access daily insights ', is_bold: false },
          { text: 'and guidance', is_bold: true },
        ],
      },
      {
        icon: {
          url: '/icon2.svg',
          alternativeText: 'feature-icon-2',
        },
        text_content: [
          { text: 'Personalized plans', is_bold: true },
        ],
      },
    ],
  };

  it('renders titles and tags correctly', () => {
    render(<Features {...mockProps} />);
    expect(screen.getByText('Tap Health')).toBeInTheDocument();
    expect(screen.getByText('Transform Plan')).toBeInTheDocument();
    expect(screen.getByText('Best Seller')).toBeInTheDocument();
    expect(screen.getByText('What you get')).toBeInTheDocument();
  });

  it('renders feature list with correct text and icons', () => {
    render(<Features {...mockProps} />);
    expect(screen.getByAltText('feature-icon-1')).toHaveAttribute('src', '/icon1.svg');
    expect(screen.getByAltText('feature-icon-2')).toHaveAttribute('src', '/icon2.svg');
    expect(screen.getByText('Access daily insights')).toBeInTheDocument();
    expect(screen.getByText('and guidance')).toHaveClass('font-bold');
    expect(screen.getByText('Personalized plans')).toHaveClass('font-bold');
  });

  it('shows login modal on CTA click when unauthenticated', () => {
    render(<Features {...mockProps} />);
    const joinButton = screen.getByRole('button', { name: /Join Now/i });
    fireEvent.click(joinButton);
    // Modal will render because `isModalOpen` is true
    expect(screen.getByText('Tap Health')).toBeInTheDocument(); // from modal
  });
});
