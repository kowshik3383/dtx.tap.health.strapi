import * as Sentry from '@sentry/nextjs';
import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID!;
const FB_ACCESS_TOKEN = process.env.FACEBOOK_CAPI_ACCESS_TOKEN!;
const TEST_EVENT_CODE = process.env.FB_TEST_EVENT_CODE || 'TEST17154';
const FB_API_URL = `https://graph.facebook.com/v23.0/${FB_PIXEL_ID}/events`;

interface FacebookUserData {
	em?: string;
	ph?: string;
	client_ip_address?: string;
	client_user_agent?: string;
	[key: string]: string | undefined;
}

interface EventPayload {
	eventName: string;
	event_id?: string;
	event_time?: number;
	email?: string;
	phone?: string;
	properties?: Record<string, string | number | boolean>;
	user_data?: Record<string, string>;
}

interface FacebookEventPayload {
	data: Array<{
		event_name: string;
		event_time: number;
		event_id: string;
		action_source: 'website';
		event_source_url?: string;
		user_data: FacebookUserData;
		custom_data?: Record<string, string | number | boolean>;
	}>;
	test_event_code: string;
}

export async function POST(req: NextRequest) {
	if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
		const errorMessage = 'Missing FB Pixel credentials';
		Sentry.captureMessage(errorMessage, 'error');
		console.error(errorMessage);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}

	try {
		const body = (await req.json()) as EventPayload;
		const {
			eventName,
			event_id,
			event_time,
			email,
			phone,
			properties,
			user_data = {},
		} = body;

		if (!eventName) {
			const errorMessage = 'Missing "eventName"';
			Sentry.captureMessage(errorMessage, 'warning');
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const client_ip =
			req.headers.get('x-forwarded-for') ??
			req.headers.get('x-real-ip') ??
			'0.0.0.0';
		const user_agent = req.headers.get('user-agent') ?? '';
		const event_source_url = req.headers.get('referer') || '';

		const userDataPayload: FacebookUserData = {
			client_ip_address: client_ip,
			client_user_agent: user_agent,
			...user_data,
		};

		if (email) userDataPayload.em = email;
		if (phone) userDataPayload.ph = phone;

		const payload: FacebookEventPayload = {
			data: [
				{
					event_name: eventName,
					event_time: event_time ?? Math.floor(Date.now() / 1000),
					event_id: event_id ?? `evt_${Date.now()}`,
					action_source: 'website',
					event_source_url,
					user_data: userDataPayload,
					custom_data: properties,
				},
			],
			test_event_code: TEST_EVENT_CODE,
		};

		console.log(`Sending event: ${eventName}`);

		const fbRes = await axios.post(
			`${FB_API_URL}?access_token=${FB_ACCESS_TOKEN}`,
			payload,
		);

		console.log(`✅ Facebook CAPI Success: ${eventName}`);
		return NextResponse.json({ success: true, response: fbRes.data });
	} catch (error) {
		const err = error as AxiosError<{ error: unknown }>;
		const errMsg =
			err.response?.data?.error ?? err.message ?? 'Unknown error';

		Sentry.captureException(err, {
			tags: { feature: 'facebook-capi' },
			extra: {
				requestUrl: req.url,
				method: req.method,
				headers: Object.fromEntries(req.headers.entries()),
			},
		});

		console.error('Facebook CAPI Error:', errMsg);

		return NextResponse.json(
			{ error: 'Facebook CAPI failed', details: errMsg },
			{ status: 500 },
		);
	}
}
