import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare, Instagram } from 'lucide-react';
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
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Founder Story', href: '#story' },
    { label: 'Women Empowerment', href: '#women-empowerment' },
    { label: 'Franchise Formats', href: '#franchise-models' },
    { label: 'Our Menu', href: '#menu' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Contact', href: '#franchise-enquiry' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFF9F2]/95 backdrop-blur-md shadow-sm border-b border-[#E87924]/15 py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E87924] rounded-lg shrink-0 select-none"
          aria-label="Mom's Cloud Kitchen Home"
        >
          <BrandLogo variant={isScrolled ? 'dark' : 'light'} size="md" />
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          className="hidden xl:flex items-center gap-5 text-sm font-bold tracking-wide"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`whitespace-nowrap transition-colors duration-200 hover:text-[#E87924] ${
                isScrolled ? 'text-[#28231E]' : 'text-white/95 drop-shadow-sm'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Instagram Link */}
          <a
            href={BRAND_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 rounded-xl border transition-all ${
              isScrolled
                ? 'border-[#E87924]/20 text-[#E87924] hover:bg-[#FFF3E3]'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            title="Follow us on Instagram: @moms.cloud.kitchen.mumbai"
          >
            <Instagram className="w-4 h-4" />
          </a>

          {/* Direct Phone Call */}
          <a
            href={`tel:${BRAND_INFO.phoneClean}`}
            className={`p-2.5 rounded-xl border transition-all ${
              isScrolled
                ? 'border-[#E87924]/20 text-[#28231E] hover:bg-[#FFF3E3]'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            title={`Call Franchise Desk: ${BRAND_INFO.phone}`}
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Primary CTA */}
          <a
            href="#franchise-enquiry"
            onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
            className="inline-flex items-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E87924]"
          >
            <span>Explore Franchise</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger & Fast CTA */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href={BRAND_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg ${isScrolled ? 'text-[#E87924]' : 'text-white'}`}
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>

          <a
            href="#franchise-enquiry"
            onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
            className="text-xs bg-[#E87924] text-white font-extrabold uppercase px-3 py-1.5 rounded-lg shadow-sm"
          >
            Enquire
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isScrolled ? 'text-[#28231E] hover:bg-[#FFF3E3]' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 top-[60px] bg-black/60 z-40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#FFF9F2] border-b border-[#E87924]/20 p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top duration-200 max-h-[calc(100vh-65px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-3 px-3 text-base font-bold text-[#28231E] hover:text-[#E87924] hover:bg-[#FFF3E3] rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E87924]/20 flex flex-col gap-2.5">
              <a
                href="#franchise-enquiry"
                onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
                className="w-full text-center bg-[#E87924] text-white font-black uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <span>Explore Franchise Opportunity</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Founder: {BRAND_INFO.phone}</span>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="w-full text-center bg-white text-[#28231E] border border-[#E87924]/30 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#E87924]" />
                <span>Call Franchise Desk: {BRAND_INFO.phone}</span>
              </a>

              <a
                href={BRAND_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow {BRAND_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
