'use client';
import React from 'react';

interface ErrorPopupProps {
	show: boolean;
	message: string;
}

export function ErrorPopup({ show, message }: ErrorPopupProps) {
	if (!show) return null;

	const handleAction = () => {
		// Default behavior for unauthenticated users - direct to app stores
		const userAgent = navigator.userAgent || navigator.vendor;

		if (/android/i.test(userAgent)) {
			window.location.href =
				'https://play.google.com/store/apps/details?id=com.taphealthapp&amp%3Bhl=en_US';
		} else if (/iPhone|iPad|iPod/i.test(userAgent)) {
			window.location.href =
				'https://apps.apple.com/in/app/tap-health-ai-health-app/id6478812140';
		} else {
			alert('Your platform is not supported for direct download.');
		}
	};

	// Dynamically determine button text based on user's subscription status
	const getButtonText = () => {
		return 'Open app';
	};

	return (
		<div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="mx-4 w-[400px] max-w-[90%] rounded-2xl bg-white p-6">
				<div className="flex flex-col items-center gap-4 text-center">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M12 9v5M12 17.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
								stroke="#EF4444"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>

					<div className="space-y-1">
						{/* <h3 className="text-lg font-bold">Error</h3> */}
						<p className="text-gray-600">{message}</p>
					</div>

					<button
						onClick={handleAction}
						className="w-full rounded-md bg-[#2563EB] px-6 py-4 font-bold text-white">
						{getButtonText()}
					</button>
				</div>
			</div>
		</div>
	);
}
