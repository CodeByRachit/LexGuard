import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Cpu,
  Check,
  Activity,
  Layers,
} from 'lucide-react';
import ThreeCardDiorama from './ThreeCardDiorama';

/**
 * ThreeFeatureCards
 * Section 3: Three 3D Sculptural Feature Cards with Top Diorama Viewports
 * Features:
 * - True 3D perspective tilt on mouse move with transformStyle: preserve-3d
 * - Multi-layer translateZ physical depth elevation (diorama pops out 38px, badge 26px, text 18px, pill 28px)
 * - Dynamic specular glare sheen following cursor over frosted glass
 * - Card 1: "Private by Physics, Not Just Policy" (Gate L2 Proof) + Vault Cube Diorama
 * - Card 2: "Zero Hallucinations & Silent-Document Honesty" (Criterion 2 & CUAD) + Clause Tiles Diorama
 * - Card 3: "Know the Traps—And When to Call a Lawyer" (Criterion 3 & India Code / OIL) + Statutory Pillars Diorama
 * - Tactile 3D bottom CTA banner launching Page 2
 */
export default function ThreeFeatureCards({
  onLoadSample,
  onOpenCuadModal,
  auditData,
}) {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pb-20 w-full">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100/90 border border-stone-200/90 text-stone-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-stone-900" />
          <span>Why LexGuard Matters</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
          Private by Physics, Not Just Policy. <br />
          <span className="text-stone-500 font-semibold text-2xl sm:text-3xl">
            Built for High-Stakes Legal Agreements.
          </span>
        </h2>

        <p className="mt-3.5 text-stone-600 text-sm sm:text-base leading-relaxed">
          Standard cloud AI chatbots read and retain your confidential PDFs. LexGuard operates strictly
          inside an encrypted, volatile on-device sandbox.
        </p>
      </div>

      {/* 3 Interactive Spatial 3D Diorama Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* ─── CARD 1: PRIVATE BY PHYSICS (GATE L2) ─── */}
        <SpatialTiltCard>
          <div className="h-full flex flex-col justify-between">
            <div>
              {/* Top 3D Diorama Viewport (pops out at translateZ(38px)) */}
              <div
                style={{ transform: 'translateZ(38px)' }}
                className="w-full h-56 rounded-2xl bg-gradient-to-b from-[#F7F5F0] to-white border border-stone-200/80 mb-6 overflow-hidden relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.04),0_8px_20px_-6px_rgba(0,0,0,0.08)]"
              >
                <ThreeCardDiorama type="vault" />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 text-[10.5px] font-mono font-bold text-emerald-800 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>GATE L2 • AIR-GAPPED</span>
                </div>
              </div>

              {/* Title & Badge (pops out at translateZ(26px)) */}
              <div style={{ transform: 'translateZ(26px)' }}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold uppercase tracking-wider mb-3 shadow-2xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Zero Network Exposure</span>
                </div>

                <h3 className="text-xl font-extrabold text-[#111827] tracking-tight mb-3">
                  Private by Physics, Not Just Policy
                </h3>
              </div>

              {/* Plain-English Value (pops out at translateZ(18px)) */}
              <p
                style={{ transform: 'translateZ(18px)' }}
                className="text-stone-600 text-sm leading-relaxed mb-4"
              >
                Uploading employment offers, severance terms, or residential leases to external chatbots
                risks massive NDA and privacy breaches. LexGuard runs with{' '}
                <code className="px-1.5 py-0.5 rounded bg-stone-100 font-mono text-xs text-stone-800 font-bold border border-stone-200/60">
                  HF_HUB_OFFLINE=1
                </code>{' '}
                and AES-256-GCM volatile RAM vaulting—so your sensitive contract never leaves your physical silicon.
              </p>
            </div>

            {/* Interactive Footer Pill (pops out at translateZ(28px)) */}
            <div
              style={{ transform: 'translateZ(28px)' }}
              className="pt-4 border-t border-stone-100/90 flex items-center justify-between text-xs"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50/90 text-emerald-800 border border-emerald-200 font-mono font-bold text-[11px] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>🟢 Live Check: 0 Outbound Sockets Active</span>
              </span>
            </div>
          </div>
        </SpatialTiltCard>

        {/* ─── CARD 2: ZERO HALLUCINATIONS & CUAD (CRITERION 2) ─── */}
        <SpatialTiltCard>
          <div className="h-full flex flex-col justify-between">
            <div>
              {/* Top 3D Diorama Viewport (pops out at translateZ(38px)) */}
              <div
                style={{ transform: 'translateZ(38px)' }}
                className="w-full h-56 rounded-2xl bg-gradient-to-b from-[#F7F5F0] to-white border border-stone-200/80 mb-6 overflow-hidden relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.04),0_8px_20px_-6px_rgba(0,0,0,0.08)]"
              >
                <ThreeCardDiorama type="clauses" />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 text-[10.5px] font-mono font-bold text-blue-800 flex items-center gap-1.5 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>CRITERION 2 • VERIFIED</span>
                </div>
              </div>

              {/* Title & Badge (pops out at translateZ(26px)) */}
              <div style={{ transform: 'translateZ(26px)' }}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-800 text-[11px] font-bold uppercase tracking-wider mb-3 shadow-2xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>100% Substring Grounding</span>
                </div>

                <h3 className="text-xl font-extrabold text-[#111827] tracking-tight mb-3">
                  Zero Hallucinations & Silent-Document Honesty
                </h3>
              </div>

              {/* Plain-English Value (pops out at translateZ(18px)) */}
              <p
                style={{ transform: 'translateZ(18px)' }}
                className="text-stone-600 text-sm leading-relaxed mb-4"
              >
                LexGuard eliminates AI hallucinations by programmatically binding every single summary bullet
                to an exact, verifiable character span in your contract. All clauses are benchmarked against{' '}
                <strong className="text-stone-900 font-bold">Resource 1 (CUAD 41 Categories)</strong>, and when a topic isn't in your document, LexGuard fires a clear{' '}
                <strong className="text-blue-900 font-bold">"Document is Silent"</strong> alert rather than fabricating terms.
              </p>
            </div>

            {/* Interactive Footer Pill (pops out at translateZ(28px)) */}
            <div
              style={{ transform: 'translateZ(28px)' }}
              className="pt-4 border-t border-stone-100/90 flex items-center justify-between text-xs"
            >
              <button
                type="button"
                onClick={onOpenCuadModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-mono font-bold text-[11px] transition-all cursor-pointer shadow-2xs hover:scale-102"
              >
                <span>📘 Resource 1: CUAD (CC BY 4.0) Integrated</span>
                <ExternalLink className="w-3 h-3 text-blue-600" />
              </button>
            </div>
          </div>
        </SpatialTiltCard>

        {/* ─── CARD 3: KNOW THE TRAPS & CALL A LAWYER (CRITERION 3 & INDIA CODE) ─── */}
        <SpatialTiltCard>
          <div className="h-full flex flex-col justify-between">
            <div>
              {/* Top 3D Diorama Viewport (pops out at translateZ(38px)) */}
              <div
                style={{ transform: 'translateZ(38px)' }}
                className="w-full h-56 rounded-2xl bg-gradient-to-b from-[#F7F5F0] to-white border border-stone-200/80 mb-6 overflow-hidden relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.04),0_8px_20px_-6px_rgba(0,0,0,0.08)]"
              >
                <ThreeCardDiorama type="statute" />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 text-[10.5px] font-mono font-bold text-amber-900 flex items-center gap-1.5 shadow-xs">
                  <Scale className="w-3.5 h-3.5 text-amber-700" />
                  <span>CRITERION 3 • NON-LAWYER</span>
                </div>
              </div>

              {/* Title & Badge (pops out at translateZ(26px)) */}
              <div style={{ transform: 'translateZ(26px)' }}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-3 shadow-2xs">
                  <Scale className="w-3.5 h-3.5" />
                  <span>India Code & Case Precedents</span>
                </div>

                <h3 className="text-xl font-extrabold text-[#111827] tracking-tight mb-3">
                  Know the Traps—And When to Call a Lawyer
                </h3>
              </div>

              {/* Plain-English Value (pops out at translateZ(18px)) */}
              <p
                style={{ transform: 'translateZ(18px)' }}
                className="text-stone-600 text-sm leading-relaxed mb-4"
              >
                LexGuard is an exploratory issue-spotting triage partner, not a substitute for an advocate.
                It flags one-sided lock-ins and subjective language (*"sole discretion"*), contextualizes terms with{' '}
                <strong className="text-stone-900 font-bold">Resource 2 (Indian Contract Act §§ 27/74)</strong> and{' '}
                <strong className="text-stone-900 font-bold">Resource 3 (Open India Law v2026.08)</strong>, and prepares exact questions for your advocate.
              </p>
            </div>

            {/* Interactive Footer Pill (pops out at translateZ(28px)) */}
            <div
              style={{ transform: 'translateZ(28px)' }}
              className="pt-4 border-t border-stone-100/90 flex items-center justify-between text-xs"
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-mono font-bold text-[11px] shadow-2xs">
                <span>⚖️ Resource 2 & 3: India Code + OIL Active</span>
              </span>
            </div>
          </div>
        </SpatialTiltCard>
      </div>

      {/* ─── BOTTOM CTA: 3D MONOLITHIC PORCELAIN/OBSIDIAN SLAB ─── */}
      <div className="relative group rounded-[32px] bg-gradient-to-r from-stone-900 via-[#18202F] to-stone-900 text-white p-8 sm:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35),0_10px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)] border border-stone-700/80 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left transition-all duration-300 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.45)]">
        {/* Subtle Ambient Light Reflections inside slab */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Ready For Live Triage • Zero Installation Required</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            See LexGuard Triage a Live Agreement in Real Time
          </h3>
          <p className="mt-2 text-stone-300 text-sm max-w-2xl leading-relaxed">
            Launch our pre-loaded Residential Lease, Tech Employment Contract, or CUAD Benchmark in the
            3D Spatial Studio with one click.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            onLoadSample('rental');
          }}
          className="relative z-10 flex-shrink-0 px-9 py-4 rounded-full bg-white hover:bg-stone-50 text-stone-950 font-extrabold text-sm sm:text-base shadow-[0_12px_32px_rgba(255,255,255,0.25),0_2px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_18px_40px_rgba(255,255,255,0.35)] hover:-translate-y-1 active:translate-y-0.5 active:scale-98 transition-all flex items-center gap-3 cursor-pointer"
        >
          <span>Try It Now With a Sample Contract ↑</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>
    </section>
  );
}

/**
 * SpatialTiltCard: Reusable wrapper with preserve-3d perspective tilt & dynamic glare sheen
 */
function SpatialTiltCard({ children }) {
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

    const rotX = ((y - centerY) / centerY) * -7; // max 7 deg
    const rotY = ((x - centerX) / centerX) * 7; // max 7 deg

    setTransformStyle(
      `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(14px) scale3d(1.02, 1.02, 1.02)`
    );

    setGlareStyle({
      opacity: 0.85,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)');
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
      className="group relative rounded-[32px] bg-white/85 backdrop-blur-2xl border border-white/95 p-7 shadow-[0_24px_50px_-15px_rgba(24,24,27,0.08),0_4px_12px_rgba(24,24,27,0.03),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_36px_72px_-15px_rgba(24,24,27,0.16),0_8px_20px_rgba(24,24,27,0.06)] transition-shadow duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* 3D Specular Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300"
        style={{
          opacity: glareStyle.opacity,
          background: `radial-gradient(circle 240px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.7), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
