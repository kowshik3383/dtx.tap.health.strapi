import * as Sentry from '@sentry/nextjs'; // ✅ Sentry import added
import { getRedisClient } from '../lib/redis';
interface ZohoRefreshAccessTokenResponse {
	access_token?: string;
	scope?: string;
	api_domain?: string;
	token_type?: string;
	expires_in?: number | string;
}

//this is used to generate the access and refresh tokens from the authorization code one time only
export async function generateTokens(
	client_id: string,
	client_secret: string,
	code: string,
) {
	try {
		const res = await fetch('https://accounts.zoho.in/oauth/v2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				client_id: client_id,
				client_secret: client_secret,
				code: code,
			}),
		});
		const data = await res.json();
		console.log(data);
	} catch (e) {
		console.error('An error occurred in generateToken function:', e);
	}
}

export async function refreshAccessToken(
	client_id: string,
	client_secret: string,
	refresh_token: string,
) {
	try {
		const res = await fetch('https://accounts.zoho.in/oauth/v2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				client_id,
				client_secret,
				refresh_token,
			}),
		});
		const data = (await res.json()) as ZohoRefreshAccessTokenResponse;
		if (data?.access_token) {
			// Store the new access token in Redis or your preferred storage
			const redis = await getRedisClient();
			await redis.set('zoho_access_token', data.access_token, {
				EX: 3300,
			}); // Set expiration to 55 minutes (3300 seconds)
			console.log('Access token refreshed and stored successfully');
			return { status: 'success', access_token: data.access_token };
		}
		return { status: 'error', message: 'Failed to refresh access token' };
	} catch (e) {
		Sentry.captureException(e); // ✅ Sentry error log added
		console.error('An error occurred in refreshToken function:', e);
		return { status: 'error', message: 'Failed to refresh access token' };
	}
}

//stores the failed lead creation object in Redis
export async function fallbackLeadCreation(lead: string) {
	try {
		const redis = await getRedisClient();
		const leadData = lead;
		const arr = await redis.sAdd('zoho_fallback_leads', leadData);
		await redis.expire('zoho_fallback_leads', 60 * 60); // Set expiration to 24 hours
		if (arr >= 0) {
			console.log('Lead data stored in Redis successfully');
			return {
				status: true,
				message: 'Lead data stored into Redis successfully',
			};
		}
	} catch (e) {
		console.error('An error occurred in fallbackLeadCreation function:', e);
		return { status: 'error', message: 'Failed to create lead' };
	}
}

export async function getFallbackLeads() {
	try {
		const redis = await getRedisClient();
		const leads = await redis.sMembers('zoho_fallback_leads');
		return leads;
	} catch (e) {
		console.error('An error occurred in getFallbackLeads function:', e);
		return [];
	}
}

export async function insertLead(lead: string, access_token: string) {
	try {
		const res = await fetch('https://www.zohoapis.in/crm/v2/Leads', {
			method: 'POST',
			headers: {
				Authorization: `Zoho-oauthtoken ${access_token}`,
			},
			body: JSON.stringify({
				data: [JSON.parse(lead)],
			}),
		});
		const data = await res.json();
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (data?.data?.[0].code !== 'DUPLICATE_DATA' && data?.data?.[0].code !== 'SUCCESS') {
			await fallbackLeadCreation(lead);
			console.error('Error inserting lead:', data);
			return {
				success: false,
				message: 'Failed to create lead fallback activated',
			};
		} else {
			return { success: true, message: 'Lead created' };
		}
	} catch (e) {
		console.error('An error occurred in insertLead function:', e);
		return { status: false, message: 'Failed to create lead' };
	}
}

export async function getLeadInformation(phone: string, access_token: string) {
	try {
		const redis_res = await getLeadInfoFromRedis(phone, access_token);
		if (redis_res?.success && redis_res?.lead_id) {
			return {
				success: true,
				exists: true,
				tags: redis_res.tags,
				lead_id: redis_res.lead_id,
			};
		}
		const phone_ = `+91${phone}`;
		const res = await fetch(
			`https://www.zohoapis.in/crm/v8/Leads/search?phone=${encodeURIComponent(
				phone_,
			)}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Zoho-oauthtoken ${access_token}`,
				},
			},
		);
		console.log('Response status from getLeadInformation:', res.status);
		if (res.status !== 200) {
			console.log('No lead found for phone:', phone);
			return { success: true, exists: false };
		}
		console.log('Lead found for phone:', phone);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const data = (await res.json()) as any;
		const lead_data = data?.data?.[0] || [];
		const lead_id = lead_data?.id || '';
		const tags = lead_data?.Status_Tags || [];
		const Current_Url = lead_data?.Current_Url || '';
		const UTM = {
			UTM_Source: lead_data?.UTM_Source || '',
			UTM_Medium: lead_data?.UTM_Medium || '',
			UTM_Id: lead_data?.UTM_Id || '',
			UTM_Campaign: lead_data?.UTM_Campaign || '',
			UTM_Term: lead_data?.UTM_Term || '',
			UTM_Content: lead_data?.UTM_Content || '',
		};
		return { success: true, exists: true, tags, lead_id, UTM, Current_Url };
	} catch (e) {
		Sentry.captureException(e); // ✅ Sentry error log added
		console.error('An error occurred in getLeadInformation function:', e);
		return { success: false, exists: false };
	}
}

async function getLeadInfoFromRedis(phone: string, access_token: string) {
	try {
		const redis = await getRedisClient();
		const leadId = await redis.get(`91${phone}`);
		if (leadId) {
			const res = await fetch(
				`https://www.zohoapis.in/crm/v2/Leads/${leadId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Zoho-oauthtoken ${access_token}`,
					},
				},
			);
			console.log('Response status from Redis leadId check:', res.status);
			if (res.status === 200) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const data = (await res.json()) as any;
				if (data?.data?.[0]?.id) {
					return {
						success: true,
						lead_id: data.data[0].id,
						tags: data.data[0].Status_Tags || [],
					};
				} else {
					console.error('Lead ID not found in response:', data);
					return {
						success: false,
						message: 'Lead ID not found in response',
					};
				}
			}
		} else {
			return { success: false, message: 'Lead ID not found in Redis' };
		}
	} catch (e) {
		Sentry.captureException(e); // ✅ Sentry error log added
		console.error('An error occurred in getLeadIdFromRedis function:', e);
		return {
			success: false,
			message: 'Failed to fetch lead ID from Redis',
		};
	}
}
