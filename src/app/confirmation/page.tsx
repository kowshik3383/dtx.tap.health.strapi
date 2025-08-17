'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaAppStore, FaGooglePlay } from 'react-icons/fa';

export default function ConfirmationScreen() {
	const [showGif, setShowGif] = useState(true);
	const [animationComplete, setAnimationComplete] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowGif(false);
			setTimeout(() => setAnimationComplete(true), 700);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	// SVG height transition
	const svgHeight = showGif ? '100vh' : animationComplete ? '254px' : '100vh';
	const svgViewBox = '0 0 360 254'; // Fixed viewBox

	return (
		<div className="relative min-h-screen overflow-hidden bg-white">
			{/* Animated Background SVG */}
			<div
				className="absolute top-0 right-0 left-0 overflow-hidden transition-all duration-700 ease-in-out"
				style={{
					height: svgHeight,
					zIndex: 0,
				}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox={svgViewBox}
					preserveAspectRatio="none"
					className="transition-all duration-700 ease-in-out">
					<rect
						x="-308"
						y="-722"
						width="976"
						height="976"
						rx="488"
						fill="#059669"
					/>
				</svg>
			</div>

			{/* Loading Animation */}
			{showGif && (
				<div className="relative z-10 flex h-screen flex-col items-center justify-center">
					<Image
						src="/assets/animation1.gif"
						alt="Processing Animation"
						width={300}
						height={300}
						className="w-[250px] object-contain sm:w-[300px]"
					/>

					<div className="absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center space-y-3 px-4 text-center">
						<Image
							src="/assets/right.svg"
							alt="Right Icon"
							width={50}
							height={50}
							className="mb-2 object-contain"
						/>
						<h1 className="text-2xl font-bold text-white sm:text-3xl">
							You’re in!
						</h1>
						<p className="w-full text-sm text-white sm:text-base">
							Your 2 months free trial is now active
						</p>
					</div>
				</div>
			)}
			{/* Confirmation screen */}
			{!showGif && (
				<div className="relative z-10 flex min-h-screen flex-col">
					{/* Status bar */}
					<div className="relative pt-8 pb-16">
						<div className="mb-4 flex items-center justify-between px-4">
							<div className="text-sm text-white">9:30</div>
							<div className="flex space-x-2">
								<div className="flex items-center">
									<Image
										src="/assets/righticons.svg"
										alt="Status icons"
										width={60}
										height={20}
										className="object-contain"
									/>
								</div>
							</div>
						</div>

						{/* Close button */}
						<div className="absolute top-8 right-4 text-white">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M18 6L6 18M6 6L18 18"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>

						{/* Success check and text */}
						<div className="flex flex-col items-center px-4 text-center">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full">
								<svg
									width="30"
									height="30"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9 12L11 14L15 10"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<h2 className="text-xl font-semibold text-white">
								You're in!
							</h2>
							<p className="mt-1 text-sm text-white">
								Your 2 months free trial is now active
							</p>
						</div>
					</div>

					{/* Content section */}
					<div className="mt-6 flex-1 rounded-t-3xl bg-white px-4 py-6">
						{/* App download section */}
						<div className="flex flex-col items-center pt-8 pb-4">
							<h2 className="text-center text-2xl font-bold text-gray-800">
								Download Tap Health
								<br />
								to get started
							</h2>

							{/* App store buttons */}
							<div className="mt-4 mb-6 flex space-x-2">
								<div className="flex items-center space-x-4 rounded-md bg-black px-3 py-1 text-white">
									<FaAppStore className="text-xl" />
									<div className="flex flex-col">
										<span className="text-xs">
											Available on
										</span>
										<span className="text-sm">
											App Store
										</span>
									</div>
								</div>

								<div className="flex items-center space-x-4 rounded-md bg-black px-3 py-1 text-white">
									<FaGooglePlay className="text-xl" />
									<div className="flex flex-col">
										<span className="text-xs">
											GET IT ON
										</span>
										<span className="text-sm">
											Google Play
										</span>
									</div>
								</div>
							</div>

							{/* Download button */}
							<button className="w-full max-w-sm rounded-full bg-blue-600 py-3 font-semibold text-white">
								Download Tap Health
							</button>
						</div>

						{/* Payment summary */}
						<div className="mt-6">
							<h3 className="mb-3 text-xl font-bold text-gray-700">
								Payment summary
							</h3>
							<div className="rounded-lg border border-gray-200">
								<div className="flex justify-between border-b border-gray-200 px-4 py-3">
									<span className="text-sm text-gray-600">
										Plan Duration
									</span>
									<span className="text-sm font-bold text-gray-800">
										12 months
									</span>
								</div>
								<div className="flex justify-between border-b border-gray-200 px-4 py-3">
									<span className="text-sm text-gray-600">
										Amount paid
									</span>
									<span className="text-sm font-bold text-gray-800">
										₹0
									</span>
								</div>
								<div className="flex justify-between border-b border-gray-200 px-4 py-3">
									<span className="text-sm text-gray-600">
										Paid using
									</span>
									<span className="text-sm font-bold text-gray-800">
										89******@axisb
									</span>
								</div>
								<div className="flex justify-between px-4 py-3">
									<span className="text-sm text-gray-600">
										Transaction ID
									</span>
									<span className="text-sm font-bold text-gray-800">
										782134QD8B0N
									</span>
								</div>
							</div>

							{/* Download invoice link */}
							<div className="mt-4 flex justify-center">
								<a
									href="#"
									className="flex items-center text-sm font-bold text-blue-600">
									<svg
										className="mr-2 h-4 w-4"
										viewBox="0 0 24 24"
										fill="none">
										<path
											d="M12 16L12 8M12 16L9 13M12 16L15 13"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M3 15V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16V15"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
									Download Invoice
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
