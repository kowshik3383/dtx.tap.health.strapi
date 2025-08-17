'use client';
import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';
import DiabetesAdvice from './cards/DiabetesAdvice';
import GlucoseTracking from './cards/GlucoseTracking';
import MealPanner from './cards/MealPanner';
import PhotoLogging from './cards/PhotoLogging';
import PhotoLogging1 from './cards/PhotoLogging1';

interface DynamicZoneYourDayComponent {
	heading: string;
	logo: components['schemas']['DynamicZoneDailyHabitComponent']['logo'];
	logo_title1: string;
	logo_title2: string;
	logo_title3: string;
	diabeticadvice: components['schemas']['DynamicZoneDiabeticAdviceComponent'];
	glucose: components['schemas']['DynamicZoneGlucoseTrackingComponent'];
	mealplanner: components['schemas']['DynamicZoneMealPlannerComponent'];
	datalogging: components['schemas']['DynamicZoneDataLoggingComponent'];
	datalogging2: components['schemas']['DynamicZoneDataLogging1Component'];
}
const Diabetes = ({
	heading,
	logo,
	logo_title1,
	logo_title2,
	logo_title3,
	diabeticadvice,
	glucose,
	mealplanner,
	datalogging,
	datalogging2,
}: DynamicZoneYourDayComponent) => {
	return (
		<section className="font-urbanist flex flex-col items-center bg-sky-200 px-4 py-8 text-center">
			<h1 className="mb-2 text-[16px] font-bold text-slate-800 lg:text-lg">
				{heading}
			</h1>

			{/* Subheading */}
			<div className="mb-6 text-[24px] leading-tight font-semibold text-slate-800">
				{/* Only show this line when NOT v6, v7, v8 */}
				<div className="flex items-center justify-center gap-1">
					{logo && logo.url && (
						<div className="relative h-5 w-5">
							<Image
								src={logo.url || '/assets/v4/tlogo.svg'}
								alt="Tap Health Logo"
								fill
								className="object-contain"
							/>
						</div>
					)}

					<span className="-ml-2 font-extrabold">{logo_title1}</span>
					<span className="font-extrabold">{logo_title2}</span>
				</div>
				<div className="w-[312px] text-center text-[22px] font-extrabold text-slate-800">
					{logo_title3}
				</div>
			</div>

			{/* Cards */}
			<div className="w-full max-w-5xl gap-6 [&_*]:border-0 [&_*]:outline-none">
				<MealPanner {...mealplanner} />
				{datalogging2 && <PhotoLogging1 {...datalogging2} />}

				{datalogging && <PhotoLogging {...datalogging} />}
				<DiabetesAdvice {...diabeticadvice} />
				<GlucoseTracking {...glucose} />
			</div>
		</section>
	);
};

export default Diabetes;
