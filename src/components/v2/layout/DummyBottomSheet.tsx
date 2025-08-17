'use client';

import { useState } from 'react';

const BottomSheetSection = () => {
	const [showTooltip, setShowTooltip] = useState(true);

	return (
		<div className="relative mx-auto mt-12 w-full max-w-xl rounded-2xl border border-gray-200 bg-[#2563EB] px-6 py-5 shadow-md">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
				{/* Price + Duration */}
				<div className="mb-4 text-left sm:mb-0">
					<p className="text-lg font-semibold text-white">₹1299</p>
					<div className="group relative flex items-center gap-1">
						<p className="text-sm text-[#9EA7B8]">for 3 months</p>

						{showTooltip && (
							<div className="absolute bottom-full left-1/2 z-10 mb-12 -translate-x-1/2">
								<div className="relative ml-20 w-[300px] rounded-xl bg-gray-800 px-4 py-3 text-sm text-white shadow-lg">
									<button
										className="absolute top-3 right-3 text-lg text-gray-300 hover:text-white"
										onClick={() => setShowTooltip(false)}>
										✕
									</button>
									<p className="pr-8 text-[11px] leading-relaxed">
										100% refund if you're not happy within
										14 days.
									</p>
								</div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 10 5"
									className="absolute top-full left-28 mt-[-1px] h-3 w-6 -translate-x-1/2">
									<path d="M0 0L5 5L10 0H0Z" fill="#374151" />
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Join Now Button */}
				<button
					onClick={() => alert('Join Now clicked!')}
					className="relative overflow-hidden rounded-full bg-white px-6 py-2 text-sm font-semibold text-black">
					<span className="relative z-10">Join Now</span>
					<span className="pointer-events-none absolute top-1/2 left-[-40%] h-[58px] w-[150px] -translate-x-1/2 -translate-y-1/2 rotate-[-63deg] animate-[moveShine_3s_linear_infinite] bg-white/40 backdrop-blur-sm"></span>
				</button>
			</div>
		</div>
	);
};

export default BottomSheetSection;
