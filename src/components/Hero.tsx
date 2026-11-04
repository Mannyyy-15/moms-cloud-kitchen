import React from 'react';
import { ArrowUpRight, ShieldCheck, TrendingUp, Store, ChevronDown } from 'lucide-react';
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#1E0F08] select-none"
    >
      {/* 1. Full-bleed Background: Real South Indian Traditional Spread */}
      <div className="absolute inset-0 z-0">
        <img
          src={BRAND_INFO.images.hero}
          alt="Mom's Cloud Kitchen authentic South Indian feast with golden masala dosa, idli, vada and sambar on banana leaf"
          className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />

        {/* Multi-tier gradient scrims engineered for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Top spacer for floating navigation */}
      <div className="pt-24 sm:pt-32" />

      {/* 2. Conversion Core Container (Engineered for Meta Ads Traffic) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-6 sm:py-8 flex flex-col items-center">
        {/* Ad Opportunity Badge */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-[#E87924]/90 backdrop-blur-md text-white text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg border border-white/20 mb-4 sm:mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Franchise Territories Now Open · India</span>
        </motion.div>

        {/* Primary Meta Ads Franchise Headline */}
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.12] mb-4 text-balance drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        >
          OWN A HIGH-MARGIN <span className="text-[#E87924]">DARK KITCHEN</span> FRANCHISE IN YOUR CITY.
        </motion.h2>

        {/* Subtitle answering: What is this business & why partner */}
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-lg text-[#FFF8EC]/90 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-normal drop-shadow-sm"
        >
          Partner with Mom&apos;s Cloud Kitchen. Proven 4,000+ orders, standardized secret spice premixes (zero chef dependency), and 28–35% operating margins on lean 150–250 sq.ft. setups.
        </motion.p>

        {/* Primary Action Row */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-8"
        >
          {/* Primary High-Impact CTA Button */}
          <button
            onClick={() => scrollTo('#franchise-enquiry')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base uppercase tracking-wider px-8 py-4 rounded-xl shadow-2xl hover:shadow-[#E87924]/50 transition-all duration-200 cursor-pointer"
          >
            <span>Become a Franchise Partner</span>
            <ArrowUpRight className="w-5 h-5 text-white" />
          </button>

          {/* Secondary Action: Explore Details */}
          <button
            onClick={() => scrollTo('#franchise-models')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 active:scale-[0.98] text-white font-bold text-sm sm:text-base uppercase tracking-wider px-7 py-4 rounded-xl border border-white/40 hover:border-white transition-all backdrop-blur-md cursor-pointer"
          >
            <span>Explore Investment & ROI</span>
            <ChevronDown className="w-4 h-4 text-white/80" />
          </button>
        </motion.div>

        {/* 4 Quick Verified Meta Ads Trust Pillars */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 w-full max-w-3xl"
        >
          <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
            <span className="text-[10px] text-[#FFF8EC]/60 uppercase tracking-wider block">Starter Fee</span>
            <span className="font-display font-extrabold text-xs sm:text-sm text-white">₹3.99 Lakhs</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
            <span className="text-[10px] text-[#FFF8EC]/60 uppercase tracking-wider block">Kitchen Space</span>
            <span className="font-display font-extrabold text-xs sm:text-sm text-white">150–250 Sq. Ft.</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
            <span className="text-[10px] text-[#FFF8EC]/60 uppercase tracking-wider block">Net Margin</span>
            <span className="font-display font-extrabold text-xs sm:text-sm text-[#E87924]">28% – 35%</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-center">
            <span className="text-[10px] text-[#FFF8EC]/60 uppercase tracking-wider block">Monthly Royalty</span>
            <span className="font-display font-extrabold text-xs sm:text-sm text-white">Flat 5%</span>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom 100vw Vector Statement: MOM'S KITCHEN (Scales edge-to-edge on 100% of screens) */}
      <div className="relative z-10 w-full overflow-hidden leading-none text-center flex justify-center items-center mt-auto pb-1 px-1 sm:px-2">
        <h1 className="w-full max-w-[100vw] select-none block" aria-label="Mom's Kitchen Franchise">
          <svg
            viewBox="0 0 1000 115"
            className="w-full h-auto block max-h-[14vh] sm:max-h-[16vh] drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="500"
              y="98"
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
      </div>
    </section>
  );
};
