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
import { VideoContent, CodeBlock, DiagramContent, LongTextContent, TipCard } from '@/components/content';

interface OnboardingFlowProps {
  company: string;
  role: string;
}

/**
 * OnboardingFlow Component
 *
 * Orchestrates the complete onboarding experience:
 * - Welcome → Questions → Content → Loading → Plan Reveal
 * - Handles step transitions with AnimatePresence
 * - Manages state through Zustand store
 *
 * Animation sequence: Coach (0ms) → Content/Question (400ms) → Options (600ms)
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
  const [showQuestion, setShowQuestion] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Initialize company and role on mount
  useEffect(() => {
    setCompanyAndRole(company, role);
  }, [company, role, setCompanyAndRole]);

  const currentStep = getCurrentStep();

  // Reset states when step changes
  useEffect(() => {
    setSelectedOption(null);
    setShowQuestion(false);
    setShowOptions(false);
    setShowContent(false);
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

  // Handle content continue
  const handleContentContinue = () => {
    if (currentStep?.nextStep) {
      goToStep(currentStep.nextStep);
    }
  };

  if (!currentStep) {
    return null;
  }

  // Render the appropriate content component
  const renderContent = () => {
    if (!currentStep.content) return null;

    switch (currentStep.content.type) {
      case 'video':
        return <VideoContent content={currentStep.content} />;
      case 'code':
        return <CodeBlock content={currentStep.content} />;
      case 'diagram':
        return <DiagramContent content={currentStep.content} />;
      case 'long-text':
        return <LongTextContent content={currentStep.content} />;
      case 'tip-card':
        return <TipCard content={currentStep.content} />;
      default:
        return null;
    }
  };

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
                {/* Coach message - appears first */}
                <div style={{ marginBottom: 32, minHeight: 80 }}>
                  <Coach
                    message={currentStep.coachMessage}
                    onAnimationComplete={() => {
                      setShowQuestion(true);
                      // Show options 200ms after question
                      setTimeout(() => setShowOptions(true), 200);
                    }}
                  />
                </div>

                {/* Question heading - fades in after coach */}
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: showQuestion ? 1 : 0,
                    y: showQuestion ? 0 : 12,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--foreground)',
                    marginBottom: 24,
                    textAlign: 'center',
                  }}
                >
                  {currentStep.question || '\u00A0'}
                </motion.h2>

                {/* Options - fade in after question */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: showOptions ? 1 : 0,
                    y: showOptions ? 0 : 12,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    pointerEvents: showOptions ? 'auto' : 'none',
                  }}
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

          {/* Content screens (video, code, diagrams, etc.) */}
          {currentStep.type === 'content' && (
            <div
              className="min-h-screen flex flex-col items-center"
              style={{ padding: '80px 24px 24px' }}
            >
              <div className="w-full max-w-2xl">
                {/* Coach message - appears first */}
                <div style={{ marginBottom: 32 }}>
                  <Coach
                    message={currentStep.coachMessage}
                    onAnimationComplete={() => setShowContent(true)}
                  />
                </div>

                {/* Content - fades in after coach */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: showContent ? 1 : 0,
                    y: showContent ? 0 : 12,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {renderContent()}

                  {/* Continue button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showContent ? 1 : 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    onClick={handleContentContinue}
                    className="w-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      marginTop: 32,
                      padding: '16px 24px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--primary)',
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 600,
                      boxShadow: 'var(--shadow-md)',
                      pointerEvents: showContent ? 'auto' : 'none',
                    }}
                  >
                    Continue
                  </motion.button>
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
