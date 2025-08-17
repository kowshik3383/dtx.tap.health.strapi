// components/WhatYouGet.tsx
import { Check } from 'lucide-react';
import React, { FC } from 'react';

interface Feature {
	title: string;
	included: boolean;
}

interface FeaturesProps {
	featuresHeading?: string;
}

const Features: FC<FeaturesProps> = ({ featuresHeading = 'Features' }) => {
	const features: Feature[] = [
		{ title: 'Blood glucose logging', included: true },
		{ title: 'Smart medication reminders', included: true },
		{ title: 'Meal recommendations & plan', included: true },
		{ title: 'Instant meal insights', included: true },
		{ title: 'Log your meals with a photo', included: true },
		{ title: 'Easy, guided exercise routines', included: true },
		{ title: '24/7 access to your AI Health Coach', included: true },
	];

	return (
		<div className="mt-16 mb-6">
			<h3 className="font-urbanist px-6 text-base leading-5 font-extrabold text-[#252E49]">
				{featuresHeading}
			</h3>
			{features.map((feature, idx) => (
				<div
					key={idx}
					className="flex items-center justify-between px-6 py-4">
					<span className="font-urbanist text-sm leading-6 font-medium text-[#252E49]">
						{feature.title}
					</span>
					{feature.included && (
						<Check className="h-5 w-5 text-green-500" data-testid="included-icon" />
					)}
				</div>
			))}
		</div>
	);
};

const WhatYouGet: FC = () => {
	return (
		<div className="flex w-full flex-col gap-8 md:flex-row">
			{/* Left: Features */}
			<div className="flex-1">
				<Features featuresHeading="What you get" />
			</div>

			{/* Right: Cancel-anytime message */}
			{/* <div className="xs:max-w-[340px] flex flex-1 items-center pb-10 sm:max-w-[480px] sm:pb-20">
				<p className="font-urbanist mx-auto text-center text-lg leading-tight font-semibold text-[#5D6A85] sm:text-2xl">
					You're in control! Cancel your subscription anytime
				</p>
			</div> */}
		</div>
	);
};

export default WhatYouGet;
