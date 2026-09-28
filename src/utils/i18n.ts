import { i18n } from '../data/i18n';
import type { Lang } from '../types/app';

export type TranslateFn = (key: string, params?: Record<string, string | number>) => string;

export function translate(lang: Lang, key: string, params?: Record<string, string | number>): string {
  const dict = i18n[lang] || i18n.en;
  let s = dict[key] !== undefined ? dict[key] : i18n.en[key] !== undefined ? i18n.en[key] : key;
  if (params) {
    for (const k in params) s = s.replace('{' + k + '}', String(params[k]));
  }
  return s;
}