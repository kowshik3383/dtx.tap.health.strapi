'use client';

import React from 'react';
import { Voucher } from '@/components/vouchers';
import PageContent from '@/lib/shared/PageContent';
import { components } from '@/types/strapi';
import TrackLandingPageEvents from '../TrackLandingPageEvents';
import ClickTracker from '../v2/ClickTracker';
import ScrollTracker from '../v2/ScrollTracker';

export default function HomeStrapi(props: components['schemas']['Page']) {
	const pageStyle = {
		v2: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v2o: 'w-screen overflow-x-hidden scroll-smooth bg-white',
		v3: 'w-screen overflow-x-hidden scroll-smooth bg-white',
		v4: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v5: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v2o1: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v2o2: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v2o3: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v2o4: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v6: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v7: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',
		v8: 'w-screen overflow-hidden overflow-x-hidden scroll-smooth',



	};

	const defaultClass =
		'relative overflow-x-hidden overflow-y-auto bg-white pb-[100px]';

	const page_class =
		pageStyle[props.slug as keyof typeof pageStyle] || defaultClass;
	const isVersion = pageStyle.hasOwnProperty(props.slug);
	const fullscreenClass = isVersion ? 'w-screen' : 'w-full max-w-screen-xl';
	return (
		<div className={page_class}>
			{/* ✅ Outer container with responsive max width */}
			<div className={`mx-auto ${fullscreenClass}`}>
				{/* ✅ Dynamic content rendering */}
				<PageContent
					pageData={props as components['schemas']['Page']}
				/>
			</div>

			{/* ✅ Tracking utilities */}
			<TrackLandingPageEvents />
			<ScrollTracker />
			<ClickTracker />

			{/* ✅ Conditionally show Voucher */}
			{['dtech24', 'dtech25'].includes(props.slug) && <Voucher />}
		</div>
	);
}
