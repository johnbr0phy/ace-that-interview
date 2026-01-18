'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TextInputProps {
  question: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
}

/**
 * TextInput Component
 *
 * Design tokens applied:
 * - Input: 52px height, 16px 20px padding, 12px radius, 2px border
 * - Button: 52px height, 12px radius, primary bg
 * - Typography: 24px question, 16px input text
 * - Focus: 3px primary-light ring
 */
export function TextInput({ question, placeholder = 'Type your answer...', onSubmit }: TextInputProps) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
    }
  };

  const canSubmit = value.trim().length > 0;

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Question heading */}
      <motion.h2
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'var(--foreground)',
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        {question}
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2 }}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* Input field */}
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full outline-none transition-all"
            style={{
              height: 52,
              padding: '16px 20px',
              fontSize: 16,
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${isFocused ? 'var(--primary)' : 'var(--faint)'}`,
              background: 'var(--surface)',
              color: 'var(--foreground)',
              boxShadow: isFocused ? '0 0 0 3px var(--primary-light)' : 'none',
              transitionDuration: '150ms',
              transitionTimingFunction: 'var(--ease-out)',
            }}
          />
        </div>

        {/* Submit button */}
        <motion.button
          whileHover={canSubmit ? { scale: 1.01 } : {}}
          whileTap={canSubmit ? { scale: 0.99 } : {}}
          type="submit"
          disabled={!canSubmit}
          className="w-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            height: 52,
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
        </motion.button>
      </motion.form>
    </div>
  );
}
