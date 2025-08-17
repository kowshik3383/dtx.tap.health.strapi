/* eslint-disable @typescript-eslint/no-explicit-any */

// ✅ Added Sentry import
import * as Sentry from '@sentry/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
	const rawBody = await req.text();
	const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
	const razorpaySignature = req.headers.get('x-razorpay-signature') || '';

	const expectedSignature = crypto
		.createHmac('sha256', secret)
		.update(rawBody)
		.digest('hex');

	if (razorpaySignature !== expectedSignature) {
		console.error(
			'Invalid signature:',
			razorpaySignature,
			expectedSignature,
		);

		// ✅ Capture invalid signature error
		Sentry.captureException(
			new Error('Invalid Razorpay webhook signature'),
			{
				tags: {
					scope: 'razorpay-webhook',
				},
				extra: {
					razorpaySignature,
					expectedSignature,
				},
			},
		);

		return NextResponse.json(
			{ error: 'Invalid signature' },
			{ status: 400 },
		);
	}

	const event = JSON.parse(rawBody) as any;
	if (event?.event === 'payment.captured') {
		const payment = event?.payload?.payment?.entity;
		const phone = (payment?.contact).replace('+91', '') || '';
		const email = payment?.email || '';
		// // Send to Interakt
		const date = new Date();
		const result = await fetch(
			'https://api.interakt.ai/v1/public/track/users/',
			{
				method: 'POST',
				headers: {
					Authorization: `Basic ${process.env.INTERAKT_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: `user_${phone}`,
					phoneNumber: phone,
					countryCode: '+91',
					source: 'razorpay',
					traits: {
						email,
					},
					tags: ['Deal Won'],
					createdAt: date.toISOString(),
				}),
			},
		);
		const red_data = (await result.json()) as {
			result: boolean;
			message?: string;
		};
		if (red_data?.result === true) {
			return NextResponse.json(
				{ message: 'Interakt script inserted successfully' },
				{ status: 200 },
			);
		} else {
			console.error(
				'Failed to insert Interakt script:',
				red_data?.message || 'Unknown error',
			);

			// ✅ Capture Interakt error
			Sentry.captureException(
				new Error('Interakt script insert failed'),
				{
					tags: {
						scope: 'interakt',
					},
					extra: {
						message: red_data?.message || 'Unknown error',
						phone,
						email,
					},
				},
			);
		}
	}
	console.log('Webhook event not captured:', event?.event);
	return NextResponse.json({ received: true }, { status: 200 });
}
