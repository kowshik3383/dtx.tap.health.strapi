import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { components } from '@/types/strapi';
import FoodCard from '../FoodCard';

const mockProps: components['schemas']['SharedGridiconFeatureComponent'] = {
	title: 'Low Sugar Recipes',
	description: 'Healthy food alternatives',
	icon: '🍎',
	backgroundColor: 'rgb(240, 240, 240)', // ✅ Fixed
};

describe('FoodCard Component', () => {
	it('renders title and description correctly', () => {
		render(<FoodCard {...mockProps} />);
		expect(screen.getByText('Low Sugar Recipes')).toBeInTheDocument();
		expect(screen.getByText('Healthy food alternatives')).toBeInTheDocument();
	});

	it('renders icon inside a styled div', () => {
		render(<FoodCard {...mockProps} />);
		expect(screen.getByText('🍎')).toBeInTheDocument();
	});

	it('applies background color to icon container', () => {
		const { container } = render(<FoodCard {...mockProps} />);
		const iconContainer = container.querySelector('div[style]');
		expect(iconContainer?.getAttribute('style')).toContain('background-color: rgb(240, 240, 240)'); // ✅ Fixed
	});

	it('renders navigation arrow', () => {
		const { container } = render(<FoodCard {...mockProps} />);
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});
});
