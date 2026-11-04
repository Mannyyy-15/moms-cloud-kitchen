import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { BRAND_INFO } from '../data/brandData';

interface NavbarProps {
  onSelectFranchise?: (type: 'Single Franchisee' | 'Master Franchise') => void;
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
    { label: 'About the Brand', href: '#story' },
    { label: 'Franchise Opportunity', href: '#franchise-models' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Why Partner With Us', href: '#why-partner' },
    { label: 'Contact', href: '#contact' },
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
          ? 'bg-[#FFF8EC]/95 backdrop-blur-md shadow-sm border-b border-[#28231E]/8 py-3'
          : 'bg-gradient-to-b from-black/75 via-black/35 to-transparent py-4 sm:py-5'
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
          className="hidden xl:flex items-center gap-6 text-sm font-semibold tracking-wide"
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

        {/* Zone 3: 1 Primary Action (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${BRAND_INFO.phoneClean}`}
            className={`p-2.5 rounded-lg border transition-colors ${
              isScrolled
                ? 'border-[#28231E]/15 text-[#174B35] hover:bg-[#FFF8EC]'
                : 'border-white/30 text-white hover:bg-white/10'
            }`}
            title="Call Franchise Desk"
          >
            <Phone className="w-4 h-4" />
          </a>

          <a
            href="#franchise-enquiry"
            onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
            className="inline-flex items-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:bg-[#B95732] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E87924]"
          >
            <span>Explore Franchise Opportunity</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger & Fast CTA */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href="#franchise-enquiry"
            onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
            className="text-xs bg-[#E87924] text-white font-bold px-3 py-1.5 rounded-lg shadow-sm"
          >
            Enquire
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isScrolled ? 'text-[#28231E] hover:bg-[#F6EBDD]' : 'text-white hover:bg-white/10'
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
            className="bg-[#FFF8EC] border-b border-[#28231E]/10 p-6 shadow-2xl flex flex-col gap-4 animate-in slide-in-from-top duration-200 max-h-[calc(100vh-65px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-3 px-3 text-base font-bold text-[#28231E] hover:text-[#E87924] hover:bg-[#F6EBDD]/60 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#28231E]/10 flex flex-col gap-2.5">
              <a
                href="#franchise-enquiry"
                onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
                className="w-full text-center bg-[#E87924] text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <span>Explore Franchise Opportunity</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#25D366] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Founder: {BRAND_INFO.phone}</span>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="w-full text-center bg-[#174B35] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call Franchise Desk: {BRAND_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
