interface SubmitButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	children: React.ReactNode;
}

export function SubmitButton({
	loading,
	children,
	disabled,
	className = '',
	...props
}: SubmitButtonProps) {
	return (
		<button
			type="button"
			disabled={disabled || loading}
			className={`w-full rounded-full !bg-[#2563EB] py-4 text-center text-[18px] font-semibold text-white transition-colors disabled:cursor-not-allowed ${className}`}
			{...props}>
			{loading ? (
				<div className="flex items-center justify-center">
					<div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
				</div>
			) : (
				children
			)}
		</button>
	);
}
