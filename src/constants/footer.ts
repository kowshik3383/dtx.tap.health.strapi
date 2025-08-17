import fb_icon from '../../public/assets/fb_icon.svg';
import insta_icon from '../../public/assets/insta_icon.svg';
import linked_icon from '../../public/assets/linked_icon.svg';
import x_icon from '../../public/assets/x_icon.svg';
import yt_icon from '../../public/assets/yt_icon.svg';

export const COMPANY_INFO = {
	name: 'Tapfinity Technologies Pvt Ltd',
	address: 'WeWork Platina Tower, Gurugram, 122002, Haryana, India',
};

export const FOOTER_LINKS = [
	{ label: 'Terms and Conditions', path: '/terms-and-conditions' },
	{ label: 'Privacy Policy', path: '/privacy-policy' },
	{
		label: 'Refund & Cancellation Policy',
		path: '/refund-and-cancellation-policy',
	},
] as const;

export const COMPANY_DESCRIPTION = {
	main: 'Tap Health is simplifying access to health advice and medical services.',
	sub: 'Our AI-powered platform provides preliminary illness diagnosis, personalized healthcare guidance, and seamless connectivity with healthcare providers.',
};

export const SOCIAL_LINKS = [
	{
		icon: fb_icon,
		link: 'https://www.facebook.com/share/1AGDkBhCiz/',
	},
	{
		icon: insta_icon,
		link: 'https://www.instagram.com/tap.health.now?igsh=YjJjenFhbzFjdWdp',
	},
	{
		icon: yt_icon,
		link: 'https://youtube.com/@tap.health?si=4bTrPmJ96TK_krmt',
	},
	{
		icon: x_icon,
		link: 'https://x.com/Tap_Health_Now',
	},
	{
		icon: linked_icon,
		link: 'https://www.linkedin.com/company/taphealth/',
	},
] as const;
