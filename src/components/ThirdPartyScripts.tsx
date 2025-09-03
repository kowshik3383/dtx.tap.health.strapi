'use client';

import Script from 'next/script';
import React from 'react';

export default function ThirdPartyScripts() {
	return (
		<>
			{/* Required meta tags */}
			<meta charSet="UTF-8" />
			<meta
				name="facebook-domain-verification"
				content="gkag4wc7ffxd6e1j87203ywj6aieo9"
			/>

			{/* Google Tag Manager */}

			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-TSLRBDW4JV"
				strategy="afterInteractive"
			/>

			<Script id="gtm-script" strategy="afterInteractive">
				{`
       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KM6M68J7');
        `}
			</Script>


			{/* Meta Pixel Code */}
			<Script id="facebook-pixel" strategy="afterInteractive">
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
			<Script id="microsoft-clarity" strategy="afterInteractive">
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
