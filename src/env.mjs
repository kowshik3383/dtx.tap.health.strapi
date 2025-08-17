import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * T3 Env - Environment variable validation schema
 *
 * This file defines the schema for validating environment variables
 * with runtime and type checking to ensure your app doesn't start
 * with missing or invalid environment variables.
 *
 * @see https://env.t3.gg
 */
export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 *
	 * Server-side variables are not exposed to the client.
	 */
	server: {
		NODE_ENV: z
			.enum(['development', 'test', 'production'])
			.default('development'),
		// Add your server variables here

		//Interakt configuration
		INTERAKT_API_KEY: z.string().min(1, 'Interakt API key is required'),

		//Razorpay webhook secret
		RAZORPAY_WEBHOOK_SECRET: z
			.string()
			.min(1, 'Razorpay webhook secret is required'),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 *
	 * These variables will be available in browser code.
	 */
	client: {
		// API configuration
		NEXT_PUBLIC_API_URL: z
			.string()
			.url()
			.refine(url => url.startsWith('https://'), {
				message: 'API URL must use HTTPS in production',
				path: ['NEXT_PUBLIC_API_URL'],
			}),
		NEXT_PUBLIC_X_VERSION: z
			.string()
			.optional()
			.refine(val => !val || ['blue', 'green'].includes(val), {
				message:
					"X_VERSION must be either 'blue' or 'green' when provided",
				path: ['NEXT_PUBLIC_X_VERSION'],
			}),

		// Payment configuration
		NEXT_PUBLIC_RAZORPAY_KEY_ID: z
			.string()
			.min(1, 'Razorpay Key ID is required')
			.refine(key => key.startsWith('rzp_'), {
				message: "Invalid Razorpay key format, must start with 'rzp_'",
				path: ['NEXT_PUBLIC_RAZORPAY_KEY_ID'],
			}),

		// Analytics configuration
		NEXT_PUBLIC_MIXPANEL_TOKEN: z
			.string()
			.min(1, 'Mixpanel token is required'),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_X_VERSION: process.env.NEXT_PUBLIC_X_VERSION,
		NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
		NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
		INTERAKT_API_KEY: process.env.INTERAKT_API_KEY,
		RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
	},

	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
	 * This is especially useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,

	/**
	 * Makes it so that empty strings are treated as undefined.
	 * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
