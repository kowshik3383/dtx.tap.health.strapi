import { ReactNode } from 'react';

interface BottomSheetContainerProps {
	children: ReactNode;
	className?: string;
}

export function BottomSheetContainer({
	children,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	className = '',
}: BottomSheetContainerProps) {
	return (
		<div className="fixed bottom-0 z-60 mx-auto w-screen max-w-[430px] rounded-t-2xl border-t border-gray-200 bg-white p-4 shadow-lg">
			{children}
		</div>
	);
}
