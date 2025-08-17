export const VOUCHER_ERRORS = {
	FREE_TRIAL_NEW_USERS: 'Free trials are only for new users.',
	ACTIVE_PLAN:
		"You already have an active plan with more than 1 year remaining. This voucher can't be used now.",
	EMPTY_CODE: 'Please enter a voucher code',
	GENERIC_ERROR: 'An error occurred',
	REDEEM_FAILED: 'Failed to redeem voucher',
} as const;

export const UI_TEXT = {
	PROCESSING: 'We are processing your subscription',
	WHERE_TO_FIND: 'Where to find voucher code?',
	VOUCHER_CODE: 'Voucher code',
	ACTIVATE_PLAN: 'Activate your 12 months plan',
	ENTER_CODE: 'Enter voucher code',
} as const;

export const ANIMATION_DELAYS = {
	SUCCESS_DELAY: 3000,
} as const;
