import * as Sentry from '@sentry/nextjs'; // ✅ Sentry import added

import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';
import { getLeadInformation, refreshAccessToken } from '@/utils/zoho';
interface ZohoLead2 {
	mobileNumber: string;
	tag: string;
	UTM_Campaign: string;
	UTM_Source: string;
	UTM_Medium: string;
	UTM_Id: string;
	UTM_Term: string;
	UTM_Content: string;
    slug:string;
}

export async function POST(req: NextRequest) {
	try {
		const rawBody = await req.json();
		const body = rawBody as ZohoLead2;
		const {
			mobileNumber,
			tag,
			UTM_Campaign,
			UTM_Source,
			UTM_Medium,
			UTM_Id,
			UTM_Term,
			UTM_Content,
            slug
		} = body;
		let access_token;
		const Initial_Referrer = UTM_Source === 'facebook' ? 'Facebook' : UTM_Source === 'google' ? 'Google' : 'Direct';
		try {
			//Attempt to fetch the access token from Redis
			// If it doesn't exist, refresh the access token
			// and store it in Redis for future use
			// This is to avoid hitting the Zoho API for every request
			const redis = await getRedisClient();
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
					} else {
						Sentry.captureException(
							new Error('Failed to refresh access token'),
						);
						console.error(
							'Failed to refresh access token:',
							refresh_res,
						);
						return NextResponse.json({
							success: false,
							message: 'Failed to refresh access token',
						});
					}
				}
			} catch (e) {
				Sentry.captureException(e);
				console.error('Error fetching access token from Redis:', e);
				return NextResponse.json({
					success: false,
					message: 'Failed to fetch access token',
				});
			}
			const leadExists = await getLeadInformation(
				mobileNumber,
				access_token,
			);
			if (leadExists.success && !leadExists.exists) {
				// Create the lead if it doesn't exist
				const res = await fetch(
					'https://www.zohoapis.in/crm/v8/Leads',
					{
						method: 'POST',
						headers: {
							Authorization: `Zoho-oauthtoken ${access_token}`,
						},
						body: JSON.stringify({
							data: [
								{
									Phone: `+91${mobileNumber}`,
									Last_Name: `Lead_91${mobileNumber}`,
									Lead_Stage: 'New Lead',
									Lead_Source: 'Landing Page',
									Status_Tags: ['OTP Verified', tag],
									UTM_Source,
									UTM_Campaign,
									UTM_Medium,
									UTM_Id,
                                    UTM_Term,
                                    UTM_Content,
									OTP_Verification: 'OTP Verified',
									Buy_Now: tag,
									Initial_Referring_Domain: slug,
									Initial_Referrer,
                                    Current_Url: slug,
								},
							],
						}),
					},
				);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const data = (await res.json()) as any;
				console.log(
					'Response status from SQL lead creation:',
					res.status,
				);
				const leadId = data?.data?.[0]?.details?.id;
				if (res.status === 201 && leadId) {
					const Phone = `91${mobileNumber}`;
					console.log(
						'setting leadId in redis for Phone',
						leadId,
						Phone,
					);
					const redis_status = await redis.set(`${Phone}`, leadId, {
						EX: 60 * 15,
					});
					console.log('Redis set status:', redis_status); // Set expiration to 15 minutes
					console.log('Lead ID stored in Redis:', leadId);
				}
				else{
					// await fallbackLeadCreation(JSON.stringify(body));
					Sentry.captureException(
						new Error('Failed to insert lead', data),
					);
					console.error('Error inserting lead:', data);
					return NextResponse.json({
						success: false,
						message: 'Failed to create lead',
					});
				}
			} else if (leadExists.exists) {
				const tags_ = leadExists.tags || [];
				const UTM = leadExists.UTM;
				const newUTM = {
					UTM_Source:
						UTM_Source !== '' && UTM_Source !== UTM?.UTM_Source
							? UTM_Source
							: UTM?.UTM_Source,
					UTM_Medium:
						UTM_Medium !== '' && UTM_Medium !== UTM?.UTM_Medium
							? UTM_Medium
							: UTM?.UTM_Medium,
					UTM_Id:
						UTM_Id !== '' && UTM_Id !== UTM?.UTM_Id
							? UTM_Id
							: UTM?.UTM_Id,
					UTM_Campaign:
						UTM_Campaign !== '' &&
						UTM_Campaign !== UTM?.UTM_Campaign
							? UTM_Campaign
							: UTM?.UTM_Campaign,
					UTM_Term:
						UTM_Term !== '' && UTM_Term !== UTM?.UTM_Term
							? UTM_Term
							: UTM?.UTM_Term,
					UTM_Content:
						UTM_Content !== '' && UTM_Content !== UTM?.UTM_Content
							? UTM_Content
							: UTM?.UTM_Content,
                    Current_Url: slug !== undefined && slug !== '' && slug !== leadExists.Current_Url ? slug : leadExists.Current_Url,
				};
				console.log('current page UTM', UTM_Source, UTM_Medium, UTM_Id);
				console.log('New utm:', newUTM);
				if (!tags_.includes(tag)) {
					tags_.push(tag);
				}
				const res = await fetch(
					'https://www.zohoapis.in/crm/v8/Leads',
					{
						method: 'PUT',
						headers: {
							Authorization: `Zoho-oauthtoken ${access_token}`,
						},
						body: JSON.stringify({
							data: [
								{
									id: leadExists.lead_id,
									Buy_Now: 'SQL',
									Status_Tags: tags_,
									...newUTM,
								},
							],
						}),
					},
				);
				console.log(
					'Response status from SQL lead creation for pre-existingusers:',
					res.status,
				);
			}
			return NextResponse.json({
				success: true,
				message: 'Lead already exists',
				tags: leadExists.tags || [],
			});
			// If the reponse code is not 'SUCCESS' or it hasnt been created successfully,
			// we will store the lead data in Redis for fallback processing which will be handled later
			// This is to avoid losing leads in case of API failures
		} catch (e) {
			Sentry.captureException(e);
			console.error('An error occurred in insertLead function:', e);
			return NextResponse.json({
				success: false,
				message: 'Failed to create lead',
			});
		}
	} catch (e) {
		Sentry.captureException(e);
		console.error('An error occurred in POST handler:', e);
		return NextResponse.json({
			success: false,
			message: 'Internal Server Error',
		});
	}
}
