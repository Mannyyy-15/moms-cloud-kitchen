import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
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
    { label: 'Our Story', href: '#story' },
    { label: 'Our Food', href: '#food' },
    { label: 'Franchise', href: '#franchise' },
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
          : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E87924] rounded-lg shrink-0"
          aria-label="Mom's Cloud Kitchen Home"
        >
          <BrandLogo variant={isScrolled ? 'dark' : 'light'} size="md" />
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`whitespace-nowrap transition-colors duration-200 hover:text-[#E87924] ${
                isScrolled ? 'text-[#28231E]' : 'text-white/90 drop-shadow-sm'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a
            href="#franchise-enquiry"
            onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
            className="inline-flex items-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:bg-[#B95732] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E87924]"
          >
            <span>Explore Franchise</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#franchise-enquiry"
            onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
            className="text-xs bg-[#E87924] text-white font-semibold px-3 py-1.5 rounded-md shadow-sm"
          >
            Franchise
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
        <div className="lg:hidden fixed inset-0 top-[65px] bg-black/50 z-40 backdrop-blur-xs transition-opacity">
          <div
            className="bg-[#FFF8EC] border-b border-[#28231E]/10 p-6 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top duration-200 max-h-[calc(100vh-70px)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-3 px-3 text-base font-semibold text-[#28231E] hover:text-[#E87924] hover:bg-[#F6EBDD]/60 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#28231E]/10 flex flex-col gap-3">
              <a
                href="#franchise-enquiry"
                onClick={(e) => handleLinkClick(e, '#franchise-enquiry')}
                className="w-full text-center bg-[#E87924] text-white font-bold py-3.5 px-4 rounded-lg shadow-md flex items-center justify-center gap-2"
              >
                <span>Explore Franchise</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-[#174B35] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Quick WhatsApp: {BRAND_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
