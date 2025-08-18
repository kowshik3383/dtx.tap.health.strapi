// Sentry configuration for edge features (middleware, edge routes, etc.)
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',

  // Only sample a portion of transactions in production for performance
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Disable verbose logging in production
  debug: process.env.NODE_ENV !== 'production',
});
