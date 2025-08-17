'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { optimisedImageUrl } from '@/lib/strapi/optimisedImage';
import { components } from '@/types/strapi';

const Navbar = ({
	image,
}: components['schemas']['DynamicZoneNavbarv2Component']) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
				isScrolled
					? 'rounded-lg bg-white/10 backdrop-blur-2xl'
					: 'bg-white'
			}`}>
			<div className="h-[72px] px-4 py-3 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{image && image.url && (
						<div className="relative h-10 w-28">
							<Image
								src={optimisedImageUrl(image)}
								alt="Tap Health Logo"
								fill
								priority
								className="object-contain"
								sizes="112px"
							/>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
