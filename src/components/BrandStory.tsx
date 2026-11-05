import React from 'react';
import { Quote, Sparkles, Briefcase, Award, TrendingUp, MessageSquare, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { ScrollReveal, TextReveal } from './ScrollReveal';

export const BrandStory: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const milestones = [
    {
      year: 'Colaba, Mumbai',
      role: 'Humble Beginnings',
      desc: 'Grew up in a Colaba slum with limited resources but unlimited dreams. Started as a Housekeeping Associate at Café Coffee Day — no shortcuts, just relentless hard work.',
      icon: <Briefcase className="w-4 h-4 text-[#E87924]" />
    },
    {
      year: '20 Years in Hospitality',
      role: 'Head of Operations (India & GCC)',
      desc: 'Rose through the ranks across India and international markets including UAE, Oman and Qatar. Built deep mastery in F&B cost control, supply chain, and kitchen operational excellence.',
      icon: <Award className="w-4 h-4 text-[#E87924]" />
    },
    {
      year: 'Virar, Maharashtra',
      role: 'Mom’s Cloud Kitchen Founder',
      desc: 'Founded on honest home-style flavours and maternal care. Delivered 4,000+ orders, now opening franchise territories for passionate entrepreneurs across India.',
      icon: <TrendingUp className="w-4 h-4 text-[#E87924]" />
    }
  ];

  return (
    <section id="story" className="pt-14 pb-12 sm:pt-18 sm:pb-16 lg:pt-24 lg:pb-20 bg-[#FFF9F2] border-b border-[#E87924]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E87924]">
              About Me · Founder's Story
            </span>
            <span className="h-px w-10 bg-[#E87924]" />
          </div>

          <TextReveal
            text="SLUM TO AN ENTREPRENEUR."
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#28231E] tracking-tight leading-[1.08] mb-3"
          />

          <p className="font-serif-editorial italic text-lg sm:text-2xl text-[#D16719] leading-snug">
            A Journey of Dreams, Determination &amp; Never Giving Up.
          </p>
        </div>

        {/* Main 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column (7 cols): Full Authentic Narrative */}
          <div className="lg:col-span-7 flex flex-col">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-4 text-base sm:text-lg text-[#28231E]/85 leading-relaxed font-normal">
                <p className="text-lg sm:text-xl font-medium text-[#28231E] leading-relaxed">
                  Every great journey begins with a dream. Mine began in the narrow lanes of <strong className="font-bold text-[#E87924]">Colaba, Mumbai</strong>, where I grew up in a slum with limited resources but unlimited dreams.
                </p>

                <p>
                  I started my professional journey with <strong className="font-bold text-[#28231E]">Café Coffee Day</strong>, not as a manager or a leader, but as a <strong className="font-bold text-[#E87924]">Housekeeping Associate</strong>. I had no shortcuts, no influential connections and no guaranteed success. All I had was the willingness to work hard, learn every day and prove myself.
                </p>

                <p>
                  Step by step, opportunity by opportunity, I built my career from the ground up. What started with housekeeping gradually transformed into a journey of leadership, responsibility and operational excellence.
                </p>

                <p>
                  Over the last <strong className="font-bold text-[#28231E]">20 years in the hospitality industry</strong>, I have worked across India and international markets, including the <strong className="font-bold text-[#E87924]">UAE, Oman and Qatar</strong>, eventually rising to leadership positions as a <strong className="font-bold text-[#28231E]">Head of Operations</strong>. Today, I lead operations in Mumbai, bringing years of hands-on experience, people management, business understanding and operational excellence to everything I do.
                </p>

                <p>
                  But somewhere along this journey, another dream was taking shape — the dream of becoming an entrepreneur.
                </p>

                <p>
                  Three years ago, I started <strong className="font-bold text-[#E87924]">Mom&apos;s Cloud Kitchen</strong> from <strong className="font-bold text-[#28231E]">Virar, Maharashtra</strong>, with a simple belief: <em className="font-serif-editorial italic text-[#D16719]">good food, made with love and served with honesty, will always find its way to people&apos;s hearts.</em>
                </p>

                <p>
                  What began as a small home-kitchen initiative has now delivered <strong className="font-bold text-[#E87924]">4,000+ orders</strong>, earning the trust and support of customers who have become a part of our journey.
                </p>

                <p>
                  For me, Mom&apos;s Cloud Kitchen is not just a food business. It represents the courage to start small, the confidence to dream big and the determination to build something of my own.
                </p>

                <p>
                  Today, I am taking the next step — from being a hospitality professional to becoming an entrepreneur, with a vision to grow Mom&apos;s Cloud Kitchen into a brand that brings authentic flavours, quality food and heartfelt service to every home.
                </p>
              </div>

              {/* Core Philosophy Callout Card */}
              <div className="mt-8 p-6 sm:p-8 bg-[#FFF3E3] rounded-3xl border-2 border-[#E87924]/20 relative shadow-sm">
                <Quote className="w-10 h-10 text-[#E87924]/25 absolute top-5 right-5 pointer-events-none" />
                <p className="font-serif-editorial italic text-lg sm:text-2xl text-[#28231E] leading-snug mb-4">
                  &ldquo;I come from humble beginnings, but I have never allowed my beginnings to define my destination. Because success is not about where you start. It is about how far you are willing to go.&rdquo;
                </p>

                <div className="pt-4 border-t border-[#E87924]/20">
                  <p className="font-display font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-[#E87924] mb-1">
                    SLUM TO AN ENTREPRENEUR.
                  </p>
                  <p className="text-xs sm:text-sm text-[#28231E]/80 font-medium">
                    A story of struggle. A journey of growth. A dream served with love.
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E87924]" />
                    <span className="font-display font-bold text-sm sm:text-base text-[#28231E]">
                      — Aditya Kuttan
                    </span>
                    <span className="text-xs font-semibold text-[#E87924]">
                      Founder, Mom&apos;s Cloud Kitchen
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollTo('#franchise-enquiry')}
                  className="inline-flex items-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <span>Partner with Aditya</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF3E3] text-[#28231E] border border-[#E87924]/30 font-bold text-sm px-5 py-3.5 rounded-xl shadow-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (5 cols): HD Founder Photo + Exact Requested Quote Below Photo */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <ScrollReveal direction="up" delay={0.2}>
              {/* Founder HD Image Card */}
              <div className="relative">
                <div className="absolute -inset-3 bg-[#FFF3E3] rounded-3xl transform rotate-1 border border-[#E87924]/20 -z-10" />

                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-[#E87924]/30">
                  <div className="aspect-[4/4.5] w-full overflow-hidden bg-[#28231E]/5 relative">
                    <img
                      src={BRAND_INFO.images.founder}
                      alt="Aditya Kuttan, Founder of Mom's Cloud Kitchen"
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-102"
                      fetchPriority="high"
                    />

                    <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md text-white p-3.5 rounded-xl border border-white/20">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFA858] block">
                        Founder &amp; Operations Leader
                      </span>
                      <span className="font-display font-black text-lg sm:text-xl text-white">
                        Aditya Kuttan
                      </span>
                    </div>
                  </div>

                  {/* Highlights Strip */}
                  <div className="p-5 bg-white space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold pb-2.5 border-b border-[#28231E]/8">
                      <span className="text-[#28231E]/70">Industry Experience</span>
                      <span className="text-[#28231E] font-extrabold">20+ Years in Hospitality</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold pb-2.5 border-b border-[#28231E]/8">
                      <span className="text-[#28231E]/70">Global Operations</span>
                      <span className="text-[#28231E] font-extrabold">India, UAE, Oman &amp; Qatar</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#28231E]/70">Track Record</span>
                      <span className="text-[#E87924] font-extrabold">4,000+ Orders Fulfilled</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exact Requested Quote Directly Below the Founder Photo */}
              <div className="mt-4 p-5 sm:p-6 bg-[#FFF3E3] rounded-2xl border-2 border-[#E87924]/30 shadow-sm relative">
                <Quote className="w-8 h-8 text-[#E87924]/20 absolute top-4 right-4 pointer-events-none" />
                <p className="font-serif-editorial italic text-sm sm:text-base text-[#28231E] leading-relaxed mb-3">
                  &ldquo;I started my career cleaning floors in a coffee shop. Yesterday I dreamed of building a food brand that reaches thousands of homes. The journey is proof that your background doesn&apos;t decide your future — your determination does.&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E87924]" />
                  <span className="font-display font-black text-xs uppercase tracking-wider text-[#E87924]">
                    Aditya Kuttan · Founder
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 3-Stage Career Trajectory Cards */}
            <ScrollReveal direction="up" delay={0.25} className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#E87924] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#E87924]" />
                <span>The 20-Year Journey At A Glance</span>
              </h3>

              <div className="space-y-3">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-2xl border border-[#E87924]/20 shadow-xs hover:border-[#E87924] hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#FFF3E3] border border-[#E87924]/20 flex items-center justify-center shrink-0">
                          {m.icon}
                        </div>
                        <span className="font-display font-bold text-sm text-[#28231E]">
                          {m.role}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-[#E87924] bg-[#E87924]/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                        {m.year}
                      </span>
                    </div>
                    <p className="text-xs text-[#28231E]/75 leading-relaxed pl-9">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
