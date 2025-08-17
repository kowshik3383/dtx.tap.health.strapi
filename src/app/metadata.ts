import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tap Health | AI-Driven Chronic Care & Digital Health Solutions',
	description:
		'Tap Health is an AI-powered healthcare platform delivering real-time, personalized care for diabetes, PCOS, hypertension, and more. Experience affordable digital health and autonomous chronic disease management across India.',
	keywords: [
		'Tap Health',
		'Tap Health India',
		'AI healthcare',
		'digital therapeutics',
		'chronic disease management',
		'diabetes AI app',
		'PCOS management',
		'health tech startup India',
		'telehealth India',
		'autonomous health platform',
		'AI symptom checker',
		'Tap Health app',
	],
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
	},
	authors: [{ name: 'Tap Health', url: 'https://dtx.tap.health' }],
	creator: 'Tap Health',
	robots: 'index, follow',
	icons: {
		icon: 'https://tap.health/wp-content/themes/taphealthTwo/assets/images/favicon.ico',
		shortcut: '/favicon-32x32.png',
		apple: '/apple-touch-icon.png',
		other: [
			{
				rel: 'manifest',
				url: '/site.webmanifest',
			},
		],
	},
	openGraph: {
		title: 'Tap Health | AI-Driven Chronic Care & Digital Health Solutions',
		description:
			'Revolutionize your health journey with Tap Health’s AI-powered, real-time chronic care platform. Manage diabetes, PCOS, hypertension, and more with smart, affordable tools.',
		url: 'https://dtx.tap.health',
		siteName: 'Tap Health',
		type: 'website',
		locale: 'en_IN',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Tap Health | AI-Driven Chronic Care & Digital Health Solutions',
		description:
			'Tap Health offers India’s first autonomous, AI-powered chronic care platform for conditions like diabetes and PCOS. Join the health revolution.',
		site: '@taphealth', // if available
	},
};
