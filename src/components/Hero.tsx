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
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#E87924] select-none"
    >
      {/* 1. Full-bleed Background: Responsive Ultra-HD Hero Banners (Mobile 9:16 & Desktop 16:9) */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full block">
          <source
            media="(max-width: 768px)"
            srcSet="/images/hero_banner_mobile.jpg"
          />
          <source
            media="(min-width: 769px)"
            srcSet="/images/hero_banner_desktop.jpg"
          />
          <img
            src="/images/hero_banner_desktop.jpg"
            alt="Mom's Cloud Kitchen official hero banner with mother mascot, Made By Mom Loved By All, golden masala dosa, idli, and chutneys"
            className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
        </picture>

        {/* Minimal scrims to protect navbar readability and give crisp contrast to bottom CTAs while preserving vibrant saffron artwork */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 sm:h-56 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
      </div>

      {/* Top spacer for the floating navigation bar */}
      <div className="pt-24 sm:pt-32" />

      {/* 2. Bottom Content Container: Centered Action Buttons + 100vw Full-Width MOM'S KITCHEN Text */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end text-center mt-auto pb-0 px-0">
        {/* Centered Action Buttons directly above the text */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-5 px-4"
        >
          {/* Primary Action Button */}
          <button
            onClick={() => scrollTo('#franchise-enquiry')}
            className="inline-flex items-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-2xl hover:shadow-[#E87924]/40 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Explore Franchise</span>
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={() => scrollTo('#story')}
            className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 active:scale-[0.98] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-white/50 hover:border-white transition-all duration-200 backdrop-blur-md cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Discover Our Story</span>
            <ArrowUpRight className="w-4 h-4 text-white/90" />
          </button>
        </motion.div>

        {/* 3. Massive Headline: Sized to fit 100% of viewport width (100vw) across all devices perfectly */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[100vw] overflow-hidden leading-none text-center flex justify-center items-center"
        >
          <h1 className="w-full max-w-[100vw] select-none block m-0 p-0 leading-none" aria-label="Mom's Kitchen">
            <svg
              viewBox="0 0 1000 125"
              className="w-full h-auto block select-none pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="500"
                y="108"
                textAnchor="middle"
                fill="#FFFFFF"
                fontWeight="900"
                fontSize="124"
                fontFamily="Anton, Impact, 'Outfit', sans-serif"
                textLength="980"
                lengthAdjust="spacingAndGlyphs"
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
