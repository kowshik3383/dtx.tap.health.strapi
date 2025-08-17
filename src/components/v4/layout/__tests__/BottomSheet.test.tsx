/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import BottomSheet from '../BottomSheet';
import '@testing-library/jest-dom';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock useAuth
const mockLogin = vi.fn();
const mockUseAuth = {
  isAuthenticated: false,
  login: mockLogin,
};
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth,
}));

// Mock OTP Modal component
vi.mock('@/components/otp-login-modal', () => ({
  OtpLoginModal: ({ open, handleClose, onLoginSuccess }: any) =>
    open ? (
      <div data-testid="otp-modal">
        <button onClick={() => onLoginSuccess('mock_token')}>Simulate Login</button>
        <button onClick={handleClose}>Close</button>
      </div>
    ) : null,
}));

const mockProps = {
  join_message: 'Join our exclusive plan!',
  mrp: '₹999',
  discounted_price: '₹499',
  per_tag: '/month',
  buttonText: 'Join Now',
};

describe('BottomSheet Component', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockLogin.mockClear();
    mockUseAuth.isAuthenticated = false;
  });

  it('renders pricing content and button text', () => {
    render(<BottomSheet {...mockProps} />);
    expect(screen.getByText(/Join our exclusive plan/i)).toBeInTheDocument();
    expect(screen.getByText(/₹999/i)).toBeInTheDocument();
    expect(screen.getByText(/₹499/i)).toBeInTheDocument();
    expect(screen.getByText(/\/month/i)).toBeInTheDocument();
    expect(screen.getByText(/Join Now/i)).toBeInTheDocument();
  });

  it('shows OTP modal when not authenticated', async () => {
    render(<BottomSheet {...mockProps} />);
    fireEvent.click(screen.getByText(/Join Now/i));

    await waitFor(() => {
      expect(screen.getByTestId('otp-modal')).toBeInTheDocument();
    });
  });

  it('redirects if already authenticated', () => {
    mockUseAuth.isAuthenticated = true;
    render(<BottomSheet {...mockProps} />);
    fireEvent.click(screen.getByText(/Join Now/i));
    expect(mockPush).toHaveBeenCalledWith('/plans');
  });

  it('calls login and redirects after successful OTP login', async () => {
    render(<BottomSheet {...mockProps} />);
    fireEvent.click(screen.getByText(/Join Now/i));

    await waitFor(() => {
      expect(screen.getByTestId('otp-modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Simulate Login/i));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('mock_token');
      expect(mockPush).toHaveBeenCalledWith('/plans');
    });
  });

  it('closes the OTP modal', async () => {
    render(<BottomSheet {...mockProps} />);
    fireEvent.click(screen.getByText(/Join Now/i));

    const closeBtn = await screen.findByText(/Close/i);
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByTestId('otp-modal')).not.toBeInTheDocument();
    });
  });
});
