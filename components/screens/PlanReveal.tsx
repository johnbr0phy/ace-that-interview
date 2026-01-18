'use client';

import { motion, type Variants } from 'framer-motion';
import { Coach } from '@/components/Coach';
import { useOnboardingStore } from '@/store/onboarding';
import { getCompanyConfig, getRoleConfig } from '@/lib/themes';

interface PlanRevealProps {
  company: string;
  role: string;
}

/**
 * PlanReveal Screen
 *
 * Design tokens applied:
 * - Hero card: brand gradient bg, 24px padding, 16px radius
 * - Content cards: surface-elevated bg, 20px padding, 16px radius
 * - Buttons: 52px primary, 48px secondary
 * - Typography: 20px card title, 16px body
 */

interface FocusArea {
  name: string;
  priority: 'High' | 'Medium';
  hours: string;
}

function generatePlan(answers: Record<string, string | string[]>, company: string) {
  const timeline = answers['timeline'] as string;
  const weakAreas = (answers['weak-areas'] as string[]) || [];

  const focusAreas: FocusArea[] = weakAreas.map((area) => {
    switch (area) {
      case 'data-structures':
        return { name: 'Data Structures', priority: 'High', hours: '8-10 hrs/week' };
      case 'algorithms':
        return { name: 'Algorithms', priority: 'High', hours: '8-10 hrs/week' };
      case 'system-design':
        return { name: 'System Design', priority: 'Medium', hours: '4-6 hrs/week' };
      case 'communication':
        return { name: 'Communication Skills', priority: 'Medium', hours: '2-3 hrs/week' };
      default:
        return { name: area, priority: 'Medium', hours: '4-6 hrs/week' };
    }
  });

  const timelineText = {
    'this-week': '5 days',
    '1-2-weeks': '2 weeks',
    '1-month': '4 weeks',
    'exploring': '8 weeks',
  }[timeline] || '4 weeks';

  return {
    focusAreas: focusAreas.length > 0 ? focusAreas : [
      { name: 'Core Preparation', priority: 'High' as const, hours: '6-8 hrs/week' },
    ],
    timelineText,
    recommendations: [
      `Focus on ${company}-specific interview patterns`,
      'Practice with timed mock interviews',
      'Review common behavioral questions',
    ],
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
};

export function PlanReveal({ company, role }: PlanRevealProps) {
  const { answers } = useOnboardingStore();
  const companyConfig = getCompanyConfig(company);
  const roleConfig = getRoleConfig(role);
  const plan = generatePlan(answers, company);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ padding: 24 }}
    >
      <div className="w-full max-w-lg">
        {/* Coach celebration */}
        <div style={{ marginBottom: 32 }}>
          <Coach
            message={`Great news! I've created a personalized ${plan.timelineText} plan for your ${roleConfig.displayName} interview at ${companyConfig?.displayName || company}.`}
            isTyping={false}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {/* Hero card with gradient */}
          <motion.div
            variants={itemVariants}
            className="bg-brand-gradient"
            style={{
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              color: 'white',
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Your Personalized Plan
            </h2>
            <p style={{ opacity: 0.9 }}>
              {plan.timelineText} &bull; {plan.focusAreas.length} focus area{plan.focusAreas.length > 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Focus areas card */}
          <motion.div
            variants={itemVariants}
            style={{
              background: 'var(--surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--foreground)',
                marginBottom: 16,
              }}
            >
              Focus Areas
            </h3>

            <div className="flex flex-col gap-3">
              {plan.focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                  style={{
                    paddingBottom: index < plan.focusAreas.length - 1 ? 12 : 0,
                    borderBottom: index < plan.focusAreas.length - 1 ? '1px solid var(--faint)' : 'none',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 12,
                        fontWeight: 500,
                        background: area.priority === 'High'
                          ? 'var(--primary-light)'
                          : 'var(--surface)',
                        color: area.priority === 'High'
                          ? 'var(--primary-dark)'
                          : 'var(--secondary)',
                        border: area.priority === 'High'
                          ? 'none'
                          : '1px solid var(--faint)',
                      }}
                    >
                      {area.priority}
                    </span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: 'var(--foreground)',
                      }}
                    >
                      {area.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      color: 'var(--secondary)',
                    }}
                  >
                    {area.hours}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations card */}
          <motion.div
            variants={itemVariants}
            style={{
              background: 'var(--surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
            }}
          >
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--foreground)',
                marginBottom: 16,
              }}
            >
              Recommendations
            </h3>

            <ul className="flex flex-col gap-3">
              {plan.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary-light)',
                      marginTop: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: 'var(--primary-dark)',
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      color: 'var(--secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {rec}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3"
            style={{ marginTop: 8 }}
          >
            <button
              className="w-full transition-all"
              style={{
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary)',
                color: 'white',
                fontSize: 17,
                fontWeight: 600,
                boxShadow: 'var(--shadow-md)',
              }}
            >
              Start Practicing Now
            </button>

            <button
              className="w-full transition-all"
              style={{
                height: 48,
                borderRadius: 'var(--radius-md)',
                background: 'transparent',
                color: 'var(--primary)',
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              Save Plan & Create Account
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
