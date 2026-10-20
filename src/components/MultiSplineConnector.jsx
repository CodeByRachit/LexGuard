import React, { useState, useEffect, useCallback } from 'react';

export default function MultiSplineConnector({
  activeTab = 'triage',
  selectedClauseId,
}) {
  const [coords, setCoords] = useState(null);

  const calculatePositions = useCallback(() => {
    if (activeTab !== 'triage') {
      setCoords(null);
      return;
    }

    const startEl = document.getElementById('clause-anchor-active');
    const slab1El = document.getElementById('card-slab-1-anchor');
    const slab2El = document.getElementById('card-slab-2-anchor');
    const slab3El = document.getElementById('card-slab-3-anchor');
    const secEl = document.getElementById('clause-anchor-secondary');

    if (!startEl || !slab1El) {
      setCoords(null);
      return;
    }

    const sRect = startEl.getBoundingClientRect();
    const c1Rect = slab1El.getBoundingClientRect();
    const c2Rect = slab2El ? slab2El.getBoundingClientRect() : null;
    const c3Rect = slab3El ? slab3El.getBoundingClientRect() : null;
    const secRect = secEl ? secEl.getBoundingClientRect() : null;

    const x1 = sRect.left + sRect.width / 2;
    const y1 = sRect.top + sRect.height / 2;

    const x2_1 = c1Rect.left + c1Rect.width / 2;
    const y2_1 = c1Rect.top + c1Rect.height / 2;

    const x2_2 = c2Rect ? c2Rect.left + c2Rect.width / 2 : x2_1;
    const y2_2 = c2Rect ? c2Rect.top + c2Rect.height / 2 : y2_1 + 180;

    const x2_3 = c3Rect ? c3Rect.left + c3Rect.width / 2 : x2_1;
    const y2_3 = c3Rect ? c3Rect.top + c3Rect.height / 2 : y2_1 + 360;

    // Smooth horizontal Bezier control point offset
    const dx1 = Math.max((x2_1 - x1) * 0.48, 80);
    const dx2 = Math.max((x2_2 - x1) * 0.44, 75);
    const dx3 = Math.max((x2_3 - x1) * 0.42, 70);

    const path1 = `M ${x1} ${y1} C ${x1 + dx1} ${y1}, ${x2_1 - dx1} ${y2_1}, ${x2_1} ${y2_1}`;
    const path2 = `M ${x1} ${y1} C ${x1 + dx2} ${y1}, ${x2_2 - dx2} ${y2_2}, ${x2_2} ${y2_2}`;
    const path3 = `M ${x1} ${y1} C ${x1 + dx3} ${y1}, ${x2_3 - dx3} ${y2_3}, ${x2_3} ${y2_3}`;

    let pathSec = null;
    if (secRect) {
      const xSec = secRect.left + secRect.width / 2;
      const ySec = secRect.top + secRect.height / 2;
      const dxSec = 45;
      pathSec = `M ${xSec} ${ySec} C ${xSec + dxSec} ${ySec}, ${x1 - dxSec} ${y1}, ${x1} ${y1}`;
    }

    setCoords({
      x1,
      y1,
      x2_1,
      y2_1,
      x2_2,
      y2_2,
      x2_3,
      y2_3,
      path1,
      path2,
      path3,
      pathSec,
    });
  }, [activeTab]);

  useEffect(() => {
    calculatePositions();

    const handleUpdate = () => calculatePositions();
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate, true);

    const timer = setTimeout(calculatePositions, 80);
    const timer2 = setTimeout(calculatePositions, 300);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate, true);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [calculatePositions, selectedClauseId, activeTab]);

  if (!coords) return null;

  return (
    <svg className="pointer-events-none fixed inset-0 z-30 w-full h-full overflow-visible">
      <defs>
        {/* Glow Filters */}
        <filter id="emeraldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10B981" floodOpacity="0.85" />
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#34D399" floodOpacity="0.9" />
        </filter>

        <filter id="tealGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#14B8A6" floodOpacity="0.75" />
        </filter>

        <filter id="amberGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#F59E0B" floodOpacity="0.85" />
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FBBF24" floodOpacity="0.9" />
        </filter>

        {/* Linear Gradients along splines */}
        <linearGradient id="emeraldSplineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="tealSplineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="60%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        <linearGradient id="amberSplineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Markers */}
        <marker id="emeraldMarker" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <circle cx="5" cy="5" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
        </marker>
        <marker id="tealMarker" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <circle cx="5" cy="5" r="4" fill="#14B8A6" stroke="#FFFFFF" strokeWidth="1.5" />
        </marker>
        <marker id="amberMarker" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <circle cx="5" cy="5" r="4" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
        </marker>
      </defs>

      {/* ── 4. CONTEXT CROSS-REFERENCE HAIRLINE (Secondary clause filament) ── */}
      {coords.pathSec && (
        <g opacity="0.65">
          <path
            d={coords.pathSec}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.8"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* ── 3. TERTIARY WARM AMBER/GOLD TUBE (To Card 3: Lawyer Escalation) ── */}
      <g>
        {/* Outer Glow Halo */}
        <path
          d={coords.path3}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="7"
          strokeOpacity="0.28"
          strokeLinecap="round"
          filter="url(#amberGlowFilter)"
        />
        {/* Solid Conduit Body */}
        <path
          d={coords.path3}
          fill="none"
          stroke="url(#amberSplineGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          markerEnd="url(#amberMarker)"
        />
        {/* Animated Amber Specular Core Pulse */}
        <path
          d={coords.path3}
          fill="none"
          stroke="#FFFBEB"
          strokeWidth="1.2"
          strokeDasharray="10 24"
          strokeLinecap="round"
          className="animate-pulse"
        />
      </g>

      {/* ── 2. SECONDARY TEAL/SILVER TRANSLATION TUBE (To Card 2: Plain English) ── */}
      <g>
        {/* Outer Glow Halo */}
        <path
          d={coords.path2}
          fill="none"
          stroke="#14B8A6"
          strokeWidth="6"
          strokeOpacity="0.24"
          strokeLinecap="round"
          filter="url(#tealGlowFilter)"
        />
        {/* Solid Conduit Body */}
        <path
          d={coords.path2}
          fill="none"
          stroke="url(#tealSplineGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          markerEnd="url(#tealMarker)"
        />
        {/* Animated Specular Core */}
        <path
          d={coords.path2}
          fill="none"
          stroke="#F0FDFA"
          strokeWidth="1.1"
          strokeDasharray="8 20"
          strokeLinecap="round"
          className="animate-pulse"
        />
      </g>

      {/* ── 1. PRIMARY EMERALD TUBE (To Card 1: Verbatim Ground Truth) ── */}
      <g>
        {/* Outer Glow Halo */}
        <path
          d={coords.path1}
          fill="none"
          stroke="#10B981"
          strokeWidth="8.5"
          strokeOpacity="0.32"
          strokeLinecap="round"
          filter="url(#emeraldGlowFilter)"
        />
        {/* Solid Radiant Emerald Tube */}
        <path
          d={coords.path1}
          fill="none"
          stroke="url(#emeraldSplineGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          markerEnd="url(#emeraldMarker)"
        />
        {/* High-Intensity White Specular Pulse */}
        <path
          d={coords.path1}
          fill="none"
          stroke="#ECFDF5"
          strokeWidth="1.6"
          strokeDasharray="14 18"
          strokeLinecap="round"
          className="animate-pulse"
        />
      </g>
    </svg>
  );
}
