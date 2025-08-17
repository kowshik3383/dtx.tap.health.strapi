import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface VoucherHelpProps {
	onClose: () => void;
}

export function VoucherHelp({ onClose }: VoucherHelpProps) {
	return (
		<>
			<div className="mb-4 flex items-center gap-2">
				<button
					onClick={onClose}
					className="flex items-center text-gray-600 hover:text-gray-800">
					<ArrowLeft size={20} />
					<span className="ml-1">Back</span>
				</button>
			</div>
			<div className="flex flex-col gap-4">
				<h3 className="font-urbanist text-[18px] leading-[28px] font-bold text-gray-900">
					Where to find your voucher code
				</h3>
				<div className="text-gray-600">
					<p>On your voucher, find this 8-digit code and enter it.</p>
					<Image
						src="/assets/vocuher-helper.png"
						alt="Voucher code location"
						width={500}
						height={280}
						priority
						className="mt-6 h-auto w-full"
						quality={100}
					/>
				</div>
				<button
					className="flex w-full items-center justify-center rounded-md bg-[#2563EB] px-6 py-4 text-white"
					onClick={onClose}>
					<span className="text-lg font-bold">Got it</span>
				</button>
			</div>
		</>
	);
}
