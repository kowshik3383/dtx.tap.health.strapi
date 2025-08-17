/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface CustomTextAreaProps {
	placeholder?: string;
	rows?: number;
	cols?: number;
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
	error?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
	placeholder = 'Type your reason here...',
	rows = 5,
	cols = 50,
	value = '',
	onChange,
	className = '',
	error = '',
}) => {
	const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		// Auto-resize functionality
		event.target.style.height = 'auto';
		event.target.style.height = `${event.target.scrollHeight}px`;

		// Update the local value
		onChange?.(event);

		// Check if the input length is less than 30 characters
	};

	return (
		<div className="w-[95%]">
			<textarea
				placeholder={placeholder}
				rows={rows}
				cols={cols}
				onChange={handleInput}
				className={`w-full rounded-[16px] border bg-[#FFFFFF] p-4 text-black focus:ring-0 focus:outline-none ${className}`}
			/>
		</div>
	);
};

export default CustomTextArea;
