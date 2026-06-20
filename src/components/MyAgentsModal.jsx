import React, { useState, useEffect, useRef } from 'react';

const AGENTS = [
  {
    id: 'freelancing',
    name: 'Freelancing Agent',
    desc: 'Scans 12 platforms · Auto-bids · Revenue $2.4K/wk',
    color: '#00f5ff',
    colorRgb: '0,245,255',
    shadow: 'rgba(0,245,255,0.7)',
    glow: 'rgba(0,245,255,0.12)',
    height: 480,
    width: 170,
    style: 'glass-skyscraper',
    status: 'ACTIVE',
    metric: '98% Match Rate',
    arcY: 0,
  },
  {
    id: 'content',
    name: 'Content Agent',
    desc: 'Posts 3x/day · Manages IG & Blog · 54K views/wk',
    color: '#bd00ff',
    colorRgb: '189,0,255',
    shadow: 'rgba(189,0,255,0.7)',
    glow: 'rgba(189,0,255,0.12)',
    height: 400,
    width: 155,
    style: 'curved',
    status: 'ACTIVE',
    metric: '7.9% Engagement',
    arcY: 20,
  },
  {
    id: 'projects',
    name: 'Projects & Startup',
    desc: 'Tracks 8 ventures · Sprint planning · Roadmap AI',
    color: '#ff9500',
    colorRgb: '255,149,0',
    shadow: 'rgba(255,149,0,0.7)',
    glow: 'rgba(255,149,0,0.12)',
    height: 430,
    width: 180,
    style: 'brutalist',
    status: 'BUILDING',
    metric: '3 Active Sprints',
    arcY: 10,
  },
  {
    id: 'operational',
    name: 'Operational Agent',
    desc: 'System guardian · 99.98% uptime · Zero downtime',
    color: '#00ff88',
    colorRgb: '0,255,136',
    shadow: 'rgba(0,255,136,0.7)',
    glow: 'rgba(0,255,136,0.12)',
    height: 370,
    width: 160,
    style: 'fortress',
    status: 'ONLINE',
    metric: '99.98% Uptime',
    arcY: 30,
  },
];

