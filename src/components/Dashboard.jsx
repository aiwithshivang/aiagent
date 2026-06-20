import React, { useState } from 'react';
import { MetricCard } from './MetricCard';
import { AnalyticsCharts } from './AnalyticsCharts';
import { WidgetCard } from './WidgetCard';
import { Modal, ModalStat } from './Modal';
import { QuantumCoreWidget } from './QuantumCoreWidget';
import { NetworkMapWidget } from './NetworkMapWidget';
import { NeuralPulseWidget } from './NeuralPulseWidget';
import { AIModelUsageWidget } from './AIModelUsageWidget';
import { ThreatMonitorWidget } from './ThreatMonitorWidget';
import { APIStatusWidget } from './APIStatusWidget';
import { ContentStrategyWidget } from './ContentStrategyWidget';
import { MyAgentsModal } from './MyAgentsModal';
import { FreelanceProjectsWidget } from './FreelanceProjectsWidget';
import {
  Users, Activity, DollarSign, Cpu, Zap, CheckCircle, Clock,
  AlertTriangle, Layers, Percent, ActivitySquare, Server,
  Bell, Settings, Search, LayoutDashboard, BarChart2,
  Shield, FileText, TrendingUp, Eye, EyeOff
} from 'lucide-react';
import '../App.css';

const Database = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const TICKER_ITEMS = [
  { label: 'AI Req/min', value: '+2,841', up: true },
  { label: 'Revenue Today', value: '+$18,420', up: true },
  { label: 'Active Sessions', value: '12,184', up: true },
  { label: 'GPU Temp', value: '72°C', up: false },
  { label: 'Token Usage', value: '14.5M', up: true },
  { label: 'API Uptime', value: '99.98%', up: true },
  { label: 'Failed Tasks', value: '12', up: false },
  { label: 'Avg Latency', value: '240ms', up: false },
  { label: 'New Signups', value: '+42', up: true },
  { label: 'MRR', value: '$142K', up: true },
];

