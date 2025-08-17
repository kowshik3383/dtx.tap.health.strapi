'use client';
// import dynamic from 'next/dynamic';
import { components } from '@/types/strapi';
// import PricingComparisonSkeleton from './PricingComparisonSkeleton';
// import PricingSectionSkeleton from './PricingSectionSkeleton';

// const PricingComparison = dynamic(
// 	() => import('@/components/v4/pricing/PricingComparison'),
// 	{
// 		ssr: false,
// 		loading: () => <PricingComparisonSkeleton />,
// 	},
// );

// const PricingSection = dynamic(
// 	() => import('@/components/v4/pricing/PricingSection'),
// 	{
// 		ssr: false,
// 		loading: () => <PricingSectionSkeleton />,
// 	},
// );
export default function PricingComparisonSection({
	// title,
	// primaryTitle,
}: components['schemas']['DynamicZonePricingComparisonComponent']) {
	return (
		<div
			className="w-full"
			style={{
				background:
					'linear-gradient(179.56deg, #2563EB 0.38%, #253D77 97.63%)',
			}}>
			{/* <PricingComparison {...{ title, primaryTitle }} /> */}
			{/* <PricingSection /> */}
		</div>
	);
}
       