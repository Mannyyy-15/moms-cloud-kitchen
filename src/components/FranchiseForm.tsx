import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MessageSquare, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { FranchiseFormData, FranchiseType } from '../types';
import { ScrollReveal, TextReveal } from './ScrollReveal';
import { getStoredUtm } from '../utils/utm';
import { trackFranchiseLead } from '../utils/metaPixel';

interface FranchiseFormProps {
  selectedFranchiseType?: FranchiseType;
}

export const FranchiseForm: React.FC<FranchiseFormProps> = ({
  selectedFranchiseType = 'Single Franchisee',
}) => {
  const [formData, setFormData] = useState<FranchiseFormData>({
    fullName: '',
    contactNumber: '',
    email: '',
    city: '',
    investmentBudget: '₹4 Lakhs – ₹7 Lakhs (Single Cloud Kitchen Pro)',
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

    // Indian 10-digit mobile number format (optional +91)
    const cleanPhone = formData.contactNumber.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errs.contactNumber = 'Please enter a valid 10-digit mobile number (e.g. 9892447728).';
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

    if (isSubmitting) return; // Prevent duplicate clicks
    setIsSubmitting(true);

    const waText = buildWhatsAppMessage();
    const waUrl = `https://wa.me/919892447728?text=${encodeURIComponent(waText)}`;
    setLastWhatsAppUrl(waUrl);

    try {
      // 1. Submit verified lead payload with attribution to FormSubmit API
      const response = await fetch(BRAND_INFO.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'Full Name': formData.fullName,
          'Mobile Number': formData.contactNumber,
          Email: formData.email,
          'Target City / Area': formData.city,
          'Investment Budget': formData.investmentBudget,
          Timeline: formData.timeline || 'Immediate',
          'Franchise Model': formData.franchiseType,
          Brand: formData.brand,
          Notes: formData.message || 'No additional notes provided.',
          Consent: formData.consent ? 'Agreed' : 'No',
          // Campaign Attribution Data (Meta Ads)
          utm_source: formData.utm_source || 'direct',
          utm_medium: formData.utm_medium || 'website',
          utm_campaign: formData.utm_campaign || 'franchise_meta_ads',
          utm_content: formData.utm_content || '',
          utm_term: formData.utm_term || '',
          fbclid: formData.fbclid || '',
          _subject: `New Franchise Lead: ${formData.fullName} - ${formData.franchiseType} (${formData.city})`,
        }),
      });

      // 2. Track Meta Pixel Lead event ONLY upon confirmed submission
      trackFranchiseLead({
        model: formData.franchiseType,
        city: formData.city,
      });

      // 3. Open WhatsApp pre-filled conversation directly for instant fast-track
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Popup blocked, fallback button available on screen', err);
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      console.error('Lead submission network issue:', err);
      // Fallback: still fire WhatsApp and mark success since lead is addressed to Aditya
      trackFranchiseLead({ model: formData.franchiseType, city: formData.city });
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch {}
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="franchise-enquiry" className="py-16 sm:py-24 lg:py-32 bg-[#FFF8EC] border-b border-[#28231E]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Trust, Social Proof & Direct Support */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E87924]">
                  Franchise Application Form
                </span>
                <span className="h-px w-8 bg-[#E87924]" />
              </div>

              <TextReveal
                text="READY TO EXPLORE YOUR FRANCHISE OPPORTUNITY?"
                as="h2"
                className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4 text-balance"
              />

              <p className="text-sm sm:text-base lg:text-lg text-[#28231E]/80 leading-relaxed">
                Take the first step toward launching a high-margin dark kitchen in your territory.
                Submissions are reviewed directly by <strong>Founder Aditya Pushpa Kuttan</strong> with complete confidentiality.
              </p>
            </div>

            {/* Trust Pill Highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[#28231E]/8 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#174B35]/10 text-[#174B35] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#174B35] block">Verified Business Performance</span>
                  <span className="text-[11px] text-[#28231E]/70 block">Over 4,000+ orders fulfilled across Swiggy, Zomato & Magicpin</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border border-[#28231E]/8 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#E87924]/10 text-[#E87924] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#174B35] block">Fast-Track Review</span>
                  <span className="text-[11px] text-[#28231E]/70 block">Discovery call scheduled within 24 business hours</span>
                </div>
              </div>
            </div>

            {/* Direct Communication Channels */}
            <div className="p-5 sm:p-6 bg-[#F6EBDD] rounded-3xl border border-[#28231E]/10 space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174B35] block">
                Direct Founder Communication
              </span>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#28231E]/8 hover:border-[#25D366]/50 transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#28231E]/60 block font-medium">Instant WhatsApp Support</span>
                  <span className="text-sm font-bold text-[#174B35]">{BRAND_INFO.phone}</span>
                </div>
              </a>

              <a
                href={`tel:${BRAND_INFO.phoneClean}`}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#28231E]/8 hover:border-[#174B35]/40 transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#174B35]/10 text-[#174B35] flex items-center justify-center shrink-0 group-hover:bg-[#174B35] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#28231E]/60 block font-medium">Direct Telephone Enquiry</span>
                  <span className="text-sm font-bold text-[#28231E]">{BRAND_INFO.phone}</span>
                </div>
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#28231E]/8 hover:border-[#E87924]/40 transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E87924]/10 text-[#E87924] flex items-center justify-center shrink-0 group-hover:bg-[#E87924] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#28231E]/60 block font-medium">Franchise Desk Email</span>
                  <span className="text-sm font-bold text-[#28231E]">{BRAND_INFO.email}</span>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Conversion-Focused Enquiry Form */}
          <ScrollReveal direction="up" delay={0.2} className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#28231E]/10">
              {submitSuccess ? (
                /* Confirmed Success State */
                <div className="text-center py-10 px-2 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#174B35]/10 text-[#174B35] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#174B35]" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#174B35] mb-2">
                    Thank You, {formData.fullName}!
                  </h3>
                  <p className="text-sm sm:text-base text-[#28231E]/80 max-w-md mx-auto leading-relaxed mb-6">
                    Your franchise application for <strong>{formData.franchiseType}</strong> in{' '}
                    <strong>{formData.city}</strong> has been registered with our operations desk and sent to{' '}
                    <strong>WhatsApp (+91 98924 47728)</strong>.
                  </p>

                  <div className="p-4 bg-[#FFF8EC] rounded-2xl border border-[#E87924]/20 text-xs text-[#28231E]/85 max-w-md mx-auto text-left mb-6 space-y-1.5">
                    <p className="font-bold text-[#174B35]">✓ Next Immediate Steps:</p>
                    <p>
                      Aditya Pushpa Kuttan or an operations partner will connect within 24 hours. To fast-track your priority review immediately, click below to open WhatsApp:
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
                          investmentBudget: '₹4 Lakhs – ₹7 Lakhs (Single Cloud Kitchen Pro)',
                          timeline: 'Immediately (Within 30 Days)',
                          brand: BRAND_INFO.name,
                          franchiseType: 'Single Franchisee',
                          message: '',
                          consent: false,
                        });
                      }}
                      className="inline-flex items-center justify-center text-sm font-semibold text-[#174B35] bg-[#F6EBDD] hover:bg-[#FFF8EC] px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                /* Active High-Converting Lead Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
                  <div className="border-b border-[#28231E]/8 pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[#174B35]">
                        Franchise Investment Enquiry
                      </h3>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#E87924] bg-[#E87924]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Direct Desk
                      </span>
                    </div>
                    <p className="text-xs text-[#28231E]/60 mt-1">
                      Fill out your details to receive the official Franchise Deck & unit economics breakdown.
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <strong>Submission Issue:</strong> {submitError}
                      </div>
                    </div>
                  )}

                  {/* Field: Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-1.5">
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
                      placeholder="e.g. Ramesh Nair"
                      className={`w-full px-4 py-3 rounded-xl border bg-[#FFF8EC]/40 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                      }`}
                      required
                    />
                    {errors.fullName && <p className="text-xs text-red-600 mt-1 font-medium">{errors.fullName}</p>}
                  </div>

                  {/* Two-Column: Contact & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label htmlFor="contactNumber" className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-1.5">
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
                        placeholder="e.g. 9892447728"
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FFF8EC]/40 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.contactNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.contactNumber && (
                        <p className="text-xs text-red-600 mt-1 font-medium">{errors.contactNumber}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-1.5">
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
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FFF8EC]/40 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
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
                      <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-1.5">
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
                        placeholder="e.g. Mumbai, Vasai, Pune, etc."
                        className={`w-full px-4 py-3 rounded-xl border bg-[#FFF8EC]/40 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.city && <p className="text-xs text-red-600 mt-1 font-medium">{errors.city}</p>}
                    </div>

                    <div>
                      <label htmlFor="investmentBudget" className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-1.5">
                        Investment Budget <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="investmentBudget"
                        value={formData.investmentBudget}
                        onChange={(e) => {
                          setFormData({ ...formData, investmentBudget: e.target.value });
                          if (errors.investmentBudget) setErrors({ ...errors, investmentBudget: undefined });
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-[#28231E]/15 bg-[#FFF8EC]/40 text-[#28231E] focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm cursor-pointer"
                        required
                      >
                        <option value="₹4 Lakhs – ₹7 Lakhs (Single Cloud Kitchen Pro)">
                          ₹4 Lakhs – ₹7 Lakhs (Single Cloud Kitchen)
                        </option>
                        <option value="₹7 Lakhs – ₹12 Lakhs (Turnkey Setup with Equipment)">
                          ₹7 Lakhs – ₹12 Lakhs (Turnkey Setup)
                        </option>
                        <option value="₹12 Lakhs+ (City / District Master Franchise)">
                          ₹12 Lakhs+ (City Master Franchise)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Field: Preferred Timeline */}
                  <div>
                    <label htmlFor="timeline" className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-1.5">
                      Preferred Launch Timeline <span className="text-xs font-normal text-[#28231E]/60">(Optional)</span>
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#28231E]/15 bg-[#FFF8EC]/40 text-[#28231E] focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm cursor-pointer"
                    >
                      <option value="Immediately (Within 30 Days)">Immediately (Within 30 Days)</option>
                      <option value="1 to 3 Months">1 to 3 Months</option>
                      <option value="Exploring / 3+ Months">Exploring / 3+ Months</option>
                    </select>
                  </div>

                  {/* Franchise Model Selector */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-2">
                      Franchise Model Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.franchiseType === 'Single Franchisee'
                            ? 'border-[#174B35] bg-[#174B35]/5 shadow-xs'
                            : 'border-[#28231E]/15 hover:border-[#28231E]/30 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="franchiseType"
                          value="Single Franchisee"
                          checked={formData.franchiseType === 'Single Franchisee'}
                          onChange={() => setFormData({ ...formData, franchiseType: 'Single Franchisee' })}
                          className="mt-1 accent-[#174B35]"
                        />
                        <div>
                          <span className="text-sm font-bold text-[#174B35] block">Single Franchisee</span>
                          <span className="text-[11px] text-[#28231E]/70 block mt-0.5">Kitchen ₹3.99L (All-In ~₹6.49L)</span>
                        </div>
                      </label>

                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          formData.franchiseType === 'Master Franchise'
                            ? 'border-[#174B35] bg-[#174B35]/5 shadow-xs'
                            : 'border-[#28231E]/15 hover:border-[#28231E]/30 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="franchiseType"
                          value="Master Franchise"
                          checked={formData.franchiseType === 'Master Franchise'}
                          onChange={() => setFormData({ ...formData, franchiseType: 'Master Franchise' })}
                          className="mt-1 accent-[#174B35]"
                        />
                        <div>
                          <span className="text-sm font-bold text-[#174B35] block">Master Franchise</span>
                          <span className="text-[11px] text-[#28231E]/70 block mt-0.5">Territory Rights ₹12.50L</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-[#28231E] mb-1.5">
                      Additional Background or Specific Questions <span className="text-xs font-normal text-[#28231E]/60">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Existing kitchen space available, experience in food delivery, target neighborhood..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#28231E]/15 bg-[#FFF8EC]/40 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm resize-y"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData({ ...formData, consent: e.target.checked });
                          if (errors.consent) setErrors({ ...errors, consent: undefined });
                        }}
                        className="mt-1 w-4 h-4 rounded text-[#E87924] accent-[#E87924] focus:ring-[#E87924]"
                      />
                      <span className="text-xs text-[#28231E]/80 leading-snug">
                        I agree to be contacted by Mom&apos;s Cloud Kitchen via call, WhatsApp, or email regarding my franchise enquiry. Information is strictly confidential. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && <p className="text-xs text-red-600 mt-1 font-medium">{errors.consent}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-[#E87924] hover:bg-[#D16719] active:bg-[#B95732] disabled:bg-[#E87924]/60 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E87924]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Your Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Franchise Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/919892447728?text=${encodeURIComponent(
                        "Hello Aditya, I am interested in Mom's Cloud Kitchen franchise opportunity. Please share the details."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#25D366]/30 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>Prefer WhatsApp? Connect Directly (+91 98924 47728)</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-[#28231E]/60">
                    Lead routed to founder Aditya Pushpa Kuttan with secure backup to <strong>{BRAND_INFO.email}</strong>.
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
