'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { QuestionOption } from '@/lib/flow';

interface MultiSelectProps {
  question: string;
  options: QuestionOption[];
  onSubmit: (selectedIds: string[]) => void;
  minSelect?: number;
  maxSelect?: number;
}

/**
 * MultiSelect Component
 *
 * No internal animations - parent handles fade-in.
 * Only the checkmark animates on selection.
 */
export function MultiSelect({
  question,
  options,
  onSubmit,
  minSelect = 1,
  maxSelect = options.length,
}: MultiSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (optionId: string) => {
    setSelected((prev) => {
      if (prev.includes(optionId)) {
        return prev.filter((id) => id !== optionId);
      }
      if (prev.length >= maxSelect) {
        return prev;
      }
      return [...prev, optionId];
    });
  };

  const canSubmit = selected.length >= minSelect && selected.length <= maxSelect;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Question heading */}
      <h2
        style={{
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'var(--foreground)',
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        {question}
      </h2>

      {/* Helper text */}
      <p
        style={{
          fontSize: 14,
          color: 'var(--secondary)',
          textAlign: 'center',
          marginBottom: 24,
        }}
      >
        Select {minSelect === maxSelect ? minSelect : `${minSelect}-${maxSelect}`} option
        {maxSelect > 1 ? 's' : ''}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
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

                {/* Checkbox indicator */}
                <div
                  className="flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 'var(--radius-sm)',
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

      {/* Submit button */}
      <button
        onClick={() => canSubmit && onSubmit(selected)}
        disabled={!canSubmit}
        className="w-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          height: 52,
          marginTop: 24,
          borderRadius: 'var(--radius-md)',
          fontSize: 17,
          fontWeight: 600,
          background: canSubmit ? 'var(--primary)' : 'var(--faint)',
          color: canSubmit ? 'white' : 'var(--muted)',
          boxShadow: canSubmit ? 'var(--shadow-md)' : 'none',
          cursor: canSubmit ? 'pointer' : 'not-allowed',
          transitionDuration: '150ms',
        }}
      >
        Continue
      </button>
    </div>
  );
}
