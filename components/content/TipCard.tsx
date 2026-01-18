'use client';

import { motion } from 'framer-motion';
import type { TipCardContent } from '@/lib/flow';

interface TipCardProps {
  content: TipCardContent;
}

const iconMap = {
  lightbulb: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  star: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

const colorMap = {
  lightbulb: { bg: '#fef3c7', border: '#f59e0b', icon: '#d97706' },
  warning: { bg: '#fee2e2', border: '#ef4444', icon: '#dc2626' },
  check: { bg: '#dcfce7', border: '#22c55e', icon: '#16a34a' },
  star: { bg: '#e0e7ff', border: '#6366f1', icon: '#4f46e5' },
};

export function TipCard({ content }: TipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {content.tips.map((tip, index) => {
          const colors = colorMap[tip.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              style={{
                background: colors.bg,
                border: `2px solid ${colors.border}`,
                borderRadius: 'var(--radius-lg)',
                padding: 16,
              }}
            >
              {/* Icon and title */}
              <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
                <div style={{ color: colors.icon }}>
                  {iconMap[tip.icon]}
                </div>
                <h4
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--stone-900)',
                  }}
                >
                  {tip.title}
                </h4>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  color: 'var(--stone-700)',
                  lineHeight: 1.5,
                }}
              >
                {tip.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
