import React from 'react';
import { Phone, Mail, MessageSquare, ArrowUp, MapPin, ShieldCheck, Scale, FileText, ExternalLink } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/brandData';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onOpenLegal?: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#174B35] text-[#FFF8EC] border-t border-[#174B35]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-sm text-[#FFF8EC]/80 leading-relaxed max-w-sm mt-3">
              Founded by Aditya Pushpa Kuttan in February 2024, Mom's Cloud Kitchen prepares
              pure, hygienic, and comforting home-style Indian food that carries the authentic
              warmth of a mother's kitchen.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#E87924] font-semibold">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Proudly Rooted in Vasai & Virar, Maharashtra</span>
            </div>

            <div className="text-xs text-[#FFF8EC]/60 pt-1">
              Official Website: <strong className="text-white">www.momscloudkitchen.com</strong>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF8EC]/80">
              <li>
                <button
                  onClick={() => scrollTo('#hero')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#story')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  Our Story & Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#values')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  Mission & Values
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#food')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  Signature Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#franchise-models')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  Franchise Formats
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#why-partner')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  Why Partner
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Governance (From iranikoylashwarma.com framework) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#E87924]" />
              <span>Legal & Policies</span>
            </h4>
            <p className="text-xs text-[#FFF8EC]/70 leading-relaxed">
              Standardized franchise governance, compliance protocols, and applicant terms:
            </p>
            <ul className="space-y-2.5 text-sm text-[#FFF8EC]/85">
              <li>
                <button
                  onClick={() => onOpenLegal?.('franchise-terms')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E87924] shrink-0" />
                  <span>Franchise Agreement (12 Clauses)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal?.('terms-of-use')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <Scale className="w-3.5 h-3.5 text-[#E87924] shrink-0" />
                  <span>Terms of Website Use</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal?.('privacy-policy')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer flex items-center gap-2 text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E87924] shrink-0" />
                  <span>Applicant Privacy Policy</span>
                </button>
              </li>
            </ul>
            <div className="pt-2 text-[11px] text-[#FFF8EC]/60 border-t border-white/10 leading-snug">
              Governance incorporates 3-Warning Quality Audits, 5% Monthly Royalty, & Central Raw Material Sourcing.
            </div>
          </div>

          {/* Col 4: Direct Official Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Official Contact
            </h4>
            <div className="space-y-3 text-sm text-[#FFF8EC]/85">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#E87924] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E87924] shrink-0 group-hover:bg-[#E87924] group-hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#FFF8EC]/60 block font-medium">WhatsApp Direct</span>
                  <span className="font-semibold text-white">{BRAND_INFO.phone}</span>
                </div>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="flex items-center gap-3 hover:text-[#E87924] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E87924] shrink-0 group-hover:bg-[#E87924] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#FFF8EC]/60 block font-medium">Phone Support</span>
                  <span className="font-semibold text-white">{BRAND_INFO.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-3 hover:text-[#E87924] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#E87924] shrink-0 group-hover:bg-[#E87924] group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#FFF8EC]/60 block font-medium">Franchise Desk</span>
                  <span className="font-semibold text-white">{BRAND_INFO.email}</span>
                </div>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/919892447728?text=${encodeURIComponent(
                  "Hello Aditya, I want to apply for Mom's Cloud Kitchen franchise via www.momscloudkitchen.com"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-[#E87924] hover:bg-[#D16719] text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-md gap-1.5"
              >
                <span>Instant Franchise WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="my-8 p-4 rounded-xl bg-black/20 border border-white/10 text-[11px] text-[#FFF8EC]/70 leading-relaxed space-y-1.5">
          <p className="font-bold text-white uppercase tracking-wider text-[10px]">
            Franchise Notice & Regulatory Disclaimer
          </p>
          <p>
            Mom's Cloud Kitchen operations and franchise offerings are governed strictly under registered 5-year Franchise Agreements.
            All franchise units operate with centralized raw material specifications, mandatory 3-warning audit standards, and cloud POS reporting.
            Financial figures, margins (28–35%), and payback timelines (4–6 months) discussed on www.momscloudkitchen.com are operational benchmarks
            based on existing unit performances and are subject to location viability, delivery partner dynamics (Swiggy, Zomato), and franchisee adherence.
          </p>
        </div>

        {/* Bottom Strip */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8EC]/60">
          <p>
            © {new Date().getFullYear()} Mom's Cloud Kitchen (www.momscloudkitchen.com). All rights reserved.
            Founded by Aditya Pushpa Kuttan.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal?.('franchise-terms')}
              className="hover:text-white transition-colors cursor-pointer underline underline-offset-2"
            >
              Franchise Terms
            </button>
            <button
              onClick={() => onOpenLegal?.('privacy-policy')}
              className="hover:text-white transition-colors cursor-pointer underline underline-offset-2"
            >
              Privacy
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
