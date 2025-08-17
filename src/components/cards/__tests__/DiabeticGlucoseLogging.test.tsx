import { render } from '@testing-library/react';
import React from 'react';
import DiabeticGlucoseLogging from '../DiabeticGlucoseLogging';

jest.mock('lottie-react', () => () => <div>Lottie Animation</div>);
jest.mock('../../../public/Glucometer.json', () => ({ default: {} }), { virtual: true });
jest.mock('../DiabeticPhotoLogging', () => ({
  lottiejson: jest.fn().mockResolvedValue({ dummy: 'animation' }),
}));

const mockProps = {
  title: 'Mock Glucose Title',
  description: 'Mock description about glucose tracking.',
  icon: '🩸',
  lottie_animation: {
    url: '/mock-animation.json',
  },
  animation_loop: true,
};

describe('DiabeticGlucoseLogging Component', () => {
  it('renders without crashing using mocked props', () => {
    render(<DiabeticGlucoseLogging {...mockProps} />);
  });
});
