import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_INFO } from '../data/brandData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 select-none">
      {/* Small floating tooltip prompt */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="relative bg-white text-[#28231E] px-4 py-2.5 rounded-2xl shadow-xl border border-[#28231E]/10 max-w-[240px] text-xs leading-snug flex items-start gap-2.5"
          >
            <div>
              <p className="font-bold text-[#174B35]">Franchise Queries?</p>
              <p className="text-[11px] text-[#28231E]/70 mt-0.5">
                Chat with Founder Aditya directly on WhatsApp.
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="p-1 text-[#28231E]/40 hover:text-[#28231E] rounded transition-colors cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {/* Little triangle arrow pointing down */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-[#28231E]/10 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Pill Button */}
      <motion.a
        href={`https://wa.me/919892447728?text=${encodeURIComponent(
          "Hello Aditya, I am viewing www.momscloudkitchen.com and would like to know more about the franchise opportunity."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm px-4 py-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 border-2 border-white cursor-pointer"
        aria-label="Chat on WhatsApp with Aditya Pushpa Kuttan"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Founder</span>
      </motion.a>
    </div>
  );
};

