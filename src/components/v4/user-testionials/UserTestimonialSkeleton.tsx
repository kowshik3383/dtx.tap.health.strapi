import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const SkeletonCard = () => {
	return (
		<div className="flex h-[300px] animate-pulse flex-col justify-between gap-3 rounded-2xl bg-gradient-to-b from-blue-600 to-blue-800 p-3 shadow-md">
			{/* Top badge */}
			<div className="h-6 w-32 rounded-2xl bg-white px-3 py-2 shadow outline outline-blue-600" />

			{/* Profile */}
			<div className="mt-3 flex items-start gap-3">
				<div className="h-20 w-20 rounded-xl bg-gray-300" />
				<div className="flex flex-1 flex-col gap-2">
					<div className="h-4 w-24 rounded bg-yellow-300" />
					<div className="h-5 w-32 rounded bg-white" />
					<div className="h-3 w-20 rounded bg-white/50" />
				</div>
			</div>

			{/* Text content */}
			<div className="space-y-2">
				<div className="h-4 w-full rounded bg-white/50" />
				<div className="h-4 w-3/4 rounded bg-white/40" />
				<div className="h-4 w-1/2 rounded bg-white/30" />
			</div>
		</div>
	);
};

const UserTestimonialSkeleton = () => {
	return (
		<div className="font-urbanist flex w-full flex-col overflow-hidden bg-cyan-50 shadow-inner lg:block">
			{/* Header */}
			<div className="w-full lg:flex lg:justify-center">
				<div className="flex w-full flex-col items-center gap-5 px-5 py-6 sm:w-96">
					<div className="h-6 w-48 animate-pulse rounded bg-blue-200" />
					<div className="h-4 w-40 animate-pulse rounded bg-slate-300" />

					{/* Fake Stats */}
					<div className="flex flex-wrap items-center justify-center gap-2">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="flex animate-pulse flex-col items-center gap-1 rounded-xl bg-slate-800 p-1">
								<div className="h-3 w-14 rounded bg-white/50" />
								<div className="h-5 w-20 rounded-3xl bg-white px-3 py-1 shadow outline outline-blue-600" />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Testimonial Cards */}
			<div className="w-full px-5 py-6">
				<Swiper
					spaceBetween={16}
					breakpoints={{
						0: { slidesPerView: 1.1 },
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1280: { slidesPerView: 4 },
					}}>
					{Array.from({ length: 4 }).map((_, i) => (
						<SwiperSlide key={i}>
							<SkeletonCard />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default UserTestimonialSkeleton;
