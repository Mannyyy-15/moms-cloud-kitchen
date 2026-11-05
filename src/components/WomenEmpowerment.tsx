import React from 'react';
import { Heart, Sparkles, Award, ShieldCheck, ArrowRight, Quote } from 'lucide-react';
import { WOMEN_EMPOWERMENT_DATA } from '../data/brandData';
import { ScrollReveal, StaggerContainer, StaggerItem, TextReveal } from './ScrollReveal';

export const WomenEmpowerment: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="women-empowerment"
      className="py-16 sm:py-20 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#E87924]/10 border border-[#E87924]/30 px-4 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4 text-[#E87924] fill-[#E87924]" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#E87924]">
              Women Empowerment Initiative
            </span>
          </div>

          <TextReveal
            text="EMPOWERING WOMEN, TRANSFORMING LIVES."
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#28231E] tracking-tight leading-[1.08] mb-4 text-center justify-center"
          />

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-black uppercase tracking-wider text-[#E87924] mb-5">
            <span>WE COOK WITH LOVE, WE GROW TOGETHER</span>
            <span className="text-[#28231E]/30">•</span>
            <span>EMPOWERING WOMEN, ONE OPPORTUNITY AT A TIME</span>
          </div>

          <p className="font-serif-editorial italic text-lg sm:text-2xl text-[#D16719] leading-relaxed max-w-2xl mx-auto">
            &ldquo;{WOMEN_EMPOWERMENT_DATA.quote}&rdquo;
          </p>
        </ScrollReveal>

        {/* Vision Hero Banner */}
        <ScrollReveal direction="up" delay={0.15} className="mb-14 sm:mb-18">
          <div className="relative bg-gradient-to-br from-[#E87924] to-[#C25E00] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <span className="text-xs font-black uppercase tracking-[0.25em] text-white/80 block mb-2">
                Our Vision &amp; Purpose
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl lg:text-3xl leading-relaxed text-white">
                {WOMEN_EMPOWERMENT_DATA.vision}
              </p>
              <div className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold tracking-wider text-white/90 uppercase">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>Fair Wages</span>
                <span>•</span>
                <span>Kitchen Leadership</span>
                <span>•</span>
                <span>Dignity in Every Recipe</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 4-Image Authentic Photographic Grid */}
        <ScrollReveal direction="up" delay={0.2} className="mb-14 sm:mb-18">
          <div className="text-center mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#E87924] block mb-1">
              Real Stories &amp; Dedicated Hands
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#28231E]">
              Inside Our Kitchens: Passion, Pride &amp; Independence
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WOMEN_EMPOWERMENT_DATA.images.map((img, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#E87924]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#28231E]/5 relative">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFA858] block">
                      Mom&apos;s Cloud Kitchen
                    </span>
                    <p className="text-xs font-bold leading-tight drop-shadow-sm">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* 4 Core Impact Pillars */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WOMEN_EMPOWERMENT_DATA.pillars.map((pillar, idx) => (
            <StaggerItem
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E87924]/20 shadow-sm hover:border-[#E87924] hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF3E3] border border-[#E87924]/30 flex items-center justify-center text-[#E87924] mb-4 font-black">
                0{idx + 1}
              </div>
              <h4 className="font-display font-bold text-lg text-[#28231E] mb-2 leading-snug">
                {pillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#28231E]/75 leading-relaxed">
                {pillar.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Partner / Franchise Call to Action for Women Empowerment */}
        <div className="mt-12 text-center">
          <button
            onClick={() => scrollTo('#franchise-enquiry')}
            className="inline-flex items-center justify-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-[#E87924]/30 transition-all cursor-pointer"
          >
            <span>Join Our Mission · Start a Franchise</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

