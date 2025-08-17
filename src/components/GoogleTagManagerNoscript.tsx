'use client';

import Script from 'next/script';
import React from 'react';

export default function GoogleTagManagerNoscript() {
  return (
    <Script
      id="gtm-noscript"
      type="text/partytown"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-KLXGW6ZL';
            iframe.height = '0';
            iframe.width = '0';
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            document.body.appendChild(iframe);
          })();
        `,
      }}
    />
  );
}
