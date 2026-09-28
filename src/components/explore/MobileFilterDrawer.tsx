import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { FilterList } from './FilterList';
import { cloneFilters, emptyFilters, getFilterGroups } from '../../utils/filters';
import { buttonClass, iconButtonClass } from '../../utils/styles';
import type { Filters, FilterType } from '../../types/app';

export function MobileFilterDrawer() {
  const { mobileFiltersOpen, closeMobileFilters, activeFilters, applyFilters, t, resources, lang, langLabel } = useApp();
  const [pending, setPending] = useState<Filters>(() => cloneFilters(activeFilters));
  const groups = useMemo(() => getFilterGroups(resources, lang, t, langLabel), [resources, lang, t, langLabel]);

  useEffect(() => {
    if (mobileFiltersOpen) setPending(cloneFilters(activeFilters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileFiltersOpen]);

  function togglePending(type: FilterType, value: string) {
    setPending((prev) => {
      const next = new Set(prev[type]);
      if (next.has(value)) next.delete(value);else
      next.add(value);
      return { ...prev, [type]: next };
    });
  }

  function apply() {
    applyFilters(pending);
    closeMobileFilters();
  }

  return (
    <AnimatePresence>
      {mobileFiltersOpen &&
      <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
          <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeMobileFilters} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('filters')}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className="relative flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-2xl border border-b-0 border-line bg-surface shadow-pop">
          
            <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-line-strong" aria-hidden="true" />
            <div className="flex items-center justify-between px-5 pb-3 pt-2">
              <h2 className="text-lg font-semibold tracking-tight">{t('filters')}</h2>
              <button type="button" onClick={closeMobileFilters} aria-label={t('close')} className={iconButtonClass}>
                <XIcon className="h-[18px] w-[18px]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto border-y border-line px-5 py-5">
              <FilterList groups={groups} selected={pending} onToggle={togglePending} />
            </div>
            <div className="flex gap-3 px-5 py-4">
              <button type="button" onClick={() => setPending(emptyFilters())} className={buttonClass('outline', 'lg', 'flex-1')}>
                {t('clear_all')}
              </button>
              <button type="button" onClick={apply} className={buttonClass('primary', 'lg', 'flex-[1.4]')}>
                {t('apply_filters')}
              </button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}