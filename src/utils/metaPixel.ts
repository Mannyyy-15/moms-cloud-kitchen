/**
 * Meta Ads Pixel & Conversion Tracking Integration Utility
 * Configurable via VITE_META_PIXEL_ID in environment or window._META_PIXEL_ID
 * Designed for compliance: zero PII passed in custom event params, duplicate lead prevention.
 */

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    _META_PIXEL_ID?: string;
  }
}

let hasTrackedLead = false;

export function getMetaPixelId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  return (
    import.meta.env.VITE_META_PIXEL_ID ||
    window._META_PIXEL_ID ||
    ''
  );
}

/**
 * Initialize Meta Pixel script cleanly if a Pixel ID is provided
 */
export function initMetaPixel(): void {
  if (typeof window === 'undefined') return;

  const pixelId = getMetaPixelId();
  if (!pixelId) {
    // Pixel not configured; silent fallback so app works seamlessly
    return;
  }

  // Check if fbq is already initialized
  if (window.fbq) return;

  try {
    /* Standard Meta Pixel snippet */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    trackPageView();
  } catch (err) {
    console.warn('Meta Pixel initialization warning:', err);
  }
}

/**
 * Fires PageView on route or landing
 */
export function trackPageView(): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
}

/**
 * Fires ViewContent when user views franchise model, calculator or key opportunity details
 */
export function trackViewContent(contentName: string, category: string = 'Franchise Opportunity'): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: category,
    });
  }
}

/**
 * Fires Lead event ONLY after confirmed form submission.
 * Deduplicates to prevent accidental multiple event counts.
 */
export function trackFranchiseLead(details?: { model?: string; city?: string }): void {
  if (hasTrackedLead) return; // Prevent in-memory duplicate
  if (typeof window === 'undefined') return;

  try {
    if (sessionStorage.getItem('moms_lead_tracked') === 'true') {
      return; // Prevent session duplicate
    }
  } catch {}

  hasTrackedLead = true;

  try {
    sessionStorage.setItem('moms_lead_tracked', 'true');
  } catch {}

  if (window.fbq) {
    // Do NOT send sensitive PII to Meta Pixel
    window.fbq('track', 'Lead', {
      content_name: details?.model || 'Single Franchisee',
      content_category: 'Franchise Application',
      value: details?.model === 'Master Franchise' ? 1250000 : 399000,
      currency: 'INR',
    });
  }
}