/* ─── BUILDING 1: Glass Skyscraper ─── */
const GlassSkyscraper = ({ color, hovered, w = 170, h = 480 }) => {
  const id = 'gs';
  return (
    <svg width={w} height={h + 60} viewBox={`0 0 ${w} ${h + 60}`} overflow="visible"
      style={{ filter: hovered ? `drop-shadow(0 0 32px ${color}) drop-shadow(0 0 60px ${color}60)` : `drop-shadow(0 0 14px ${color}90)`, transition: 'filter 0.5s ease' }}>
      <defs>
        <linearGradient id={`${id}front`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="40%" stopColor="#0d1e2d" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#071018" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#040c14" stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}top`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`${id}win`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
        <filter id={`${id}glow`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Front face – main tower */}
      <polygon points={`18,${h + 10} 110,${h + 10} 110,28 18,28`} fill={`url(#${id}front)`} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Side face */}
      <polygon points={`110,${h + 10} 152,${h - 10} 152,8 110,28`} fill={`url(#${id}side)`} stroke={color} strokeWidth="0.4" strokeOpacity="0.35" />
      {/* Top face */}
      <polygon points="18,28 110,28 152,8 60,8" fill={`url(#${id}top)`} stroke={color} strokeWidth="0.6" />

      {/* Secondary stepped tower */}
      <polygon points="38,28 88,28 88,8 38,8" fill="#0a1a26" stroke={color} strokeWidth="0.5" strokeOpacity="0.6" />
      <polygon points="88,28 108,18 108,8 88,8" fill="#060e16" stroke={color} strokeWidth="0.3" strokeOpacity="0.4" />
      <polygon points="38,8 88,8 108,-2 58,-2" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.4" />

      {/* Tertiary spire */}
      <polygon points="55,8 75,8 75,-8 55,-8" fill="#0d1e2d" stroke={color} strokeWidth="0.5" strokeOpacity="0.7" />
      <line x1="65" y1="-8" x2="65" y2="-52" stroke={color} strokeWidth="2.5" />
      {/* Antenna rings */}
      {[-52, -44, -36].map((y, i) => (
        <ellipse key={i} cx="65" cy={y} rx={4 - i} ry="2" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.7" />
      ))}
      <circle cx="65" cy="-52" r="4" fill={color} style={{ animation: 'agentBlink 1s infinite' }} />
      <circle cx="65" cy="-52" r="8" fill={color} fillOpacity="0.2" style={{ animation: 'agentBlink 1s infinite' }} />

      {/* Windows – rich grid */}
      {Array.from({ length: 18 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => {
          const lit = (row + col) % 3 !== 0;
          return (
            <rect key={`${row}-${col}`}
              x={23 + col * 17} y={35 + row * 24} width={11} height={17}
              rx="1"
              fill={`url(#${id}win)`}
              fillOpacity={lit ? 0.75 : 0.06}
              style={{ animation: lit ? `agentBlink ${1.2 + (row * col) % 2.1}s ${(row + col) * 0.15}s infinite` : 'none' }}
            />
          );
        })
      )}
      {/* Side windows */}
      {Array.from({ length: 14 }, (_, row) =>
        Array.from({ length: 2 }, (_, col) => (
          <rect key={`s${row}-${col}`}
            x={115 + col * 18} y={35 + row * 28} width={9} height={14}
            fill={color} fillOpacity={row % 2 === 0 ? 0.5 : 0.12}
            style={{ animation: `agentBlink ${2 + row * 0.1}s ${col * 0.5}s infinite` }}
          />
        ))
      )}

      {/* Horizontal floor lines */}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1="18" y1={80 + i * 65} x2="110" y2={80 + i * 65}
          stroke={color} strokeWidth="0.4" strokeOpacity="0.25" />
      ))}

      {/* Data streams flowing up */}
      {[30, 55, 80, 100].map((x, i) => (
        <line key={i} x1={x} y1={h + 10} x2={x} y2="28"
          stroke={color} strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="4 8"
          style={{ animation: `dataStreamUp 2.5s ${i * 0.6}s linear infinite` }} />
      ))}

      {/* Ground glow halo */}
      <ellipse cx="65" cy={h + 18} rx="60" ry="10" fill={color} fillOpacity={hovered ? 0.18 : 0.06}
        style={{ filter: 'blur(6px)', transition: 'fill-opacity 0.4s' }} />

      {/* Nameplate */}
      <rect x="8" y={h - 10} width="110" height="22" rx="4" fill="#000" fillOpacity="0.85" stroke={color} strokeWidth="1" />
      <rect x="8" y={h - 10} width="110" height="22" rx="4" fill={color} fillOpacity="0.06" />
      <text x="63" y={h + 6} textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">FREELANCING AGENT</text>
    </svg>
  );
};

