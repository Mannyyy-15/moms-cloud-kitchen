import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, Mail, MessageSquare, ExternalLink } from 'lucide-react';
import { BRAND_INFO } from '../data/brandData';
import { FranchiseFormData, FranchiseType } from '../types';
import { ScrollReveal } from './ScrollReveal';

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
    brand: BRAND_INFO.name,
    franchiseType: selectedFranchiseType,
    message: '',
    consent: false,
  });

  // Keep franchise type synced if user clicks another model card
  React.useEffect(() => {
    if (selectedFranchiseType) {
      setFormData((prev) => ({ ...prev, franchiseType: selectedFranchiseType }));
    }
  }, [selectedFranchiseType]);

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

    // Indian 10-digit mobile number format or with optional +91
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

    if (!formData.franchiseType) {
      errs.franchiseType = 'Please select a franchise model.';
    }

    if (!formData.consent) {
      errs.consent = 'Please give your consent to receive details via WhatsApp and email.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppMessage = () => {
    return (
      `*New Franchise Enquiry - Mom's Cloud Kitchen*\n\n` +
      `👤 *Full Name:* ${formData.fullName.trim()}\n` +
      `📱 *Mobile:* ${formData.contactNumber.trim()}\n` +
      `✉️ *Email:* ${formData.email.trim()}\n` +
      `📍 *Target City / Area:* ${formData.city.trim()}\n` +
      `🏪 *Franchise Model:* ${formData.franchiseType}\n` +
      `📝 *Notes & Background:* ${formData.message.trim() || 'Ready to start immediately'}\n\n` +
      `🌐 _Sent via www.momscloudkitchen.com_`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const waText = buildWhatsAppMessage();
    const waUrl = `https://wa.me/919892447728?text=${encodeURIComponent(waText)}`;
    setLastWhatsAppUrl(waUrl);

    // 1. Concurrently send backup email via FormSubmit
    try {
      fetch(BRAND_INFO.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Phone: formData.contactNumber,
          Email: formData.email,
          City: formData.city,
          Brand: formData.brand,
          'Franchise Type': formData.franchiseType,
          Message: formData.message || 'No additional message provided.',
          Consent: formData.consent ? 'Yes' : 'No',
          _subject: `New Franchise Lead: ${formData.fullName} - ${formData.franchiseType} (${formData.city})`,
        }),
      }).catch((err) => console.log('Background email capture status:', err));
    } catch {
      // Ignore background fetch failure - WhatsApp is primary
    }

    // 2. Open WhatsApp directly with prefilled message
    try {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked by browser, user can click the button on screen', e);
    }

    // Mark as successfully processed
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  return (
    <section id="franchise-enquiry" className="py-20 lg:py-32 bg-[#FFF8EC] border-b border-[#28231E]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Emotional Context & Direct Support Channels */}
          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E87924]">
                  Franchise Application
                </span>
                <span className="h-px w-8 bg-[#E87924]" />
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#174B35] tracking-tight leading-[1.15] mb-4 text-balance">
                LET'S BRING MOM'S LOVE TO MORE HOMES.
              </h2>

              <p className="text-base sm:text-lg text-[#28231E]/80 leading-relaxed">
                Interested in becoming a Mom's Cloud Kitchen franchise partner? Fill out your application
                below — your lead will be sent <strong>directly to Founder Aditya Pushpa Kuttan on WhatsApp</strong> for
                fast-track priority review.
              </p>
            </div>

            {/* Atmosphere Image */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-[#28231E]/10 aspect-[16/10] bg-[#28231E]/5">
              <img
                src={BRAND_INFO.images.facility}
                alt="Mom's Cloud Kitchen hygiene operations"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Direct Contact Cards */}
            <div className="p-6 bg-[#F6EBDD] rounded-2xl border border-[#28231E]/10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174B35] block">
                Direct Communication Channels
              </span>

              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#28231E]/8 hover:border-[#174B35]/40 transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-lg bg-[#174B35]/10 text-[#174B35] flex items-center justify-center shrink-0 group-hover:bg-[#174B35] group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#28231E]/60 block font-medium">WhatsApp Support (Fast Response)</span>
                  <span className="text-sm font-bold text-[#174B35]">{BRAND_INFO.phone}</span>
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
                  <span className="text-xs text-[#28231E]/60 block font-medium">Official Email Desk</span>
                  <span className="text-sm font-bold text-[#28231E]">{BRAND_INFO.email}</span>
                </div>
              </a>
            </div>
          </ScrollReveal>

          {/* Right Column: Lead Generation Form */}
          <ScrollReveal direction="up" delay={0.25} className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#28231E]/10">
              {submitSuccess ? (
                /* Confirmed Success State */
                <div className="text-center py-10 px-2 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#174B35]/10 text-[#174B35] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#174B35]" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#174B35] mb-3">
                    Enquiry Prepared, {formData.fullName}!
                  </h3>
                  <p className="text-base text-[#28231E]/80 max-w-md mx-auto leading-relaxed mb-6">
                    Your franchise application for <strong>{formData.franchiseType}</strong> in{' '}
                    <strong>{formData.city}</strong> has been routed to <strong>WhatsApp (+91 98924 47728)</strong> and
                    registered with founder Aditya Pushpa Kuttan.
                  </p>

                  <div className="p-4 bg-[#FFF8EC] rounded-xl border border-[#E87924]/20 text-xs text-[#28231E]/80 max-w-md mx-auto text-left mb-6">
                    <p className="font-bold text-[#174B35] mb-1">✓ What Happens Next:</p>
                    <p>
                      If WhatsApp opened in a new tab, simply press <strong>Send</strong> to deliver your message. If it did not open automatically, click the button below:
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
                      <span>Send via WhatsApp Chat</span>
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
                          brand: BRAND_INFO.name,
                          franchiseType: 'Single Franchisee',
                          message: '',
                          consent: false,
                        });
                      }}
                      className="inline-flex items-center justify-center text-sm font-semibold text-[#174B35] bg-[#F6EBDD] hover:bg-[#FFF8EC] px-6 py-3.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="border-b border-[#28231E]/8 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-bold text-2xl text-[#174B35]">
                        Franchise Partnership Form
                      </h3>
                      <span className="text-[11px] font-bold text-[#174B35] bg-[#174B35]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        WhatsApp Instant Route
                      </span>
                    </div>
                    <p className="text-xs text-[#28231E]/60 mt-1">
                      All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div className="leading-snug">
                        <strong>Submission Issue:</strong> {submitError}
                      </div>
                    </div>
                  )}

                  {/* Field: Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-[#28231E] mb-1.5"
                    >
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
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Two-Column: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Field: Contact Number */}
                    <div>
                      <label
                        htmlFor="contactNumber"
                        className="block text-sm font-semibold text-[#28231E] mb-1.5"
                      >
                        Contact / WhatsApp Number <span className="text-red-500">*</span>
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
                        <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.contactNumber}</p>
                      )}
                    </div>

                    {/* Field: Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#28231E] mb-1.5"
                      >
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
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Field: Target City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-[#28231E] mb-1.5"
                    >
                      Target City / Expansion Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={(e) => {
                        setFormData({ ...formData, city: e.target.value });
                        if (errors.city) setErrors({ ...errors, city: undefined });
                      }}
                      placeholder="e.g. Mumbai, Vasai, Virar, Pune, Bangalore, etc."
                      className={`w-full px-4 py-3 rounded-xl border bg-[#FFF8EC]/40 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm ${
                        errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-[#28231E]/15'
                      }`}
                      required
                    />
                    {errors.city && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.city}</p>
                    )}
                  </div>

                  {/* Field: Franchise Model Radio Group */}
                  <div>
                    <label className="block text-sm font-semibold text-[#28231E] mb-2">
                      Preferred Franchise Model <span className="text-red-500">*</span>
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
                          onChange={() =>
                            setFormData({ ...formData, franchiseType: 'Single Franchisee' })
                          }
                          className="mt-1 accent-[#174B35]"
                        />
                        <div>
                          <span className="text-sm font-bold text-[#174B35] block">
                            Single Franchisee
                          </span>
                          <span className="text-xs text-[#28231E]/70 block mt-0.5">
                            Kitchen ₹3.99L (All-Inclusive ₹6.49L)
                          </span>
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
                          onChange={() =>
                            setFormData({ ...formData, franchiseType: 'Master Franchise' })
                          }
                          className="mt-1 accent-[#174B35]"
                        />
                        <div>
                          <span className="text-sm font-bold text-[#174B35] block">
                            Master Franchise
                          </span>
                          <span className="text-xs text-[#28231E]/70 block mt-0.5">
                            Regional Multi-Unit Territory ₹12.50L
                          </span>
                        </div>
                      </label>
                    </div>
                    {errors.franchiseType && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.franchiseType}</p>
                    )}
                  </div>

                  {/* Field: Optional Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#28231E] mb-1.5"
                    >
                      Additional Details / Background{' '}
                      <span className="text-xs font-normal text-[#28231E]/60">(Optional)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your background, kitchen space (if any), timeline or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-[#28231E]/15 bg-[#FFF8EC]/40 text-[#28231E] placeholder:text-[#28231E]/40 focus:outline-none focus:ring-2 focus:ring-[#E87924] transition-all text-sm resize-y"
                    />
                  </div>

                  {/* Field: Consent Checkbox */}
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
                        I agree to receive franchise details and connect with Mom's Cloud Kitchen via call,
                        WhatsApp, or email. <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-xs text-red-600 mt-1.5 font-medium">{errors.consent}</p>
                    )}
                  </div>

                  {/* Primary Submit Button: WhatsApp Routed */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-[#E87924] hover:bg-[#D16719] active:bg-[#B95732] disabled:bg-[#E87924]/60 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E87924]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Routing Lead to WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit & Send on WhatsApp</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Secondary WhatsApp Direct Link */}
                    <a
                      href={`https://wa.me/919892447728?text=${encodeURIComponent(
                        "Hello Aditya, I am interested in Mom's Cloud Kitchen franchise opportunity. Please share the details."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-6 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#25D366]/30 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>Quick Chat with Founder on WhatsApp (+91 98924 47728)</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-center text-[#28231E]/60">
                    Lead is routed to WhatsApp with backup notification to <strong>{BRAND_INFO.email}</strong>.
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
