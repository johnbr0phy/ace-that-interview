'use client';

import { motion } from 'framer-motion';
import type { DiagramContent as DiagramContentType } from '@/lib/flow';

interface DiagramContentProps {
  content: DiagramContentType;
}

interface ComplexityItem {
  name: string;
  label: string;
  color: string;
  example: string;
}

function ComplexityChart({ data }: { data: { complexities: ComplexityItem[] } }) {
  const complexities = data.complexities;

  // Calculate bar widths (exponential scale visualization)
  const widths = [8, 15, 30, 50, 75, 100];

  return (
    <div className="flex flex-col gap-3">
      {complexities.map((item, index) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="flex items-center gap-3"
        >
          {/* Label */}
          <div
            style={{
              width: 80,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
              color: 'var(--foreground)',
              textAlign: 'right',
            }}
          >
            {item.name}
          </div>

          {/* Bar */}
          <div
            style={{
              flex: 1,
              height: 32,
              background: 'var(--surface-elevated)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${widths[index]}%` }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: item.color,
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'white',
                  whiteSpace: 'nowrap',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                {item.label}
              </span>
            </motion.div>
          </div>

          {/* Example */}
          <div
            style={{
              width: 120,
              fontSize: 12,
              color: 'var(--secondary)',
            }}
          >
            {item.example}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function DiagramContent({ content }: DiagramContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Title */}
      {content.title && (
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--foreground)',
            marginBottom: 16,
          }}
        >
          {content.title}
        </h3>
      )}

      {/* Diagram container */}
      <div
        style={{
          background: 'var(--surface)',
          border: '2px solid var(--faint)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
        }}
      >
        {content.diagramType === 'complexity' && (
          <ComplexityChart data={content.data as { complexities: ComplexityItem[] }} />
        )}

        {/* Legend */}
        <div
          className="flex items-center justify-center gap-6"
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid var(--faint)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: '#22c55e',
              }}
            />
            <span style={{ fontSize: 12, color: 'var(--secondary)' }}>Fast</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: '#eab308',
              }}
            />
            <span style={{ fontSize: 12, color: 'var(--secondary)' }}>Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: '#ef4444',
              }}
            />
            <span style={{ fontSize: 12, color: 'var(--secondary)' }}>Slow</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
