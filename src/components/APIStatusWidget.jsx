import React, { useState, useEffect } from 'react';
import { WidgetCard } from './WidgetCard';
import { Activity } from 'lucide-react';

const ENDPOINTS = [
  { name: '/api/v2/predict', latency: 42, status: 'OK' },
  { name: '/api/v2/generate', latency: 118, status: 'OK' },
  { name: '/api/v2/embed', latency: 23, status: 'OK' },
  { name: '/api/v2/batch', latency: 891, status: 'SLOW' },
  { name: '/api/v2/classify', latency: 67, status: 'OK' },
];

export const APIStatusWidget = () => {
  const [latencies, setLatencies] = useState(ENDPOINTS.map(e => e.latency));

  useEffect(() => {
    const interval = setInterval(() => {
      setLatencies(prev => prev.map(l => Math.max(15, l + Math.floor((Math.random() - 0.5) * 30))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (l) => l < 100 ? 'var(--accent-green)' : l < 500 ? 'var(--accent-orange)' : 'var(--accent-red)';

  return (
    <WidgetCard glowColor="green">
      <div className="card-header" style={{ marginBottom: 16 }}>
        <h3 className="card-title" style={{ color: 'var(--accent-green)' }}>API Endpoint Health</h3>
        <Activity size={16} color="var(--accent-green)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {ENDPOINTS.map((ep, i) => {
          const lat = latencies[i];
          const color = getColor(lat);
          return (
            <div key={ep.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, flex: 1, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, minWidth: 55, textAlign: 'right' }}>{lat}ms</span>
              <div style={{ width: 60 }}>
                <div className="neon-progress" style={{ height: 3 }}>
                  <div className="neon-progress-fill" style={{
                    width: `${Math.min(100, (lat / 1000) * 100)}%`,
                    background: color,
                    boxShadow: `0 0 6px ${color}`,
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-green)' }}>4/5 HEALTHY</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-orange)' }}>1 DEGRADED</span>
      </div>
    </WidgetCard>
  );
};
