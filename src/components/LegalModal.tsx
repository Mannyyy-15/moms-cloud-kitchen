import React, { useState } from 'react';
import { X, FileText, ShieldCheck, Scale, CheckCircle2, AlertTriangle, Building2, ExternalLink } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';

export type LegalTab = 'franchise-terms' | 'terms-of-use' | 'privacy-policy';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: LegalTab;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'franchise-terms'
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(defaultTab);

  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-[#FFF8EC] border-2 border-[#174B35]/20 text-[#28231E] rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="bg-[#174B35] text-white px-6 sm:px-8 py-5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-white/40 shrink-0">
              <img src="/logo.webp" alt="Mom's Cloud Kitchen" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-none">
                  Mom's Cloud Kitchen
                </span>
                <span className="text-[10px] bg-[#E87924] text-white px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  Legal
                </span>
              </div>
              <p className="text-xs text-[#FFF8EC]/75 mt-0.5">
                Compliance, Franchise Policies & Data Privacy · www.momscloudkitchen.com
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#F6EBDD] border-b border-[#28231E]/10 px-6 sm:px-8 flex items-center gap-2 sm:gap-4 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('franchise-terms')}
            className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'franchise-terms'
                ? 'border-[#E87924] text-[#174B35]'
                : 'border-transparent text-[#28231E]/60 hover:text-[#28231E]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#E87924]" />
            <span>Franchise Agreement Policies</span>
          </button>

          <button
            onClick={() => setActiveTab('terms-of-use')}
            className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'terms-of-use'
                ? 'border-[#E87924] text-[#174B35]'
                : 'border-transparent text-[#28231E]/60 hover:text-[#28231E]'
            }`}
          >
            <Scale className="w-4 h-4 text-[#E87924]" />
            <span>Terms of Website Use</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy-policy')}
            className={`py-3.5 px-3 sm:px-4 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'privacy-policy'
                ? 'border-[#E87924] text-[#174B35]'
                : 'border-transparent text-[#28231E]/60 hover:text-[#28231E]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#E87924]" />
            <span>Applicant Privacy Policy</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#28231E]/85 leading-relaxed">
          {/* TAB 1: FRANCHISE AGREEMENT POLICIES (12 Clauses adapted from official standard) */}
          {activeTab === 'franchise-terms' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#174B35]/8 rounded-2xl border border-[#174B35]/15 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#E87924] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#174B35] font-medium leading-relaxed">
                  <strong>Official Franchise Notice:</strong> Mom's Cloud Kitchen operates on a transparent, founder-friendly
                  franchise framework designed to preserve authentic homestyle food purity and protect our brand partners.
                  Review the core commercial clauses below before submitting formal application fees.
                </p>
              </div>

              {/* Clause 1 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">1</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Franchise Fee & Non-Refundability Policy
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    The designated one-time Franchise Fee (Cloud Kitchen Pro: ₹3,99,000 / City Master Franchise: ₹12,50,000)
                    is payable upon executing the formal agreement or issuing commercial territory confirmation.
                  </p>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs font-semibold">
                    <strong>STRICTLY NON-REFUNDABLE:</strong> The Franchise Fee is 100% non-refundable, non-transferable,
                    and non-adjustable under any circumstances, including partner business disagreements, FSSAI/municipal
                    licensing delays, commercial lease renegotiations, or voluntary cancellation by the franchisee.
                  </div>
                </div>
              </div>

              {/* Clause 2 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">2</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    5-Year Term of Agreement & 5-Year Renewal Framework
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    The initial franchise license is granted for a fixed period of <strong>5 (Five) Calendar Years</strong> from the execution date.
                  </p>
                  <p>
                    At the conclusion of each 5-year cycle, the agreement may be renewed for an additional 5-year term subject to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Satisfactory quarterly quality audit record with zero unresolved hygiene violations.</li>
                    <li>Strict adherence to Mom's authentic homestyle recipes and standardized SOPs.</li>
                    <li>Payment of the prevailing nominal administrative renewal fee.</li>
                  </ul>
                </div>
              </div>

              {/* Clause 3 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#E87924]/40 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924] text-white flex items-center justify-center text-xs font-black">3</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Mandatory Ingredient Sourcing & Secret Premixes (Zero Tolerance Policy)
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    The core soul of Mom's Cloud Kitchen lies in its pure homestyle taste, unadulterated spices, and
                    standardized batter consistency.
                  </p>
                  <p>
                    <strong>Franchisees are legally bound to source 100% of all proprietary dry spice blends, pre-measured premixes,
                    secret seasonings, and branded eco-packaging exclusively from the franchisor's authorized central supply chain.</strong>
                  </p>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs">
                    <strong>LEGAL BREACH CONSEQUENCES:</strong> Introducing unapproved third-party premixes, adulterated spices,
                    or imitation recipes compromises food purity and constitutes a material breach of contract, resulting in
                    immediate supply suspension, franchise termination, and legal damages.
                  </div>
                </div>
              </div>

              {/* Clause 4 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">4</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Non-Transferability & Outlet Relocation Transfer Fee
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    The franchise license is issued exclusively for the approved physical address and legal entity. It is
                    <strong> strictly non-transferable</strong> to any third-party without prior written consent from head office.
                  </p>
                  <p>
                    <strong>Relocation Policy:</strong> If a franchisee desires to relocate the kitchen within the designated territory,
                    a formal feasibility request must be approved, and the designated relocation transfer fee must be paid prior to commencing operations at the new site.
                  </p>
                </div>
              </div>

              {/* Clause 5 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">5</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Quarterly Audits (Quality, Hygiene, Taste, Packaging) & 3-Warning Protocol
                  </h3>
                </div>
                <div className="pl-10 space-y-3 text-xs sm:text-sm">
                  <p>
                    Certified brand auditors will conduct mandatory <strong>audits every 3 (Three) Months</strong> covering
                    food quality, kitchen cleanliness, temperature management, and packaging integrity.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#F6EBDD] rounded-xl border border-[#28231E]/10">
                      <span className="text-[#E87924] font-bold block text-xs mb-1">1st Warning</span>
                      <p className="text-[11px] text-[#28231E]/75">Official written inspection report with a strict 7-day rectification period.</p>
                    </div>
                    <div className="p-3 bg-[#F6EBDD] rounded-xl border border-[#28231E]/10">
                      <span className="text-[#E87924] font-bold block text-xs mb-1">2nd Warning</span>
                      <p className="text-[11px] text-[#28231E]/75">Formal penalty notice, mandatory retraining visit, and compliance fine.</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                      <span className="text-red-700 font-bold block text-xs mb-1">3rd Strike</span>
                      <p className="text-[11px] text-red-800">Immediate franchise termination, supply cessation, and legal escalation.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clause 6 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">6</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Staff Uniforms, Branded Attire & Grooming Mandate
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    Mom's Cloud Kitchen provides standard branded uniforms (aprons, caps/hairnets, t-shirts) free of cost
                    <strong> 1st time during the store launch</strong>. Additional replacement sets can be ordered at nominal pricing.
                  </p>
                  <p>
                    All kitchen and dispatch personnel must strictly wear official hairnets/caps and hygiene gear during operational hours.
                  </p>
                </div>
              </div>

              {/* Clause 7 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">7</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Standardized Menu Rigidity & Centrally Fixed Pricing
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    Authorized menu offerings, pure-veg recipe specifications, portion weights, and Maximum Retail Prices (MRP)
                    are determined centrally by brand management.
                  </p>
                  <p>
                    Franchisees are strictly prohibited from introducing unauthorized commercial items or modifying retail prices
                    without explicit written approval from head office.
                  </p>
                </div>
              </div>

              {/* Clause 8 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">8</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Master Trainer Deployment Scope & Extended Training
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    A master kitchen trainer will be deployed on-site for the <strong>1st week of store launch</strong> to train
                    cooks on standardized batter fermentation, heat control, packing, and dispatch protocols.
                  </p>
                  <p>
                    Extended trainer deployment beyond the initial launch week is available upon request at standard daily per-diem
                    rates and travel/lodging expenses.
                  </p>
                </div>
              </div>

              {/* Clause 9 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">9</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Operational Continuity & Dedicated Problem Resolution Support
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    Outlets must maintain consistent daily operational hours to service Swiggy, Zomato, and WhatsApp orders.
                    <strong> An outlet cannot be shut down without a valid documented reason and prior written notification to head office.</strong>
                  </p>
                  <p>
                    In case of equipment or logistics disruption, our dedicated technical support desk commits to rapid resolution.
                  </p>
                </div>
              </div>

              {/* Clause 10 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">10</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    5% Monthly Royalty & Cloud POS Reporting Compliance
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    The Franchisee agrees to remit a flat <strong>5% of gross/net monthly sales</strong> as brand royalty by the
                    5th of every calendar month.
                  </p>
                  <p>
                    Outlets must maintain integration with the franchisor's authorized cloud POS system to facilitate transparent
                    real-time sales reporting and inventory reconciliation.
                  </p>
                </div>
              </div>

              {/* Clause 11 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">11</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Intellectual Property Protection & 24-Month Non-Compete
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    All trademarks, brand logos, secret premix recipes, and operating manuals remain the exclusive intellectual property
                    of Mom's Cloud Kitchen.
                  </p>
                  <p>
                    Upon termination or non-renewal of the agreement, the franchisee agrees to a strict <strong>24-month non-compete covenant</strong>
                    prohibiting direct or indirect operation of similar cloud kitchens or South Indian delivery businesses within a 5-kilometer radius.
                  </p>
                </div>
              </div>

              {/* Clause 12 */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#28231E]/10 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#E87924]/15 text-[#E87924] flex items-center justify-center text-xs font-black">12</span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#174B35]">
                    Governing Law & Legal Jurisdiction
                  </h3>
                </div>
                <div className="pl-10 space-y-2 text-xs sm:text-sm">
                  <p>
                    This agreement is governed by the laws of India. Any disputes arising out of or in connection with the franchise
                    shall be subject to the exclusive jurisdiction of the competent courts in <strong>Vasai / Palghar / Mumbai, Maharashtra, India</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF WEBSITE USE */}
          {activeTab === 'terms-of-use' && (
            <div className="space-y-6">
              <div className="border-b border-[#28231E]/10 pb-4">
                <h3 className="font-display font-bold text-xl text-[#174B35]">
                  Terms of Website Use (www.momscloudkitchen.com)
                </h3>
                <p className="text-xs text-[#28231E]/60 mt-1">
                  Last Updated: 2026 · Official Terms for Online Visitors & Franchise Applicants
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">1. Acceptance of Terms</h4>
                  <p>
                    By browsing www.momscloudkitchen.com, submitting franchise inquiry forms, or contacting our team via WhatsApp,
                    you accept and agree to be bound by these Terms of Use and our Applicant Privacy Policy.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">2. Illustrative Financial Projections & No Guarantee</h4>
                  <p>
                    All unit economics models, daily order simulations (70–120 orders/day), and payback estimates (4–6 months)
                    displayed on this website are for simulation and illustrative planning only. Actual outlet performance depends
                    on location footfall, aggregator algorithms, local consumer demand, and operational diligence. The franchisor
                    makes no representation of guaranteed returns.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">3. Proprietary Media, Menus & Brand Assets</h4>
                  <p>
                    All brand logos, food photography, editorial layout, recipes, and digital materials on this website are the
                    protected intellectual property of Mom's Cloud Kitchen. Unauthorized reproduction, scraping, or commercial exploitation
                    without written consent is strictly prohibited.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">4. Application Submissions & Territory Allocation</h4>
                  <p>
                    Submitting an inquiry through this website or sending a WhatsApp message does not constitute an automatic grant
                    or binding territory reservation. Territory allocation is finalized solely upon due diligence approval, location validation,
                    and execution of the formal agreement with fee payment.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">5. Limitation of Liability</h4>
                  <p>
                    Mom's Cloud Kitchen and Founder Aditya Pushpa Kuttan shall not be held liable for any indirect, incidental, or consequential
                    damages resulting from website downtime, form submission interruptions, or third-party telecom delays.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPLICANT PRIVACY POLICY */}
          {activeTab === 'privacy-policy' && (
            <div className="space-y-6">
              <div className="border-b border-[#28231E]/10 pb-4">
                <h3 className="font-display font-bold text-xl text-[#174B35]">
                  Franchise Applicant Privacy Policy
                </h3>
                <p className="text-xs text-[#28231E]/60 mt-1">
                  How Mom's Cloud Kitchen collects, protects, and handles applicant data submitted via www.momscloudkitchen.com
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">1. Information We Collect</h4>
                  <p className="mb-2">When you submit a franchise inquiry or message us via WhatsApp, we collect:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#28231E]/80">
                    <li>Full Name, Mobile/WhatsApp Number, and Email Address.</li>
                    <li>Proposed City, Locality, or Target Region.</li>
                    <li>Franchise Model Preference and Optional Background Notes.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">2. Purpose of Data Processing</h4>
                  <p className="mb-2">Collected information is used exclusively to:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-[#28231E]/80">
                    <li>Evaluate territory availability and applicant suitability.</li>
                    <li>Share official franchise information kits and financial models.</li>
                    <li>Schedule discovery calls directly with Founder Aditya Pushpa Kuttan.</li>
                    <li>Maintain statutory records for franchise compliance.</li>
                  </ul>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">3. Strict No Third-Party Sale Policy</h4>
                  <p>
                    We maintain a strict anti-spam policy. <strong>We NEVER sell, rent, lease, or monetize your personal or financial
                    information to third-party telemarketers or advertisers.</strong> Your information is accessible solely by authorized
                    franchise expansion officers under strict confidentiality obligations.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#28231E]/10">
                  <h4 className="font-bold text-[#174B35] mb-1">4. Data Security & Direct WhatsApp Transparency</h4>
                  <p>
                    All form transmissions are protected via SSL/TLS encryption. Furthermore, our lead generation workflow enables
                    direct transparent communication over WhatsApp (+91 98924 47728) where you maintain complete control over your conversation history.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F6EBDD] border-t border-[#28231E]/10 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#28231E]/60 text-center sm:text-left">
            Headquarters: Vasai & Virar, Maharashtra · Official Hotline: +91 98924 47728
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="https://wa.me/919892447728?text=Hi%20Aditya!%20I%20have%20reviewed%20the%20Franchise%20Agreement%20Policies%20on%20www.momscloudkitchen.com%20and%20want%20to%20discuss%20next%20steps."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 bg-[#174B35] hover:bg-[#103626] text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <span>Discuss Policies on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-[#FFF8EC] text-[#28231E] font-semibold text-xs rounded-xl border border-[#28231E]/15 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
