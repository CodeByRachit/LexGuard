import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, FileText, CornerDownRight, Sparkles } from 'lucide-react';

export default function ThreePaperManuscriptDeck({
  clauses = [],
  selectedClauseId,
  onSelectClause,
  documentName = 'Residential Lease Agreement',
  onHoverClause,
}) {
  const CLAUSES_PER_PAGE = 4;
  const totalPages = Math.max(1, Math.ceil(clauses.length / CLAUSES_PER_PAGE));

  // Determine which page contains selectedClauseId
  const getPageIndexForClause = (clauseId) => {
    const idx = clauses.findIndex((c) => c.clause_id === clauseId);
    if (idx === -1) return 0;
    return Math.floor(idx / CLAUSES_PER_PAGE);
  };

  const [currentPage, setCurrentPage] = useState(() => getPageIndexForClause(selectedClauseId));
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev' | null
  const wheelLockRef = useRef(false);

  // Sync current page if selected clause changes externally
  useEffect(() => {
    const targetPage = getPageIndexForClause(selectedClauseId);
    if (targetPage !== currentPage && !isFlipping) {
      setCurrentPage(targetPage);
    }
  }, [selectedClauseId, clauses]);

  const currentClauses = clauses.slice(
    currentPage * CLAUSES_PER_PAGE,
    (currentPage + 1) * CLAUSES_PER_PAGE
  );

  // Turn page with 3D flip physics
  const triggerPageTurn = (direction) => {
    if (isFlipping) return;
    if (direction === 'next' && currentPage >= totalPages - 1) return;
    if (direction === 'prev' && currentPage <= 0) return;

    setIsFlipping(true);
    setFlipDirection(direction);

    setTimeout(() => {
      const nextPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
      setCurrentPage(nextPage);
      setIsFlipping(false);
      setFlipDirection(null);

      // Select first clause on new page
      const nextClauses = clauses.slice(
        nextPage * CLAUSES_PER_PAGE,
        (nextPage + 1) * CLAUSES_PER_PAGE
      );
      if (nextClauses.length > 0) {
        onSelectClause(nextClauses[0].clause_id);
      }
    }, 420);
  };

  // Wheel event handler: step through clauses, then flip page
  const handleWheel = (e) => {
    if (wheelLockRef.current || isFlipping) return;

    const delta = e.deltaY;
    if (Math.abs(delta) < 30) return;

    const currentIdxOnPage = currentClauses.findIndex(
      (c) => c.clause_id === selectedClauseId
    );

    if (delta > 0) {
      // Scrolling down / next
      if (currentIdxOnPage < currentClauses.length - 1) {
        wheelLockRef.current = true;
        onSelectClause(currentClauses[currentIdxOnPage + 1].clause_id);
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 180);
      } else if (currentPage < totalPages - 1) {
        wheelLockRef.current = true;
        triggerPageTurn('next');
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 600);
      }
    } else {
      // Scrolling up / prev
      if (currentIdxOnPage > 0) {
        wheelLockRef.current = true;
        onSelectClause(currentClauses[currentIdxOnPage - 1].clause_id);
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 180);
      } else if (currentPage > 0) {
        wheelLockRef.current = true;
        triggerPageTurn('prev');
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 600);
      }
    }
  };

  // Determine secondary linked clause for cross-reference hairline connector
  const secondaryClause = currentClauses.find(
    (c) => c.clause_id !== selectedClauseId && (c.ambiguity_flags?.length > 0 || c.clause_id === 'CL-002' || c.clause_id === 'CL-005')
  ) || currentClauses.find((c) => c.clause_id !== selectedClauseId);

  return (
    <div
      className="relative select-none w-full"
      style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
      onWheel={handleWheel}
    >
      {/* 3D Stack Container with physical tilt */}
      <div
        className="relative mx-auto transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateZ(-3deg) rotateX(4deg) rotateY(6deg)',
        }}
      >
        {/* ── BACK SHEET 3 (Deepest Archival Underlayer) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-[#E4DFCFA0] border border-stone-400/30 pointer-events-none"
          style={{
            transform: 'translate(-12px, 16px) rotate(-5.5deg) translateZ(-60px)',
            boxShadow: '30px 40px 70px rgba(24, 20, 15, 0.18)',
          }}
        />

        {/* ── BACK SHEET 2 (Middle Archival Cream Underlayer) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-[#ECE7DC] border border-stone-300/40 pointer-events-none"
          style={{
            transform: 'translate(-8px, 10px) rotate(-4.2deg) translateZ(-40px)',
            boxShadow: '25px 35px 60px rgba(24, 20, 15, 0.16)',
          }}
        />

        {/* ── BACK SHEET 1 (Immediate Archival Cream Underlayer) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl bg-[#F2EDE2] border border-stone-300/60 pointer-events-none"
          style={{
            transform: 'translate(-4px, 5px) rotate(-3.2deg) translateZ(-20px)',
            boxShadow: '20px 30px 50px rgba(24, 20, 15, 0.14)',
          }}
        />

        {/* ── ACTIVE TOP MANUSCRIPT SHEET ── */}
        <div
          className={`relative rounded-2xl bg-gradient-to-br from-[#FDFBF7] via-[#F8F5EC] to-[#EFEAE0] border border-[#DFD9CD] p-6 sm:p-7 transition-all duration-500 ${
            isFlipping
              ? flipDirection === 'next'
                ? 'pointer-events-none shadow-2xl'
                : 'pointer-events-none shadow-2xl'
              : 'shadow-[0_25px_60px_-15px_rgba(24,20,15,0.22),0_2px_4px_rgba(255,255,255,0.8)_inset]'
          }`}
          style={{
            transformOrigin: flipDirection === 'next' ? 'left center' : 'right center',
            transform: isFlipping
              ? flipDirection === 'next'
                ? 'rotateY(-165deg) rotateZ(-8deg) translateZ(60px) scale(0.96)'
                : 'rotateY(165deg) rotateZ(8deg) translateZ(60px) scale(0.96)'
              : 'rotateY(0deg) translateZ(0px)',
            opacity: isFlipping ? 0.2 : 1,
          }}
        >
          {/* Subtle Archival Texture & Top Fold Shading */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-200/25 via-stone-300/10 to-transparent rounded-tr-2xl pointer-events-none"
          />

          {/* Archival Document Header */}
          <div className="border-b border-stone-300/80 pb-3 mb-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-1">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-700" />
                EXHIBIT A • ARCHIVAL MANUSCRIPT
              </span>
              <span className="font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded">
                PAGE {currentPage + 1} OF {totalPages}
              </span>
            </div>

            <h2 className="text-center font-serif font-black tracking-wide text-stone-900 text-sm sm:text-base uppercase mt-1">
              {documentName?.replace(/\.[^/.]+$/, '').replace(/_/g, ' ') || 'RESIDENTIAL LEASE AGREEMENT (11-MONTH)'}
            </h2>
            <div className="text-center text-[10.5px] font-mono text-stone-500 mt-0.5 tracking-tight">
              BENGALURU JURISDICTION • STAMP DUTY VERIFIED • EXECUTED COPY
            </div>
          </div>

          {/* Continuous Legal Document Typography (NO BOXED CARDS!) */}
          <div className="space-y-3.5 min-h-[420px] flex flex-col justify-between">
            <div className="space-y-3">
              {currentClauses.map((clause) => {
                const isSelected = clause.clause_id === selectedClauseId;
                const isSecondary = secondaryClause?.clause_id === clause.clause_id;
                const isFlagged = clause.ambiguity_flags && clause.ambiguity_flags.length > 0;

                return (
                  <div
                    key={clause.clause_id}
                    onClick={() => onSelectClause(clause.clause_id)}
                    className={`relative transition-all duration-200 cursor-pointer text-left ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FDE68A]/75 via-[#FEF3C7]/85 to-[#FDE68A]/70 backdrop-blur-md border border-amber-400/90 shadow-[0_12px_25px_-5px_rgba(217,119,6,0.28),0_2px_4px_rgba(255,255,255,0.9)_inset] rounded-xl px-4 py-3 -mx-2 scale-[1.02] z-20'
                        : 'px-2 py-2 rounded-lg hover:bg-stone-200/40 border border-transparent'
                    }`}
                  >
                    {/* Clause Title & Left Monospace Index */}
                    <div className="flex items-baseline justify-between mb-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`font-mono text-[11px] font-extrabold tracking-tight ${
                            isSelected ? 'text-amber-950 font-black' : 'text-stone-500'
                          }`}
                        >
                          {clause.clause_id}
                        </span>
                        {clause.section_title && (
                          <span
                            className={`text-xs font-bold ${
                              isSelected ? 'text-stone-900 font-extrabold' : 'text-stone-800'
                            }`}
                          >
                            {clause.section_title}
                          </span>
                        )}
                      </div>

                      {/* Small inline status badge */}
                      {isFlagged ? (
                        <span className="text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 shadow-2xs">
                          Flagged
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-stone-500">
                          {clause.cuad_category || 'Operative'}
                        </span>
                      )}
                    </div>

                    {/* Continuous Legal Paragraph Text */}
                    <p
                      className={`text-xs leading-relaxed ${
                        isSelected
                          ? 'text-stone-950 font-medium'
                          : 'text-stone-700 font-normal line-clamp-3'
                      }`}
                    >
                      {clause.verbatim_text}
                    </p>

                    {/* Active Clause 3D Raised Socket Dot (Primary Spline Source) */}
                    {isSelected && (
                      <div
                        id="clause-anchor-active"
                        className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 via-emerald-400 to-emerald-500 ring-4 ring-amber-200/90 shadow-[0_0_16px_rgba(245,158,11,0.6)] flex items-center justify-center z-30 pointer-events-none animate-pulse"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                      </div>
                    )}

                    {/* Secondary Cross-Reference Socket Dot (Subtle Filament Source) */}
                    {!isSelected && isSecondary && (
                      <div
                        id="clause-anchor-secondary"
                        className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-slate-400/80 ring-2 ring-slate-200/60 shadow-xs flex items-center justify-center z-10 pointer-events-none"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Sheet Footer: Tactile Page Flip Controls & Wheel Cue */}
            <div className="pt-3 border-t border-stone-300/80 flex items-center justify-between text-xs text-stone-600 mt-2">
              <button
                type="button"
                onClick={() => triggerPageTurn('prev')}
                disabled={currentPage <= 0 || isFlipping}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none font-bold text-[11px] transition-colors cursor-pointer border border-stone-200/80 shadow-2xs"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev Sheet</span>
              </button>

              <div className="flex flex-col items-center">
                <span className="font-mono text-[10.5px] font-bold text-stone-700">
                  Sheet {currentPage + 1} of {totalPages}
                </span>
                <span className="text-[9.5px] text-stone-600">
                  Scroll wheel steps clauses & flips
                </span>
              </div>

              <button
                type="button"
                onClick={() => triggerPageTurn('next')}
                disabled={currentPage >= totalPages - 1 || isFlipping}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:pointer-events-none font-bold text-[11px] transition-colors cursor-pointer border border-stone-200/80 shadow-2xs"
              >
                <span>Next Sheet</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
