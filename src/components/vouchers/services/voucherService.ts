import { ApiClient } from '../../../lib/apiClient';
import { VoucherRedeemResponse, VoucherValidateResponse } from '../types';

// API client instance
const apiClient = ApiClient.getInstance();

interface BaseVoucherResponse {
	code: number;
	status: string;
	message: string;
	data?: unknown;
}

function isBaseVoucherResponse(data: unknown): data is BaseVoucherResponse {
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

	const { data: responseData } = data;

	return (
		typeof responseData === 'object' &&
		responseData !== null &&
		'voucherType' in responseData &&
		'duration' in responseData &&
		'message' in responseData
	);
}

function isRedeemResponse(data: unknown): data is VoucherRedeemResponse {
	if (!isBaseVoucherResponse(data)) return false;

	if (!data.data) return true;

	const { data: responseData } = data;

	return (
		typeof responseData === 'object' &&
		responseData !== null &&
		'subscription' in responseData &&
		'trialDays' in responseData &&
		'VoucherType' in responseData
	);
}

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
