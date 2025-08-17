import { env } from '../env.mjs';

/**
 * Environment detection utilities to make environment-specific logic easier
 */
export const envUtils = {
	/**
	 * Check if the application is running in a production environment
	 */
	isProduction: () => env.NODE_ENV === 'production',

	/**
	 * Check if the application is running in a development environment
	 */
	isDevelopment: () => env.NODE_ENV === 'development',

	/**
	 * Get the base API URL with proper environment handling
	 */
	getApiBaseUrl: () => env.NEXT_PUBLIC_API_URL,

	/**
	 * Get the current deployment version (blue/green)
	 */
	getDeploymentVersion: () => env.NEXT_PUBLIC_X_VERSION,

	/**
	 * Check if debugging should be enabled
	 */
	shouldEnableDebugging: () => !envUtils.isProduction(),
};
