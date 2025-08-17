interface VoucherInputProps {
	value: string;
	onChange: (value: string) => void;
	disabled?: boolean;
	error?: string;
}

export function VoucherInput({
	value,
	onChange,
	disabled,
	error,
}: VoucherInputProps) {
	return (
		<div className="flex flex-col gap-1">
			<div
				className={`rounded-full border px-4 py-3 ${
					error ? 'border-red-500' : 'border-gray-200'
				} flex items-center`}>
				<input
					type="text"
					value={value}
					onChange={e => onChange(e.target.value)}
					className="w-full font-medium text-gray-800 outline-none"
					placeholder="Enter 8-digit voucher code"
					disabled={disabled}
				/>
				{error && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
							stroke="#DA1E2E"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</div>
			{error && <div className="pl-4 text-sm text-red-500">{error}</div>}
		</div>
	);
}
