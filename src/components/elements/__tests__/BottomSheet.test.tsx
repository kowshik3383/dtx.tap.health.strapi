import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { components } from '@/types/strapi';
import BottomSheet from '../BottomSheet';

const mockPush = vi.fn();
const mockLogin = vi.fn();

// --- Mocks ---
vi.mock('next/navigation', async () => ({
	usePathname: () => '/fewer_meds_more_moments',
	useRouter: () => ({
		push: mockPush,
	}),
}));

vi.mock('@/hooks/useAuth', async () => ({
	useAuth: () => ({
		login: mockLogin,
		isAuthenticated: false,
	}),
}));

vi.mock('@/components/elements', async () => ({
	ActionButton: ({
		onClick,
		id,
		rightContent,
	}: {
		onClick: (e: React.MouseEvent) => void;
		id: string;
		rightContent: React.ReactNode;
	}) => (
		<button data-testid={id} onClick={onClick}>
			{rightContent}
		</button>
	),
}));

vi.mock('@/components/otp-login-modal', async () => ({
	OtpLoginModal: ({
		open,
		handleClose,
		onLoginSuccess,
	}: {
		open: boolean;
		handleClose: () => void;
		onLoginSuccess: (token: string) => void;
	}) => (
		<div data-testid="otp-modal">
			{open && (
				<>
					<button
						data-testid="login-success"
						onClick={() => onLoginSuccess('mock-token')}
					>
						Mock Login
					</button>
					<button data-testid="modal-close" onClick={handleClose}>
						Close Modal
					</button>
				</>
			)}
		</div>
	),
}));

// --- Types ---
type BottomSheetProps = Partial<components['schemas']['DynamicZoneBottomSheetComponent']> & {
	price?: string;
	period?: string;
	buttonText?: string;
	offerText?: string;
	onBottomSheetClick?: () => void;
};

// --- Tests ---
describe('BottomSheet', () => {
	let onBottomSheetClick: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		onBottomSheetClick = vi.fn();
		mockPush.mockReset();
		mockLogin.mockReset();
	});

	const renderComponent = (props: BottomSheetProps = {}) =>
		render(<BottomSheet {...props} onBottomSheetClick={onBottomSheetClick} />);

	it('renders price and period correctly for fewer_meds page', () => {
		renderComponent({ price: '₹499', period: 'per year' });

		expect(screen.getByText('per year')).toBeInTheDocument();
		expect(screen.getByText('₹499')).toBeInTheDocument();
	});

	it('renders offerText if provided', () => {
		renderComponent({ offerText: 'Limited Time Offer' });
		expect(screen.getByText('Limited Time Offer')).toBeInTheDocument();
	});

	it('calls onBottomSheetClick when button is clicked', () => {
		renderComponent({ buttonText: 'Join Now' });

		fireEvent.click(screen.getByTestId('bottom-sheet-cta-button'));

		expect(onBottomSheetClick).toHaveBeenCalledTimes(1);
	});

	it('opens modal if not authenticated', async () => {
		renderComponent();

		fireEvent.click(screen.getByTestId('bottom-sheet-cta-button'));

		await waitFor(() => {
			expect(screen.getByTestId('otp-modal')).toBeInTheDocument();
		});
	});

	it('calls login and navigates on login success', async () => {
		renderComponent();

		fireEvent.click(screen.getByTestId('bottom-sheet-cta-button'));

		await waitFor(() => {
			fireEvent.click(screen.getByTestId('login-success'));
		});

		expect(mockLogin).toHaveBeenCalledWith('mock-token');
		expect(mockPush).toHaveBeenCalledWith('/plans');
	});

	it('closes the modal when handleClose is triggered', async () => {
		renderComponent();

		fireEvent.click(screen.getByTestId('bottom-sheet-cta-button'));

		await waitFor(() => {
			fireEvent.click(screen.getByTestId('modal-close'));
		});

		expect(screen.getByTestId('otp-modal')).toBeInTheDocument();
	});
});
