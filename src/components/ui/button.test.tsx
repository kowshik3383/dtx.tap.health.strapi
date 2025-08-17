import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mail } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './button';

describe('Button Component', () => {
	it('renders correctly with default props', () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole('button', { name: /click me/i });

		expect(button).toBeInTheDocument();
		expect(button).toHaveClass('bg-primary');
		expect(button).not.toBeDisabled();
	});

	it('renders with different variants', () => {
		const { rerender } = render(
			<Button variant="destructive">Destructive</Button>,
		);
		let button = screen.getByRole('button', { name: /destructive/i });
		expect(button).toHaveClass('bg-destructive');

		rerender(<Button variant="outline">Outline</Button>);
		button = screen.getByRole('button', { name: /outline/i });
		expect(button).toHaveClass('border');
		expect(button).toHaveClass('bg-background');

		rerender(<Button variant="secondary">Secondary</Button>);
		button = screen.getByRole('button', { name: /secondary/i });
		expect(button).toHaveClass('bg-secondary');

		rerender(<Button variant="ghost">Ghost</Button>);
		button = screen.getByRole('button', { name: /ghost/i });
		expect(button).not.toHaveClass('bg-primary');

		rerender(<Button variant="link">Link</Button>);
		button = screen.getByRole('button', { name: /link/i });
		expect(button).toHaveClass('text-primary');
		expect(button).toHaveClass('hover:underline');
	});

	it('renders with different sizes', () => {
		const { rerender } = render(<Button size="default">Default</Button>);
		let button = screen.getByRole('button', { name: /default/i });
		expect(button).toHaveClass('h-9');

		rerender(<Button size="sm">Small</Button>);
		button = screen.getByRole('button', { name: /small/i });
		expect(button).toHaveClass('h-8');

		rerender(<Button size="lg">Large</Button>);
		button = screen.getByRole('button', { name: /large/i });
		expect(button).toHaveClass('h-10');

		rerender(
			<Button size="icon" aria-label="icon button">
				<Mail />
			</Button>,
		);
		button = screen.getByRole('button', { name: /icon button/i });
		expect(button).toHaveClass('size-9');
	});

	it('renders as disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled Button</Button>);
		const button = screen.getByRole('button', { name: /disabled button/i });

		expect(button).toBeDisabled();
		expect(button).toHaveAttribute('disabled');
	});

	it('renders with custom className', () => {
		render(<Button className="custom-class">Custom Class</Button>);
		const button = screen.getByRole('button', { name: /custom class/i });

		expect(button).toHaveClass('custom-class');
		expect(button).toHaveClass('bg-primary'); // Still has default classes
	});

	it('renders as a child component when asChild is true', () => {
		render(
			<Button asChild>
				<a href="https://example.com">Link Button</a>
			</Button>,
		);

		const link = screen.getByRole('link', { name: /link button/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');
		expect(link).toHaveClass('bg-primary'); // Still has button styling
	});

	it('handles click events', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick}>Click me</Button>);
		const button = screen.getByRole('button', { name: /click me/i });

		await user.click(button);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('renders with icon correctly', () => {
		render(
			<Button>
				<Mail data-testid="mail-icon" />
				With Icon
			</Button>,
		);

		const button = screen.getByRole('button', { name: /with icon/i });
		const icon = screen.getByTestId('mail-icon');

		expect(button).toBeInTheDocument();
		expect(icon).toBeInTheDocument();
	});

	it('buttonVariants function generates correct class names', () => {
		// Test default variant and size
		const defaultClasses = buttonVariants({});
		expect(defaultClasses).toContain('bg-primary');
		expect(defaultClasses).toContain('h-9');

		// Test custom variant and size
		const customClasses = buttonVariants({
			variant: 'destructive',
			size: 'lg',
			className: 'custom-class',
		});

		expect(customClasses).toContain('bg-destructive');
		expect(customClasses).toContain('h-10');
		expect(customClasses).toContain('custom-class');

		// Test with the cn utility
		const mergedClasses = cn(
			buttonVariants({ variant: 'outline' }),
			'extra-class',
		);

		expect(mergedClasses).toContain('border');
		expect(mergedClasses).toContain('extra-class');
	});
});
