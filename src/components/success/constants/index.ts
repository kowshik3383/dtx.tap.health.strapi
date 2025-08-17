// App store URLs
export const APP_STORE_URL =
	'https://apps.apple.com/in/app/tap-health-ai-health-app/id6478812140';
export const PLAY_STORE_URL =
	'https://play.google.com/store/apps/details?id=com.taphealthapp';

// Text constants
export const DOWNLOAD_HEADING = 'Download Tap Health\nto get started';
export const DOWNLOAD_BUTTON_TEXT = 'Download Tap Health';
export const PAYMENT_SUMMARY_HEADING = 'Payment summary';

// Animation constants
export const OVERLAY_ANIMATION = {
	type: 'spring',
	stiffness: 70,
	damping: 20,
};

// Style constants
export const HEADING_STYLE = {
	fontFamily: 'Urbanist, sans-serif',
	fontSize: '26px',
	fontWeight: 800,
	lineHeight: '100%',
	letterSpacing: '-1.2%',
	color: '#252E49',
};

export const PAYMENT_HEADING_STYLE = {
	fontFamily: 'Urbanist, sans-serif',
};

// Types
export interface PaymentSummaryItem {
	key: string;
	value: string;
}
