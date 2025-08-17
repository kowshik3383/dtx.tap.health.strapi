module.exports = {
	theme: {
		extend: {
			fontFamily: {
				urbanist: 'var(--font-urbanist)',
				geist: 'var(--font-geist-sans)',
				mono: 'var(--font-geist-mono)',
			},
			fontSize: {
				'14px': '14px',
			},
			backgroundImage: {
				'hero-gradient':
					'linear-gradient(180deg, #BAEEFF 15.5%, rgba(186, 207, 255, 0.5) 83.26%, rgba(186, 238, 255, 0) 100%)',
			},
			screens: {
				xs: '400px', // <--- Custom breakpoint
			},
		},
	},
	plugins: [],
};
