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
    question: "What is the total investment required for a Mom's Cloud Kitchen franchise?",
    answer: "The Single Franchisee model starts with a one-time Franchise Fee of ₹3,99,000 (100% non-refundable). All-inclusive setup (kitchen equipment, initial packaging, POS, and branding drills) typically comes to ₹6,49,000. For multi-unit territorial exclusivity across an entire city or district, the Master Franchise fee is ₹12,50,000.",
    category: "Commercials"
  },
  {
    question: "Do I need a high-rent commercial showroom or dining space?",
    answer: "No. Mom's Cloud Kitchen operates strictly on a delivery-first cloud kitchen / dark kitchen model. You only need a lean 150 to 250 sq. ft. commercial space situated in a cost-effective location (such as a back alley, residential periphery, or upper floor) with water and electrical connections, keeping monthly overhead minimal.",
    category: "Kitchen Setup"
  },
  {
    question: "Do I need to hire an expensive Master Chef?",
    answer: "No. All core gravies, sambar seasonings, chutney bases, and dosa/idli batters utilize standardized proprietary premixes and central SOPs provided directly by Mom's Cloud Kitchen. Any kitchen associate can execute our 23 signature dishes with 100% consistency after our 7-day initial training program.",
    category: "Kitchen Operations"
  },
  {
    question: "What are the monthly royalty terms and renewal fees?",
    answer: "We charge a transparent, founder-friendly 5% monthly royalty on net kitchen sales, tracked directly via your cloud POS. Unlike traditional franchises that demand large renewal fees every year, our 5-year agreement renews seamlessly upon mutual operational compliance.",
    category: "Commercials"
  },
  {
    question: "How does the 3-Warning Audit Protocol work?",
    answer: "To preserve authentic food purity, quarterly audits assess kitchen hygiene, ingredient compliance, and packaging. In case of non-compliance: 1st Strike provides a 7-day cure period; 2nd Strike incurs a corrective penalty; 3rd Strike leads to formal agreement termination to protect the brand.",
    category: "Quality Governance"
  },
  {
    question: "How quickly can the cloud kitchen launch after signing?",
    answer: "From signing the Franchise Agreement and securing the location, turnkey kitchen setup, aggregator onboarding (Swiggy, Zomato, Magicpin), inventory supply, and staff drills are completed within 21 to 28 days.",
    category: "Launch & Timeline"
  },
  {
    question: "Can we serve 100% Pure Vegetarian and Shravan/Vrat customers?",
    answer: "Yes! All South Indian breakfast items, protein ragi specials, and Shravan fasting dishes (such as Farali Sabudana Khichdi with sendha namak) are 100% pure vegetarian, prepared without onion or garlic where specified, making our kitchen a high-trust daily staple.",
    category: "Food & Menu"
  },
  {
    question: "What support does Aditya Pushpa Kuttan and the brand team provide?",
    answer: "Franchisees receive end-to-end guidance from Founder Aditya Pushpa Kuttan: 1st-week on-site master trainer deployment, cloud POS configuration, aggregator menu listing & algorithm optimization, central ingredient logistics, and continuous operational advisory.",
    category: "Training & Support"
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F6EBDD] border-b border-[#28231E]/8 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E87924]">
              Common Queries & AEO Knowledgebase
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            Everything you need to know about partnering with Mom's Cloud Kitchen, from financials
            and kitchen setup to ingredient logistics and audit protocols.
          </p>
        </ScrollReveal>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#28231E]/10 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#174B35] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FFF8EC] border border-[#28231E]/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#174B35] text-white' : 'text-[#174B35]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#28231E]/80 leading-relaxed border-t border-[#28231E]/6">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-10 p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-[#28231E]/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display font-bold text-base text-[#174B35]">
              Have a specific question about your location?
            </h4>
            <p className="text-xs text-[#28231E]/70 mt-0.5">
              Chat directly with Founder Aditya Pushpa Kuttan on WhatsApp for immediate clarity.
            </p>
          </div>

          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#174B35] hover:bg-[#103626] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

