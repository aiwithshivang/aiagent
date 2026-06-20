import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, glowColor = 'cyan' }) => {
  if (!isOpen) return null;

  const colorMap = {
    cyan: 'var(--accent-cyan)',
    purple: 'var(--accent-purple)',
    pink: 'var(--accent-pink)',
    green: 'var(--accent-green)',
  };
  const color = colorMap[glowColor] || colorMap.cyan;

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'rgba(10,12,22,0.97)',
        border: `1px solid ${color}`,
        borderRadius: 20,
        boxShadow: `0 0 60px ${color}44, 0 30px 80px rgba(0,0,0,0.8)`,
        width: '100%', maxWidth: 720,
        maxHeight: '85vh',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 28px',
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
          background: `linear-gradient(90deg, ${color}11, transparent)`,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color, letterSpacing: 3, marginBottom: 4 }}>
              DETAILED ANALYTICS
            </div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
              {title}
            </h2>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.05)', border: `1px solid ${color}44`,
            color: 'var(--text-secondary)', borderRadius: 8, padding: '6px 14px',
            cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = `${color}22`; e.target.style.color = color; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.05)'; e.target.style.color = 'var(--text-secondary)'; }}
          >
            ESC / CLOSE
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Reusable stat block inside modal
export const ModalStat = ({ label, value, color = 'var(--accent-cyan)', sub }) => (
  <div style={{
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12, padding: '16px 20px',
  }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', letterSpacing: 2, marginBottom: 6 }}>{label}</div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color, textShadow: `0 0 10px ${color}88` }}>{value}</div>
    {sub && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{sub}</div>}
  </div>
);
