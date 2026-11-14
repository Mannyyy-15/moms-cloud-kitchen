import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MessageSquare, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { FranchiseFormData, FranchiseType } from '../types';
import { ScrollReveal, TextReveal } from './ScrollReveal';
import { getStoredUtm, pickUtms } from '../utils/utm';
import { trackFranchiseLead } from '../utils/metaPixel';

type FormErrors = Partial<Record<keyof FranchiseFormData, string>>;

const CONSENT_VERSION = '1.0';
const SUBMIT_TIMEOUT_MS = 15000;

const MODEL_BUDGETS: Record<FranchiseType, string> = {
  'Cloud Kitchen': '₹9 Lakhs – ₹10 Lakhs (Cloud Kitchen Turnkey Setup)',
  'Cloud Kitchen + Dine-In': '₹13 Lakhs – ₹14 Lakhs (Cloud + Dine-In Turnkey Setup)',
  'Master Franchise (Cloud Kitchen)': '₹20 Lakhs – ₹25 Lakhs (City Master Franchise Network)',
  'Master Franchise (Cloud + Dine-In)': '₹20 Lakhs – ₹25 Lakhs (City Master Franchise Network)',
  'Single Franchisee': '₹9 Lakhs – ₹10 Lakhs (Cloud Kitchen Turnkey Setup)',
  'Master Franchise': '₹20 Lakhs – ₹25 Lakhs (City Master Franchise Network)',
};

const getDefaultBudget = (model: FranchiseType): string =>
  MODEL_BUDGETS[model] ?? MODEL_BUDGETS['Cloud Kitchen'];

const isExplicitFailure = (body: unknown): boolean => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false;
  const success = (body as { success?: unknown }).success;
  return success === false || success === 'false';
};

