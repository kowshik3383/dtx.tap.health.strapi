import { render, screen } from '@testing-library/react';
import GlucoseTracking from '../GlucoseTracking';
import '@testing-library/jest-dom';

describe('GlucoseTracking Component', () => {
  const mockData = {
    title: 'Track Your Glucose',
    sub_title: 'Easily and accurately',
    image: {
      url: '/mock-graph.png',
      alternativeText: 'Mock Graph',
    },
  };

  it('renders the title and subtitle correctly', () => {
    render(<GlucoseTracking {...mockData} />);
    expect(screen.getByText('Track Your Glucose')).toBeInTheDocument();
    expect(screen.getByText('Easily and accurately')).toBeInTheDocument();
  });

  it('renders the image with correct alt text and URL', () => {
    render(<GlucoseTracking {...mockData} />);
    const image = screen.getByAltText('Mock Graph');
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toEqual(
      expect.stringContaining(encodeURIComponent(mockData.image.url))
    );
  });

  it('renders fallback text when title and subtitle are missing', () => {
    render(<GlucoseTracking image={mockData.image} />);
    expect(screen.getByText('Glucose Tracking')).toBeInTheDocument();
    expect(screen.getByText('Track your blood sugar easily, stress free!')).toBeInTheDocument();
  });
});
