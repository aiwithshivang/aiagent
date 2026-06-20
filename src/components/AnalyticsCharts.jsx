import React from 'react';
import { WidgetCard } from './WidgetCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

const userGrowthData = [
  { name: 'Mar', users: 6500 },
  { name: 'Apr', users: 8200 },
  { name: 'May', users: 9800 },
  { name: 'Jun', users: 12500 },
];

const revenueData = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 1500 },
  { name: 'Wed', revenue: 1100 },
  { name: 'Thu', revenue: 1800 },
  { name: 'Fri', revenue: 2200 },
  { name: 'Sat', revenue: 2900 },
  { name: 'Sun', revenue: 3100 },
];

const usageData = [
  { name: 'Week 1', tasks: 45000 },
  { name: 'Week 2', tasks: 52000 },
  { name: 'Week 3', tasks: 48000 },
  { name: 'Week 4', tasks: 61000 },
];

const featuresData = [
  { name: 'Text Gen', calls: 8500 },
  { name: 'Image Gen', calls: 3200 },
  { name: 'Data Ext', calls: 6400 },
  { name: 'Summarize', calls: 5100 },
];

export const AnalyticsCharts = () => {
  return (
    <>
      <WidgetCard glowColor="cyan">
        <div className="card-header" style={{ marginBottom: 16 }}>
          <h3 className="card-title" style={{ color: 'var(--accent-cyan)' }}>User Growth</h3>
        </div>
        <div style={{ height: 240, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#00f5ff" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      <WidgetCard glowColor="green">
        <div className="card-header" style={{ marginBottom: 16 }}>
          <h3 className="card-title" style={{ color: 'var(--accent-green)' }}>Revenue Trend</h3>
        </div>
        <div style={{ height: 240, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="revenue" fill="#00ff88" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      <WidgetCard glowColor="purple">
        <div className="card-header" style={{ marginBottom: 16 }}>
          <h3 className="card-title" style={{ color: 'var(--accent-purple)' }}>Usage Trend (Tasks)</h3>
        </div>
        <div style={{ height: 240, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <YAxis stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#9d00ff" strokeWidth={2} dot={{ r: 3, fill: '#9d00ff' }} activeDot={{ r: 5, boxShadow: '0 0 8px #9d00ff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>

      <WidgetCard glowColor="pink">
        <div className="card-header" style={{ marginBottom: 16 }}>
          <h3 className="card-title" style={{ color: 'var(--accent-pink)' }}>Top Features Used</h3>
        </div>
        <div style={{ height: 240, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featuresData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="var(--text-secondary)" tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" tickLine={false} axisLine={false} width={80} style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="calls" fill="#ff006e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </WidgetCard>
    </>
  );
};
