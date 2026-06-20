import React from 'react';
import { WidgetCard } from './WidgetCard';
import { Globe } from 'lucide-react';

export const NetworkMapWidget = () => {
  return (
    <WidgetCard>
      <div className="card-header">
        <h3 className="card-title" style={{ color: 'var(--accent-cyan)' }}>Global Data Stream</h3>
        <Globe size={20} color="var(--accent-cyan)" />
      </div>

      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', minHeight: '180px' }}>
        {/* Simulated Nodes */}
        <div className="node" style={{ top: '30%', left: '20%', animationDelay: '0s' }} />
        <div className="node" style={{ top: '60%', left: '40%', animationDelay: '1s' }} />
        <div className="node" style={{ top: '40%', left: '70%', animationDelay: '0.5s' }} />
        <div className="node" style={{ top: '80%', left: '80%', animationDelay: '1.5s' }} />
        
        {/* Simulated Connections */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <line x1="20%" y1="30%" x2="40%" y2="60%" stroke="var(--accent-pink)" strokeWidth="1" strokeDasharray="5,5" className="stream-line" />
          <line x1="40%" y1="60%" x2="70%" y2="40%" stroke="var(--accent-purple)" strokeWidth="1" className="stream-line-solid" />
          <line x1="70%" y1="40%" x2="80%" y2="80%" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="5,5" className="stream-line" />
        </svg>

        <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'var(--text-secondary)', fontSize: '10px', fontFamily: 'var(--font-mono)' }}>
          <div>UPLINK: 4.2 TB/s</div>
          <div>NODES: 4/4 ACTIVE</div>
        </div>
      </div>

      <style>{`
        .node {
          position: absolute; width: 8px; height: 8px; background: var(--accent-cyan); border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-cyan);
          animation: pulse-node 2s infinite;
        }
        .stream-line {
          animation: dash 20s linear infinite;
        }
        .stream-line-solid {
          stroke-opacity: 0.5;
          animation: fade-line 3s ease-in-out infinite;
        }
        @keyframes pulse-node { 0%, 100% { transform: scale(1); box-shadow: 0 0 10px var(--accent-cyan); } 50% { transform: scale(1.5); box-shadow: 0 0 20px var(--accent-pink); background: var(--accent-pink); } }
        @keyframes dash { to { stroke-dashoffset: -1000; } }
        @keyframes fade-line { 0%, 100% { stroke-opacity: 0.2; } 50% { stroke-opacity: 1; } }
      `}</style>
    </WidgetCard>
  );
};
