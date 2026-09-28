import { CATEGORIES } from '../data/categories';
import type { Filters, FilterType, Lang } from '../types/app';
import type { Resource } from '../types/resource';
import type { TranslateFn } from './i18n';

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterGroup {
  type: FilterType;
  labelKey: string;
  options: FilterOption[];
}

export function emptyFilters(): Filters {
  return { category: new Set(), pricing: new Set(), language: new Set() };
}

export function cloneFilters(f: Filters): Filters {
  return { category: new Set(f.category), pricing: new Set(f.pricing), language: new Set(f.language) };
}

export function countFilters(f: Filters): number {
  return f.category.size + f.pricing.size + f.language.size;
}

export function countResources(resources: Resource[], key: 'category' | 'pricing' | 'language', value: string): number {
  return resources.filter((r) => r[key] === value).length;
}

export function getFilterGroups(resources: Resource[], lang: Lang, t: TranslateFn, langLabel: (v: string) => string): FilterGroup[] {
  return [
  {
    type: 'category',
    labelKey: 'filter_category',
    options: CATEGORIES.map((c) => ({ value: c.id, label: c[lang], count: countResources(resources, 'category', c.id) }))
  },
  {
    type: 'pricing',
    labelKey: 'filter_pricing',
    options: ['free', 'freemium', 'paid'].map((v) => ({ value: v, label: t(v), count: countResources(resources, 'pricing', v) }))
  },
  {
    type: 'language',
    labelKey: 'filter_language',
    options: ['english', 'arabic'].map((v) => ({ value: v, label: langLabel(v), count: countResources(resources, 'language', v) }))
  }];

}