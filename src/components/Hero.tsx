import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BRAND_INFO } from '../data/brandData';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#1E0F08] select-none"
    >
      {/* 1. Full-bleed Background: Traditional South Indian Feast Spread */}
      <div className="absolute inset-0 z-0">
        <img
          src={BRAND_INFO.images.hero}
          alt="South Indian traditional feast with masala dosa, soft idlis, medu vada, fresh chutneys and sambar on banana leaf"
          className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />

        {/* Minimal subtle scrims to preserve vibrant food photography while ensuring contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
      </div>

      {/* Top spacer for the floating navigation bar */}
      <div className="pt-24 sm:pt-32" />

      {/* 2. Bottom Content Container: Centered Action Buttons + 100vw Full-Width MOM'S KITCHEN Headline */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end text-center mt-auto pb-2 sm:pb-4 px-2 sm:px-4">
        {/* Centered Action Buttons directly above the headline */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-5"
        >
          {/* Primary Action Button */}
          <button
            onClick={() => scrollTo('#franchise-enquiry')}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF8EC] text-[#174B35] font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Explore Franchise</span>
            <ArrowUpRight className="w-4 h-4 text-[#174B35]" />
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={() => scrollTo('#story')}
            className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-white/50 hover:border-white transition-all duration-200 backdrop-blur-xs cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Discover Our Story</span>
            <ArrowUpRight className="w-4 h-4 text-white/90" />
          </button>
        </motion.div>

        {/* 3. Massive Headline: Fits 100% of viewport width across all devices perfectly */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[100vw] overflow-hidden leading-none text-center flex justify-center items-center"
        >
          <h1 className="w-full max-w-[100vw] select-none block" aria-label="Mom's Kitchen">
            <svg
              viewBox="0 0 1000 120"
              className="w-full h-auto block max-h-[17vh] drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)] pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="500"
                y="102"
                textAnchor="middle"
                fill="#FFFFFF"
                fontWeight="900"
                fontFamily="Anton, Outfit, Impact, sans-serif"
                letterSpacing="-0.02em"
              >
                MOM'S KITCHEN
              </text>
            </svg>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};
