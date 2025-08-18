/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Partytown } from '@qwik.dev/partytown/react';
import dynamic from 'next/dynamic';
import { Urbanist } from 'next/font/google';
import { usePathname } from 'next/navigation';
import './globals.css';
import React, { Suspense, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import AnalyticsProvider from '@/components/AnalyticsProvider';
import RouteTracker from '@/components/v2/RouteTracker';
import TimeSpentEventTracker from '@/components/v2/TimeSpentEventTracker';
import { AuthProvider } from '@/hooks/useAuth';

// ✅ Fonts: no preload (let swap handle first paint)
const urbanist = Urbanist({
	subsets: ['latin'],
	weight: ['400', '600', '700', '800'],
	display: 'swap',
});

// ✅ Defer 3rd-party stuff until after hydration
const GoogleTagManagerNoscript = dynamic(
	() => import('@/components/GoogleTagManagerNoscript'),
	{ ssr: false },
);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const isVersion = [
		'/v2',
		'/v3',
		'/v4',
		'/v5',
		'/v2o',
		'/v2o1',
		'/v6',
		'/v7',
		'/v2o3',
		'/v2o2',
		'/v2o4',
		'/v8',
	].includes(pathname);

	// ✅ Lazy-load ThirdPartyScripts only on client + after hydration
	const [loadThirdParty, setLoadThirdParty] = useState(false);
	useEffect(() => {
		if ('requestIdleCallback' in window) {
			(requestIdleCallback as any)(() => setLoadThirdParty(true));
		} else {
			setTimeout(() => setLoadThirdParty(true), 1500);
		}
	}, []);

	const ThirdPartyScripts = loadThirdParty
		? dynamic(() => import('@/components/ThirdPartyScripts'), {
			ssr: false,
			loading: () => null,
		})
		: null;

	return (
		<html lang="en">
			<head>
				<title>Tap Health | AI Health Assistant</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Tap Health is your personal AI health assistant. Track symptoms, receive instant advice, and simplify your health journey with ease."
				/>
				<link
					rel="icon"
					href="https://tap.health/wp-content/themes/taphealthTwo/assets/images/favicon.ico"
				/>
				<link rel="shortcut icon" href="/favicon-32x32.png" />
				<link rel="manifest" href="/site.webmanifest" />

				{/* ✅ Put Partytown last in head so it doesn’t block meta parsing */}
				<Partytown debug={false} forward={[
					'dataLayer.push', // GTM
					'gtag',           // GA4
					'fbq',            // Facebook Pixel
					'clarity',        // Microsoft Clarity
				]} />

				{/* ✅ Font connections: keep them but non-blocking */}
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
			</head>
			<body className={urbanist.className}>
				<div
					className={
						isVersion
							? 'bg-white'
							: 'relative mx-auto min-h-screen max-w-[430px] overflow-hidden bg-white shadow-xl'
					}
				>
					<Toaster position="top-center" />
					<Suspense fallback={null}>
						<AuthProvider>
							<AnalyticsProvider>
								<RouteTracker />
								<TimeSpentEventTracker />
								{children}
							</AnalyticsProvider>
						</AuthProvider>
					</Suspense>
					{/* ✅ Only load third-party scripts *after* hydration + idle */}
					{ThirdPartyScripts && <ThirdPartyScripts />}
				</div>
				{/* ✅ Load GTM noscript at very end of body */}
				<GoogleTagManagerNoscript />
			</body>
		</html>
	);
}
