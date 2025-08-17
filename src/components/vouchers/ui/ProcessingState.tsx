import { Box, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import plusAnimation from '../../../../public/plus_animation.json';

const Lottie = dynamic(() => import('lottie-react'), {
	ssr: false,
});

export function ProcessingState() {
	return (
		<Box
			sx={{
				position: 'fixed',
				height: '100vh',
				width: '100vw',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#FFFFFF',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '20px',
				textAlign: 'center',
				zIndex: 9999,
				top: 0,
				left: 0,
			}}>
			<Box
				sx={{
					width: '142px',
					height: '142px',
					marginBottom: '20px',
				}}>
				<Lottie animationData={plusAnimation} loop={true} />
			</Box>

			<Typography
				sx={{
					fontFamily: 'Urbanist',
					fontSize: '18px',
					marginTop: '65px',
					fontWeight: 700,
					lineHeight: '30px',
					maxWidth: '280px',
					color: '#252E49',
				}}>
				We are processing your subscription
			</Typography>
		</Box>
	);
}
