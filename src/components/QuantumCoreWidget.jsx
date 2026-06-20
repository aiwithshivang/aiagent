import React from 'react';
import { WidgetCard } from './WidgetCard';
import { Cpu } from 'lucide-react';

export const QuantumCoreWidget = () => {
  return (
    <WidgetCard>
      <div className="card-header" style={{ marginBottom: '0' }}>
        <h3 className="card-title" style={{ color: 'var(--accent-purple)' }}>Quantum Compute Core</h3>
        <Cpu size={20} color="var(--accent-purple)" />
      </div>
      
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '200px' }}>
        
        {/* Outer Ring */}
        <div style={{
          position: 'absolute', width: '140px', height: '140px',
          border: '2px dashed var(--accent-pink)', borderRadius: '50%',
          animation: 'spin 10s linear infinite', opacity: 0.5
        }} />
        
        {/* Middle Ring */}
        <div style={{
          position: 'absolute', width: '100px', height: '100px',
          border: '3px solid transparent', borderTopColor: 'var(--accent-cyan)', borderBottomColor: 'var(--accent-cyan)',
          borderRadius: '50%', animation: 'spin-reverse 6s linear infinite',
          boxShadow: '0 0 15px var(--accent-cyan)'
        }} />
        
        {/* Inner Core */}
        <div style={{
          width: '50px', height: '50px', background: 'var(--accent-purple)', borderRadius: '50%',
          boxShadow: '0 0 30px 10px rgba(157, 0, 255, 0.6)',
          animation: 'pulse-core 2s ease-in-out infinite'
        }} />

        <div style={{
          position: 'absolute', bottom: '0', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', fontSize: '12px'
        }}>
          SYS_LOAD: 84.2% [STABLE]
        </div>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        @keyframes pulse-core { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.2); opacity: 1; } }
      `}</style>
    </WidgetCard>
  );
};
