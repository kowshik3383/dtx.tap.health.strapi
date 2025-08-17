'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSubscriptionStore } from '@/store';
import { useAuth } from './useAuth';

// Helper function for better logging
const logger = {
	info: (message: string, data?: unknown) => {
		console.info(`[PLANS AUTH] ${message}`, data ?? '');
	},
	warn: (message: string, data?: unknown) => {
		console.warn(`[PLANS AUTH] ${message}`, data ?? '');
	},
	error: (message: string, data?: unknown) => {
		console.error(`[PLANS AUTH] ${message}`, data ?? '');
	},
	debug: (message: string, data?: unknown) => {
		console.debug(`[PLANS AUTH] ${message}`, data ?? '');
	},
};

type UsePlansAuthOptions = {
	redirectUnauthenticatedTo?: string;
	autoFetchPlans?: boolean;
};

/**
 * Custom hook to handle authentication and subscription status checks for the Plans page
 */
export const usePlansAuth = ({
	redirectUnauthenticatedTo = '/',
	autoFetchPlans = true,
}: UsePlansAuthOptions = {}) => {
	const { token, isAuthenticated, isLoading: authLoading } = useAuth();

	// ✅ grab stable references from Zustand
	const fetchPlanData = useSubscriptionStore((s) => s.fetchPlanData);
	const fetchSubscriptionStatus = useSubscriptionStore(
		(s) => s.fetchSubscriptionStatus,
	);
	const plansLoading = useSubscriptionStore((s) => s.storeloading);

	const router = useRouter();

	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);
	const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(
		null,
	);
	const [hasCancellationRequested, setHasCancellationRequested] =
		useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	// --- Subscription check ---
	const checkSubscriptionStatus = useCallback(async () => {
		if (!token) return false;

		logger.info('Checking subscription status');
		setIsCheckingSubscription(true);

		try {
			const { currentSubStatus, currentSubPlan } =
				await fetchSubscriptionStatus(token, false);

			const cancellationRequested = !!(currentSubPlan)?.cancellationRequested;

			setSubscriptionStatus(currentSubStatus);
			setHasCancellationRequested(cancellationRequested);
			logger.info('Subscription status result', {
				currentSubStatus,
				cancellationRequested,
			});

			// --- No auto-redirect on plans page ---
			if (
				(currentSubStatus === 'ACTIVE' || currentSubStatus === 'TRIAL') &&
				currentSubPlan?.userTier === 'PLUS'
			) {
				logger.info('Plus subscription detected; suppressing auto-redirect on plans page');
				return true;
			}

			logger.info('User has no active subscription', { status: currentSubStatus });
			return false;
		} catch (err) {
			logger.error('Error checking subscription status:', err);
			setError(
				err instanceof Error
					? err
					: new Error('Unknown error checking subscription'),
			);
			return false;
		} finally {
			setIsCheckingSubscription(false);
		}
	}, [token, fetchSubscriptionStatus, router]);

	// --- Auth check ---
	const checkAuthentication = useCallback(async () => {
		logger.info('Checking auth status', { isAuthenticated, authLoading });

		if (authLoading) {
			logger.info('Auth still loading, waiting...');
			return;
		}

		// Always fetch plans for UI
		if (autoFetchPlans) {
			logger.info('Fetching plan data for user');
			fetchPlanData();
		}

		// Unauthenticated users can stay on Plans page
		if (!isAuthenticated) {
			logger.info('User not authenticated, staying on plans page');
			setIsCheckingAuth(false);
			return;
		}

		// Authenticated users: check subscription
		setIsCheckingAuth(false);
		checkSubscriptionStatus();
	}, [
		isAuthenticated,
		authLoading,
		autoFetchPlans,
		fetchPlanData,
		checkSubscriptionStatus,
	]);

	// --- Effect ---
	useEffect(() => {
		logger.info('usePlansAuth hook running');
		checkAuthentication();

		return () => {
			logger.debug('usePlansAuth hook cleanup');
		};
	}, [checkAuthentication]);

	return {
		// Auth
		isAuthenticated,
		authLoading,
		token,

		// Subscription
		subscriptionStatus,
		hasCancellationRequested,

		// Loading states
		isCheckingAuth,
		isCheckingSubscription,
		plansLoading,

		isLoading:
			authLoading || isCheckingAuth || isCheckingSubscription || plansLoading,

		// Methods
		checkSubscriptionStatus,
		checkAuthentication,

		// Errors
		error,

		// Router helper
		navigate: router.push,
	};
};

export default usePlansAuth;
