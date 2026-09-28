import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowUpRightIcon, BookmarkIcon, CheckIcon, FlagIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ResourceIcon } from '../components/ResourceIcon';
import { BookCover } from '../components/BookCover';
import { ResourceCard } from '../components/ResourceCard';
import { Badge } from '../components/Badge';
import { getRelatedResources } from '../utils/related';
import { buttonClass, containerClass } from '../utils/styles';
import { hostnameOf } from '../utils/url';
import type { Book, Resource } from '../types/resource';

export function Detail() {
  const { detail, resources, books, t, catLabel, langLabel, isSaved, toggleSave, navigate } = useApp();
  const [reported, setReported] = useState(false);
  const isBook = detail?.type === 'book';
  const item: Resource | Book | undefined = detail ?
  isBook ?
  books.find((b) => b.id === detail.id) :
  resources.find((r) => r.id === detail.id) :
  undefined;

  if (!item) {
    return (
      <section className={`${containerClass} py-16`}>
        <p className="text-sm text-muted">{t('no_results')}</p>
      </section>);

  }

  const key = (isBook ? 'b:' : 'r:') + item.id;
  const saved = isSaved(key);
  const book = isBook ? item as Book : null;
  const res = !isBook ? item as Resource : null;
  const cta = book ? t('access_book') : res!.type === 'tool' ? t('open_tool') : res!.type === 'course' ? t('view_course') : t('visit_website');
  const related = res ? getRelatedResources(res, resources, 4) : [];

  const metaRows: [string, React.ReactNode][] = book ?
  [
  [t('author'), book.author],
  [t('publisher'), book.publisher || '\u2014'],
  [t('year'), <span className="font-mono">{book.year}</span>],
  [t('pages'), <span className="font-mono">{book.pages}</span>],
  [t('category'), catLabel(book.category)],
  [t('language'), langLabel(book.language)],
  [t('access_type'), t(book.accessType)],
  [t('tags'), book.tags.join(', ')]] :

  [
  [t('resource_type'), <span className="capitalize">{res!.type}</span>],
  [t('category'), catLabel(res!.category)],
  [t('pricing'), t(res!.pricing)],
  [t('language'), langLabel(res!.language)]];


  return (
    <section className={`${containerClass} pt-8 md:pt-12`}>
      <button
        type="button"
        onClick={() => navigate('explore')}
        className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink">
        
        <ArrowLeftIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
        {t('nav_explore')}
      </button>

      <div className="mt-8 grid gap-10 md:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
        <aside className="md:sticky md:top-24 md:self-start">
          {book ?
          <div className="max-w-[200px] md:max-w-none">
              <BookCover title={book.title} author={book.author} size="lg" />
            </div> :

          <ResourceIcon name={res!.name} url={res!.url} size="xl" />
          }
          <div className="mt-6 flex flex-col gap-2.5">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg', 'w-full')}>
              {cta}
              <ArrowUpRightIcon className="h-4 w-4 rtl:-scale-x-100" />
            </a>
            <button
              type="button"
              onClick={() => toggleSave(key)}
              aria-pressed={saved}
              className={buttonClass('outline', 'lg', `w-full ${saved ? 'border-accent/40 bg-accent-soft text-accent hover:bg-accent-soft' : ''}`)}>
              
              {saved ? <CheckIcon className="h-4 w-4" /> : <BookmarkIcon className="h-4 w-4" />}
              {saved ? t('saved') : t('save')}
            </button>
            {reported ?
            <span className="flex h-10 items-center justify-center gap-1.5 text-sm text-muted">
                <CheckIcon className="h-4 w-4 text-success" />
                {t('report_broken')}
              </span> :

            <button type="button" onClick={() => setReported(true)} className={buttonClass('ghost', 'md', 'w-full')}>
                <FlagIcon className="h-3.5 w-3.5" />
                {t('report_broken')}
              </button>
            }
          </div>
        </aside>

        <div className="min-w-0">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-[-0.035em] md:text-[2.75rem]">{book ? book.title : res!.name}</h1>
          {book ?
          <p className="mt-3 font-serif text-lg italic text-muted">{book.author}</p> :

          <p className="mt-3 font-mono text-sm text-muted">{hostnameOf(res!.url)}</p>
          }

          {res &&
          <div className="mt-5 flex flex-wrap gap-1.5">
              <Badge>{t(res.pricing)}</Badge>
              <Badge>{catLabel(res.category)}</Badge>
              <Badge>{res.type}</Badge>
              {res.featured && <Badge tone="success">{t('featured')}</Badge>}
            </div>
          }

          {item.description ?
          <p className="mt-6 max-w-[62ch] text-[17px] leading-[1.7] text-ink">{item.description}</p> :

          <p className="mt-6 text-[15px] italic text-muted">{t('no_description')}</p>
          }

          <dl className="mt-8 max-w-2xl border-t border-line">
            {metaRows.map(([dt, dd]) =>
            <div key={dt} className="grid grid-cols-[minmax(0,140px)_1fr] gap-4 border-b border-line py-3 text-sm">
                <dt className="text-muted">{dt}</dt>
                <dd className="text-ink">{dd}</dd>
              </div>
            )}
          </dl>

          {res && res.tags.length > 0 &&
          <div className="mt-6 flex flex-wrap gap-1.5">
              {res.tags.map((tag) =>
            <span key={tag} className="rounded-md border border-line bg-bg px-2 py-1 font-mono text-xs text-muted">
                  #{tag}
                </span>
            )}
            </div>
          }

          {related.length > 0 &&
          <div className="mt-14">
              <h2 className="mb-5 text-lg font-semibold tracking-tight">{t('related_resources')}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) =>
              <ResourceCard key={r.id} r={r} />
              )}
              </div>
            </div>
          }
        </div>
      </div>
    </section>);

}