export const STORAGE_KEYS = {
  saved: 'atrium_saved_v1',
  lang: 'atrium_lang_v1',
  theme: 'atrium_theme_v1'
};

export function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

export function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {

    /* storage unavailable */}
}

export function readSavedSet(): Set<string> {
  const raw = safeGetItem(STORAGE_KEYS.saved);
  if (raw === null) return new Set();
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? new Set(arr.map(String)) : new Set();
  } catch (e) {
    return new Set();
  }
}