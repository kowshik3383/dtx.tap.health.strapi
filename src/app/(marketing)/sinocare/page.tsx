import HomeStrapi from '@/components/success/strapi/Homepage';
import { createBaseClient } from '@/lib/strapi/fetchContentType';
import { components } from '@/types/strapi';
export default async function Page() {
	const client = await createBaseClient();
	const pageData = await client.GET('/pages', {
		params: {
			query: {
				filters: {
					slug: ['sinocare'],
				},
			},
		},
	});
	return (
		<HomeStrapi
			{...(pageData?.data?.data?.[0] as components['schemas']['Page'])}
		/>
	);
}
