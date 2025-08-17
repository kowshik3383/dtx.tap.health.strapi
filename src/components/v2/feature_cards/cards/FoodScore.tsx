'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const FoodScore = () => {
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
						src="/assets/v2/photologging.png"
						alt="Food Score"
						fill
						className="object-contain"
						sizes="(max-width: 768px) 180px"
						priority
					/>

					{/* Badge Box */}
					<div className="absolute bottom-1 left-1 z-10 flex h-[64px] w-[71px] flex-col items-center justify-between rounded-lg bg-white/90 p-1 shadow backdrop-blur-md">
						<p className="text-center text-[6px] leading-none font-bold tracking-wide text-gray-600 uppercase">
							MEAL SCORE
						</p>

						{/* Score Circle */}
						<div className="relative h-10 w-10">
							<svg
								className="h-10 w-10 -rotate-90"
								viewBox="0 0 48 48">
								<circle
									cx="24"
									cy="24"
									r="18"
									stroke="#e5e7eb"
									strokeWidth="3"
									fill="none"
								/>
								<circle
									cx="24"
									cy="24"
									r="18"
									stroke="#10b981"
									strokeWidth="3"
									fill="none"
									strokeDasharray={`${
										(7 / 10) * 113.1
									} 113.1`}
									strokeLinecap="round"
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-xs font-bold text-gray-900">
									7
								</span>
							</div>
							<div className="absolute -right-0.5 -bottom-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-yellow-400 text-[7px]">
								😊
							</div>
						</div>

						{/* Coach Line */}
						<div className="flex items-center space-x-1">
							<div className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500">
								<div className="h-1 w-1 rounded-full bg-white" />
								<div className="ml-0.5 h-0.5 w-0.5 rounded-full bg-white" />
							</div>
							<p className="text-[6px] leading-none font-medium text-gray-500">
								Coach says
							</p>
						</div>
					</div>
				</div>

				{/* Text Section */}
				<div className="flex flex-col gap-2 px-1">
					<h3 className="font-['Urbanist'] text-base font-semibold text-neutral-800">
						Instant food scoring
					</h3>
					<p className="text-xs leading-none text-zinc-600">
						To count your calories and make better choices
					</p>
				</div>
			</div>
		</div>
	);
};

export default FoodScore;
