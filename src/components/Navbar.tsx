import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare, Instagram, ShieldCheck, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/brandData';
import { FranchiseType } from '../types';

interface NavbarProps {
  onSelectFranchise?: (type: FranchiseType) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Founder Story', href: '#story' },
    { label: 'Women Empowerment', href: '#women-empowerment' },
    { label: 'Franchise Models', href: '#franchise-models' },
    { label: 'Signature Menu', href: '#food' },
    { label: 'Unit Economics', href: '#roi-calculator' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 transition-all duration-300 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-300 pointer-events-auto ${
          isScrolled
            ? 'bg-[#FFF9F2]/95 backdrop-blur-xl border border-[#E87924]/20 shadow-xl shadow-black/5 py-2.5 px-4 sm:px-6'
            : 'bg-[#1E0F08]/80 backdrop-blur-xl border border-white/20 shadow-2xl py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* 1. Left: Brand Logo & Pure Veg Pill */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, '#hero')}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E87924] rounded-lg shrink-0 select-none"
              aria-label="Mom's Cloud Kitchen Home"
            >
              <BrandLogo variant={isScrolled ? 'dark' : 'light'} size="sm" />
            </a>

            {/* Official FSSAI-style Pure Veg Mark */}
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase border transition-colors ${
                isScrolled
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-600/30'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 backdrop-blur-md shadow-sm'
              }`}
              title="100% Pure Vegetarian Kitchen · Zero Egg · Zero Meat"
            >
              <span className="w-3.5 h-3.5 border-2 border-emerald-500 p-[2px] flex items-center justify-center rounded-xs shrink-0">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              </span>
              <span className="hidden xs:inline">100% Pure Veg</span>
              <span className="xs:hidden">Pure Veg</span>
            </div>
          </div>

          {/* 2. Center: Desktop Navigation Links (Unified for lg & up >= 1024px) */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs xl:text-sm font-extrabold tracking-wide"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`whitespace-nowrap transition-colors duration-200 hover:text-[#E87924] relative py-1 ${
                  isScrolled ? 'text-[#28231E]' : 'text-white/90 drop-shadow-xs'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. Right: Desktop Actions (lg & up >= 1024px) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Instagram */}
            <a
              href={BRAND_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border transition-all duration-200 ${
                isScrolled
                  ? 'border-[#E87924]/20 text-[#E87924] hover:bg-[#FFF3E3]'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
              title="Instagram: @moms.cloud.kitchen.mumbai"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${BRAND_INFO.phoneClean}`}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 text-xs font-bold ${
                isScrolled
                  ? 'border-[#E87924]/20 text-[#28231E] hover:bg-[#FFF3E3]'
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
              title={`Call Franchise Desk: ${BRAND_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#E87924]" />
              <span className="hidden xl:inline">{BRAND_INFO.phone}</span>
            </a>

            {/* Primary High-Converting CTA */}
            <a
              href="#franchise-enquiry"
              onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
              className="inline-flex items-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E87924]"
            >
              <span>Explore Franchise</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4. Mobile / Tablet Fast Actions (< 1024px) */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick Phone Call Pill */}
            <a
              href={`tel:${BRAND_INFO.phoneClean}`}
              className={`p-2 rounded-xl border transition-all ${
                isScrolled
                  ? 'border-[#E87924]/20 text-[#E87924] bg-white'
                  : 'border-white/20 text-white bg-black/30'
              }`}
              aria-label="Call Franchise Desk"
              title="Call Franchise Desk"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Quick Enquire Button */}
            <a
              href="#franchise-enquiry"
              onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
              className="inline-flex items-center gap-1.5 bg-[#E87924] hover:bg-[#D16719] active:scale-95 text-white font-black text-xs uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-sm"
            >
              <span>Enquire</span>
            </a>

            {/* Accessible Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                isScrolled
                  ? 'text-[#28231E] hover:bg-[#FFF3E3] border border-[#E87924]/20'
                  : 'text-white hover:bg-white/10 border border-white/20'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#E87924]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile & Tablet Modern Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-md transition-all duration-300 pointer-events-auto"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed top-3 right-3 left-3 max-w-lg mx-auto bg-[#FFF9F2] border border-[#E87924]/25 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E87924]/15">
              <BrandLogo variant="dark" size="sm" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-[#FFF3E3] text-[#28231E] hover:text-[#E87924] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pure Veg Banner in Drawer */}
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-600/20 rounded-xl px-3.5 py-2">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-emerald-600 p-[2px] flex items-center justify-center rounded-xs shrink-0">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                </span>
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                  100% Pure Vegetarian Kitchen
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Zero Egg · Zero Meat
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-1 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-3 px-3.5 text-sm font-extrabold text-[#28231E] hover:text-[#E87924] hover:bg-[#FFF3E3] rounded-xl transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#E87924]/50" />
                </a>
              ))}
            </div>

            {/* Drawer Action CTAs */}
            <div className="pt-3 border-t border-[#E87924]/15 flex flex-col gap-2.5">
              <a
                href="#franchise-enquiry"
                onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
                className="w-full text-center bg-[#E87924] hover:bg-[#D16719] text-white font-black uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all"
              >
                <span>Explore Franchise Opportunity</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Founder: {BRAND_INFO.phone}</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${BRAND_INFO.phoneClean}`}
                  className="text-center bg-white hover:bg-[#FFF3E3] text-[#28231E] border border-[#E87924]/25 font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E87924]" />
                  <span>Call Desk</span>
                </a>

                <a
                  href={BRAND_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-xs transition-all"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
