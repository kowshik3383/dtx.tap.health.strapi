import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Faq from '../Faq';

describe('Faq component', () => {
	const mockProps = {
		heading_line_1: 'Frequently Asked',
		heading_line_2: 'Questions',
		faqs: [
			{
				id: 1,
				question: 'What is diabetes?',
				answer: 'A condition that affects insulin.',
			},
			{
				id: 2,
				question: 'How do I manage it?',
				answer: 'Through medication and lifestyle changes.',
			},
		],
	};

	it('renders heading and all FAQ questions', () => {
		render(<Faq {...mockProps} />);
		expect(screen.getByText('Frequently Asked')).toBeInTheDocument();
		expect(screen.getByText('Questions')).toBeInTheDocument();
		expect(screen.getByText('What is diabetes?')).toBeInTheDocument();
		expect(screen.getByText('How do I manage it?')).toBeInTheDocument();
	});

	it('toggles FAQ answer visibility on click', () => {
		render(<Faq {...mockProps} />);
		const questionBtn = screen.getByText('What is diabetes?');

		// Expand
		fireEvent.click(questionBtn);
		expect(screen.getByText('A condition that affects insulin.')).toBeInTheDocument();

		// Collapse
		fireEvent.click(questionBtn);
		expect(
			screen.queryByText('A condition that affects insulin.')
		).not.toBeInTheDocument();
	});
});
