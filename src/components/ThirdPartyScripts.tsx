'use client';

import Script from 'next/script';
import React, { useEffect } from 'react';

export default function ThirdPartyScripts() {
  // ✅ Runs immediately on client-side page load
  useEffect(() => {


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/~partytown/partytown-sw.js')
        .then(() => {
          console.log('✅ Partytown Service Worker registered successfully 🎉');
        })
        .catch((error) => {
          console.error('❌ Failed to register Partytown Service Worker:', error);
        });
    }
  }, []);

  return (
    <>
      {/* Meta tag for Facebook domain verification */}
      <meta charSet="UTF-8" />
      <meta
        name="facebook-domain-verification"
        content="gkag4wc7ffxd6e1j87203ywj6aieo9"
      />

      {/* Google Tag Manager */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-TSLRBDW4JV"
        strategy="afterInteractive"
        type="text/partytown"

      />
      <Script id="gtag-init" strategy="afterInteractive" type="text/partytown"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TSLRBDW4JV', { debug_mode: true });
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive" type="text/partytown"
      >
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '933899241970662');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="clarity-script" strategy="afterInteractive" type="text/partytown"
      >
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,'clarity','script','qg91jx0vy0');
        `}
      </Script>
    </>
  );
}