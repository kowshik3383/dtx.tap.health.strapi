'use client';

import NextError from 'next/error';
import { useEffect, useRef } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
}

export default function GlobalError({ error }: GlobalErrorProps) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Only initialize once
    if (!workerRef.current) {
      // Inline worker as a blob
      const blob = new Blob(
        [
          `
          importScripts('https://browser.sentry-cdn.com/7.40.0/bundle.min.js');
          Sentry.init({
            dsn: '${process.env.NEXT_PUBLIC_SENTRY_DSN || ''}',
            debug: false
          });
          self.onmessage = (event) => {
            const error = event.data;
            if (error) {
              Sentry.captureException(error);
            }
          };
        `
        ],
        { type: 'application/javascript' }
      );
      workerRef.current = new Worker(URL.createObjectURL(blob));
    }

    if (error && workerRef.current) {
      workerRef.current.postMessage(error);
    }

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [error]);

  // Minimal render tree for performance
  return <NextError statusCode={0} />;
}
