'use client';

import { useEffect, useState } from 'react';

type PlanCardProps = {
	id?: string;
	month: number;
	actualPrice: number;
	discountedPrice: number;
	isSelected: boolean;
	offerName?: string | null;
	onClick: () => void;
	description: string;
};

const PlanCard2 = ({
	month,
	actualPrice,
	discountedPrice,
	isSelected,
	offerName,
	description,
	onClick,
}: PlanCardProps) => {
	const [isSmallDevice, setIsSmallDevice] = useState(false);

	useEffect(() => {
		const checkWidth = () => {
			setIsSmallDevice(window.innerWidth < 365);
		};
		checkWidth();
		window.addEventListener('resize', checkWidth);
		return () => window.removeEventListener('resize', checkWidth);
	}, []);

	const savePercentage = Math.ceil(
		((actualPrice - discountedPrice) / actualPrice) * 100
	);
	const pricePerMonth = Math.ceil(discountedPrice / month);
	const hasSavings = savePercentage > 0 && actualPrice !== discountedPrice;

	const getPlanTitle = (m: number) => {
		if (m === 3) return 'Quarterly';
		if (m === 6) return 'Half-Yearly';
		if (m === 12) return 'Yearly';
		return `${m} Month`;
	};

	const dp = discountedPrice;
	const customSaveText =
		dp === 2399 ? 'Save 54%' : dp === 1999 ? 'Save 23%' : null;

	return (
		<div
			className={`relative mx-1 mb-[32px] flex h-36 cursor-pointer flex-col items-start justify-between rounded-xl py-5 pl-2 transition-all duration-300 ${
				isSelected
					? 'z-10 scale-105 bg-[radial-gradient(ellipse_100.04%_88.98%_at_94.32%_100.00%,_#2563EB_0%,_#03369C_100%)] text-white shadow-lg'
					: 'border border-gray-200 bg-white text-gray-800 hover:bg-gray-100'
			}`}
			style={{
				width: isSmallDevice ? '110px' : '119px', // w-80px for small devices, otherwise 119px
				paddingLeft: isSmallDevice ? '4px' : '16px', // px-1 for small devices, px-4 for others
				paddingRight: isSmallDevice ? '4px' : '16px',
				borderRadius: '18px',
				borderWidth: isSelected ? '2px' : '1px',
				borderColor: isSelected ? '#2563EB' : '#DCE1E8',
				boxShadow: isSelected
					? '0 10px 20px rgba(37, 99, 235, 0.3)'
					: '',
			}}
			onClick={onClick}
		>
			{/* Top Badge */}
			{discountedPrice === 2399 && (
				<div
					className={`absolute -top-4 left-0 w-full rounded-t-xl py-2 text-center text-xs font-bold text-white ${
						isSelected ? 'bg-[#2563EB]' : 'bg-gray-400'
					}`}
				>
					RECOMMENDED
				</div>
			)}

			{/* Plan Title */}
			<div className="mb-2 flex min-h-[24px] w-full items-center justify-between text-[13px] font-bold whitespace-nowrap">
				<p className={`${isSelected ? 'text-white' : 'text-gray-800'}`}>
					{getPlanTitle(month)}
				</p>
				{isSelected && (
					<svg
						width="18"
						height="18"
						viewBox="0 0 19 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="text-blue-200"
					>
						<path
							d="M9.51318 0.5C14.4837 0.5 18.5132 4.52944 18.5132 9.5C18.5132 14.4706 14.4837 18.5 9.51318 18.5C4.54262 18.5 0.513184 14.4706 0.513184 9.5C0.513184 4.52944 4.54262 0.5 9.51318 0.5ZM8.4458 11.0176L6.22021 8.79297L4.80615 10.207L8.58057 13.9814L9.28174 13.1406L14.2817 7.14062L12.7446 5.85938L8.4458 11.0176Z"
							fill="#EDF5FF"
						/>
					</svg>
				)}
			</div>

			{/* Save Label */}
			{customSaveText && (
				<p
					className={`mb-1 inline-block rounded px-2 py-1 text-xs font-semibold ${
						isSelected
							? 'bg-white text-green-800'
							: 'bg-[#DCE1E8] text-black'
					}`}
				>
					{customSaveText}
				</p>
			)}

			{/* Main Price Section */}
			<div className="text-left leading-none">
				<p
					className={`flex items-end text-xl font-bold whitespace-nowrap ${
						isSelected ? 'text-white' : 'text-slate-400'
					}`}
				>
					₹{discountedPrice}
					<span
						className={`ml-1 text-sm ${
							isSelected ? 'text-white/80' : 'text-slate-400'
						}`}
					>
						/ {month} mo
					</span>
				</p>

				{/* Strikethrough MRP */}
				{hasSavings && (
					<p className="mt-1 text-xs text-gray-400 line-through">
						₹{actualPrice}
					</p>
				)}

				{/* Price per month */}
				<p
					className={`text-sm ${
						isSelected ? 'text-white/80' : 'text-slate-400'
					}`}
				>
					i.e. ₹{pricePerMonth}/mo
				</p>
			</div>
		</div>
	);
};

export default PlanCard2;
