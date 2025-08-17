import React from 'react';
import { DOWNLOAD_BUTTON_TEXT } from '../constants';

interface DownloadButtonProps {
	onClick: () => void;
	text?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({
	onClick,
	text = DOWNLOAD_BUTTON_TEXT,
}) => {
	return (
		<button
			onClick={onClick}
			className="font-urbanist w-full rounded-full bg-[#2563EB] py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1d4ed8]">
			{text}
		</button>
	);
};
