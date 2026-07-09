// Functional cookie-consent state (persisted in localStorage).
// The site currently loads NO third-party trackers; the only stored item is the
// consent choice itself. When analytics/marketing are added later, gate them
// inside applyConsent() based on value.analytics.

export const CONSENT_KEY = "dbnt_cookie_consent";
export const CONSENT_VERSION = 1;

export const getConsent = () => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const applyConsent = (value) => {
  // No third-party trackers are loaded on this site yet.
  // Example for the future:
  // if (value?.analytics) { /* load analytics */ } else { /* ensure disabled */ }
  return value;
};

export const setConsent = (analytics) => {
  const value = {
    necessary: true,
    analytics: !!analytics,
    ts: new Date().toISOString(),
    v: CONSENT_VERSION,
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* ignore storage errors */
  }
  applyConsent(value);
  window.dispatchEvent(new CustomEvent("dbnt-consent-change", { detail: value }));
  return value;
};

export const clearConsent = () => {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("dbnt-consent-change", { detail: null }));
};

// Ask the CookieBanner to reopen (used from footer / cookie policy page).
export const openCookieSettings = () => {
  window.dispatchEvent(new CustomEvent("dbnt-open-cookie-settings"));
};

// Apply stored consent on app boot.
export const initConsent = () => {
  const value = getConsent();
  if (value) applyConsent(value);
  return value;
};
