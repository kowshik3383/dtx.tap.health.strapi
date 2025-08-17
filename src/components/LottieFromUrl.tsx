import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
interface LottieFromUrlProps {
	url: string;
	loop: boolean;
}
const LottieFromUrl = ({ url, loop }: LottieFromUrlProps) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [animationData, setAnimationData] = useState<any>(null);

	useEffect(() => {
		if (!url) return;
		fetch(url)
			.then(res => res.json())
			.then(data => setAnimationData(data));
	}, [url]);

	if (!animationData) return <div>Loading animation...</div>;
	return (
		<Lottie
			animationData={animationData}
			loop={loop}
			className="mt-6 h-56 w-full"
		/>
	);
};

export default LottieFromUrl;
