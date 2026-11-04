import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_CATEGORIES, BRAND_INFO } from '../data/brandData';
import { ScrollReveal } from './ScrollReveal';

export const FoodShowcase: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(MENU_CATEGORIES[0].id);

  const activeCategory =
    MENU_CATEGORIES.find((cat) => cat.id === activeCategoryId) || MENU_CATEGORIES[0];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="food" className="py-16 sm:py-24 lg:py-32 bg-[#F6EBDD] border-b border-[#28231E]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <ScrollReveal direction="up" className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E87924]">
                Our Food Identity
              </span>
              <span className="h-px w-8 bg-[#E87924]" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#174B35] tracking-tight leading-[1.12]">
              MADE WITH LOVE. <br className="hidden sm:inline" />
              SERVED WITH CARE.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#28231E]/80 leading-relaxed text-pretty">
              Explore the authentic flavours and comforting meals that represent Mom&apos;s Cloud Kitchen.
              Curated recipes designed for daily home consumption, high delivery margins, and sustainable kitchen operations.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <button
              onClick={() => scrollTo('#franchise-enquiry')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold text-[#E87924] hover:text-[#D16719] bg-white px-5 py-3 rounded-xl border border-[#28231E]/10 shadow-sm transition-all hover:shadow cursor-pointer"
            >
              <span>Explore Franchise Menu Rights</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* Category Navigation Pills with smooth layoutId animation */}
        <div className="relative mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-1 -mx-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory">
            {MENU_CATEGORIES.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 snap-start select-none ${
                    isActive
                      ? 'text-[#FFF8EC] shadow-md'
                      : 'text-[#28231E]/80 bg-white/90 hover:bg-white hover:text-[#174B35] border border-[#28231E]/12'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#174B35] rounded-full -z-10 shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Context Banner */}
        <div className="mb-8 p-4 sm:p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-[#28231E]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#174B35]">
              {activeCategory.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#28231E]/75 mt-0.5">
              {activeCategory.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87924] bg-[#E87924]/10 px-3 py-1 rounded-full">
              {activeCategory.items.length} Signature Dishes
            </span>
          </div>
        </div>

        {/* Responsive Grid with AnimatePresence & Staggered Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {activeCategory.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#28231E]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Dish Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#28231E]/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/dish_plain_dosa.jpeg';
                      }}
                    />

                    {/* Pure Veg Emblem & Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <div
                        className="w-5 h-5 bg-white/95 backdrop-blur-xs border border-green-600 rounded flex items-center justify-center p-0.5 shadow-sm"
                        title="100% Pure Vegetarian"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                      </div>
                      {item.tag && (
                        <span className="bg-[#174B35]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* Price Tag Pill */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#174B35] font-display font-black text-base px-3.5 py-1 rounded-xl shadow-md tabular-nums border border-[#174B35]/15">
                      {item.price}
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-5 sm:p-6">
                    <h4 className="font-display font-bold text-lg sm:text-xl text-[#174B35] group-hover:text-[#E87924] transition-colors leading-tight mb-2">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#28231E]/75 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Action & Highlights */}
                <div className="px-5 sm:px-6 py-3.5 bg-[#FFF8EC]/70 border-t border-[#28231E]/8 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-[#174B35]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E87924]" />
                    Home-Style Recipe
                  </span>

                  <a
                    href={`https://wa.me/919892447728?text=${encodeURIComponent(
                      `Hello Aditya, I want to enquire about "${item.name}" from Mom's Cloud Kitchen.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#E87924] hover:text-[#D16719] transition-colors"
                  >
                    <span>WhatsApp</span>
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Editorial Note for Franchisees */}
        <div className="mt-12 text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#28231E]/8 max-w-2xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-[#28231E]/80 leading-relaxed">
            <strong className="text-[#174B35] font-bold">Standardized SOPs:</strong> All 23 signature dishes use pre-measured spice mixes and streamlined kitchen prep methods to guarantee zero chef dependency and rapid 8–12 minute order dispatch.
          </p>
        </div>
      </div>
    </section>
  );
};
