import { ApiClient } from '@/lib/apiClient';
import { PaymentStatusData } from '@/types/payment.types';

interface PaymentVerificationData {
	type: 'SUBSCRIPTION' | 'ONE_TIME';
	payload: {
		razorpay_payment_id: string;
		razorpay_order_id: string;
		razorpay_signature: string;
	};
}

interface PaymentVerificationResponse {
	status: string;
	data: {
		verified: boolean;
	};
}

const apiClient = ApiClient.getInstance();

export const paymentService = {
	async verifyPayment(
		verificationData: PaymentVerificationData,
		token: string,
	) {
		return apiClient.post<PaymentVerificationResponse['data']>(
			'/api/payment/verify',
			verificationData as unknown as Record<string, unknown>,
			token,
		);
	},

	async getPaymentStatus(paymentId: string, token: string) {
		return apiClient.get<PaymentStatusData>(
			`/api/payment/status/${paymentId}`,
			token,
			{ headers: { 'x-version': 'blue' } },
		);
	},
};
