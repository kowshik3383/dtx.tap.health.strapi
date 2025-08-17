import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import DiabeticPhotoLogging from '../DiabeticPhotoLogging';

describe('DiabeticPhotoLogging', () => {
  it('renders without crashing with minimal props', () => {
    render(
      <DiabeticPhotoLogging
        icon={undefined}
        animation_loop={false}
        lottie_animation={undefined}
      />
    );
  });

  it('renders with animation loop enabled and mock animation URL', () => {
    render(
      <DiabeticPhotoLogging
        icon={{ url: '/icon.svg', name: 'Icon' }}
        animation_loop={true}
        lottie_animation={{ url: '/mock-lottie.json', name: 'Mock Lottie' }}
      />
    );
  });
});
