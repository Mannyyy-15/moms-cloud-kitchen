import React, { useEffect, useRef, useState } from 'react';
import { STATS_DATA } from '../data/brandData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface AnimatedCounterProps {
  value: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
      observer.disconnect();
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    const duration = 1800; // 1.8s smooth count animation

    // Case 1: "4,000+"
    if (value.includes('4,000') || value.includes('4000')) {
      const end = 4000;
      const frame = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(end * easeOut);
        setDisplayValue(current.toLocaleString('en-IN') + '+');

        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
      return;
    }

    // Case 2: "28–35%"
    if (value.includes('28') && value.includes('35')) {
      const frame = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const v1 = Math.floor(28 * easeOut);
        const v2 = Math.floor(35 * easeOut);
        setDisplayValue(`${v1}–${v2}%`);

        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
      return;
    }

    // Case 3: "6–8 Mos"
    if (value.includes('6') && value.includes('8') && value.includes('Mos')) {
      const frame = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const v1 = Math.floor(6 * easeOut);
        const v2 = Math.floor(8 * easeOut);
        setDisplayValue(`${v1}–${v2} Mos`);

        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
      return;
    }

    // Case 4: "Feb 2024"
    if (value.includes('2024')) {
      const startYear = 2018;
      const endYear = 2024;
      const frame = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(startYear + (endYear - startYear) * easeOut);
        setDisplayValue(`Feb ${current}`);

        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
      return;
    }

    // Generic fallback: Parse any number
    const numericMatch = value.match(/\d+/);
    if (numericMatch) {
      const target = parseInt(numericMatch[0], 10);
      const suffix = value.replace(/\d+/, '');
      const frame = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOut);
        setDisplayValue(`${current}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };
      requestAnimationFrame(frame);
      return;
    }

    setDisplayValue(value);
  }, [hasAnimated, value]);

  return <div ref={elementRef}>{hasAnimated ? displayValue : '0'}</div>;
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
