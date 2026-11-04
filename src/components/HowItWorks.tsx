import React from 'react';
import { Send, PhoneCall, FileCheck, Rocket, ArrowRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem, TextReveal } from './ScrollReveal';
import { StepItem } from '../types';

export const STEPS_DATA: StepItem[] = [
  {
    number: "01",
    title: "Submit Your Enquiry",
    subtitle: "Quick Online Form or WhatsApp",
    description: "Fill out the short franchise application form below or reach out directly on WhatsApp with your target city and investment budget.",
    badge: "Step 1 · 2 Minutes"
  },
  {
    number: "02",
    title: "Discuss the Opportunity",
    subtitle: "1-on-1 Discovery Discussion",
    description: "Connect directly with Founder Aditya Pushpa Kuttan to discuss catchment delivery viability, cloud kitchen location suitability, and revenue targets.",
    badge: "Step 2 · Discovery"
  },
  {
    number: "03",
    title: "Understand the Model",
    subtitle: "Unit Economics & Agreement",
    description: "Review detailed financial projections, 5-year Franchise Agreement terms, 3-warning audit compliance, and our secret standardized premix logistics.",
    badge: "Step 3 · Due Diligence"
  },
  {
    number: "04",
    title: "Proceed With Application & Launch",
    subtitle: "Turnkey Launch in 21 Days",
    description: "Finalize agreement formalities, set up your 150–250 sq.ft. kitchen, onboard onto Swiggy/Zomato/Magicpin, and complete on-site staff drills.",
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
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-28 bg-[#FFF8EC] border-b border-[#28231E]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E87924]">
              Simple & Transparent Onboarding
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <TextReveal
            text="HOW IT WORKS: 4 SIMPLE STEPS TO YOUR CLOUD KITCHEN"
            as="h2"
            className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4 justify-center text-center"
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
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#28231E]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Step Top Bar: Number + Icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#28231E]/6">
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#174B35] group-hover:text-[#E87924] transition-colors tabular-nums">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF8EC] border border-[#E87924]/20 flex items-center justify-center shrink-0 shadow-xs">
                    {getIcon(idx)}
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87924] block mb-1">
                  {step.subtitle}
                </span>

                <h3 className="font-display font-bold text-lg sm:text-xl text-[#174B35] leading-snug mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#28231E]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#28231E]/6">
                <span className="text-[11px] font-semibold text-[#174B35] bg-[#174B35]/8 px-3 py-1 rounded-full block text-center">
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
            className="inline-flex items-center justify-center gap-2 bg-[#174B35] hover:bg-[#103626] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Begin Step 1: Submit Your Franchise Enquiry</span>
            <ArrowRight className="w-4 h-4 text-[#E87924]" />
          </button>
        </div>
      </div>
    </section>
  );
};
