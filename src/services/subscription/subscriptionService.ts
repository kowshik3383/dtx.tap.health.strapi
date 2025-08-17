import { ApiClient } from '@/lib/apiClient';
import {
	CreateSubscriptionResponse,
	CreateSubscriptionResponseData,
	SubscriptionData,
} from '@/store/types/subscription.types';

interface Plan {
	id: string;
	interval: number;
	isPromotional: boolean;
	promotion?: {
		code: string;
	};
}

interface PlansResponse {
	plans: Plan[];
}

interface PromotionResponse {
	data: Array<Record<string, unknown>>;
}

// Using SubscriptionData interface from subscription.types.ts
interface SubscriptionResponse {
	status: string;
	message: string;
	data: SubscriptionData;
}

interface RefundEligibilityData {
	isEligible: boolean;
}

const apiClient = ApiClient.getInstance();

export const subscriptionService = {
	async getPlans() {
		const response = await apiClient.get<PlansResponse>(
			'/api/subscription/plans',
		);
		return response;
	},

	async getPromotions() {
		const response = await apiClient.get<PromotionResponse>(
			'/api/subscription/promotions',
		);
		return response;
	},

	async getSubscriptionStatus(token: string): Promise<SubscriptionResponse> {
		const response = await apiClient.get<SubscriptionData>(
			'/api/subscription',
			token,
		);
		if (!response.data) {
			throw new Error('No subscription data returned');
		}
		return {
			status: response.status,
			message: response.message || '',
			data: response.data,
		};
	},

	async createSubscription(
		planId: string,
		promotionCode: string | undefined,
		token: string,
	): Promise<CreateSubscriptionResponse> {
		const requestData: Record<string, unknown> = { planId };
		if (promotionCode) {
			requestData.promotionCode = promotionCode;
		}
		const response = await apiClient.post<CreateSubscriptionResponseData>(
			'/api/subscription/v2/create',
			requestData,
			token,
		);
		return {
			data: response.data,
			status: response.status,
		};
	},

	async createTrialSubscription(token: string, partnerCode = 'SINOCARE_CGM') {
		return apiClient.post(
			'/api/subscription/create/trial',
			{ partnerCode },
			token,
		);
	},

	async cancelSubscription(
		subscriptionId: string,
		refundStatus: boolean | undefined,
		token: string,
	) {
		const requestData: Record<string, unknown> = { subscriptionId };
		if (refundStatus !== undefined) {
			requestData.requestRefund = refundStatus;
		}
		return apiClient.post(
			'/api/subscription/v2/cancel',
			requestData,
			token,
		);
	},

	async getRefundEligibility(subscriptionId: string, token: string) {
		const response = await apiClient.get<RefundEligibilityData>(
			`/api/subscription/refund-eligibility/${subscriptionId}`,
			token,
		);
		if (!response.data) {
			throw new Error('No refund eligibility data returned');
		}
		return { data: response.data };
	},
};
