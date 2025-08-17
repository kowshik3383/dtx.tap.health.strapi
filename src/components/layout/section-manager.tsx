'use client';
import dynamic from 'next/dynamic';
import { ComponentType, FC } from 'react';
import { components } from '@/types/strapi';

interface DynamicZoneManagerProps {
	dynamicZone: NonNullable<
		components['schemas']['DynamicZoneDiabetesCareappComponent']['dynamic_zone']
	>;
	locale: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMapping: Record<string, ComponentType<any>> = {
	'items.meal-plan': dynamic(
		() => import('@/components/cards/MealPlanCard'),
		{
			ssr: false,
		},
	),
	'items.photologging': dynamic(
		() => import('@/components/cards/DiabeticPhotoLogging'),
		{
			ssr: false,
		},
	),
	'items.glucose': dynamic(
		() => import('@/components/cards/DiabeticGlucoseLogging'),
		{
			ssr: false,
		},
	),
	'items.assistant': dynamic(
		() => import('@/components/cards/DiabetesAssistant'),
		{
			ssr: false,
		},
	),
	'items.exercise': dynamic(
		() => import('@/components/cards/DiabeticExercise'),
		{
			ssr: false,
		},
	),
};
const DiabeteCareAppDynamicZoneManager: FC<DynamicZoneManagerProps> = ({
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

export default DiabeteCareAppDynamicZoneManager;
