'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const MedicationReminder = () => {
	const pathname = usePathname();
	const isV2Plans = pathname === '/v2plans';

	return (
		<div
			className={`mx-auto flex max-w-md flex-col gap-2 rounded-xl border border-neutral-200 p-2 shadow-sm ${
				isV2Plans ? 'bg-white' : 'bg-white/30'
			}`}>
			<div className="flex items-center gap-2">
				{/* Image Section */}
				<div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-md">
					<Image
						src="/assets/v2/medicine.svg"
						alt="Medication Reminder"
						fill
						className="object-cover"
						sizes="(max-width: 768px) 180px"
						priority
					/>
				</div>

				{/* Text Section */}
				<div className="flex flex-col gap-2 px-1">
					<h3 className="font-['Urbanist'] text-base font-semibold text-neutral-800">
						Smart Medication Reminders
					</h3>
					<p className="text-xs leading-none text-zinc-600">
						So that you never miss a dose
					</p>
				</div>
			</div>
		</div>
	);
};

export default MedicationReminder;
