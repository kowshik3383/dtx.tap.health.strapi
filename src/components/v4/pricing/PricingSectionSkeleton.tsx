export default function PricingSectionSkeleton() {
	return (
		<section className="animate-pulse">
			<div className="mb-8 flex w-full flex-col items-center gap-3 text-center xl:mb-12 xl:gap-4">
				<div className="h-4 w-48 rounded bg-gray-700" />
				<div className="h-8 w-72 rounded bg-gray-800 xl:h-10 xl:w-96" />
			</div>

			<div className="flex w-full items-center justify-center p-4 xl:p-8">
				<div className="mx-auto w-full max-w-sm xl:max-w-6xl 2xl:max-w-7xl">
					{/* Mobile Layout */}
					<div className="relative h-80 w-full xl:hidden">
						{[1, 2, 3].map((_, idx) => (
							<div key={idx} className="absolute top-8 w-32">
								<div className="flex h-64 flex-col justify-between rounded-xl bg-gray-700 p-3 shadow-lg">
									<div className="flex flex-col items-center gap-4">
										<div className="h-3 w-20 rounded bg-gray-600" />
										<div className="h-4 w-24 rounded bg-gray-500" />
										<div className="h-px w-24 bg-gray-500" />
										<div className="h-3 w-28 rounded bg-gray-600" />
										<div className="h-3 w-20 rounded bg-gray-500" />
										<div className="h-4 w-24 rounded bg-gray-700" />
									</div>
									<div className="h-8 w-full rounded-full bg-gray-600" />
								</div>
							</div>
						))}
					</div>

					{/* Desktop Layout */}
					<div className="hidden xl:flex xl:items-end xl:justify-center xl:gap-8 2xl:gap-12">
						{[1, 2, 3].map((_, idx) => (
							<div
								key={idx}
								className="relative flex flex-col justify-between rounded-2xl bg-gray-700 p-6 shadow-xl xl:h-80 xl:w-80 xl:rounded-3xl 2xl:h-96 2xl:w-96 2xl:p-8">
								<div className="flex flex-col items-center gap-6 2xl:gap-8">
									<div className="h-4 w-20 rounded bg-gray-500" />
									<div className="h-5 w-32 rounded bg-gray-400" />
									<div className="h-px w-40 bg-gray-500" />
									<div className="h-4 w-36 rounded bg-gray-500" />
									<div className="h-4 w-24 rounded bg-gray-600" />
									<div className="h-6 w-24 rounded bg-gray-400" />
									<div className="h-4 w-28 rounded bg-gray-500" />
								</div>
								<div className="h-10 w-full rounded-full bg-gray-600" />
							</div>
						))}
					</div>

					{/* Bottom CTA */}
					<div className="relative mt-12 xl:mt-16 2xl:mt-20">
						<div className="mx-auto -mb-1 flex items-center justify-center">
							<div className="h-6 w-6 rounded-full bg-gray-600" />
						</div>
						<div className="rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 p-4 text-center shadow-xl xl:mx-auto xl:max-w-2xl xl:rounded-2xl xl:p-6 xl:shadow-2xl 2xl:max-w-3xl 2xl:p-8">
							<div className="mx-auto h-4 w-80 rounded bg-gray-600" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