/* ─── BUILDING 2: Curved Creative Tower ─── */
const CurvedBuilding = ({ color, hovered, w = 155, h = 400 }) => {
  const id = 'cb';
  return (
    <svg width={w} height={h + 60} viewBox={`0 0 ${w} ${h + 60}`} overflow="visible"
      style={{ filter: hovered ? `drop-shadow(0 0 32px ${color}) drop-shadow(0 0 60px ${color}60)` : `drop-shadow(0 0 14px ${color}90)`, transition: 'filter 0.5s ease' }}>
      <defs>
        <linearGradient id={`${id}body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="55%" stopColor="#120a22" stopOpacity="0.94" />
          <stop offset="100%" stopColor="#08051a" stopOpacity="1" />
        </linearGradient>
        <radialGradient id={`${id}dome`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="60%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </radialGradient>
        <filter id={`${id}softglow`}>
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Main curved body */}
      <path d={`M14,${h + 8} C8,${h * 0.55} 12,${h * 0.22} 77,18 C142,${h * 0.22} 145,${h * 0.55} 140,${h + 8} Z`}
        fill={`url(#${id}body)`} stroke={color} strokeWidth="1" strokeOpacity="0.65" />

      {/* Inner highlight sweep */}
      <path d={`M22,${h} C18,${h * 0.6} 24,${h * 0.28} 60,30 C55,${h * 0.28} 50,${h * 0.6} 45,${h} Z`}
        fill={color} fillOpacity="0.04" />

      {/* Balconies / horizontal rings */}
      {[0.25, 0.45, 0.65, 0.82].map((frac, i) => {
        const y = h * frac;
        const halfW = 50 - i * 4;
        return (
          <ellipse key={i} cx="77" cy={y} rx={halfW} ry="6"
            fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.5" />
        );
      })}

      {/* Dome top */}
      <ellipse cx="77" cy="28" rx="36" ry="22" fill={`url(#${id}dome)`} />
      <ellipse cx="77" cy="28" rx="22" ry="13" fill={color} fillOpacity="0.5" />
      <ellipse cx="77" cy="28" rx="10" ry="6" fill={color} fillOpacity="0.9" />

      {/* Spire from dome */}
      <line x1="77" y1="6" x2="77" y2="-40" stroke={color} strokeWidth="2" />
      <circle cx="77" cy="-40" r="5" fill={color} style={{ animation: 'agentBlink 1.5s infinite' }} />
      <circle cx="77" cy="-40" r="10" fill={color} fillOpacity="0.15" style={{ animation: 'agentBlink 1.5s infinite' }} />

      {/* Arched windows */}
      {Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 3 }, (_, col) => {
          const cx = 47 + col * 26;
          const cy = 50 + row * 34;
          const lit = (row + col) % 2 === 0;
          return (
            <g key={`${row}-${col}`}>
              <rect x={cx - 8} y={cy - 12} width="16" height="22" rx="8"
                fill={color} fillOpacity={lit ? 0.65 : 0.07}
                style={{ animation: lit ? `agentBlink ${1.4 + row * 0.2}s ${col * 0.3}s infinite` : 'none' }} />
            </g>
          );
        })
      )}

      {/* Floating content pixels */}
      {Array.from({ length: 14 }, (_, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        return (
          <rect key={i}
            x={77 + side * (20 + i * 6)} y={60 + (i % 5) * 60}
            width={5 + (i % 3)} height={5 + (i % 3)}
            fill={color} fillOpacity="0.7"
            style={{ animation: `floatPixelSide ${2.5 + i * 0.3}s ${i * 0.25}s ease-in-out infinite` }} />
        );
      })}

      {/* Ground halo */}
      <ellipse cx="77" cy={h + 14} rx="64" ry="10" fill={color} fillOpacity={hovered ? 0.16 : 0.05}
        style={{ filter: 'blur(7px)', transition: 'fill-opacity 0.4s' }} />

      {/* Nameplate */}
      <rect x="17" y={h - 8} width="120" height="22" rx="4" fill="#000" fillOpacity="0.85" stroke={color} strokeWidth="1" />
      <rect x="17" y={h - 8} width="120" height="22" rx="4" fill={color} fillOpacity="0.06" />
      <text x="77" y={h + 8} textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">CONTENT AGENT</text>
    </svg>
  );
};

