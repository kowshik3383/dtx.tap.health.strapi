const PricingCardSkeleton = () => {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-10">
			{/* Heading */}
			<div className="mb-8 h-10 w-72 rounded-md bg-gray-200" />

			{/* Pricing Cards */}
			<div className="mb-6 flex w-full flex-col gap-4 sm:flex-row">
				{Array.from({ length: 2 }).map((_, index) => (
					<div
						key={index}
						className="h-52 flex-1 animate-pulse rounded-xl border border-gray-200 bg-white p-4">
						<div className="mx-auto mb-4 h-4 w-20 rounded bg-gray-200" />
						<div className="mx-auto mb-2 h-3 w-16 rounded bg-gray-200" />
						<div className="mx-auto mb-1 h-6 w-16 rounded bg-gray-300" />
						<div className="mx-auto mb-1 h-3 w-24 rounded bg-gray-200" />
						<div className="mx-auto h-3 w-16 rounded bg-gray-100" />
					</div>
				))}
			</div>

			{/* Join Now Button */}
			<div className="mb-7 h-12 w-full max-w-xl animate-pulse rounded-full bg-blue-200" />

			{/* Features Section */}
			<div className="mb-5 w-full max-w-4xl animate-pulse rounded-2xl bg-white p-6 shadow-sm">
				<div className="mb-4 h-6 w-40 rounded bg-gray-200" />

				{/* Features */}
				<div className="space-y-4">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="flex items-center gap-3">
							<div className="h-8 w-8 rounded-full bg-gray-200" />
							<div className="h-3 w-40 rounded bg-gray-200" />
							{i === 2 && (
								<div className="ml-auto h-5 w-24 rounded bg-green-100" />
							)}
						</div>
					))}
				</div>

				{/* Trial Section */}
				<div className="mt-6 h-10 rounded-xl bg-green-100" />
			</div>
		</div>
	);
};

export default PricingCardSkeleton;
