export interface VoucherData {
	voucherCode: string;
	status: 'active' | 'used' | 'expired';
	expiryDate?: string;
}

export interface VoucherSubscriptionDetails {
	duration?: number;
	amount?: number;
	subscriptionId?: string;
}

export interface VoucherValidateResponse {
	code: number;
	status: string;
	message: string;
	data?: {
		voucherType: string;
		duration: number;
		message: string;
	};
}

export interface VoucherRedeemResponse {
	code: number;
	status: string;
	message: string;
	data?: {
		subscription?: VoucherSubscriptionDetails;
		trialDays: number;
		VoucherType: string;
	};
}

export interface VoucherProps {
	onSuccess?: () => void;
	onError?: (error: string) => void;
}
