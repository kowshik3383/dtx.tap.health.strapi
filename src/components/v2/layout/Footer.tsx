'use client';

import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';

const TapHealthFooter: React.FC = ({
	logo,
	copyright,
	image,
}: components['schemas']['DynamicZoneFooter2Component']) => {
	return (
		<div className="relative min-h-[350px] w-full overflow-hidden bg-[#78AEFF] py-10 md:min-h-[420px] lg:min-h-[420px]">
			{/* Top Logo */}
			<div className="z-30 flex flex-col items-start px-6 text-left">
				{logo && logo.url && (
					<Image
						src={logo.url}
						alt="Footer Logo"
						width={160}
						height={40}
						className="object-contain"
					/>
				)}

				<p className="mt-2 text-sm text-[#A6CBFF] opacity-90">
					{copyright || 'Copyright © 2025'}
				</p>
			</div>

			{/* Centered bubble character */}
			{image && image.url && (
				<div className="absolute bottom-[-100px] left-1/2 z-10 w-[350px] -translate-x-1/2 md:w-[500px] lg:bottom-[-300px] lg:w-[700px]">
					<Image
						src="https://tap.health/wp-content/themes/taphealthTwo/assets/images/tap-bot.webp"
						alt="Bubble character"
						width={700}
						height={900}
						className="h-auto w-full object-contain"
					/>
				</div>
			)}
			{/* See you soon text */}
			<div className="font-Caveat absolute bottom-[230px] left-1/2 z-10 -translate-x-1/2 text-center text-lg text-white italic opacity-80">
				See you soon!
			</div>

			{/* Footer text */}
			{/* <div className="z-30 text-center text-black text-sm opacity-90">
			 */}
			{/* <p className="mt-2">
          Made with <Heart className="inline w-3 h-3 text-red-500 fill-current" /> by tap.health team
        </p> */}
			{/* </div> */}
		</div>
	);
};

export default TapHealthFooter;
