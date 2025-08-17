/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import React from 'react';
import { trackEvent } from '@/utils/analytics';
import { AppStoreButtons } from './AppStoreButtons';
import { DownloadButton } from './DownloadButton';
import { PaymentSummary } from './PaymentSummary';
import {
	DOWNLOAD_HEADING,
	HEADING_STYLE,
	OVERLAY_ANIMATION,
} from '../constants';

// Helper to detect if in WebView
const isInWebView = () => {
	if (typeof window === 'undefined') return false;

	const userAgent = navigator.userAgent || '';
	return (
		(window as any).ReactNativeWebView ||
		/wv|WebView/i.test(userAgent)
	);
};

interface SuccessOverlayProps {
	showOverlay: boolean;
	onAppStoreClick: () => void;
	onPlayStoreClick: () => void;
	onDownloadClick: () => void;
	onCloseWebView?: () => void;
	paymentSummaryItems: Array<{ key: string; value: string }>;
	showInvoiceDownload?: boolean;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
	showOverlay,
	onAppStoreClick,
	onPlayStoreClick,
	onDownloadClick,
	onCloseWebView,
	paymentSummaryItems,
	showInvoiceDownload = false,
}) => {

	const handleDownloadClick = () => {
		trackEvent('dtx_dtech_landing_page_download_tap_health_click');
		onDownloadClick();
	};

	const handleExplorePlusClick = () => {
	const action = 'NAVIGATE_TO_SPLASHSCREEN';
	trackEvent('explore_plus_button_click');

	// ✅ Detect WebView
	const isInWebView = () => {
		if (typeof window === 'undefined') return false;
		const userAgent = navigator.userAgent || '';
		return (window as any).ReactNativeWebView || /wv|WebView/i.test(userAgent);
	};

	// ✅ Only run if inside WebView
	if (!isInWebView()) {
		alert('Not in WebView or ReactNativeWebView not available.');
		return;
	}

	try {
		// Detect platform
		const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

		// iOS → raw string | Android → JSON
		const payload = isIOS ? action : JSON.stringify({ type: action });

		console.log('[WebView] Sending action to React Native:', payload);

		(window as any).ReactNativeWebView.postMessage(payload);
	} catch (err) {
		console.error('[WebView] Failed to send explore_plus action:', err);
	}
};


	console.log('isInWebView:', isInWebView());

	return (
		<motion.div
			className="absolute bottom-0 w-full rounded-t-[32px] bg-white"
			style={{
				boxShadow: '0px -4px 20px rgba(0, 0, 0, 0.05)',
				height: '70vh',
				overflowY: 'auto',
				overflowX: 'hidden',
			}}
			initial={{ y: '100%' }}
			animate={{ y: showOverlay ? '0%' : '100%' }}
			transition={OVERLAY_ANIMATION}
		>
			<div className="flex flex-col items-center px-5 pt-8 pb-6">
				{/* Drag indicator */}
				<div className="mb-8 h-1 w-12 rounded-full bg-gray-300" />

				{/* Heading */}
				{isInWebView() ? (
					<h2
						className="font-urbanist mb-8 text-center text-green-600"
						style={HEADING_STYLE}
					>
						You are now upgraded to Plus
					</h2>
				) : (
					<h2
						className="font-urbanist mb-8 text-center"
						style={HEADING_STYLE}
					>
						{DOWNLOAD_HEADING.split('\n').map((line, i) => (
							<React.Fragment key={i}>
								{line}
								{i !== DOWNLOAD_HEADING.split('\n').length - 1 && <br />}
							</React.Fragment>
						))}
					</h2>
				)}

				{/* App Store Buttons (only show if not in WebView) */}
				{!isInWebView() && (
					<AppStoreButtons
						onAppStoreClick={onAppStoreClick}
						onPlayStoreClick={onPlayStoreClick}
					/>
				)}

				{/* Button: Explore Plus or Download */}
				{isInWebView() ? (
					<button
						onClick={handleExplorePlusClick}
						className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium shadow-md"
					>
						Begin Your Journey					</button>
				) : (
					<DownloadButton onClick={handleDownloadClick} />
				)}

				{/* Payment Summary */}
				<PaymentSummary
					items={paymentSummaryItems}
					showInvoiceDownload={showInvoiceDownload}
					onDownloadClick={handleDownloadClick}
				/>
			</div>
		</motion.div>
	);
};