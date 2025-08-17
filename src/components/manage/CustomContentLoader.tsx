import ContentLoader from 'react-content-loader';

interface CustomContentLoaderProps {
	height?: number;
}

const CustomContentLoader: React.FC<CustomContentLoaderProps> = ({
	height = 70,
}) => {
	return (
		<div className="mt-2 flex items-center justify-center">
			<ContentLoader
				speed={2}
				width="95%"
				height={height}
				foregroundColor="#ecebeb"
				backgroundColor="#f3f3f3"
				uniqueKey="custom-content-loader"
				preserveAspectRatio="none">
				<rect
					x="0"
					y="0"
					rx="12"
					ry="12"
					width="100%"
					height={height}
				/>
			</ContentLoader>
		</div>
	);
};

export default CustomContentLoader;
