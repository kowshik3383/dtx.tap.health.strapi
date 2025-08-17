import Image from 'next/image';
import React from 'react';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';

export default function TrustSealBanner({
	trusted_seals,
}: {
	trusted_seals: components['schemas']['SharedTrustedSealComponent'][];
}) {
	return (
		<div className="mx-3 mt-3 mb-3 flex max-w-xl justify-between rounded-xl border border-gray-200 bg-white px-4 pt-3 font-bold shadow-sm lg:mx-auto">
			{trusted_seals?.map((seal, index) => (
				<div
					key={index}
					className="flex w-full flex-col items-center text-center">
					{/* Logo */}
					{seal.logo?.url && (
						<Image
							src={optimisedImageUrl(seal.logo)}
							alt={seal.logo.name || 'Seal Logo'}
							width={32}
							height={32}
							className="mb-1"
							priority
						/>
					)}

					{/* Stars */}
					{seal.stars && seal.rating && (
						<div className="flex text-xs leading-none text-yellow-400">
							{[...Array(seal.stars)].map((_, i) => (
								<span key={i}>★</span>
							))}
						</div>
					)}
					{/* Rating */}
					{seal.rating && seal.stars && (
						<p className="mt-1 text-[13px] font-bold text-gray-700">
							{seal.rating}
						</p>
					)}

					{/* Text */}
					<p className="mt-2 text-[13px] leading-tight text-gray-800">
						{seal.first_line_text ?? ''}
						<br />
						{seal.second_line_text ?? ''}
					</p>
				</div>
			))}
		</div>
	);
}
