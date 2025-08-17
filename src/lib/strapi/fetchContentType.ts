import { draftMode } from 'next/headers';
import createClient from 'openapi-fetch';
import qs from 'qs';
import { paths } from '@/types/strapi';

// Create base client with common configuration
const createBaseClient = async (
	queryParams: { status?: 'draft' | 'published' } = {},
	options: { preview?: boolean; tags?: string[] } = {},
) => {
	// Set default status to published
	let isDraftModeEnabled = false;
	// Check if we're in a build context

	
	const isBuildTime =
		process.env.NODE_ENV === 'production' &&
		process.env.NEXT_PHASE === 'build';

	// Only check draft mode if we're not in build time and preview is not explicitly set
	if (!isBuildTime && options.preview === undefined) {
		try {
			const draftModeData = await draftMode();
			isDraftModeEnabled = draftModeData.isEnabled;
		} catch {
			// Silently handle draft mode errors
			isDraftModeEnabled = false;
		}
	} else {
		// Use preview option if provided, otherwise default to false
		isDraftModeEnabled = options.preview ?? false;
	}

	// Set the content status
	queryParams.status = isDraftModeEnabled ? 'draft' : 'published';
	console.log(options.tags, 'options.tags');
	return createClient<paths>({
		baseUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api',
		headers: {
			Accept: 'application/json',
		},
		querySerializer(params) {
			const mergedParams = { ...params, ...queryParams };
			return qs.stringify(mergedParams, {
				encodeValuesOnly: true,
			});
		},
		fetch: (input: RequestInfo | URL, init?: RequestInit) => {
			return fetch(input, {
				...init,
				// cache: isDraftModeEnabled ? 'no-store' : 'force-cache',
				// next: isDraftModeEnabled ? undefined : { revalidate: 3600 },
				next: {
					tags: options?.tags ? [...options.tags || '','global-cache'] :['global-cache'],
				},
			});
		},
	});
};

// Export the function
export { createBaseClient };
