import { components } from '@/types/strapi';
import ExerciseCard2 from './cards/ExerciseCard2';

const FeatureCard = ({
	title,
	cards = [],
}: components['schemas']['DynamicZoneWhatYouGetComponent']) => {
	const slicedCards = [];
	for (let i = 0; i < cards.length; i += 2) {
		slicedCards.push(cards.slice(i, i + 2));
	}
	return (
		<section className="mt-7 bg-white">
			<h2 className="mb-6 text-center text-3xl font-bold text-black sm:text-4xl md:text-5xl">
				{title}
			</h2>
			<div className="mx-2 gap-x-1">
				{slicedCards?.map((card, index) => (
					<div className="mb-3 flex justify-center gap-4" key={index}>
						{card.map((carditem, ind) => (
							<ExerciseCard2 {...carditem} key={ind} />
						))}
					</div>
				))}
			</div>
		</section>
	);
};

export default FeatureCard;
