import { components } from '@/types/strapi';
import { createBaseClient } from './fetchContentType';

export async function fetchPages() {
	const client = await createBaseClient();
	let allPages: components['schemas']['Page'][] = [];
	let currentPage = 1;
	let hasMorePages = true;

	while (hasMorePages) {
		const response = await client.GET('/pages', {
			params: {
				query: {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					//@ts-ignore
					pagination: { page: currentPage, pageSize: 25 },
				},
			},
		});

		const pages = response?.data?.data ?? [];
		const meta = response?.data?.meta?.pagination;

		if (!meta) break;

		allPages = [...allPages, ...pages];
		hasMorePages = currentPage < (meta.pageCount ?? 1);
		currentPage++;
	}
	console.log('Fetched pages:', allPages.length);
	return allPages.map(page => ({
		slug: page.slug,
		lastModified: page.publishedAt || new Date().toISOString(),
	}));
}