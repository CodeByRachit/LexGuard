import React, { useState, useRef } from 'react';
import {
  FileText,
  Cpu,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import ThreePipelineNodeCanvas from './ThreePipelineNodeCanvas';

/**
 * ThreePipelineStage
 * Section 2: Elevated 3D Exploded Pipeline Stage
 * 4 Interactive Spatial 3D Pedestals connected by glowing animated light tubes
 * Features:
 * - Full 3D perspective tilt per node card with transformStyle: preserve-3d
 * - Layered translateZ elevation (canvas, badge, text float at distinct physical heights)
 * - Dynamic specular glare sheen following cursor
 * - Glowing 3D light-guide conveyor track connecting nodes
 */
export default function ThreePipelineStage() {
  const nodes = [
    {
      id: 1,
      badge: '01 • INGESTION',
      pill: 'PyMuPDF RAM Parser',
      title: '1. Clause DNA Split',
      description:
        'Extracts text & page coordinates 100% in local RAM with zero disk residue or temp-file footprint.',
      stat: '< 12ms Extraction',
      accentColor: 'emerald',
    },
    {
      id: 2,
      badge: '02 • LOCAL INFERENCE',
      pill: 'Gemma 3n E4B Engine',
      title: '2. On-Device Gemma Triage',
      description:
        'Runs quantized edge inference locally. Zero bytes sent to cloud servers (0.0 KB/s network telemetry).',
      stat: 'HF_HUB_OFFLINE=1',
      accentColor: 'teal',
    },
    {
      id: 3,
      badge: '03 • VERIFICATION',
      pill: 'CUAD 41 Taxonomy',
      title: '3. Verbatim Quote Verifier',
      description:
        'Programmatically checks every cited quote word-for-word against source clauses. Flags "Document is Silent" when terms are missing.',
      stat: '100% Substring Match',
      accentColor: 'blue',
    },
    {
      id: 4,
      badge: '04 • ESCALATION',
      pill: 'India Code § 27 / § 74',
      title: '4. Plain English & Escalation',
      description:
        'Flags vague legalese ("sole discretion"), maps statutory context, and prepares 2 precise questions for a real advocate.',
      stat: 'Page 8 Safe Refusal',
      accentColor: 'amber',
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 my-16 w-full">
      <div className="rounded-[36px] bg-white/80 backdrop-blur-3xl border border-white/95 shadow-[0_35px_70px_-15px_rgba(24,24,27,0.09),0_12px_30px_rgba(24,24,27,0.04),inset_0_1px_0_rgba(255,255,255,0.95)] p-8 sm:p-12 relative overflow-hidden">
        {/* Ambient Decorative Gradient Depth Glows */}
        <div className="absolute -top-28 -left-28 w-[420px] h-[420px] bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -right-28 w-[420px] h-[420px] bg-amber-300/18 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-200/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>How LexGuard Works • 100% On-Device Deterministic Pipeline</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] tracking-tight leading-snug">
            How LexGuard Analyzes Your Contract <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-800 via-teal-700 to-stone-800 bg-clip-text text-transparent">
              Without Ever Touching the Cloud
            </span>
          </h2>

          <p className="mt-3.5 text-stone-600 text-sm sm:text-base leading-relaxed">
            A 4-stage deterministic pipeline that turns complex legal PDFs into verified, citation-backed
            plain English inside local volatile RAM.
          </p>
        </div>

        {/* Desktop Illuminated 3D Conveyor Rail (Backdrop Tube) */}
        <div className="hidden lg:block absolute left-12 right-12 top-[270px] h-2 bg-gradient-to-r from-emerald-200/60 via-teal-200/60 to-amber-200/60 rounded-full blur-[1px] pointer-events-none z-0">
          <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 opacity-40 animate-pulse" />
        </div>

        {/* 4 Spatial Interactive 3D Pedestals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {nodes.map((node, idx) => (
            <PipelineTiltNode key={node.id} node={node} isLast={idx === nodes.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * PipelineTiltNode: Spatial 3D Card with preserve-3d and cursor parallax
 */
function PipelineTiltNode({ node, isLast }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8; // max 8 deg
    const rotY = ((x - centerX) / centerX) * 8; // max 8 deg

    setTransformStyle(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`
    );

    setGlareStyle({
      opacity: 0.8,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)');
    setGlareStyle({ opacity: 0, x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.16s ease-out',
      }}
      className="group relative rounded-3xl bg-white/85 backdrop-blur-xl border border-white/95 p-5 shadow-[0_16px_36px_-12px_rgba(24,24,27,0.08),0_2px_8px_rgba(24,24,27,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] hover:shadow-[0_28px_56px_-12px_rgba(24,24,27,0.16),0_6px_16px_rgba(24,24,27,0.05)] transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* 3D Specular Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle 180px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.65), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Desktop Inter-Card Flow Arrow */}
      {!isLast && (
        <div
          style={{ transform: 'translateZ(30px)' }}
          className="hidden lg:flex absolute -right-3.5 top-24 z-30 w-7 h-7 rounded-full bg-white border border-stone-200/90 shadow-md items-center justify-center text-stone-400 group-hover:text-emerald-600 group-hover:scale-115 transition-all pointer-events-none"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      )}

      {/* 3D Diorama Mini-Viewport (pops out at translateZ(32px)) */}
      <div
        style={{ transform: 'translateZ(32px)' }}
        className="w-full h-40 rounded-2xl bg-gradient-to-b from-[#F9F7F2] to-white border border-stone-200/70 mb-4 overflow-hidden relative shadow-[inset_0_2px_6px_rgba(0,0,0,0.03),0_6px_16px_-4px_rgba(0,0,0,0.06)]"
      >
        <ThreePipelineNodeCanvas nodeId={node.id} />
        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 text-[10px] font-mono font-bold text-stone-700 shadow-xs">
          {node.badge}
        </div>
      </div>

      {/* Content Area (pops out at translateZ(20px)) */}
      <div style={{ transform: 'translateZ(20px)' }}>
        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
          {node.pill}
        </span>

        <h3 className="text-base font-extrabold text-[#111827] tracking-tight mb-2">
          {node.title}
        </h3>

        <p className="text-xs text-stone-600 leading-relaxed">
          {node.description}
        </p>
      </div>

      {/* Footer Stat Pill (pops out at translateZ(24px)) */}
      <div
        style={{ transform: 'translateZ(24px)' }}
        className="mt-4 pt-3 border-t border-stone-100/90 flex items-center justify-between text-[11px] font-medium text-stone-500"
      >
        <span>Verification:</span>
        <span className="font-mono font-bold text-emerald-700 bg-emerald-50/90 px-2.5 py-0.5 rounded-lg border border-emerald-200/80 shadow-2xs">
          {node.stat}
        </span>
      </div>
    </div>
  );
}
