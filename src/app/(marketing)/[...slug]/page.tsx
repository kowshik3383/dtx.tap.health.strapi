import React from 'react';
import HomeStrapi from '@/components/strapi/Homepage';
import { createBaseClient } from '@/lib/strapi/fetchContentType';
import { fetchPages } from '@/lib/strapi/routes';
import { components } from '@/types/strapi';
type PageProps = {
	params: Promise<{
		locale: string;
		slug: string;
	}>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
	const pages = await fetchPages();
	console.log('generateStaticParams', pages);
	const sortedPages = pages.sort(
		(a, b) =>
			new Date(b.lastModified).getTime() -
			new Date(a.lastModified).getTime(),
	);
	return sortedPages?.map(p => ({
		slug: [p.slug],
	}));
}

export default async function Page({ params }: PageProps) {
	const { slug } = await params;
	console.log('slug page', slug);
	if (!slug || slug.length === 0) {
		console.error('No slug provided');
		return <div>Error: No slug provided</div>;
	}
	const client = await createBaseClient(
		{},
		{
			tags: [slug],
		},
	);

	const pageData = await client.GET('/pages', {
		params: {
			query: {
				filters: { slug: slug },
			},
		},
	});
	// console.log(
	// 	`pageData for slug ${slug}`,
	// 	pageData?.data?.data?.[0]?.dynamic_zone,
	// );
	return (
		<HomeStrapi
			{...(pageData?.data?.data?.[0] as components['schemas']['Page'])}
		/>
	);
}
