import React from 'react';
import { BookmarkIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ResourceCard } from '../components/ResourceCard';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { buttonClass, containerClass } from '../utils/styles';

export function Saved() {
  const { t, resources, books, isSaved, navigate } = useApp();
  const savedResources = resources.filter((r) => isSaved('r:' + r.id));
  const savedBooks = books.filter((b) => isSaved('b:' + b.id));
  const total = savedResources.length + savedBooks.length;

  return (
    <section className={`${containerClass} pt-10 md:pt-14`}>
      <PageHeader title={t('saved')} meta={total > 0 ? <span className="font-mono">{total}</span> : undefined} />
      <div className="mt-8">
        {total ?
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {savedResources.map((r) =>
          <ResourceCard key={'r' + r.id} r={r} />
          )}
            {savedBooks.map((b) =>
          <BookCard key={'b' + b.id} b={b} />
          )}
          </div> :

        <EmptyState
          icon={<BookmarkIcon className="h-5 w-5" />}
          title={t('saved')}
          description={t('no_results')}
          action={
          <button type="button" onClick={() => navigate('explore')} className={buttonClass('primary')}>
                {t('nav_explore')}
              </button>
          } />

        }
      </div>
    </section>);

}