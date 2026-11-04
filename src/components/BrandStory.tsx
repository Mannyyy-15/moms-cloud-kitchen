import React from 'react';
import { ArrowRight, Quote } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { ScrollReveal, TextReveal } from './ScrollReveal';

export const BrandStory: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="story" className="pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-20 lg:pb-16 bg-[#FFF8EC] border-b border-[#28231E]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Brand Story Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E87924]">
                Our Story
              </span>
              <span className="h-px w-8 bg-[#E87924]" />
            </div>

            {/* Cinematic Text Reveal on Headline */}
            <TextReveal
              text="FROM A HOME KITCHEN TO A GROWING FOOD BRAND."
              as="h2"
              className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4 sm:mb-5 text-balance"
            />

            {/* Story Text */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="space-y-3.5 text-sm sm:text-base lg:text-lg text-[#28231E]/85 leading-relaxed font-normal">
                <p>
                  Founded by <strong className="text-[#174B35] font-semibold">Aditya Pushpa Kuttan</strong> in{' '}
                  <strong className="text-[#174B35] font-semibold">February 2024</strong>, Mom&apos;s Cloud Kitchen
                  began with a simple belief — food should feel like home.
                </p>
                <p>
                  What started as a home-kitchen initiative has reached over{' '}
                  <strong className="text-[#E87924] font-semibold">4,000 orders</strong>, serving food lovers
                  across <strong className="text-[#174B35] font-semibold">Vasai and Virar</strong> through{' '}
                  <span className="font-medium text-[#28231E]">Swiggy, Zomato and Magicpin</span>.
                </p>
                <p>
                  Our journey is built around the comfort of home-style food, personal care and the
                  feeling that every meal should carry a little piece of Mom&apos;s love.
                </p>
              </div>

              {/* Pull Quote Box */}
              <div className="mt-5 p-5 sm:p-6 bg-[#F6EBDD] rounded-2xl border border-[#28231E]/10 relative">
                <Quote className="w-7 h-7 text-[#E87924]/30 absolute top-4 right-4" />
                <p className="font-serif-editorial italic text-base sm:text-xl text-[#174B35] leading-snug">
                  &ldquo;We don&apos;t cook for customers — we prepare meals the same way a mother cooks for her
                  family when they come home hungry.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-[#E87924]" />
                  <span className="text-xs font-semibold text-[#28231E]/70 uppercase tracking-wider">
                    Aditya Pushpa Kuttan · Founder
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-5 flex items-center gap-4">
                <button
                  onClick={() => scrollTo('#values')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#E87924] hover:text-[#D16719] transition-colors group cursor-pointer"
                >
                  <span>Discover Our Journey & Values</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Authentic Founder Image & Credentials */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-5">
            <div className="relative">
              {/* Outer decorative backdrop border */}
              <div className="absolute -inset-3 sm:-inset-4 bg-[#F6EBDD] rounded-3xl transform rotate-1 border border-[#28231E]/10 -z-10" />

              {/* Main Founder Card */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-[#28231E]/10">
                <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#28231E]/5">
                  <img
                    src={BRAND_INFO.images.founder}
                    alt="Aditya Pushpa Kuttan, Founder of Mom's Cloud Kitchen"
                    className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Founder Info Plaque */}
                <div className="p-5 sm:p-6 bg-white border-t border-[#28231E]/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#174B35]">
                        {BRAND_INFO.founder}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#E87924] mt-0.5">
                        {BRAND_INFO.founderRole}
                      </p>
                    </div>

                    <span className="text-xs font-bold text-[#174B35] bg-[#174B35]/10 px-3 py-1 rounded-full">
                      Vasai–Virar
                    </span>
                  </div>

                  <p className="text-xs text-[#28231E]/70 mt-2.5 leading-relaxed">
                    Spearheading brand vision, authentic homestyle South Indian recipe standardized SOPs, and delivery cloud kitchen franchise growth.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
