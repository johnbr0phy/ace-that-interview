'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { LongTextContent as LongTextContentType } from '@/lib/flow';

interface LongTextContentProps {
  content: LongTextContentType;
}

// Simple markdown parser for basic formatting
function parseMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const ListTag = listType === 'ol' ? 'ol' : 'ul';
      elements.push(
        <ListTag
          key={`list-${elements.length}`}
          style={{
            margin: '12px 0',
            paddingLeft: 24,
            color: 'var(--foreground)',
            lineHeight: 1.7,
          }}
        >
          {listItems.map((item, i) => (
            <li key={i} style={{ marginBottom: 4 }}>
              {parseInline(item)}
            </li>
          ))}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  const parseInline = (text: string): React.ReactNode => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Code
    text = text.replace(/`(.+?)`/g, '<code style="background: var(--surface-elevated); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 13px;">$1</code>');
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  lines.forEach((line, index) => {
    // H2
    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2
          key={index}
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--foreground)',
            marginTop: index === 0 ? 0 : 24,
            marginBottom: 12,
          }}
        >
          {line.replace('## ', '')}
        </h2>
      );
      return;
    }

    // H3
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3
          key={index}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--foreground)',
            marginTop: 20,
            marginBottom: 8,
          }}
        >
          {line.replace('### ', '')}
        </h3>
      );
      return;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      listItems.push(line.replace('- ', ''));
      return;
    }

    // Ordered list
    const orderedMatch = line.match(/^(\d+)\. (.+)/);
    if (orderedMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      listItems.push(orderedMatch[2]);
      return;
    }

    // Empty line
    if (line.trim() === '') {
      flushList();
      return;
    }

    // Paragraph
    flushList();
    elements.push(
      <p
        key={index}
        style={{
          fontSize: 15,
          color: 'var(--foreground)',
          lineHeight: 1.7,
          marginBottom: 12,
        }}
      >
        {parseInline(line)}
      </p>
    );
  });

  flushList();
  return elements;
}

export function LongTextContent({ content }: LongTextContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 16 }}
      >
        <div className="flex items-center gap-3">
          {/* Book icon */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <div>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--foreground)',
              }}
            >
              {content.title}
            </h3>
            {content.readingTime && (
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--secondary)',
                }}
              >
                {content.readingTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          background: 'var(--surface)',
          border: '2px solid var(--faint)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ height: isExpanded ? 'auto' : 280 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: 24,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {parseMarkdown(content.content)}

          {/* Gradient fade */}
          {!isExpanded && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 80,
                background: 'linear-gradient(transparent, var(--surface))',
                pointerEvents: 'none',
              }}
            />
          )}
        </motion.div>

        {/* Expand button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full transition-colors"
          style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--faint)',
            background: 'var(--surface-elevated)',
            color: 'var(--primary)',
            fontSize: 14,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {isExpanded ? 'Show less' : 'Read more'}
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </motion.svg>
        </button>
      </div>
    </motion.div>
  );
}
