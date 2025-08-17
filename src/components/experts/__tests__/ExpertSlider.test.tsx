/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ExpertSlider from '../Expert';
import '@testing-library/jest-dom';

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock framer-motion
vi.mock('framer-motion', async () => {
  return {
    __esModule: true,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
      a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
      blockquote: ({ children, ...props }: any) => (
        <blockquote {...props}>{children}</blockquote>
      ),
    },
    AnimatePresence: ({ children }: any) => <div>{children}</div>,
  };
});

const mockExperts = [
  {
    id: 1,
    name: 'Dr. A',
    credentials: 'MBBS, MD',
    experience: '15+ years',
    quote: 'Diabetes can be managed effectively.',
    linkedin_url: 'https://linkedin.com/in/drb',
    image: {
      url: '/experts/dr-a.jpg',
      alternativeText: 'Dr. A',
    },
  },
  {
    id: 2,
    name: 'Dr. B',
    credentials: 'PhD Endocrinology',
    experience: '10+ years',
    quote: 'Education is the key to control.',
    linkedin_url: 'https://linkedin.com/in/drb',
    image: {
      url: '/experts/dr-b.jpg',
      alternativeText: 'Dr. B',
    },
  },
];

describe('ExpertSlider Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title lines and expert images', () => {
    render(
      <ExpertSlider
        title_line_1="Experts Behind the"
        title_line_2="Program"
        experts={mockExperts}
      />
    );

    expect(
      screen.getByRole('heading', { name: /Experts Behind the/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Program/i)).toBeInTheDocument();

    expect(screen.getByAltText('Dr. A')).toBeInTheDocument();
    expect(screen.getByAltText('Dr. B')).toBeInTheDocument();
  });

  it('shows first expert info by default', () => {
    render(<ExpertSlider experts={mockExperts} />);

    expect(screen.getByText('Dr. A')).toBeInTheDocument();
    expect(screen.getByText(/15\+ years/)).toBeInTheDocument();
    expect(screen.getByText(/Diabetes can be managed/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/drb'
    );

  });

  it('changes expert info on click', () => {
    render(<ExpertSlider experts={mockExperts} />);

    const secondExpertImg = screen.getByAltText('Dr. B');
    fireEvent.click(secondExpertImg);

    expect(screen.getByText('Dr. B')).toBeInTheDocument();
    expect(screen.getByText(/10\+ years/)).toBeInTheDocument();
    expect(screen.getByText(/Education is the key/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
  'href',
  'https://linkedin.com/in/drb'
);

  });

  it('does not crash with empty expert list', () => {
    render(<ExpertSlider experts={[]} />);
    expect(screen.getByText(/Experts Behind the/i)).toBeInTheDocument();
  });
});
