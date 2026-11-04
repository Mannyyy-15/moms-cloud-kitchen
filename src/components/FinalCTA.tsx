import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { ScrollReveal } from './ScrollReveal';

export const FinalCTA: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FFF8EC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#174B35] to-[#0E3223] text-white p-8 sm:p-14 lg:p-20 shadow-2xl overflow-hidden border border-[#174B35]">
            {/* Subtle decorative circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E87924]/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E87924] block mb-3">
                The Next Chapter
              </span>

              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-6 text-balance">
                EVERY CITY DESERVES A TASTE OF HOME.
              </h2>

              <p className="text-base sm:text-xl text-[#FFF8EC]/90 leading-relaxed font-normal mb-10 max-w-2xl mx-auto text-pretty">
                Let's take the warmth of Mom's Cloud Kitchen to more homes, one city at a time.
                Partner with a genuine food brand built with heart and grounded in operational discipline.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => scrollTo('#franchise-enquiry')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E87924] hover:bg-[#D16719] active:bg-[#B95732] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E87924]"
                >
                  <span>Become a Franchise Partner</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-semibold text-base px-7 py-4 rounded-xl border border-white/20 backdrop-blur-xs transition-all whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 text-[#E87924]" />
                  <span>Talk to Our Team ({BRAND_INFO.phone})</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
