import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ExerciseCard from '../ExerciseCard';

describe('ExerciseCard', () => {
	it('renders the title, description, and image correctly', () => {
		render(
			<ExerciseCard
				title="Push Ups"
				description="A great upper body workout"
				image={{
					url: '/exercise/pushup.jpg',
					name: 'Push Up Image',
					alternativeText: 'Push up',
					width: 300,
					height: 200,
				}}
			/>
		);

		// Title and description
		expect(screen.getByText('Push Ups')).toBeInTheDocument();
		expect(screen.getByText('A great upper body workout')).toBeInTheDocument();

		// Image
		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('alt', 'Push Ups');
	});

	it('does not render image if image URL is missing', () => {
		render(
			<ExerciseCard
				title="No Image Exercise"
				description="No image should render"
				image={undefined}
			/>
		);

		expect(screen.getByText('No Image Exercise')).toBeInTheDocument();
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});

	it('uses default alt text if title is missing', () => {
		render(
			<ExerciseCard
				title={undefined}
				description="No title here"
				image={{
					url: '/exercise/squat.jpg',
					name: 'Squat Image',
					alternativeText: '',
					width: 200,
					height: 200,
				}}
			/>
		);

		const img = screen.getByRole('img');
		expect(img).toHaveAttribute('alt', 'Exercise Image');
	});
});
