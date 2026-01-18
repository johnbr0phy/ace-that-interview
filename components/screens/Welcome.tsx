'use client';

import { motion } from 'framer-motion';
import { Coach } from '@/components/Coach';
import { getCompanyConfig, getRoleConfig } from '@/lib/themes';

interface WelcomeProps {
  company: string;
  role: string;
  onContinue: () => void;
}

/**
 * Welcome Screen
 *
 * Design tokens applied:
 * - Layout: centered, max-w-lg, 24px padding
 * - Badge: primary-light bg, 12px radius, primary text
 * - Card: surface-elevated bg, 16px padding, 16px radius
 * - Button: 52px height, 12px radius, primary bg, shadow-md
 * - Typography: 16px body, 15px list items
 */
export function Welcome({ company, role, onContinue }: WelcomeProps) {
  const companyConfig = getCompanyConfig(company);
  const roleConfig = getRoleConfig(role);

  const valueProps = [
    'Understand your current preparation level',
    'Identify your key focus areas',
    'Create a personalized study plan',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ padding: 24 }}
    >
      <div className="w-full max-w-lg">
        {/* Company Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex justify-center"
          style={{ marginBottom: 32 }}
        >
          <div
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-light)',
              border: '2px solid var(--primary)',
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--primary-dark)',
              }}
            >
              {companyConfig?.displayName || company} {roleConfig.icon}
            </span>
          </div>
        </motion.div>

        {/* Coach Introduction */}
        <div style={{ marginBottom: 32 }}>
          <Coach
            message={`Hi there! I'm your interview coach, and I'm excited to help you prepare for your ${roleConfig.displayName} interview at ${companyConfig?.displayName || company}.`}
          />
        </div>

        {/* Value Proposition Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        >
          <div
            style={{
              background: 'var(--surface-elevated)',
              borderRadius: 'var(--radius-lg)',
              padding: 20,
              marginBottom: 24,
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
              In the next 2 minutes, I'll help you:
            </h3>

            <ul className="flex flex-col gap-3">
              {valueProps.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 'var(--radius-full)',
                      background: 'var(--primary-light)',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: 15,
                      color: 'var(--secondary)',
                    }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onContinue}
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
            Let's Get Started
          </motion.button>

          {/* Helper text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4 }}
            style={{
              textAlign: 'center',
              fontSize: 14,
              color: 'var(--muted)',
              marginTop: 16,
            }}
          >
            No signup required to get your personalized plan
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
