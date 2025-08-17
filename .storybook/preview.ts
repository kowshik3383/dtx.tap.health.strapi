import type { Preview } from '@storybook/react';
import '../src/app/globals.css';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		nextjs: {
			appDirectory: false,
		},
	},
};

export default preview;
