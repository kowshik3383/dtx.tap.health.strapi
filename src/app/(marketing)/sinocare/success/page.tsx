'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Success } from '@/components/success/Success';
import { useSubscriptionStore } from '@/store';
import { trackEvent } from '@/utils/analytics';

export default function SinocareSuccessPage() {
	const { subscriptionData } = useSubscriptionStore();
	const router = useRouter();

	useEffect(() => {
		// Track page view
		trackEvent('sinocare_success_page_view', {
			hasSubscriptionData: Boolean(subscriptionData),
			value: 20, // 💰 amount
			currency: 'INR',
		});

		// Redirect to sinocare landing page if no subscription data is available
		if (!subscriptionData) {
			router.push('/sinocare');
		}
	}, [subscriptionData, router]);

	// Track successful activation
	useEffect(() => {
		if (subscriptionData) {
			trackEvent('sinocare_trial_activation_success', {
				subscription_id: subscriptionData.subscriptionId,
				plan_type: 'trial',
				user_id: subscriptionData.userId,
				phone_number: subscriptionData.phoneNumber
					? `${subscriptionData.phoneNumber.substring(
							0,
							2,
					  )}*******${subscriptionData.phoneNumber.substring(
							subscriptionData.phoneNumber.length - 2,
					  )}`
					: '',
				partner: 'Sinocare CGM',
				value: 60,
				currency: 'INR',
			});
		}
	}, [subscriptionData]);

	// Early return if no subscription data to prevent rendering with undefined values
	if (!subscriptionData) {
		return null;
	}

	// Get plan interval from subscription data
	const planInterval = subscriptionData?.plan?.interval
		? String(subscriptionData.plan.interval)
		: '3'; // Default to 3 for Sinocare trial

	// Format dates for display
	const startDate = new Date(subscriptionData.createdAt).toLocaleDateString(
		'en-IN',
		{
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		},
	);

	const nextRenewalDate = subscriptionData.nextRenewalDate
		? new Date(subscriptionData.nextRenewalDate).toLocaleDateString(
				'en-IN',
				{
					day: 'numeric',
					month: 'short',
					year: 'numeric',
				},
		  )
		: '';

	// Get user phone number with masking for privacy
	const userContact = subscriptionData?.phoneNumber
		? `${subscriptionData.phoneNumber.substring(
				0,
				2,
		  )}*******${subscriptionData.phoneNumber.substring(
				subscriptionData.phoneNumber.length - 2,
		  )}`
		: '';

	// Create the subtitle
	const subtitle = `Your ${planInterval} months free trial is now active`;
	const displaySubtitle = `Success! ${subtitle}`;

	return (
		<Success
			subtitle={displaySubtitle}
			paymentSummaryItems={[
				{
					key: 'Plan Duration',
					value: `${planInterval} months free trial`,
				},
				{ key: 'Amount paid', value: 'Free' },
				{ key: 'Start date', value: startDate },
				...(nextRenewalDate
					? [{ key: 'Renewal date', value: nextRenewalDate }]
					: []),
				...(userContact
					? [{ key: 'Account', value: userContact }]
					: []),
				{
					key: 'Subscription ID',
					value: subscriptionData.subscriptionId,
				},
				{ key: 'Partner', value: 'Sinocare CGM' },
			].filter(item => item.value)}
			showInvoiceDownload={false}
			onAppStoreClick={() => {
				trackEvent('sinocare_success_app_store_click', {});
				window.open(
					'https://apps.apple.com/app/tap-health/id1581202263',
					'_blank',
				);
			}}
			onPlayStoreClick={() => {
				trackEvent('sinocare_success_play_store_click', {});
				window.open(
					'https://play.google.com/store/apps/details?id=com.taphealth',
					'_blank',
				);
			}}
		/>
	);
}
