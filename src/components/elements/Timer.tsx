'use client';

import React,{ useEffect, useState } from 'react';

interface TimerProps {
	endDate?: Date;
}

const Timer = ({ endDate }: TimerProps) => {
	const [timeLeft, setTimeLeft] = useState({
		hours: 23,
		minutes: 59,
		seconds: 59,
	});

	useEffect(() => {
		// If endDate is provided, use it; otherwise, set a 24-hour countdown
		const targetTime =
			endDate || new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

		const interval = setInterval(() => {
			const currentTime = new Date();
			const difference = targetTime.getTime() - currentTime.getTime();

			if (difference <= 0) {
				clearInterval(interval);
				setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
				return;
			}

			const hours = Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			);
			const minutes = Math.floor(
				(difference % (1000 * 60 * 60)) / (1000 * 60),
			);
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft({ hours, minutes, seconds });
		}, 1000);

		return () => clearInterval(interval);
	}, [endDate]);

	return (
		<div className="font-urbanist text-[20px] font-bold text-white">
			{timeLeft.hours.toString().padStart(2, '0')}:
			{timeLeft.minutes.toString().padStart(2, '0')}:
			{timeLeft.seconds.toString().padStart(2, '0')}
		</div>
	);
};

export default Timer;
