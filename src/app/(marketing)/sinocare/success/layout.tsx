'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function SinocareSuccessLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const handleBackToHome = useCallback(() => {
		// Navigate back to Sinocare landing page
		router.push('/sinocare');
	}, [router]);

	return (
		<div className="flex min-h-screen flex-col">
			{children}

			{/* Back button at the bottom */}
			<div className="fixed right-0 bottom-0 left-0 flex justify-center p-4">
				<button
					onClick={handleBackToHome}
					className="rounded-full bg-white px-6 py-3 font-semibold text-[#059669] shadow-lg">
					Back to Home
				</button>
			</div>
		</div>
	);
}
