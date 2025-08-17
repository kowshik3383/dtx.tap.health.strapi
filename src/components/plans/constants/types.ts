// Types for plan-related components

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
