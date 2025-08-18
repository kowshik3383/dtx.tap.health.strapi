import * as Sentry from '@sentry/nextjs';

/**
 * Dynamically registers the correct Sentry config
 * based on the runtime environment (Node.js or Edge)
 */
export async function register() {
  try {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      await import('../sentry.server.config');
    } else if (process.env.NEXT_RUNTIME === 'edge') {
      await import('../sentry.edge.config');
    }
  } catch (err) {
    // Avoid blocking runtime if Sentry fails to load
    console.warn('Sentry failed to load dynamically:', err);
  }
}

/**
 * Capture errors on requests
 * No extra overhead, uses Sentry's built-in optimized function
 */
export const onRequestError = Sentry.captureRequestError;
