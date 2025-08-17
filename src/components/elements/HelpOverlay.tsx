interface HelpOverlayProps {
	onClose: () => void;
}

export function HelpOverlay({ onClose }: HelpOverlayProps) {
	return (
		<div
			className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm"
			onClick={onClose}
		/>
	);
}
