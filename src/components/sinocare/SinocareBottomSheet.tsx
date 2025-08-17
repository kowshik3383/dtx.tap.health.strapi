import * as Sentry from '@sentry/nextjs'; // ✅ Import Sentry

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { useAuth } from '@/hooks/useAuth';
import { useSubscriptionStore } from '@/store';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';

const SinocareBottomSheet = ({
	price = '₹0',
	period = '3 Months',
	buttonText = 'Claim offer',
	partnerCode = 'SINOCARE_CGM',
}: components['schemas']['DynamicZoneSinocareBottomSheetComponent']) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const router = useRouter();
	const { login, isAuthenticated, token } = useAuth();

	// Get subscription store functions and state
	const { createTrialSubscription, subscribedUser } = useSubscriptionStore();

	const handleOpenModal = () => {
		// Track claim offer button click event
		trackEvent('sinocare_claim_offer_click', {
			url: window.location.href,
			partner: 'Sinocare',
		});

		// If user is already logged in, handle subscription directly
		if (isAuthenticated) {
			handleTrialSubscription();
			return;
		}

		// Otherwise, open the login modal
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleTrialSubscription = async () => {
		try {
			if (!token) {
				console.error('No authentication token found');
				Sentry.captureException(
					new Error('No authentication token found'),
					{
						tags: {
							scope: 'SinocareBottomSheet',
							action: 'handleTrialSubscription',
						},
					},
				);

				setIsModalOpen(true);
				return;
			}

			// Check if user is already subscribed
			if (subscribedUser) {
				router.push('/manage-subscription');
				return;
			}

			// Create a navigate function that conforms to NavigateFunction type
			const navigateFn = (
				path: string,
				_options?: { state?: unknown },
			) => {
				router.push(path);
			};

			// Create trial subscription
			await createTrialSubscription(
				token,
				navigateFn,
				partnerCode,
				'sinocare',
			);

			// Navigate to Sinocare-specific success page
			router.push('/sinocare/success');
		} catch (error) {
			console.error('Failed to create trial subscription:', error);
			Sentry.captureException(error, {
				tags: {
					scope: 'SinocareBottomSheet',
					action: 'handleTrialSubscription',
				},
			});
		}
	};

	const handleLoginSuccess = async (userToken: string) => {
		if (userToken) {
			login(userToken);
			// After login, directly pass the token rather than relying on state update
			try {
				// Check if user is already subscribed
				if (subscribedUser) {
					router.push('/manage-subscription');
					return;
				}

				// Create a navigate function that conforms to NavigateFunction type
				const navigateFn = (
					path: string,
					_options?: { state?: unknown },
				) => {
					router.push(path);
				};

				// Create trial subscription using the token we just received
				await createTrialSubscription(
					userToken,
					navigateFn,
					partnerCode,
					'sinocare',
				);

				// Navigate to Sinocare-specific success page
				router.push('/sinocare/success');
			} catch (error) {
				console.error('Failed to create trial subscription:', error);
				Sentry.captureException(error, {
					tags: {
						scope: 'SinocareBottomSheet',
						action: 'handleLoginSuccess',
					},
				});
			}
		}
	};

	return (
		<>
			<div className="fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-[430px]">
				<div className="mx-4 mb-4 rounded-2xl bg-[#2563EB] shadow-lg">
					{/* Main content */}
					<div className="flex w-full items-center justify-between p-4">
						{/* Price information */}
						<div className="flex flex-col">
							<span className="text-2xl font-bold text-white">
								{price}
							</span>
							<span className="text-sm text-white">{period}</span>
						</div>

						{/* CTA Button */}
						<button
							onClick={handleOpenModal}
							className="flex items-center gap-1 text-xl font-bold text-white">
							{buttonText} <ArrowRight size={26} />
						</button>
					</div>
				</div>

				<OtpLoginModal
					open={isModalOpen}
					handleClose={handleCloseModal}
					onLoginSuccess={handleLoginSuccess}
					isPartner={true}
					partnerName="Sinocare"
					price={0}
					planId=""
				/>
			</div>
		</>
	);
};

export default SinocareBottomSheet;
