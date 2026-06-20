import React from 'react';
import { WidgetCard } from './WidgetCard';
import {
  FileText, TrendingUp, Eye, Share2, MessageSquare, ArrowUpRight, Camera
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const radarData = [
  { subject: 'SEO', Current: 88, Prev: 65 },
  { subject: 'Engage', Current: 74, Prev: 50 },
  { subject: 'Reach', Current: 92, Prev: 70 },
  { subject: 'Conv.', Current: 61, Prev: 45 },
  { subject: 'Retain', Current: 79, Prev: 60 },
];

const posts = [
  { title: 'AI Automation Guide', views: '24.1K', shares: 842, eng: '8.4%', platform: 'Blog', color: 'var(--accent-cyan)' },
  { title: 'GPT-4o Deep Dive', views: '18.6K', shares: 621, eng: '6.2%', platform: 'LinkedIn', color: 'var(--accent-purple)' },
  { title: 'SaaS Growth Tips', views: '12.3K', shares: 390, eng: '9.1%', platform: 'Twitter', color: 'var(--accent-pink)' },
];

export const ContentStrategyWidget = ({ onClick }) => {
  return (
    <WidgetCard glowColor="purple" onClick={onClick}>
      <div className="card-header" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: 'rgba(157,0,255,0.15)', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={20} color="var(--accent-purple)" />
          </div>
          <div>
            <h3 className="card-title" style={{ color: 'var(--accent-purple)', fontSize: 14, letterSpacing: 1.5, marginBottom: 2 }}>Content Strategy</h3>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>Performance Matrix</div>
          </div>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, padding: '5px 12px',
          background: 'rgba(157,0,255,0.1)', border: '1px solid rgba(157,0,255,0.3)',
          borderRadius: '8px', color: 'var(--accent-purple)', fontWeight: 600,
          letterSpacing: 1
        }}>
          THIS WEEK
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: 24, alignItems: 'center', flex: 1 }}>
        {/* Left: KPIs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: <Eye size={15} />, label: 'Total Views', value: '54.9K', color: 'var(--accent-cyan)' },
            { icon: <Share2 size={15} />, label: 'Total Shares', value: '1,853', color: 'var(--accent-purple)' },
            { icon: <MessageSquare size={15} />, label: 'Comments', value: '294', color: 'var(--accent-pink)' },
            { icon: <TrendingUp size={15} />, label: 'Avg Engagement', value: '7.9%', color: 'var(--accent-green)' },
          ].map((s) => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', background: 'rgba(255,255,255,0.02)', 
              border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
              transition: 'transform 0.2s, background 0.2s',
              cursor: 'default'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(4px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>
                <span style={{ color: s.color, display: 'flex' }}>{s.icon}</span> {s.label}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: s.color, textShadow: `0 0 10px ${s.color}40` }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Center: Radar */}
        <div style={{ height: 200, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(157,0,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius={65}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontFamily: 'var(--font-mono)', fontSize: 10, fill: 'var(--text-secondary)' }} />
              <Tooltip 
                contentStyle={{ background: 'rgba(10,12,20,0.95)', border: '1px solid rgba(157,0,255,0.4)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Radar name="Previous" dataKey="Prev" stroke="rgba(157,0,255,0.4)" fill="rgba(157,0,255,0.1)" strokeDasharray="3 3" />
              <Radar name="Current" dataKey="Current" stroke="var(--accent-cyan)" fill="var(--accent-cyan)" fillOpacity={0.25} strokeWidth={2} dot={{ r: 4, fill: 'var(--accent-cyan)', strokeWidth: 0 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Instagram Content Plan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: 2, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Camera size={14} color="var(--accent-pink)" /> IG CONTENT PIPELINE
          </div>
          {[
            { type: 'Reel', title: '5 AI Tools for Freelancers', status: 'Ready', color: 'var(--accent-pink)' },
            { type: 'Carousel', title: 'GPT-4o vs Claude 3.5 Prompts', status: 'Scheduled', color: 'var(--accent-purple)' },
            { type: 'Story', title: 'BTS: Automated Scraping', status: 'To Record', color: 'var(--accent-orange)' },
            { type: 'Post', title: 'Will AI Replace Developers?', status: 'Ideas', color: 'var(--accent-cyan)' },
          ].map((item, idx) => (
            <div key={idx} style={{
              padding: '10px 14px', background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px',
              display: 'flex', flexDirection: 'column', gap: 6,
              borderLeft: `3px solid ${item.color}`,
              transition: 'transform 0.2s, background 0.2s', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>{item.title}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{item.type}</span>
                <span style={{ color: item.status === 'Scheduled' ? 'var(--accent-green)' : item.color }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Posts */}
      <div style={{ marginTop: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: 2, fontWeight: 600 }}>TOP PERFORMING CONTENT</div>
          <div style={{ padding: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', cursor: 'pointer' }}>
            <ArrowUpRight size={14} color="var(--text-secondary)" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {posts.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '14px 18px', background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)', 
              borderRadius: '10px', borderLeft: `3px solid ${p.color}`,
              transition: 'background 0.2s, transform 0.2s', cursor: 'pointer'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 100%)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 600, marginBottom: 6, letterSpacing: 0.5 }}>
                  {p.title}
                </div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  <span><strong style={{ color: p.color, fontWeight: 700 }}>{p.views}</strong> views</span>
                  <span><strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{p.eng}</strong> eng</span>
                </div>
              </div>
              <span style={{ 
                fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)', 
                background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.08)',
                padding: '6px 12px', borderRadius: '8px', fontWeight: 500
              }}>
                {p.platform}
              </span>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
};
