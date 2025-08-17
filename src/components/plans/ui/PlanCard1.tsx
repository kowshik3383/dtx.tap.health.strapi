'use client';

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

const PlanCard1 = ({
	month,
	actualPrice,
	discountedPrice,
	isSelected,
	offerName,
	description,
	onClick,
}: PlanCardProps) => {
	const savePercentage = Math.ceil(
		((actualPrice - discountedPrice) / actualPrice) * 100
	);
	const pricePerMonth = Math.ceil(discountedPrice / month);

	const customSaveText =
		discountedPrice === 2399
			? 'Save 54%'
			: discountedPrice === 1999
				? 'Save 23%'
				: null;

	const getPlanTitle = (m: number) => `${m} Months Plan`;

	const showRecommended = discountedPrice === 2399;

	return (
		<div
			onClick={onClick}
			className={`flex flex-col items-center cursor-pointer   ${showRecommended ? 'h-[210px] z-10 w-44 ' : 'h-[190px] w-32'}
`}
		>
			{showRecommended && (
				<div
					style={{
						background:
							'linear-gradient(159deg, #FFDE72 0%, #FFEAA7 37%, #DAAC19 43%, #FFD654 59%, #DAAC19 67%, #FFEAA7 80%, #DAAC19 91%, #FFDE72 100%)',
					}}
					className="rounded-3xl absolute top-44 lg:top-48 z-20 w-20 border border-yellow-300 text-center shadow-md">
					<span className="font-sans text-xs font-semibold text-slate-800">
						Most Popular
					</span>
				</div>
			)}

			<div
				className={`flex flex-col justify-between items-center  h-full px-2 py-3 rounded-2xl ${isSelected
					? 'bg-gradient-to-b from-slate-800 to-slate-900 shadow outline outline-amber-200'
					: 'bg-white/90 shadow outline outline-blue-100'
					}${showRecommended ? 'h-[240px] z-10 w-32 ' : 'h-[210px] w-28'}`}

			>
				<div className="flex flex-col items-center gap-1">
					<div
						className={`text-center  text-[10px] font-semibold ${isSelected ? 'text-white' : 'text-black'
							}`}
					>
						Tap Health
					</div>
					<div
						className={`text-center font-sans text-[10px] font-semibold ${isSelected ? 'text-amber-200' : 'text-blue-600'
							}`}
					>
						{getPlanTitle(month)}
					</div>

					<div className="w-24 h-px bg-indigo-200 mt-1" />

					{discountedPrice === 2399 && (
						<div
							className={`text-[9px] text-center mt-1 font-medium font-['Urbanist'] ${isSelected ? 'text-white/70' : 'text-slate-500'
								}`}
						>
							100% refund if you're not happy within 14 days.
						</div>
					)}
				</div>

					{discountedPrice !== 1299 && (
  <div
    className={`${
      discountedPrice === 1999
        ? 'mt-7'
        : discountedPrice === 2399
        ? 'mt-4'
        : 'mt-1'
    } px-2 rounded-2xl ${isSelected ? 'bg-white/10' : 'bg-blue-100/60'}`}
  >
    {customSaveText ? (
      <span
        className={`text-[10px] font-extrabold font-['Urbanist'] ${
          isSelected ? 'text-white' : 'text-blue-700'
        }`}
      >
        {customSaveText}
      </span>
    ) : (
      <>
        <span
          className={`text-[10px] font-medium font-['Urbanist'] ${
            isSelected ? 'text-white/70' : 'text-slate-600'
          }`}
        >
          You Save{' '}
        </span>
        <span
          className={`text-[10px] font-extrabold font-['Urbanist'] ${
            isSelected ? 'text-white' : 'text-blue-700'
          }`}
        >
          {savePercentage}%
        </span>
      </>
    )}
  </div>
)}

				<div className="flex flex-col items-center gap-1 mt-3">
					<div
						className={`text-xl font-extrabold font-['Urbanist'] ${isSelected ? 'text-amber-200' : 'text-slate-800'
							}`}
					>
						₹{discountedPrice}
					</div>

					<div className="text-center">
						<span
							className={`text-xs font-bold font-['Urbanist'] ${isSelected ? 'text-white/50' : 'text-slate-500/80'
								}`}
						>
							₹{pricePerMonth}
						</span>
						<span
							className={`text-[10px] font-medium font-['Urbanist'] ${isSelected ? 'text-white/50' : 'text-slate-500/80'
								}`}
						>
							/month
						</span>
					</div>

				</div>

				{/* <button
					className={`mt-auto w-full rounded-full font-sans font-bold transition-colors duration-200 ${isSelected
						? 'bg-white px-5 py-1.5 text-sm text-blue-600 outline-1 outline-blue-600 hover:bg-gray-100'
						: 'bg-blue-100 px-4 py-2 text-xs text-blue-700 outline-1 outline-blue-300 hover:bg-blue-200'
						}`}
				>
					Buy now
				</button> */}
			</div>
		</div>
	);
};

export default PlanCard1;
