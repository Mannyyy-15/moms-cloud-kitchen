import React from 'react';
import { Phone, Mail, MessageSquare, ArrowUp, MapPin, ShieldCheck, Scale, FileText, Instagram, Heart } from 'lucide-react';
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
    <footer id="contact" className="bg-[#1C120C] text-[#FFF9F2] border-t-2 border-[#E87924]/30 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-sm text-[#FFF9F2]/80 leading-relaxed max-w-sm mt-3">
              Founded by <strong className="text-white font-bold">Aditya Kuttan</strong> in February 2024, Mom&apos;s Cloud Kitchen prepares pure, hygienic, and comforting home-style Indian food under the brand promise: <em className="text-[#FFA858] font-serif-editorial not-italic">&ldquo;{BRAND_INFO.tagline}&rdquo;</em>.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#E87924] font-bold">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Proudly Rooted in Vasai &amp; Virar, Maharashtra</span>
            </div>

            <div className="text-xs text-[#FFF9F2]/60 pt-1">
              Official Website: <strong className="text-white">www.momscloudkitchen.com</strong>
            </div>

            {/* Social Link */}
            <div className="pt-2">
              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm hover:opacity-95 transition-opacity"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram: {BRAND_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-[#FFA858]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#FFF9F2]/80">
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
                  Founder Story (Aditya)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#women-empowerment')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-3 h-3 text-[#E87924]" />
                  <span>Women Empowerment</span>
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
                  onClick={() => scrollTo('#menu')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  Our Pure Veg Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#how-it-works')}
                  className="hover:text-[#E87924] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Governance */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-[#FFA858] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#E87924]" />
              <span>Legal &amp; Policies</span>
            </h4>
            <p className="text-xs text-[#FFF9F2]/70 leading-relaxed">
              Standardized franchise governance, compliance protocols, and applicant terms:
            </p>
            <ul className="space-y-2.5 text-sm text-[#FFF9F2]/85">
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
            <div className="pt-2 text-[11px] text-[#FFF9F2]/60 border-t border-white/10 leading-snug">
              Governance incorporates 5-Year Tenure, Flat 5% Monthly Royalty, &amp; Central Secret Raw Material Sourcing.
            </div>
          </div>

          {/* Col 4: Direct Official Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-black text-sm uppercase tracking-wider text-[#FFA858]">
              Official Contact
            </h4>
            <div className="space-y-3 text-sm text-[#FFF9F2]/85">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[#E87924] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#25D366] shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-[#FFF9F2]/60 block font-medium">WhatsApp Direct</span>
                  <span className="font-semibold text-white">{BRAND_INFO.phoneDisplay}</span>
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
                  <span className="text-[11px] text-[#FFF9F2]/60 block font-medium">Phone Support</span>
                  <span className="font-semibold text-white">{BRAND_INFO.phoneDisplay}</span>
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
                  <span className="text-[11px] text-[#FFF9F2]/60 block font-medium">Franchise Desk</span>
                  <span className="font-semibold text-white">{BRAND_INFO.email}</span>
                </div>
              </a>
            </div>

            <div className="pt-2">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-95 text-white font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Aditya on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F2]/60">
          <p>© {new Date().getFullYear()} Mom&apos;s Cloud Kitchen. All Rights Reserved. Made By Mom Loved By All.</p>
          <div className="flex items-center gap-4">
            <a href={BRAND_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram: {BRAND_INFO.instagramHandle}
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
