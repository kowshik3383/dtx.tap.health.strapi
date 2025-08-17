'use client';

import { Success } from '@/components/success/Success';
import { useSubscriptionStore } from '@/store';

export default function SuccessAnimationPage() {
	const { planDetails } = useSubscriptionStore();

	// Using correct properties from PlanDetails interface
	const planInterval = planDetails?.interval
		? String(planDetails.interval)
		: '';
	const planId = planDetails?.id ? String(planDetails.id) : '';

	return (
		<Success
			subtitle={`Your ${planInterval} months plan is now active`}
			paymentSummaryItems={[
				{ key: 'Plan Duration', value: `${planInterval} months` },
				{ key: 'Transaction ID', value: planId },
			]}
			showInvoiceDownload={false}
		/>
	);
}
