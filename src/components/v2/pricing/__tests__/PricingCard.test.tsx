// import { fireEvent, render, screen } from '@testing-library/react';
// import { vi } from 'vitest';
// import PricingCard from '../Pricing';


// vi.mock('next/navigation', () => ({
//   useRouter: () => ({ push: vi.fn() }),
//   usePathname: () => '/',
// }));

// vi.mock('@/hooks/useAuth', () => ({
//   useAuth: () => ({
//     isAuthenticated: false,
//     login: vi.fn(),
//   }),
// }));

// const mockSetSelectedPlan = vi.fn();
// const mockSetJoinNowVisible = vi.fn();

// const mockPlans = [
//   {
//     subscription_plan: 'Yearly',
//     plan_validity: 'Billed every 2 months',
//     save: 'SAVE 40%',
//     price: '₹3999',
//     price_per_month: '₹333/mo',
//   },
//   {
//     subscription_plan: 'Monthly',
//     plan_validity: 'Billed every 1 month',
//     save: '',
//     price: '₹499',
//     price_per_month: '₹499/mo',
//   },
// ];

// describe('PricingCard Component', () => {
//   it('renders titles correctly', () => {
//     render(
//       <PricingCard
//         highlighted_title="Affordable"
//         title_line_1="plans for your"
//         title_line_2="health journey"
//         plans={mockPlans}
//         selectedPlan="Monthly"
//         setSelectedPlan={mockSetSelectedPlan}
//         setJoinNowVisible={mockSetJoinNowVisible}
//       />
//     );

//     expect(screen.getByText(/Affordable/i)).toBeInTheDocument();
//     expect(screen.getByText(/plans for your/i)).toBeInTheDocument();
//     expect(screen.getByText(/health journey/i)).toBeInTheDocument();
//   });

//   it('renders all plans with correct data', () => {
//     render(
//       <PricingCard
//         highlighted_title="Choose"
//         title_line_1="your plan"
//         title_line_2=""
//         plans={mockPlans}
//         selectedPlan="Monthly"
//         setSelectedPlan={mockSetSelectedPlan}
//         setJoinNowVisible={mockSetJoinNowVisible}
//       />
//     );

//     expect(screen.getByText('Monthly')).toBeInTheDocument();
//     expect(screen.getByText('Yearly')).toBeInTheDocument();
//     expect(screen.getByText('₹499')).toBeInTheDocument();
//     expect(screen.getByText('₹3999')).toBeInTheDocument();
//     expect(screen.getByText(/SAVE 40%/i)).toBeInTheDocument();
//   });

//   it('triggers setSelectedPlan on clicking a plan', () => {
//     render(
//       <PricingCard
//         highlighted_title=""
//         title_line_1=""
//         title_line_2=""
//         plans={mockPlans}
//         selectedPlan="Monthly"
//         setSelectedPlan={mockSetSelectedPlan}
//         setJoinNowVisible={mockSetJoinNowVisible}
//       />
//     );

//     fireEvent.click(screen.getByText('Yearly'));
//     expect(mockSetSelectedPlan).toHaveBeenCalledWith('Yearly');
//   });

//   it('shows Join Now button with selected plan price', () => {
//     render(
//       <PricingCard
//         highlighted_title=""
//         title_line_1=""
//         title_line_2=""
//         plans={mockPlans}
//         selectedPlan="Yearly"
//         setSelectedPlan={mockSetSelectedPlan}
//         setJoinNowVisible={mockSetJoinNowVisible}
//       />
//     );

//     expect(screen.getByText(/Join Now at ₹3999/)).toBeInTheDocument();
//   });
// });
