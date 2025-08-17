/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import React from 'react'; // 👈 Add this line
import { vi } from 'vitest';

class IntersectionObserverMock {
	constructor(public callback: any, public options?: any) {}
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
	takeRecords = vi.fn();
}

global.IntersectionObserver = vi.fn().mockImplementation(
	(callback, options) => new IntersectionObserverMock(callback, options)
);

// Optional: Attach React to globalThis if needed elsewhere
(globalThis as any).React = React;
