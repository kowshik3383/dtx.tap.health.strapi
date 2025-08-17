// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { test, expect } from '@playwright/experimental-ct-react';
// import PlansContainer from '../PlansContainer';
// import React from 'react';
// import { vi } from 'vitest';

// // Mock hooks and dependencies
// vi.mock('@/hooks/useAuth', () => ({
//   useAuth: () => ({ login: vi.fn() }),
// }));
// vi.mock('@/store', () => ({
//   useSubscriptionStore: () => ({
//     promotions: [],
//     plans: [
//       {
//         id: '1',
//         interval: 1,
//         isPromotional: false,
//         item: { unitAmount: 1000, originalAmount: 1200 },
//         promotion: null,
//       },
//       {
//         id: '2',
//         interval: 12,
//         isPromotional: true,
//         item: { unitAmount: 8000, originalAmount: 12000 },
//         promotion: { code: 'PROMO12', discountedAmount: 7000 },
//       },
//     ],
//     storeselectedIndex: 0,
//     createSubscription: vi.fn(),
//     storeloading: false,
//     isSubscribed: false,
//     subscriptionStatus: false,
//     subscriptionData: { cancellationRequested: false },
//   }),
// }));
// vi.mock('@/hooks/usePlans', () => ({
//   usePlans: () => ({
//     selectedIndex: 0,
//     setSelectedIndex: vi.fn(),
//     getPlanDescription: (plan: any) => `${plan.interval} month${plan.interval > 1 ? 's' : ''} plan`,
//   }),
// }));
// vi.mock('@/hooks/usePromotion', () => ({
//   usePromotion: () => ({
//     activePromotion: { discountType: 1, discountValue: 15 },
//     timeUntilEnd: '3 days',
//   }),
// }));
// vi.mock('@/utils/analytics', () => ({ trackEvent: vi.fn() }));
// vi.mock('@/utils/registerIntentEvent', () => ({ registerHigherIntentEvent: vi.fn() }));

// // Mock localStorage on window for next/navigation in JSDOM
// beforeAll(() => {
//   Object.defineProperty(window, 'localStorage', {
//     value: {
//       getItem: vi.fn(() => '9876543210'),
//       setItem: vi.fn(),
//     },
//     writable: true,
//   });
// });

// test.describe('PlansContainer', () => {
//   test('renders plans and allows clicking buy', async ({ mount }) => {
//     let initiated = false;
//     const component = await mount(
//       <PlansContainer
//         ={true}
//         token="some-token"
//         onPaymentInitiated={() => { initiated = true; }}
//       />
//     );
//     await expect(comisAuthenticatedponent.getByText('1 month plan')).toBeVisible();
//     await expect(component.getByText('12 months plan')).toBeVisible();

//     // The Buy button for the first (selected) plan should be visible
//     const buyBtn = component.getByRole('button', { name: /buy plan/i });
//     await expect(buyBtn).toBeVisible();

//     await buyBtn.click();
//     expect(initiated).toBe(true);
//   });

//   test('shows OTP modal if user not authenticated', async ({ mount }) => {
//     const component = await mount(
//       <PlansContainer isAuthenticated={false} token={null} />
//     );
//     const buyBtn = component.getByRole('button', { name: /buy plan/i });
//     await buyBtn.click();

//     // The OTPLoginModal appears (adjust text selector as it displays in your modal)
//     await expect(component.getByText(/tap health/i)).toBeVisible();
//   });

//   test('renders error popup if error state set', async ({ mount }) => {
//     const component = await mount(
//       <PlansContainer isAuthenticated={true} token="dummy-token" />
//     );
//     // Manually set error (your real tests should simulate the subscriptions error flow)
//     await component.evaluate((node: any) => {
//       node.setShowError(true);
//       node.setErrorMessage('Test Error!!');
//     });
//     await expect(component.getByText(/Test Error/i)).toBeVisible();
//   });
// });
