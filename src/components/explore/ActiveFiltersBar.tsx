import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import type { FilterType } from '../../types/app';

export function ActiveFiltersBar() {
  const { activeFilters, toggleFilter, clearAllFilters, catLabel, t, langLabel } = useApp();

  function label(type: FilterType, value: string) {
    if (type === 'category') return catLabel(value);
    if (type === 'pricing') return t(value);
    return langLabel(value);
  }

  const chips: {type: FilterType;value: string;}[] = [];
  (['category', 'pricing', 'language'] as FilterType[]).forEach((type) => {
    activeFilters[type].forEach((value) => chips.push({ type, value }));
  });

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence initial={false} mode="popLayout">
        {chips.map((c) => {
          const text = label(c.type, c.value);
          return (
            <motion.span
              layout
              key={c.type + ':' + c.value}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex h-7 items-center gap-1 rounded-full bg-accent-soft ps-3 pe-1 text-[13px] font-medium text-accent">
              
              {text}
              <button
                type="button"
                onClick={() => toggleFilter(c.type, c.value)}
                aria-label={text}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-150 hover:bg-accent/15">
                
                <XIcon className="h-3 w-3" strokeWidth={2.5} />
              </button>
            </motion.span>);

        })}
      </AnimatePresence>
      <button
        type="button"
        onClick={clearAllFilters}
        className="ms-1 text-[13px] font-medium text-muted underline decoration-line underline-offset-4 transition-colors duration-150 hover:text-ink hover:decoration-ink">
        
        {t('clear_all')}
      </button>
    </div>);

}