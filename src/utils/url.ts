export function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch (e) {
    return '';
  }
}

export function faviconUrl(url: string): string | null {
  try {
    const hostname = new URL(url).hostname;
    if (!hostname) return null;
    return 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(hostname) + '&sz=64';
  } catch (e) {
    return null;
  }
}