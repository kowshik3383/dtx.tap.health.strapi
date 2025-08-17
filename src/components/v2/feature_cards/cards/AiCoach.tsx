'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const AiCoach = () => {
	const pathname = usePathname();
	const isV2 = pathname === '/v2plans';

	return (
		<div
			className={`mx-auto flex max-w-md flex-col gap-2 rounded-xl border border-neutral-200 ${
				isV2 ? 'bg-white' : 'bg-white/30'
			} p-2 shadow-sm`}>
			{' '}
			<div className="flex items-center gap-2">
				{/* Image Section */}
				<div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-md">
					<Image
						src="/assets/v2/aicoach.svg"
						alt="AI Coach"
						fill
						className="object-contain"
						sizes="(max-width: 768px) 180px"
						priority
					/>
				</div>

				{/* Text Section */}
				<div className="flex flex-col gap-2">
					<h3 className="font-['Urbanist'] text-base font-semibold text-neutral-800">
						24/7 AI coach
					</h3>
					<p className="text-xs leading-tight text-zinc-600">
						Your always-available support system
					</p>
				</div>
			</div>
		</div>
	);
};

export default AiCoach;
