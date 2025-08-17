import { create } from 'zustand';

type JoinNowState = {
  joinNowVisible: boolean;
  setJoinNowVisible: (val: boolean) => void;
};

export const useJoinNowStore = create<JoinNowState>((set) => ({
  joinNowVisible: false,
  setJoinNowVisible: (val) => set({ joinNowVisible: val }),
}));

type PricingState = {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
};

export const usePricingStore = create<PricingState>((set) => ({
  selectedPlan: '',
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}));
