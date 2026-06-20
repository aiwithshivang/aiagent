import React, { useState, useEffect, useRef } from 'react';
import { WidgetCard } from './WidgetCard';
import { Brain } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const MAX_POINTS = 60;

const generatePoint = (prev) => {
  const base = 50;
  const spike = Math.random() < 0.08 ? (Math.random() > 0.5 ? 60 : -55) : 0;
  const drift = (Math.random() - 0.5) * 18;
  const raw = (prev ?? base) * 0.6 + base * 0.4 + drift + spike;
  return Math.max(5, Math.min(98, raw));
};

const CustomDot = (props) => {
  const { cx, cy, value } = props;
  if (value > 80 || value < 20) {
    return <circle cx={cx} cy={cy} r={4} fill={value > 80 ? '#ff006e' : '#00f5ff'}
      style={{ filter: `drop-shadow(0 0 6px ${value > 80 ? '#ff006e' : '#00f5ff'})` }} />;
  }
  return null;
};

export const NeuralPulseWidget = () => {
  const [data, setData] = useState(() => {
    const pts = [];
    let last = 50;
    for (let i = 0; i < MAX_POINTS; i++) {
      last = generatePoint(last);
      pts.push({ t: i, v: +last.toFixed(1) });
    }
    return pts;
  });
  const [inferenceRate, setInferenceRate] = useState(3241);
  const [latency, setLatency] = useState(18);
  const [gpuUtil, setGpuUtil] = useState(84);
  const counterRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      counterRef.current += 1;
      setData(prev => {
        const last = prev[prev.length - 1]?.v ?? 50;
        const next = { t: prev[prev.length - 1].t + 1, v: +generatePoint(last).toFixed(1) };
        return [...prev.slice(-MAX_POINTS + 1), next];
      });
      if (counterRef.current % 8 === 0) {
        setInferenceRate(v => Math.max(2800, Math.min(3800, v + Math.floor((Math.random() - 0.5) * 120))));
        setLatency(v => Math.max(10, Math.min(40, v + Math.floor((Math.random() - 0.5) * 5))));
        setGpuUtil(v => Math.max(70, Math.min(98, v + Math.floor((Math.random() - 0.5) * 4))));
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const latest = data[data.length - 1]?.v ?? 50;
  const lineColor = latest > 80 ? '#ff006e' : latest < 20 ? '#00f5ff' : '#9d00ff';

  return (
    <WidgetCard glowColor="cyan">
      <div className="card-header" style={{ marginBottom: 8 }}>
        <h3 className="card-title" style={{ color: 'var(--accent-cyan)', fontSize: 11, letterSpacing: 2 }}>
          Neural Activity Monitor
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="status-dot live" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent-green)' }}>LIVE</span>
          <Brain size={16} color="var(--accent-cyan)" />
        </div>
      </div>

      {/* Live value badge */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: lineColor,
          textShadow: `0 0 12px ${lineColor}` }}>{latest}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>
          activity units
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, padding: '2px 8px',
          background: latest > 80 ? 'rgba(255,0,110,0.15)' : 'rgba(0,245,255,0.1)',
          border: `1px solid ${lineColor}`, borderRadius: 4, color: lineColor }}>
          {latest > 80 ? '⚡ SPIKE' : latest < 20 ? '● IDLE' : '◎ NORMAL'}
        </span>
      </div>

      {/* Real-time chart */}
      <div style={{ width: '100%', height: 140, position: 'relative' }}>
        {/* Horizontal gridlines glow */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
          {[20, 50, 80].map(y => (
            <div key={y} style={{
              position: 'absolute',
              top: `${100 - y}%`, left: 0, right: 0,
              height: 1,
              background: y === 80 ? 'rgba(255,0,110,0.2)' : y === 20 ? 'rgba(0,245,255,0.2)' : 'rgba(255,255,255,0.05)'
            }} />
          ))}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
            <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false}
              tick={{ fontFamily: 'var(--font-mono)', fontSize: 9, fill: 'var(--text-secondary)' }}
              ticks={[0, 20, 50, 80, 100]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const v = payload[0].value;
                  return (
                    <div style={{ background: 'rgba(5,8,20,0.95)', border: `1px solid ${v > 80 ? '#ff006e' : '#00f5ff'}`,
                      borderRadius: 6, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                      <span style={{ color: v > 80 ? '#ff006e' : '#9d00ff' }}>{v} units</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={80} stroke="rgba(255,0,110,0.4)" strokeDasharray="3 3" />
            <ReferenceLine y={20} stroke="rgba(0,245,255,0.4)" strokeDasharray="3 3" />
            <Line
              type="monotoneX"
              dataKey="v"
              stroke={lineColor}
              strokeWidth={2}
              dot={<CustomDot />}
              isAnimationActive={false}
              style={{ filter: `drop-shadow(0 0 4px ${lineColor})` }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 10 }}>
        {[
          { label: 'Inference/s', value: inferenceRate.toLocaleString(), color: 'var(--accent-cyan)' },
          { label: 'Latency', value: `${latency}ms`, color: 'var(--accent-purple)' },
          { label: 'GPU Util', value: `${gpuUtil}%`, color: 'var(--accent-pink)' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 8, padding: '8px 10px', textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: s.color,
              textShadow: `0 0 8px ${s.color}` }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-secondary)', marginTop: 2, letterSpacing: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
};
