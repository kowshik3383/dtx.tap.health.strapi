/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Hero from '../Hero';
import '@testing-library/jest-dom';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || 'mocked image'} />;
  },
}));

const mockProps = {
  logo: {
    url: '/logo.png',
    name: 'Test Logo',
  },
  tag_line: 'Trusted by millions',
  title_line_1: 'Simplify',
  title_line_2: 'Diabetes Management',
  highlighted_description: '100% Personalized',
  description: 'Manage your diabetes smartly.',
  hero_image: {
    url: '/hero-image.png',
    name: 'Hero Image',
  },
};

describe('Hero Component', () => {
  it('renders all text content correctly', () => {
    render(<Hero {...mockProps} />);

    // Combined heading using regex
    expect(
      screen.getAllByRole('heading', {
        name: /simplify.*diabetes management/i,
      })[0]
    ).toBeInTheDocument();

    // Tagline
    expect(screen.getAllByText(mockProps.tag_line)[0]).toBeInTheDocument();

    // Highlighted description
    expect(
      screen.getAllByText(mockProps.highlighted_description)[0]
    ).toBeInTheDocument();

    // Regular description
    expect(screen.getAllByText(/Manage your diabetes smartly/i)[0]).toBeInTheDocument();
  });

  it('renders hero image correctly', () => {
    render(<Hero {...mockProps} />);
    const images = screen.getAllByAltText(/Hero Image/i);
    expect(images.length).toBeGreaterThan(0);
  });

  it('renders safely with missing optional fields', () => {
    render(
      <Hero
        logo={undefined}
        tag_line=""
        title_line_1=""
        title_line_2=""
        highlighted_description=""
        description=""
        hero_image={undefined}
      />
    );

    // Check section exists (use testId for reliability)
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });
});
