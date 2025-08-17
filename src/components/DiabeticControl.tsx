'use client';
import React from 'react';
import { components } from '@/types/strapi';
import DiabeticControlCard from './cards/DiabeticControlCard';

const DiabeticControl = ({
	title,description,diabetesControlCards
}: 
	 components['schemas']['DynamicZoneDiabetesControlComponent']
) =>{
	return (
		<>
		
				<h1 className="text-center text-3xl font-bold text-black whitespace-pre-line">
					{title}
				</h1>
			
			{description && (
				<p className="pb-5 text-center text-xl font-normal text-black">
					{description}
				</p>
			)}

			{diabetesControlCards?.map((card, index) => (
				<DiabeticControlCard key={index} {...card} />
			))}
		</>
	);
}

export default React.memo(DiabeticControl);