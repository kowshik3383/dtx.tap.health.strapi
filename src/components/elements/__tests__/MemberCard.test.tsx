/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import MemberCard from '../MemberCard';
// You need to mock Next.js Image for testing
vi.mock('next/image', () => ({
	__esModule: true,
	default: (props: any) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img {...props} alt={props.alt || 'mocked image'} />;
	},
}));

describe('MemberCard', () => {
	const mockProps = {
		name: 'Jane Doe',
		position: 'Software Engineer',
		text: 'Jane is an expert in TypeScript and front-end architecture.',
		imgSrc: '/mock-profile.png',
		linkedInLink: 'https://linkedin.com/in/janedoe',
	};

	it('renders all props correctly', () => {
		render(<MemberCard {...mockProps} />);

		// Check if image alt text is rendered
		expect(screen.getByAltText(/Jane Doe - Software Engineer/i)).toBeInTheDocument();

		// Check for LinkedIn logo
		expect(screen.getByAltText('LinkedIn')).toBeInTheDocument();

		// Check name and position text
		expect(screen.getByText(mockProps.name)).toBeInTheDocument();
		expect(screen.getByText(mockProps.position)).toBeInTheDocument();

		// Check description
		expect(screen.getByText(mockProps.text)).toBeInTheDocument();
	});

	it('renders LinkedIn link correctly', () => {
		render(<MemberCard {...mockProps} />);
		const link = screen.getByRole('link');

		expect(link).toHaveAttribute('href', mockProps.linkedInLink);
		expect(link).toHaveAttribute('target', '_blank');
		expect(link).toHaveAttribute('rel', 'noopener noreferrer');
	});
});
