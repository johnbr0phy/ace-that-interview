'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Coach } from '@/components/Coach';

interface LoadingProps {
  onComplete: () => void;
}

/**
 * Loading Screen
 *
 * Design tokens applied:
 * - Progress bar: 8px height, full radius, brand gradient fill
 * - Card: surface-elevated bg, 24px padding, 16px radius
 * - Spinner: 24px, 3px border, primary color
 * - Animation: smooth progress, stage transitions
 */

const loadingStages = [
  { message: 'Analyzing your experience level...', duration: 1200 },
  { message: 'Identifying key focus areas...', duration: 1000 },
  { message: 'Reviewing company-specific patterns...', duration: 1200 },
  { message: 'Building your personalized plan...', duration: 1100 },
];

export function Loading({ onComplete }: LoadingProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStage >= loadingStages.length) {
      setTimeout(onComplete, 400);
      return;
    }

    const stageDuration = loadingStages[currentStage].duration;
    const progressPerStage = 100 / loadingStages.length;
    const targetProgress = (currentStage + 1) * progressPerStage;

    // Animate progress smoothly
    const startProgress = currentStage * progressPerStage;
    const startTime = Date.now();

    const animateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / stageDuration, 1);
      const currentProgress = startProgress + (progressRatio * progressPerStage);
      setProgress(currentProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);

    // Move to next stage
    const timeout = setTimeout(() => {
      setCurrentStage((prev) => prev + 1);
    }, stageDuration);

    return () => clearTimeout(timeout);
  }, [currentStage, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ padding: 24 }}
    >
      <div className="w-full max-w-lg">
        {/* Coach message */}
        <div style={{ marginBottom: 32 }}>
          <Coach
            message="Give me a moment while I analyze your profile and create something special for you..."
            isTyping={false}
          />
        </div>

        {/* Loading card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Progress bar */}
          <div
            style={{
              height: 8,
              borderRadius: 'var(--radius-full)',
              background: 'var(--surface-elevated)',
              marginBottom: 24,
              overflow: 'hidden',
            }}
          >
            <motion.div
              className="h-full bg-brand-gradient"
              style={{
                width: `${progress}%`,
                borderRadius: 'var(--radius-full)',
                transition: 'width 100ms linear',
              }}
            />
          </div>

          {/* Current stage card */}
          <div
            style={{
              background: 'var(--surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
            }}
          >
            <AnimatePresence mode="wait">
              {currentStage < loadingStages.length && (
                <motion.div
                  key={currentStage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Spinner */}
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 'var(--radius-full)',
                        border: '3px solid var(--faint)',
                        borderTopColor: 'var(--primary)',
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: 'var(--foreground)',
                    }}
                  >
                    {loadingStages[currentStage].message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Completed stages */}
            {currentStage > 0 && (
              <div
                className="flex flex-col gap-2"
                style={{ marginTop: 20 }}
              >
                {loadingStages.slice(0, currentStage).map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      style={{
                        fontSize: 14,
                        color: 'var(--secondary)',
                      }}
                    >
                      {stage.message.replace('...', '')}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
