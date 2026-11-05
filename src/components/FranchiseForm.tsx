import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MessageSquare, ExternalLink, ShieldCheck, Clock, Instagram } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { FranchiseFormData, FranchiseType } from '../types';
import { ScrollReveal, TextReveal } from './ScrollReveal';
import { getStoredUtm } from '../utils/utm';
import { trackFranchiseLead } from '../utils/metaPixel';

interface FranchiseFormProps {
  selectedFranchiseType?: FranchiseType;
}

export const FranchiseForm: React.FC<FranchiseFormProps> = ({
  selectedFranchiseType = 'Cloud Kitchen',
}) => {
  const [formData, setFormData] = useState<FranchiseFormData>({
    fullName: '',
    contactNumber: '',
    email: '',
    city: '',
    investmentBudget: '₹9 Lakhs – ₹10 Lakhs (Cloud Kitchen Turnkey Setup)',
    timeline: 'Immediately (Within 30 Days)',
    brand: BRAND_INFO.name,
    franchiseType: selectedFranchiseType,
    message: '',
    consent: false,
  });

  // Keep franchise type synced if user selects from model cards
  useEffect(() => {
    if (selectedFranchiseType) {
      setFormData((prev) => ({ ...prev, franchiseType: selectedFranchiseType }));
    }
  }, [selectedFranchiseType]);

  // Load UTM parameters into state on mount
  useEffect(() => {
    const utms = getStoredUtm();
    if (Object.keys(utms).length > 0) {
      setFormData((prev) => ({ ...prev, ...utms }));
    }
  }, []);

  const [errors, setErrors] = useState<Partial<Record<keyof FranchiseFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string>('');

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FranchiseFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }

    // Indian 10-digit mobile number format
    const cleanPhone = formData.contactNumber.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errs.contactNumber = 'Please enter a valid 10-digit mobile number (e.g. 8484030988).';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.city.trim() || formData.city.trim().length < 2) {
      errs.city = 'Please enter your target city or area for the franchise.';
    }

    if (!formData.investmentBudget) {
      errs.investmentBudget = 'Please select your investment budget range.';
    }

    if (!formData.consent) {
      errs.consent = 'Please give your consent to receive franchise details.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = () => {
    return (
      `*New Franchise Enquiry - Mom's Cloud Kitchen*\n\n` +
      `👤 *Applicant Name:* ${formData.fullName.trim()}\n` +
      `📱 *Mobile Number:* ${formData.contactNumber.trim()}\n` +
      `✉️ *Email Address:* ${formData.email.trim()}\n` +
      `📍 *Target Location:* ${formData.city.trim()}\n` +
      `💰 *Budget Range:* ${formData.investmentBudget}\n` +
      `⏱️ *Target Timeline:* ${formData.timeline || 'Within 30 Days'}\n` +
      `🏪 *Franchise Model:* ${formData.franchiseType}\n` +
      `📝 *Notes:* ${formData.message.trim() || 'Ready for 1-on-1 discovery discussion'}\n\n` +
      `🌐 _Source: www.momscloudkitchen.com (Meta Ads Enquiry)_`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const waMsg = buildWhatsAppMessage();
    const encodedWaUrl = `https://wa.me/918484030988?text=${encodeURIComponent(waMsg)}`;
    setLastWhatsAppUrl(encodedWaUrl);

    try {
      const payload = {
        name: formData.fullName.trim(),
        phone: formData.contactNumber.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        investment_budget: formData.investmentBudget,
        timeline: formData.timeline || 'Within 30 Days',
        franchise_type: formData.franchiseType,
        notes: formData.message.trim(),
        brand: BRAND_INFO.name,
        utm_source: formData.utm_source || '',
        utm_medium: formData.utm_medium || '',
        utm_campaign: formData.utm_campaign || '',
        utm_content: formData.utm_content || '',
        utm_term: formData.utm_term || '',
        fbclid: formData.fbclid || '',
        _subject: `New Franchise Lead: ${formData.fullName.trim()} (${formData.city.trim()})`,
        _template: 'table',
      };

      const res = await fetch(BRAND_INFO.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        trackFranchiseLead({
          model: formData.franchiseType,
          city: formData.city.trim(),
        });

        setSubmitSuccess(true);
        setIsSubmitting(false);

        // Auto redirect to WhatsApp after 1 second
        setTimeout(() => {
          window.open(encodedWaUrl, '_blank');
        }, 1200);
      } else {
        // Fallback to WhatsApp redirect if mail API throttles
        trackFranchiseLead({
          model: formData.franchiseType,
          city: formData.city.trim(),
        });
        setSubmitSuccess(true);
        setIsSubmitting(false);
        window.open(encodedWaUrl, '_blank');
      }
    } catch (err) {
      console.warn('Form submission encountered network error, falling back to direct WhatsApp:', err);
      trackFranchiseLead({
        model: formData.franchiseType,
        city: formData.city.trim(),
      });
      setSubmitSuccess(true);
      setIsSubmitting(false);
      window.open(encodedWaUrl, '_blank');
    }
  };

  return (
    <section id="franchise-enquiry" className="py-16 sm:py-22 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Trust, Guidance & Direct Contact Channels */}
          <ScrollReveal direction="up" className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-[#E87924]">
                  Franchise Application Desk
                </span>
                <span className="h-px w-8 bg-[#E87924]" />
              </div>

              <TextReveal
                text="EXPLORE YOUR FRANCHISE OPPORTUNITY."
                as="h2"
                className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[#28231E] tracking-tight leading-[1.12] mb-4"
              />

              <p className="text-sm sm:text-base text-[#28231E]/80 leading-relaxed mb-6 font-normal">
                Submit your expression of interest below. Connect directly with Founder{' '}
                <strong className="text-[#E87924]">Aditya Kuttan</strong> to review territory viability, kitchen equipment capex, and unit economics.
              </p>

              {/* 3 Trust Callouts */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#E87924]/20 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF3E3] text-[#E87924] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#28231E] block">5-Year Agreement &amp; Flat 5% Royalty</span>
                    <span className="text-[11px] text-[#28231E]/70 block leading-tight mt-0.5">
                      No surprise yearly renewals. Standardized dry premixes with zero chef dependency.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#E87924]/20 shadow-xs">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF3E3] text-[#E87924] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#28231E] block">ROI in 6 to 8 Months</span>
                    <span className="text-[11px] text-[#28231E]/70 block leading-tight mt-0.5">
                      Proven unit economics: 28% to 35% net margin on lean 200–350 sq.ft. footprints.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant Reach Out Strip */}
            <div className="pt-6 border-t border-[#E87924]/20 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-[#28231E]/70 block">
                Direct Founder Contact:
              </span>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[#E87924]/20 hover:border-[#25D366] transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#28231E]/60 block font-medium">Instant WhatsApp Support</span>
                  <span className="text-sm font-black text-[#28231E]">{BRAND_INFO.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[#E87924]/20 hover:border-[#E87924] transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF3E3] text-[#E87924] flex items-center justify-center shrink-0 group-hover:bg-[#E87924] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#28231E]/60 block font-medium">Direct Telephone Enquiry</span>
                  <span className="text-sm font-black text-[#28231E]">{BRAND_INFO.phoneDisplay}</span>
                </div>
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[#E87924]/20 hover:border-[#E87924] transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF3E3] text-[#E87924] flex items-center justify-center shrink-0 group-hover:bg-[#E87924] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#28231E]/60 block font-medium">Franchise Desk Email</span>
                  <span className="text-sm font-black text-[#28231E]">{BRAND_INFO.email}</span>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: High-Converting Enquiry Form */}
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-[#E87924]/20">
              {submitSuccess ? (
                /* Confirmed Success State */
                <div className="text-center py-10 px-2 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#25D366]" />
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#28231E] mb-2">
                    Thank You, {formData.fullName}!
                  </h3>
                  <p className="text-sm sm:text-base text-[#28231E]/80 max-w-md mx-auto leading-relaxed mb-6">
                    Your franchise application for <strong>{formData.franchiseType}</strong> in{' '}
                    <strong>{formData.city}</strong> has been registered with our operations desk and sent to{' '}
                    <strong>WhatsApp ({BRAND_INFO.phoneDisplay})</strong>.
                  </p>

                  <div className="p-4 bg-[#FFF9F2] rounded-2xl border border-[#E87924]/20 text-xs text-[#28231E]/85 max-w-md mx-auto text-left mb-6 space-y-1.5">
                    <p className="font-bold text-[#E87924]">✓ Next Immediate Steps:</p>
                    <p>
                      Aditya Kuttan or an operations partner will connect within 24 hours. To fast-track your review immediately, click below to open WhatsApp:
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={lastWhatsAppUrl || BRAND_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-colors"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Chat on WhatsApp Directly</span>
                      <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
                    </a>

                    <button
                      onClick={() => {
                        setSubmitSuccess(false);
                        setFormData({
                          fullName: '',
                          contactNumber: '',
                          email: '',
                          city: '',
                          investmentBudget: '₹9 Lakhs – ₹10 Lakhs (Cloud Kitchen Turnkey Setup)',
                          timeline: 'Immediately (Within 30 Days)',
                          brand: BRAND_INFO.name,
                          franchiseType: selectedFranchiseType,
                          message: '',
                          consent: false,
                        });
                      }}
                      className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-[#28231E]/20 text-xs sm:text-sm font-semibold hover:bg-[#FFF9F2] transition-colors"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Active Form */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="border-b border-[#28231E]/8 pb-4 mb-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#E87924] block">
                      Fast-Track Partner Evaluation
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#28231E]">
                      Submit Your Franchise Enquiry
                    </h3>
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs sm:text-sm text-red-700 flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Field 1: Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="e.g. Ramesh Sharma"
                      className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                      }`}
                      required
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1 font-medium">{errors.fullName}</p>}
                  </div>

                  {/* Two-Column: Mobile Number & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="contactNumber" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, contactNumber: e.target.value });
                          if (errors.contactNumber) setErrors({ ...errors, contactNumber: undefined });
                        }}
                        placeholder="e.g. 8484030988"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.contactNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.contactNumber && (
                        <p className="text-xs text-red-600 mt-1 font-medium">{errors.contactNumber}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="e.g. partner@example.com"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.email && <p className="text-xs text-red-600 mt-1 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Two-Column: City & Investment Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="city" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                        Preferred City / Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={formData.city}
                        onChange={(e) => {
                          setFormData({ ...formData, city: e.target.value });
                          if (errors.city) setErrors({ ...errors, city: undefined });
                        }}
                        placeholder="e.g. Mumbai, Vasai, Virar, Pune"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.city && <p className="text-xs text-red-600 mt-1 font-medium">{errors.city}</p>}
                    </div>

                    <div>
                      <label htmlFor="investmentBudget" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                        Investment Budget <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="investmentBudget"
                        value={formData.investmentBudget}
                        onChange={(e) => {
                          setFormData({ ...formData, investmentBudget: e.target.value });
                          if (errors.investmentBudget) setErrors({ ...errors, investmentBudget: undefined });
                        }}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#28231E]/15 bg-[#FFF9F2]/50 text-[#28231E] focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm cursor-pointer"
                        required
                      >
                        <option value="₹4 Lakhs (Cloud Kitchen Franchise Fee Only)">
                          ₹4 Lakhs (Cloud Kitchen Franchise Fee)
                        </option>
                        <option value="₹6 Lakhs (Cloud + Dine-In Franchise Fee Only)">
                          ₹6 Lakhs (Cloud + Dine-In Franchise Fee)
                        </option>
                        <option value="₹9 Lakhs – ₹10 Lakhs (Cloud Kitchen Turnkey Setup)">
                          ₹9 Lakhs – ₹10 Lakhs (Cloud Kitchen All-In Turnkey)
                        </option>
                        <option value="₹13 Lakhs – ₹14 Lakhs (Cloud + Dine-In Turnkey Setup)">
                          ₹13 Lakhs – ₹14 Lakhs (Cloud + Dine-In Turnkey)
                        </option>
                        <option value="₹20 Lakhs – ₹25 Lakhs (City Master Franchise Network)">
                          ₹20 Lakhs – ₹25 Lakhs (City Master Franchise)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Timeline */}
                  <div>
                    <label htmlFor="timeline" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                      Preferred Launch Timeline <span className="text-xs font-normal text-[#28231E]/60">(Optional)</span>
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#28231E]/15 bg-[#FFF9F2]/50 text-[#28231E] focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm cursor-pointer"
                    >
                      <option value="Immediately (Within 30 Days)">Immediately (Within 30 Days)</option>
                      <option value="1 to 3 Months">1 to 3 Months</option>
                      <option value="Exploring / 3+ Months">Exploring / 3+ Months</option>
                    </select>
                  </div>

                  {/* Franchise Model Preference Selection */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#28231E] mb-2">
                      Select Franchise Model Format
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.franchiseType === 'Cloud Kitchen' || formData.franchiseType === 'Single Franchisee'
                            ? 'border-[#E87924] bg-[#FFF3E3] shadow-xs'
                            : 'border-[#28231E]/15 hover:border-[#28231E]/30 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="franchiseType"
                          value="Cloud Kitchen"
                          checked={formData.franchiseType === 'Cloud Kitchen' || formData.franchiseType === 'Single Franchisee'}
                          onChange={() => setFormData({ ...formData, franchiseType: 'Cloud Kitchen' })}
                          className="mt-1 accent-[#E87924]"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-[#28231E] block">Cloud Kitchen (Delivery Only)</span>
                          <span className="text-[11px] text-[#E87924] font-semibold block mt-0.5">Fee ₹4L · Setup ₹5L–₹6L · 200–250 sq.ft.</span>
                        </div>
                      </label>

                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.franchiseType === 'Cloud Kitchen + Dine-In'
                            ? 'border-[#E87924] bg-[#FFF3E3] shadow-xs'
                            : 'border-[#28231E]/15 hover:border-[#28231E]/30 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="franchiseType"
                          value="Cloud Kitchen + Dine-In"
                          checked={formData.franchiseType === 'Cloud Kitchen + Dine-In'}
                          onChange={() => setFormData({ ...formData, franchiseType: 'Cloud Kitchen + Dine-In' })}
                          className="mt-1 accent-[#E87924]"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-[#28231E] block">Cloud Kitchen + Dine-In</span>
                          <span className="text-[11px] text-[#E87924] font-semibold block mt-0.5">Fee ₹6L · Setup ₹7L–₹8L · 300–350 sq.ft.</span>
                        </div>
                      </label>

                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.franchiseType === 'Master Franchise (Cloud Kitchen)' || formData.franchiseType === 'Master Franchise'
                            ? 'border-[#E87924] bg-[#FFF3E3] shadow-xs'
                            : 'border-[#28231E]/15 hover:border-[#28231E]/30 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="franchiseType"
                          value="Master Franchise (Cloud Kitchen)"
                          checked={formData.franchiseType === 'Master Franchise (Cloud Kitchen)' || formData.franchiseType === 'Master Franchise'}
                          onChange={() => setFormData({ ...formData, franchiseType: 'Master Franchise (Cloud Kitchen)' })}
                          className="mt-1 accent-[#E87924]"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-[#28231E] block">Master Franchise (Cloud Only)</span>
                          <span className="text-[11px] text-[#E87924] font-semibold block mt-0.5">Fee ₹20 Lakhs · City Territory Rights</span>
                        </div>
                      </label>

                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.franchiseType === 'Master Franchise (Cloud + Dine-In)'
                            ? 'border-[#E87924] bg-[#FFF3E3] shadow-xs'
                            : 'border-[#28231E]/15 hover:border-[#28231E]/30 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="franchiseType"
                          value="Master Franchise (Cloud + Dine-In)"
                          checked={formData.franchiseType === 'Master Franchise (Cloud + Dine-In)'}
                          onChange={() => setFormData({ ...formData, franchiseType: 'Master Franchise (Cloud + Dine-In)' })}
                          className="mt-1 accent-[#E87924]"
                        />
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-[#28231E] block">Master Franchise (Cloud + Dine-In)</span>
                          <span className="text-[11px] text-[#E87924] font-semibold block mt-0.5">Fee ₹25 Lakhs · Full Metro Rights</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                      Additional Notes / Experience <span className="text-xs font-normal text-[#28231E]/60">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your background, target catchment or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-[#28231E]/15 bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Explicit Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData({ ...formData, consent: e.target.checked });
                          if (errors.consent) setErrors({ ...errors, consent: undefined });
                        }}
                        className="mt-1 w-4 h-4 rounded text-[#E87924] accent-[#E87924] focus:ring-[#E87924] cursor-pointer"
                        required
                      />
                      <span className="text-xs text-[#28231E]/75 leading-relaxed">
                        I agree to be contacted by Mom&apos;s Cloud Kitchen regarding franchise details, financial unit economics, and launch guidelines via Phone, WhatsApp or Email.{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && <p className="text-xs text-red-600 mt-1 font-medium">{errors.consent}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-2 bg-[#E87924] hover:bg-[#D16719] active:scale-[0.98] text-white shadow-xl hover:shadow-[#E87924]/40 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Franchise Enquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#28231E]/60 pt-1">
                    🔒 Zero spam guarantee. Leads forwarded immediately to Founder Aditya Kuttan ({BRAND_INFO.phoneDisplay}).
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
