/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe,expect, it, vi } from 'vitest';
import DiabeticControlCard from '../DiabeticControlCard'; // adjust to correct path

vi.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		// mock next/image to render a basic img
		const { src, alt, ...rest } = props;
		return <img src={src} alt={alt} {...rest} />;
	},
}));

vi.mock('@/lib/strapi/optimisedImage', () => ({
	optimisedImageUrl: (image: any) => image?.url || '',
}));

describe('DiabeticControlCard', () => {
	const baseProps = {
		image: {
			url: '/test-image.jpg',
			alternativeText: 'Test Image',
		},
		text: 'Line 1\nLine 2',
	};

	it('renders image and text correctly', () => {
		render(<DiabeticControlCard {...baseProps} />);

		// Image check
		const image = screen.getByRole('img');
		expect(image).toHaveAttribute('src', '/test-image.jpg');
		expect(image).toHaveAttribute('alt', 'Test Image');

		// Text check
		expect(screen.getByText('Line 1')).toBeInTheDocument();
		expect(screen.getByText('Line 2')).toBeInTheDocument();
	});

	it('renders reversed layout when isReversed is true', () => {
		const { container } = render(
			<DiabeticControlCard {...baseProps} isReversed />
		);
		const flexRow = container.querySelector('div.flex-row-reverse');
		expect(flexRow).toBeInTheDocument();
	});

	it('does not break when no image or text provided', () => {
		render(<DiabeticControlCard image={undefined} text={undefined} />);
		expect(screen.queryByRole('img')).not.toBeInTheDocument();
	});
});
