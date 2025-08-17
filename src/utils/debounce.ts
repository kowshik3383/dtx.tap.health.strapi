/**
 * Creates a debounced function that delays invoking the provided function
 * until after `wait` milliseconds have elapsed since the last time it was invoked.
 *
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @param immediate Whether to invoke the function on the leading edge instead of the trailing edge
 * @returns A debounced function that can be called repeatedly, but will only execute once per wait period
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
	func: T,
	wait = 300,
	immediate = false,
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null;

	return function (this: unknown, ...args: Parameters<T>): void {
		// Using arrow functions to preserve the 'this' context
		const later = (): void => {
			timeout = null;
			if (!immediate) func.apply(this, args);
		};

		const callNow = immediate && !timeout;

		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) func.apply(this, args);
	};
}
