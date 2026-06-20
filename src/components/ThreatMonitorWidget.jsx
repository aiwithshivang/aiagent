import React, { useState, useEffect } from 'react';
import { WidgetCard } from './WidgetCard';
import { Shield, Zap } from 'lucide-react';

const THREATS = [
  { time: '01:32:14', type: 'Auth Probe', origin: '94.23.x.x', status: 'BLOCKED', color: 'var(--accent-red)' },
  { time: '01:28:55', type: 'Rate Limit Hit', origin: '192.168.x.x', status: 'THROTTLED', color: 'var(--accent-orange)' },
  { time: '01:15:02', type: 'SQL Injection Attempt', origin: '103.45.x.x', status: 'BLOCKED', color: 'var(--accent-red)' },
  { time: '01:04:44', type: 'XSS Payload', origin: '77.88.x.x', status: 'BLOCKED', color: 'var(--accent-red)' },
  { time: '00:58:10', type: 'Brute Force', origin: '45.12.x.x', status: 'BLOCKED', color: 'var(--accent-red)' },
];

export const ThreatMonitorWidget = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let val = 0;
    const t = setInterval(() => {
      val += 2;
      setScore(val);
      if (val >= 98) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, []);

  return (
    <WidgetCard glowColor="pink">
      <div className="card-header" style={{ marginBottom: 14 }}>
        <h3 className="card-title" style={{ color: 'var(--accent-pink)' }}>Threat Intelligence</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Shield size={16} color="var(--accent-pink)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-green)' }}>SYSTEMS SECURE</span>
        </div>
      </div>

      {/* Security Score Gauge */}
      <div style={{ textAlign: 'center', margin: '8px 0 16px' }}>
        <svg width="120" height="70" viewBox="0 0 120 70" style={{ overflow: 'visible' }}>
          {/* BG arc */}
          <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
          {/* Score arc */}
          <path
            d="M 10 65 A 50 50 0 0 1 110 65"
            fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 157} 157`}
            style={{ filter: 'drop-shadow(0 0 6px var(--accent-green))' }}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--accent-cyan)" />
              <stop offset="100%" stopColor="var(--accent-green)" />
            </linearGradient>
          </defs>
          <text x="60" y="60" textAnchor="middle" fontFamily="var(--font-sci)" fontSize="18" fontWeight="700" fill="var(--accent-green)">{score}</text>
        </svg>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: 2 }}>SECURITY SCORE</div>
      </div>

      {/* Recent threats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 180, overflowY: 'auto' }}>
        {THREATS.map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 8px', background: 'rgba(0,0,0,0.3)', borderRadius: 6,
            borderLeft: `2px solid ${t.color}`, fontSize: 11
          }}>
            <Zap size={10} color={t.color} />
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', minWidth: 60 }}>{t.time}</span>
            <span style={{ flex: 1, color: 'var(--text-primary)' }}>{t.type}</span>
            <span style={{ color: t.color, fontWeight: 700, fontSize: 9 }}>{t.status}</span>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};