/* ─── BUILDING 3: Brutalist Industrial Tower ─── */
const BrutalistBuilding = ({ color, hovered, w = 180, h = 430 }) => {
  const id = 'bb';
  return (
    <svg width={w} height={h + 80} viewBox={`0 0 ${w} ${h + 80}`} overflow="visible"
      style={{ filter: hovered ? `drop-shadow(0 0 32px ${color}) drop-shadow(0 0 60px ${color}60)` : `drop-shadow(0 0 14px ${color}90)`, transition: 'filter 0.5s ease' }}>
      <defs>
        <linearGradient id={`${id}main`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor="#120900" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}upper`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0c0700" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a0600" stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Base slab */}
      <polygon points={`12,${h + 12} 130,${h + 12} 165,${h - 8} 47,${h - 8}`}
        fill={color} fillOpacity="0.12" stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Main tower block */}
      <rect x="12" y="80" width="118" height={h - 80} fill={`url(#${id}main)`} stroke={color} strokeWidth="0.7" strokeOpacity="0.5" />
      {/* Side of main block */}
      <polygon points={`130,80 165,60 165,${h - 8} 130,${h + 12}`} fill={`url(#${id}side)`} stroke={color} strokeWidth="0.4" strokeOpacity="0.4" />
      {/* Top of main block */}
      <polygon points="12,80 130,80 165,60 47,60" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.6" />

      {/* Upper setback block */}
      <rect x="28" y="36" width="84" height="46" fill={`url(#${id}upper)`} stroke={color} strokeWidth="0.6" strokeOpacity="0.6" />
      <polygon points="112,36 148,18 148,18 112,36" fill={color} fillOpacity="0.1" />
      <polygon points="112,36 148,18 148,62 112,82" fill={`url(#${id}side)`} stroke={color} strokeWidth="0.4" />
      <polygon points="28,36 112,36 148,18 64,18" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="0.5" />

      {/* Brutalist horizontal concrete bands */}
      {[100, 160, 220, 300, 370].map((y, i) => (
        <rect key={i} x="12" y={y} width="118" height="5" fill={color} fillOpacity="0.12" />
      ))}

      {/* Windows – brutalist slits */}
      {Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => {
          const lit = (row * 3 + col) % 4 !== 0;
          return (
            <rect key={`${row}-${col}`}
              x={18 + col * 22} y={90 + row * 33} width={14} height={24}
              fill={color} fillOpacity={lit ? 0.55 : 0.04}
              style={{ animation: lit ? `agentBlink ${2 + (row + col) * 0.15}s ${row * 0.2}s infinite` : 'none' }}
            />
          );
        })
      )}

      {/* Upper block windows */}
      {Array.from({ length: 2 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => (
          <rect key={`u${row}-${col}`} x={33 + col * 20} y={42 + row * 16} width={13} height={11}
            fill={color} fillOpacity={0.5}
            style={{ animation: `agentBlink ${1.6}s ${col * 0.2}s infinite` }} />
        ))
      )}

      {/* Construction crane */}
      {/* Vertical mast */}
      <line x1="95" y1="36" x2="95" y2="-50" stroke={color} strokeWidth="3" strokeOpacity="0.85" />
      {/* Horizontal jib */}
      <line x1="95" y1="-50" x2="155" y2="-50" stroke={color} strokeWidth="3" strokeOpacity="0.85" />
      {/* Counter jib */}
      <line x1="95" y1="-50" x2="55" y2="-30" stroke={color} strokeWidth="2" strokeOpacity="0.6" />
      {/* Support wires */}
      <line x1="95" y1="-50" x2="135" y2="-28" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="95" y1="-50" x2="155" y2="-30" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      {/* Counterweight */}
      <rect x="47" y="-38" width="14" height="10" fill={color} fillOpacity="0.7" />
      {/* Trolley + hook */}
      <rect x="138" y="-54" width="10" height="6" fill={color} fillOpacity="0.8"
        style={{ animation: 'craneTrolley 4s ease-in-out infinite' }} />
      <line x1="143" y1="-48" x2="143" y2="-18" stroke={color} strokeWidth="1.5" strokeOpacity="0.85"
        style={{ animation: 'craneTrolley 4s ease-in-out infinite' }} />
      <path d="M139,-18 L143,-12 L147,-18" fill="none" stroke={color} strokeWidth="2"
        style={{ animation: 'craneTrolley 4s ease-in-out infinite' }} />

      {/* Progress % badge */}
      <rect x="20" y={h - 50} width="80" height="28" rx="4" fill="rgba(0,0,0,0.7)" stroke={color} strokeWidth="0.8" />
      <rect x="24" y={h - 43} width="72" height="8" rx="4" fill={color} fillOpacity="0.2" />
      <rect x="24" y={h - 43} width="54" height="8" rx="4" fill={color} fillOpacity="0.7" />
      <text x="60" y={h - 28} textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace">BUILD 76%</text>

      {/* Ground halo */}
      <ellipse cx="78" cy={h + 18} rx="70" ry="11" fill={color} fillOpacity={hovered ? 0.16 : 0.05}
        style={{ filter: 'blur(8px)', transition: 'fill-opacity 0.4s' }} />

      {/* Nameplate */}
      <rect x="4" y={h - 8} width="136" height="22" rx="4" fill="#000" fillOpacity="0.85" stroke={color} strokeWidth="1" />
      <rect x="4" y={h - 8} width="136" height="22" rx="4" fill={color} fillOpacity="0.06" />
      <text x="72" y={h + 8} textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">PROJECTS &amp; STARTUP</text>
    </svg>
  );
};

