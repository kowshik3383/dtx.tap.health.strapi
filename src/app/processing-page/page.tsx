'use client';

import * as Sentry from '@sentry/nextjs'; // ✅ Added Sentry import
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Loading from '@/components/ui/Loading';
import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';

export default function ProcessingPage() {
	const [isProcessing, setIsProcessing] = useState(true);
	const router = useRouter();
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Get authentication information
	const { token, isAuthenticated, isLoading: authLoading } = useAuth();

	// Get subscription store methods
	const fetchSubscriptionStatus = useSubscriptionStore(
		state => state.fetchSubscriptionStatus,
	);
	const subscriptionData = useSubscriptionStore(
		state => state.subscriptionData,
	);
	const paymentId = useSubscriptionStore(state => state.paymentId);
	const paymentSuccessData = useSubscriptionStore(
		state => state.paymentSuccessData,
	);

	// Poll for subscription status
	const pollSubscriptionStatus = useCallback(
		async (authToken: string) => {
			if (!authToken) {
				toast.error('Authentication token is missing');
				router.push('/plans');
				return;
			}

			// If we already have payment success data, redirect to success page
			if (paymentSuccessData) {
				console.log(
					'Payment success data found, navigating to success page',
				);
				// TODO: Track facebook events for Payment
				setIsProcessing(false);
				router.push('/plans/success');
				return true;
			}

			// If we already have subscription data and it's active, navigate to success
			if (subscriptionData?.status === 'ACTIVE') {
				console.log(
					'Active subscription data found, navigating to success page',
				);
				setIsProcessing(false);
				router.push('/plans/success');
				return true;
			}

			try {
				const result = await fetchSubscriptionStatus(authToken, false);

				// If we have subscription data and it's active, navigate to success
				if (result?.currentSubStatus === 'ACTIVE') {
					setIsProcessing(false);
					router.push('/plans/success');
					return true;
				}

				// If the status is something other than ACTIVE, we need to handle accordingly
				if (result?.currentSubStatus) {
					// We have a status but it's not active yet, continue polling
					return false;
				}

				// Check if we have a payment ID but no subscription data yet
				if (paymentId && !result?.currentSubStatus) {
					// Payment is being processed, continue polling
					return false;
				}

				return false;
			} catch (error) {
				console.error('Error polling subscription status:', error);
				Sentry.captureException(error, {
					tags: {
						context: 'pollSubscriptionStatus',
					},
					extra: {
						paymentId,
						paymentSuccessData,
						subscriptionData,
					},
				});
				return false;
			}
		},
		[
			fetchSubscriptionStatus,
			router,
			paymentId,
			paymentSuccessData,
			subscriptionData,
		],
	);

	useEffect(() => {
		// First check if we're still loading auth state
		if (authLoading) {
			return; // Wait for auth to load
		}

		// Check for payment cancellation flag if in browser
		if (typeof window !== 'undefined') {
			const wasCancelled = sessionStorage.getItem(
				'razorpay_payment_cancelled',
			);
			if (wasCancelled === 'true') {
				// Clear the flag
				sessionStorage.removeItem('razorpay_payment_cancelled');
				// Redirect to plans page since payment was likely cancelled
				toast.info('Payment process was cancelled.');
				router.push('/plans');
				return;
			}
		}

		// Redirect if not authenticated
		if (!isAuthenticated || !token) {
			toast.error('You need to be logged in to access this page');
			router.push('/plans');
			return;
		}

		// Check if we have a paymentId, if not the user likely arrived here without starting a payment
		if (!paymentId) {
			console.log('No payment ID found, redirecting to plans page');
			toast.info(
				'No payment information found. Redirecting to plans page.',
			);
			router.push('/plans');
			return;
		}

		// Add a fallback timeout to redirect to plans page if payment was likely cancelled
		const paymentCancellationTimeout = setTimeout(() => {
			// If we're still on the processing page after 10 seconds without payment confirmation
			// it's likely that the user cancelled the payment but ondismiss didn't trigger
			router.push('/plans');
		}, 10000); // 10 seconds timeout

		// Immediate check for existing data before starting polling
		const checkExistingData = async () => {
			// If we already have payment success data or active subscription, no need to poll
			if (paymentSuccessData || subscriptionData?.status === 'ACTIVE') {
				const success = await pollSubscriptionStatus(token);
				if (success) {
					clearTimeout(paymentCancellationTimeout); // Clear fallback timeout
					// Successfully redirected based on existing data
					router.push('/plans/success');
					return;
				}
			}

			if (!paymentSuccessData && subscriptionData?.status !== 'ACTIVE') {
				Sentry.captureMessage(
					'Started polling: no paymentSuccessData or active subscription',
					{
						level: 'info',
						tags: {
							context: 'checkExistingData',
						},
						extra: {
							paymentId,
							subscriptionStatus: subscriptionData?.status,
						},
					},
				);
			}

			// If we don't have the necessary data yet, start polling
			startPolling();
		};

		// Auth is confirmed, start polling for subscription status
		const startPolling = () => {
			let attempts = 0;
			const maxAttempts = 20; // Reduce maximum attempts since we have a fallback timeout
			const pollInterval = 5000; // Poll every 5 seconds

			// Start polling
			const poll = async () => {
				const success = await pollSubscriptionStatus(token);

				if (success) {
					clearTimeout(paymentCancellationTimeout); // Clear fallback timeout
					// Successfully got active subscription, navigation happens in pollSubscriptionStatus
					return;
				}

				attempts++;

				if (attempts >= maxAttempts) {
					Sentry.captureMessage('Subscription polling timed out', {
						level: 'warning',
						tags: {
							context: 'startPolling',
						},
						extra: {
							attempts,
							paymentId,
							subscriptionData,
						},
					});

					toast.error(
						'Subscription processing timed out. Please try again or contact support.',
					);
					router.push('/plans');
					return;
				}

				// Continue polling
				timeoutRef.current = setTimeout(poll, pollInterval);
			};

			poll();
		};

		// Start with checking existing data
		checkExistingData();

		// Cleanup function
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
			clearTimeout(paymentCancellationTimeout); // Clear fallback timeout on component unmount

			// Ensure any lingering Razorpay modal is removed
			if (typeof window !== 'undefined') {
				const razorpayModal = document.querySelector(
					'.razorpay-container',
				);
				if (razorpayModal) {
					// If somehow Razorpay container still exists, try to remove it
					razorpayModal.remove();
					console.log('Removed lingering Razorpay container');
					Sentry.captureMessage(
						'Razorpay modal was still present during cleanup',
						{
							level: 'info',
						},
					);
				}
			}
		};
	}, [
		pollSubscriptionStatus,
		router,
		token,
		isAuthenticated,
		authLoading,
		paymentSuccessData,
		subscriptionData,
	]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-white">
			<Loading
				isProcessing={isProcessing}
				processingText="Verifying your\npayment status"
				processingSubText="We're checking the status of your payment. This may take a moment."
			/>
		</div>
	);
}
