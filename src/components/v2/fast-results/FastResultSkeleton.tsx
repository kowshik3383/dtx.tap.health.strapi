const FastResultSkeleton = () => {
	return (
		<div className="bg-white py-10">
			{/* Title */}
			<div className="mx-auto mb-3 h-8 w-48 rounded bg-gray-200" />
			{/* Subtitle */}
			<div className="mx-auto mb-8 h-6 w-64 rounded bg-gray-200" />

			{/* Cards */}
			<div className="flex flex-col gap-6 px-4 lg:flex-row lg:items-stretch lg:justify-center">
				{Array.from({ length: 3 }).map((_, index) => (
					<div
						key={index}
						className="mx-auto w-full animate-pulse sm:max-w-sm lg:max-w-xs">
						<div className="mb-4 aspect-video w-full rounded-xl bg-gray-200" />
						<div className="mx-auto h-4 w-3/4 rounded bg-gray-200" />
					</div>
				))}
			</div>
		</div>
	);
};

export default FastResultSkeleton;
