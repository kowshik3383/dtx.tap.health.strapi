'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
	createSubscriptionSlice,
	SubscriptionSlice,
} from './slices/subscriptionSlice';

// Combine all slices here
type StoreState = SubscriptionSlice;

// Create the store with all slices and persistence
export const useStore = create<StoreState>()(
	persist(
		(...args) => ({
			...createSubscriptionSlice(...args),
			// Add other slices here as needed
		}),
		{
			name: 'subscription-storage', // unique name for localStorage key
			partialize: state => ({
				// Only persist these specific fields
				subscriptionData: state.subscriptionData,
				subscribedPlan: state.subscribedPlan,
				isSubscribed: state.isSubscribed,
			}),
		},
	),
);

// Export named stores for specific slices
export const useSubscriptionStore = useStore;

// Re-export types for convenience
export * from './types/subscription.types';