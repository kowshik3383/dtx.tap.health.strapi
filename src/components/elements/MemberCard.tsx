
import { Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface MemberCardProps {
	name: string;
	position: string;
	text: string;
	imgSrc: string | StaticImageData;
	linkedInLink: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
	name,
	position,
	text,
	imgSrc,
	linkedInLink,
}) => {
	return (
		<div className="flex min-h-[346px] min-w-[312px] flex-col rounded-[16px] bg-[#F2F5F9] px-[12px] py-[16px]">
			<div className="flex items-center justify-center text-center">
				<Image
					src={imgSrc}
					alt={`${name} - ${position}`}
					width={164}
					height={164}
					className="h-[164px] w-[164px]"
				/>

				<div className="-mb-28 -ml-12 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FFFFFF]">
					<a
						href={linkedInLink}
						target="_blank"
						rel="noopener noreferrer">
						<Image
							src="/assets/linkedin_logo.svg"
							alt="LinkedIn"
							width={22}
							height={22}
							className="h-[22px] w-[22px]"
						/>
					</a>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center">
				<Typography
					sx={{
						fontFamily: 'Urbanist',
						fontSize: '24px',
						fontWeight: 700,
						lineHeight: '28.8px',
						letterSpacing: '-0.004em',
						textAlign: 'left',
						textUnderlinePosition: 'from-font',
						textDecorationSkipInk: 'none',
						color: '#252E49',
						marginTop: '5px',
					}}>
					{name}
				</Typography>
				<Typography
					sx={{
						fontFamily: 'Urbanist',
						fontSize: '16px',
						fontWeight: 500,
						lineHeight: '19.2px',
						letterSpacing: '-0.004em',
						textAlign: 'center',
						textUnderlinePosition: 'from-font',
						textDecorationSkipInk: 'none',
						color: '#252E49',
					}}>
					{position}
				</Typography>
			</div>
			<div className="flex justify-center">
				<Typography
					sx={{
						fontFamily: 'Urbanist',
						fontSize: '14px',
						fontWeight: 400,
						lineHeight: '19.6px',
						textAlign: 'center',
						textUnderlinePosition: 'from-font',
						textDecorationSkipInk: 'none',
						color: '#3D4966',
						paddingRight: '2px',
						paddingLeft: '2px',
						marginTop: '12px',
						maxWidth: '284px',
					}}>
					{text}
				</Typography>
			</div>
		</div>
	);
};

export default MemberCard;
