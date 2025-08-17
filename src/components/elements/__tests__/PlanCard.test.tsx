/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import PlanCard from '../PlanCard';

// Properly mock framer-motion with valid object types
vi.mock('framer-motion', () => {
	return {
		motion: {
			div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
			p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
			h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
		},
	};
});

describe('PlanCard Component', () => {
	it('renders with required title only', () => {
		render(<PlanCard title="Basic Plan" />);
		expect(screen.getByText('Basic Plan')).toBeInTheDocument();
	});

	it('renders title and subtitle correctly', () => {
		render(<PlanCard title="Pro Plan" subtitle="Best for growth" />);
		expect(screen.getByText('Pro Plan')).toBeInTheDocument();
		expect(screen.getByText('Best for growth')).toBeInTheDocument();
	});

	it('renders with price', () => {
		render(<PlanCard title="Starter" price="$29/month" />);
		expect(screen.getByText('$29/month')).toBeInTheDocument();
	});

	it('applies default className if none provided', () => {
		const { container } = render(<PlanCard title="Default Class" />);
		expect(container.firstChild).toHaveClass('-mt-8');
	});

	it('applies custom className if provided', () => {
		const { container } = render(
			<PlanCard title="Custom Class" className="custom-class" />
		);
		expect(container.firstChild).toHaveClass('custom-class');
	});
});
