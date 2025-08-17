export default function AppRatingSkeleton() {
	return (
		<div
			className="flex w-full animate-pulse flex-col items-center py-6"
			style={{
				background:
					'linear-gradient(to bottom, #2563EB 0%, #252E49 100%)',
			}}>
			{/* Fake Swiper Slide */}
			<div className="w-full max-w-xs">
				<div className="flex flex-col items-center">
					{/* Star icons */}
					<div className="mb-2 flex gap-1">
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className="h-5 w-5 rounded-sm bg-yellow-300"
							/>
						))}
					</div>

					{/* Rating label placeholder */}
					<div className="h-4 w-40 rounded bg-white/30" />
				</div>
			</div>

			{/* Custom Dots */}
			<div className="mt-4 flex items-center gap-2">
				<div className="h-1 w-4 rounded-full bg-white" />
				<div className="h-1 w-1 rounded-full bg-white/40" />
			</div>
		</div>
	);
}
