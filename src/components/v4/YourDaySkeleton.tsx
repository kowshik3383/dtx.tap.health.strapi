const YourDaySkeleton = () => {
	return (
		<div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-sky-200">
			{/* Skeleton shimmer background */}
			<div className="absolute inset-0 z-40 animate-pulse bg-gradient-to-br from-sky-100 to-sky-300" />

			{/* Simulated video container border */}
			<div className="absolute z-50 h-3/5 w-4/5 rounded-2xl border-4 border-white/40 shadow-xl" />

			{/* Optional: Loading text */}
			<div className="absolute bottom-10 z-50 text-sm font-semibold tracking-wide text-white">
				Loading your video...
			</div>
		</div>
	);
};

export default YourDaySkeleton;
