'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface CoachProps {
  message: string;
  onAnimationComplete?: () => void;
}

/**
 * Coach Component
 *
 * Design tokens applied:
 * - Avatar: 56px (14 × 4px grid), full radius, primary bg, shadow-md
 * - Bubble: 24px radius (xl), 20px padding, surface-elevated bg, shadow-sm
 * - Typography: 18px, weight 400, line-height 1.6
 * - Animation: Sequenced fade-in, no typewriter
 */
export function Coach({ message, onAnimationComplete }: CoachProps) {
  // Trigger callback after animations complete (avatar + bubble)
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, 400); // Avatar (200ms) + Bubble (200ms with 150ms delay)
    return () => clearTimeout(timer);
  }, [message, onAnimationComplete]);

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
        </div>
      </motion.div>

      {/* Speech Bubble - 24px radius, 20px padding, elevated surface */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
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
          {message}
        </p>
      </motion.div>
    </div>
  );
}
