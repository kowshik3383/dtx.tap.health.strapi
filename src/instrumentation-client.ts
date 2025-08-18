// Client-side Sentry configuration
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',

  // Optional integrations
  integrations: [Sentry.replayIntegration()],

  // Sample a fraction of transactions in production for performance
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Replay sampling: lower in production, higher in dev
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 0.1,
  replaysOnErrorSampleRate: 1.0, // Keep error replay at 100%

  // Disable debug in production
  debug: process.env.NODE_ENV !== 'production',
});

// Capture router transitions without extra overhead
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
