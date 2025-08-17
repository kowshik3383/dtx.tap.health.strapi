import Image from 'next/image';
import React from 'react';

interface AppStoreButtonsProps {
	onAppStoreClick: () => void;
	onPlayStoreClick: () => void;
}

export const AppStoreButtons: React.FC<AppStoreButtonsProps> = ({
	onAppStoreClick,
	onPlayStoreClick,
}) => {
	return (
		<div className="mb-8 flex justify-center gap-4">
			<button
				onClick={onAppStoreClick}
				className="h-[44px] transition-opacity hover:opacity-90">
				<Image
					src="/assets/app_store_icon.png"
					alt="App Store"
					width={156}
					height={44}
					className="h-full w-auto"
				/>
			</button>
			<button
				onClick={onPlayStoreClick}
				className="h-[44px] transition-opacity hover:opacity-90">
				<Image
					src="/assets/gpay_icon.png"
					alt="Play Store"
					width={156}
					height={44}
					className="h-full w-auto"
				/>
			</button>
		</div>
	);
};
