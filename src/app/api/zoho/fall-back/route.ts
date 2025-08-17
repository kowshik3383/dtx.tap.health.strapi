import { NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';
import { getFallbackLeads, insertLead, refreshAccessToken } from '@/utils/zoho';
//This is a fallback route for Zoho lead creation
// It is used to handle cases where the lead creation fails due to API issues
//Will be triggered by a cron job to process leads stored in Redis periodically
export async function POST() {
	try {
		const failedLeads = await getFallbackLeads();
		const redis = await getRedisClient();
		let access_token;
		try {
			access_token = await redis.get('zoho_access_token');
			if (!access_token) {
				const refresh_res = await refreshAccessToken(
					process.env.ZOHO_CLIENT_ID || '',
					process.env.ZOHO_CLIENT_SECRET || '',
					process.env.ZOHO_REFRESH_TOKEN || '',
				);
				if (
					refresh_res.status === 'success' &&
					refresh_res.access_token
				) {
					access_token = refresh_res?.access_token; // Set expiration to 1 hour (3600 seconds)
				}
			}
		} catch (e) {
			console.error('Error fetching access token from Redis:', e);
			return NextResponse.json({
				success: false,
				message: 'Failed to fetch access token',
			});
		}
		await Promise.all(
			failedLeads?.map(async (lead: string) => {
				try {
					if (!access_token) {
						console.error(
							'Access token is not available, cannot process lead:',
							lead,
						);
						return;
					}
					const res = await insertLead(lead, access_token);
					if (res.success) {
						await redis.SREM('zoho_fallback_leads', lead);
					}
				} catch (e) {
					console.error(
						'An error occurred while processing lead:',
						e,
					);
					console.error('Failed lead data during fallback:', lead);
				}
			}),
		);
		return NextResponse.json({
			success: true,
			message: 'Fallback lead processing completed',
		});
	} catch (e) {
		console.error('An error occurred in the fallback route:', e);
		return NextResponse.json({
			success: false,
			message: 'Failed to process fallback lead creation',
		});
	}
}
