import { UtmParams } from '../types';

const STORAGE_KEY = 'moms_utm_attribution';

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
] as const;

const MAX_VALUE_LENGTH = 200;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null)
  );
}

function sanitizeValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, MAX_VALUE_LENGTH);
}

function sanitizeUtm(value: unknown): UtmParams {
  if (!isPlainObject(value)) return {};

  const result: UtmParams = {};
  for (const key of UTM_KEYS) {
    const clean = sanitizeValue(value[key]);
    if (clean) result[key] = clean;
  }
  return result;
}

function readStoredUtm(): UtmParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return sanitizeUtm(JSON.parse(raw));
  } catch {
    return {};
  }
}

function writeStoredUtm(utm: UtmParams): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {}
}

/**
 * Extracts UTM parameters and Facebook Click ID from the current URL search query
 * and stores them in sessionStorage to preserve attribution across navigation.
 */
export function captureAndStoreUtm(): UtmParams {
  if (typeof window === 'undefined') return {};

  let newUtms: UtmParams = {};
  try {
    const urlParams = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const clean = sanitizeValue(urlParams.get(key));
      if (clean) newUtms[key] = clean;
    }
  } catch {
    newUtms = {};
  }

  const hasAny = Object.keys(newUtms).length > 0;
  const existingUtms = readStoredUtm();
  const merged: UtmParams = { ...existingUtms, ...newUtms };

  if (hasAny || Object.keys(existingUtms).length > 0) {
    writeStoredUtm(merged);
  }

  return merged;
}

/**
 * Returns currently stored UTM parameters for including in lead payloads
 */
export function getStoredUtm(): UtmParams {
  if (typeof window === 'undefined') return {};
  return readStoredUtm();
}

export function pickUtms(value: unknown): UtmParams {
  return sanitizeUtm(value);
}