const FIELD_ORDER: (keyof FranchiseFormData)[] = [
  'fullName',
  'contactNumber',
  'email',
  'city',
  'investmentBudget',
  'consent',
];

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
      setFormData((prev) => ({
        ...prev,
        franchiseType: selectedFranchiseType,
        investmentBudget: budgetTouchedRef.current
          ? prev.investmentBudget
          : getDefaultBudget(selectedFranchiseType),
      }));
    }
  }, [selectedFranchiseType]);

  // Load UTM parameters into state on mount
  useEffect(() => {
    const utms = pickUtms(getStoredUtm());
    if (Object.keys(utms).length > 0) {
      setFormData((prev) => ({ ...prev, ...utms }));
    }
  }, []);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string>('');
  const [honeypot, setHoneypot] = useState('');

  const submitLockRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const whatsappTimeoutRef = useRef<number | null>(null);
  const budgetTouchedRef = useRef(false);
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (submitSuccess) {
      successRef.current?.focus();
    }
  }, [submitSuccess]);

  useEffect(() => {
    return () => {
      if (whatsappTimeoutRef.current !== null) {
        window.clearTimeout(whatsappTimeoutRef.current);
      }
    };
  }, []);

  const validate = (): boolean => {
    const errs: FormErrors = {};

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

    const firstInvalid = FIELD_ORDER.find((field) => errs[field]);
    if (firstInvalid) {
      document.getElementById(String(firstInvalid))?.focus();
      return false;
    }

    return true;
  };

  const buildWhatsAppMessage = () => {
    const utms = pickUtms(formData);
    const source = utms.utm_source
      ? `${utms.utm_source}${utms.utm_medium ? ` / ${utms.utm_medium}` : ''}`
      : 'Website Enquiry';

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
      `🌐 _Source: ${source} · ${BRAND_INFO.domain}_`
    );
  };

  const handleModelChange = (model: FranchiseType) => {
    setFormData((prev) => ({
      ...prev,
      franchiseType: model,
      investmentBudget: budgetTouchedRef.current
        ? prev.investmentBudget
        : getDefaultBudget(model),
    }));
  };

  const resetForm = () => {
    if (whatsappTimeoutRef.current !== null) {
      window.clearTimeout(whatsappTimeoutRef.current);
      whatsappTimeoutRef.current = null;
    }
    setSubmitSuccess(false);
    setSubmitError(null);
    setErrors({});
    setLastWhatsAppUrl('');
    setHoneypot('');
    budgetTouchedRef.current = false;
    setFormData((prev) => ({
      fullName: '',
      contactNumber: '',
      email: '',
      city: '',
      investmentBudget: getDefaultBudget(prev.franchiseType),
      timeline: 'Immediately (Within 30 Days)',
      brand: BRAND_INFO.name,
      franchiseType: prev.franchiseType,
      message: '',
      consent: false,
      ...pickUtms(prev),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || submitLockRef.current) return;
    if (honeypot.trim()) return;

    setSubmitError(null);

    if (!validate()) {
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);

    const waMsg = buildWhatsAppMessage();
    const waNumber = BRAND_INFO.phoneClean.replace(/\D/g, '');
    const encodedWaUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

    const safeName = formData.fullName.trim().slice(0, 100);
    const safeCity = formData.city.trim().slice(0, 100);
    const safeMessage = formData.message.trim().slice(0, 1000);

    const payload = {
      name: safeName,
      phone: formData.contactNumber.trim().slice(0, 20),
      email: formData.email.trim().slice(0, 254),
      city: safeCity,
      investment_budget: formData.investmentBudget,
      timeline: formData.timeline || 'Within 30 Days',
      franchise_type: formData.franchiseType,
      notes: safeMessage,
      brand: BRAND_INFO.name,
      ...pickUtms(formData),
      consent: formData.consent,
      consent_at: new Date().toISOString(),
      consent_version: CONSENT_VERSION,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      _subject: `New Franchise Lead: ${safeName} (${safeCity})`.replace(/[\r\n]+/g, ' '),
      _template: 'table',
    };

    const controller = new AbortController();
    abortRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const res = await fetch(BRAND_INFO.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }

      if (!res.ok || isExplicitFailure(body)) {
        throw new Error('submission-failed');
      }

      trackFranchiseLead({
        model: formData.franchiseType,
        city: safeCity,
      });

      setLastWhatsAppUrl(encodedWaUrl);
      setSubmitSuccess(true);

      whatsappTimeoutRef.current = window.setTimeout(() => {
        whatsappTimeoutRef.current = null;
        window.open(encodedWaUrl, '_blank', 'noopener,noreferrer');
      }, 1200);
    } catch {
      setSubmitError(
        `We couldn't submit your application right now. Please try again or reach us on WhatsApp at ${BRAND_INFO.phoneDisplay}.`
      );
    } finally {
      window.clearTimeout(timeoutId);
      abortRef.current = null;
      setIsSubmitting(false);
      submitLockRef.current = false;
    }
  };

  return (
    <section id="franchise-enquiry" className="scroll-mt-24 py-16 sm:py-22 lg:py-28 bg-[#FFF9F2] border-b border-[#E87924]/15">
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
                <div
                  ref={successRef}
                  role="status"
                  aria-live="polite"
                  tabIndex={-1}
                  className="text-center py-10 px-2 animate-in fade-in duration-300 focus:outline-none"
                >
                  <div className="w-16 h-16 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#25D366]" />
                  </div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#28231E] mb-2">
                    Thank You, {formData.fullName}!
                  </h3>
                  <p className="text-sm sm:text-base text-[#28231E]/80 max-w-md mx-auto leading-relaxed mb-6">
                    Your franchise application for <strong>{formData.franchiseType}</strong> in{' '}
                    <strong>{formData.city}</strong> has been received by our operations desk. You can continue the conversation on{' '}
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
                      type="button"
                      onClick={resetForm}
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
                    <div className="sr-only" aria-hidden="true">
                      <label htmlFor="companyWebsite">Company Website</label>
                      <input
                        type="text"
                        id="companyWebsite"
                        name="companyWebsite"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
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
                      autoComplete="name"
                      maxLength={100}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                        errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <p id="fullName-error" role="alert" className="text-xs text-red-600 mt-1 font-medium">
                        {errors.fullName}
                      </p>
                    )}
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
                        autoComplete="tel"
                        inputMode="tel"
                        maxLength={20}
                        aria-invalid={Boolean(errors.contactNumber)}
                        aria-describedby={errors.contactNumber ? 'contactNumber-error' : undefined}
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.contactNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.contactNumber && (
                        <p id="contactNumber-error" role="alert" className="text-xs text-red-600 mt-1 font-medium">
                          {errors.contactNumber}
                        </p>
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
                        autoComplete="email"
                        inputMode="email"
                        maxLength={254}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="text-xs text-red-600 mt-1 font-medium">
                          {errors.email}
                        </p>
                      )}
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
                        autoComplete="address-level2"
                        inputMode="text"
                        maxLength={100}
                        aria-invalid={Boolean(errors.city)}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                        className={`w-full px-4 py-3.5 rounded-xl border bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                          errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                        }`}
                        required
                      />
                      {errors.city && (
                        <p id="city-error" role="alert" className="text-xs text-red-600 mt-1 font-medium">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="investmentBudget" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-1.5">
                        Investment Budget <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="investmentBudget"
                        value={formData.investmentBudget}
                        onChange={(e) => {
                          budgetTouchedRef.current = true;
                          setFormData({ ...formData, investmentBudget: e.target.value });
                          if (errors.investmentBudget) setErrors({ ...errors, investmentBudget: undefined });
                        }}
                        aria-invalid={Boolean(errors.investmentBudget)}
                        aria-describedby={errors.investmentBudget ? 'investmentBudget-error' : undefined}
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
                      {errors.investmentBudget && (
                        <p id="investmentBudget-error" role="alert" className="text-xs text-red-600 mt-1 font-medium">
                          {errors.investmentBudget}
                        </p>
                      )}
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
                    <label id="franchiseType-label" className="block text-xs sm:text-sm font-bold text-[#28231E] mb-2">
                      Select Franchise Model Format
                    </label>
                    <div role="radiogroup" aria-labelledby="franchiseType-label" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                          onChange={() => handleModelChange('Cloud Kitchen')}
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
                          onChange={() => handleModelChange('Cloud Kitchen + Dine-In')}
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
                          onChange={() => handleModelChange('Master Franchise (Cloud Kitchen)')}
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
                          onChange={() => handleModelChange('Master Franchise (Cloud + Dine-In)')}
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
                      maxLength={1000}
                      className="w-full px-4 py-3 rounded-xl border border-[#28231E]/15 bg-[#FFF9F2]/50 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Explicit Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        id="consent"
                        checked={formData.consent}
                        onChange={(e) => {
                          setFormData({ ...formData, consent: e.target.checked });
                          if (errors.consent) setErrors({ ...errors, consent: undefined });
                        }}
                        aria-invalid={Boolean(errors.consent)}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                        className="mt-1 w-4 h-4 rounded text-[#E87924] accent-[#E87924] focus:ring-[#E87924] cursor-pointer"
                        required
                      />
                      <span className="text-xs text-[#28231E]/75 leading-relaxed">
                        I agree to be contacted by Mom&apos;s Cloud Kitchen regarding franchise details, financial unit economics, and launch guidelines via Phone, WhatsApp or Email.{' '}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-error" role="alert" className="text-xs text-red-600 mt-1 font-medium">
                        {errors.consent}
                      </p>
                    )}
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
