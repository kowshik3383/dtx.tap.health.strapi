import * as Sentry from '@sentry/nextjs'; // ✅ Add Sentry
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import { trackEvent } from '@/utils/analytics';
import { VOUCHER_ERRORS } from '../constants';
import { voucherService } from '../services/voucherService';

type ApiError = {
	message: string;
};

function isApiError(error: unknown): error is ApiError {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as { message: unknown }).message === 'string'
	);
}

export function useVoucher() {
	const router = useRouter();
	const [voucherCode, setVoucherCode] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isProcessing, setIsProcessing] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [errorPopupMessage, setErrorPopupMessage] = useState('');

	const { login } = useAuth();
	const { setPlanDetails } = useSubscriptionStore();

	const handleVoucherValidation = async () => {
		if (!voucherCode.trim()) {
			setErrorMessage(VOUCHER_ERRORS.EMPTY_CODE);
			return;
		}

		setLoading(true);
		setErrorMessage('');
		try {
			const validateResponse =
				await voucherService.validateVoucher(voucherCode);
			if (validateResponse.status === 'success') {
				setIsModalOpen(true);
			} else {
				setErrorMessage(validateResponse.message);
			}
		} catch (err: unknown) {
			const errorMessage = isApiError(err)
				? err.message
				: VOUCHER_ERRORS.GENERIC_ERROR;

			// ✅ Sentry log for validation error
			Sentry.captureException(err, {
				tags: { feature: 'voucher_validation' },
				extra: { voucherCode },
			});

			console.error('Validation error:', errorMessage);
			setErrorMessage(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleLoginSuccess = async (newToken: string) => {
		if (!newToken) {
			setErrorMessage(VOUCHER_ERRORS.GENERIC_ERROR);

			// ✅ Sentry log for missing login token
			Sentry.captureMessage('Login token missing during voucher login', {
				level: 'error',
				tags: { feature: 'voucher_login' },
				extra: { voucherCode },
			});

			return;
		}
		login(newToken);
		setIsProcessing(true);
		await redeemVoucher(newToken);
	};

	const redeemVoucher = async (userToken: string) => {
		if (!userToken) {
			Sentry.captureMessage('Voucher redeem failed: Missing user token', {
				level: 'error',
				tags: { feature: 'voucher_redeem' },
				extra: { voucherCode },
			});
			setErrorMessage(VOUCHER_ERRORS.GENERIC_ERROR);
			return;
		}

		setLoading(true);
		setErrorMessage('');
		try {
			const redeemData = await voucherService.redeemVoucher(
				voucherCode,
				userToken,
			);
			if (redeemData.status === 'success' && redeemData.data) {
				const details = {
					id: redeemData.data.subscription?.subscriptionId || 'N/A',
					name: 'Voucher Subscription',
					price: redeemData.data.subscription?.amount || 2388,
					interval: redeemData.data.subscription?.duration || 12,
					transactionId:
						redeemData.data.subscription?.subscriptionId || 'N/A',
					paymentMethod: 'Voucher',
				};
				setPlanDetails(details);

				// ✅ Track successful redeem
				trackEvent('dtx_dtech_landing_page_trial_active_success', {
					voucherCode,
					subscriptionId: details.id,
					price: details.price,
					duration: details.interval,
					paymentMethod: details.paymentMethod,
				});

				setTimeout(() => {
					setIsSuccess(true);
					router.push('/dtech25/success');
				}, 1000);
			} else {
				handleRedeemError(redeemData.message);
			}
		} catch (err: unknown) {
			Sentry.captureException(err, {
				tags: { feature: 'voucher_redeem' },
				extra: { voucherCode, userToken },
			});

			const errorMessage = isApiError(err)
				? err.message
				: VOUCHER_ERRORS.REDEEM_FAILED;
			handleRedeemError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleRedeemError = (message: string) => {
		if (message === VOUCHER_ERRORS.FREE_TRIAL_NEW_USERS) {
			// 🔥 Track if trial already active
			trackEvent('dtx_dtech_landing_page_trial_already_active', {
				voucherCode,
				errorMessage: message,
			});
			setErrorPopupMessage(message);
			setShowErrorPopup(true);
		} else if (message.includes(VOUCHER_ERRORS.ACTIVE_PLAN)) {
			// 📦 Track plan active error
			trackEvent('dtx_dtech_landing_page_trial_active_error', {
				voucherCode,
				errorMessage: message,
			});
			setErrorPopupMessage(message);
			setShowErrorPopup(true);
		} else {
			setErrorMessage(message);
		}

		setIsModalOpen(false);
		setIsProcessing(false);
	};

	const resetVoucher = () => {
		setVoucherCode('');
		setErrorMessage('');
		setShowErrorPopup(false);
	};

	return {
		voucherCode,
		setVoucherCode,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		errorMessage,
		isProcessing,
		isSuccess,
		showErrorPopup,
		errorPopupMessage,
		handleVoucherValidation,
		handleLoginSuccess,
		resetVoucher,
	};
}
