export const PHONE_REGEX = /^[5-9]\d{9}$/;

export const ERROR_MESSAGES = {
	INVALID_PHONE: 'Please enter a valid 10-digit mobile number',
	OTP_REQUIRED: 'Please enter a valid 4-digit OTP',
	OTP_FAILED: 'Invalid OTP. Please try again',
	SERVER_ERROR: 'Something went wrong. Please try again later',
} as const;
