import React, { useEffect, useRef, useState } from 'react';
import { STATS_DATA } from '../data/brandData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface AnimatedCounterProps {
  value: string;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const [shouldReduceMotion] = useState(prefersReducedMotion);
  const [displayValue, setDisplayValue] = useState<string>(
    shouldReduceMotion ? value : '0'
  );
  const [hasAnimated, setHasAnimated] = useState(shouldReduceMotion);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentElem = elementRef.current;
    if (!currentElem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(currentElem);

    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!hasAnimated || shouldReduceMotion) return;

    let draw: ((eased: number) => void) | null = null;

    if (value.includes('4,000') || value.includes('4000')) {
      const end = 4000;
      draw = (eased) => {
        setDisplayValue(Math.floor(end * eased).toLocaleString('en-IN') + '+');
      };
    } else if (value.includes('28') && value.includes('35')) {
      draw = (eased) => {
        setDisplayValue(`${Math.floor(28 * eased)}–${Math.floor(35 * eased)}%`);
      };
    } else if (value.includes('6') && value.includes('8') && value.includes('Mos')) {
      draw = (eased) => {
        setDisplayValue(`${Math.floor(6 * eased)}–${Math.floor(8 * eased)} Mos`);
      };
    } else if (value.includes('2024')) {
      const startYear = 2018;
      const endYear = 2024;
      draw = (eased) => {
        setDisplayValue(`Feb ${Math.floor(startYear + (endYear - startYear) * eased)}`);
      };
    } else {
      const numericMatch = value.match(/\d+/);
      if (!numericMatch) {
        setDisplayValue(value);
        return;
      }

      const target = parseInt(numericMatch[0], 10);
      const suffix = value.replace(/\d+/, '');
      draw = (eased) => {
        setDisplayValue(`${Math.floor(target * eased)}${suffix}`);
      };
    }

    if (!draw) return;
    const animate = draw;

    const duration = 1800;
    let rafId: number | null = null;
    let startTime: number | null = null;
    let isCancelled = false;

    const frame = (time: number) => {
      if (isCancelled) return;
      if (startTime === null) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      animate(eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      isCancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [hasAnimated, shouldReduceMotion, value]);

  return (
    <div ref={elementRef}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-grid text-center">
        <span className="invisible col-start-1 row-start-1">{value}</span>
        <span className="col-start-1 row-start-1">
          {hasAnimated ? displayValue : '0'}
        </span>
      </span>
    </div>
  );
};

export const Statistics: React.FC = () => {
  return (
    <section className="bg-[#FFF3E3] py-12 sm:py-16 lg:py-20 border-b border-[#E87924]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E87924] block mb-2">
            Verified Milestones
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#28231E]">
            Built On Real Customer Trust &amp; Consistent Quality
          </h2>
        </ScrollReveal>

        {/* 4-Column Statistics Row with Animated Counters */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
        >
          {STATS_DATA.map((item, index) => (
            <StaggerItem
              key={index}
              className={`flex flex-col items-center text-center p-4 lg:p-6 rounded-2xl bg-white/70 lg:bg-transparent border border-[#E87924]/20 lg:border-none transition-all duration-300 hover:bg-white lg:hover:bg-transparent ${
                index < 3 ? 'lg:border-r lg:border-[#E87924]/20' : ''
              }`}
            >
              <div className="font-display font-black text-3xl sm:text-4xl lg:text-6xl text-[#E87924] tracking-tight tabular-nums mb-2">
                <AnimatedCounter value={item.value} />
              </div>
              <div className="text-sm sm:text-base lg:text-lg font-bold text-[#28231E] mb-1">
                {item.label}
              </div>
              <p className="text-xs sm:text-sm text-[#28231E]/75 max-w-[210px] leading-relaxed">
                {item.detail}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
