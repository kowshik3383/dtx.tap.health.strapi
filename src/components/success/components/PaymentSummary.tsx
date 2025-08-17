import React from 'react';
import {
	PAYMENT_HEADING_STYLE,
	PAYMENT_SUMMARY_HEADING,
	PaymentSummaryItem,
} from '../constants';

interface PaymentSummaryProps {
	items: PaymentSummaryItem[];
	showInvoiceDownload?: boolean;
	onDownloadClick: () => void;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
	items,
	showInvoiceDownload = true,
	onDownloadClick,
}) => {
	if (items.length === 0) return null;

	return (
		<div className="mt-12 w-full">
			<h3
				className="mb-4 text-[22px] font-bold text-[#252E49]"
				style={PAYMENT_HEADING_STYLE}>
				{PAYMENT_SUMMARY_HEADING}
			</h3>
			<div className="w-full space-y-5 rounded-2xl border border-gray-200 p-6">
				{items.map((item, index) => (
					<div
						key={index}
						className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
						<span className="text-base font-medium text-[#475569] sm:w-1/3">
							{item.key}
						</span>
						<span className="text-sm font-semibold whitespace-pre-line text-[#252E49] sm:w-2/3 sm:text-base md:text-lg">
							{item.value}
						</span>
					</div>
				))}
			</div>

			{/* Download Invoice Link */}
			{showInvoiceDownload && (
				<button
					className="mx-auto mt-6 flex items-center justify-center gap-2 font-medium text-[#2563EB]"
					onClick={onDownloadClick}>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5"
							stroke="#2563EB"
							strokeWidth="1.67"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span className="text-base">Download Invoice</span>
				</button>
			)}
		</div>
	);
};
