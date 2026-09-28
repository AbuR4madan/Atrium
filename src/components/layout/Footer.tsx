import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { containerClass } from '../../utils/styles';
import type { Page } from '../../types/app';

export function Footer() {
  const { t, navigate } = useApp();

  const columns: {titleKey: string;links: {page: Page;key: string;}[];}[] = [
  { titleKey: 'nav_browse', links: [{ page: 'explore', key: 'nav_explore' }, { page: 'books', key: 'nav_books' }, { page: 'categories', key: 'nav_categories' }] },
  { titleKey: 'nav_contribute', links: [{ page: 'submit', key: 'submit_resource' }] },
  { titleKey: 'nav_about', links: [{ page: 'about', key: 'about_atrium' }] }];


  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className={`${containerClass} grid gap-10 py-14 sm:grid-cols-3 md:grid-cols-[2fr_1fr_1fr_1fr]`}>
        <div className="sm:col-span-3 md:col-span-1">
          <h3 className="text-xl font-bold tracking-[-0.045em]">
            Atrium<span className="text-accent">.</span>
          </h3>
          <p className="mt-3 max-w-xs font-serif text-[15px] italic leading-relaxed text-muted">{t('footer_about')}</p>
        </div>
        {columns.map((col) =>
        <div key={col.titleKey}>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{t(col.titleKey)}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) =>
            <li key={l.key}>
                  <button
                type="button"
                onClick={() => navigate(l.page)}
                className="text-sm text-ink transition-colors duration-150 hover:text-accent">
                
                    {t(l.key)}
                  </button>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-line">
        <div className={`${containerClass} flex flex-wrap justify-between gap-3 py-6 text-xs text-muted`}>
          <span>{t('copyright')}</span>
          <span className="font-mono">{t('sample_data')}</span>
        </div>
      </div>
    </footer>);

}