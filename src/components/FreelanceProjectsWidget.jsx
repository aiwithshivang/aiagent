import React, { useState, useEffect } from 'react';
import { Briefcase, DollarSign, Clock, CheckCircle, Search, ExternalLink } from 'lucide-react';
import { WidgetCard } from './WidgetCard';
import '../App.css';

const initialProjects = [
  { id: 1, title: 'AI-Powered Chatbot for E-commerce', platform: 'unjob.ai', budget: '$2,500', timeAgo: '2m ago', status: 'Analyzing Fit', match: '98%', color: 'var(--accent-cyan)' },
  { id: 2, title: 'Automated Lead Generation Agent', platform: 'Fiverr', budget: '$800', timeAgo: '15m ago', status: 'Proposal Sent', match: '92%', color: 'var(--accent-green)' },
  { id: 3, title: 'Custom GPT Development for HR', platform: 'PeoplePerHour', budget: '$4,000+', timeAgo: '45m ago', status: 'Drafting Pitch', match: '85%', color: 'var(--accent-orange)' },
  { id: 4, title: 'LLM Fine-tuning for Legal Docs', platform: 'unjob.ai', budget: '$5,000', timeAgo: '1h ago', status: 'Scraped', match: '78%', color: 'var(--accent-purple)' },
];

export const FreelanceProjectsWidget = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isScanning, setIsScanning] = useState(true);

  // Simulate scanning effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProjects(prev => {
        const newProjects = [...prev];
        const randomIdx = Math.floor(Math.random() * newProjects.length);
        if (newProjects[randomIdx].status === 'Scraped') {
          newProjects[randomIdx].status = 'Analyzing Fit';
        } else if (newProjects[randomIdx].status === 'Analyzing Fit') {
          newProjects[randomIdx].status = 'Drafting Pitch';
        } else if (newProjects[randomIdx].status === 'Drafting Pitch') {
          newProjects[randomIdx].status = 'Proposal Sent';
        }
        return newProjects;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <WidgetCard glowColor="cyan">
      <div className="card-header" style={{ marginBottom: '16px' }}>
        <h3 className="card-title" style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
          <Search size={14} className={isScanning ? 'scanning-icon' : ''} />
          Autonomous Client Acquisition
        </h3>
        <span style={{ fontSize: '10px', color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="status-dot live" style={{ width: 4, height: 4 }}></span>
          AGENT ACTIVE
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {projects.map((p) => (
          <div key={p.id} style={{ 
            background: 'rgba(255,255,255,0.03)', 
            border: '1px solid rgba(255,255,255,0.08)', 
            borderRadius: '12px', 
            padding: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Status indicator line */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: p.color }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '13px', lineHeight: '1.4' }}>{p.title}</div>
              <div style={{ color: p.color, fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: '700', padding: '2px 6px', background: `${p.color}20`, borderRadius: '4px', whiteSpace: 'nowrap' }}>
                {p.match} Match
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '11px', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Briefcase size={12} /> {p.platform}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={12} /> {p.budget}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {p.timeAgo}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: p.status === 'Proposal Sent' ? 'var(--accent-green)' : 'var(--accent-cyan)' }}>
                {p.status === 'Proposal Sent' ? <CheckCircle size={12} /> : <div className="spinner" style={{ width: '12px', height: '12px', border: '2px solid transparent', borderTopColor: 'currentColor', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>}
                {p.status}
              </div>
              <button style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-secondary)', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                transition: 'color 0.2s'
              }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-cyan)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                View <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .scanning-icon { animation: scan-pulse 2s infinite; color: var(--accent-cyan); }
        @keyframes scan-pulse { 0% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 0.5; } }
      `}</style>
    </WidgetCard>
  );
};
