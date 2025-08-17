import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import { components } from '@/types/strapi';
import DiabetesAssistant from '../DiabetesAssistant';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useInView: () => true,
    motion: {
      div: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    },
  };
});

describe('DiabetesAssistant minimal test', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
  });

  const mockProps: components['schemas']['ItemsAssistantComponent'] = {
    title: 'My Diabetes Assistant',
    description: 'Instant support',
    icon: {
      url: '/test-icon.png',
      name: 'icon',
    },
    userMessage: 'Test user',
    assistantMessage: 'Test response',
  };

  it('renders without error and types messages', () => {
    render(<DiabetesAssistant {...mockProps} />);
    vi.advanceTimersByTime(2000); // Fast-forward to trigger both messages
  });

  it('renders with empty props (fallback)', () => {
    render(<DiabetesAssistant title="" description="" />);
    vi.advanceTimersByTime(2000);
  });

  it('renders without icon', () => {
    render(
      <DiabetesAssistant
        title="Without Icon"
        description="No icon here"
        userMessage="Hi"
        assistantMessage="Hello"
      />
    );
    vi.advanceTimersByTime(2000);
  });
});
