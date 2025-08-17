/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// --- Mocks ---
vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: any) => (<img {...props} />),
}));

const pushMock = vi.fn();

// Router Mock
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

// Auth Mock (stable)
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ token: 'abc123' }),
}));

// We will customize these store values per test!
const cancelSubscriptionMock = vi.fn();
const storeMock = {
  subscribedPlan: [{ subscriptionId: 'sub_456' }],
  isRefundEligible: true,
  cancelSubscription: cancelSubscriptionMock,
};
vi.mock('@/store', () => ({
  useSubscriptionStore: () => storeMock,
}));

vi.mock('@/components/manage/CustomTextArea', () => ({
  __esModule: true,
  default: ({ value, onChange, ...props }: any) => (
    <textarea data-testid="feedback-textarea" value={value} onChange={onChange} {...props} />
  ),
}));

vi.mock('@/components/manage/CustomButton', () => ({
  __esModule: true,
  default: ({ text, onClick, ...props }: any) => (
    <button data-testid="custom-button" onClick={onClick} {...props}>{text}</button>
  ),
}));

// --- Component Under Test ---
import CancelFeedBack from '../CancelFeedBack';

describe('CancelFeedback', () => {
  beforeEach(() => {
    pushMock.mockClear();
    cancelSubscriptionMock.mockClear();
    // Reset the store to defaults before every test:
    storeMock.subscribedPlan = [{ subscriptionId: 'sub_456' }];
    storeMock.isRefundEligible = true;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props and required UI', () => {
    render(<CancelFeedBack />);
    expect(screen.getByText('Cancel Subscription')).toBeInTheDocument();
    expect(screen.getByText('Why are you cancelling?')).toBeInTheDocument();
    expect(screen.getByText('This helps us improve and serve you better')).toBeInTheDocument();
    expect(screen.getByTestId('feedback-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });

  it('renders given custom purposes and button text', () => {
    render(<CancelFeedBack purpose="Refund Request" buttonText="Get refund" />);
    expect(screen.getByText('Refund Request')).toBeInTheDocument();
    expect(screen.getByText('Get refund')).toBeInTheDocument();
  });

  it('routes to /manage_subscription when back button is clicked', () => {
    render(<CancelFeedBack />);
    const backButton = screen.getByRole('button', { name: /back_icon/i });
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalledWith('/manage_subscription');
  });

  it('changes feedback text area value', () => {
    render(<CancelFeedBack />);
    const textarea = screen.getByTestId('feedback-textarea');
    fireEvent.change(textarea, { target: { value: 'Not useful' } });
    expect(textarea).toHaveValue('Not useful');
  });


  it('calls cancelSubscription and routes on submit', () => {
    // Set up the store mock for this test
    storeMock.subscribedPlan = [{ subscriptionId: 'plan123' }];
    storeMock.isRefundEligible = true;
    render(<CancelFeedBack buttonText="Cancel subscription" />);
    const submitContainer = screen.getByText('Cancel subscription').closest('div');
    fireEvent.click(submitContainer!);
    expect(cancelSubscriptionMock).toHaveBeenCalledWith('plan123', false, 'abc123');
    expect(pushMock).toHaveBeenCalledWith('/manage_subscription_cancel_clicked');
  });

  it('calls cancelSubscription and routes with refund when buttonText is "Get refund"', () => {
    // Alter store for refund scenario
    storeMock.subscribedPlan = [{ subscriptionId: 'planXYZ' }];
    storeMock.isRefundEligible = true;
    render(<CancelFeedBack buttonText="Get refund" />);
    const submitContainer = screen.getByText('Get refund').closest('div');
    fireEvent.click(submitContainer!);
    expect(cancelSubscriptionMock).toHaveBeenCalledWith('planXYZ', true, 'abc123');
    expect(pushMock).toHaveBeenCalledWith('/manage_subscription_cancel_clicked');
  });

  it('shows N/A as subscriptionId if missing', () => {
    // Empty subscribedPlan array
    storeMock.subscribedPlan = [];
    storeMock.isRefundEligible = false;
    render(<CancelFeedBack />);
    const submitContainer = screen.getByTestId('custom-button').closest('div');
    fireEvent.click(submitContainer!);
    expect(cancelSubscriptionMock).toHaveBeenCalledWith('N/A', false, 'abc123');
    expect(pushMock).toHaveBeenCalled();
  });
});
