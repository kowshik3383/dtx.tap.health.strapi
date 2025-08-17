import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { useSubscriptionStore } from '@/store';
import { Plan } from '../constants/types';

interface UseSubscribeActionProps {
	isAuthenticated: boolean;
	token: string | null;
	navigate: (path: string) => void;
}

export function useSubscribeAction({
	isAuthenticated,
	token,
	navigate,
}: UseSubscribeActionProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		plans: storePlans,
		storeselectedIndex,
		fetchSubscriptionStatus,
		createSubscription,
	} = useSubscriptionStore();

	// Cast plans to the correct type
	const plans = storePlans as unknown as Plan[];

	const handleSubscribe = async () => {
		// If user is not authenticated, show login modal
		if (!isAuthenticated) {
			setIsModalOpen(true);
			return;
		}

		// Check if token exists
		if (!token) {
			console.error('Missing authentication token');
			Sentry.captureException(new Error('Missing authentication token'), {
				tags: {
					module: 'useSubscribeAction',
					reason: 'no_token',
				},
			});
			return;
		}

		// Check current subscription status
		const { currentSubStatus, currentSubPlan } =
			await fetchSubscriptionStatus(token, false);

		// Handle existing subscription
		if (currentSubStatus === 'ACTIVE' || currentSubStatus === 'TRIAL') {
			// Check if the subscription has cancellation requested
			// First make sure currentSubPlan exists and has the required structure
			if (
				currentSubPlan &&
				typeof currentSubPlan === 'object' &&
				'data' in currentSubPlan &&
				currentSubPlan.data &&
				typeof currentSubPlan.data === 'object' &&
				'cancellationRequested' in currentSubPlan.data &&
				currentSubPlan.data.cancellationRequested
			) {
				navigate('/manage_subscription/re_subscribe');
			} else {
				navigate('/manage_subscription');
			}
			return;
		}

		// Create new subscription
		const selectedPlan = plans[storeselectedIndex] as Plan;
		if (!selectedPlan) return;

		const promotionCode = selectedPlan.isPromotional
			? selectedPlan.promotion?.code
			: '';

		// Make sure razorpayPlanId exists
		if (selectedPlan.razorpayPlanId) {
			await createSubscription(
				selectedPlan.razorpayPlanId,
				promotionCode || '',
				token,
				navigate,
			);
		} else {
			console.error('Missing razorpayPlanId for selected plan');
			Sentry.captureException(
				new Error('Missing razorpayPlanId for selected plan'),
				{
					tags: {
						module: 'useSubscribeAction',
						reason: 'missing_razorpay_plan_id',
					},
					extra: {
						selectedPlan,
					},
				},
			);
		}
	};

	return {
		handleSubscribe,
		isModalOpen,
		setIsModalOpen,
	};
}
