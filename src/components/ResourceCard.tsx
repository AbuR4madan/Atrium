import React from 'react';
import { ArrowUpRightIcon, BookmarkIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ResourceIcon } from './ResourceIcon';
import { buttonClass, pricingDot } from '../utils/styles';
import { hostnameOf } from '../utils/url';
import type { Resource } from '../types/resource';

export function ResourceCard({ r }: {r: Resource;}) {
  const { t, catLabel, isSaved, toggleSave, openDetail, toggleFilter, page, navigate } = useApp();
  const saved = isSaved('r:' + r.id);
  const cta = r.type === 'tool' ? t('open_tool') : r.type === 'course' ? t('view_course') : t('visit_website');
  const domain = hostnameOf(r.url);
  const category = catLabel(r.category);

  function onTagClick() {
    toggleFilter('category', r.category);
    if (page !== 'explore') navigate('explore');
  }

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card">
      <div className="flex items-start gap-3.5">
        <ResourceIcon name={r.name} url={r.url} />
        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            <button
              type="button"
              onClick={() => openDetail('resource', r.id)}
              className="line-clamp-2 text-start outline-none transition-colors duration-150 group-hover:text-accent after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-accent">
              
              {r.name}
            </button>
          </h3>
          <div className="mt-1 flex min-w-0 items-center gap-2 text-xs text-muted">
            {domain && <span className="truncate font-mono">{domain}</span>}
            <span className="flex shrink-0 items-center gap-1.5">
              <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${pricingDot[r.pricing] || 'bg-muted'}`} />
              {t(r.pricing)}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleSave('r:' + r.id)}
          aria-label={saved ? t('saved') : t('save')}
          aria-pressed={saved}
          className={`relative z-10 -me-1.5 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-[background-color,color,transform] duration-150 ease-out hover:bg-sunken active:scale-90 ${
          saved ? 'text-accent' : 'text-muted hover:text-ink'}`
          }>
          
          <BookmarkIcon className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {r.description && <p className="mt-3.5 line-clamp-2 text-sm leading-relaxed text-muted">{r.description}</p>}

      <div className="mt-auto flex items-center gap-2 pt-5">
        <button
          type="button"
          onClick={onTagClick}
          title={category}
          className="relative z-10 min-w-0 truncate rounded-md border border-line bg-bg px-2 py-1 text-xs text-muted transition-colors duration-150 hover:border-accent hover:text-accent">
          
          {category}
        </button>
        <a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass('primary', 'sm', 'relative z-10 ms-auto shrink-0')}>
          
          {cta}
          <ArrowUpRightIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
        </a>
      </div>
    </article>);

}