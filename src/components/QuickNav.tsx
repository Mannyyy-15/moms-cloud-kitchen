import React, { useEffect, useState } from 'react';
import { Sparkles, Calculator, Layers, UtensilsCrossed, ArrowRight } from 'lucide-react';

const NAV_OFFSET = 88;

const SECTION_IDS = [
  'story',
  'franchise-models',
  'roi-calculator',
  'menu',
  'franchise-enquiry',
] as const;

const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export const QuickNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sections.length === 0) return;

    let rafId: number | null = null;

    const updateActiveSection = () => {
      rafId = null;
      const probeLine = window.innerHeight * 0.35;
      let active: HTMLElement | null = null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        if (rect.top <= probeLine && rect.bottom > probeLine) {
          active = section;
          break;
        }

        if (rect.top <= probeLine) {
          active = section;
        }
      }

      setActiveSection(active ? active.id : null);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActiveSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector<HTMLElement>(id);
    if (!el) return;

    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - NAV_OFFSET;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: getScrollBehavior(),
    });
  };

  return (
    <nav
      aria-label="Quick Section Navigation"
      className="bg-[#1E0F08] border-b border-[#E87924]/20 py-3 sm:py-3.5 px-3 sm:px-6 relative z-20 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scroll-smooth">
        {/* Mobile Fast-Track Pill Label */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-300/90 shrink-0 pr-2 border-r border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-[#E87924]" />
          <span>Fast Track:</span>
        </div>

        {/* 1. Primary Action: Jump Straight to Franchise Application Form */}
        <button
          type="button"
          onClick={() => scrollTo('#franchise-enquiry')}
          aria-current={activeSection === 'franchise-enquiry' ? 'location' : undefined}
          className="shrink-0 inline-flex items-center gap-1.5 bg-[#E87924] hover:bg-[#D16719] active:scale-95 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider px-3.5 sm:px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Apply for Franchise</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* 2. Franchise Models (₹4L / ₹6L) */}
        <button
          type="button"
          onClick={() => scrollTo('#franchise-models')}
          aria-current={activeSection === 'franchise-models' ? 'location' : undefined}
          className="shrink-0 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-[11px] sm:text-xs tracking-wide px-3 sm:px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer whitespace-nowrap"
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>₹4L / ₹6L Models</span>
        </button>

        {/* 3. ROI Calculator */}
        <button
          type="button"
          onClick={() => scrollTo('#roi-calculator')}
          aria-current={activeSection === 'roi-calculator' ? 'location' : undefined}
          className="shrink-0 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-[11px] sm:text-xs tracking-wide px-3 sm:px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer whitespace-nowrap"
        >
          <Calculator className="w-3.5 h-3.5 text-emerald-400" />
          <span>ROI Calculator</span>
        </button>

        {/* 4. Signature Menu */}
        <button
          type="button"
          onClick={() => scrollTo('#menu')}
          aria-current={activeSection === 'menu' ? 'location' : undefined}
          className="shrink-0 inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 active:scale-95 text-white font-bold text-[11px] sm:text-xs tracking-wide px-3 sm:px-3.5 py-2 rounded-xl border border-white/10 transition-all cursor-pointer whitespace-nowrap"
        >
          <UtensilsCrossed className="w-3.5 h-3.5 text-amber-300" />
          <span>Signature Menu</span>
        </button>

        {/* 5. Founder Story */}
        <button
          type="button"
          onClick={() => scrollTo('#story')}
          aria-current={activeSection === 'story' ? 'location' : undefined}
          className="hidden sm:inline-flex shrink-0 items-center gap-1.5 bg-white/5 hover:bg-white/10 active:scale-95 text-white/80 hover:text-white font-semibold text-[11px] sm:text-xs tracking-wide px-3 py-2 rounded-xl border border-white/5 transition-all cursor-pointer whitespace-nowrap"
        >
          <span>Founder Story</span>
        </button>
      </div>
    </nav>
  );
};
