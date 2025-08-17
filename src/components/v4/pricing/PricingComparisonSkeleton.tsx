const PricingComparisonSkeleton = () => {
	return (
		<div className="font-urbanist flex w-full animate-pulse flex-col items-start gap-11 px-4 py-8">
			{/* Header */}
			<div className="flex w-full flex-col items-center gap-3">
				<div className="h-4 w-56 rounded bg-gray-400" />
				<div className="h-6 w-40 rounded bg-gray-400" />
			</div>

			{/* Mobile Skeleton */}
			<div className="w-full md:hidden">
				<div className="flex w-full">
					<div className="flex w-48 shrink-0 flex-col gap-3 px-4 pt-6">
						<div className="h-3 w-20 rounded bg-gray-300" />
						<div className="flex flex-col gap-2 rounded-l-xl bg-slate-100 p-2">
							{Array.from({ length: 11 }).map((_, i) => (
								<div
									key={i}
									className="h-3 w-32 rounded bg-gray-200"
								/>
							))}
						</div>
						<div className="mt-2 h-3 w-24 rounded bg-gray-300" />
					</div>

					<div className="flex-1 overflow-x-auto">
						<div className="flex gap-2 pb-2">
							{Array.from({ length: 4 }).map((_, pi) => (
								<div
									key={pi}
									className="flex min-w-[80px] shrink-0 flex-col items-center gap-3 rounded-xl bg-white p-2">
									<div className="h-12 w-12 rounded-full bg-gray-300" />
									<div className="flex flex-col gap-2">
										{Array.from({ length: 11 }).map(
											(_, fi) => (
												<div
													key={fi}
													className="h-5 w-5 rounded bg-gray-300"
												/>
											),
										)}
									</div>
									<div className="h-4 w-10 rounded bg-gray-400" />
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 flex w-full items-center justify-end gap-2 pr-3">
					<div className="h-3 w-24 rounded bg-gray-300" />
					<div className="h-4 w-4 rounded-full bg-gray-300" />
				</div>
			</div>

			{/* Desktop Skeleton */}
			<div className="hidden w-full md:block">
				<div className="mx-auto w-full max-w-6xl">
					<div className="overflow-hidden rounded-xl bg-slate-100">
						{/* Table Header */}
						<div className="flex border-b-2 border-slate-200 bg-white">
							<div className="w-80 shrink-0 p-6">
								<div className="h-4 w-28 rounded bg-gray-300" />
							</div>
							<div className="flex flex-1 justify-center gap-8">
								{Array.from({ length: 4 }).map((_, pi) => (
									<div
										key={pi}
										className="flex w-32 flex-col items-center gap-3 p-4">
										<div className="h-16 w-16 rounded-full bg-gray-300" />
										<div className="h-5 w-12 rounded bg-gray-400" />
										<div className="h-3 w-16 rounded bg-gray-300" />
									</div>
								))}
							</div>
						</div>

						{/* Table Rows */}
						{Array.from({ length: 11 }).map((_, idx) => (
							<div
								key={idx}
								className="flex items-center border-b border-slate-200 py-4">
								<div className="w-80 shrink-0 px-6">
									<div className="h-4 w-40 rounded bg-gray-200" />
								</div>
								<div className="flex flex-1 justify-center gap-8">
									{Array.from({ length: 4 }).map((_, pi) => (
										<div
											key={pi}
											className="h-6 w-6 rounded-full bg-gray-300"
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="w-full px-5">
				<div className="h-px bg-indigo-200/20" />
			</div>
		</div>
	);
};

export default PricingComparisonSkeleton;
