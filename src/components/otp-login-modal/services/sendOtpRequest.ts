import * as Sentry from '@sentry/nextjs';
import { ApiClient } from '@/lib/apiClient';

interface OtpResponse {
	success: boolean;
	message?: string;
	data?: {
		token?: string;
		user?: {
			id: string;
			phone: string;
		};
		subscriptionActive?: boolean;
		cancellationRequested?: boolean;
	};
}

interface ApiSigninResponse {
	token?: string;
}

interface ApiVerifyResponse {
	token?: string;
	user?: {
		id: string;
		phone: string;
	};
}

export async function sendOtpRequest(phone: string): Promise<OtpResponse> {
	try {
		const apiClient = ApiClient.getInstance();
		const response = await apiClient.post<ApiSigninResponse>(
			'/api/auth/signin',
			{ phone },
			undefined, // no token needed for login
		);

		return { success: true, data: response.data || {} };
	} catch (error) {
		console.error('Error sending OTP:', error);
		Sentry.captureException(error, {
			tags: { context: 'sendOtpRequest' },
			extra: { phone },
		});

		return {
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to send OTP',
		};
	}
}

export async function verifyOtpRequest(
	phone: string,
	otp: string,
): Promise<OtpResponse> {
	try {
		const apiClient = ApiClient.getInstance();
		const response = await apiClient.post<ApiVerifyResponse>(
			'/api/auth/verify-otp',
			{ phone, otp },
			undefined, // no token needed for verification
		);
		const token = response.data?.token;

		// Default subscription values in case API fails
		let subscriptionStatus = 'NO SUBSCRIPTION';
		let isCancellationRequested = false;
		let isSubscriptionActive = false;

		try {
			const subResponse = await apiClient.get<{
				status: string;
				cancellationRequested: boolean;
			}>(`/api/subscription/v2`, token);
			console.log(subResponse);

			subscriptionStatus = subResponse.data?.status || 'NO SUBSCRIPTION';
			isCancellationRequested =
				subResponse.data?.cancellationRequested || false;
			isSubscriptionActive =
				subResponse.data?.status === 'ACTIVE' ||
				subResponse.data?.status === 'TRIAL';
		} catch (subError) {
			// If subscription endpoint returns 404 or any error, continue with login
			console.log('Subscription check failed:', subError);
			// Keep default values set above
		}

		return {
			success: true,
			data: {
				token: response.data?.token,
				user: response.data?.user,
				subscriptionActive: isSubscriptionActive,
				cancellationRequested: isCancellationRequested,
			},
			message: subscriptionStatus,
		};
	} catch (error) {
		console.error('OTP verification failed:', error);
		Sentry.captureException(error, {
			tags: { context: 'verifyOtpRequest:subscriptionCheck' },
			extra: { phone, otp },
		});

		return {
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to verify OTP',
		};
	}
}
