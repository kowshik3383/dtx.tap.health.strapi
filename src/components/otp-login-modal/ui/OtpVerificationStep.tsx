'use client';

import mixpanel from 'mixpanel-browser';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import { UserData } from '@/store/types/subscription.types';
import { identifyUser, trackEvent } from '@/utils/analytics';
import { registerHigherIntentEvent } from '@/utils/registerIntentEvent';
import { ERROR_MESSAGES } from '../constants/validation';
import { useOtpTimer } from '../hooks/useOtpTimer';
import { sendOtpRequest, verifyOtpRequest } from '../services/sendOtpRequest';
import { OtpVerificationStepProps } from '../types';

export interface ZohoLead {
	Phone: string;
	UTM_Source: string;
	UTM_Campaign: string;
	UTM_Medium: string;
	UTM_Id: string;
	UTM_Term: string;
	UTM_Content: string;
	otp_flow?: string;
	tag?: string;
	slug: string;
	pathname: string;
}

export function OtpVerificationStep({
	mobileNumber,
	onBack,
	onLoginSuccess,
}: OtpVerificationStepProps) {
	const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { seconds, isActive, restart } = useOtpTimer();
	const inputRefs = useRef<HTMLInputElement[]>([]);
	const activeIndexRef = useRef(0);
	const setUserData = useSubscriptionStore(state => state.setUserData);
	const router = useRouter();
	const { login } = useAuth();
	const searchParams = useSearchParams();
	const [utmId, setUtmId] = useState<string>('');
	const [utmSource, setUtmSource] = useState<string>('');
	const [utmCampaign, setUtmCampaign] = useState<string>('');
	const [utmMedium, setUtmMedium] = useState<string>('');
	const [utmTerm, setUtmTerm] = useState<string>('');
	const [utmContent, setUtmContent] = useState<string>('');
	const [slug, setSlug] = useState<string>('');
	const pathname = usePathname();
	useEffect(() => {
		inputRefs.current[0]?.focus();
		setUtmId(searchParams.get('utm_id') || '');
		setUtmSource(searchParams.get('utm_source') || '');
		setUtmCampaign(searchParams.get('utm_campaign') || '');
		setUtmMedium(searchParams.get('utm_medium') || '');
		setUtmTerm(searchParams.get('utm_term') || '');
		setUtmContent(searchParams.get('utm_content') || '');
		setSlug(searchParams.get('slug') || pathname);
	}, [searchParams]);
	const focusInput = (index: number) => {
		activeIndexRef.current = index;
		inputRefs.current[index]?.focus();
	};

	const handleOtpChange = (
		index: number,
		e: ChangeEvent<HTMLInputElement>,
	) => {
		const value = e.target.value;
		if (!/^\d*$/.test(value)) return;

		const digit = value.slice(-1);
		const newOtp = [...otp];
		newOtp[index] = digit;
		setOtp(newOtp);
		setError('');

		if (digit && index < 3) {
			focusInput(index + 1);
		}

		const isComplete = newOtp.every(d => /^\d$/.test(d));
		if (isComplete && index === 3) {
			handleVerifyOtp(newOtp);
		}
	};

	const handleKeyDown = (
		index: number,
		e: React.KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			focusInput(index - 1);
		} else if (e.key === 'ArrowLeft' && index > 0) {
			focusInput(index - 1);
		} else if (e.key === 'ArrowRight' && index < 3) {
			focusInput(index + 1);
		}
	};

	const handleVerifyOtp = async (otpArray?: string[]) => {
		const currentOtp = otpArray || otp;
		const otpValue = currentOtp.join('');
		const isComplete = currentOtp.every(digit => /^\d$/.test(digit));
		console.log('currentOtp', currentOtp);

		if (!isComplete || otpValue.length !== 4) {
			setError(ERROR_MESSAGES.OTP_REQUIRED);
			return;
		}
		setIsLoading(true);
		setError('');

		try {
			const response = await verifyOtpRequest(mobileNumber, otpValue);
			if (response.success && response.data?.token) {
				identifyUser(mobileNumber, {
					phone: mobileNumber,
					$phone: mobileNumber,
					$last_login: new Date().toISOString(),
					// plan: 'Free', // Example property
				});
				const otp_flow = pathname.includes('plans')
					? 'v2flow'
					: 'normalflow';
				// if (pathname !== '/plans') {
				// fetch('/api/interakt/create', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 	},
				// 	body: JSON.stringify({
				// 		mobileNumber: mobileNumber,
				// 		tag: 'OTP Verified Lead',
				// 	}),
				// });
				console.log(
					'Utm sources',
					utmCampaign,
					utmSource,
					utmMedium,
					utmId,
				);
				fetch('/api/zoho/otp-verified-lead', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						Phone: mobileNumber,
						UTM_Source: utmSource,
						UTM_Campaign: utmCampaign,
						UTM_Medium: utmMedium,
						UTM_Id: utmId,
						UTM_Term: utmTerm,
						UTM_Content: utmContent,
						otp_flow: otp_flow,
						pathname: pathname,
						slug: slug,
					}),
				}).catch(error => {
					console.error('Error sending UTM params to backend', error);
				});
				// Track OTP verification success

				trackEvent('dtx_paid_landing_page_otp_verification_success', {
					url: window.location.href,
					phone_number: mobileNumber,
					value: 80,
					currency: 'INR',
				});
				registerHigherIntentEvent(
					'dtx_paid_landing_page_otp_verification_success',
				);
				mixpanel.register({
					$phone: mobileNumber,
					$last_login: new Date().toISOString(),
					mobile_number: mobileNumber,
				});
				// Store user data in the subscription store if available
				if (response.data.user) {
					const userData: UserData = {
						id: response.data.user.id,
						phone: response.data.user.phone,
					};
					setUserData(userData);
				}

				localStorage.setItem('token', response.data.token);
				localStorage.setItem('mobieNumber', mobileNumber);
				if (response.data.subscriptionActive) {
					router.push(
						`/manage_subscription?cancellationRequested=${response.data.cancellationRequested}`,
					);
					login(response.data.token, mobileNumber);
					return;
				}
				onLoginSuccess?.(response.data.token);
			} else {
				// Track OTP verification error
				trackEvent('dtx_paid_landing_page_otp_verification_error', {
					url: window.location.href,
					phone_number: mobileNumber,
					error_reason: response.message || ERROR_MESSAGES.OTP_FAILED,
				});
				setError(response.message || ERROR_MESSAGES.OTP_FAILED);
			}
		} catch {
			// Track OTP verification error
			trackEvent('dtx_paid_landing_page_otp_verification_error', {
				url: window.location.href,
				phone_number: mobileNumber,
				error_reason: ERROR_MESSAGES.SERVER_ERROR,
			});
			setError(ERROR_MESSAGES.SERVER_ERROR);
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendOtp = async () => {
		// Track when user clicks on resend
		trackEvent('dtx_paid_landing_page_otp_resend_click', {
			url: window.location.href,
			phone_number: mobileNumber,
		});

		try {
			const response = await sendOtpRequest(mobileNumber);
			if (response.success) {
				// Track OTP resend success
				trackEvent('dtx_paid_landing_page_otp_resend_success', {
					url: window.location.href,
					phone_number: mobileNumber,
				});
				restart();
				setError('');
				setOtp(Array(4).fill(''));
				focusInput(0);
			} else {
				// Track OTP resend error
				trackEvent('dtx_paid_landing_page_otp_resend_error', {
					url: window.location.href,
					phone_number: mobileNumber,
					error_reason:
						response.message || ERROR_MESSAGES.SERVER_ERROR,
				});
				setError(response.message || ERROR_MESSAGES.SERVER_ERROR);
			}
		} catch {
			// Track OTP resend error
			trackEvent('dtx_paid_landing_page_otp_resend_error', {
				url: window.location.href,
				phone_number: mobileNumber,
				error_reason: ERROR_MESSAGES.SERVER_ERROR,
			});
			setError(ERROR_MESSAGES.SERVER_ERROR);
		}
	};

	return (
		<div className="space-y-6 px-4">
			<div className="space-y-2">
				<div className="flex items-center gap-4">
					<button
						onClick={onBack}
						className="flex h-8 w-8 items-center justify-center rounded-full text-[#2A2B33] hover:bg-gray-100">
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M15 10H5M5 10L10 15M5 10L10 5"
								stroke="currentColor"
								strokeWidth="1.67"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<h2 className="font-urbanist text-[18px] leading-[28px] font-bold tracking-[0%] text-[#2A2B33]">
						Enter OTP
					</h2>
				</div>
				<div className="flex items-center gap-1">
					<p className="text-[14px] leading-[16.8px] font-medium tracking-[-0.002em] text-[#252E49]">
						We have sent OTP on +91 {mobileNumber}
					</p>
					<button
						onClick={() => {
							// Track edit phone number click
							trackEvent(
								'dtx_paid_landing_page_phone_number_edit_click',
								{
									url: window.location.href,
									phone_number: mobileNumber,
								},
							);
							onBack();
						}}
						className="ml-1 text-[#2563EB] hover:text-[#1D4ED8]">
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M11.3333 2.00001C11.5084 1.82494 11.7163 1.68605 11.9447 1.59129C12.1732 1.49653 12.4177 1.44772 12.6644 1.44772C12.9111 1.44772 13.1557 1.49653 13.3841 1.59129C13.6126 1.68605 13.8205 1.82494 13.9955 2.00001C14.1706 2.17508 14.3095 2.38297 14.4043 2.61141C14.499 2.83984 14.5478 3.08442 14.5478 3.33112C14.5478 3.57782 14.499 3.8224 14.4043 4.05083C14.3095 4.27927 14.1706 4.48716 13.9955 4.66223L5.33106 13.3267L1.33325 14.6667L2.67325 10.6688L11.3333 2.00001Z"
								stroke="currentColor"
								strokeWidth="1.33333"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex justify-center gap-4">
					{otp.map((digit, index) => (
						<div
							key={index}
							className={`flex h-[88px] w-[73px] items-center justify-center rounded-[1234px] bg-white ${
								activeIndexRef.current === index
									? 'ring-2 ring-[#2563EB]'
									: error
									? 'ring-2 ring-[#DA1E2E]'
									: digit
									? 'ring-1 ring-[#E5E7EB]'
									: 'bg-[#F8FAFB] ring-1 ring-[#E5E7EB]'
							}`}>
							<input
								ref={el => {
									if (el) inputRefs.current[index] = el;
								}}
								type="text"
								inputMode="numeric"
								value={digit}
								onChange={e => handleOtpChange(index, e)}
								onKeyDown={e => handleKeyDown(index, e)}
								onClick={() => focusInput(index)}
								maxLength={1}
								className="h-full w-full bg-transparent text-center text-[40px] leading-[56px] font-bold tracking-[-0.015em] text-[#252E49] outline-none"
							/>
						</div>
					))}
				</div>

				{error && (
					<p className="text-center text-[14px] leading-5 font-medium text-[#DA1E2E]">
						{error}
					</p>
				)}

				<div className="text-center">
					{isActive ? (
						<p className="text-[14px] leading-[16.8px] font-semibold tracking-[-0.002em] text-[#252E49]">
							Resend OTP in {Math.floor(seconds / 60)}:
							{(seconds % 60).toString().padStart(2, '0')}
						</p>
					) : (
						<p className="text-[14px] leading-[16.8px] font-semibold tracking-[-0.002em] text-[#252E49]">
							Didn't receive the OTP?{' '}
							<button
								onClick={handleResendOtp}
								className="font-bold text-[#2563EB]">
								Re-send
							</button>
						</p>
					)}
				</div>
			</div>

			<button
				onClick={() => handleVerifyOtp()}
				disabled={!otp.every(d => /^\d$/.test(d)) || isLoading}
				className={`relative flex h-14 w-full items-center justify-center rounded-full px-5 py-4 text-[18px] leading-[21.6px] font-bold text-white ${
					otp.every(d => /^\d$/.test(d)) && !isLoading
						? 'bg-[#2563EB]'
						: 'bg-[#DCE1E8]'
				}`}>
				{isLoading ? 'Verifying...' : 'Continue'}
			</button>
		</div>
	);
}
