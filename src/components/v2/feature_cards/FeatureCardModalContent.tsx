/* eslint-disable import/order */
'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { components } from '@/types/strapi';
import { useSwipeable } from 'react-swipeable';
import { FeatureCardData } from './data';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';

type Props = {
	data: components['schemas']['ItemsPopupCardComponent'];
	onNext: () => void;
	onBack: () => void;
	isNextDisabled: boolean;
	isBackDisabled: boolean;
	activeIndex: number;
	cardData: FeatureCardData[];
	onClose: () => void;
};

const FeatureCardModalContent = ({
	data,
	onNext,
	onBack,
	isNextDisabled,
	isBackDisabled,
	activeIndex,
	cardData,
	onClose,
}: Props) => {
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (isNextDisabled) {
        onClose();
      } else {
        onNext();
      }
    },
    onSwipedRight: () => {
      if (!isBackDisabled) onBack();
    },
    delta: 50,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

	return (
		<div
			{...swipeHandlers}
			className="relative w-full rounded-3xl bg-white px-4 pt-4 pb-6">
			{/* Close Button */}
			<button
				onClick={onClose}
				className="absolute top-4 right-4 z-10 p-1"
				aria-label="Close">
				<svg
					width="36"
					height="36"
					viewBox="0 0 36 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<rect
						width="36"
						height="36"
						rx="18"
						fill="#252E49"
						fillOpacity="0.2"
					/>
					<path
						d="M18 19.1773L23.2441 24.4213L24.4226 23.2428L19.1785 17.9988L24.4226 12.7547L23.2441 11.5762L18 16.8203L12.7559 11.5762L11.5774 12.7547L16.8215 17.9988L11.5775 23.2428L12.756 24.4213L18 19.1773Z"
						fill="#252E49"
						stroke="#252E49"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{/* Title - Left aligned now */}
			<h3 className="text-left text-lg font-bold text-black sm:text-xl">
				{data.title}
			</h3>

			{/* Image */}
			{data.image && data.image.url && (
				<div className="relative mt-4 h-[280px] w-full overflow-hidden rounded-xl">
					<Image
						src={optimisedImageUrl(data.image)}
						alt={
							data.image.name ||
							`Feature Image ${activeIndex + 1}`
						}
						fill
						className="object-contain"
						priority
					/>
				</div>
			)}

			{/* Feature Points */}
			<div className="mt-4 flex flex-col gap-4 rounded-b-3xl border-r border-b border-l border-[#D0E4FF] bg-[linear-gradient(180deg,white_0%,rgba(208,228,255,0.33)_100%)] p-4">
				{data?.features?.map((item, i) => (
					<div key={i} className="flex items-start gap-3">
						{item.image && item.image.url && (
							<Image
								src={optimisedImageUrl(item.image)}
								alt={
									item.image.name ||
									`Feature Image ${activeIndex + 1}`
								}
								width={40}
								height={40}
								className="mt-1 h-10 w-10 sm:h-12 sm:w-12"
							/>
						)}

						<p className="text-base font-normal text-slate-900 sm:text-xl">
							{item.text}
						</p>
					</div>
				))}
			</div>

			{/* Swiper Indicator */}
			<div className="mt-6 flex justify-center gap-2">
				{cardData?.map((_, i) => (
					<span
						key={i}
						className={`h-2 rounded-full transition-all duration-300 ${
							i === activeIndex
								? 'w-6 bg-blue-600'
								: 'w-2 bg-blue-200'
						}`}
					/>
				))}
			</div>

			{/* Nav Buttons */}
			<div className="mt-8 flex w-full items-center justify-between">
				<button
					onClick={onBack}
					className={`flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-medium ${
						isBackDisabled
							? 'cursor-not-allowed opacity-50'
							: 'text-zinc-500 hover:text-zinc-800'
					}`}
					disabled={isBackDisabled}>
					<ArrowLeft className="h-4 w-4" />
					Back
				</button>

        {isNextDisabled ? (
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FeatureCardModalContent;
