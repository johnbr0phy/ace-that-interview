'use client';

import { motion } from 'framer-motion';
import type { VideoContent as VideoContentType } from '@/lib/flow';

interface VideoContentProps {
  content: VideoContentType;
}

export function VideoContent({ content }: VideoContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 12 }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--foreground)',
          }}
        >
          {content.title}
        </h3>
        {content.duration && (
          <span
            style={{
              fontSize: 13,
              color: 'var(--secondary)',
              background: 'var(--surface-elevated)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {content.duration}
          </span>
        )}
      </div>

      {/* Video embed */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--stone-900)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <iframe
          src={content.url}
          title={content.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </motion.div>
  );
}
