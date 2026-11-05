import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';
import { BRAND_INFO } from '../data/brandData';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: "What is the franchise fee and setup investment for Mom's Cloud Kitchen?",
    answer: "We offer two tailored formats: (1) Cloud Kitchen (Delivery Only): Franchise Fee is ₹4,00,000 with kitchen setup cost between ₹5,00,000 to ₹6,00,000 (200–250 sq.ft.). (2) Cloud Kitchen + Dine-In Restaurant: Franchise Fee is ₹6,00,000 with setup cost between ₹7,00,000 to ₹8,00,000 (300–350 sq.ft.). For territory exclusivity, City Master Franchise rights are ₹20 Lakhs (Cloud Kitchen) and ₹25 Lakhs (Cloud + Dine-In). All models have a 5-year tenure with flat 5% monthly royalty on net sales.",
    category: "Commercials"
  },
  {
    question: "What space and location is required for each franchise format?",
    answer: "For a delivery-only Cloud Kitchen, only 200 to 250 sq. ft. is required in a low-rent back alley, residential periphery, or upper floor with 5KW power and drainage. For Cloud Kitchen + Dine-In Restaurant, 300 to 350 sq. ft. on a high-footfall ground floor is ideal for counter dining and walk-in takeaway.",
    category: "Space & Setup"
  },
  {
    question: "What is the expected ROI and payback timeline?",
    answer: "Franchisees achieve operational break-even within 30 to 45 days and an expected full capital ROI in 6 to 8 months, driven by healthy 28% to 35% net profit margins, lean overhead, and high repeat order frequency.",
    category: "Unit Economics"
  },
  {
    question: "Do I need culinary experience or an expensive Master Chef?",
    answer: "No culinary experience is required. All core dry spice premixes, sambar seasonings, chutney bases, and batter ratios are supplied standardized by Mom's Cloud Kitchen. Any kitchen assistant can prepare the entire 23-dish menu consistently with zero chef dependency after our 7-day initial training drills.",
    category: "Operations"
  },
  {
    question: "What is the Women Empowerment Initiative at Mom's Cloud Kitchen?",
    answer: "We believe cooking is not just a chore—it is strength, identity, and independence. Our initiative provides women dignified employment, fair wages, food safety certification, and commercial kitchen leadership coaching, allowing them to support their families with pride while infusing every meal with authentic maternal love.",
    category: "Social Mission"
  },
  {
    question: "What are the royalty terms and agreement duration?",
    answer: "We charge a transparent, founder-friendly flat 5% monthly royalty on net sales reported via cloud POS. The franchise agreement has a full 5-year tenure with zero surprise annual renewal penalties upon mutual operational compliance.",
    category: "Commercials"
  },
  {
    question: "Can we serve 100% Pure Vegetarian and fasting (Upvas) customers?",
    answer: "Yes, 100%! The entire menu is strictly pure vegetarian. We have dedicated satvik preparation for Shravan & Upvas fasting items (like Farali Sabudana Khichdi with sendha namak) and even Korean Kimchi Ramen is made 100% pure veg with zero egg and zero meat.",
    category: "Food & Menu"
  },
  {
    question: "What support does Founder Aditya Kuttan provide to new partners?",
    answer: "Partners receive direct guidance from Founder Aditya Kuttan (20+ years hospitality leadership veteran): site viability audit, turnkey equipment sourcing, Swiggy/Zomato/Magicpin merchant onboarding & algorithm optimization, on-site master trainer drills, and continuous operational support.",
    category: "Support"
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-22 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E87924]">
              Clear &amp; Transparent Answers
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#28231E] tracking-tight leading-[1.12] mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="text-sm sm:text-base text-[#28231E]/80 leading-relaxed">
            Everything you need to know about opening your Mom&apos;s Cloud Kitchen or Dine-In franchise.
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-[#E87924]/20 overflow-hidden transition-all duration-200 shadow-xs hover:border-[#E87924]/60"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:bg-[#FFF3E3]/40"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF3E3] text-[#E87924] flex items-center justify-center shrink-0 font-bold text-xs">
                      Q{index + 1}
                    </div>
                    <span className="font-display font-bold text-base sm:text-lg text-[#28231E] leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#E87924] text-white' : 'bg-[#FFF3E3] text-[#E87924]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#28231E]/80 leading-relaxed border-t border-[#E87924]/10 pl-16">
                        <p>{item.answer}</p>
                        <span className="inline-block mt-3 text-[10px] font-black uppercase tracking-wider text-[#E87924] bg-[#FFF3E3] px-2.5 py-0.5 rounded-full border border-[#E87924]/20">
                          {item.category}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Closing Quick Help */}
        <div className="mt-10 text-center p-6 bg-white rounded-2xl border border-[#E87924]/20 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-display font-bold text-base text-[#28231E] block">
              Have specific questions about your city territory?
            </span>
            <p className="text-xs text-[#28231E]/70 mt-0.5">
              Discuss directly with Founder Aditya Kuttan ({BRAND_INFO.phoneDisplay}).
            </p>
          </div>

          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
