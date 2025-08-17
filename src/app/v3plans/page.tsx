'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import HeroSecondary from '@/components/layout/HeroSecondary';
import { PlansContainer2 } from '@/components/plans';
import Loading from '@/components/ui/Loading';
import FeatureCard from '@/components/v2/feature_cards/FeatureCard';
import { usePlansAuth } from '@/hooks/usePlansAuth';

const PlansPage = () => {
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const { isAuthenticated, token, isLoading, plansLoading, navigate } =
		usePlansAuth({
			redirectUnauthenticatedTo: '', // Empty string to allow unauthenticated users
			autoFetchPlans: true,
		});

	// Show loading state while checking authentication and loading plans
	if (isLoading) {
		return (
			<div className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-white pb-[100px]">
				<HeroSecondary
					titlePrimary="Pick your"
					titleSecondary="plan"
					description="Save on annual plans"
				/>
				<div className="container mx-auto mt-6 flex max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
					<div className="mb-4 h-16 w-16 animate-spin rounded-full border-t-3 border-b-3 border-blue-500"></div>
					<h3 className="mb-2 text-xl font-semibold text-gray-800">
						Just a moment...
					</h3>
					<p className="text-md max-w-md text-gray-600">
						We're preparing the best plans for you. This will only
						take a few seconds.
					</p>
				</div>
			</div>
		);
	}

	// Show processing payment state with Loading component
	if (isProcessingPayment) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<Loading
					isProcessing={true}
					processingText="We are processing"
					processingSubText="Please wait while we set up your subscription..."
				/>
			</div>
		);
	}

	return (
		<div className="relative overflow-x-hidden overflow-y-auto bg-gradient-to-b from-cyan-50 via-sky-100 to-purple-100 pb-[100px]">
			<div className="w-full bg-white px-6 py-3">
				<div className="h-6 w-[120px]">
					<Image
						src="/assets/logo.svg" // Replace with your logo path
						alt="tap.health"
						width={120}
						height={24}
						className="object-contain"
						priority
					/>
				</div>
			</div>

			{plansLoading ? (
				<div className="container mx-auto mt-6 max-w-3xl px-4">
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<div className="mb-4 h-14 w-14 animate-spin rounded-full border-t-3 border-b-3 border-blue-500"></div>
						<h3 className="mb-2 text-lg font-semibold text-gray-800">
							Loading your plans
						</h3>
						<p className="text-md max-w-md text-gray-600">
							We're getting everything ready for you. Please wait
							a moment.
						</p>
					</div>
				</div>
			) : (
				<>
					<PlansContainer2
						isAuthenticated={isAuthenticated}
						token={token}
						navigate={navigate}
						onPaymentInitiated={() => setIsProcessingPayment(true)}
						onPaymentCancelled={() => setIsProcessingPayment(false)}
					/>
					<FeatureCard />
				</>
			)}
		</div>
	);
};

export default PlansPage;
