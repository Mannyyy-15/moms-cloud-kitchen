import React from 'react';
import { Sparkles, ArrowRight, Store, ShieldCheck } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const PromoBanner: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-8 sm:py-12 bg-[#FFF3E3] border-y border-[#E87924]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#C25E00] via-[#E87924] to-[#F59E0B] p-6 sm:p-10 lg:p-12 text-white shadow-xl">
            {/* Ambient background rings */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 rounded-full bg-black/10 blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
              <div className="text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Franchise Expansion · 2024–2026</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight mb-2">
                  OWN A HIGH-PROFIT MOM'S CLOUD KITCHEN IN YOUR LOCALITY
                </h3>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  Join India&apos;s fastest growing home-style food network. Choose between <strong className="underline decoration-white/60">Cloud Kitchen (₹4L Fee)</strong> or <strong className="underline decoration-white/60">Cloud Kitchen + Dine-In Restaurant (₹6L Fee)</strong> with proven ROI in 6 to 8 months.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => scrollTo('#franchise-enquiry')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#C25E00] hover:bg-[#FFF9F2] active:scale-[0.98] font-black text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>Enquire For Territory</span>
                  <ArrowRight className="w-4 h-4 text-[#C25E00]" />
                </button>

                <button
                  onClick={() => scrollTo('#franchise-models')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/25 hover:bg-black/40 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/40 transition-all cursor-pointer whitespace-nowrap"
                >
                  <span>View Formats</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

