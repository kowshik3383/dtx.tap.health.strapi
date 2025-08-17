'use client';
import dynamic from 'next/dynamic';
import { ComponentType, FC } from 'react';
import { components } from '@/types/strapi';

interface DynamicZoneManagerProps {
	dynamicZone: NonNullable<
		components['schemas']['DynamicZonePricing2Component']['dynamic_zone']
	>;
	locale: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMapping: Record<string, ComponentType<any>> = {
	'dynamic-zone.features-card': dynamic(
		() => import('@/components/v2/feature_cards/FeatureCard'),
		{ ssr: false },
	),
	'dynamic-zone.whats-included': dynamic(
		() => import('@/components/v2/feature_cards/Whatsincluded'),
		{ ssr: false },
	),
};
const PricingDynamicZoneManager: FC<DynamicZoneManagerProps> = ({
	dynamicZone,
	locale,
}) => {
	return dynamicZone.map((componentData, index) => {
		const Component =
			componentMapping[
				componentData.__component as keyof typeof componentMapping
			];
		if (!Component) {
			console.warn(
				`No component found for: ${componentData.__component}`,
			);
			return null;
		}
		const uniqueKey = `${componentData.__component}-${componentData.id}-${index}`;
		return (
			<Component
				key={uniqueKey}
				{...componentData}
				locale={locale}
				isFirst={index === 0}
			/>
		);
	});
};

export default PricingDynamicZoneManager;