/* ─── BUILDING 4: Fortress ─── */
const FortressBuilding = ({ color, hovered, w = 160, h = 370 }) => {
  const id = 'fb';
  return (
    <svg width={w} height={h + 60} viewBox={`0 0 ${w} ${h + 60}`} overflow="visible"
      style={{ filter: hovered ? `drop-shadow(0 0 32px ${color}) drop-shadow(0 0 60px ${color}60)` : `drop-shadow(0 0 14px ${color}90)`, transition: 'filter 0.5s ease' }}>
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor="#001609" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000e05" stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={`${id}tower`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor="#001609" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* Corner towers */}
      <rect x="0" y="30" width="28" height={h - 10} fill={`url(#${id}tower)`} stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />
      <rect x="102" y="30" width="28" height={h - 10} fill={`url(#${id}tower)`} stroke={color} strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Main wall */}
      <rect x="14" y="55" width="102" height={h - 30} fill={`url(#${id}wall)`} stroke={color} strokeWidth="0.7" strokeOpacity="0.55" />
      {/* Side wall */}
      <polygon points={`130,55 158,35 158,${h - 12} 130,${h + 8}`} fill={`url(#${id}side)`} stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
      {/* Roof */}
      <polygon points="14,55 130,55 158,35 42,35" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="0.6" />

      {/* Battlements on main wall */}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={16 + i * 13} y="40" width="9" height="18"
          fill="#000e05" stroke={color} strokeWidth="0.7" strokeOpacity="0.85" />
      ))}
      {/* Tower battlements */}
      {[0, 18].map((x, ti) =>
        Array.from({ length: 3 }, (_, i) => (
          <rect key={`t${ti}${i}`} x={x + 2 + i * 9} y="15" width="7" height="18"
            fill="#000e05" stroke={color} strokeWidth="0.7" strokeOpacity="0.9" />
        ))
      )}

      {/* Windows — slit style */}
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => {
          const lit = (row + col) % 3 !== 2;
          return (
            <rect key={`${row}-${col}`}
              x={22 + col * 24} y={65 + row * 37} width={12} height={24}
              rx="3" fill={color} fillOpacity={lit ? 0.6 : 0.06}
              style={{ animation: lit ? `agentBlink ${2.2 + row * 0.12}s ${col * 0.25}s infinite` : 'none' }}
            />
          );
        })
      )}
      {/* Tower windows */}
      {[0, 102].map((tx, ti) =>
        Array.from({ length: 5 }, (_, row) => (
          <rect key={`tw${ti}${row}`} x={tx + 8} y={45 + row * 40} width={12} height={22}
            rx="2" fill={color} fillOpacity={row % 2 === 0 ? 0.55 : 0.1}
            style={{ animation: `agentBlink ${1.8}s ${ti + row * 0.3}s infinite` }} />
        ))
      )}

      {/* Shield emblem center */}
      <path d="M65,90 L65,68 L50,74 L50,90 C50,99 65,105 65,105 C65,105 80,99 80,90 L80,74 Z"
        fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.9" />
      <path d="M65,90 L65,78 L57,81 L57,90 C57,94 65,97 65,97 C65,97 73,94 73,90 L73,81 Z"
        fill={color} fillOpacity="0.25" />

      {/* Health monitors on wall */}
      <rect x="20" y={h - 70} width="100" height="36" rx="5" fill="rgba(0,0,0,0.75)" stroke={color} strokeWidth="0.8" />
      <text x="70" y={h - 57} textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace" fontWeight="bold">SYSTEM STATUS</text>
      {/* Health bars */}
      {[['CPU', 78], ['RAM', 62], ['NET', 95]].map(([label, pct], i) => (
        <g key={label}>
          <text x="25" y={h - 42 + i * 10} fill={color} fontSize="5.5" fontFamily="monospace" fillOpacity="0.7">{label}</text>
          <rect x="44" y={h - 48 + i * 10} width="68" height="5" rx="2" fill={color} fillOpacity="0.1" />
          <rect x="44" y={h - 48 + i * 10} width={68 * pct / 100} height="5" rx="2" fill={color} fillOpacity="0.7" />
        </g>
      ))}

      {/* Corner tower beacons */}
      {[14, 116].map((x, i) => (
        <circle key={i} cx={x} cy="14" r="5" fill={color}
          style={{ animation: `agentBlink ${1.4 + i * 0.3}s ${i * 0.7}s infinite` }} />
      ))}

      {/* Ground halo */}
      <ellipse cx="72" cy={h + 14} rx="70" ry="10" fill={color} fillOpacity={hovered ? 0.16 : 0.05}
        style={{ filter: 'blur(8px)', transition: 'fill-opacity 0.4s' }} />

      {/* Nameplate */}
      <rect x="8" y={h - 8} width="114" height="22" rx="4" fill="#000" fillOpacity="0.85" stroke={color} strokeWidth="1" />
      <rect x="8" y={h - 8} width="114" height="22" rx="4" fill={color} fillOpacity="0.06" />
      <text x="65" y={h + 8} textAnchor="middle" fill={color} fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">OPERATIONAL AGENT</text>
    </svg>
  );
};

