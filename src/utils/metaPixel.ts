/**
 * Meta Ads Pixel & Conversion Tracking Integration Utility
 * Configurable via VITE_META_PIXEL_ID in environment or window._META_PIXEL_ID
 * Designed for compliance: zero PII passed in custom event params, duplicate lead prevention.
 */

type FbqFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: FbqFunction;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
    _META_PIXEL_ID?: string;
  }
}

const LEAD_VALUES: Record<string, number> = {
  'Cloud Kitchen': 400000,
  'Cloud Kitchen + Dine-In': 600000,
  'Master Franchise (Cloud Kitchen)': 2000000,
  'Master Franchise (Cloud + Dine-In)': 2500000,
};

const LEGACY_MODEL_MAP: Record<string, string> = {
  'Single Franchisee': 'Cloud Kitchen',
  'Master Franchise': 'Master Franchise (Cloud Kitchen)',
};

let hasTrackedLead = false;

function normalizeModel(model?: string): string {
  if (!model) return 'Franchise Application';
  return LEGACY_MODEL_MAP[model] ?? model;
}

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
    (function (
      f: Window & { fbq?: FbqFunction; _fbq?: FbqFunction },
      b: Document,
      e: string,
      v: string
    ) {
      if (f.fbq) return;
      let n: FbqFunction;
      n = ((...args: unknown[]) => {
        if (n.callMethod) {
          n.callMethod(...args);
        } else {
          n.queue.push(args);
        }
      }) as FbqFunction;
      f.fbq = n;
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === 'function') {
      fbq('init', pixelId);
    }
    trackPageView();
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('Meta Pixel initialization warning:', err);
    }
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
 * Fires Lead event ONLY after confirmed form submission.
 * Deduplicates to prevent accidental multiple event counts.
 */
export function trackFranchiseLead(details?: { model?: string; city?: string }): void {
  if (hasTrackedLead) return;
  if (typeof window === 'undefined' || !window.fbq) return;

  try {
    if (sessionStorage.getItem('moms_lead_tracked') === 'true') {
      return;
    }
  } catch {}

  const model = normalizeModel(details?.model);

  try {
    window.fbq('track', 'Lead', {
      content_name: model,
      content_category: 'Franchise Application',
      value: LEAD_VALUES[model] ?? 0,
      currency: 'INR',
    });
  } catch {
    return;
  }

  hasTrackedLead = true;

  try {
    sessionStorage.setItem('moms_lead_tracked', 'true');
  } catch {}
}
