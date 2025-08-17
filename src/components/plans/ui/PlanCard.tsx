/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

type PlanCardProps = {
	id?: string;
	month: number;
	description?: string;
	actualPrice: number;
	discountedPrice: number;
	isSelected: boolean;
	offerName?: string | null;
	onClick: () => void;
	isPromotional?: boolean;
	promotionalCode?: string;
	padding?: string;
};

const PlanCard = ({
	id,
	month,
	description,
	actualPrice,
	discountedPrice,
	isSelected,
	offerName,
	onClick,
	isPromotional,
	promotionalCode,
	padding = 'py-4',
}: PlanCardProps) => {
	const savePercentage = Math.ceil(
		((actualPrice - discountedPrice) / actualPrice) * 100,
	);
	const pricePerMonth = Math.ceil(discountedPrice / month);
	const hasSavings = savePercentage > 0 && actualPrice !== discountedPrice;

	return (
		<div
			className={`mb-3 flex w-full cursor-pointer flex-col rounded-[12px] text-black ${
				isSelected ? 'bg-[#EDF5FF]' : 'bg-white'
			} transition-all duration-300`}
			style={{
				borderColor: isSelected ? '#2563EB' : '#DCE1E8',
				borderWidth: isSelected ? '2px' : '1px',
				overflow: 'hidden',
			}}
			onClick={onClick}>
			{offerName && (
				<div className="flex items-center justify-between bg-[#2563EB] px-4 py-2 text-white">
					<span className="font-urbanist text-[14px] font-bold">
						{offerName}
					</span>
					{hasSavings && (
						<div className="flex min-w-[70px] items-center justify-center rounded-[4px] bg-[#D1FAE5] px-2 py-1">
							<span className="font-urbanist text-[12px] leading-none font-semibold text-[#047857]">
								Save {savePercentage}%
							</span>
						</div>
					)}
				</div>
			)}
			<div className={`flex justify-between px-4 ${padding}`}>
				<div className="flex items-center gap-3">
					<input
						type="radio"
						className="mt-1 h-5 w-5 appearance-none rounded-full border-[3px] border-gray-400 checked:h-4 checked:w-4 checked:border-white checked:bg-[#2563EB] checked:ring-[2px] checked:ring-[#2563EB]"
						checked={isSelected}
						onChange={onClick}
						name="plan"
						value={month}
						data-month={actualPrice}
						data-tenure={discountedPrice}
						readOnly
					/>

					<div className="flex flex-col">
						<span className="text-[16px] font-bold text-gray-800 sm:text-[18px]">
							{month} {month === 1 ? 'month' : 'months'} plan
						</span>
						<span className="max-w-[200px] text-[12px] text-gray-600 sm:text-[14px]">
							{description}
						</span>
					</div>
				</div>
				<div className="flex flex-col items-end">
					{hasSavings && (
						<span className="text-[12px] font-medium text-gray-400 line-through sm:text-[14px]">
							₹{actualPrice}
						</span>
					)}
					<span className="text-[24px] font-bold text-gray-800 sm:text-[28px]">
						₹{discountedPrice}
					</span>
					<span
						className={`text-[12px] font-medium sm:text-[14px] ${
							isSelected ? 'text-[#059669]' : 'text-gray-500'
						}`}>
						₹{pricePerMonth}/mo
					</span>
				</div>
			</div>
		</div>
	);
};

export default PlanCard;
