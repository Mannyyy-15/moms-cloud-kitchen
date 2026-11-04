import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';

export const StickyMobileBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling down 300px
      const formEl = document.querySelector('#franchise-enquiry');
      if (!formEl) {
        setIsVisible(window.scrollY > 300);
        return;
      }

      const rect = formEl.getBoundingClientRect();
      const isFormInView = rect.top < window.innerHeight && rect.bottom > 0;

      // Hide if user is already typing in the form or scrolled to top
      if (isFormInView || window.scrollY < 300) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const el = document.querySelector('#franchise-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Mobile Enquiry Bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#28231E]/10 p-3 shadow-[0_-8px_20px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Quick Call */}
        <a
          href={`tel:${BRAND_INFO.phoneClean}`}
          className="w-11 h-11 rounded-xl bg-[#FFF8EC] border border-[#28231E]/12 flex items-center justify-center text-[#174B35] shrink-0 active:scale-95 transition-transform"
          aria-label="Call Mom's Cloud Kitchen Founder"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Quick WhatsApp */}
        <a
          href={BRAND_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#128C7E] shrink-0 active:scale-95 transition-transform"
          aria-label="WhatsApp Mom's Cloud Kitchen Founder"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        {/* Primary CTA: Enquire Now */}
        <button
          onClick={scrollToForm}
          className="flex-grow py-3 px-4 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
        >
          <span>Enquire for Franchise</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
