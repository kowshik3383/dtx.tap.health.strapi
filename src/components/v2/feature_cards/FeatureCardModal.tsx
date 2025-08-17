'use client';

import { ReactNode, useEffect } from 'react';

type FeatureCardModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

const FeatureCardModal = ({
	isOpen,
	onClose,
	children,
}: FeatureCardModalProps) => {
	useEffect(() => {
		if (!isOpen) return;
		const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
		window.addEventListener('keydown', onEsc);
		return () => window.removeEventListener('keydown', onEsc);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 h-full z-[999] flex items-end justify-center bg-black/40 sm:items-center"
			onClick={onClose} // 👈 Clicking on overlay will close modal
		>
			{/* Close Button */}
			<button
				onClick={onClose}
				className="top-10 right-0 left-0 z-[9999] mx-auto hidden w-full items-center justify-center rounded-full p-2 sm:right-auto sm:left-1/2 sm:w-auto sm:-translate-x-1/2">
				<svg
					width="36"
					height="36"
					viewBox="0 0 36 36"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<rect
						width="36"
						height="36"
						rx="18"
						fill="white"
						fillOpacity="0.2"
					/>
					<path
						d="M18 19.1785L23.244 24.4226L24.4225 23.2441L19.1785 18L24.4226 12.7559L23.2441 11.5774L18 16.8215L12.7559 11.5774L11.5774 12.7559L16.8215 18L11.5774 23.2441L12.756 24.4226L18 19.1785Z"
						fill="white"
						stroke="white"
						strokeWidth="2"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{/* Modal Box (stop click from closing modal) */}
			<div
				className="relative mt-4 max-h-[99vh] overflow-y-auto
 w-full overflow-hidden rounded-t-xl"
				onClick={e => e.stopPropagation()} // 👈 Prevent close when clicking inside
			>
				{children}
			</div>
		</div>
	);
};

export default FeatureCardModal;
