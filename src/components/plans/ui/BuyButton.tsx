'use client';

import { Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ActionButton, ArrowIcon } from '@/components/elements';

interface BuyButtonProps {
	month: number;
	price: number;
	text?: string;
	onClick: () => void;
	_planId?: string;
	_isPromotional?: boolean;
	_promotionalCode?: string;
}

const BuyButton = ({
	month,
	price,
	text = 'Buy plan',
	onClick,
	_planId = '',
	_isPromotional = false,
	_promotionalCode = '',
}: BuyButtonProps) => {
	const pathname = usePathname();
	const isV3Plans = pathname.includes('/v3plans');

	// Left content block — only show if NOT v3plans
	const leftContent = !isV3Plans ? (
		<div className="flex flex-col text-left">
			<Typography
				sx={{
					fontFamily: 'Urbanist',
					fontWeight: 700,
					fontSize: '18px',
					lineHeight: '21.6px',
					color: '#FFFFFF',
				}}>
				<span className="sm:text-[27px]">
					{price === 0 ? 'Free' : `₹${price}`}
				</span>
			</Typography>
			<Typography
				sx={{
					fontFamily: 'Urbanist',
					fontWeight: 500,
					fontSize: '14px',
					color: '#D1D5DB',
				}}>
				<span className="sm:text-[24px]">
					{month} {month === 1 ? 'month' : 'months'} plan
				</span>
			</Typography>
		</div>
	) : null;

	// Right content — adjust center for v3plans
	const rightContent = isV3Plans ? (
		<div className="flex items-center justify-center gap-2 w-full text-center">
			<Typography
				sx={{
					fontFamily: 'Urbanist',
					fontWeight: 700,
					fontSize: '16px',
					color: '#FFFFFF',
				}}>
				<span className="sm:text-[27px]">{text}</span>
			</Typography>
			<ArrowIcon />
		</div>
	) : (
		<div className="flex items-center gap-2">
			<Typography
				sx={{
					fontFamily: 'Urbanist',
					fontWeight: 700,
					fontSize: '16px',
					color: '#FFFFFF',
				}}>
				<span className="sm:text-[27px]">{text}</span>
			</Typography>
			<ArrowIcon />
		</div>
	);

	return (
		<ActionButton
			onClick={e => {
				e.preventDefault();
				onClick?.();
			}}
			id="Plan_Buy_Button"
			leftContent={leftContent}
			rightContent={rightContent}
		/>
	);
};

export default BuyButton;
