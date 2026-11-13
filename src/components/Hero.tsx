import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-end overflow-hidden bg-[#E87924] select-none"
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

        {/* Subtle, soft scrims that keep the banner mascot artwork 100% visible and unblocked */}
        <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />
      </div>

      {/* 2. Streamlined Brand Headline: Compact, perfectly proportioned along bottom baseline without hiding mascot logo */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end text-center pb-2.5 sm:pb-4 px-4 sm:px-6">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl overflow-hidden leading-none text-center flex justify-center items-center"
        >
          <h1 className="w-full select-none block m-0 p-0 leading-none" aria-label="Mom's Cloud Kitchen">
            <svg
              viewBox="0 0 1400 125"
              className="w-full h-auto block select-none pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="700"
                y="105"
                textAnchor="middle"
                fill="#FFFFFF"
                fontWeight="900"
                fontSize="120"
                fontFamily="Anton, Impact, 'Outfit', sans-serif"
                textLength="1360"
                lengthAdjust="spacingAndGlyphs"
              >
                MOM'S CLOUD KITCHEN
              </text>
            </svg>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};
