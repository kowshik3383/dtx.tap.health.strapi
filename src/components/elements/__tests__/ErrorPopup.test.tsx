import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { beforeEach, describe, it, vi } from 'vitest';
import { ErrorPopup } from '../ErrorPopup';

describe('ErrorPopup', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('does not render if show is false', () => {
		render(<ErrorPopup show={false} message="Something went wrong" />);
		expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
	});

	it('renders with correct message', () => {
		render(<ErrorPopup show={true} message="Something went wrong" />);
		expect(screen.getByText('Something went wrong')).toBeInTheDocument();
	});

	it('redirects to Android Play Store on Android user agent', () => {
		Object.defineProperty(window, 'navigator', {
			value: { userAgent: 'Android' },
			configurable: true,
		});

		const mockLocation = { href: '', assign: vi.fn() };
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			configurable: true,
		});

		render(<ErrorPopup show={true} message="Error!" />);
		fireEvent.click(screen.getByText('Open app'));

		expect(mockLocation.href).toContain('play.google.com');
	});

	it('redirects to iOS App Store on iPhone user agent', () => {
		Object.defineProperty(window, 'navigator', {
			value: { userAgent: 'iPhone' },
			configurable: true,
		});

		const mockLocation = { href: '', assign: vi.fn() };
		Object.defineProperty(window, 'location', {
			value: mockLocation,
			configurable: true,
		});

		render(<ErrorPopup show={true} message="iOS User" />);
		fireEvent.click(screen.getByText('Open app'));

		expect(mockLocation.href).toContain('apps.apple.com');
	});

	it('shows alert on unsupported platform', () => {
		Object.defineProperty(window, 'navigator', {
			value: { userAgent: 'Windows' },
			configurable: true,
		});

		window.alert = vi.fn();

		render(<ErrorPopup show={true} message="Other device" />);
		fireEvent.click(screen.getByText('Open app'));

		expect(window.alert).toHaveBeenCalledWith(
			'Your platform is not supported for direct download.'
		);
	});
});
