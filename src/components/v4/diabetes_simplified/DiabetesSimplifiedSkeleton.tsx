const CardSkeleton = () => (
	<div className="relative h-[88px] w-[312px] animate-pulse rounded-2xl bg-gradient-to-b from-[rgba(166,203,255,0.10)] to-[rgba(166,203,255,0.70)]">
		<div className="absolute -top-[8px] -left-[13px] h-[104px] w-[104px] overflow-hidden rounded-xl bg-gray-200 shadow-md" />
		<div className="absolute top-4 left-[104px] h-[68px] w-[200px] space-y-2">
			<div className="h-3 w-[90%] rounded bg-gray-300" />
			<div className="h-3 w-[70%] rounded bg-gray-300" />
		</div>
	</div>
);

const DiabetesSimplifiedSkeleton = () => {
	return (
		<section className="font-urbanist flex w-full animate-pulse flex-col items-center gap-8 bg-white py-8">
			{/* Header */}
			<div className="flex w-full flex-col items-center gap-3 px-5">
				<div className="h-4 w-52 rounded bg-gray-300" />
				<div className="h-6 w-64 rounded bg-blue-200" />
			</div>

			{/* Card List */}
			<div className="flex flex-col items-start gap-8 pl-3">
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
			</div>
		</section>
	);
};

export default DiabetesSimplifiedSkeleton;