// ── MODAL CONTENT DEFINITIONS ─────────────────────────────────────────────────
const MODAL_DATA = {
  totalUsers: {
    title: 'Total Users', glowColor: 'cyan',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="TOTAL REGISTERED" value="24,592" color="var(--accent-cyan)" sub="All time signups" />
          <ModalStat label="VERIFIED" value="22,108" color="var(--accent-green)" sub="89.9% verification rate" />
          <ModalStat label="DEACTIVATED" value="2,484" color="var(--accent-red)" sub="10.1% churn total" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="TOP COUNTRY" value="🇺🇸 USA — 42%" color="var(--accent-cyan)" sub="10,329 users" />
          <ModalStat label="TOP PLAN" value="Pro ($49/mo)" color="var(--accent-purple)" sub="48% of paid users" />
          <ModalStat label="AVG SESSION DURATION" value="14.2 min" color="var(--accent-green)" />
          <ModalStat label="USER LTV" value="$840" color="var(--accent-orange)" sub="Lifetime value avg." />
        </div>
      </>
    )
  },
  activeUsers: {
    title: 'Active Users', glowColor: 'cyan',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="ACTIVE RIGHT NOW" value="12,184" color="var(--accent-cyan)" sub="Past 30 minutes" />
          <ModalStat label="DAU" value="18,400" color="var(--accent-green)" sub="Daily active users" />
          <ModalStat label="MAU" value="21,900" color="var(--accent-purple)" sub="Monthly active users" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="DAU/MAU RATIO" value="84%" color="var(--accent-cyan)" sub="Excellent stickiness" />
          <ModalStat label="AVG LOGINS/DAY" value="2.4x" color="var(--accent-green)" sub="Per user" />
          <ModalStat label="PEAK HOUR" value="14:00 UTC" color="var(--accent-orange)" sub="Highest concurrent load" />
          <ModalStat label="MOBILE USERS" value="38%" color="var(--accent-purple)" sub="4,630 mobile sessions" />
        </div>
      </>
    )
  },
  revenue: {
    title: 'Revenue', glowColor: 'green',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="MRR" value="$142,300" color="var(--accent-green)" sub="Monthly Recurring Revenue" />
          <ModalStat label="ARR" value="$1.71M" color="var(--accent-cyan)" sub="Annualized run rate" />
          <ModalStat label="YTD REVENUE" value="$814,200" color="var(--accent-purple)" sub="Jan–Jun 2026" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="AVERAGE ORDER VALUE" value="$46" color="var(--accent-green)" />
          <ModalStat label="PAYMENT SUCCESS RATE" value="98.4%" color="var(--accent-cyan)" sub="Stripe gateway" />
          <ModalStat label="REFUND RATE" value="0.8%" color="var(--accent-orange)" sub="12 refunds this month" />
          <ModalStat label="TOP PLAN REVENUE" value="Pro — $68K" color="var(--accent-purple)" sub="47.8% of total MRR" />
        </div>
      </>
    )
  },
  apiCalls: {
    title: 'API Calls', glowColor: 'purple',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="TOTAL TODAY" value="1.2M" color="var(--accent-purple)" sub="All endpoints" />
          <ModalStat label="PEAK RPS" value="2,841" color="var(--accent-cyan)" sub="Requests per second" />
          <ModalStat label="ERROR RATE" value="0.02%" color="var(--accent-red)" sub="240 errors today" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="TOP ENDPOINT" value="/api/v2/predict" color="var(--accent-cyan)" sub="42% of all calls" />
          <ModalStat label="AVG LATENCY" value="42ms" color="var(--accent-green)" sub="p50 latency" />
          <ModalStat label="P99 LATENCY" value="240ms" color="var(--accent-orange)" />
          <ModalStat label="CACHE HIT RATE" value="71%" color="var(--accent-purple)" sub="Redis L1 cache" />
        </div>
      </>
    )
  },
  aiRequests: {
    title: 'AI Requests', glowColor: 'pink',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="TOTAL AI REQUESTS" value="842K" color="var(--accent-pink)" sub="Today" />
          <ModalStat label="TOKENS PROCESSED" value="14.5M" color="var(--accent-cyan)" sub="Input + Output" />
          <ModalStat label="AI COST TODAY" value="$189" color="var(--accent-orange)" sub="OpenAI + Anthropic" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="TOP MODEL" value="GPT-4o" color="var(--accent-green)" sub="42% of requests" />
          <ModalStat label="AVG TOKENS/REQ" value="1,721" color="var(--accent-cyan)" />
          <ModalStat label="HALLUCINATION RATE" value="0.3%" color="var(--accent-red)" sub="Below industry avg." />
          <ModalStat label="AI ACCURACY" value="96.4%" color="var(--accent-purple)" sub="Validated outputs" />
        </div>
      </>
    )
  },
  successRate: {
    title: 'Success Rate', glowColor: 'green',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="OVERALL SUCCESS RATE" value="99.98%" color="var(--accent-green)" sub="All operations" />
          <ModalStat label="API SUCCESS RATE" value="99.97%" color="var(--accent-cyan)" />
          <ModalStat label="AI SUCCESS RATE" value="99.99%" color="var(--accent-purple)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="UPTIME (30d)" value="99.98%" color="var(--accent-green)" sub="SLA: 99.9% — ✓ MET" />
          <ModalStat label="INCIDENTS (30d)" value="1" color="var(--accent-orange)" sub="P2 — 4 min duration" />
          <ModalStat label="MEAN TIME TO RECOVER" value="4.2 min" color="var(--accent-cyan)" />
          <ModalStat label="ERROR BUDGET LEFT" value="87%" color="var(--accent-green)" sub="0.13% consumed" />
        </div>
      </>
    )
  },
  tasksCompleted: {
    title: 'Tasks Completed', glowColor: 'green',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="COMPLETED TODAY" value="45,210" color="var(--accent-green)" />
          <ModalStat label="THIS WEEK" value="284,100" color="var(--accent-cyan)" />
          <ModalStat label="THIS MONTH" value="1.12M" color="var(--accent-purple)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="AVG TASK DURATION" value="1.4s" color="var(--accent-cyan)" />
          <ModalStat label="AUTOMATION RATE" value="94%" color="var(--accent-green)" sub="AI-handled vs manual" />
          <ModalStat label="PEAK TASKS/HOUR" value="8,420" color="var(--accent-orange)" sub="At 14:00 UTC" />
          <ModalStat label="USER-TRIGGERED" value="38%" color="var(--accent-purple)" sub="vs scheduled 62%" />
        </div>
      </>
    )
  },
  contentStrategy: {
    title: 'Content Strategy', glowColor: 'purple',
    render: () => (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
          <ModalStat label="TOTAL IMPRESSIONS" value="1.2M" color="var(--accent-purple)" sub="Across all channels" />
          <ModalStat label="CLICK THROUGH RATE" value="4.8%" color="var(--accent-cyan)" sub="Industry avg: 2.1%" />
          <ModalStat label="CONTENT PIECES" value="42" color="var(--accent-pink)" sub="Published this month" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
          <ModalStat label="TOP CHANNEL" value="Blog — 44K views" color="var(--accent-green)" />
          <ModalStat label="BEST PERFORMING" value="AI Automation Guide" color="var(--accent-cyan)" sub="24.1K views, 842 shares" />
          <ModalStat label="AVG READ TIME" value="6.4 min" color="var(--accent-orange)" />
          <ModalStat label="SUBSCRIBER GROWTH" value="+1,204" color="var(--accent-purple)" sub="Email & RSS" />
        </div>
      </>
    )
  },
};

