'use client';
import dynamic from 'next/dynamic';
import React, { ComponentType, FC, useState } from 'react';
import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';
interface DynamicZoneManagerProps {
	dynamicZone: NonNullable<components['schemas']['Page']['dynamic_zone']>;
	locale: string;
}
// const a: components['schemas']['DynamicZoneVideoplayerComponent'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMapping: Record<string, ComponentType<any>> = {
	// 'items.meal-plan': dynamic(() => import('@/components/FoodSlider'), {
	// 		ssr: false,
	// 	}),
	'dynamic-zone.hero1': dynamic(
		() => import('@/components/layout/HeroSecondary'),
		{
			ssr: true,
		},
	),
	'dynamic-zone.hero3': dynamic(
		() => import('@/components/layout/FewerMedsHero'),
		{
			ssr: true,
		},
	),
	'dynamic-zone.videoplayer': dynamic(
		() => import('@/components/elements/VideoPlayer'),
		{ ssr: false },
	),
	'dynamic-zone.trustedseal': dynamic(
		() => import('@/components/banners/TrustSealBanner'),
		{ ssr: true },
	),
	'dynamic-zone.diabetes-careapp': dynamic(
		() => import('@/components/DiabetesCareApp'),
		{ ssr: false },
	),
	'dynamic-zone.diabetes-control': dynamic(
		() => import('@/components/DiabeticControl'),
		{ ssr: false },
	),
	'dynamic-zone.expert': dynamic(
		() => import('@/components/experts/Expert'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.transformation-stories': dynamic(
		() => import('@/components/user-stories/UserStoriesSlider'),
		{ ssr: false },
	),
	'dynamic-zone.fast-result': dynamic(
		() => import('@/components/FastResult'),
		{ ssr: false },
	),
	'dynamic-zone.testimonials': dynamic(
		() => import('@/components/testimonials/TestimonialSlider'),
		{ ssr: false },
	),
	'dynamic-zone.features-promo': dynamic(
		() => import('@/components/elements/FeaturePromoCard'),
		{ ssr: false },
	),
	'dynamic-zone.faq': dynamic(() => import('@/components/Faq'), {
		ssr: false,
	}),
	'dynamic-zone.herov2': dynamic(() => import('@/components/v2/hero/Hero'), {
		ssr: false,
	}),
	'dynamic-zone.diabetologist': dynamic(
		() => import('@/components/v2/diabetologists/DiabetologistInsights'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.testimonial1': dynamic(
		() => import('@/components/v2/testimonials/Testimonial1'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.how-it-works': dynamic(
		() => import('@/components/v2/working/HowItWorks1'),
		{
			ssr: false,
		},
	),
	// 'dynamic-zone.pricing': dynamic(() => import('@/components/v2/pricing/Pricing'), {
	// 	ssr: false,
	// }),
	'dynamic-zone.hero-v5': dynamic(() => import('@/components/v4/hero/Hero'), {
		ssr: false,
	}),
	'dynamic-zone.app-rating': dynamic(
		() => import('@/components/v4/banner/AppRating'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.diabetes-simplefied': dynamic(
		() => import('@/components/v4/diabetes_simplified/DiabetesSimplified'),
		{ ssr: false },
	),
	'dynamic-zone.doctor-stories': dynamic(
		() => import('@/components/v4/user-stories/UserStoriesSlider'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.daily-habit': dynamic(
		() => import('@/components/v4/diabetes/Diabetes'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.your-day': dynamic(() => import('@/components/v4/YourDay'), {
		ssr: false,
		// loading: () => <YourDaySkeleton />,
	}),
	'dynamic-zone.user-testimonial': dynamic(
		() => import('@/components/v4/user-testionials/UserTestimonial'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.transform-plan': dynamic(
		() => import('@/components/v4/features/Features'),
		{ ssr: false },
	),
	'dynamic-zone.pricing-comparison': dynamic(
		() => import('@/components/v4/pricing/PricingComparison'),
		{ ssr: false },
	),
	'dynamic-zone.pricing': dynamic(
		() => import('@/components/v4/pricing/PricingSection'),
		{ ssr: false },
	),
	'dynamic-zone.what-you-get': dynamic(
		() => import('@/components/v2/feature_cards/FeatureCard1'),
		{ ssr: false },
	),
	'dynamic-zone.transform-video': dynamic(
		() => import('@/components/v2/DiabetesCareInsight'),
		{ ssr: false },
	),
	'dynamic-zone.pricing2': dynamic(
		() => import('@/components/v2/pricing/Pricing'),
		{ ssr: false },
	),
	'dynamic-zone.expert-carousel': dynamic(
		() => import('@/components/v2/Expert'),
		{ ssr: false },
	),
	'dynamic-zone.fast-result-v2': dynamic(
		() => import('@/components/v2/fast-results/FastResult1'),
		{ ssr: false },
	),
	'dynamic-zone.hero': dynamic(() => import('@/components/layout/Hero'), {
		ssr: false,
	}),
	'dynamic-zone.plan-card': dynamic(
		() => import('@/components/elements/PlanCard'),
		{
			ssr: false,
		},
	),
	'dynamic-zone.get-features': dynamic(
		() => import('@/components/elements/FeaturesSection'),
		{ ssr: false },
	),
	'dynamic-zone.footer1': dynamic(
		() => import('@/components/layout/Footer'),
		{ ssr: false },
	),
	'dynamic-zone.footer2': dynamic(
		() => import('@/components/v2/layout/Footer'),
		{ ssr: false },
	),
	'dynamic-zone.bottom-sheet': dynamic(
		() => import('@/components/elements/BottomSheet'),
		{ ssr: false },
	),
	'dynamic-zone.sinocare-bottom-sheet': dynamic(
		() => import('@/components/sinocare/SinocareBottomSheet'),
		{ ssr: false },
	),
	'dynamic-zone.v4-bottom-sheet': dynamic(
		() => import('@/components/v4/layout/BottomSheet'),
		{ ssr: false },
	),
	'dynamic-zone.v2-bottom-sheet': dynamic(
		() => import('@/components/v2/layout/BottomSheet'),
		{ ssr: false },
	),
	'dynamic-zone.features-card': dynamic(
		() => import('@/components/v2/feature_cards/FeatureCard'),
		{ ssr: false },
	),
	'dynamic-zone.whats-included': dynamic(
		() => import('@/components/v2/feature_cards/Whatsincluded'),
		{ ssr: false },
	),
	'dynamic-zone.navbarv2': dynamic(
		() => import('@/components/v2/layout/Navbar'),
		{ ssr: false },
	),
	'dynamic-zone.fa-result': dynamic(
		() => import('@/components/v2/fast-results/FaResult'),
		{ ssr: false },
	),
	'dynamic-zone.pricing-comparison2': dynamic(
		() => import('@/components/v4/pricing/V6PricingCard'),
		{ ssr: false },
	),
	'dynamic-zone.three-step-journey': dynamic(
		() => import('@/components/v4/ThreeStepJourney'),
		{ ssr: false },
	),
	'dynamic-zone.diabetescardui': dynamic(
		() => import('@/components/v4/DiabetesCardUI'),
		{ ssr: false },
	),
	'dynamic-zone.diabetesvideo': dynamic(
		() => import('@/components/v4/DiabetesVideos'),
		{ ssr: false },
	),
};

const DynamicZoneManager: FC<DynamicZoneManagerProps> = ({
	dynamicZone,
	locale,
}) => {
	console.log('DynamicZoneManager props:');
	const [selectedPlan, setSelectedPlan] = useState('Yearly');
	const [joinNowVisible, setJoinNowVisible] = useState(false);
	const trackBottomSheetClick = () => {
		trackEvent('dtx_paid_landing_page_join_now_click', {
			url: window.location.href,
			value: 30,
			currency: 'INR',
		});
		registerIntentEvent('Join Now Clicked');
	};
	return dynamicZone.map((componentData, index) => {
		const compData = componentData as { __component: string; id?: number };
		const Component =
			componentMapping[
				compData.__component.trim() as keyof typeof componentMapping
			];
		if (!Component) {
			console.warn(`No component found for: ${compData.__component}`);
			return null;
		}
		const uniqueKey = `${compData.__component ?? 'unknown'}-${
			compData.id ?? 'unknown'
		}-${index}`;
		return (
			<Component
				key={uniqueKey}
				{...componentData}
				locale={locale}
				isFirst={index === 0}
				selectedPlan={selectedPlan}
				setSelectedPlan={setSelectedPlan}
				setJoinNowVisible={setJoinNowVisible}
				hide={joinNowVisible}
				onBottomSheetClick={trackBottomSheetClick}
			/>
		);
	});
};

export default DynamicZoneManager;
