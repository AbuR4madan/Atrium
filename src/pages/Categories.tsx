import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { CATEGORIES } from '../data/categories';
import { PageHeader } from '../components/PageHeader';
import { containerClass } from '../utils/styles';
import { countResources } from '../utils/filters';

export function Categories() {
  const { t, lang, resources, exploreCategory } = useApp();
  const rows = CATEGORIES.map((c) => ({ c, count: countResources(resources, 'category', c.id) }));
  const max = Math.max(1, ...rows.map((r) => r.count));

  return (
    <section className={`${containerClass} pt-10 md:pt-14`}>
      <PageHeader title={t('nav_categories')} meta={<span className="font-mono">{CATEGORIES.length}</span>} />
      <ul className="mt-2 grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
        {rows.map(({ c, count }) =>
        <li key={c.id} className="border-b border-line">
            <button
            type="button"
            onClick={() => exploreCategory(c.id)}
            className="group -mx-3 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-lg px-3 py-4 text-start transition-colors duration-150 hover:bg-sunken">
            
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-medium text-ink transition-colors duration-150 group-hover:text-accent">
                  {c[lang]}
                </span>
                <span className="mt-2.5 block h-[3px] overflow-hidden rounded-full bg-sunken group-hover:bg-surface" aria-hidden="true">
                  <span className="block h-full rounded-full bg-accent/50" style={{ width: `${Math.max(4, count / max * 100)}%` }} />
                </span>
              </span>
              <span className="shrink-0 whitespace-nowrap font-mono text-xs text-muted">{t('results_count', { count })}</span>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-accent opacity-0 transition-[opacity,transform] duration-150 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </button>
          </li>
        )}
      </ul>
    </section>);

}