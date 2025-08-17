'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { components } from '@/types/strapi';
import { diabetesCards } from './data';

export default function DiabetesSimplified({
	title,
	highlighted_title,
	feature_cards,
}: components['schemas']['DynamicZoneDiabetesSimplefiedComponent']) {
	const cardsdata = feature_cards?.map((card, ind) => {
		return {
			image:
				card.featurecard?.image?.url || diabetesCards[ind]?.icon || '',
			iconAlt: card.featurecard?.image?.name || 'alternative icon',
			overlayText:
				card.featurecard?.title || diabetesCards[ind]?.overlayText || '',
			overlaySubText:
				card.featurecard?.description ||
				diabetesCards[ind]?.overlaySubText ||
				'',
			bottomText:
				card.description || card.highlighted_description
					? [card.description, card.highlighted_description]
					: diabetesCards[ind]?.bottomText || [],
			video:diabetesCards[ind]?.videoSrc || '',
		};
	});

	const pathname = usePathname();
	const isV6 = pathname.includes('/v6');

	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 text-black">
			{/* Header */}
			<div className="mt-7 mb-1 w-full max-w-sm text-center text-sm font-semibold text-slate-800">
				{title || 'Managing blood sugar is complicated'}
			</div>
			<div className="mb-12 w-full max-w-xs text-center text-2xl font-extrabold text-blue-600">
				{highlighted_title || 'Tap Health Simplifies Diabetes For You'}
			</div>

			{/* Cards */}
			<div className="flex flex-col items-center gap-16">
				{cardsdata?.map((card, i) =>
					isV6 ? (
						<div key={i} className="relative h-72 w-72">
							{/* Bottom blue gradient */}
							<div className="absolute top-[161px] left-0 h-32 w-72 rounded-xl bg-gradient-to-b from-blue-200 to-sky-100" />

							{/* Middle faded gradient border box */}
							<div className="absolute top-[148px] left-0 h-20 w-72 rounded-xl border-2 border-[#D0E4FF] bg-white" />

							{/* Image or Video section */}
							<div className="absolute top-0 left-[20px] h-44 w-60 overflow-hidden rounded-[20px]">
								{card.video && card.video !== '' ? (
									<video
										src={card.video}
										autoPlay
										loop
										muted
										playsInline
										className="h-full w-full rounded-[20px] object-cover"
									/>
								) : (
									<Image
										src={card.image}
										alt={card.iconAlt}
										fill
										className="absolute top-[-1px] left-[-18px] h-44 w-72 object-cover"
									/>
								)}
							</div>

							{/* Middle overlay text */}
							<div className="font-urbanist absolute top-[192px] left-[10px] flex gap-x-1 text-base leading-normal text-slate-800">
								<span className="font-bold">
									{card.overlayText}
								</span>
								<span className="font-normal">
									{card.overlaySubText}
								</span>
							</div>

							{/* Bottom text */}
							<div className="font-urbanist absolute top-[240px] left-[19px] w-60 justify-center text-center text-base leading-snug text-slate-800">
								{card.bottomText.map((t, idx) => (
									<span
										key={idx}
										className={
											idx === 1
												? 'font-bold'
												: 'font-normal'
										}>
										{t}
									</span>
								))}
							</div>
						</div>
					) : (
						<div
							key={i}
							className="relative h-44 w-84 flex-shrink-0 rounded-xl">
							{/* Gradient background */}
							<div className="absolute inset-x-0 top-10 h-32 rounded-xl bg-gradient-to-b from-blue-200 to-sky-100" />

							{/* Overlay gradient border */}
							<div
								className="absolute inset-x-0 top-3.5 h-20 rounded-xl border-2 border-blue-100"
								style={{
									background:
										'linear-gradient(180deg, #D0E4FF -55.42%, #FFFFFF 31.37%, #FFFFFF 82.38%, #D0E4FF 165.66%)',
								}}
							/>

						{/* Icon */}
						<div className="absolute top-0 left-0 z-10 h-24 w-24 overflow-hidden rounded-xl">
							<Image
								src={card.image}
								alt={card.iconAlt}
								fill
								className="absolute -top-px -left-7 h-28 w-40 object-cover"
							/>
						</div>

							{/* Overlay Text */}
							<div
								className={`font-urbanist absolute top-8 left-1/2 flex w-44 -translate-x-1/2 flex-col items-center text-center ${
									i !== 0 ? 'ml-4' : ''
								}`}>
								<span className="text-base leading-normal font-bold text-black">
									{card.overlayText}
								</span>
								<span className="text-base leading-normal font-normal text-black">
									{card.overlaySubText}
								</span>
							</div>

							{/* Bottom Text */}
							<div className="font-urbanist absolute bottom-4 left-1/2 w-60 -translate-x-1/2 text-center text-base leading-normal text-black">
								{card.bottomText.map((t, idx) => (
									<span
										key={idx}
										className={
											idx === 1 ? 'font-bold' : ''
										}>
										{t}
									</span>
								))}
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
}
