'use client';

import Timer from '../../elements/Timer';
import { Promotion } from '../constants/types';

interface PromotionBannerProps {
	promotion: Promotion | null;
	endDate?: Date;
}

const PromotionBanner = ({ promotion, endDate }: PromotionBannerProps) => {
	if (!promotion) return null;

	return (
		<div
			className="flex w-full items-center justify-between rounded-t-[12px] px-4 py-3"
			style={{
				background: `linear-gradient(to right, #e5339c, #9c35da, #3174d0)`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div className="flex flex-col">
				<span className="font-urbanist mb-1 text-[14px] font-bold text-white uppercase">
					{promotion?.description || 'SPECIAL OFFER'}
				</span>
				<span className="font-urbanist text-[22px] font-extrabold text-white">
					{promotion?.discountType === 1
						? `Upto ${promotion?.discountValue || 67}% off`
						: `Flat ${promotion?.discountValue || '₹500'} off`}
				</span>
			</div>
			{endDate && (
				<div className="flex flex-col items-end">
					<span className="font-urbanist mb-1 text-[12px] font-medium text-white">
						Expires in
					</span>
					<Timer endDate={endDate} />
				</div>
			)}
		</div>
	);
};

export default PromotionBanner;
