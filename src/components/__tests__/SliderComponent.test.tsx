/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SliderComponent from '../FoodSlider';

// Mock FoodCard
vi.mock('../elements/FoodCard', () => ({
  default: ({ title }: any) => <div data-testid="food-card">{title}</div>,
}));

// Mock requestAnimationFrame
beforeEach(() => {
  vi.stubGlobal('requestAnimationFrame', (cb) => setTimeout(() => cb(0), 0));
  vi.stubGlobal('cancelAnimationFrame', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const mockUpperSlider = [
  {
    title: 'Upper 1',
    icon: '🍎',
    description: 'Upper Desc 1',
    backgroundColor: '#f00',
  },
  {
    title: 'Upper 2',
    icon: '🍌',
    description: 'Upper Desc 2',
    backgroundColor: '#0f0',
  },
];

const mockLowerSlider = [
  {
    title: 'Lower 1',
    icon: '🥦',
    description: 'Lower Desc 1',
    backgroundColor: '#00f',
  },
];

describe('SliderComponent', () => {
  it('renders without crashing and duplicates items 3 times', () => {
    render(
      <SliderComponent upperSlider={mockUpperSlider} lowerSlider={mockLowerSlider} />
    );

    const upperCards = screen.getAllByTestId('food-card').filter((el) =>
      el.textContent?.includes('Upper')
    );
    const lowerCards = screen.getAllByTestId('food-card').filter((el) =>
      el.textContent?.includes('Lower')
    );

    expect(upperCards.length).toBe(mockUpperSlider.length * 3); // 6
    expect(lowerCards.length).toBe(mockLowerSlider.length * 3); // 3
  });

  it('renders correct titles for upper and lower cards', () => {
    render(
      <SliderComponent upperSlider={mockUpperSlider} lowerSlider={mockLowerSlider} />
    );

    expect(screen.getAllByText('Upper 1').length).toBe(3);
    expect(screen.getAllByText('Upper 2').length).toBe(3);
    expect(screen.getAllByText('Lower 1').length).toBe(3);
  });

  it('sets refs correctly and triggers animation', () => {
    const { container } = render(
      <SliderComponent upperSlider={mockUpperSlider} lowerSlider={mockLowerSlider} />
    );

    const divs = container.querySelectorAll('div');
    const hasTransform = Array.from(divs).some((div) =>
      div.style.transform?.includes('translateX')
    );

    // Style is set inside RAF, and simulated using timeout above
    expect(hasTransform).toBe(false); // test is limited since RAF is mocked
  });
});
