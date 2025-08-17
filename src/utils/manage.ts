/* eslint-disable @typescript-eslint/no-unused-vars */
export const calculateTimeLeft = (updatedAt: string | undefined): string => {
	if (!updatedAt) return 'No subscription data available';
	const startDate = new Date(updatedAt);
	const expiryDate = new Date(startDate);
	expiryDate.setFullYear(startDate.getFullYear());
	const today = new Date();
	const monthsLeft =
		(expiryDate.getFullYear() - today.getFullYear()) * 12 +
		expiryDate.getMonth() -
		today.getMonth();

	if (monthsLeft > 0) {
		return `${monthsLeft} month${monthsLeft > 1 ? 's' : ''} left`;
	} else if (monthsLeft === 0) {
		return 'The subscription ends this month.';
	} else {
		return 'The subscription has expired.';
	}
};

export const formatDate = (isoString: string | undefined): string => {
	if (!isoString) return 'Date not available';
	const date = new Date(isoString);
	if (isNaN(date.getTime())) {
		return 'Invalid date provided';
	}
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	};
	return new Intl.DateTimeFormat('en-GB', options).format(date);
};

export const calculateOneYearLater = (
	dateString: string | undefined,
): string => {
	if (!dateString) return 'Date not available';
	const date = new Date(dateString);
	if (isNaN(date.getTime())) {
		return 'Invalid date provided';
	}
	date.setFullYear(date.getFullYear() + 1);
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};
	return new Intl.DateTimeFormat('en-GB', options).format(date);
};

export const calculateDaysLeft = (
	nextRenewalDate: string | undefined,
	updatedAt: string | undefined,
) => {
	if (!nextRenewalDate) return 'No subscription data available';
	const endDateString = nextRenewalDate;
	if (!endDateString) return 'No renewal date available';
	const endDate = new Date(endDateString);
	const today = new Date();

	// Calculate the difference in milliseconds
	const timeDifference = endDate.getTime() - today.getTime();

	// If the target date has passed
	if (timeDifference <= 0) {
		return 'The target date has passed.';
	}
	const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
	if (daysLeft <= 30) {
		return `${daysLeft} days left`;
	}
	return `${Math.ceil(Number(daysLeft / 31))} months left`;
};
export const calculateRefundDaysLeft = (updatedAt: string | undefined) => {
	if (!updatedAt) return 'No subscription data available';
	const startDate = new Date(updatedAt);
	const targetDate = new Date(startDate);
	console.log('targetDate', targetDate);
	console.log('startDate', startDate);
	targetDate.setDate(startDate.getDate() + 30);
	const today = new Date();
	console.log('targetDate', targetDate);
	const timeDifference = targetDate.getTime() - today.getTime();
	if (timeDifference <= 0) {
		return 'The target date has passed.';
	}
	const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
};
