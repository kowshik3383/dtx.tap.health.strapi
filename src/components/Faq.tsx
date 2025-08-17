'use client';
import { JSX, useState } from 'react';
import { components } from '@/types/strapi';
import { trackEvent, trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';

type Faq = components['schemas']['Faq'];
type FaqComponent = components['schemas']['DynamicZoneFaqComponent'];
interface FaqProps extends FaqComponent {
	heading_line_1: string;
	heading_line_2?: string;
	sub_heading?: string;
	faqs: Faq[];
}

const Faq = ({
	heading_line_1,
	heading_line_2,
	faqs,
}: FaqProps): JSX.Element => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number): void => {
		const isOpening = index !== openIndex;
		setOpenIndex(isOpening ? index : null);

		const payload = {
			url: window.location.href,
			faq: faqs[index]?.question || 'Unknown',
			faq_index: index,
			value: 50,
			currency: 'INR',
		};

		if (isOpening) {
			// Expand
			trackEvent('dtx_paid_landing_page_faq_expand', payload);
			trackFacebookPixelEvent('FaqExpand', payload);
			registerIntentEvent('FaqExpand');
		} else {
			// Collapse
			trackEvent('dtx_paid_landing_page_faq_collapse', payload);
			trackFacebookPixelEvent('FaqCollapse', payload);
		}
	};

	return (
		<div className="bg-[#090E1D] px-4 py-10">
			<div className="mx-auto max-w-screen-lg">
				<h2 className="font-urbanist mb-8 text-left text-3xl font-semibold text-white md:text-4xl">
					{heading_line_1} <br />
					<span className="text-white">
						{heading_line_2 || 'questions'}
					</span>
				</h2>
				{faqs?.map((faq, index) => (
					<div key={index} className="mb-4">
						<button
							className="flex w-full items-start justify-between bg-transparent py-3 text-left focus:outline-none"
							onClick={() => toggleFAQ(index)}>
							<p className="font-urbanist text-[22px] font-medium text-white md:text-lg">
								{faq.question}
							</p>
							<span className="flex flex-shrink-0 items-center">
								{openIndex === index ? (
									<svg
										className="h-6 w-6 rotate-180 transform"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 20 21"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M4.16699 8L7.879 11.712C9.05058 12.8836 10.9501 12.8836 12.1216 11.712L15.8337 8"
											stroke="#818BA0"
											strokeWidth="1.5"
										/>
									</svg>
								) : (
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 20 21"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M4.16699 8L7.879 11.712C9.05058 12.8836 10.9501 12.8836 12.1216 11.712L15.8337 8"
											stroke="#818BA0"
											strokeWidth="1.5"
										/>
									</svg>
								)}
							</span>
						</button>
						{openIndex === index && (
							<p className="font-urbanist mt-2 text-[18px] font-normal text-white md:text-base">
								{faq.answer}
							</p>
						)}
						<hr className="mt-3 border-gray-700" />
					</div>
				))}
			</div>
		</div>
	);
};

export default Faq;
