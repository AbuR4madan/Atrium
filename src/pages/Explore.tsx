import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, SearchIcon, SearchXIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useFilteredResources } from '../hooks/useFilteredResources';
import { ResourceCard } from '../components/ResourceCard';
import { FilterList } from '../components/explore/FilterList';
import { ActiveFiltersBar } from '../components/explore/ActiveFiltersBar';
import { EmptyState } from '../components/EmptyState';
import { countFilters, getFilterGroups } from '../utils/filters';
import { buttonClass, containerClass } from '../utils/styles';
import type { SortBy } from '../types/app';

export function Explore() {
  const {
    t, lang, langLabel, resources, activeFilters, toggleFilter, clearAllFilters,
    searchQuery, setSearchQuery, sortBy, setSortBy, visibleCount, loadMore, openMobileFilters
  } = useApp();
  const filtered = useFilteredResources();
  const total = filtered.length;
  const visible = filtered.slice(0, visibleCount);
  const activeCount = countFilters(activeFilters);
  const countText = t(activeCount ? 'results_matching' : 'results_count', { count: total });
  const groups = useMemo(() => getFilterGroups(resources, lang, t, langLabel), [resources, lang, t, langLabel]);
  const filterKey = [
  Array.from(activeFilters.category).join(','),
  Array.from(activeFilters.pricing).join(','),
  Array.from(activeFilters.language).join(','),
  sortBy].
  join('|');

  const sortOpts: [SortBy, string][] = [['relevance', 'sort_relevance'], ['popularity', 'sort_popularity'], ['alpha', 'sort_alpha']];

  return (
    <section className={`${containerClass} pt-10 md:pt-14`}>
      <h1 className="text-3xl font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.1]">{t('explore_title')}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[232px_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pe-3">
            <FilterList groups={groups} selected={activeFilters} onToggle={toggleFilter} />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative min-w-0 flex-1 basis-full sm:basis-auto">
              <SearchIcon className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_resources')}
                aria-label={t('search')}
                className="h-11 w-full rounded-lg border border-line bg-surface pe-10 ps-10 text-[15px] text-ink outline-none transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-muted/80 hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent/10" />
              
              {searchQuery &&
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={t('clear_all')}
                className="absolute end-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink">
                
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              }
            </div>
            <div className="relative flex-1 sm:flex-none">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                aria-label={t('sort_relevance')}
                className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-line bg-surface pe-9 ps-3.5 text-sm font-medium text-ink outline-none transition-[border-color,box-shadow] duration-150 hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent/10">
                
                {sortOpts.map(([v, k]) =>
                <option key={v} value={v}>{t(k)}</option>
                )}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
            <button
              type="button"
              onClick={openMobileFilters}
              className={buttonClass('outline', 'md', 'h-11 flex-1 sm:flex-none lg:hidden')}>
              
              <SlidersHorizontalIcon className="h-4 w-4" />
              {t('filters')}
              {activeCount > 0 &&
              <span className="rounded-full bg-accent px-1.5 font-mono text-[11px] leading-[18px] text-accent-fg">{activeCount}</span>
              }
            </button>
          </div>

          <div className="mt-5 flex min-h-7 flex-wrap items-center gap-x-4 gap-y-3">
            <motion.span
              key={total + ':' + activeCount}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              aria-live="polite"
              className="text-sm text-muted">
              
              {countText}
            </motion.span>
            {activeCount > 0 && <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />}
            <ActiveFiltersBar />
          </div>

          <motion.div
            key={filterKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6">
            
            {total === 0 ?
            <EmptyState
              icon={<SearchXIcon className="h-5 w-5" />}
              title={t('no_results_title')}
              description={t('no_results_desc')}
              action={
              activeCount > 0 ?
              <button type="button" onClick={clearAllFilters} className={buttonClass('outline')}>
                      {t('clear_all')}
                    </button> :
              undefined
              } /> :


            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
                {visible.map((r) =>
              <ResourceCard key={r.id} r={r} />
              )}
              </div>
            }

            {total > visibleCount &&
            <div className="mt-12 flex flex-col items-center gap-3">
                <div className="h-[3px] w-40 overflow-hidden rounded-full bg-sunken" aria-hidden="true">
                  <div className="h-full rounded-full bg-accent/70" style={{ width: `${visible.length / total * 100}%` }} />
                </div>
                <span className="font-mono text-xs text-muted">
                  {visible.length} / {total}
                </span>
                <button type="button" onClick={loadMore} className={buttonClass('outline', 'lg', 'mt-1 min-w-[180px]')}>
                  {t('load_more')}
                </button>
              </div>
            }
          </motion.div>
        </div>
      </div>
    </section>);

}