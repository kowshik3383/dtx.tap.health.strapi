import * as Sentry from '@sentry/nextjs'; // ✅ Sentry import added
import { NextRequest, NextResponse } from 'next/server';
import { ZohoLead } from '@/components/otp-login-modal/ui/OtpVerificationStep';
import { getRedisClient } from '@/lib/redis';
import { getLeadInformation, refreshAccessToken } from '@/utils/zoho';
interface newTags_ {
	OTP_Verification: string;
	Buy_Now?: string;
}
export async function POST(req: NextRequest) {
	try {
		const rawBody = await req.json();
		const body = rawBody as ZohoLead;
		const {
			Phone,
			otp_flow,
			UTM_Source,
			UTM_Campaign,
			UTM_Medium,
			UTM_Id,
			UTM_Term,
			UTM_Content,
            slug,
            pathname
		} = body;
		const Initial_Referrer = UTM_Source === 'facebook' ? 'Facebook' : UTM_Source === 'google' ? 'Google' : 'Direct';
		const Status_Tags = ['OTP Verified'];
		const newTags: newTags_ = {
			OTP_Verification: 'OTP Verified',
			Buy_Now: '',
		};
		console.log('Received body:', body);
		if (otp_flow === 'v2flow') {
			Status_Tags.push('SQL');
			newTags.Buy_Now = 'SQL';
		}
		if (body.otp_flow) {
			delete body.otp_flow;
		} // Remove otp_flow from the body as it's not needed for Zoho API
		let access_token;
		console.log('new tags', newTags);
        const current_url = pathname.includes('plans')? slug : pathname;
		try {
			const redis = await getRedisClient();
			//Attempt to fetch the access token from Redis
			// If it doesn't exist, refresh the access token
			// and store it in Redis for future use
			// This is to avoid hitting the Zoho API for every request
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
				console.error('Error fetching access token from Redis:', e);
				return NextResponse.json({
					success: false,
					message: 'Failed to fetch access token',
				});
			}
			const leadExists = await getLeadInformation(Phone, access_token);
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
									Phone: `+91${Phone}`,
									Last_Name: `Lead_91${Phone}`,
									Lead_Stage: 'New Lead',
									Lead_Source: 'Landing Page',
									UTM_Source,
									UTM_Campaign,
									UTM_Medium,
									UTM_Id,
									Status_Tags,
									UTM_Term,
									UTM_Content,
                                    Initial_Referring_Domain: current_url,
                                    Current_Url:current_url,
									Initial_Referrer,
									...newTags,
								},
							],
						}),
					},
				);
				console.log('Zoho otp-verified status:', res.status);
				//eslint-disable-next-line @typescript-eslint/no-explicit-any
				const data = (await res.json()) as any;
				const leadId = data?.data?.[0]?.details?.id;
				if (res.status === 201 && leadId) {
					console.log(
						'setting leadId in redis for Phone',
						Phone,
						leadId,
					);
					await redis.set(`91${Phone}`, leadId, { EX: 60 * 15 }); // Set expiration to 15 minutes
					return NextResponse.json({
						success: true,
						message: 'Lead created successfully',
					});
				}
				if (res.status !== 201) {
					// await fallbackLeadCreation(JSON.stringify(body));
					Sentry.captureException(
						new Error(`Failed to insert lead ${Phone}`, data),
					);
					console.error('Error inserting lead:', Phone, data);
					return NextResponse.json({
						success: false,
						message: 'Failed to create lead',
					});
				}
			}
			return NextResponse.json({
				success: true,
				message: 'Lead already exists',
				tags: leadExists.tags || [],
			});
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
