'use client';

import Image from 'next/image';
import { components } from '@/types/strapi';

const DiabetesAdvice = ({
	title,
	sub_title,
	bot,
	ai_message,
}: components['schemas']['DynamicZoneDiabeticAdviceComponent']) => {
	return (
		<div className="font-urbanist flex w-full flex-col gap-5 rounded-2xl bg-[linear-gradient(128.31deg,_#FFFFFF_14.41%,_#C4EDFD_120.26%)] px-5 py-6">
			{/* Heading */}
			<div className="flex w-full flex-col items-center gap-1 text-center">
				<h2 className="text-[20px] font-semibold text-black">
					{title}
				</h2>
				<p className="text-sm font-medium text-slate-500">
					{sub_title}
				</p>
			</div>

			{/* Message UI */}
			<div className="flex items-end gap-2">
				{/* Assistant Avatar */}
				{bot && bot.url && (
					<div className="relative h-10 w-10 shrink-0">
						<Image
							src="/assets/gif1.gif" // Replace with actual assistant face
							alt="Assistant Icon"
							fill
							className="rounded-full object-contain"
						/>
					</div>
				)}

				{/* Message Bubble */}
				<div className="relative max-w-[75%] rounded-2xl rounded-bl-sm bg-[#2058F5] px-4 py-3 text-left text-xs leading-snug font-medium text-white shadow-lg">
					{ai_message ||
						'Midnight cravings? Take a glass of warm milk! It’ll help you get a peaceful sleep and a full stomach.'}
					{/* Tail (the dot) */}
					<div className="absolute bottom-2 -left-1 h-2 w-2 rounded-full bg-[#2058F5]" />
				</div>
			</div>
		</div>
	);
};

export default DiabetesAdvice;
