import Image from 'next/image';
import { components } from '@/types/strapi';

const Whatsincluded = ({
	title,
	features,
	results,
	reduced_by,
	message,
}: components['schemas']['DynamicZoneWhatsIncludedComponent']) => {
	return (
		<div className="mb-5 w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
			<h3 className="mb-4 text-lg font-semibold text-gray-800">
				{title}
			</h3>
			<div className="space-y-3">
				{features?.map((feature, i) => (
					<div key={i} className="flex items-center gap-3">
						{feature.icon && feature.icon.url && (
							<div className="flex items-center justify-center rounded-full bg-gray-100">
								<Image
									src={feature.icon.url}
									alt={
										feature.icon.name ||
										`Feature Icon ${i + 1}`
									}
									width={30}
									height={26}
								/>
							</div>
						)}
						<span className="text-gray-700">{feature.feature}</span>
						{/* {feature.text === 'HbA1c Results' && (
							<span className="ml-auto rounded bg-green-100 px-2 py-1 text-sm font-bold text-[#10B981]">
								✓ Reduce by 5%
							</span>
						)} */}
					</div>
				))}
				<div className="flex items-center gap-3">
					<span className="text-gray-700">{results}</span>

					<span className="ml-auto rounded bg-green-100 px-2 py-1 text-sm font-bold text-[#10B981]">
						{reduced_by}
					</span>
				</div>
			</div>

			<div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-3 text-center">
				<p className="font-bold text-[#10B981]">{message}</p>
			</div>
		</div>
	);
};

export default Whatsincluded;
