import type { Meta, StoryObj } from '@storybook/react';
// Import your Footer component
import Footer from '../Footer';

/**
 * If you encounter errors with next/image in Storybook,
 * either use the `storybook-addon-next` or configure a module alias in .storybook/main.js (for Webpack), or vite.config.ts (for Vite),
 * mapping 'next/image' to a plain React img wrapper.
 *
 * For most setups, the official Storybook Next.js framework handles next/image and next/navigation without mocks.
 * If you still run into trouble, see below on manual aliasing.
 */

// ------- MOCK FOOTER DATA (mimic your strapi model structure) -------
const mockFooter = {
	logo: { url: '/mock-logo.png' },
	name: 'Example Company Pvt Ltd',
	address: '123, Some Street, Some City, India, 123456',
	description_main: 'Empowering your journey.',
	description_sub: 'Building delightful experiences for digital India.',
	footer_links: [
		{ label: 'Terms and Conditions', href: '/terms' },
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Refund & Cancellation Policy', href: '/refund' },
		{ label: 'About Us', href: '/about' },
		{ label: 'Contact Us', href: '/contact' },
	],
};

// ------- STORYBOOK META AND STORIES -------

const meta: Meta<typeof Footer> = {
	title: 'Components/Footer',
	component: Footer,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
**Footer**  
A responsive footer component with:

- Animated appearance (framer-motion)
- Company logo, address, page links, social icons
- Uses CMS (Strapi) data structures
- Navigation, analytics and intersection observer calls are safely mocked for Storybook

To fully support mocks of Next.js modules (\`Image\`, \`useRouter\`), consider .storybook/preview.js global overrides.
        `,
			},
		},
		nextjs: {
			appDirectory: true,
		},
	},
	argTypes: {
		show_footer_links: { control: 'boolean' },
		show_social_links: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
	args: {
		show_footer_links: true,
		show_social_links: true,
		footer: mockFooter,
	},
};

export const NoLinks: Story = {
	args: {
		show_footer_links: false,
		show_social_links: false,
		footer: mockFooter,
	},
};

export const LinksOnly: Story = {
	args: {
		show_footer_links: true,
		show_social_links: false,
		footer: mockFooter,
	},
};

export const SocialOnly: Story = {
	args: {
		show_footer_links: false,
		show_social_links: true,
		social_links: [
			{
				icon: { url: '/icon-facebook.svg' },
				href: 'https://facebook.com',
			},
			{ icon: { url: '/icon-twitter.svg' }, href: 'https://twitter.com' },
			{
				icon: { url: '/icon-linkedin.svg' },
				href: 'https://linkedin.com',
			},
		],
		footer: mockFooter,
	},
};
