/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AppRating from '../AppRating';

vi.mock('swiper/react', async () => {
	const actual = await vi.importActual<any>('swiper/react');
	return {
		...actual,
		Swiper: ({ children, onSlideChange }: any) => {
			setTimeout(() => {
				onSlideChange?.({ realIndex: 1 });
			}, 100);
			return <div data-testid="swiper">{children}</div>;
		},
		SwiperSlide: ({ children }: any) => <div data-testid="slide">{children}</div>,
	};
});

vi.mock('swiper/modules', () => ({
	Autoplay: {},
}));

describe('AppRating Component', () => {
	const mockRatings: {
		stars: number;
		rating_value: number;
		label: 'App Store' | 'Play Store';
	}[] = [
			{
				stars: 5,
				rating_value: 4.9,
				label: 'App Store',
			},
			{
				stars: 5,
				rating_value: 5.0,
				label: 'Play Store',
			},
			{
				stars: 5,
				rating_value: 5.0,
				label: 'Play Store',
			},
			{
				stars: 5,
				rating_value: 5.0,
				label: 'Play Store',
			},
			{
				stars: 5,
				rating_value: 5.0,
				label: 'Play Store',
			},
		];

	it('renders nothing when no ratings provided', () => {
		const { container } = render(<AppRating ratings={[]} />);
		expect(container.firstChild).toBeNull();
	});

	it('renders correct number of SwiperSlides', () => {
		render(<AppRating ratings={mockRatings} />);
		expect(screen.getAllByTestId('slide')).toHaveLength(mockRatings.length);
	});

	it('displays rating and label correctly', () => {
		render(<AppRating ratings={mockRatings} />);
		expect(screen.getByText(/4.9/)).toBeInTheDocument();
		expect(screen.getByText(/App Store/)).toBeInTheDocument();
	});

	it('renders correct number of stars for first rating', () => {
		render(<AppRating ratings={mockRatings} />);
		const stars = screen.getAllByTestId('lucide-star');
		expect(stars).toHaveLength(5); // Only the first slide stars will be visible initially
	});

	it('updates dot when slide changes', async () => {
		render(<AppRating ratings={mockRatings} />);
		await waitFor(() => {
			const dots = screen.getAllByRole('presentation');
			expect(dots[1]).toHaveClass('w-4'); // second dot becomes active
		});
	});
});
