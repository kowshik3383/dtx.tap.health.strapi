import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import WhatYouGet from '../WhatYouGet';

describe('WhatYouGet Component', () => {
	it('renders heading and all features with check icons', () => {
		render(<WhatYouGet />);
		
		// Check heading
		expect(screen.getByText(/what you get/i)).toBeInTheDocument();

		// Check each feature text
		const features = [
			'Blood glucose logging',
			'Smart medication reminders',
			'Meal recommendations & plan',
			'Instant meal insights',
			'Log your meals with a photo',
			'Easy, guided exercise routines',
			'24/7 access to your AI Health Coach',
		];

		features.forEach(feature => {
			expect(screen.getByText(feature)).toBeInTheDocument();
		});

		// Check icon count
		const checkIcons = screen.getAllByTestId('included-icon');
		expect(checkIcons).toHaveLength(features.length);
	});
});
