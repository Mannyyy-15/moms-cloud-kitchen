import React from 'react';
import { Heart, Sparkles, UtensilsCrossed, Flame } from 'lucide-react';
import { BRAND_INFO, BRAND_VALUES } from '../data/brandData';
import { ScrollReveal, StaggerContainer, StaggerItem, TextReveal } from './ScrollReveal';

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
    <section id="values" className="py-14 sm:py-18 lg:py-24 bg-[#FFF8EC] border-b border-[#28231E]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E87924]">
              Mission, Vision & Promise
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <TextReveal
            text="FRESH FOOD SHOULD FEEL LIKE HOME."
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4"
          />

          <p className="font-serif-editorial italic text-xl sm:text-2xl text-[#B95732]">
            &ldquo;No complicated story — just comforting food made with love and served hot and fresh.&rdquo;
          </p>

          <p className="mt-4 text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            We prepare food fresh from our home kitchen, with the care and warmth you expect from
            Mom&apos;s cooking. Every tadka is tempered to order, bringing that familiar, soothing aroma
            straight to your doorstep.
          </p>
        </div>

        {/* Editorial 2-Column Split: Mission/Goal + Mother Cooking Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch mb-16 sm:mb-20">
          {/* Mission & Goal Cards (Left Column) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-[#F6EBDD] p-6 sm:p-8 rounded-3xl border border-[#28231E]/10 h-full">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E87924] block mb-2">
                  Our Mission
                </span>
                <h3 className="font-display font-bold text-2xl text-[#174B35] mb-3">
                  Purity in Every Grain, Warmth in Every Bite
                </h3>
                <p className="text-sm sm:text-base text-[#28231E]/80 leading-relaxed">
                  To serve pure, home-cooked food made with motherly love and care, delivering fresh,
                  comforting and wholesome meals to everyone who misses home.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="bg-[#174B35] text-[#FFF8EC] p-6 sm:p-8 rounded-3xl border border-[#174B35] h-full shadow-lg">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E87924] block mb-2">
                  Our Goal
                </span>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                  Every Neighbourhood Deserves Real Home Food
                </h3>
                <p className="text-sm sm:text-base text-[#FFF8EC]/85 leading-relaxed">
                  To expand across communities and cities, becoming the most loved, trusted home-food brand
                  by maintaining authenticity, warmth and quality in every single order dispatched.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Mother Cooking Imagery (Right Column) */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#28231E]/10 h-full min-h-[300px] sm:min-h-[380px] relative bg-[#28231E]/5">
              <img
                src={BRAND_INFO.images.momCooking}
                alt="Mother preparing homestyle meals in Mom's Cloud Kitchen"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-[#E87924] block mb-1">
                  100% Homestyle Preparation
                </span>
                <p className="font-display font-bold text-lg sm:text-xl text-white leading-snug">
                  Zero Preservatives · Desi Ghee & Fresh Pressed Oils · Traditional Recipes
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 4 Brand Pillars (Bottom Row) */}
        <div>
          <ScrollReveal direction="up" className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E87924] block mb-1">
              Core Principles
            </span>
            <h3 className="font-display font-bold text-2xl text-[#174B35]">
              The 4 Pillars of Mom&apos;s Kitchen
            </h3>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BRAND_VALUES.map((val, idx) => (
              <StaggerItem
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#28231E]/8 hover:border-[#174B35]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFF8EC] border border-[#28231E]/8 flex items-center justify-center mb-5">
                    {getIcon(val.iconName)}
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#174B35] mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#28231E]/75 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
