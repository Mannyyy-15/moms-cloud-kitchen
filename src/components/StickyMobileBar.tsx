import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowDown, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';

const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export const StickyMobileBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const updateVisibility = () => {
      rafId = null;
      const formEl = document.getElementById('franchise-enquiry');

      if (!formEl) {
        setIsVisible(window.scrollY > 60);
        return;
      }

      const rect = formEl.getBoundingClientRect();
      const isFormInView = rect.top < window.innerHeight && rect.bottom > 80;

      setIsVisible(!isFormInView && window.scrollY > 60);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateVisibility);
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

  const scrollToForm = () => {
    const el = document.querySelector('#franchise-enquiry');
    if (!el) return;

    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - 70;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: getScrollBehavior(),
    });
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Mobile Quick Enquiry Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF9F2]/95 backdrop-blur-xl border-t border-[#E87924]/30 px-3 py-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.18)] animate-in slide-in-from-bottom duration-200"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Quick Call */}
        <a
          href={`tel:${BRAND_INFO.phoneClean}`}
          className="w-10 h-10 rounded-xl bg-white border border-[#E87924]/30 flex items-center justify-center text-[#E87924] shrink-0 active:scale-95 transition-transform shadow-xs"
          aria-label="Call Founder Desk"
        >
          <Phone className="w-4 h-4" />
        </a>

        {/* Quick WhatsApp */}
        <a
          href={BRAND_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#128C7E] shrink-0 active:scale-95 transition-transform shadow-xs"
          aria-label="WhatsApp Founder Desk"
        >
          <MessageSquare className="w-4 h-4 fill-[#25D366]" />
        </a>

        {/* Primary CTA: Jump Straight to Franchise Application Form */}
        <button
          type="button"
          onClick={scrollToForm}
          aria-controls="franchise-enquiry"
          className="flex-grow py-2.5 px-3 bg-gradient-to-r from-[#E87924] to-[#D16719] hover:brightness-105 active:scale-[0.98] text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-200 shrink-0" />
          <span className="truncate">Apply for Franchise</span>
          <ArrowDown className="w-3.5 h-3.5 shrink-0" />
        </button>
      </div>
    </aside>
  );
};
