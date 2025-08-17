export interface OtpLoginModalProps {
	open: boolean;
	handleClose: () => void;
	price?: number;
	planId?: string;
	onLoginSuccess?: (token: string) => void | Promise<void>;
	isPromotional?: boolean;
	promotionCode?: string;
	isPartner?: boolean;
	partnerCode?: string;
	partnerName?: string;
}

export interface OtpVerificationStepProps {
	mobileNumber: string;
	onBack: () => void;
	onLoginSuccess: (token: string) => void;
}

export interface PhoneInputProps {
	value: string;
	onChange: (value: string) => void;
	isValid: boolean;
	error?: string;
	className?: string;
}

export interface SubmitButtonProps {
	onClick: () => void;
	disabled?: boolean;
	loading?: boolean;
	children: React.ReactNode;
}