export const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeNav, setActiveNav] = useState('Overview');
  const [hideRevenue, setHideRevenue] = useState(false);
  const [agentsOpen, setAgentsOpen] = useState(false);
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const openModal = (key) => setActiveModal(key);
  const closeModal = () => setActiveModal(null);

  const NAV_ITEMS = [
    { label: 'Overview', icon: <LayoutDashboard size={15} /> },
    { label: 'Analytics', icon: <BarChart2 size={15} /> },
    { label: 'AI Hub', icon: <Zap size={15} /> },
    { label: 'Security', icon: <Shield size={15} /> },
    { label: 'Content', icon: <FileText size={15} /> },
    { label: 'Reports', icon: <TrendingUp size={15} /> },
  ];

  return (
    <div className="app-container">
      {/* Background Layers */}
      <div className="bg-layer bg-stars" />
      <div className="bg-layer bg-grid" />
      <div className="bg-layer bg-scanline" />
      <div className="bg-layer bg-vignette" />

      {/* ── HUD Header ── */}
      <header className="hud-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-secondary)', borderLeft: '1px solid var(--border-color)', paddingLeft: 24, display: 'flex', flexDirection: 'column', lineHeight: 1.6 }}>
            <span style={{ color: 'var(--accent-cyan)' }}>{timeStr}</span>
            <span>{dateStr}</span>
          </div>
        </div>

        <div className="hud-status-bar">
          <div><span className="status-dot live" />SYSTEMS ONLINE</div>
          <div><span className="status-dot live" />NEURAL NET ACTIVE</div>
          <div><span className="status-dot warn" />AI WORKERS HIGH LOAD</div>

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '5px 12px' }}>
            <Search size={13} color="var(--text-secondary)" />
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Search...</span>
          </div>

          {/* My Agents Button */}
          <button
            onClick={() => setAgentsOpen(true)}
            className="my-agents-btn"
          >
            ◈ My Agents
          </button>

          <button style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid var(--accent-cyan)', padding: '6px 12px', borderRadius: 8, color: 'var(--accent-cyan)', cursor: 'pointer', position: 'relative' }}>
            <Bell size={14} />
            <span style={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, background: 'var(--accent-pink)', borderRadius: '50%', boxShadow: '0 0 6px var(--accent-pink)' }} />
          </button>
          <button style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: 8, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <Settings size={14} />
          </button>
          <div style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid var(--accent-cyan)', padding: '6px 16px', borderRadius: 8, color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: 2, fontSize: 11, fontFamily: 'var(--font-mono)' }}>
            v3.2.1
          </div>
        </div>
      </header>

      {/* ── Operations Navigation Bar ── */}
      <div style={{
        position: 'sticky', top: 70, zIndex: 90,
        background: 'rgba(5,7,18,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
      }}>
        {/* Nav links */}
        <div style={{ display: 'flex', gap: 0 }}>
          {NAV_ITEMS.map(nav => (
            <button key={nav.label} onClick={() => setActiveNav(nav.label)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '14px 20px',
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              color: activeNav === nav.label ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              borderBottom: activeNav === nav.label ? '2px solid var(--accent-cyan)' : '2px solid transparent',
              transition: 'all 0.2s',
            }}>
              <span style={{ color: activeNav === nav.label ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>{nav.icon}</span>
              {nav.label}
            </button>
          ))}
        </div>

        {/* Quick stats strip */}
        <div style={{ display: 'flex', gap: 24, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          {[
            { label: 'Uptime', value: '99.98%', color: 'var(--accent-green)' },
            { label: 'Users Online', value: '12,184', color: 'var(--accent-cyan)' },
            { label: 'Alerts', value: '1 WARN', color: 'var(--accent-orange)' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', flex: 'column', gap: 4 }}>
              <span style={{ color: 'var(--text-secondary)', marginRight: 6 }}>{s.label}:</span>
              <span style={{ color: s.color }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Live Ticker ── */}
      <div className="ticker-wrap">
        <div className="ticker-content">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="ticker-item">
              <span style={{ color: 'var(--accent-cyan)', letterSpacing: 1 }}>{item.label}</span>
              <span className={item.up ? 'ticker-up' : 'ticker-down'}>{item.up ? '▲' : '▼'} {item.value}</span>
              <span style={{ color: 'var(--border-color)' }}>|</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-layout">

        {/* ── Top KPIs ── */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 className="section-title" style={{ '--section-accent': 'var(--accent-cyan)', margin: 0 }}>Core Metrics</h2>
            <button
              onClick={() => setHideRevenue(h => !h)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: hideRevenue ? 'rgba(217,48,120,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${hideRevenue ? 'rgba(217,48,120,0.5)' : 'rgba(255,255,255,0.12)'}`,
                borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
                color: hideRevenue ? 'var(--accent-pink)' : 'var(--text-secondary)',
                transition: 'all 0.25s',
              }}
            >
              {hideRevenue
                ? <><EyeOff size={13} /> Show Revenue</>
                : <><Eye size={13} /> Hide Revenue</>
              }
            </button>
          </div>
          <div className="metrics-grid">
            <MetricCard title="Total Users" value="24,592" icon={Users} trend="↑ 12.5%" trendUp glowColor="cyan" onClick={() => openModal('totalUsers')} />
            <MetricCard title="Active Users" value="12,184" icon={Activity} trend="↑ 8.2%" trendUp glowColor="cyan" onClick={() => openModal('activeUsers')} />
            {!hideRevenue && (
              <MetricCard title="Revenue" value="$142,300" icon={DollarSign} trend="↑ 18.4%" trendUp glowColor="green" accent="var(--accent-green)" private onClick={() => openModal('revenue')} />
            )}
            <MetricCard title="API Calls" value="1.2M" icon={Cpu} trend="↑ 5.1%" trendUp glowColor="purple" accent="var(--accent-purple)" onClick={() => openModal('apiCalls')} />
            <MetricCard title="AI Requests" value="842K" icon={Zap} trend="↑ 24.3%" trendUp glowColor="pink" accent="var(--accent-pink)" onClick={() => openModal('aiRequests')} />
            <MetricCard title="Success Rate" value="99.98%" icon={CheckCircle} trend="↑ 0.01%" trendUp glowColor="green" accent="var(--accent-green)" onClick={() => openModal('successRate')} />
          </div>
        </section>

        {/* ── Neural + AI Models ── */}
        <section>
          <h2 className="section-title" style={{ '--section-accent': 'var(--accent-purple)' }}>AI Intelligence Hub</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            <NeuralPulseWidget />
            <AIModelUsageWidget />
          </div>
        </section>

        {/* ── Client Projects Pipeline ── */}
        <section>
          <h2 className="section-title" style={{ '--section-accent': 'var(--accent-green)' }}>Freelance Opportunities</h2>
          <FreelanceProjectsWidget />
        </section>

        {/* ── Operations ── */}
        <section>
          <h2 className="section-title" style={{ '--section-accent': '#6b8db8' }}>Operations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <WidgetCard glowColor="cyan">
              <div className="card-header"><h3 className="card-title" style={{ color: 'var(--accent-cyan)' }}>System Health</h3></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'API Cluster', icon: <Server size={13} />, status: 'Operational', color: 'var(--accent-green)', pct: 95 },
                  { label: 'Main DB', icon: <Database size={13} />, status: 'Operational', color: 'var(--accent-green)', pct: 88 },
                  { label: 'AI Workers', icon: <Cpu size={13} />, status: 'High Load', color: 'var(--accent-orange)', pct: 84 },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-secondary)', fontSize: 12 }}>{s.icon} {s.label}</div>
                      <span style={{ color: s.color, fontSize: 10, fontFamily: 'var(--font-mono)' }}>{s.status}</span>
                    </div>
                    <div className="neon-progress">
                      <div className="neon-progress-fill" style={{ width: `${s.pct}%`, background: s.color, boxShadow: `0 0 8px ${s.color}`, transition: 'width 1s' }} />
                    </div>
                  </div>
                ))}
              </div>
            </WidgetCard>

            <WidgetCard glowColor="cyan">
              <div className="card-header"><h3 className="card-title" style={{ color: 'var(--accent-cyan)' }}>Recent Activity</h3></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
                {[
                  { title: 'New Enterprise Signup', sub: 'Acme Corp · 2 mins ago', color: 'var(--accent-cyan)' },
                  { title: 'Worker Node Restarted', sub: 'Node-04 · 15 mins ago', color: 'var(--accent-red)' },
                  { title: 'Billing Run Completed', sub: '1,204 Invoices · 1 hr ago', color: 'var(--accent-green)' },
                  { title: 'Model Weights Updated', sub: 'v2.1.4 · 3 hrs ago', color: 'var(--accent-purple)' },
                ].map((a, i) => (
                  <div key={i} style={{ padding: '8px 10px', background: 'rgba(0,0,0,0.3)', borderRadius: 8, borderLeft: `2px solid ${a.color}` }}>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{a.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 11, marginTop: 2 }}>{a.sub}</div>
                  </div>
                ))}
              </div>
            </WidgetCard>
          </div>
        </section>

        {/* ── Content Strategy ── */}
        <section>
          <h2 className="section-title" style={{ '--section-accent': 'var(--accent-purple)' }}>Content Strategy</h2>
          <ContentStrategyWidget onClick={() => openModal('contentStrategy')} />
        </section>

        {/* ── Analytics Charts ── */}
        <section>
          <h2 className="section-title" style={{ '--section-accent': 'var(--accent-cyan)' }}>Analytics</h2>
          <div className="charts-grid">
            <AnalyticsCharts />
          </div>
        </section>

        {/* ── Live Operations ── */}
        <section>
          <h2 className="section-title" style={{ '--section-accent': 'var(--accent-pink)' }}>Live Operations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { title: 'Tasks Completed', value: '45,210', icon: CheckCircle, trend: '↑ 12%', g: 'green', a: 'var(--accent-green)', key: 'tasksCompleted' },
                { title: 'Tasks Running', value: '342', icon: ActivitySquare, g: 'cyan', key: null },
                { title: 'Failed Tasks', value: '12', icon: AlertTriangle, trend: '↓ 2%', trendUp: false, g: 'pink', a: 'var(--accent-pink)', key: null },
                { title: 'Avg Response', value: '240ms', icon: Clock, trend: '↓ 15ms', trendUp: false, g: 'cyan', key: null },
              ].map(c => (
                <MetricCard key={c.title} title={c.title} value={c.value} icon={c.icon}
                  trend={c.trend} trendUp={c.trendUp !== false}
                  glowColor={c.g} accent={c.a}
                  onClick={c.key ? () => openModal(c.key) : undefined} />
              ))}
            </div>
            <ThreatMonitorWidget />
            <APIStatusWidget />
          </div>
        </section>

        {/* ── Bottom Grid ── */}
        <div className="bottom-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <section>
              <h2 className="section-title" style={{ '--section-accent': 'var(--accent-purple)' }}>AI Specific</h2>
              <div className="metrics-grid">
                <MetricCard title="Tokens Used" value="14.5M" icon={Layers} trend="↑ 2.1M" trendUp glowColor="purple" accent="var(--accent-purple)" onClick={() => openModal('aiRequests')} />
                <MetricCard title="Cost Saved" value="$4,200" icon={DollarSign} trend="↑ 14%" trendUp glowColor="green" accent="var(--accent-green)" private onClick={() => openModal('revenue')} />
                <MetricCard title="AI Accuracy" value="96.4%" icon={Percent} trend="↑ 1.2%" trendUp glowColor="cyan" onClick={() => openModal('aiRequests')} />
                <MetricCard title="Top Model" value="GPT-4o" icon={Cpu} glowColor="pink" accent="var(--accent-pink)" onClick={() => openModal('aiRequests')} />
              </div>
            </section>

            <section>
              <h2 className="section-title" style={{ '--section-accent': 'var(--accent-pink)' }}>Customers</h2>
              <div className="metrics-grid">
                <MetricCard title="New Signups" value="842" icon={Users} trend="↑ 24" trendUp glowColor="cyan" onClick={() => openModal('totalUsers')} />
                <MetricCard title="Paid Customers" value="3,104" icon={DollarSign} trend="↑ 12%" trendUp glowColor="green" accent="var(--accent-green)"
                  {...(!hideRevenue ? { private: true } : {})} onClick={() => openModal('revenue')} />
                <MetricCard title="Churn Rate" value="1.2%" icon={Activity} trend="↓ 0.1%" trendUp={false} glowColor="pink" accent="var(--accent-pink)" onClick={() => openModal('successRate')} />
                <MetricCard title="CSAT Score" value="4.8/5" icon={CheckCircle} trend="↑ 0.2" trendUp glowColor="cyan" onClick={() => openModal('activeUsers')} />
              </div>
            </section>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <section>
              <h2 className="section-title" style={{ '--section-accent': 'var(--accent-pink)' }}>Advanced Systems</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <QuantumCoreWidget />
                <NetworkMapWidget />
              </div>
            </section>


          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {Object.entries(MODAL_DATA).map(([key, cfg]) => (
        <Modal key={key} isOpen={activeModal === key} onClose={closeModal} title={cfg.title} glowColor={cfg.glowColor}>
          {cfg.render()}
        </Modal>
      ))}

      {/* ── My Agents Modal ── */}
      <MyAgentsModal isOpen={agentsOpen} onClose={() => setAgentsOpen(false)} />
    </div>
  );
};
