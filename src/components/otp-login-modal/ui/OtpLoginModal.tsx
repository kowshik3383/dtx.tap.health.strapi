'use client';

import { useCallback, useState } from 'react';

// Internal imports
import { authService } from '@/services/auth/authService';
import { trackEvent } from '@/utils/analytics';
import { debounce } from '@/utils/debounce';
import { OtpVerificationStep } from './OtpVerificationStep';
import { ERROR_MESSAGES, PHONE_REGEX } from '../constants/validation';
import { PhoneInput } from '../elements/PhoneInput';
import { SubmitButton } from '../elements/SubmitButton';
import { OtpLoginModalProps } from '../types';

// UI components

export function OtpLoginModal({
	open,
	handleClose,
	...otherProps
}: OtpLoginModalProps) {
	const [mobileNumber, setMobileNumber] = useState('');
	const [showOtpStep, setShowOtpStep] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const isValidNumber = PHONE_REGEX.test(mobileNumber);

	// The actual implementation of the submit handler
	const submitMobileNumber = async () => {
		if (!isValidNumber) {
			setError(ERROR_MESSAGES.INVALID_PHONE);
			return;
		}

		// Track when user clicks on continue button
		trackEvent('dtx_paid_landing_page_phone_number_continue_click', {
			url: window.location.href,
			phone_number: mobileNumber,
			value: 30,
			currency: 'INR',
		});

		setIsLoading(true);
		setError('');

		try {
			const response = await authService.sendOtp(mobileNumber);
			if (response.success) {
				// Track OTP sent success event
				localStorage.setItem('mobileNumber', mobileNumber);
				trackEvent('dtx_paid_landing_page_otp_sent_success', {
					url: window.location.href,
					phone_number: mobileNumber,
					value: 30,
					currency: 'INR',
				});

				setShowOtpStep(true);
			} else {
				// Track OTP sent error event
				trackEvent('dtx_paid_landing_page_otp_sent_error', {
					url: window.location.href,
					phone_number: mobileNumber,
					error_reason:
						response.message || ERROR_MESSAGES.SERVER_ERROR,
				});
				setError(response.message || ERROR_MESSAGES.SERVER_ERROR);
			}
		} catch {
			// Track OTP sent error event
			trackEvent('dtx_paid_landing_page_otp_sent_error', {
				url: window.location.href,
				phone_number: mobileNumber,
				error_reason: ERROR_MESSAGES.SERVER_ERROR,
			});
			setError(ERROR_MESSAGES.SERVER_ERROR);
		} finally {
			setIsLoading(false);
		}
	};

	// Debounce the submission to prevent multiple calls
	// Ignoring exhaustive deps warning as we only want to recreate when these specific deps change
	const handleMobileSubmit = useCallback(
		debounce(
			async () => {
				if (isLoading) return;
				await submitMobileNumber();
			},
			1000,
			true,
		),
		[mobileNumber, isValidNumber, isLoading],
	);

	const handleBack = () => {
		// Track edit phone number click
		trackEvent('dtx_paid_landing_page_phone_number_edit_click', {
			url: window.location.href,
			phone_number: mobileNumber,
		});
		setShowOtpStep(false);
		setError('');
	};

	const handleModalClose = () => {
		handleClose();
		// Reset state when modal is closed
		setTimeout(() => {
			setMobileNumber('');
			setShowOtpStep(false);
			setError('');
			setIsLoading(false);
		}, 200); // Wait for modal close animation
	};

	if (!open) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-50 bg-[#090E1D]/60 backdrop-blur-[4px] transition-opacity duration-300"
				onClick={handleModalClose}
				aria-hidden="true"
			/>
			<div className="fixed inset-x-0 bottom-0 z-60 w-full transform rounded-t-[32px] bg-white p-8 shadow-xl transition-transform duration-300">
				{showOtpStep ? (
					<OtpVerificationStep
						mobileNumber={mobileNumber}
						onBack={handleBack}
						onLoginSuccess={(token: string) =>
							otherProps.onLoginSuccess?.(token)
						}
					/>
				) : (
					<div className="mx-auto max-w-lg space-y-4">
						<div className="space-y-2">
							<h2 className="text-[18px] leading-[28px] font-bold tracking-[0%] text-[#2A2B33]">
								Please enter your phone number
							</h2>
							<p className="text-[14px] leading-relaxed text-[#6C727F]">
								Enter the phone number of the person who will be
								using the program.
							</p>
						</div>

						<div
							className={`flex items-center rounded-full bg-[#F8FAFB] px-5 py-4 ${
								error ? 'border border-red-500' : ''
							}`}>
							<PhoneInput
								value={mobileNumber}
								onChange={value => {
									// Track only when user types a number (not on initial load or clear)
									if (value && value !== mobileNumber) {
										trackEvent(
											'dtx_paid_landing_page_phone_number_type',
											{
												url: window.location.href,
												value: 30,
												currency: 'INR',
											},
										);
									}
									setMobileNumber(value);
									setError('');
								}}
								isValid={!error}
								className="w-full bg-transparent text-[18px] text-[#2A2B33] placeholder-[#6C727F] outline-none"
							/>
						</div>

						<SubmitButton
							onClick={handleMobileSubmit}
							disabled={!mobileNumber || mobileNumber.length < 10}
							loading={isLoading}
							className={`w-full rounded-full !bg-[#2563EB] py-4 text-center text-[18px] font-semibold text-white transition-colors ${
								!mobileNumber || mobileNumber.length < 10
									? 'bg-[#DCE1E8]'
									: 'bg-[#2563EB]'
							}`}>
							Continue
						</SubmitButton>
					</div>
				)}
			</div>
		</>
	);
}
