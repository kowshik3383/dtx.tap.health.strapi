// Common payment-related type definitions

// Payment method types
export interface CardPaymentMethod {
	last4: string;
	network: string;
}

export interface UpiPaymentMethod {
	vpa: string;
}

// Common payment status data structure used across the application
export interface PaymentStatusData {
	card?: CardPaymentMethod;
	upi?: UpiPaymentMethod;
	type: number;
	provider: number;
	providerMetadata: {
		paymentId: string;
		subscriptionId: string;
	};
	amount: number;
	currency: string;
	status: number;
	userId: string;
	createdAt: string;
	updatedAt: string;
	paymentMode: string;
	id: string;
}

// Payment status response structure
export interface PaymentStatusResponse {
	code: number;
	status: string;
	message: string;
	data: PaymentStatusData;
}
