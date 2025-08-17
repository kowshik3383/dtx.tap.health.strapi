const CardSkeleton = () => (
	<div className="h-36 w-full animate-pulse rounded-2xl bg-white shadow-md" />
);

const DiabetesSkeleton = () => {
	return (
		<section className="font-urbanist flex animate-pulse flex-col items-center bg-sky-200 px-4 py-8 text-center">
			{/* Heading */}
			<h1 className="mb-2 text-[14px] font-bold text-slate-800 lg:text-lg">
				Making this easier for you
			</h1>

			{/* Subheading with logo placeholder */}
			<div className="mb-6 space-y-1 text-[24px] leading-tight font-extrabold text-slate-800">
				<div className="flex items-center justify-center gap-1">
					<div className="h-5 w-5 rounded-full bg-white" />
					<span className="-ml-2">ap</span>
					<span>-ing into your</span>
				</div>
				<div className="text-[22px] font-extrabold text-slate-800">
					daily habits
				</div>
			</div>

			{/* Cards skeleton */}
			<div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
				<CardSkeleton />
			</div>
		</section>
	);
};

export default DiabetesSkeleton;
