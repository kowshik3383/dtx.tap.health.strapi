import type { Meta, StoryObj } from '@storybook/react';
import { Success } from './Success';

const meta: Meta<typeof Success> = {
	title: 'Components/Success',
	component: Success,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		subtitle: { control: 'text' },
		paymentSummaryItems: { control: 'object' },
		showInvoiceDownload: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Success>;

export const Default: Story = {
	args: {
		subtitle: 'Your plan is now active',
		paymentSummaryItems: [
			{ key: 'Plan Duration', value: '12 months' },
			{ key: 'Transaction ID', value: 'TXN123456789' },
		],
	},
};

export const WithoutPaymentSummary: Story = {
	args: {
		subtitle: 'Your plan is now active',
		paymentSummaryItems: [],
	},
};

export const WithCustomText: Story = {
	args: {
		subtitle: 'Your premium plan is now active',
		paymentSummaryItems: [
			{ key: 'Plan Type', value: 'Premium' },
			{ key: 'Duration', value: '6 months' },
			{ key: 'Amount Paid', value: '₹4,999' },
			{ key: 'Transaction ID', value: 'TXN987654321' },
		],
	},
};

export const WithoutInvoiceDownload: Story = {
	args: {
		subtitle: 'Your plan is now active',
		paymentSummaryItems: [
			{ key: 'Plan Duration', value: '12 months' },
			{ key: 'Transaction ID', value: 'TXN123456789' },
		],
		showInvoiceDownload: false,
	},
};
