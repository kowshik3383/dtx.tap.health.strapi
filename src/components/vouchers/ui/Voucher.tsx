'use client';

import { useState } from 'react';
import { HelpOverlay } from '@/components/elements/HelpOverlay';
import { BottomSheetContainer } from '@/components/layout/BottomSheetContainer';
import { OtpLoginModal } from '@/components/otp-login-modal';
import { ProcessingState } from './ProcessingState';
import { VoucherForm } from './VoucherForm';
import { VoucherHelp } from './VoucherHelp';
import { ErrorPopup } from '../../elements/ErrorPopup';
import { useVoucher } from '../hooks/useVoucher';

export function Voucher() {
	const [showHelp, setShowHelp] = useState(false);

	const {
		voucherCode,
		setVoucherCode,
		isModalOpen,
		setIsModalOpen,
		isLoading,
		errorMessage,
		isProcessing,
		showErrorPopup,
		errorPopupMessage,
		handleVoucherValidation,
		handleLoginSuccess,
	} = useVoucher();

	if (isProcessing) {
		return <ProcessingState />;
	}

	return (
		<>
			<ErrorPopup show={showErrorPopup} message={errorPopupMessage} />

			{showHelp && <HelpOverlay onClose={() => setShowHelp(false)} />}

			<BottomSheetContainer>
				{showHelp ? (
					<VoucherHelp onClose={() => setShowHelp(false)} />
				) : (
					<VoucherForm
						voucherCode={voucherCode}
						onVoucherChange={setVoucherCode}
						onSubmit={handleVoucherValidation}
						onHelpClick={() => setShowHelp(true)}
						isLoading={isLoading}
						errorMessage={errorMessage}
					/>
				)}
			</BottomSheetContainer>

			<OtpLoginModal
				open={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
				onLoginSuccess={handleLoginSuccess}
				isPartner={false}
				partnerCode={voucherCode}
				partnerName="Tap Health"
				price={0}
				planId=""
				isPromotional={false}
				promotionCode=""
			/>
		</>
	);
}
