'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useInView } from 'react-intersection-observer';
// import {
// 	COMPANY_DESCRIPTION,
// 	COMPANY_INFO,
// 	FOOTER_LINKS,
// 	SOCIAL_LINKS,
// } from '@/constants/footer';
import { SOCIAL_LINKS } from '@/constants/footer';

import { components } from '@/types/strapi';
import { trackEvent } from '@/utils/analytics';

type Footer1 = components['schemas']['DynamicZoneFooter1Component'];
interface FooterProps extends Footer1 {
	footer: components['schemas']['Footer'];
}

const Footer = ({
	show_footer_links = true,
	show_social_links = true,
	social_links,
	footer,
}: FooterProps) => {
	const router = useRouter();
	const { ref, inView } = useInView({ triggerOnce: true });

	const footerAnimation = {
		initial: { opacity: 0, y: 50 },
		animate: { opacity: inView ? 1 : 0, y: inView ? 0 : 50 },
		transition: { duration: 1 },
	};
const socialLinksToRender = social_links?.length
	? social_links.map(({ icon, href }) => ({
			icon: icon?.url,
			link: href,
		}))
	: SOCIAL_LINKS;


	console.log(footer);
	return (
		<motion.footer
			ref={ref}
			className="font-urbanist mb-12 w-full bg-[#252E49] px-6 py-10 text-white"
			{...footerAnimation}>
			<div className="mx-auto flex max-w-7xl flex-col justify-between gap-10">
				{/* Left Section - Logo & Address */}
				<div className="flex max-w-sm flex-col gap-4">
					{footer?.logo && footer?.logo?.url && (
						<Image
							src={footer.logo.url}
							alt="Footer Logo"
							width={122}
							height={25}
							className="h-[25px] w-[122px]"
						/>
					)}
					<p className="text-sm leading-[1.6]">
						{footer?.name} <br />
						{footer?.address}
					</p>
				</div>

				{/* Middle Section - Links */}
				{show_footer_links && (
					<nav className="flex flex-col gap-3">
						{footer?.footer_links?.map(({ label, href }) => (
							<button
								key={href}
								onClick={() => {
									// Track the link click event based on the label
									const eventMapping: Record<string, string> =
									{
										'Terms and Conditions':
											'dtx_paid_landing_page_tnc_click',
										'Privacy Policy':
											'dtx_paid_landing_page_privacy_policy_click',
										'Refund & Cancellation Policy':
											'dtx_paid_landing_page_refund_policy_click',
										// For future links
										'About Us':
											'dtx_paid_landing_page_about_us_click',
										'Contact Us':
											'dtx_paid_landing_page_contact_us_click',
									};

									const eventName = eventMapping[label ?? ''];
									if (eventName) {
										trackEvent(eventName, {
											url: window.location.href,
											link_text: label,
											link_path: href,
											value: 10,
											currency: 'INR',
										});
									}

									// Navigate to the page
									router.push(href ?? '/');
								}}
								className="cursor-pointer text-left text-base font-semibold hover:underline">
								{label}
							</button>
						))}
					</nav>
				)}

				{/* Right Section - Description */}
				<div className="flex max-w-sm flex-col gap-4">
					<p className="text-sm leading-[1.6]">
						{footer?.description_main}
					</p>
					<p className="text-sm leading-[1.6]">
						{footer?.description_sub}
					</p>
				</div>
			</div>

			{/* Social Icons */}
			{show_social_links && (
				<div className="mt-10 flex flex-wrap justify-center gap-4">
	{socialLinksToRender.map(({ icon, link }) => (
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		key={link}>
		<div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A6CBFF] bg-[#EDF5FF] transition-transform hover:scale-105">
			{icon && (
				<Image
					src={icon}
					alt="social icon"
					width={24}
					height={24}
					className="h-5 w-5"
				/>
			)}
		</div>
	</a>
))}

				</div>
			)}

		</motion.footer>
	);
};

export default Footer;
