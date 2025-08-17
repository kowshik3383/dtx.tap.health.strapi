import * as Sentry from '@sentry/nextjs';
import { ApiClient } from '@/lib/apiClient';
import { identifyUser } from '@/utils/analytics';

interface AuthResponse {
	token?: string;
	user?: {
		id: string;
		phone: string;
	};
}

interface OtpResponse {
	success: boolean;
	message?: string;
	data?: {
		token?: string;
		user?: {
			id: string;
			phone: string;
		};
	};
}

const apiClient = ApiClient.getInstance();

export const authService = {
	async sendOtp(phone: string): Promise<OtpResponse> {
		try {
			const response = await apiClient.post<AuthResponse>(
				'/api/auth/signin',
				{ phone },
			);
			return { success: true, data: { token: response.data?.token } };
		} catch (error) {
			console.error('Error sending OTP:', error);
			Sentry.captureException(error, {
				tags: {
					scope: 'authService',
					action: 'sendOtp',
				},
				extra: { phone },
			});

			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: 'Failed to send OTP',
			};
		}
	},

	async verifyOtp(phone: string, otp: string): Promise<OtpResponse> {
		try {
			const response = await apiClient.post<AuthResponse>(
				'/api/auth/verify-otp',
				{ phone, otp },
			);
			identifyUser(phone, {
				phone: phone,
				$phone: phone,
				$last_login: new Date().toISOString(),
				// plan: 'Free', // Example property
			});
			return {
				success: true,
				data: {
					token: response.data?.token,
					user: response.data?.user,
				},
			};
		} catch (error) {
			console.error('OTP verification failed:', error);
			Sentry.captureException(error, {
				tags: {
					scope: 'authService',
					action: 'verifyOtp',
				},
				extra: { phone, otp },
			});

			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: 'Failed to verify OTP',
			};
		}
	},
};
