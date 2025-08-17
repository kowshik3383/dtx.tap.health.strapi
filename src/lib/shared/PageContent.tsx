import DynamicZoneManager from '@/components/manager';
import { components } from '@/types/strapi';

export default function PageContent({
	pageData,
}: {
	pageData: components['schemas']['Page'];
}) {
	const dynamicZone = pageData?.dynamic_zone;
	return (
		dynamicZone &&
		dynamicZone.length > 0 && (
			<DynamicZoneManager
				dynamicZone={dynamicZone}
				locale={pageData.locale ?? 'en'}
			/>
		)
	);
}
