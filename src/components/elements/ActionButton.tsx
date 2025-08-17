'use client';

import { Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';

interface ActionButtonProps {
	onClick: (e: React.MouseEvent) => void;
	id?: string;
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
	width?: string;
	backgroundColor?: string;
	hoverColor?: string;
	className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
	onClick,
	id = 'Action_Button',
	leftContent,
	rightContent,
	width = '92%',
	backgroundColor = '#2563EB',
	hoverColor = '#1E4DB7',
	className,
}) => {
	const pathname = usePathname();

	// If on /v3plans, force button width to 50%
	const computedWidth = pathname?.includes('/v3plans') ? '50%' : width;

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onClick?.(e);
	};

	return (
		<Button
			onClick={handleClick}
			id={id}
			className={className}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor,
				borderRadius: '28px',
				px: '24px',
				py: '12px',
				width: computedWidth,
				fontFamily: `'Urbanist', sans-serif`,
				boxSizing: 'border-box',
				position: 'relative',
				overflow: 'hidden',
				transition: 'background-color 0.2s ease-in-out',
				textTransform: 'none',

				'&::before': {
					content: '""',
					position: 'absolute',
					inset: 0,
					padding: '2px',
					borderRadius: 'inherit',
					background:
						'linear-gradient(106.38deg, rgba(234, 230, 223, 0.83) 3.07%, #FBBF24 39.93%)',
					WebkitMask:
						'linear-gradient(white, white) content-box, linear-gradient(white, white)',
					WebkitMaskComposite: 'destination-out',
					zIndex: 0,
				},

				'&:hover': {
					backgroundColor: hoverColor,
				},

				'&::after': {
					content: '""',
					position: 'absolute',
					top: '50%',
					left: '-40%',
					width: '150px',
					height: '58px',
					background: 'rgba(255, 255, 255, 0.4)',
					backdropFilter: 'blur(3px)',
					transform: 'translate(-50%, -50%) rotate(-63deg)',
					animation: 'moveShine 3s infinite linear',
					zIndex: 1,
				},

				'@keyframes moveShine': {
					'0%': { left: '-200%' },
					'100%': { left: '200%' },
				},
			}}>
			{leftContent}
			{rightContent}
		</Button>
	);
};

export const ArrowIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M5 12H19M19 12L12 5M19 12L12 19"
			stroke="white"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

export default ActionButton;
