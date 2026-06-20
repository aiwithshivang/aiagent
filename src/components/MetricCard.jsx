import React, { useState } from 'react';
import { WidgetCard } from './WidgetCard';
import { TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';

export const MetricCard = ({ title, value, icon: Icon, trend, trendUp = true, glowColor, accent, private: isPrivate, onClick, modalData }) => {
  const [hidden, setHidden] = useState(false);
  const accentColor = accent || (
    glowColor === 'cyan' ? 'var(--accent-cyan)' :
    glowColor === 'purple' ? 'var(--accent-purple)' :
    glowColor === 'pink' ? 'var(--accent-pink)' :
    glowColor === 'green' ? 'var(--accent-green)' : 'var(--accent-cyan)'
  );

  const handleEyeClick = (e) => {
    e.stopPropagation();
    setHidden(h => !h);
  };

  return (
    <WidgetCard glowColor={glowColor || 'cyan'} onClick={onClick}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isPrivate && (
            <button onClick={handleEyeClick} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 2,
              color: hidden ? accentColor : 'var(--text-secondary)',
              transition: 'color 0.2s'
            }}>
              {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          )}
          {Icon && <Icon size={16} color={accentColor} style={{ opacity: 0.8 }} />}
        </div>
      </div>

      <div className="metric-value" style={{
        color: 'var(--text-primary)',
        filter: hidden ? 'blur(8px)' : 'none',
        userSelect: hidden ? 'none' : 'auto',
        transition: 'filter 0.3s ease'
      }}>
        {value}
      </div>

      {trend && (
        <div className={`metric-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
          {trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{trend} vs last week</span>
        </div>
      )}

      {/* Accent bottom line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        opacity: 0.6
      }} />

      {onClick && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          fontSize: 9, fontFamily: 'var(--font-mono)',
          color: accentColor, opacity: 0.4, letterSpacing: 1
        }}>CLICK</div>
      )}
    </WidgetCard>
  );
};
