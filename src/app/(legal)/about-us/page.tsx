import { Typography } from '@mui/material';

import APD from '../../../../public/assets/APD.png';
import CEO from '../../../../public/assets/CEO.png';
import CPO from '../../../../public/assets/CPO.png';
import MKT from '../../../../public/assets/MKT.png';
import MemberCard from '../../../components/elements/MemberCard';
const About = () => {
	const membersdata = [
		{
			name: 'Rahul Maroli',
			position: 'CO-FOUNDER & CEO',
			text: 'With a background in healthcare entrepreneurship, Rahul brings invaluable expertise in business strategy and product development.',
			imgSrc: CEO,
			linkedInLink: 'https://www.linkedin.com/in/rahulmaroli/',
		},
		{
			name: 'Manit Kathuria',
			position: 'CO-FOUNDER & CPO',
			text: "Manit's experience as a serial entrepreneur and design leader drives Tap Health's innovative approach to user experience.",
			imgSrc: CPO,
			linkedInLink: 'https://www.linkedin.com/in/manitkathuria/',
		},
		{
			name: 'Ritesh Tanu',
			position: 'Marketing Director',
			text: 'With over two decades of marketing experience, Ritesh spearheads our efforts to reach and engage with users effectively.',
			imgSrc: MKT,
			linkedInLink: 'https://www.linkedin.com/in/riteshtanu/',
		},
		{
			name: 'Dhaval Chauhan',
			position: 'Associate Product Director',
			text: "Dhaval's expertise in product management and e-commerce fuels Tap Health's continuous product improvement and innovation.",
			imgSrc: APD,
			linkedInLink:
				'https://www.linkedin.com/in/dhaval-chauhan-b34959240/',
		},
	];
	return (
		<div className="bg-[#fff]">
			<div className="flex flex-col gap-8 p-[24px]">
				<Typography
					sx={{
						fontFamily: 'Urbanist',
						fontSize: '28px',
						fontWeight: 800,
						lineHeight: '33.6px',
						textAlign: 'center',
						textUnderlinePosition: 'from-font',
						textDecorationSkipInk: 'none',
						color: '#141B31',
					}}>
					We are simplifying access to health advice and medical
					services.
				</Typography>
				<div className="flex flex-col gap-5 text-[#141B31]">
					<Typography
						sx={{
							fontFamily: 'Urbanist',
							fontSize: '14px',
							fontWeight: 400,
							lineHeight: '19.6px',
							textAlign: 'justify',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
						}}>
						At Tap Health, our mission is clear: to transform
						healthcare access for everyone, everywhere.
					</Typography>
					<Typography
						sx={{
							fontFamily: 'Urbanist',
							fontSize: '14px',
							fontWeight: 400,
							lineHeight: '19.6px',
							textAlign: 'justify',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
						}}>
						Driven by a passion for innovation and a commitment to
						improving lives, we’ve developed an AI-powered platform
						that provides preliminary illness diagnosis,
						personalized healthcare guidance and seamless
						connectivity with healthcare providers. Our platform
						leverages advanced technologies to analyze symptoms
						accurately, ensuring users receive the right guidance
						when they need it most.
					</Typography>
					<Typography
						sx={{
							fontFamily: 'Urbanist',
							fontSize: '14px',
							fontWeight: 400,
							lineHeight: '19.6px',
							textAlign: 'justify',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
						}}>
						In regions, like India where over 80% of illnesses are
						diagnosed late due to limited access to healthcare, Tap
						Health fills a crucial gap. We empower individuals to
						take control of their health by offering precise and
						dependable health advice, whether they’re seeking an
						initial opinion, a second perspective, or general health
						queries.
					</Typography>
					<Typography
						sx={{
							fontFamily: 'Urbanist',
							fontSize: '14px',
							fontWeight: 400,
							lineHeight: '19.6px',
							textAlign: 'justify',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
						}}>
						With a user-centric approach, we prioritize user
						experience and privacy, ensuring that every interaction
						with Tap Health is seamless, secure and confidential.
					</Typography>
				</div>
			</div>
			<div className="mt-10 flex flex-col gap-5">
				<div className="flex flex-col items-center justify-center">
					<Typography
						sx={{
							fontFamily: 'Urbanist',
							fontSize: '16px',
							fontWeight: 500,
							lineHeight: '19.2px',
							textAlign: 'center',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
							color: '#252E49',
						}}>
						The Team
					</Typography>
					<Typography
						sx={{
							fontFamily: 'Urbanist',
							fontSize: '32px',
							fontWeight: 700,
							lineHeight: '38.4px',
							textAlign: 'center',
							textUnderlinePosition: 'from-font',
							textDecorationSkipInk: 'none',
							color: '#252E49',
							maxWidth: '312px',
						}}>
						People behind Tap Health
					</Typography>
				</div>
				<div className="flex flex-col gap-3 px-6 pt-6 pb-12">
					{membersdata.map((member, index) => (
						<MemberCard key={index} {...member} />
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
