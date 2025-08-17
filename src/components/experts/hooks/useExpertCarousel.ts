// 'use client';
// import { useEffect, useState } from 'react';
// import { ExpertImageStyleProps, ExpertType } from '../types';

// export const useExpertCarousel = (experts: ExpertType[]) => {
// 	const [activeIndex, setActiveIndex] = useState(0);
// 	const [screenWidth, setScreenWidth] = useState(0);
// 	const [autoRotate, setAutoRotate] = useState(true);

// 	useEffect(() => {
// 		// Auto-rotateq the carousel every 5 seconds (slightly longer for better UX)
// 		let timer: NodeJS.Timeout;

// 		if (autoRotate) {
// 			timer = setInterval(() => {
// 				setActiveIndex(prev => (prev + 1) % experts.length);
// 			}, 5000);
// 		}

// 		return () => clearInterval(timer);
// 	}, [experts.length, autoRotate]);

// 	useEffect(() => {
// 		// Pause auto-rotation temporarily when user interacts
// 		const pauseAutoRotation = () => {
// 			setAutoRotate(false);
// 			// Resume auto rotation after 10 seconds of inactivity
// 			const resumeTimer = setTimeout(() => setAutoRotate(true), 10000);
// 			return () => clearTimeout(resumeTimer);
// 		};

// 		// When active index changes by user interaction
// 		return pauseAutoRotation();
// 	}, [activeIndex]);

// 	useEffect(() => {
// 		// Set initial width and handle resize with debounce
// 		if (typeof window !== 'undefined') {
// 			setScreenWidth(window.innerWidth);

// 			let debounceTimer: NodeJS.Timeout;
// 			const handleResize = () => {
// 				clearTimeout(debounceTimer);
// 				debounceTimer = setTimeout(() => {
// 					setScreenWidth(window.innerWidth);
// 				}, 100); // Debounce the resize event
// 			};

// 			window.addEventListener('resize', handleResize);
// 			return () => {
// 				window.removeEventListener('resize', handleResize);
// 				clearTimeout(debounceTimer);
// 			};
// 		}
// 	}, []);

// 	const getImageStyles = (index: number): ExpertImageStyleProps => {
// 		const totalExperts = experts.length;
// 		const distance = (index - activeIndex + totalExperts) % totalExperts;
// 		const adjustedDistance =
// 			distance > totalExperts / 2 ? distance - totalExperts : distance;

// 		// Responsive values based on screen width
// 		const getResponsiveValue = (
// 			mobile: number,
// 			tablet: number,
// 			desktop: number,
// 		) => {
// 			if (screenWidth < 640) return mobile;
// 			if (screenWidth < 1024) return tablet;
// 			return desktop;
// 		};

// 		// Calculate carousel arc parameters
// 		const spacingFactor = getResponsiveValue(3, 3.5, 4);
// 		const spacedDistance = adjustedDistance * spacingFactor;

// 		// Using a more natural arc calculation
// 		const arcWidth = Math.PI * 0.6; // Slightly more than half circle for a natural arc
// 		const angle =
// 			(spacedDistance / ((totalExperts - 1) * spacingFactor)) * arcWidth -
// 			arcWidth / 2;

// 		// Radius changes based on screen size
// 		const radius = getResponsiveValue(180, 280, 400);

// 		// Calculate position along the arc
// 		const x = radius * Math.sin(angle);
// 		// Adjust vertical positioning to create a natural arc
// 		const y =
// 			-radius * Math.cos(angle) * 0.4 + getResponsiveValue(20, 30, 40);

// 		// Calculate rotation for 3D-like effect
// 		const maxRotation = getResponsiveValue(30, 25, 20);
// 		const rotation = adjustedDistance * (maxRotation / 2);

// 		// Determine visibility - show more cards on larger screens
// 		const visibilityThreshold = getResponsiveValue(1.5, 2, 2.5);
// 		const isVisible = Math.abs(adjustedDistance) <= visibilityThreshold;

// 		// Scale down cards as they move away from center
// 		const baseScale = getResponsiveValue(0.8, 0.85, 0.9);
// 		const scale =
// 			distance === 0
// 				? 1
// 				: baseScale - Math.min(Math.abs(adjustedDistance), 2) * 0.1;

// 		// Reduce opacity as cards move away
// 		const opacity = isVisible
// 			? distance === 0
// 				? 1
// 				: 0.95 - Math.min(Math.abs(adjustedDistance), 2) * 0.15
// 			: 0;

// 		return {
// 			x,
// 			y,
// 			rotation,
// 			scale,
// 			opacity: isVisible ? opacity : 0,
// 			zIndex: 100 - Math.abs(adjustedDistance),
// 			display: isVisible ? 'block' : 'none',
// 		};
// 	};

// 	return {
// 		activeIndex,
// 		setActiveIndex,
// 		getImageStyles,
// 		activeExpert: experts[activeIndex],
// 		autoRotate,
// 		setAutoRotate,
// 	};
// };

// export default useExpertCarousel;
