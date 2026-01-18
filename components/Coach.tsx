'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';

interface CoachProps {
  message: string;
  isTyping?: boolean;
  onTypingComplete?: () => void;
}

/**
 * Coach Component
 *
 * Design tokens applied:
 * - Avatar: 56px (14 × 4px grid), full radius, primary bg, shadow-md
 * - Bubble: 24px radius (xl), 20px padding, surface-elevated bg, shadow-sm
 * - Typography: 18px, weight 400, line-height 1.6
 * - Animation: 30ms per character typewriter, 150ms micro-interactions
 */
export function Coach({ message, isTyping = true, onTypingComplete }: CoachProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(!isTyping);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onTypingComplete?.();
  }, [onTypingComplete]);

  useEffect(() => {
    if (!isTyping) {
      setDisplayedText(message);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);

    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        handleComplete();
      }
    }, 30); // 30ms per character as per design system

    return () => clearInterval(interval);
  }, [message, isTyping, handleComplete]);

  return (
    <div className="flex items-start gap-4">
      {/* Avatar - 56px, full radius, primary bg */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          duration: 0.2
        }}
        className="relative flex-shrink-0"
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <motion.div
            animate={!isComplete ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          >
            {/* Lightbulb icon - represents guidance/ideas */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18h6" />
              <path d="M10 22h4" />
              <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
            </svg>
          </motion.div>
        </div>

        {/* Pulse ring when speaking */}
        <AnimatePresence>
          {!isComplete && (
            <motion.div
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full"
              style={{ background: 'var(--primary)' }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Speech Bubble - 24px radius, 20px padding, elevated surface */}
      <motion.div
        initial={{ opacity: 0, x: -12, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.2, ease: 'easeOut' }}
        className="relative max-w-[400px]"
        style={{
          background: 'var(--surface-elevated)',
          borderRadius: '4px 24px 24px 24px',
          padding: 20,
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <p
          className="leading-relaxed"
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: 'var(--foreground)',
            lineHeight: 1.6,
          }}
        >
          {displayedText}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              className="inline-block ml-0.5 align-middle"
              style={{
                width: 2,
                height: 20,
                background: 'var(--primary)',
              }}
            />
          )}
        </p>
      </motion.div>
    </div>
  );
}
