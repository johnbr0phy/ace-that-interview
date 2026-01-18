'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOnboardingStore } from '@/store/onboarding';
import { getStepById } from '@/lib/flow';
import { Welcome } from '@/components/screens/Welcome';
import { Loading } from '@/components/screens/Loading';
import { PlanReveal } from '@/components/screens/PlanReveal';
import { Coach } from '@/components/Coach';
import { MultipleChoice } from '@/components/questions/MultipleChoice';
import { MultiSelect } from '@/components/questions/MultiSelect';

interface OnboardingFlowProps {
  company: string;
  role: string;
}

/**
 * OnboardingFlow Component
 *
 * Orchestrates the complete onboarding experience:
 * - Welcome → Questions → Loading → Plan Reveal
 * - Handles step transitions with AnimatePresence
 * - Manages state through Zustand store
 */
export function OnboardingFlow({ company, role }: OnboardingFlowProps) {
  const {
    currentStepId,
    setCompanyAndRole,
    getCurrentStep,
    submitAnswer,
    goToStep,
    history,
    goBack,
  } = useOnboardingStore();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Initialize company and role on mount
  useEffect(() => {
    setCompanyAndRole(company, role);
  }, [company, role, setCompanyAndRole]);

  const currentStep = getCurrentStep();

  // Reset states when step changes
  useEffect(() => {
    setSelectedOption(null);
    setIsTypingComplete(false);
  }, [currentStepId]);

  // Handle selection for multiple choice (auto-advance after delay)
  const handleMultipleChoiceSelect = (optionId: string) => {
    setSelectedOption(optionId);
    // Auto-advance after brief delay to show selection
    setTimeout(() => {
      submitAnswer(optionId);
    }, 300);
  };

  // Handle multi-select submission
  const handleMultiSelectSubmit = (selectedIds: string[]) => {
    submitAnswer(selectedIds);
  };

  if (!currentStep) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--surface)' }}
    >
      {/* Back button */}
      <AnimatePresence>
        {history.length > 0 && currentStep.type !== 'loading' && currentStep.type !== 'plan' && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            onClick={goBack}
            className="fixed top-6 left-6 flex items-center gap-2 z-10 transition-colors"
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--surface-elevated)',
              color: 'var(--secondary)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main content with transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Welcome screen */}
          {currentStep.type === 'welcome' && (
            <Welcome
              company={company}
              role={role}
              onContinue={() => goToStep('timeline')}
            />
          )}

          {/* Question screens */}
          {currentStep.type === 'question' && (
            <div
              className="min-h-screen flex flex-col items-center"
              style={{ padding: '80px 24px 24px' }}
            >
              <div className="w-full max-w-lg">
                {/* Coach message - fixed height container */}
                <div style={{ marginBottom: 32, minHeight: 80 }}>
                  <Coach
                    message={currentStep.coachMessage}
                    onTypingComplete={() => setIsTypingComplete(true)}
                  />
                </div>

                {/* Question heading - always visible */}
                {currentStep.question && (
                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: 'var(--foreground)',
                      marginBottom: 24,
                      textAlign: 'center',
                    }}
                  >
                    {currentStep.question}
                  </h2>
                )}

                {/* Options - fade in after typing */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isTypingComplete ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ pointerEvents: isTypingComplete ? 'auto' : 'none' }}
                >
                  {currentStep.questionType === 'multiple-choice' && currentStep.options && (
                    <MultipleChoice
                      options={currentStep.options}
                      onSelect={handleMultipleChoiceSelect}
                      selectedId={selectedOption || undefined}
                    />
                  )}

                  {currentStep.questionType === 'multi-select' && currentStep.options && (
                    <MultiSelect
                      options={currentStep.options}
                      onSubmit={handleMultiSelectSubmit}
                      minSelect={currentStep.minSelect}
                      maxSelect={currentStep.maxSelect}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {/* Loading screen */}
          {currentStep.type === 'loading' && (
            <Loading onComplete={() => goToStep('plan')} />
          )}

          {/* Plan reveal screen */}
          {currentStep.type === 'plan' && (
            <PlanReveal company={company} role={role} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
