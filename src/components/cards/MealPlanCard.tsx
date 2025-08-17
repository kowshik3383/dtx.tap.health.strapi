import React from 'react';
import { components } from '@/types/strapi';
import FoodSlider from '../FoodSlider';
import Section from '../layout/Section';

const MealPlanCardTest = React.memo(({
	title,
	description,
	icon,
	upperSlider,
	lowerSlider,
}: components['schemas']['ItemsMealPlanComponent']) => {
	return (
			<Section
				title={title || 'Personalised Meal Plans'}
				description={
					description ||
					'Eat what you love, perfectly portioned for diabetes.'
				}
				icon={icon}>
				<FoodSlider
					upperSlider={upperSlider}
					lowerSlider={lowerSlider}
				/>
			</Section>
	);
});

export default MealPlanCardTest;
