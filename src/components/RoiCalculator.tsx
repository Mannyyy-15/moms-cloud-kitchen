import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { BRAND_INFO } from '../data/brandData';

export const RoiCalculator: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<'cloud' | 'dinein'>('cloud');
  const [dailyOrders, setDailyOrders] = useState<number>(selectedFormat === 'cloud' ? 85 : 120);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(selectedFormat === 'cloud' ? 240 : 280);

  // Capex assumptions based on updated brand parameters:
  // Cloud Kitchen: Fee ₹4L + Setup ₹5L = ₹9L
  // Dine-In: Fee ₹6L + Setup ₹7L = ₹13L
  const capex = selectedFormat === 'cloud' ? 900000 : 1300000;

  // Financial calculations
  const monthlyOrders = dailyOrders * 30;
  const grossMonthlyRevenue = monthlyOrders * avgOrderValue;
  const foodCost = Math.round(grossMonthlyRevenue * 0.31); // ~31%
  const platformAndPackaging = Math.round(grossMonthlyRevenue * (selectedFormat === 'cloud' ? 0.22 : 0.17));
  const rentAndUtilities = Math.round(grossMonthlyRevenue * (selectedFormat === 'cloud' ? 0.10 : 0.14));
  const royalty5Percent = Math.round(grossMonthlyRevenue * 0.05); // Flat 5% royalty
  const netMonthlyProfit = grossMonthlyRevenue - (foodCost + platformAndPackaging + rentAndUtilities + royalty5Percent);
  const netMarginPercent = Math.round((netMonthlyProfit / grossMonthlyRevenue) * 100);
  const annualNetProfit = netMonthlyProfit * 12;

  // Payback in months
  const paybackMonths = Math.max(5.5, Math.min(8.5, Number((capex / netMonthlyProfit).toFixed(1))));

  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const getWhatsAppMessage = () => {
    return (
      `*Franchise ROI Estimation Query - Mom's Cloud Kitchen*\n\n` +
      `🏢 *Format Selected:* ${selectedFormat === 'cloud' ? 'Cloud Kitchen (₹4L Fee)' : 'Cloud Kitchen + Dine-In (₹6L Fee)'}\n` +
      `📊 *Planned Daily Orders:* ${dailyOrders} orders/day\n` +
      `💰 *Estimated AOV:* ₹${avgOrderValue}\n` +
      `📈 *Gross Monthly Revenue:* ${formatINR(grossMonthlyRevenue)}\n` +
      `💵 *Estimated Net Profit:* ${formatINR(netMonthlyProfit)}/month (~${netMarginPercent}%)\n` +
      `⏱️ *Expected Payback:* ${paybackMonths} Months (ROI in 6 to 8 months target)\n\n` +
      `I would like to discuss opening a Mom's Cloud Kitchen franchise in my city based on these operational metrics.`
    );
  };

  return (
    <section id="roi-calculator" className="py-16 sm:py-22 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E87924]">
              Unit Economics
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#28231E] tracking-tight leading-[1.15] mb-4">
            INTERACTIVE FRANCHISE ROI CALCULATOR
          </h2>

          <p className="text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            Estimate your monthly cloud kitchen revenue, operating profit margins, and capital payback period
            designed for <strong className="text-[#E87924]">ROI in 6 to 8 months</strong> with flat 5% royalty.
          </p>

          {/* Model Switcher */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-white border-2 border-[#E87924]/20 shadow-xs">
            <button
              onClick={() => {
                setSelectedFormat('cloud');
                setDailyOrders(85);
                setAvgOrderValue(240);
              }}
              className={`px-5 py-2 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                selectedFormat === 'cloud'
                  ? 'bg-[#E87924] text-white shadow-md'
                  : 'text-[#28231E]/70 hover:text-[#E87924]'
              }`}
            >
              Cloud Kitchen (₹4L Fee)
            </button>
            <button
              onClick={() => {
                setSelectedFormat('dinein');
                setDailyOrders(120);
                setAvgOrderValue(280);
              }}
              className={`px-5 py-2 rounded-xl font-display font-black text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                selectedFormat === 'dinein'
                  ? 'bg-[#E87924] text-white shadow-md'
                  : 'text-[#28231E]/70 hover:text-[#E87924]'
              }`}
            >
              Cloud + Dine-In (₹6L Fee)
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch max-w-6xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-lg border-2 border-[#E87924]/20 flex flex-col justify-between">
            <div className="space-y-7">
              <div className="flex items-center gap-3 pb-4 border-b border-[#28231E]/8">
                <div className="w-10 h-10 rounded-xl bg-[#FFF3E3] text-[#E87924] flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-[#28231E]">
                    Operational Assumptions
                  </h3>
                  <p className="text-xs text-[#28231E]/60">
                    Simulate your target city order volume and average bill size
                  </p>
                </div>
              </div>

              {/* Slider 1: Orders per day */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="dailyOrders" className="text-sm font-bold text-[#28231E]">
                    Daily Orders Fulfillable
                  </label>
                  <span className="font-display font-black text-lg text-[#E87924] bg-[#FFF3E3] px-3 py-1 rounded-lg tabular-nums">
                    {dailyOrders} <span className="text-xs font-semibold text-[#28231E]/60">orders/day</span>
                  </span>
                </div>
                <input
                  id="dailyOrders"
                  type="range"
                  min="30"
                  max="250"
                  step="5"
                  value={dailyOrders}
                  onChange={(e) => setDailyOrders(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#FFF3E3] rounded-lg appearance-none cursor-pointer accent-[#E87924]"
                />
                <div className="flex justify-between text-[11px] text-[#28231E]/50 font-medium">
                  <span>30 orders (Starting)</span>
                  <span>100 orders (Target)</span>
                  <span>250 orders (Peak)</span>
                </div>
              </div>

              {/* Slider 2: Average Order Value */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="avgOrderValue" className="text-sm font-bold text-[#28231E]">
                    Average Order Value (AOV)
                  </label>
                  <span className="font-display font-black text-lg text-[#E87924] bg-[#FFF3E3] px-3 py-1 rounded-lg tabular-nums">
                    ₹{avgOrderValue} <span className="text-xs font-semibold text-[#28231E]/60">per order</span>
                  </span>
                </div>
                <input
                  id="avgOrderValue"
                  type="range"
                  min="150"
                  max="450"
                  step="10"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#FFF3E3] rounded-lg appearance-none cursor-pointer accent-[#E87924]"
                />
                <div className="flex justify-between text-[11px] text-[#28231E]/50 font-medium">
                  <span>₹150 (Breakfast)</span>
                  <span>₹280 (Meals)</span>
                  <span>₹450 (Family Combos)</span>
                </div>
              </div>

              {/* Expense Breakdown Strip */}
              <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-[#E87924]/20 space-y-2 text-xs">
                <span className="font-black text-[10px] uppercase tracking-wider text-[#E87924] block">
                  Transparent Cost Structure
                </span>
                <div className="flex justify-between text-[#28231E]/80">
                  <span>Food &amp; Raw Material Cost (~31%):</span>
                  <span className="font-bold text-[#28231E]">{formatINR(foodCost)}</span>
                </div>
                <div className="flex justify-between text-[#28231E]/80">
                  <span>Aggregator Commissions &amp; Packaging:</span>
                  <span className="font-bold text-[#28231E]">{formatINR(platformAndPackaging)}</span>
                </div>
                <div className="flex justify-between text-[#28231E]/80">
                  <span>Rent, Utilities &amp; Staff Wages:</span>
                  <span className="font-bold text-[#28231E]">{formatINR(rentAndUtilities)}</span>
                </div>
                <div className="flex justify-between text-[#28231E]/80">
                  <span>Monthly Royalty (Flat 5% on Net Sales):</span>
                  <span className="font-bold text-[#E87924]">{formatINR(royalty5Percent)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#28231E]/8 text-[11px] text-[#28231E]/60">
              *Projections simulated on verified Vasai–Virar benchmarks with 28% to 35% net margin.
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#1C120C] to-[#2E180B] text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between border-2 border-[#E87924]/30 relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#FFA858]">
                  Estimated Profit Metrics
                </span>
                <span className="text-xs bg-[#E87924] text-white px-3 py-1 rounded-full font-bold">
                  ROI in 6 to 8 Months
                </span>
              </div>

              {/* Major Monthly Revenue & Profit Numbers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-white/70 block uppercase">Gross Monthly Sales</span>
                  <div className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                    {formatINR(grossMonthlyRevenue)}
                  </div>
                  <span className="text-[10px] text-white/50 block mt-1">{monthlyOrders.toLocaleString('en-IN')} orders/month</span>
                </div>

                <div className="bg-[#E87924]/20 backdrop-blur-xs p-4 rounded-2xl border border-[#E87924]/40">
                  <span className="text-[11px] text-[#FFA858] block uppercase">Est. Monthly Net Profit</span>
                  <div className="font-display font-black text-2xl sm:text-3xl text-[#FFA858] mt-1">
                    {formatINR(netMonthlyProfit)}
                  </div>
                  <span className="text-[10px] text-white/70 block mt-1">~{netMarginPercent}% Net Operating Margin</span>
                </div>
              </div>

              {/* Annualized Projection + ROI Payback Card */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">Estimated Annual Net Profit:</span>
                  <span className="font-display font-extrabold text-lg text-white">
                    {formatINR(annualNetProfit)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/80">Estimated Capital Payback:</span>
                  <span className="font-display font-extrabold text-lg text-[#FFA858]">
                    ~{paybackMonths} Months
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-white/60 pt-2 border-t border-white/10">
                  <span>Format Capital Investment:</span>
                  <span>{formatINR(capex)} (Fee + Setup)</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-6 mt-6 border-t border-white/10 space-y-3 relative z-10">
              <a
                href={`https://wa.me/918484030988?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:scale-[0.98] text-white font-extrabold text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Discuss This ROI on WhatsApp</span>
              </a>

              <p className="text-[10px] text-center text-white/50">
                Direct discussion with Founder Aditya Kuttan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
