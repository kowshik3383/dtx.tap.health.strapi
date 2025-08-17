/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DiabetesCareApp from '../DiabetesCareApp';

// ✅ Mock `useInView` to always return visible
vi.mock('react-intersection-observer', () => ({
	useInView: () => ({
		ref: vi.fn(),
		inView: true,
	}),
}));

// ✅ Mock dynamic zone manager
vi.mock('@/components/layout/section-manager', () => ({
	__esModule: true,
	default: ({ dynamicZone }: any) => (
		<div>
			{dynamicZone?.length > 0 && <div>Mocked Dynamic Zone</div>}
		</div>
	),
}));

describe('DiabetesCareApp', () => {
	const mockProps = {
		title: 'Smart Diabetes App',
		description: 'Track, manage and simplify your diabetes journey.',
		dynamic_zone: [
			{
				__component: 'diabetes-care.card',
				id: 101,
				title: 'Blood Sugar Tracker',
				description: 'Track your sugar levels daily.',
			},
		],
	};

	it('renders given title and description', () => {
		render(<DiabetesCareApp {...mockProps} />);
		expect(screen.getByText('Smart Diabetes App')).toBeInTheDocument();
		expect(
			screen.getByText('Track, manage and simplify your diabetes journey.')
		).toBeInTheDocument();
	});

	it('renders fallback text when title/description are missing', () => {
		render(<DiabetesCareApp dynamic_zone={[]} />);
		expect(
			screen.getByText('Everything a diabetic needs or')
		).toBeInTheDocument();
		expect(screen.getByText('in one seamless app or')).toBeInTheDocument();
	});

	it('renders the dynamic zone component when dynamic_zone exists', () => {
		render(<DiabetesCareApp {...mockProps} />);
		expect(screen.getByText('Mocked Dynamic Zone')).toBeInTheDocument();
	});

	it('does not render the dynamic zone component when dynamic_zone is empty', () => {
		render(<DiabetesCareApp title="x" description="y" dynamic_zone={[]} />);
		expect(
			screen.queryByText('Mocked Dynamic Zone')
		).not.toBeInTheDocument();
	});
});
