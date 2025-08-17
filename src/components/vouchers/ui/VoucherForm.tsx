import { trackEvent } from '@/utils/analytics';
import { VoucherInput } from './VoucherInput';
import { UI_TEXT } from '../constants';

interface VoucherFormProps {
	voucherCode: string;
	onVoucherChange: (value: string) => void;
	onSubmit: () => void;
	onHelpClick: () => void;
	isLoading: boolean;
	errorMessage?: string;
}

export function VoucherForm({
	voucherCode,
	onVoucherChange,
	onSubmit,
	onHelpClick,
	isLoading,
	errorMessage,
}: VoucherFormProps) {
	return (
		<>
			<div className="mb-2 flex items-center justify-between">
				<div className="text-sm text-gray-500">
					{UI_TEXT.VOUCHER_CODE}
				</div>
				<button
					onClick={() => {
						trackEvent('dtx_dtech_landing_page_find_code_click');
						onHelpClick();
					}}
					className="text-sm text-blue-600 hover:text-blue-700">
					{UI_TEXT.WHERE_TO_FIND}
				</button>
			</div>
			<div className="flex flex-col gap-3">
				<VoucherInput
					value={voucherCode}
					onChange={value => onVoucherChange(value.toUpperCase())}
					disabled={isLoading}
					error={errorMessage}
				/>

				<button
					className="flex items-center justify-between rounded-md bg-[#2563EB] px-6 py-4 text-white disabled:opacity-50"
					onClick={() => {
						trackEvent(
							'dtx_dtech_landing_page_activate_plan_click',
							{
								voucherCode: voucherCode.trim(),
							},
						);
						onSubmit();
					}}
					disabled={isLoading || !voucherCode.trim()}>
					<span className="text-lg font-bold">
						{isLoading ? 'Processing...' : UI_TEXT.ACTIVATE_PLAN}
					</span>
					<div className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</div>
				</button>
			</div>
		</>
	);
}
