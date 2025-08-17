// __mocks__/lottie-react.tsx
const Lottie = ({ animationData }: { animationData: unknown }) => {
	return <div data-testid="mock-lottie">{JSON.stringify(animationData)}</div>;
};
export default Lottie;
