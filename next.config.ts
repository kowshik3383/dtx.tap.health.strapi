import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
// Validate and load environment variables
import './src/env.mjs';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/homepage',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // ✅ Modular imports to reduce bundle size
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    'date-fns': {
      transform: 'date-fns/{{member}}',
    },
  },

  // ✅ Images - Remote Patterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qbhnqxwevufrfkvrucyu.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'tap.health',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
    // ✅ Serve modern formats by default
    formats: ['image/avif', 'image/webp'],
  },

  // ✅ React & compilation optimizations
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Drop old browser support + tree-shaking
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true, // if you use styled-components
  },

  // ✅ Experimental performance flags
  experimental: {
    optimizeCss: true, // uses Critters to inline critical CSS
    optimizePackageImports: ['lucide-react'], // auto-tree-shake icons/libs
    scrollRestoration: true, // improves client transitions
  },

  // ✅ Static file caching & compression
  poweredByHeader: false, // hide "X-Powered-By"
  compress: true, // enable gzip compression
  httpAgentOptions: {
    keepAlive: true, // keep connections warm for fetch()
  },

  // ✅ Future-proof asset handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // reduce polyfills, don't include unnecessary node libs
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    return config;
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'tap-health',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors.
  automaticVercelMonitors: true,
});
