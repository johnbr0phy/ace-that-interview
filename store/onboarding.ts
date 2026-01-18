'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { flowSteps, getStepById, getNextStepId, type FlowStep } from '@/lib/flow';

export interface OnboardingState {
  currentStepId: string;
  answers: Record<string, string | string[]>;
  history: string[];
  company: string | null;
  role: string | null;
  isComplete: boolean;
}

export interface OnboardingActions {
  setCompanyAndRole: (company: string, role: string) => void;
  getCurrentStep: () => FlowStep | undefined;
  submitAnswer: (answer: string | string[]) => void;
  goBack: () => void;
  goToStep: (stepId: string) => void;
  reset: () => void;
  completeOnboarding: () => void;
}

const initialState: OnboardingState = {
  currentStepId: 'welcome',
  answers: {},
  history: [],
  company: null,
  role: null,
  isComplete: false,
};

export const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCompanyAndRole: (company: string, role: string) => {
        set({ company, role });
      },

      getCurrentStep: () => {
        return getStepById(get().currentStepId);
      },

      submitAnswer: (answer: string | string[]) => {
        const state = get();
        const currentStep = getStepById(state.currentStepId);

        if (!currentStep) return;

        const answerValue = Array.isArray(answer) ? answer[0] : answer;
        const nextStepId = getNextStepId(currentStep, answerValue);

        set({
          answers: {
            ...state.answers,
            [state.currentStepId]: answer,
          },
          history: [...state.history, state.currentStepId],
          currentStepId: nextStepId || state.currentStepId,
        });
      },

      goBack: () => {
        const state = get();
        if (state.history.length === 0) return;

        const newHistory = [...state.history];
        const previousStepId = newHistory.pop()!;

        set({
          history: newHistory,
          currentStepId: previousStepId,
        });
      },

      goToStep: (stepId: string) => {
        const state = get();
        set({
          history: [...state.history, state.currentStepId],
          currentStepId: stepId,
        });
      },

      reset: () => {
        set(initialState);
      },

      completeOnboarding: () => {
        set({ isComplete: true });
      },
    }),
    {
      name: 'onboarding-storage',
      partialize: (state) => ({
        answers: state.answers,
        company: state.company,
        role: state.role,
        isComplete: state.isComplete,
      }),
    }
  )
);
