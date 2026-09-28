import React from 'react';
import { useApp } from '../contexts/AppContext';
import { BookCard } from '../components/BookCard';
import { PageHeader } from '../components/PageHeader';
import { containerClass } from '../utils/styles';

export function Books() {
  const { t, books } = useApp();
  return (
    <section className={`${containerClass} pt-10 md:pt-14`}>
      <PageHeader title={t('nav_books')} meta={<span className="font-mono">{books.length}</span>} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {books.map((b) =>
        <BookCard key={b.id} b={b} />
        )}
      </div>
    </section>);

}