/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it } from 'vitest';
import ResultVideoCard from '../ResultVideoCard';

describe('ResultVideoCard', () => {
	it('renders with image, title and video correctly', () => {
		const mockProps = {
			title: 'Mock Result Title',
			image: {
				url: '/mock-image.jpg',
				alternativeText: 'Mock Image Alt',
			},
			video: {
				url: '/mock-video.mp4',
			},
		} as any;

		render(<ResultVideoCard {...mockProps} />);
	});

	it('renders without image or video gracefully', () => {
		const mockProps = {
			title: 'Only Title Provided',
			image: null,
			video: null,
		} as any;

		render(<ResultVideoCard {...mockProps} />);
	});
});
