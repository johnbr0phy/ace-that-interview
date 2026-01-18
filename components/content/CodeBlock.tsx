'use client';

import { motion } from 'framer-motion';
import type { CodeContent } from '@/lib/flow';

interface CodeBlockProps {
  content: CodeContent;
}

// Simple syntax highlighting for Python
function highlightPython(code: string, highlightLines: number[] = []): React.ReactNode[] {
  const lines = code.split('\n');

  const keywords = ['def', 'return', 'if', 'elif', 'else', 'while', 'for', 'in', 'and', 'or', 'not', 'True', 'False', 'None', 'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'yield', 'raise', 'pass', 'break', 'continue'];
  const builtins = ['len', 'range', 'print', 'int', 'str', 'list', 'dict', 'set', 'tuple', 'bool', 'float'];

  return lines.map((line, lineIndex) => {
    const lineNumber = lineIndex + 1;
    const isHighlighted = highlightLines.includes(lineNumber);

    // Tokenize the line
    let highlighted = line;

    // Comments
    highlighted = highlighted.replace(/(#.*)$/gm, '<span class="text-stone-500">$1</span>');

    // Strings (triple quotes and regular)
    highlighted = highlighted.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"]*"|'[^']*')/g, '<span class="text-green-400">$1</span>');

    // Keywords
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'g');
      highlighted = highlighted.replace(regex, '<span class="text-purple-400">$1</span>');
    });

    // Builtins
    builtins.forEach(fn => {
      const regex = new RegExp(`\\b(${fn})\\b`, 'g');
      highlighted = highlighted.replace(regex, '<span class="text-blue-400">$1</span>');
    });

    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');

    // Function definitions
    highlighted = highlighted.replace(/\b(def\s+)(\w+)/g, '$1<span class="text-yellow-400">$2</span>');

    return (
      <div
        key={lineIndex}
        className="flex"
        style={{
          background: isHighlighted ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
          borderLeft: isHighlighted ? '3px solid var(--primary)' : '3px solid transparent',
          marginLeft: -12,
          paddingLeft: 9,
        }}
      >
        <span
          className="select-none"
          style={{
            width: 40,
            color: 'var(--stone-500)',
            textAlign: 'right',
            paddingRight: 16,
            fontSize: 13,
          }}
        >
          {lineNumber}
        </span>
        <span
          dangerouslySetInnerHTML={{ __html: highlighted || '&nbsp;' }}
          style={{ flex: 1 }}
        />
      </div>
    );
  });
}

export function CodeBlock({ content }: CodeBlockProps) {
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
        style={{
          background: 'var(--stone-800)',
          padding: '10px 16px',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}
      >
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          </div>
          {content.title && (
            <span
              style={{
                fontSize: 13,
                color: 'var(--stone-400)',
                marginLeft: 8,
              }}
            >
              {content.title}
            </span>
          )}
        </div>
        <span
          style={{
            fontSize: 12,
            color: 'var(--stone-500)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {content.language}
        </span>
      </div>

      {/* Code area */}
      <div
        style={{
          background: 'var(--stone-900)',
          padding: '16px 12px',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
          overflowY: 'auto',
          maxHeight: 300,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.5,
            color: 'var(--stone-100)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          <code>
            {highlightPython(content.code, content.highlightLines)}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
