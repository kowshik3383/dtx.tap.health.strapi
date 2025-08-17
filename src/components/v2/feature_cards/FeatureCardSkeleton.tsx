const FeatureCardSkeleton = () => {
	return (
		<section className="mt-7 bg-white">
			{/* Title skeleton */}
			<div className="mb-2 flex justify-center">
				<div className="h-4 w-48 animate-pulse rounded bg-gray-200 lg:h-5"></div>
			</div>

			{/* Custom heading skeleton */}
			<div className="mb-6">
				<div className="mb-1 flex items-center justify-center gap-1">
					{/* Logo skeleton */}
					<div className="h-5 w-5 animate-pulse rounded bg-gray-200"></div>
					{/* Text skeleton */}
					<div className="h-6 w-40 animate-pulse rounded bg-gray-200"></div>
				</div>
				<div className="flex justify-center">
					<div className="h-6 w-32 animate-pulse rounded bg-gray-200"></div>
				</div>
			</div>

			{/* Cards skeleton */}
			<div className="mx-3 flex flex-col gap-3">
				{/* Card skeleton - varies heights to simulate different card types */}
				<div className="animate-pulse rounded-lg bg-gray-50 p-4">
					<div className="mb-3 flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-gray-200"></div>
						<div className="h-5 w-32 rounded bg-gray-200"></div>
					</div>
					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
					<div className="h-4 w-3/4 rounded bg-gray-200"></div>
				</div>

				<div className="animate-pulse rounded-lg bg-gray-50 p-4">
					<div className="mb-3 flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-gray-200"></div>
						<div className="h-5 w-28 rounded bg-gray-200"></div>
					</div>
					<div className="mb-2 h-20 w-full rounded bg-gray-200"></div>
					<div className="h-4 w-2/3 rounded bg-gray-200"></div>
				</div>

				<div className="animate-pulse rounded-lg bg-gray-50 p-4">
					<div className="mb-3 flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-gray-200"></div>
						<div className="h-5 w-36 rounded bg-gray-200"></div>
					</div>
					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
					<div className="mb-2 h-4 w-5/6 rounded bg-gray-200"></div>
					<div className="h-4 w-1/2 rounded bg-gray-200"></div>
				</div>

				<div className="animate-pulse rounded-lg bg-gray-50 p-4">
					<div className="mb-3 flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-gray-200"></div>
						<div className="h-5 w-24 rounded bg-gray-200"></div>
					</div>
					<div className="mb-2 h-16 w-full rounded bg-gray-200"></div>
					<div className="flex gap-2">
						<div className="h-4 w-16 rounded bg-gray-200"></div>
						<div className="h-4 w-20 rounded bg-gray-200"></div>
					</div>
				</div>

				<div className="animate-pulse rounded-lg bg-gray-50 p-4">
					<div className="mb-3 flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-gray-200"></div>
						<div className="h-5 w-20 rounded bg-gray-200"></div>
					</div>
					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
					<div className="mb-2 h-4 w-4/5 rounded bg-gray-200"></div>
					<div className="h-8 w-full rounded bg-gray-200"></div>
				</div>

				<div className="animate-pulse rounded-lg bg-gray-50 p-4">
					<div className="mb-3 flex items-center gap-3">
						<div className="h-8 w-8 rounded-full bg-gray-200"></div>
						<div className="h-5 w-32 rounded bg-gray-200"></div>
					</div>
					<div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
					<div className="mb-2 h-4 w-3/4 rounded bg-gray-200"></div>
					<div className="h-6 w-24 rounded bg-gray-200"></div>
				</div>
			</div>
		</section>
	);
};

export default FeatureCardSkeleton;
