/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';

import { useEffect, useState } from 'react';

interface LoadingProps {
	isProcessing: boolean;
	processingText?: string;
	processingSubText?: string;
	successText?: string;
	successSubText?: string;
}

export default function Loading({
	isProcessing,
	processingText = 'We are processing\nyour subscription',
	processingSubText = "This may take a few moments. Please don't close this page.",
	successText = 'Subscription processed\nSuccessfully',
	successSubText = 'Redirecting you to the success page...',
}: LoadingProps) {

	const [showReturnButton, setShowReturnButton] = useState(false);
	const [processingTime, setProcessingTime] = useState(0);

	// Show the return button after a few seconds of processing
	useEffect(() => {
		if (isProcessing) {
			const timer = setTimeout(() => {
				setShowReturnButton(true);
			}, 8000); // Show after 8 seconds

			// Update processing time counter
			const intervalTimer = setInterval(() => {
				setProcessingTime(prev => prev + 1);
			}, 1000);

			return () => {
				clearTimeout(timer);
				clearInterval(intervalTimer);
			};
		}
	}, [isProcessing]);

	return (
		<div className="flex flex-col items-center justify-center rounded-lg p-8">
			{/* Animation container */}
			<div className="mb-6">
				<Image
					src="/assets/animation2.gif"
					alt="Processing Animation"
					width={120}
					height={80}
					priority
				/>
			</div>

			{/* Loading indicator dot */}
			{isProcessing && (
				<div className="mb-6 h-3 w-3 animate-pulse rounded-full bg-gray-300"></div>
			)}

			{/* Processing text */}
			<h2 className="text-center text-xl leading-relaxed font-bold text-gray-800">
				{isProcessing ? (
					<>
						{processingText.split('\n').map((line, i) => (
							<span key={i}>
								{line}
								{i < processingText.split('\n').length - 1 && (
									<br />
								)}
							</span>
						))}
					</>
				) : (
					<>
						{successText.split('\n').map((line, i) => (
							<span key={i}>
								{line}
								{i < successText.split('\n').length - 1 && (
									<br />
								)}
							</span>
						))}
					</>
				)}
			</h2>

			{/* Status message */}
			<p className="mt-4 text-center text-sm text-gray-500">
				{isProcessing ? processingSubText : successSubText}
			</p>

			{/* Processing time indicator */}
			{isProcessing && processingTime > 5 && (
				<p className="mt-2 text-center text-xs text-gray-400">
					Processing for {processingTime} seconds
				</p>
			)}
		</div>
	);
}
