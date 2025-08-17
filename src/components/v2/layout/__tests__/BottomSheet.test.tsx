// import React from 'react';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { useRouter } from 'next/navigation';
// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import BottomSheet, { type Bottomsheetv2 } from '../BottomSheet';
// import type { Plan } from '@/types/strapi';
// import type { UseAuthReturn } from '@/hooks/useAuth';
// import { trackEvent, trackFacebookPixelEvent } from '@/utils/analytics';
// import { registerIntentEvent } from '@/utils/registerIntentEvent';

// // Mock types for TypeScript
// type MockUseRouterReturn = ReturnType<typeof useRouter>;
// type MockUseAuthReturn = ReturnType<typeof useAuth>;
// type MockTrackEvent = typeof trackEvent;

// // Mock implementations with proper types
// const mockPush = vi.fn<Parameters<MockUseRouterReturn['push']>, void>();
// const mockLogin = vi.fn<Parameters<MockUseAuthReturn['login']>, void>();
// const mockIsAuthenticated = false;
// const mockTrackEvent = vi.fn<Parameters<MockTrackEvent>, void>();

// // Mock modules with proper typing
// vi.mock('next/navigation', () => ({
//   useRouter: vi.fn<[], MockUseRouterReturn>(() => ({
//     push: mockPush,
//   })),
// }));

// vi.mock('@/hooks/useAuth', () => ({
//   useAuth: vi.fn<[], MockUseAuthReturn>(() => ({
//     login: mockLogin,
//     isAuthenticated: mockIsAuthenticated,
//   })),
// }));

// vi.mock('@/utils/analytics', () => ({
//   trackEvent: mockTrackEvent,
//   trackFacebookPixelEvent: vi.fn<Parameters<typeof trackFacebookPixelEvent>, void>(),
// }));

// vi.mock('@/utils/registerIntentEvent', () => ({
//   registerIntentEvent: vi.fn<Parameters<typeof registerIntentEvent>, void>(),
// }));

// // Type-safe test data
// const DEFAULT_PLAN: Plan = {
//   subscription_plan: 'basic',
//   price: '₹2399',
//   plan_validity: '1 year',
//   __typename: 'Plan',
//   plan_id: '123',
//   description: 'Basic plan',
//   features: [],
// };

// const DEFAULT_PROPS: React.ComponentProps<typeof BottomSheet> = {
//   pirce: '₹2399',
//   duration: '1 year',
//   tool_tip: 'This is a tooltip text explaining the plan details',
//   buttonText: 'Join Now',
//   plans: [DEFAULT_PLAN],
//   selectedPlan: 'basic',
//   hide: false,
// };

// describe('BottomSheet Component', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     window.scrollY = 0;
//   });

//   it('renders with all required props', () => {
//     render(<BottomSheet {...DEFAULT_PROPS} />);
//     expect(screen.getByText(DEFAULT_PROPS.buttonText)).toBeInTheDocument();
//   });

//   it('shows price and validity from the active plan', () => {
//     render(<BottomSheet {...DEFAULT_PROPS} />);
//     expect(screen.getByText(DEFAULT_PLAN.price)).toBeInTheDocument();
//     expect(screen.getByText(`for ${DEFAULT_PLAN.plan_validity}`)).toBeInTheDocument();
//   });

//   it('handles scroll visibility correctly', () => {
//     render(<BottomSheet {...DEFAULT_PROPS} />);
    
//     // Test initial not visible
//     expect(screen.getByRole('button', { name: DEFAULT_PROPS.buttonText }))
//       .toHaveClass('pointer-events-none');

//     // Simulate scroll
//     window.scrollY = 400;
//     fireEvent.scroll(window);
    
//     // Should now be visible
//     expect(screen.getByRole('button', { name: DEFAULT_PROPS.buttonText }))
//       .not.toHaveClass('pointer-events-none');
//   });

//   it('tracks analytics events on button click', () => {
//     render(<BottomSheet {...DEFAULT_PROPS} />);
//     fireEvent.click(screen.getByRole('button', { name: DEFAULT_PROPS.buttonText }));

//     expect(mockTrackEvent).toHaveBeenCalledWith('Join Now Clicked', {
//       url: window.location.href,
//       button_source: 'bottom-sheet section',
//       selected_plan: DEFAULT_PROPS.selectedPlan,
//       value: 40,
//       currency: 'INR',
//     });
//     expect(trackFacebookPixelEvent).toHaveBeenCalledWith('Join Now Clicked', {
//       url: window.location.href,
//       button_source: 'bottom-sheet section',
//       selected_plan: DEFAULT_PROPS.selectedPlan,
//     });
//     expect(registerIntentEvent).toHaveBeenCalledWith('Join Now Clicked');
//   });

//   it('redirects authenticated users to /plans', () => {
//     // Override auth mock for this test
//     vi.mocked(useAuth).mockReturnValue({
//       login: mockLogin,
//       isAuthenticated: true,
//     });

//     render(<BottomSheet {...DEFAULT_PROPS} />);
//     fireEvent.click(screen.getByRole('button', { name: DEFAULT_PROPS.buttonText }));

//     expect(mockPush).toHaveBeenCalledWith('/plans');
//   });

//   it('shows login modal for unauthenticated users', () => {
//     render(<BottomSheet {...DEFAULT_PROPS} />);
//     fireEvent.click(screen.getByRole('button', { name: DEFAULT_PROPS.buttonText }));
    
//     expect(screen.getByRole('dialog')).toBeInTheDocument();
//   });

//   it('closes tooltip when close button is clicked', () => {
//     render(<BottomSheet {...DEFAULT_PROPS} />);
//     fireEvent.click(screen.getByRole('button', { name: '✕' }));
    
//     expect(screen.queryByText(DEFAULT_PROPS.tool_tip)).not.toBeInTheDocument();
//   });
// });

// // Utility for mocking window properties
// function mockWindowProperty(property: string, value: unknown) {
//   Object.defineProperty(window, property, {
//     configurable: true,
//     writable: true,
//     value,
//   });
// }

// // Setup window mocks
// beforeAll(() => {
//   mockWindowProperty('scrollY', 0);
// });

// afterEach(() => {
//   mockWindowProperty('scrollY', 0);
// });
