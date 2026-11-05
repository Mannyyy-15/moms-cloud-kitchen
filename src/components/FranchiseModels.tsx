import React, { useState } from 'react';
import { ArrowRight, Store, Utensils, Building2, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { FRANCHISE_MODELS, SETUP_COST_BREAKDOWN } from '../data/brandData';
import { FranchiseType } from '../types';
import { ScrollReveal, StaggerContainer, StaggerItem, TextReveal } from './ScrollReveal';

interface FranchiseModelsProps {
  onSelectModel: (type: FranchiseType) => void;
}

export const FranchiseModels: React.FC<FranchiseModelsProps> = ({ onSelectModel }) => {
  const [activeTab, setActiveTab] = useState<'unit' | 'master'>('unit');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const displayedModels = activeTab === 'unit'
    ? FRANCHISE_MODELS.filter(m => m.track === 'Cloud Kitchen Pro')
    : FRANCHISE_MODELS.filter(m => m.track === 'City Master Franchise');

  return (
    <section id="franchise-models" className="py-16 sm:py-22 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E87924]">
              Verified Partnership Formats
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <TextReveal
            text="CHOOSE YOUR FRANCHISE OPPORTUNITY"
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl text-[#28231E] tracking-tight leading-[1.12] mb-4 justify-center text-center"
          />

          <p className="text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            Choose between delivery-only cloud kitchens or hybrid dine-in restaurants. Low upfront capital, proven standardized dry spice premixes, and rapid ROI in 6 to 8 months.
          </p>

          {/* Format Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border-2 border-[#E87924]/20 shadow-xs">
            <button
              onClick={() => setActiveTab('unit')}
              className={`px-5 sm:px-7 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'unit'
                  ? 'bg-[#E87924] text-white shadow-md'
                  : 'text-[#28231E]/70 hover:text-[#E87924]'
              }`}
            >
              Unit Franchise (Cloud Kitchen Pro)
            </button>
            <button
              onClick={() => setActiveTab('master')}
              className={`px-5 sm:px-7 py-2.5 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'master'
                  ? 'bg-[#E87924] text-white shadow-md'
                  : 'text-[#28231E]/70 hover:text-[#E87924]'
              }`}
            >
              City Master Franchise
            </button>
          </div>
        </ScrollReveal>

        {/* Dynamic Model Cards Grid */}
        <StaggerContainer
          staggerDelay={0.12}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto mb-12"
        >
          {displayedModels.map((model) => {
            const isDineIn = model.id.includes('Dine-In');

            return (
              <StaggerItem
                key={model.id}
                className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative bg-white border-2 ${
                  isDineIn ? 'border-[#E87924] shadow-xl' : 'border-[#E87924]/20 shadow-md hover:border-[#E87924]/60 hover:shadow-lg'
                }`}
              >
                <div>
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFF3E3] border border-[#E87924]/30 flex items-center justify-center text-[#E87924]">
                      {isDineIn ? <Utensils className="w-6 h-6" /> : <Store className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#E87924]/10 text-[#E87924] border border-[#E87924]/20">
                      {model.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#28231E] mb-1">
                    {model.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-bold text-[#E87924] uppercase tracking-wider mb-4">
                    {model.tagline}
                  </p>

                  <p className="text-sm text-[#28231E]/80 leading-relaxed mb-6">
                    {model.description}
                  </p>

                  {/* Pricing Key Metrics Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-4 rounded-2xl bg-[#FFF9F2] border border-[#E87924]/20 mb-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#28231E]/60 block">Franchise Fee</span>
                      <span className="font-display font-black text-sm sm:text-base text-[#E87924]">{model.franchiseFee}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#28231E]/60 block">Setup Cost</span>
                      <span className="font-display font-black text-sm sm:text-base text-[#28231E]">{model.setupCost}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase font-bold text-[#28231E]/60 block">Space Required</span>
                      <span className="font-display font-black text-sm sm:text-base text-[#28231E]">{model.areaRequired}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3 mb-8">
                    {model.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#E87924]/15 text-[#E87924] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-[#28231E]/85 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action & Highlight */}
                <div>
                  <div className="p-3.5 rounded-xl text-xs font-semibold mb-5 bg-[#FFF3E3] text-[#28231E]/80 border border-[#E87924]/20">
                    <span className="font-bold text-[#E87924]">ROI Focus: </span>
                    {model.highlight}
                  </div>

                  <button
                    onClick={() => onSelectModel(model.id as FranchiseType)}
                    className="w-full py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white shadow-md hover:shadow-xl transition-all cursor-pointer"
                  >
                    <span>Enquire for {model.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Expandable Setup Cost Breakdown Button & Section */}
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FFF3E3] border-2 border-[#E87924]/30 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#28231E] transition-all cursor-pointer"
          >
            <span>{showBreakdown ? 'Hide Setup Cost Breakdown' : 'View Estimated Setup Cost Breakdown (₹5L–₹8L)'}</span>
            {showBreakdown ? <ChevronUp className="w-4 h-4 text-[#E87924]" /> : <ChevronDown className="w-4 h-4 text-[#E87924]" />}
          </button>

          {showBreakdown && (
            <div className="mt-6 text-left bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E87924]/30 shadow-lg animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#28231E]/10">
                <div>
                  <h4 className="font-display font-black text-lg sm:text-xl text-[#28231E]">
                    Turnkey Kitchen &amp; Restaurant Capex Breakdown
                  </h4>
                  <p className="text-xs text-[#28231E]/70 mt-0.5">
                    Itemized capital investment details covering all hardware, equipment, exhausts &amp; branding.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#E87924] bg-[#E87924]/10 px-3 py-1 rounded-full whitespace-nowrap">
                  5-Year Agreement
                </span>
              </div>

              <div className="space-y-4">
                {SETUP_COST_BREAKDOWN.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FFF9F2] border border-[#E87924]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="max-w-md">
                      <span className="font-display font-bold text-sm text-[#28231E] block">
                        {item.category}
                      </span>
                      <p className="text-xs text-[#28231E]/75 mt-0.5 leading-relaxed">
                        {item.details}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 text-xs font-bold">
                      <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E87924]/20">
                        <span className="text-[10px] text-[#28231E]/60 block uppercase">Cloud Kitchen</span>
                        <span className="text-[#E87924]">{item.cloudKitchen}</span>
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E87924]/20">
                        <span className="text-[10px] text-[#28231E]/60 block uppercase">Cloud + Dine-In</span>
                        <span className="text-[#28231E]">{item.cloudPlusDineIn}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
