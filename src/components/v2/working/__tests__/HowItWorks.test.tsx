import { render, screen } from '@testing-library/react';
import HowItWorks from '../HowItWorks';

describe('HowItWorks Component', () => {
  const steps = [
    {
      id: 1,
      title: 'Register',
      image: { url: '/step1.png' },
    },
    {
      id: 2,
      title: 'Get Consultation',
      image: { url: '/step2.png' },
    },
  ];

  it('renders tag and titles', () => {
    render(
      <HowItWorks
        tag="How it works"
        title_part1="Start your"
        highlighted_title="journey"
        title_part2="today"
        steps={steps}
      />
    );

    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /start your journey today/i })
    ).toBeInTheDocument();
  });

  it('renders all steps with correct titles and numbers', () => {
    render(
      <HowItWorks
        tag="How it works"
        title_part1="Start your"
        highlighted_title="journey"
        title_part2="today"
        steps={steps}
      />
    );

    steps.forEach((step, index) => {
      const stepTitleInstances = screen.getAllByText(step.title);
      expect(stepTitleInstances.length).toBeGreaterThan(0); // found in both mobile & desktop
      expect(
        screen.getAllByText(String(index + 1).padStart(2, '0')).length
      ).toBeGreaterThan(0);
    });
  });
});
