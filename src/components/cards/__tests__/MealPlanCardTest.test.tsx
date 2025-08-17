/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import React from 'react';
import { describe, it, vi } from 'vitest';
import MealPlanCard from '../MealPlanCard';

// Mock Section
vi.mock('../layout/Section', () => ({
  __esModule: true,
  default: ({ children, title, description, icon }: any) => (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>{icon}</span>
      {children}
    </div>
  ),
}));

// Mock FoodSlider
vi.mock('../FoodSlider', () => ({
  __esModule: true,
  default: ({ upperSlider, lowerSlider }: any) => (
    <div>
      <div>Upper: {upperSlider?.length || 0}</div>
      <div>Lower: {lowerSlider?.length || 0}</div>
    </div>
  ),
}));

describe('MealPlanCardTest component render', () => {
  it('renders with mocked props', () => {
    const mockProps = {
      title: 'Mock Meal Plan',
      description: 'Mock description for diabetic meals.',
      icon: '🍱',
      upperSlider: [
        {
          id: 1,
          title: 'Mock Breakfast',
          image: { url: '/mock-breakfast.png' },
          calories: 300,
        },
        {
          id: 2,
          title: 'Mock Lunch',
          image: { url: '/mock-lunch.png' },
          calories: 500,
        },
      ],
      lowerSlider: [
        {
          id: 3,
          title: 'Mock Dinner',
          image: { url: '/mock-dinner.png' },
          calories: 450,
        },
      ],
    } as any;

    render(<MealPlanCard {...mockProps} />);
  });
});
