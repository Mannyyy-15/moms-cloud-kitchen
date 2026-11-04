import React from 'react';
import { Heart, Sparkles, UtensilsCrossed, Flame } from 'lucide-react';
import { BRAND_INFO, BRAND_VALUES } from '../data/brandData';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const MissionVision: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#E87924]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#E87924]" />;
      case 'ChefHat':
        return <UtensilsCrossed className="w-5 h-5 text-[#E87924]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#E87924]" />;
      default:
        return <Heart className="w-5 h-5 text-[#E87924]" />;
    }
  };

  return (
    <section id="values" className="py-20 lg:py-32 bg-[#FFF8EC] border-b border-[#28231E]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <ScrollReveal direction="up" className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E87924]">
              Mission, Vision & Promise
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4">
            FRESH FOOD SHOULD FEEL LIKE HOME.
          </h2>

          <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#B95732]">
            "No complicated story — just comforting food made with love and served hot and fresh."
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            We prepare food fresh from our home kitchen, with the care and warmth you expect from
            Mom’s cooking. Every tadka is tempered to order, bringing that familiar, soothing aroma
            straight to your doorstep.
          </p>
        </ScrollReveal>

        {/* Editorial 2-Column Split: Mission/Goal + Mother Cooking Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-20">
          {/* Mission & Goal Editorial Cards */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* Mission Card */}
            <div className="p-8 bg-[#F6EBDD] rounded-2xl border border-[#28231E]/8 relative overflow-hidden group hover:border-[#E87924]/30 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E87924]/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-[#E87924]" />
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#174B35]">
                  Our Mission
                </h3>
              </div>
              <p className="text-base sm:text-lg text-[#28231E]/85 leading-relaxed font-normal">
                To serve simple, pure, and wholesome home-cooked food that brings the true taste of a
                mother's kitchen straight to your home.
              </p>
            </div>

            {/* Goal Card */}
            <div className="p-8 bg-[#174B35] text-[#FFF8EC] rounded-2xl relative overflow-hidden shadow-lg group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-[#E87924]" />
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Our Goal
                </h3>
              </div>
              <p className="text-base sm:text-lg text-[#FFF8EC]/90 leading-relaxed font-normal">
                To become the most trusted and preferred choice for authentic, hygienic, home-style
                food in the Vasai-Virar region.
              </p>
            </div>
          </ScrollReveal>

          {/* Emotional Photo of Mom's Hand Tempering Spices */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-6">
            <div className="relative h-full min-h-[340px] rounded-2xl overflow-hidden shadow-lg border border-[#28231E]/10">
              <img
                src={BRAND_INFO.images.momCooking}
                alt="Mother's caring hands tempering spices in traditional kadai"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-103"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-6 sm:p-8">
                <div className="text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#E87924] block mb-1">
                    The Sacred Kitchen Tradition
                  </span>
                  <p className="font-serif-editorial italic text-base sm:text-lg text-white/95">
                    "When the mustard seeds crackle and fresh curry leaves hit the hot oil, that’s where Mom’s love begins."
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Core Brand Values Grid */}
        <div>
          <ScrollReveal direction="up" className="border-t border-[#28231E]/10 pt-12 pb-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#174B35] mb-2">
              Our 4 Pillars of Wholesomeness
            </h3>
            <p className="font-display font-bold text-2xl text-[#28231E]">
              What We Guarantee in Every Meal
            </p>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_VALUES.map((val, idx) => (
              <StaggerItem
                key={idx}
                className="p-6 bg-white rounded-xl border border-[#28231E]/8 hover:border-[#E87924]/40 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FFF8EC] border border-[#E87924]/20 flex items-center justify-center mb-4">
                  {getIcon(val.iconName)}
                </div>
                <h4 className="font-display font-bold text-lg text-[#174B35] mb-2">
                  {val.title}
                </h4>
                <p className="text-sm text-[#28231E]/75 leading-relaxed">
                  {val.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
