const TestimonialSkeleton = () => {
	return (
		<div className="bg-[#E5F9FF]">
			<div className="container py-12">
				{/* Header */}
				<div className="mb-10 text-center">
					<div className="inline-block h-6 w-52 rounded-md bg-gray-200" />
					<div className="mx-auto mt-4 h-8 w-80 rounded-md bg-gray-200 md:h-12 md:w-[420px]" />
				</div>

				{/* Cards */}
				<div className="relative mx-auto w-full max-w-6xl overflow-x-hidden px-4">
					<div className="flex gap-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="w-[320px] flex-shrink-0 animate-pulse rounded-2xl bg-white p-6 shadow-sm">
								<div className="mb-4 h-5 w-[90%] rounded bg-gray-200" />
								<div className="mb-4 space-y-2">
									<div className="h-3 w-[95%] rounded bg-gray-200" />
									<div className="h-3 w-[85%] rounded bg-gray-200" />
									<div className="h-3 w-[80%] rounded bg-gray-200" />
								</div>
								<div className="my-3 flex justify-center gap-1">
									{Array.from({ length: 5 }).map((_, j) => (
										<div
											key={j}
											className="h-3 w-3 rounded-full bg-yellow-200"
										/>
									))}
								</div>
								<div className="text-center">
									<div className="mx-auto mb-1 h-9 w-9 rounded-full bg-gray-300" />
									<div className="mx-auto mb-1 h-3 w-20 rounded bg-gray-200" />
									<div className="mx-auto h-2 w-14 rounded bg-gray-200" />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Dots */}
				<div className="mt-8 flex justify-center space-x-4">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className="h-2 w-2 rounded-full bg-gray-300"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default TestimonialSkeleton;
