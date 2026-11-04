import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const FranchiseOpportunity: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="franchise" className="py-20 lg:py-28 bg-[#174B35] text-[#FFF8EC] relative overflow-hidden">
      {/* Background Kitchen Image with Deep Emerald Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity">
        <img
          src={BRAND_INFO.images.facility}
          alt="Cloud kitchen setup"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <ScrollReveal direction="up">
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E87924]">
                Grow With Mom's Cloud Kitchen
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-6 text-balance">
              BRING THE TASTE OF MOM'S LOVE TO YOUR CITY.
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-[#FFF8EC]/90 leading-relaxed font-normal mb-8 text-pretty">
              Be part of a food brand built around the comfort of home-style meals.
              Explore the opportunity to bring Mom's Cloud Kitchen to your city and
              share the warmth of a mother's kitchen with more families.
            </p>

            {/* Grounded Statement */}
            <div className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-sm font-medium text-white mb-10">
              Let's explore how we can grow together.
            </div>
          </ScrollReveal>

          {/* Core Highlights */}
          <StaggerContainer
            staggerDelay={0.12}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-10"
          >
            <StaggerItem className="flex items-start gap-3 p-4 rounded-xl bg-black/20 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-[#E87924] shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-white block">Home-Style Affinity</span>
                <span className="text-xs text-[#FFF8EC]/70">High everyday repeat demand</span>
              </div>
            </StaggerItem>
            <StaggerItem className="flex items-start gap-3 p-4 rounded-xl bg-black/20 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-[#E87924] shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-white block">Cloud-First Model</span>
                <span className="text-xs text-[#FFF8EC]/70">Efficient delivery kitchen footprint</span>
              </div>
            </StaggerItem>
            <StaggerItem className="flex items-start gap-3 p-4 rounded-xl bg-black/20 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-[#E87924] shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-bold text-white block">4,000+ Validated Orders</span>
                <span className="text-xs text-[#FFF8EC]/70">Tested across 3 platforms</span>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* CTA */}
          <ScrollReveal direction="up" delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('#franchise-models')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#E87924] hover:bg-[#D16719] active:bg-[#B95732] text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E87924]"
            >
              <span>Enquire About Franchise</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTo('#why-partner')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-base px-7 py-4 rounded-xl border border-white/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Why Partner With Us?</span>
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
