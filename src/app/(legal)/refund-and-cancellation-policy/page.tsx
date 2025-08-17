import { Typography } from '@mui/material';

const RefundAndCancellationPolicy = () => {
	return (
		<div className="flex h-screen bg-[#fff]">
			<div className="flex w-[100vw] flex-col gap-[24px] p-[24px]">
				<div className="flex flex-col gap-[8px]">
					<Typography
						sx={{
							color: '#252E49',
							fontFamily: 'Urbanist',
							fontSize: '24px',
							fontWeight: 800,
							lineHeight: '28.8px',
							letterSpacing: '-0.008em',
							textAlign: 'left',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
						}}>
						Refund Policy
					</Typography>
					<Typography
						sx={{
							fontFamily: 'Urbanist',
							fontSize: '14px',
							fontWeight: 500,
							lineHeight: '22.4px',
							letterSpacing: '-0.004em',
							textAlign: 'left',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
							color: '#5D6A85',
						}}>
						No refunds will be issued after 30 days of once the
						payment is successfully processed.
					</Typography>
				</div>
				<div className="flex flex-col gap-[8px]">
					<Typography
						sx={{
							color: '#252E49',
							fontFamily: 'Urbanist',
							fontSize: '24px',
							fontWeight: 800,
							lineHeight: '28.8px',
							letterSpacing: '-0.008em',
							textAlign: 'left',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
						}}>
						Cancellation Policy
					</Typography>
					<ul className="flex list-disc flex-col gap-[8px] text-[#5D6A85]">
						<li>
							You can cancel your subscription anytime through the
							"Manage my plan" section.
						</li>
						<li>
							If you cancel, you will continue to have access to
							premium features until the end of your current
							billing period.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default RefundAndCancellationPolicy;
