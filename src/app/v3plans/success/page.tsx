'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Success } from '@/components/success/Success';
import { useSubscriptionStore } from '@/store';
import { trackFacebookPixelEvent } from '@/utils/analytics';
import { trackPurchaseComplete } from '@/utils/fbEvents';

export default function PlansSuccessPage() {
	const { subscriptionData, paymentId, selectedPlan, paymentSuccessData } =
		useSubscriptionStore();
	const router = useRouter();

	// Only redirect if we have no data at all to display
	// If we have any of: subscriptionData OR paymentSuccessData OR selectedPlan - show the page
	useEffect(() => {
		const hasSubscriptionData = Boolean(subscriptionData);
		const hasPaymentData = Boolean(paymentSuccessData);
		const hasSelectedPlan = Boolean(selectedPlan);

		// Only redirect if we have none of the required data
		if (!hasSubscriptionData && !hasPaymentData && !hasSelectedPlan) {
			router.push('/plans');
		}
	}, [subscriptionData, paymentSuccessData, selectedPlan, router]);

	// Track purchase event when the page loads with payment data
	useEffect(() => {
		// Only track if we have payment data to confirm a successful purchase
		if (
			paymentSuccessData ||
			(subscriptionData?.paymentHistory &&
				subscriptionData.paymentHistory.length > 0)
		) {
			// Get amount from the same logic used to display it
			const purchaseAmount =
				subscriptionData?.nextBillingAmount &&
				subscriptionData?.nextBillingAmount !== 0
					? subscriptionData?.nextBillingAmount
					: paymentSuccessData?.amount &&
					  paymentSuccessData?.amount !== 0
					? paymentSuccessData?.amount
					: selectedPlan?.item?.unitAmount || 0;

			// Track using the existing purchase tracking function
			trackPurchaseComplete(
				selectedPlan ||
					subscriptionData?.plan || {
						id: 'unknown',
						interval: 0,
						isPromotional: false,
					},
				purchaseAmount,
				'INR',
			);

			// Also track directly with Facebook Pixel to ensure it fires
			trackFacebookPixelEvent('Purchase', {
				value: purchaseAmount / 100, // Convert paise to rupees
				currency: 'INR',
				content_type: 'product',
				content_ids: [
					selectedPlan?.id || subscriptionData?.plan?.id || 'unknown',
				],
				content_name: 'Subscription Plan',
			});

			// Log for debugging
			console.log(
				'🔍 Tracked purchase event with amount:',
				purchaseAmount / 100,
			);
		}
	}, [paymentSuccessData, subscriptionData, selectedPlan]);

	// Get plan interval - prioritize subscription data, fallback to selected plan
	const planInterval = subscriptionData?.plan?.interval
		? String(subscriptionData.plan.interval)
		: selectedPlan?.interval
		? String(selectedPlan.interval)
		: '';

	// Get payment amount - prioritize subscription data, fallback to payment success data
	// Check for both undefined and zero values in the fallback chain
	console.log('Subscription data:', subscriptionData);
	console.log('Payment success data:', paymentSuccessData);
	console.log('Selected plan:', selectedPlan);
	console.log('Payment ID:', paymentId);

	const amount =
		subscriptionData?.nextBillingAmount &&
		subscriptionData?.nextBillingAmount !== 0
			? subscriptionData?.nextBillingAmount
			: paymentSuccessData?.amount && paymentSuccessData?.amount !== 0
			? paymentSuccessData?.amount
			: selectedPlan?.item?.unitAmount || 0;

	// Log the final amount being used
	console.log('Final amount used:', amount);

	// Format currency - assuming INR based on the screenshot
	const formattedAmount = `₹${amount / 100}.00`;

	// Get transaction ID - use available sources in priority order
	const transactionId =
		subscriptionData?.paymentHistory?.[0]?.paymentId ||
		paymentSuccessData?.providerMetadata?.paymentId ||
		paymentId ||
		'';

	// Get payment method information
	const paymentMethod =
		paymentSuccessData?.paymentMode ||
		subscriptionData?.paymentHistory?.[0]?.paymentMode ||
		'';

	// Get card/UPI details if available
	const paymentDetails = paymentSuccessData?.card
		? `Card ending with ${paymentSuccessData.card.last4}`
		: paymentSuccessData?.upi
		? `UPI (${paymentSuccessData.upi.vpa})`
		: '';

	// Get email/phone - masking for privacy
	const userContact = subscriptionData?.phoneNumber
		? `${subscriptionData.phoneNumber.substring(
				0,
				2,
		  )}*******${subscriptionData.phoneNumber.substring(
				subscriptionData.phoneNumber.length - 2,
		  )}`
		: '';

	// Determine data availability
	const hasSubscriptionData = Boolean(subscriptionData);
	const hasPaymentData = Boolean(paymentSuccessData);
	const hasSelectedPlan = Boolean(selectedPlan);

	// Determine what kind of plan/payment we're dealing with
	const isFreeTrial = subscriptionData?.isTrial === true;
	const _hasProcessedPayment = Boolean(
		paymentSuccessData ||
			(subscriptionData?.paymentHistory &&
				subscriptionData.paymentHistory.length > 0),
	);

	// Create a dynamic subtitle based on available data
	let subtitle = '';

	if (isFreeTrial) {
		subtitle = `Your ${planInterval} months free trial is now active`;
	} else {
		subtitle = `Your ${planInterval} months subscription is active`;
	}

	// Use the subtitle to convey the full message since there's no title prop
	let displaySubtitle = subtitle;

	// Add a prefix based on whether it's a payment or just a selection
	if (hasSubscriptionData || hasPaymentData) {
		displaySubtitle = `Payment Successful! \n ${subtitle}`;
	} else if (hasSelectedPlan) {
		displaySubtitle = `Thank You! \n ${subtitle}`;
	}
	const onAppStoreClick = () => {
		window.open(
			'https://apps.apple.com/in/app/tap-health-health-assistant/id6478812140',
			'_blank',
		);
	};
	const onPlayStoreClick = () => {
		window.open(
			'https://play.google.com/store/apps/details?id=com.taphealthapp',
			'_blank',
		);
	};
	return (
		<Success
			subtitle={displaySubtitle}
			paymentSummaryItems={[
				{
					key: 'Plan Duration',
					value: planInterval
						? `${planInterval} months`
						: 'Subscription',
				},
				{ key: 'Amount paid', value: formattedAmount },
				...(paymentMethod
					? [{ key: 'Payment method', value: paymentMethod }]
					: []),
				...(paymentDetails
					? [{ key: 'Payment details', value: paymentDetails }]
					: []),
				...(userContact
					? [{ key: 'Account', value: userContact }]
					: []),
				{ key: 'Transaction ID', value: transactionId },
			].filter(item => item.value)}
			showInvoiceDownload={false}
			onAppStoreClick={onAppStoreClick}
			onPlayStoreClick={onPlayStoreClick}
		/>
	);
}
