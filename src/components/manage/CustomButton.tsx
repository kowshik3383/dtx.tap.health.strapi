import React from 'react';

interface CustomButtonProps {
	bgColor?: string;
	text?: string;
	link?: string;
	onClick?: () => void;
	className?: string;
	isVisible?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	bgColor = '#2563EB',
	text = 'Proceed To Buy',
	link,
	onClick,
	className,
	isVisible = true,
}) => {
	const handleClick = () => {
		onClick?.();
	};
	return (
		<div
			style={{ backgroundColor: bgColor }}
			className={`w-[95%] items-center justify-center rounded-[99px] px-[24px] py-[16px] text-center`}>
			<a href={link} title="link">
				<button
					className={`font-urbanist w-[100%] text-center text-[18px] leading-[21.6px] font-bold tracking-[-0.004em] ${className}`}
					style={{
						textUnderlinePosition: 'from-font',
						textDecorationSkipInk: 'none',
					}}
					onClick={handleClick}
					disabled={!isVisible}>
					{text}
				</button>
			</a>
		</div>
	);
};

export default CustomButton;
