import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface HeaderContentProps {
	content?: string;
	rightArrowIcon?: string;
	backgroundColor?: string;
	remainDiv?: string;
	className?: string;
}

// import right_arrow_icon from "../assets/right_arrow_icon.svg";
const HeaderContent = ({
	content,
	rightArrowIcon,
	//   leftIcon,
	backgroundColor = '#FFFFFF',
	remainDiv,
	className,
}: HeaderContentProps) => {
	return (
		<div
			className={`flex w-[100%] items-center justify-between px-[15px] py-[20px] bg-[${backgroundColor}] ${className}`}>
			<div className="flex items-center justify-start gap-2 rounded-[16px]">
				<p className="text-sm font-semibold text-[#252E49]">
					{content}
				</p>
			</div>
			<div className="flex items-center justify-center">
				{remainDiv && (
					<div className="focus:shadow-outline rounded bg-[#D0E4FF] px-4 py-[6px] font-bold text-[#00349C] hover:bg-gray-200 focus:outline-none">
						<Typography
							sx={{
								fontFamily: 'Urbanist',
								fontSize: '12px',
								fontWeight: 600,
								lineHeight: '14.4px',
								letterSpacing: '-0.003em',
								textAlign: 'right',
								textUnderlinePosition: 'from-font',
								textDecorationSkipInk: 'none',
							}}>
							{remainDiv}
						</Typography>
					</div>
				)}
				<div className="flex items-center justify-center">
					{rightArrowIcon && (
						<Image
							src={rightArrowIcon}
							className="ml-5 h-[24px] w-[24px]"
							alt="right-arrow-icon"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default HeaderContent;
