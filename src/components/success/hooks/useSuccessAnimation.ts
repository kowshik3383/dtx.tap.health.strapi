import { useEffect, useState } from 'react';
import { ANIMATION_TIMING } from '../constants/animations';

interface UseSuccessAnimationProps {
	onAnimationComplete?: () => void;
}

export const useSuccessAnimation = ({
	onAnimationComplete,
}: UseSuccessAnimationProps) => {
	const [animationComplete, setAnimationComplete] = useState(false);
	const [textReduced, setTextReduced] = useState(false);

	// Handle animation sequence timing
	useEffect(() => {
		// Start the text position transition
		const textReduceTimer = setTimeout(() => {
			setTextReduced(true);
		}, ANIMATION_TIMING.TEXT_REDUCE_TIMER);

		// Mark animation as complete
		const completeTimer = setTimeout(() => {
			setAnimationComplete(true);
			if (onAnimationComplete) {
				onAnimationComplete();
			}
		}, ANIMATION_TIMING.ANIMATION_COMPLETE);

		return () => {
			clearTimeout(textReduceTimer);
			clearTimeout(completeTimer);
		};
	}, [onAnimationComplete]);

	return {
		animationComplete,
		textReduced,
	};
};
