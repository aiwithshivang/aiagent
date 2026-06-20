import React, { useState, useEffect } from 'react';
import { WidgetCard } from './WidgetCard';

const MODELS = [
  { name: 'GPT-4o', usage: 42, color: 'var(--accent-cyan)' },
  { name: 'Claude Sonnet', usage: 28, color: 'var(--accent-purple)' },
  { name: 'Gemini Pro', usage: 18, color: 'var(--accent-pink)' },
  { name: 'Mistral', usage: 12, color: 'var(--accent-orange)' },
];

export const AIModelUsageWidget = () => {
  const [widths, setWidths] = useState(MODELS.map(() => 0));

  useEffect(() => {
    const t = setTimeout(() => setWidths(MODELS.map(m => m.usage)), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <WidgetCard glowColor="purple">
      <div className="card-header" style={{ marginBottom: 16 }}>
        <h3 className="card-title" style={{ color: 'var(--accent-purple)' }}>Most Used AI Models</h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-purple)', background: 'rgba(157,0,255,0.15)', padding: '3px 8px', borderRadius: 4 }}>
          LIVE
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MODELS.map((m, i) => (
          <div key={m.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-primary)' }}>{m.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: m.color }}>{m.usage}%</span>
            </div>
            <div className="neon-progress">
              <div className="neon-progress-fill" style={{
                width: `${widths[i]}%`,
                background: `linear-gradient(90deg, ${m.color}99, ${m.color})`,
                boxShadow: `0 0 10px ${m.color}88`,
                transition: `width 1.2s cubic-bezier(0.23,1,0.32,1) ${i * 0.15}s`
              }} />
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};
