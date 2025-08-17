import { render, screen } from '@testing-library/react';
import MealPanner from '../MealPanner';

describe('MealPanner Component', () => {
  const mockProps = {
    title: 'Healthy Meal Plan',
    sub_title: 'Nutritious and delicious options',
    cards: [
      {
        title: '1x Besan Chilla',
        description: '180 kcal',
        image: { url: '/assets/v4/meal1.svg' },
      },
      {
        title: '1x Moong Dal Chaat',
        description: '200 kcal',
        image: { url: '/assets/v4/diet1.svg' },
      },
      {
        title: '1x Puri with Aloo Poori',
        description: '280 kcal',
        image: { url: '/assets/v4/meal2.svg' },
      },
    ],
  };

  it('renders heading and subtitle', () => {
    render(<MealPanner {...mockProps} />);
    expect(screen.getByRole('heading', { name: /Healthy Meal Plan/i })).toBeInTheDocument();
    expect(screen.getByText(/Nutritious and delicious options/i)).toBeInTheDocument();
  });

  it('renders all meal cards (including duplicates in marquee)', () => {
    render(<MealPanner {...mockProps} />);
    const cardCount = mockProps.cards.length * 3; // marquee duplicates cards 3 times
    const mealTitles = mockProps.cards.map((meal) => meal.title);
    const allRenderedTitles = screen.getAllByText((content) => mealTitles.includes(content));
    expect(allRenderedTitles).toHaveLength(cardCount);
  });

  it('renders meal images with correct alt text', () => {
    render(<MealPanner {...mockProps} />);
    mockProps.cards.forEach((meal) => {
      // Since it's duplicated 3x, check that each image alt appears 3 times
      const alt = meal.title;
      expect(screen.getAllByAltText(alt)).toHaveLength(3);
    });
  });
});
