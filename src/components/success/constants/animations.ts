// Success animation constants

export const ANIMATION_TIMING = {
	INITIAL_DELAY: 0.3,
	TEXT_APPEAR_DELAY: 0.5,
	CONTENT_SHIFT_DELAY: 1.5, // Reduced delay to start moving earlier
	CURVED_EDGE_DELAY: 1.7, // Appear sooner after content moves
	ANIMATION_COMPLETE: 2500, // Complete animation sooner
	TEXT_REDUCE_TIMER: 1500, // Start reduction sooner
};

export const ANIMATION_VARIANTS = {
	checkmark: {
		initial: { scale: 0 },
		animate: {
			scale: 1,
			transition: {
				duration: 0.5,
				delay: ANIMATION_TIMING.INITIAL_DELAY,
			},
		},
	},
	text: {
		initial: { opacity: 0 },
		animate: (reduced: boolean) => ({
			opacity: 1,
			scale: reduced ? 0.85 : 1,
			transition: {
				opacity: {
					duration: 0.5,
					delay: ANIMATION_TIMING.TEXT_APPEAR_DELAY,
				},
				scale: {
					delay: ANIMATION_TIMING.CONTENT_SHIFT_DELAY,
					duration: 0.4,
				},
			},
		}),
	},
	mainContent: {
		animate: (reduced: boolean) => ({
			top: reduced ? '15%' : '50%', // Move higher up the screen (20% instead of 30%)
			transition: {
				type: 'spring',
				stiffness: 120, // Increased stiffness for more responsive movement
				damping: 15, // Slightly reduced damping for faster movement
				delay: ANIMATION_TIMING.CONTENT_SHIFT_DELAY,
			},
		}),
	},
	curvedEdge: {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				delay: ANIMATION_TIMING.CURVED_EDGE_DELAY,
				duration: 0.4,
			},
		},
	},
};

export const STYLE_CONSTANTS = {
	CONTAINER_STYLE: {
		position: 'relative',
		height: '100vh',
		overflow: 'hidden',
		background: 'white', // page background
	},

	CONTENT_STYLE: {
		position: 'absolute' as const,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	CHECKMARK_CONTAINER: {
		width: '58px',
		height: '58px',
	},
	TEXT_STYLE: {
		letterSpacing: '-1.2%',
	},
	CURVED_EDGE: {
		height: '20vh',
		backgroundColor: 'transparent',
		overflow: 'hidden',
	},
	CURVED_SHAPE: {
		borderTopLeftRadius: '100% 100%',
		borderTopRightRadius: '100% 100%',
		bottom: '-60%',
	},
};
