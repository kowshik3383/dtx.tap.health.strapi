// Define types for subscription store

import { PaymentStatusData } from '@/types/payment.types';

export interface PlanItem {
	description?: string;
	originalAmount: number;
	unitAmount: number;
	id?: string;
}

export interface PlanPromotion {
	code: string;
	discountedAmount: number;
}

export interface Plan {
	id: string;
	interval: number;
	item: PlanItem;
	isPromotional: boolean;
	promotion?: PlanPromotion;
	razorpayPlanId?: string;
	discountedAmount?: number;

}

export interface Promotion {
	description?: string;
	discountType?: number;
	discountValue?: number;
	endDate?: string;
	startDate?: string;
	imageUrl?: string;
}

export interface PlanResponse {
	data?: { plans: Plan[] };
}

export interface PromotionResponseData {
	// Define more specific type based on your API response
	[key: number]: unknown;
}

export interface PromotionResponse {
	data?: PromotionResponseData;
}

export interface SubscriptionPlan {
	description: string;
	interval: number;
	name: string;
	period: string;
	id: string;
}

export interface PaymentHistoryItem {
	provider: number;
	paymentId: string;
	status: string;
	amount: number;
	currency: string;
	_id: string;
	createdAt: string;
	card?: {
		last4: string;
		network: string;
	};
	paymentMode?: string;
}

export interface SubscriptionData {
	provider: string;
	userId: string;
	planId: string;
	subscriptionId: string;
	status: string;
	nextRenewalDate: string;
	autopayEnabled: boolean;
	paymentRetryCount: number;
	paymentHistory: PaymentHistoryItem[];
	isRefundEligible: boolean;
	refundAvailed: boolean;
	originalAmount: number;
	nextBillingAmount: number;
	totalPaidAmount: number;
	lastPaymentStatus: string;
	cancellationRequested: boolean;
	phoneNumber: string;
	isTrial: boolean;
	userTier: string; // Added userTier
	createdAt: string;
	updatedAt: string;
	lastPaymentDate: string;
	id: string;
	plan: SubscriptionPlan;
}

// New interface for subscription creation response
export interface CreateSubscriptionResponseData {
	subscription: SubscriptionData;
	// Add other properties that might be in the response
	[key: string]: unknown;
}

export interface SubscriptionResponse {
	data?: SubscriptionData;
	status: string;
}

export interface CreateSubscriptionResponse {
	data?: CreateSubscriptionResponseData;
	status: string;
}

export interface RefundResponse {
	data?: { isEligible: boolean };
}

export interface RazorpayResponse {
	razorpay_order_id: string;
	razorpay_payment_id: string;
	razorpay_signature: string;
}

export interface PaymentData {
	subscriptionId: string;
	nextBillingAmount: number;
}

export interface PlanDetails {
	id: string;
	name: string;
	price: number;
	interval: number;
}

export interface ApiError {
	response?: {
		data?: {
			message?: string;
		};
	};
}

export interface NavigateFunction {
	(path: string, options?: { state?: unknown }): void;
}

export interface SubscriptionStoreState {
	plans: Plan[];
	promotions: Promotion[] | null;
	subscriptionData: SubscriptionData | null;
	storeloading: boolean;
	fetchLoading: boolean;
	error: Error | null;
	storeselectedIndex: number;
	isSubscribed: string;
	isRefundEligible: boolean;
	subscribedPlan: SubscriptionData[]; // Updated from Array<Record<string, unknown>> to SubscriptionData[]
	promotionCode: string;
	planInterval: number;
	paymentId: string;
	subscribedUser: boolean;
	redeemedVoucherCode: string;
	planDetails: PlanDetails | null;
	userData: UserData | null;
	paymentData: PaymentStatusData | null;
	subscriptionStatus: boolean;
}

export interface UserData {
	id: string;
	phone: string;
}

// Extend window for Razorpay
declare global {
	interface Window {
		Razorpay: new (options: Record<string, unknown>) => {
			open: () => void;
		};
	}
}
