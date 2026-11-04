/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { Statistics } from './components/Statistics';
import { MissionVision } from './components/MissionVision';
import { WhyPartner } from './components/WhyPartner';
import { FranchiseOpportunity } from './components/FranchiseOpportunity';
import { FranchiseModels } from './components/FranchiseModels';
import { RoiCalculator } from './components/RoiCalculator';
import { HowItWorks } from './components/HowItWorks';
import { FoodShowcase } from './components/FoodShowcase';
import { FaqSection } from './components/FaqSection';
import { FranchiseForm } from './components/FranchiseForm';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LegalModal, LegalTab } from './components/LegalModal';
import { FranchiseType } from './types';
import { initMetaPixel } from './utils/metaPixel';
import { captureAndStoreUtm } from './utils/utm';

export default function App() {
  const [selectedFranchiseType, setSelectedFranchiseType] =
    useState<FranchiseType>('Single Franchisee');
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('franchise-terms');

  useEffect(() => {
    // 1. Capture UTM attribution parameters from URL & persist to sessionStorage
    captureAndStoreUtm();
    // 2. Initialize Meta Pixel tracking safely if configured
    initMetaPixel();
  }, []);

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
      {/* A. Header: Sticky Navigation Bar */}
      <Navbar onSelectFranchise={handleSelectModel} />

      <main className="flex-grow">
        {/* B. Hero Section: Meta Ads Traffic Optimized */}
        <Hero />

        {/* C. Trust & Brand Introduction: Story, Founder & Authentic Roots */}
        <BrandStory />

        {/* C2. Brand Milestones & Statistics: Animated Number Counters */}
        <Statistics />

        {/* C3. Mission, Vision, and Values */}
        <MissionVision />

        {/* D. Why Choose This Franchise?: Zero Chef Dependency, 28-35% Margins */}
        <WhyPartner />

        {/* E. Franchise Opportunity Transition */}
        <FranchiseOpportunity />

        {/* E2. Franchise Models: Single Franchisee (₹3.99L) & Master Franchise (₹12.50L) */}
        <FranchiseModels onSelectModel={handleSelectModel} />

        {/* E3. Interactive Unit Economics & ROI Calculator */}
        <RoiCalculator />

        {/* F. How It Works: Simple 4-Step Visual Roadmap */}
        <HowItWorks />

        {/* G. Brand Gallery: Authentic 23 Signature Dishes */}
        <FoodShowcase />

        {/* I. Final Lead Generation Section: Highest Priority Form */}
        <FranchiseForm selectedFranchiseType={selectedFranchiseType} />

        {/* H. Frequently Asked Questions: Verified Knowledgebase */}
        <FaqSection />

        {/* I2. Final Call to Action */}
        <FinalCTA />
      </main>

      {/* Footer with Verified Contact Info & Legal Disclaimers */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* CRO: Sticky Mobile Enquiry Bar (Disappears when form is in view) */}
      <StickyMobileBar />

      {/* Floating Sticky WhatsApp Bubble */}
      <FloatingWhatsApp />

      {/* Comprehensive Legal Modal (12 Mandatory Franchise Clauses) */}
      <LegalModal
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        defaultTab={legalTab}
      />
    </div>
  );
}
