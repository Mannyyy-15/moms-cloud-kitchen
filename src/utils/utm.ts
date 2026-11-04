import { UtmParams } from '../types';

const STORAGE_KEY = 'moms_utm_attribution';

/**
 * Extracts UTM parameters and Facebook Click ID from the current URL search query
 * and stores them in sessionStorage to preserve attribution across navigation.
 */
export function captureAndStoreUtm(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const newUtms: UtmParams = {};

    const keys: (keyof UtmParams)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'fbclid',
    ];

    let hasAny = false;
    for (const key of keys) {
      const val = urlParams.get(key);
      if (val) {
        newUtms[key] = val.trim();
        hasAny = true;
      }
    }

    // Retrieve existing stored UTMs if any
    const rawStored = sessionStorage.getItem(STORAGE_KEY);
    const existingUtms: UtmParams = rawStored ? JSON.parse(rawStored) : {};

    // Merge: prioritize current URL params if present, otherwise keep previously stored
    const merged: UtmParams = { ...existingUtms, ...(hasAny ? newUtms : {}) };

    if (hasAny || Object.keys(merged).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }

    return merged;
  } catch (e) {
    console.warn('Unable to access sessionStorage for UTMs:', e);
    return {};
  }
}

/**
 * Returns currently stored UTM parameters for including in lead payloads
 */
export function getStoredUtm(): UtmParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
