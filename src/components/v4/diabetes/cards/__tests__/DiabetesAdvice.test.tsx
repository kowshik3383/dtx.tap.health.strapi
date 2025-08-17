import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DiabetesAdvice from '../DiabetesAdvice';

const defaultProps = {
  title: 'Friendly Reminder',
  sub_title: 'Diabetic Sleep Tip',
  bot: {
    url: '/assets/gif1.gif',
    name: 'Assistant Icon',
  },
  ai_message:
    'Midnight cravings? Take a glass of warm milk! It’ll help you get a peaceful sleep and a full stomach.',
};

describe('DiabetesAdvice Component', () => {
  it('renders title and subtitle correctly', () => {
    render(<DiabetesAdvice {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.sub_title)).toBeInTheDocument();
  });

  it('renders the assistant message correctly', () => {
    render(<DiabetesAdvice {...defaultProps} />);
    expect(screen.getByText(defaultProps.ai_message)).toBeInTheDocument();
  });

  it('renders the assistant image when bot data is present', () => {
    render(<DiabetesAdvice {...defaultProps} />);
    const img = screen.getByAltText('Assistant Icon');
    expect(img).toBeInTheDocument();
  });

  it('renders default message when ai_message is not provided', () => {
    render(<DiabetesAdvice {...{ ...defaultProps, ai_message: undefined }} />);
    expect(
      screen.getByText(
        /Midnight cravings\? Take a glass of warm milk!/i
      )
    ).toBeInTheDocument();
  });
});
