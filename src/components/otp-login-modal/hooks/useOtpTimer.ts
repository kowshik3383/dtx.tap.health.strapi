import { useCallback, useEffect, useState } from 'react';

export function useOtpTimer(initialSeconds = 30) {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isActive && seconds > 0) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds - 1);
			}, 1000);
		} else if (seconds === 0) {
			setIsActive(false);
		}

		return () => clearInterval(interval);
	}, [isActive, seconds]);

	const restart = useCallback(() => {
		setSeconds(initialSeconds);
		setIsActive(true);
	}, [initialSeconds]);

	return {
		seconds,
		isActive,
		restart,
	};
}
