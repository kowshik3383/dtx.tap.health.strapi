import { env } from '../env.mjs';

/**
 * Utility to log the current environment configuration
 * Run with: npm run env:status
 */
export function printEnvironmentStatus() {
	console.log('\n=== Environment Configuration ===\n');

	// Current environment
	console.log(`🌐 Environment: ${env.NODE_ENV}`);

	// API configuration
	console.log('\n📡 API Configuration:');
	console.log(`  API URL: ${env.NEXT_PUBLIC_API_URL}`);
	if (env.NEXT_PUBLIC_X_VERSION) {
		console.log(`  X Version: ${env.NEXT_PUBLIC_X_VERSION}`);
	}

	// Analytics configuration (safe display)
	console.log('\n📊 Analytics Configuration:');
	console.log(
		`  Mixpanel: ${
			env.NEXT_PUBLIC_MIXPANEL_TOKEN ? '✓ Configured' : '✗ Missing'
		}`,
	);

	// Payment configuration (safe display)
	console.log('\n💳 Payment Configuration:');
	console.log(
		`  Razorpay: ${
			env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? '✓ Configured' : '✗ Missing'
		}`,
	);
	console.log(
		`  Key Type: ${
			env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_test')
				? 'Test'
				: 'Live'
		}`,
	);

	console.log('\n================================\n');
}

// Auto-execute when run directly
if (require.main === module) {
	printEnvironmentStatus();
}
