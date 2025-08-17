import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import DiabeticControl from '../DiabeticControl';

// ✅ Mock DiabeticControlCard to avoid rendering inner logic
vi.mock('../cards/DiabeticControlCard', () => ({
	__esModule: true,
	default: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe('DiabeticControl', () => {
	const mockProps = {
		title: 'Manage Diabetes Effectively',
		description: 'Your daily control tools in one place.',
		diabetesControlCards: [
			{
				id: 1,
				title: 'Blood Sugar Tracker',
				description: 'Track levels daily',
				icon: {
					url: '/tracker.svg',
					name: 'Tracker',
				},
			},
			{
				id: 2,
				title: 'Insulin Reminders',
				description: 'Never miss a dose',
				icon: {
					url: '/reminder.svg',
					name: 'Reminder',
				},
			},
		],
	};

	it('renders title and description', () => {
		render(<DiabeticControl {...mockProps} />);
		expect(screen.getByText(mockProps.title)).toBeInTheDocument();
		expect(screen.getByText(mockProps.description)).toBeInTheDocument();
	});

	it('renders all diabetic control cards', () => {
		render(<DiabeticControl {...mockProps} />);
		expect(screen.getByText('Blood Sugar Tracker')).toBeInTheDocument();
		expect(screen.getByText('Insulin Reminders')).toBeInTheDocument();
	});

	it('does not render description if not provided', () => {
		const props = { ...mockProps, description: undefined };
		render(<DiabeticControl {...props} />);
		expect(screen.queryByText('Your daily control tools in one place.')).not.toBeInTheDocument();
	});
});
