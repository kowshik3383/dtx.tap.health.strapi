module.exports = {
	bracketSpacing: true,
	bracketSameLine: true,
	singleQuote: true,
	trailingComma: 'all',
	arrowParens: 'avoid',
	tabWidth: 4,
	semi: true,
	useTabs: true,
	endOfLine: 'lf',
	plugins: ['prettier-plugin-tailwindcss'],
	// Specify which files to format
	overrides: [
		{
			files: [
				'*.ts',
				'*.tsx',
				'*.js',
				'*.jsx',
				'*.json',
				'*.md',
				'*.css',
				'*.scss',
				'*.html',
			],
			excludeFiles: [
				// Add any files or patterns you want to exclude
				'**/node_modules/**',
				'**/dist/**',
				'**/build/**',
				// Exclude specific API routes if needed
			],
			options: {
				// You can override specific options for certain files
				// For example, different settings for markdown files
				parser: 'typescript',
			},
		},
	],
};
