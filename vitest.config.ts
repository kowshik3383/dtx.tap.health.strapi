import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		storybookTest({
			configDir: path.join(dirname, '.storybook'),
		}),
	],

	test: {
		include: ['**/*.test.ts', '**/*.test.tsx'],
		environment: 'jsdom',
		setupFiles: ['./vitest.setup.ts'],
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},

	resolve: {
		alias: {
			'@': path.resolve(dirname, './src'),
		},
	},
});
