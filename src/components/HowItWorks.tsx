import React from 'react';
import { Send, PhoneCall, FileCheck, Rocket, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, TextReveal } from './ScrollReveal';
import { StepItem } from '../types';

const STEPS_DATA: StepItem[] = [
  {
    number: "01",
    title: "Submit Your Enquiry",
    subtitle: "Quick Online Form or WhatsApp",
    description: "Fill out the short franchise application form below or reach out directly on WhatsApp with your target city and preferred model format.",
    badge: "Step 1 · 2 Minutes"
  },
  {
    number: "02",
    title: "Discuss the Opportunity",
    subtitle: "1-on-1 Discovery Discussion",
    description: "Connect directly with Founder Aditya Kuttan to discuss catchment delivery viability, cloud kitchen or dine-in site suitability, and revenue targets.",
    badge: "Step 2 · Discovery"
  },
  {
    number: "03",
    title: "Understand the Model",
    subtitle: "Unit Economics & Agreement",
    description: "Review detailed financial projections, 5-year Franchise Agreement terms, flat 5% royalty, and our secret standardized premix logistics.",
    badge: "Step 3 · Due Diligence"
  },
  {
    number: "04",
    title: "Proceed With Application & Launch",
    subtitle: "Turnkey Launch in 21 Days",
    description: "Finalize agreement formalities, set up your 200–350 sq.ft. space, onboard onto Swiggy/Zomato/Magicpin, and complete on-site staff drills.",
    badge: "Step 4 · Go Live"
  }
];

export const HowItWorks: React.FC = () => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Send className="w-6 h-6 text-[#E87924]" />;
      case 1:
        return <PhoneCall className="w-6 h-6 text-[#E87924]" />;
      case 2:
        return <FileCheck className="w-6 h-6 text-[#E87924]" />;
      case 3:
        return <Rocket className="w-6 h-6 text-[#E87924]" />;
      default:
        return <Send className="w-6 h-6 text-[#E87924]" />;
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="py-16 sm:py-22 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E87924]">
              Simple &amp; Transparent Onboarding
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <TextReveal
            text="HOW IT WORKS: 4 SIMPLE STEPS TO YOUR FRANCHISE"
            as="h2"
            className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#28231E] tracking-tight leading-[1.12] mb-4 justify-center text-center"
          />

          <p className="text-sm sm:text-base lg:text-lg text-[#28231E]/80 leading-relaxed">
            From initial discovery to firing your first commercial delivery order in your city — a structured, founder-guided roadmap.
          </p>
        </ScrollReveal>

        {/* 4 Steps Visual Flow Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative"
        >
          {STEPS_DATA.map((step, idx) => (
            <StaggerItem
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E87924]/20 shadow-sm hover:border-[#E87924] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Top Bar: Number + Icon */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#E87924]/15">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#E87924] tabular-nums">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF3E3] border border-[#E87924]/30 flex items-center justify-center shrink-0 shadow-xs">
                    {getIcon(idx)}
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87924] block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-display font-bold text-lg sm:text-xl text-[#28231E] leading-snug mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#28231E]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#28231E]/8">
                <span className="text-[11px] font-bold text-[#E87924] bg-[#FFF3E3] px-3 py-1 rounded-full block text-center border border-[#E87924]/20">
                  {step.badge}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Step Action Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={() => scrollTo('#franchise-enquiry')}
            className="inline-flex items-center justify-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Begin Step 1: Submit Your Franchise Enquiry</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};
