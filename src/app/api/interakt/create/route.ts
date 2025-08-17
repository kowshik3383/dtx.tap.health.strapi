import * as Sentry from '@sentry/nextjs'; // ✅ Sentry import added
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const data = (await request.json()) as {
			mobileNumber: string;
			tag: string;
		};
		const { mobileNumber, tag } = data;
		console.log('Received mobile number:', mobileNumber);
		// Here you can process the data as needed
		const res = await insertInteraktScript(mobileNumber, tag);
		if (!res.success) {
			return NextResponse.json({ error: res.message }, { status: 500 });
		}
		// Respond with a success message
		return NextResponse.json(
			{ message: 'Data received successfully' },
			{ status: 200 },
		);
	} catch (error) {
		Sentry.captureException(error); // ✅ Sentry error log added
		console.error('Error processing request:', error);
		return NextResponse.json(
			{ error: 'Failed to process request' },
			{ status: 500 },
		);
	}
}

async function insertInteraktScript(mobile: string, tag: string) {
	try {
		const API_KEY = process.env.INTERAKT_API_KEY;
		const date = new Date();
		const mno = mobile.replace('+91', '').replace(/\D/g, '');
		const res = await fetch(
			'https://api.interakt.ai/v1/public/track/users/',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${API_KEY}`,
				},
				body: JSON.stringify({
					userId: `user_${mno}`,
					phoneNumber: `${mno}`,
					countryCode: '91',
					Source: 'Landing Page',
					tags: [tag],
					createdAt: date.toISOString(),
				}),
			},
		);
		const data = (await res.json()) as {
			result: boolean;
			message?: string;
		};
		console.log('Interakt API response:', data);
		if (data?.result === true) {
			return {
				success: true,
				message: 'Interakt script inserted successfully',
			};
		}
		return {
			success: false,
			message: 'Failed to insert Interakt script',
		};
	} catch (error) {
		Sentry.captureException(error); // ✅ Sentry error log added
		console.error('Error inserting Interakt script:', error);
		return {
			success: false,
			message: 'Error inserting Interakt script',
		};
	}
}
