/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SuccessOverlay } from './components';
import { PaymentSummaryItem } from './constants';
import { useSuccessPage } from './hooks/useSuccessPage';
import SuccessAnimation from './SuccessAnimation';

interface SuccessProps {
	subtitle?: string;
	paymentSummaryItems?: PaymentSummaryItem[];
	onDownload?: () => void;
	onAppStoreClick?: () => void;
	onPlayStoreClick?: () => void;
	showInvoiceDownload?: boolean;
}

export const Success: React.FC<SuccessProps> = ({
	subtitle = 'Your plan is now active',
	paymentSummaryItems = [],
	onDownload,
	onAppStoreClick,
	onPlayStoreClick,
	showInvoiceDownload = true,
}: SuccessProps) => {
	const {
		showOverlay,
		month,
		handleAnimationComplete,
		handleAppStoreClick,
		handlePlayStoreClick,
		handleDownloadClick,
	} = useSuccessPage({
		subtitle,
		onDownload,
		onAppStoreClick,
		onPlayStoreClick,
	});

	return (
		<div className="fixed inset-0 flex flex-col overflow-hidden">
			<div className="relative h-screen w-full">
				<SuccessAnimation
					subtitle={subtitle || ''}
					onAnimationComplete={handleAnimationComplete}
				/>
				<SuccessOverlay
					showOverlay={showOverlay}
					onAppStoreClick={handleAppStoreClick}
					onPlayStoreClick={handlePlayStoreClick}
					onDownloadClick={handleDownloadClick}
					paymentSummaryItems={paymentSummaryItems}
					showInvoiceDownload={showInvoiceDownload}
				/>
			</div>
		</div>
	);
};
