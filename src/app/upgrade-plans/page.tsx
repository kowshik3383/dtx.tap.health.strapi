/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HeroSecondary from '@/components/layout/HeroSecondary';
import { PlansContainer1 } from '@/components/plans';
import Loading from '@/components/ui/Loading';
import FeatureCard from '@/components/v2/feature_cards/FeatureCard';
import { usePlansAuth } from '@/hooks/usePlansAuth';

const PlansPage = () => {
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const { isAuthenticated, token, isLoading, plansLoading, navigate } =
		usePlansAuth({
			redirectUnauthenticatedTo: '', // Empty string to allow unauthenticated users
			autoFetchPlans: true,
		});

	// Detect if in WebView
	const isInWebView = () => {
		if (typeof window === 'undefined') return false;

		const userAgent = navigator.userAgent || '';
		return (
			(window as any).ReactNativeWebView ||
			/wv|WebView/i.test(userAgent)
		);
	};

	// ✅ Always stringify to support Android
	const sendWebViewMessage = (action: string) => {
		if (!isInWebView()) {
			alert('Not in WebView or ReactNativeWebView not available.');
			return;
		}

		try {
			// Detect iOS vs Android
			const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

			// For iOS → send raw string
			// For Android → send JSON string with { type: action }
			const payload = isIOS ? action : JSON.stringify({ type: action });

			console.log('[WebView] Sending action to React Native:', payload);

			(window as any).ReactNativeWebView.postMessage(payload);
		} catch (err) {
			console.error('[WebView] Failed to send message:', err);
		}
	};


	useEffect(() => {
		localStorage.setItem('isUpgradePlans', 'true');
	}, []);

	// Show loading state while checking authentication and loading plans
	if (isLoading) {
		return (
			<div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-white pb-[100px]">
				<HeroSecondary
					titlePrimary="Pick your"
					titleSecondary="plan"
					description="Save on annual plans"
				/>
				<div className="container mx-auto mt-6 flex max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
					<div className="mb-4 h-16 w-16 animate-spin rounded-full border-t-3 border-b-3 border-blue-500"></div>
					<h3 className="mb-2 text-xl font-semibold text-gray-800">
						Just a moment...
					</h3>
					<p className="text-md max-w-md text-gray-600">
						We're preparing the best plans for you. This will only
						take a few seconds.
					</p>
				</div>
			</div>
		);
	}

	// Show processing payment state with Loading component
	if (isProcessingPayment) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<Loading
					isProcessing={true}
					processingText="We are processing"
					processingSubText="Please wait while we set up your subscription..."
				/>
			</div>
		);
	}

	return (
		<div className="relative overflow-x-hidden overflow-y-auto bg-gradient-to-b from-cyan-50 via-sky-100 to-purple-100 pb-[100px]">
			{/* Header with Logo & Close */}
			<div className="w-full md:w-[430px] fixed z-50 mb-6 bg-white px-6 py-3 flex items-center justify-between">
				<Image
					src="/assets/logo.svg"
					alt="tap.health"
					width={120}
					height={24}
					className="object-contain"
					priority
				/>
				<button
					onClick={() => sendWebViewMessage('CLOSE_WEBVIEW')}
					className="text-gray-600 hover:text-gray-900"
					aria-label="Close"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			{/* Main Content */}
			{plansLoading ? (
				<div className="container mx-auto mt-6 max-w-3xl px-4">
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<div className="mb-4 h-14 w-14 animate-spin rounded-full border-t-3 border-b-3 border-blue-500"></div>
						<h3 className="mb-2 text-lg font-semibold text-gray-800">
							Loading your plans
						</h3>
						<p className="text-md max-w-md text-gray-600">
							We're getting everything ready for you. Please wait
							a moment.
						</p>
					</div>
				</div>
			) : (
				<>
					<PlansContainer1
						isAuthenticated={isAuthenticated}
						token={token}
						navigate={navigate}
						onPaymentInitiated={() => setIsProcessingPayment(true)}
						onPaymentCancelled={() => setIsProcessingPayment(false)}
					/>
					<FeatureCard />
				</>
			)}
		</div>
	);
};

export default PlansPage;
