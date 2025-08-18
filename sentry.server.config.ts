// Sentry configuration for server-side (API routes, getServerSideProps, etc.)
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',

  // Only sample a portion of transactions in production to reduce performance impact
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  // Disable debug logs in production
  debug: process.env.NODE_ENV !== 'production',

  // Optional: Attach server name or environment for better context
  environment: process.env.NODE_ENV,
});
