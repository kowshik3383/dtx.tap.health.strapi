'use client';

import Navbar from '@/components/v2/layout/Navbar';
import { Voucher } from '@/components/vouchers';
import PageContent from '@/lib/shared/PageContent';
import { components } from '@/types/strapi';
import TrackLandingPageEvents from '../../TrackLandingPageEvents';
import ClickTracker from '../../v2/ClickTracker';
import ScrollTracker from '../../v2/ScrollTracker';

export default function HomeStrapi(props: components['schemas']['Page']) {
	const pageStyle = {
		v2: 'w-screen overflow-hidden scroll-smooth bg-white',
		v2ostrapi: 'w-screen overflow-hidden scroll-smooth bg-white',
		v3strapi: 'overflow-x-hidden bg-white',
		v4: 'w-screen overflow-hidden scroll-smooth',
		v5strapi: 'w-screen overflow-hidden scroll-smooth',
		v5: 'w-full overflow-x-hidden scroll-smooth bg-white',
	};

	const defaultClass =
		'relative overflow-x-hidden overflow-y-auto bg-white pb-[100px]';
	const page_class =
		pageStyle[props.slug as keyof typeof pageStyle] || defaultClass;

	return (
		<div className={page_class}>
			{/* ✅ Show navbar only for v2 */}
			{props.slug === 'v2' && <Navbar />}

			<PageContent pageData={props as components['schemas']['Page']} />

			<TrackLandingPageEvents />
			<ScrollTracker />
			<ClickTracker />

			{(props.slug === 'dtech24' || props.slug === 'dtech25') && (
				<Voucher />
			)}
		</div>
	);
}
