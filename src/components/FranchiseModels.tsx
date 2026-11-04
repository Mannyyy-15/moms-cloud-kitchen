import React from 'react';
import { ArrowRight, Store, Building2, Check } from 'lucide-react';
import { FRANCHISE_MODELS } from '../data/brandData';
import { FranchiseType } from '../types';
import { ScrollReveal, StaggerContainer, StaggerItem, TextReveal } from './ScrollReveal';

interface FranchiseModelsProps {
  onSelectModel: (type: FranchiseType) => void;
}

export const FranchiseModels: React.FC<FranchiseModelsProps> = ({ onSelectModel }) => {
  return (
    <section id="franchise-models" className="py-20 lg:py-32 bg-[#FFF8EC] border-b border-[#28231E]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E87924]">
              Franchise Formats
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <TextReveal
            text="CHOOSE YOUR PARTNERSHIP MODEL"
            as="h2"
            className="font-display font-black text-3xl sm:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4 justify-center text-center"
          />

          <p className="text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            Whether you want to operate a local delivery kitchen or drive regional expansion,
            we have a collaborative structure designed to grow Mom&apos;s Cloud Kitchen with you.
          </p>
        </ScrollReveal>

        {/* 2 Distinct Franchise Model Cards */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {FRANCHISE_MODELS.map((model) => {
            const isMaster = model.id === 'Master Franchise';

            return (
              <StaggerItem
                key={model.id}
                className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                  isMaster
                    ? 'bg-[#174B35] text-[#FFF8EC] shadow-xl border-2 border-[#174B35]'
                    : 'bg-[#F6EBDD] text-[#28231E] border border-[#28231E]/10 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Header of Card */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        isMaster ? 'bg-[#E87924] text-white' : 'bg-[#174B35] text-[#FFF8EC]'
                      }`}
                    >
                      {isMaster ? <Building2 className="w-7 h-7" /> : <Store className="w-7 h-7" />}
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${
                        isMaster
                          ? 'bg-white/15 text-white border border-white/20'
                          : 'bg-[#174B35]/10 text-[#174B35]'
                      }`}
                    >
                      {model.badge}
                    </span>
                  </div>

                  <h3
                    className={`font-display font-extrabold text-2xl sm:text-3xl mb-2 ${
                      isMaster ? 'text-white' : 'text-[#174B35]'
                    }`}
                  >
                    {model.title}
                  </h3>

                  <p
                    className={`text-sm font-medium mb-4 ${
                      isMaster ? 'text-[#E87924]' : 'text-[#E87924]'
                    }`}
                  >
                    {model.tagline}
                  </p>

                  <p
                    className={`text-base leading-relaxed mb-8 ${
                      isMaster ? 'text-[#FFF8EC]/90' : 'text-[#28231E]/80'
                    }`}
                  >
                    {model.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-3.5 mb-8">
                    {model.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                            isMaster ? 'bg-[#E87924]/20 text-[#E87924]' : 'bg-[#174B35]/15 text-[#174B35]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span
                          className={`text-sm ${
                            isMaster ? 'text-[#FFF8EC]/90' : 'text-[#28231E]/85'
                          }`}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action & Highlight */}
                <div>
                  <div
                    className={`p-4 rounded-xl text-xs mb-6 ${
                      isMaster ? 'bg-black/20 text-[#FFF8EC]/80' : 'bg-white/60 text-[#28231E]/80'
                    }`}
                  >
                    {model.highlight}
                  </div>

                  <button
                    onClick={() => onSelectModel(model.id as FranchiseType)}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg ${
                      isMaster
                        ? 'bg-[#E87924] hover:bg-[#D16719] text-white'
                        : 'bg-[#174B35] hover:bg-[#103626] text-white'
                    }`}
                  >
                    <span>Enquire for {model.title}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
