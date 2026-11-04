/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { Statistics } from './components/Statistics';
import { MissionVision } from './components/MissionVision';
import { FoodShowcase } from './components/FoodShowcase';
import { FranchiseOpportunity } from './components/FranchiseOpportunity';
import { FranchiseModels } from './components/FranchiseModels';
import { RoiCalculator } from './components/RoiCalculator';
import { WhyPartner } from './components/WhyPartner';
import { FaqSection } from './components/FaqSection';
import { FranchiseForm } from './components/FranchiseForm';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LegalModal, LegalTab } from './components/LegalModal';
import { FranchiseType } from './types';

export default function App() {
  const [selectedFranchiseType, setSelectedFranchiseType] =
    useState<FranchiseType>('Single Franchisee');
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('franchise-terms');

  const handleSelectModel = (type: FranchiseType) => {
    setSelectedFranchiseType(type);
    const formElement = document.querySelector('#franchise-enquiry');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLegal = (tab: LegalTab = 'franchise-terms') => {
    setLegalTab(tab);
    setIsLegalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8EC] text-[#28231E] selection:bg-[#E87924] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar onSelectFranchise={handleSelectModel} />

      <main className="flex-grow">
        {/* Section 2: Hero */}
        <Hero />

        {/* Section 3: Brand Story & Founder Aditya Pushpa Kuttan */}
        <BrandStory />

        {/* Section 4: Brand Milestones & Statistics with Animated Number Counters */}
        <Statistics />

        {/* Section 5: Mission, Vision, and Values */}
        <MissionVision />

        {/* Section 6: Our Food / Signature Menu Showcase with 23 authentic dishes */}
        <FoodShowcase />

        {/* Section 7: Franchise Opportunity Transition */}
        <FranchiseOpportunity />

        {/* Section 8: Franchise Models (Single Franchisee & Master Franchise) */}
        <FranchiseModels onSelectModel={handleSelectModel} />

        {/* Section 9: Interactive Franchise ROI & Profit Calculator */}
        <RoiCalculator />

        {/* Section 10: Why Mom's Cloud Kitchen? */}
        <WhyPartner />

        {/* Section 11: Franchise Enquiry Lead Generation Form (WhatsApp Routed) */}
        <FranchiseForm selectedFranchiseType={selectedFranchiseType} />

        {/* Section 12: Frequently Asked Questions (FAQ & AEO Knowledgebase) */}
        <FaqSection />

        {/* Section 13: Final Call to Action */}
        <FinalCTA />
      </main>

      {/* Section 14: Footer with Legal Modals & WhatsApp support */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Floating Sticky WhatsApp Bubble */}
      <FloatingWhatsApp />

      {/* Comprehensive Legal, Policies & 12 Clauses Modal */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        defaultTab={legalTab}
      />
    </div>
  );
}
