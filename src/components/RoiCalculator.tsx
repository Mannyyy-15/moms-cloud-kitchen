import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { BRAND_INFO } from '../data/brandData';

export const RoiCalculator: React.FC = () => {
  const [dailyOrders, setDailyOrders] = useState<number>(85);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(240);

  // Financial calculations
  const monthlyOrders = dailyOrders * 30;
  const grossMonthlyRevenue = monthlyOrders * avgOrderValue;
  const foodCost = Math.round(grossMonthlyRevenue * 0.31); // ~31%
  const platformAndPackaging = Math.round(grossMonthlyRevenue * 0.23); // ~23%
  const rentAndUtilities = Math.round(grossMonthlyRevenue * 0.11); // ~11%
  const royalty5Percent = Math.round(grossMonthlyRevenue * 0.05); // 5% royalty
  const netMonthlyProfit = grossMonthlyRevenue - (foodCost + platformAndPackaging + rentAndUtilities + royalty5Percent);
  const netMarginPercent = Math.round((netMonthlyProfit / grossMonthlyRevenue) * 100);
  const annualNetProfit = netMonthlyProfit * 12;

  // Payback estimation based on Single Franchisee ₹3,99,000 + approx setup (~₹6,00,000)
  const totalCapexEstimate = 600000;
  const paybackMonths = (totalCapexEstimate / netMonthlyProfit).toFixed(1);

  const formatINR = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const getWhatsAppMessage = () => {
    return (
      `*Franchise ROI Estimation Query - Mom's Cloud Kitchen*\n\n` +
      `📊 *Planned Daily Orders:* ${dailyOrders} orders/day\n` +
      `💰 *Estimated AOV:* ₹${avgOrderValue}\n` +
      `📈 *Gross Monthly Revenue:* ${formatINR(grossMonthlyRevenue)}\n` +
      `💵 *Estimated Net Profit:* ${formatINR(netMonthlyProfit)}/month (~${netMarginPercent}%)\n\n` +
      `I would like to discuss opening a Mom's Cloud Kitchen franchise in my city based on these operational metrics.`
    );
  };

  return (
    <section id="roi-calculator" className="py-20 lg:py-28 bg-[#FFF8EC] border-b border-[#28231E]/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#E87924]">
              Unit Economics
            </span>
            <span className="h-px w-8 bg-[#E87924]" />
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4">
            INTERACTIVE FRANCHISE ROI CALCULATOR
          </h2>

          <p className="text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
            Estimate your monthly cloud kitchen revenue, operating margins, and capital payback period
            based on real aggregator metrics and our lean 150–250 sq. ft. kitchen model.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#28231E]/10 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="flex items-center gap-3 pb-4 border-b border-[#28231E]/8">
                <div className="w-10 h-10 rounded-xl bg-[#E87924]/10 text-[#E87924] flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#174B35]">
                    Operational Assumptions
                  </h3>
                  <p className="text-xs text-[#28231E]/60">
                    Adjust the sliders to simulate your target city performance
                  </p>
                </div>
              </div>

              {/* Slider 1: Orders per day */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="dailyOrders" className="text-sm font-bold text-[#28231E]">
                    Expected Orders / Day
                  </label>
                  <span className="font-display font-extrabold text-xl text-[#174B35] bg-[#174B35]/8 px-3 py-1 rounded-lg tabular-nums">
                    {dailyOrders} <span className="text-xs font-semibold text-[#28231E]/60">orders</span>
                  </span>
                </div>
                <input
                  id="dailyOrders"
                  type="range"
                  min="30"
                  max="200"
                  step="5"
                  value={dailyOrders}
                  onChange={(e) => setDailyOrders(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#F6EBDD] rounded-lg appearance-none cursor-pointer accent-[#E87924]"
                />
                <div className="flex justify-between text-[11px] text-[#28231E]/50 font-medium">
                  <span>30 orders (Conservative)</span>
                  <span>100 orders (Target)</span>
                  <span>200 orders (Peak)</span>
                </div>
              </div>

              {/* Slider 2: Average Order Value */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label htmlFor="avgOrderValue" className="text-sm font-bold text-[#28231E]">
                    Average Order Value (AOV)
                  </label>
                  <span className="font-display font-extrabold text-xl text-[#E87924] bg-[#E87924]/10 px-3 py-1 rounded-lg tabular-nums">
                    ₹{avgOrderValue}
                  </span>
                </div>
                <input
                  id="avgOrderValue"
                  type="range"
                  min="160"
                  max="380"
                  step="10"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#F6EBDD] rounded-lg appearance-none cursor-pointer accent-[#E87924]"
                />
                <div className="flex justify-between text-[11px] text-[#28231E]/50 font-medium">
                  <span>₹160 (Breakfast Only)</span>
                  <span>₹240 (Combos & Meals)</span>
                  <span>₹380 (Family Pack)</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="p-4 bg-[#FFF8EC] rounded-2xl border border-[#28231E]/8 space-y-2.5 text-xs text-[#28231E]/80">
                <div className="flex justify-between py-1 border-b border-[#28231E]/6">
                  <span>Raw Material & Central Sourcing (~31%)</span>
                  <span className="font-semibold">{formatINR(foodCost)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#28231E]/6">
                  <span>Delivery Aggregator Commission & Packing (~23%)</span>
                  <span className="font-semibold">{formatINR(platformAndPackaging)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#28231E]/6">
                  <span>Kitchen Overhead, Utilities & Rent (~11%)</span>
                  <span className="font-semibold">{formatINR(rentAndUtilities)}</span>
                </div>
                <div className="flex justify-between py-1 font-semibold text-[#174B35]">
                  <span>Monthly Brand Royalty (5%)</span>
                  <span>{formatINR(royalty5Percent)}</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#28231E]/50 mt-4 italic">
              *Projections are illustrative based on current dark kitchen operational averages. Local figures may vary by city & delivery zone.
            </p>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#174B35] to-[#0E3223] text-white rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between border-2 border-[#174B35]">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#E87924]" />
                  <span className="text-xs uppercase font-bold tracking-widest text-[#E87924]">
                    Estimated Returns
                  </span>
                </div>
                <span className="text-xs bg-white/15 px-3 py-1 rounded-full font-bold">
                  {monthlyOrders.toLocaleString('en-IN')} Orders / Mo
                </span>
              </div>

              {/* Gross Revenue */}
              <div className="mb-6">
                <span className="text-xs text-[#FFF8EC]/70 uppercase tracking-wider block mb-1">
                  Gross Monthly Turnover
                </span>
                <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight tabular-nums">
                  {formatINR(grossMonthlyRevenue)}
                </div>
              </div>

              {/* Big Net Profit Card */}
              <div className="p-5 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#FFF8EC]/85">
                    Estimated Net Monthly Profit
                  </span>
                  <span className="text-xs font-black bg-[#E87924] text-white px-2.5 py-0.5 rounded-full">
                    ~{netMarginPercent}% Net Margin
                  </span>
                </div>
                <div className="font-display font-black text-4xl sm:text-5xl text-white tracking-tight tabular-nums">
                  {formatINR(netMonthlyProfit)}
                  <span className="text-sm font-normal text-[#FFF8EC]/70"> / month</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-[#FFF8EC]/80">
                  <span>Projected Annual Net Earnings:</span>
                  <span className="font-bold text-white text-sm">{formatINR(annualNetProfit)}/yr</span>
                </div>
              </div>

              {/* Payback time badge */}
              <div className="flex items-center gap-3 p-3.5 bg-black/25 rounded-xl border border-white/10 text-xs text-[#FFF8EC]/85 mb-6">
                <TrendingUp className="w-5 h-5 text-[#E87924] shrink-0" />
                <div>
                  <strong>Estimated Capital Payback: ~{paybackMonths} Months</strong>
                  <span className="block text-[11px] text-[#FFF8EC]/60">
                    Driven by low Capex (₹3.99L – ₹6.49L) and zero lavish dining hall leases.
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call-to-action */}
            <div className="space-y-2.5">
              <a
                href={`https://wa.me/919892447728?text=${encodeURIComponent(getWhatsAppMessage())}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-[#E87924] hover:bg-[#D16719] active:bg-[#B95732] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Discuss This ROI on WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
              <p className="text-[11px] text-center text-[#FFF8EC]/60">
                Direct route to Aditya Pushpa Kuttan (+91 98924 47728)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
