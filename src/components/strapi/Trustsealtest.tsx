'use client';
import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';

export default function TrustSealTest({
	trusted_seals,
}: {
	trusted_seals: components['schemas']['SharedTrustedSealComponent'][];
}) {
	console.log('Trusted Seals:', trusted_seals);
	return (
		<div className="mx-3 mt-3 flex max-w-xl items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 px-8 font-bold shadow-sm lg:mx-auto">
			{trusted_seals?.map((seal, index) => {
				return (
					<div
						key={index}
						className="flex h-full flex-col items-center justify-between text-center">
						{seal.logo && seal.logo.url && (
							<Image
								src={seal.logo.url}
								alt={seal.logo.name || 'Seal Logo'}
								width={32}
								height={32}
							/>
						)}
						{seal.stars && seal.rating && (
							<div className="mt-1 flex text-yellow-400">
								{[...Array(seal.stars)].map((_, i) => (
									<span key={i}>★</span>
								))}
							</div>
						)}
						{seal.rating && seal.stars && (
							<p className="mt-1 text-sm text-gray-800">
								{seal.rating}
							</p>
						)}
						{seal.first_line_text && seal.second_line_text && (
							<p className="pt-4 text-sm text-gray-800">
								{seal.first_line_text}
								<br />
								{seal.second_line_text}
							</p>
						)}
					</div>
				);
			})}
		</div>
	);
}
