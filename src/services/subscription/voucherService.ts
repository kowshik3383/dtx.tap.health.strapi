import {
	VoucherRedeemResponse,
	VoucherValidateResponse,
} from '@/components/vouchers/types';
import { ApiClient } from '@/lib/apiClient';

function isBaseVoucherResponse(
	data: unknown,
): data is { code: number; status: string; message: string; data?: unknown } {
	return (
		typeof data === 'object' &&
		data !== null &&
		'status' in data &&
		'code' in data &&
		'message' in data &&
		(('data' in data && data.data !== null) || !('data' in data))
	);
}

function isValidateResponse(data: unknown): data is VoucherValidateResponse {
	if (!isBaseVoucherResponse(data)) return false;
	if (!data.data) return true;

	return (
		typeof data.data === 'object' &&
		data.data !== null &&
		'voucherType' in data.data &&
		'duration' in data.data &&
		'message' in data.data
	);
}

function isRedeemResponse(data: unknown): data is VoucherRedeemResponse {
	if (!isBaseVoucherResponse(data)) return false;
	if (!data.data) return true;

	return (
		typeof data.data === 'object' &&
		data.data !== null &&
		'subscription' in data.data &&
		'trialDays' in data.data &&
		'VoucherType' in data.data
	);
}

const apiClient = ApiClient.getInstance();

export const voucherService = {
	async validateVoucher(
		voucherCode: string,
	): Promise<VoucherValidateResponse> {
		const response = await apiClient.get<VoucherValidateResponse['data']>(
			`/api/subscription/vouchers/validate/${voucherCode}`,
		);

		if (!isValidateResponse(response)) {
			throw new Error('Invalid response format from server');
		}

		if (response.status === 'error') {
			throw new Error(response.message || 'Validation failed');
		}

		return response;
	},

	async redeemVoucher(
		voucherCode: string,
		token: string,
	): Promise<VoucherRedeemResponse> {
		if (!token) {
			throw new Error('Authentication token is required');
		}

		const response = await apiClient.post<VoucherRedeemResponse['data']>(
			'/api/subscription/vouchers/redeem',
			{ voucherCode },
			token,
		);

		if (!isRedeemResponse(response)) {
			throw new Error('Invalid response format from server');
		}

		if (response.status === 'error') {
			throw new Error(response.message || 'Redemption failed');
		}

		return response;
	},
};
