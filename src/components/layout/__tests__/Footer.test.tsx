/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import Footer from '../Footer';
import '@testing-library/jest-dom';

// Mock next/navigation
vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

// Mock IntersectionObserver
class IntersectionObserverMock {
	constructor(public cb: any) {}
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// Mock trackEvent
vi.mock('@/utils/analytics', () => ({
	trackEvent: vi.fn(),
}));

describe('Footer component', () => {
	const mockFooter = {
		logo: { url: '/logo.svg' },
		name: 'Genix',
		address: 'Hyderabad, Telangana',
		description_main: 'Main description',
		description_sub: 'Sub description',
		footer_links: [
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'About Us', href: '/about' },
		],
		social_links: [
			{ icon: { url: '/icon.png' }, href: 'https://twitter.com' },
		],
	};

	it('renders logo, address, and description', () => {
		render(<Footer show_footer_links={true} show_social_links={true} footer={mockFooter} />);

		expect(screen.getByAltText('Footer Logo')).toBeInTheDocument();
		expect(screen.getByText(/Genix/i)).toBeInTheDocument();
		expect(screen.getByText(/Hyderabad/i)).toBeInTheDocument();
		expect(screen.getByText(/Main description/)).toBeInTheDocument();
		expect(screen.getByText(/Sub description/)).toBeInTheDocument();
	});

	it('renders footer links and calls router.push on click', () => {
		const { getByText } = render(
			<Footer show_footer_links={true} show_social_links={false} footer={mockFooter} />
		);

		const link = getByText('Privacy Policy');
		fireEvent.click(link);
		expect(link).toBeInTheDocument();
	});

	it('renders social links correctly', () => {
		render(<Footer show_footer_links={false} show_social_links={true} footer={mockFooter} />);
		expect(screen.getByAltText('social icon')).toBeInTheDocument();
	});
});
