import { render, screen } from '@testing-library/react';
import React from 'react'; 
import { describe,expect, it  } from 'vitest';
import TrustSealBanner from '../TrustSealBanner';
import '@testing-library/jest-dom';

describe('TrustSealBanner', () => {
	const mockSeals = [
		{
			logo: { url: '/seal1.png', name: 'Seal One' },
			stars: 5,
			rating: '4.9/5',
			first_line_text: 'Trusted by doctors',
			second_line_text: 'Verified results',
		},
		{
			logo: { url: '/seal2.png', name: 'Seal Two' },
			stars: 3,
			rating: '3.5/5',
			first_line_text: 'Popular choice',
			second_line_text: 'Loved by users',
		},
	];

	it('renders all seal cards correctly', () => {
		render(<TrustSealBanner trusted_seals={mockSeals} />);
		expect(screen.getAllByRole('img')).toHaveLength(2);
		expect(screen.getByText(/4.9\/5/)).toBeInTheDocument();
		expect(screen.getByText(/3.5\/5/)).toBeInTheDocument();
		expect(screen.getByText(/Trusted by doctors/)).toBeInTheDocument();
		expect(screen.getByText(/Verified results/)).toBeInTheDocument();
		expect(screen.getByText(/Popular choice/)).toBeInTheDocument();
		expect(screen.getByText(/Loved by users/)).toBeInTheDocument();
	});

	it('renders correct number of stars per seal', () => {
		render(<TrustSealBanner trusted_seals={mockSeals} />);
		const stars = screen.getAllByText('★');
		expect(stars).toHaveLength(8); // 5 + 3
	});

	it('uses fallback alt text if logo.name is missing', () => {
		const seals = [
			{
				logo: { url: '/no-name.png' },
				stars: 4,
				rating: '4.0/5',
				first_line_text: 'Some text',
				second_line_text: 'More text',
			},
		];
		render(<TrustSealBanner trusted_seals={seals} />);
		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('alt', 'Seal Logo');
	});

	it('renders nothing if trusted_seals is empty', () => {
		render(<TrustSealBanner trusted_seals={[]} />);
		expect(screen.queryAllByRole('img')).toHaveLength(0);
		expect(screen.queryByText('★')).not.toBeInTheDocument();
	});
});
