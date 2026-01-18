'use client';

import { motion } from 'framer-motion';
import type { QuestionOption } from '@/lib/flow';

interface MultipleChoiceProps {
  options: QuestionOption[];
  onSelect: (optionId: string) => void;
  selectedId?: string;
}

/**
 * MultipleChoice Component
 *
 * Renders only the options - question heading is rendered by parent.
 * Only the checkmark animates on selection.
 */
export function MultipleChoice({ options, onSelect, selectedId }: MultipleChoiceProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
              className="w-full text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:scale-[1.01] active:scale-[0.99]"
              style={{
                padding: 16,
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--faint)'}`,
                background: isSelected ? 'var(--primary-light)' : 'var(--surface)',
                transitionDuration: '150ms',
                transitionTimingFunction: 'var(--ease-out)',
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: 'var(--foreground)',
                    }}
                  >
                    {option.label}
                  </p>
                  {option.description && (
                    <p
                      style={{
                        fontSize: 14,
                        color: 'var(--secondary)',
                        marginTop: 4,
                      }}
                    >
                      {option.description}
                    </p>
                  )}
                </div>

                {/* Radio indicator */}
                <div
                  className="flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 'var(--radius-full)',
                    border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--faint)'}`,
                    background: isSelected ? 'var(--primary)' : 'transparent',
                    transitionDuration: '150ms',
                  }}
                >
                  {isSelected && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
