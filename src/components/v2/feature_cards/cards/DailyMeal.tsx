'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const DailyMeal = () => {
	const pathname = usePathname();
	const isV2Plans = pathname === '/v2plans';

	return (
		<div
			className={`mx-auto flex max-w-md flex-col gap-2 rounded-xl border border-neutral-200 ${
				isV2Plans ? 'bg-white' : 'bg-white/30'
			} p-2 shadow-sm`}>
			<div className="flex items-center gap-2">
				{/* Image Section */}
				<div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-md">
					<Image
						src="https://i.ibb.co/Df6YLDND/fdc1a875f2ad1f8e0dd0d0898bd7c852217e85c1-1.png"
						alt="Daily Meal"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 180px"
						priority
					/>

					{/* Badge */}
					<div className="absolute bottom-1 left-1 z-10 flex items-center gap-1 rounded-md bg-white/90 px-2 py-[2px] shadow backdrop-blur-sm">
						<div className="animate-spin-slow relative h-4 w-4">
							<Image
								src="/assets/v2/diet.svg"
								alt="Diet Icon"
								fill
								className="object-contain"
								sizes="16px"
							/>
						</div>
						<div className="leading-none">
							<p className="text-[7px] font-bold text-gray-900 uppercase">
								DIET PLAN
							</p>
							<p className="text-[6px] text-gray-500">
								Personalized for you
							</p>
						</div>
					</div>
				</div>

				{/* Text Section */}
				<div className="flex flex-col gap-2">
					<h3 className="font-['Urbanist'] text-base font-semibold text-neutral-800">
						Daily meal recommendations
					</h3>
					<p className="text-xs leading-tight text-zinc-600">
						Tailored to your lifestyle
					</p>
				</div>
			</div>

			<style jsx global>{`
				@keyframes spin-slow {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}
				.animate-spin-slow {
					animation: spin-slow 10s linear infinite;
				}
			`}</style>
		</div>
	);
};

export default DailyMeal;
