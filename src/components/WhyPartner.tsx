import React from 'react';
import { WHY_PARTNER_PILLARS, BRAND_INFO } from '../data/brandData';
import { ScrollReveal, StaggerContainer, StaggerItem, TextReveal } from './ScrollReveal';

export const WhyPartner: React.FC = () => {
  return (
    <section id="why-partner" className="py-16 sm:py-22 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#E87924]">
              Brand Positioning
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <TextReveal
            text="WHY PARTNER WITH MOM'S CLOUD KITCHEN?"
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl text-[#28231E] tracking-tight leading-[1.12] mb-4"
          />

          <p className="text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            Our brand is anchored in five authentic pillars that separate everyday home comfort
            from generic commercial eateries.
          </p>
        </ScrollReveal>

        {/* Asymmetrical Layout: 5 Pillars List + Atmospheric Kitchen Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Numbered Editorial Pillars */}
          <StaggerContainer staggerDelay={0.1} className="lg:col-span-7 space-y-5">
            {WHY_PARTNER_PILLARS.map((pillar) => (
              <StaggerItem
                key={pillar.number}
                className="p-6 sm:p-7 bg-white rounded-2xl border-2 border-[#E87924]/20 hover:border-[#E87924] hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-display font-black text-2xl sm:text-3xl text-[#E87924] tabular-nums">
                    {pillar.number}.
                  </span>
                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#28231E]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-bold text-[#E87924] uppercase tracking-wider mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#28231E]/80 leading-relaxed mt-2.5 pl-9 sm:pl-10">
                  {pillar.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Right Column: Visual Anchor & Vasai-Virar Regional Focus */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="rounded-3xl overflow-hidden shadow-xl border-2 border-[#E87924]/25 bg-white">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#28231E]/5">
                <img
                  src={BRAND_INFO.images.momCooking}
                  alt="Mom preparing authentic home-style food in Mom's Cloud Kitchen"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 bg-white border-t border-[#E87924]/15">
                <span className="text-xs font-black uppercase tracking-wider text-[#E87924] block mb-1">
                  The Heart of our Brand
                </span>
                <h4 className="font-display font-bold text-lg text-[#28231E] mb-2">
                  Maternal Warmth &amp; Kitchen Discipline
                </h4>
                <p className="text-xs sm:text-sm text-[#28231E]/75 leading-relaxed">
                  Every dish is guided by the fundamental belief that meals should be prepared with care,
                  uncompromising hygiene, and the soothing simplicity of home food.
                </p>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E87924]/20 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs text-[#28231E]/60 block font-medium">Aggregator Availability</span>
                <span className="text-sm font-black text-[#28231E]">Swiggy · Zomato · Magicpin</span>
              </div>
              <span className="text-xs font-black text-[#E87924] bg-[#FFF3E3] px-3 py-1 rounded-full border border-[#E87924]/20">
                {BRAND_INFO.orderCount} Orders
              </span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
