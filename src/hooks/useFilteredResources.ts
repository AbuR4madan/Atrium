import { useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import { hay } from '../utils/search';
import type { Resource } from '../types/resource';

export function useFilteredResources(): Resource[] {
  const { resources, activeFilters, searchQuery, sortBy, catLabel } = useApp();
  return useMemo(() => {
    const f = activeFilters;
    const q = searchQuery.toLowerCase();
    let list = resources.filter((r) => {
      if (f.category.size && !f.category.has(r.category)) return false;
      if (f.pricing.size && !f.pricing.has(r.pricing)) return false;
      if (f.language.size && !f.language.has(r.language)) return false;
      if (searchQuery && !hay(r, catLabel).includes(q)) return false;
      return true;
    });
    if (sortBy === 'popularity') list = list.slice().sort((a, b) => b.popularity - a.popularity);else
    if (sortBy === 'alpha') list = list.slice().sort((a, b) => a.name.localeCompare(b.name));else
    list = list.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.popularity - a.popularity);
    return list;
  }, [resources, activeFilters, searchQuery, sortBy, catLabel]);
}