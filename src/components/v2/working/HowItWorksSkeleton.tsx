const HowItWorksSkeleton = ({ className = '' }: { className?: string }) => {
	const steps = Array.from({ length: 4 });

	return (
		<div className={`bg-white px-4 py-16 ${className}`}>
			<div className="mx-auto max-w-6xl">
				{/* Header Skeleton */}
				<div className="mb-8 flex justify-center">
					<div className="h-8 w-40 animate-pulse rounded-md bg-blue-100" />
				</div>

				{/* Title Skeleton */}
				<div className="mb-10 text-center">
					<div className="mx-auto mb-2 h-10 w-80 animate-pulse rounded-md bg-gray-200" />
					<div className="mx-auto h-6 w-60 animate-pulse rounded bg-gray-100" />
				</div>

				{/* Desktop Grid Skeleton */}
				<div className="hidden grid-cols-1 gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
					{steps.map((_, index) => (
						<div
							key={index}
							className="mx-auto w-[280px] animate-pulse rounded-2xl bg-white p-4 shadow-lg">
							<div className="mb-4 h-32 w-full rounded bg-gray-200" />
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-full bg-[#9EEFF0]" />
								<div className="h-4 w-32 rounded bg-gray-300" />
							</div>
						</div>
					))}
				</div>

				{/* Mobile Layout Skeleton */}
				<div className="space-y-4 md:hidden">
					{steps.map((_, index) => (
						<div
							key={index}
							className="w-full animate-pulse rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
							<div className="mb-4 h-36 w-full rounded bg-gray-200" />
							<div className="flex items-center gap-4">
								<div className="h-10 w-10 rounded-full bg-[#9EEFF0]" />
								<div className="h-4 w-40 rounded bg-gray-300" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HowItWorksSkeleton;