const BUILDING_COMPONENTS = {
  'glass-skyscraper': GlassSkyscraper,
  'curved': CurvedBuilding,
  'brutalist': BrutalistBuilding,
  'fortress': FortressBuilding,
};

export const MyAgentsModal = ({ isOpen, onClose }) => {
  const [hovered, setHovered] = useState(null);
  const [particles, setParticles] = useState([]);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const pts = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 5}s`,
      size: `${1.5 + Math.random() * 3.5}px`,
      color: ['#00f5ff', '#bd00ff', '#ff9500', '#00ff88', '#ffffff'][Math.floor(Math.random() * 5)],
      driftX: `${(Math.random() - 0.5) * 80}px`,
    }));
    setParticles(pts);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'radial-gradient(ellipse at 50% 60%, #0a0218 0%, #020208 60%, #000005 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
      paddingTop: '40px',
      animation: 'agentModalIn 0.45s cubic-bezier(0.23,1,0.32,1)',
      overflow: 'hidden',
    }}>

      {/* Ambient star-field */}
      {Array.from({ length: 80 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 70}%`,
          width: `${Math.random() > 0.8 ? 2 : 1}px`,
          height: `${Math.random() > 0.8 ? 2 : 1}px`,
          background: '#fff',
          borderRadius: '50%',
          opacity: Math.random() * 0.5 + 0.1,
          animation: `agentBlink ${2 + Math.random() * 4}s ${Math.random() * 3}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Ember particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: p.left, bottom: '-10px',
          width: p.size, height: p.size,
          background: p.color,
          borderRadius: '50%',
          boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}60`,
          animation: `emberRise ${p.duration} ${p.delay} ease-out infinite`,
          opacity: 0,
          pointerEvents: 'none',
          '--driftX': p.driftX,
        }} />
      ))}

      {/* Neon city grid ground */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '38%',
        backgroundImage: `
          linear-gradient(rgba(0,245,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.07) 1px, transparent 1px),
          linear-gradient(rgba(189,0,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(189,0,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px, 50px 50px, 10px 10px, 10px 10px',
        transform: 'perspective(700px) rotateX(65deg)',
        transformOrigin: 'bottom center',
        maskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Multi-color ground glows */}
      <div style={{ position: 'absolute', bottom: '8%', left: 0, right: 0, height: '120px', pointerEvents: 'none' }}>
        {AGENTS.map((a, i) => (
          <div key={a.id} style={{
            position: 'absolute',
            left: `${15 + i * 20}%`, bottom: 0,
            width: '18%', height: '100%',
            background: `radial-gradient(ellipse, ${a.shadow}25 0%, transparent 70%)`,
            filter: 'blur(20px)',
            transition: 'opacity 0.4s',
            opacity: hovered === a.id ? 1 : 0.4,
          }} />
        ))}
      </div>

      {/* Close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 24, right: 28,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '50%', width: 44, height: 44,
        cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
        fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.25s', zIndex: 20, fontWeight: 200,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,60,60,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,60,60,0.6)'; e.currentTarget.style.color = '#ff5555'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
      >×</button>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32, zIndex: 2, position: 'relative' }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 7, color: 'rgba(0,245,255,0.55)', marginBottom: 10, textTransform: 'uppercase' }}>
          ◈ AI CONTROL CENTER ◈
        </div>
        <h1 style={{
          fontFamily: "'Space Mono',monospace", fontSize: 40, fontWeight: 700,
          margin: 0, letterSpacing: 4,
          background: 'linear-gradient(90deg, #00f5ff 0%, #bd00ff 40%, #ff9500 70%, #00ff88 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          filter: 'drop-shadow(0 0 40px rgba(0,245,255,0.45))',
        }}>MY AGENTS</h1>
        <div style={{ fontFamily: "'Open Sans',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8, letterSpacing: 1 }}>
          Hover to inspect · Click to enter control panel
        </div>
      </div>

      {/* City skyline */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 32,
        justifyContent: 'center',
        zIndex: 2,
        position: 'relative',
        padding: '0 40px',
        transform: 'perspective(1600px) rotateX(4deg)',
        perspectiveOrigin: '50% 90%',
      }}>
        {AGENTS.map((agent, idx) => {
          const BuildingComp = BUILDING_COMPONENTS[agent.style];
          const isHov = hovered === agent.id;
          const arcOffsets = [0, 25, 15, 35];
          const scaleFactors = [1, 0.9, 0.95, 0.88];
          return (
            <div key={agent.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* Hover info card — above building */}
              <div style={{
                position: 'absolute',
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: 16,
                background: 'rgba(4,4,16,0.96)',
                border: `1px solid ${agent.color}55`,
                borderRadius: 14, padding: '12px 18px',
                minWidth: 210,
                boxShadow: `0 8px 32px ${agent.shadow}35, inset 0 1px 0 rgba(255,255,255,0.06)`,
                opacity: isHov ? 1 : 0,
                transform: isHov ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(8px)',
                pointerEvents: 'none',
                transition: 'opacity 0.3s, transform 0.3s',
                zIndex: 20,
                backdropFilter: 'blur(20px)',
              }}>
                <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: 3, color: agent.color, marginBottom: 6 }}>
                  ● {agent.status}
                </div>
                <div style={{ fontSize: 13, color: '#fff', fontWeight: 700, marginBottom: 5 }}>{agent.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 8 }}>{agent.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: agent.color, fontFamily: 'monospace' }}>
                  <span style={{ width: 6, height: 6, background: agent.color, borderRadius: '50%', display: 'inline-block' }} />
                  {agent.metric}
                </div>
              </div>

              {/* Building wrapper */}
              <div
                onMouseEnter={() => setHovered(agent.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => alert(`Entering ${agent.name}...`)}
                style={{
                  cursor: 'pointer',
                  transform: isHov
                    ? `translateY(-22px) scale(1.04)`
                    : `translateY(${arcOffsets[idx]}px) scale(${scaleFactors[idx]})`,
                  transition: 'transform 0.4s cubic-bezier(0.23,1,0.32,1)',
                  transformOrigin: 'bottom center',
                  position: 'relative',
                }}
              >
                {/* Mirror reflection */}
                <div style={{
                  position: 'absolute', bottom: -20, left: 0, right: 0,
                  transform: 'scaleY(-0.12) scaleX(0.92)',
                  transformOrigin: 'bottom center',
                  opacity: isHov ? 0.3 : 0.12,
                  filter: 'blur(3px)',
                  transition: 'opacity 0.4s',
                  pointerEvents: 'none',
                }}>
                  <BuildingComp color={agent.color} hovered={false} w={agent.width} h={agent.height} />
                </div>

                <BuildingComp color={agent.color} hovered={isHov} w={agent.width} h={agent.height} />
              </div>

              {/* Status pill */}
              <div style={{
                marginTop: 14,
                fontFamily: 'monospace', fontSize: 10, letterSpacing: 2,
                color: agent.color,
                background: `rgba(${agent.colorRgb},0.08)`,
                border: `1px solid ${agent.color}45`,
                borderRadius: 20, padding: '5px 14px',
                boxShadow: isHov ? `0 0 16px ${agent.color}70` : 'none',
                transition: 'box-shadow 0.4s',
                whiteSpace: 'nowrap',
              }}>
                ● {agent.status}
              </div>
            </div>
          );
        })}
      </div>

      {/* Atmospheric fog band */}
      <div style={{
        position: 'absolute', bottom: '26%', left: 0, right: 0, height: '60px',
        background: 'linear-gradient(transparent, rgba(2,2,12,0.35), transparent)',
        pointerEvents: 'none',
      }} />

      <style>{`
        @keyframes agentModalIn {
          from { opacity: 0; transform: scale(0.94) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes agentBlink {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 0.15; }
        }
        @keyframes emberRise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          8%   { opacity: 0.9; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-85vh) translateX(var(--driftX, 0px)); opacity: 0; }
        }
        @keyframes dataStreamUp {
          0%   { stroke-dashoffset: 0; opacity: 0.5; }
          100% { stroke-dashoffset: -80; opacity: 0; }
        }
        @keyframes floatPixelSide {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
          50%       { transform: translateY(-16px) translateX(5px); opacity: 1; }
        }
        @keyframes craneSwing {
          0%, 100% { transform: rotate(-10deg); }
          50%       { transform: rotate(10deg); }
        }
        @keyframes craneTrolley {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(-20px); }
        }
      `}</style>
    </div>
  );
};
