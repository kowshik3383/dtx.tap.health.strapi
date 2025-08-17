import { ChangeEvent } from 'react';

interface PhoneInputProps {
	value: string;
	onChange: (value: string) => void;
	isValid?: boolean;
	className?: string;
}

export function PhoneInput({
	value,
	onChange,
	isValid = true,
	className = '',
}: PhoneInputProps) {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '');
		if (value.length <= 10) {
			onChange(value);
		}
	};

	return (
		<div className="flex w-full items-center">
			<div className="rounded-l-[16px flex items-center bg-[#F8FAFB]">
				<div className="flex cursor-pointer items-center">
					<span className="text-[18px] font-bold text-[#2A2B33]">
						+91
					</span>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="ml-1">
						<path
							d="M5 7.5L10 12.5L15 7.5"
							stroke="#2A2B33"
							strokeWidth="1.67"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="ml-4 h-6 w-px bg-[#E5E7EB]" />
			</div>
			<input
				type="tel"
				value={value}
				onChange={handleChange}
				maxLength={10}
				placeholder="e.g. 98765 43210"
				className={`flex-1 rounded-r-[16px] bg-[#F8FAFB] pl-4 text-[18px] font-bold text-[#2A2B33] outline-none placeholder:text-[#6C727F] ${className}`}
				aria-invalid={!isValid}
			/>
		</div>
	);
}
