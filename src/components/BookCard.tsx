import React from 'react';
import { useApp } from '../contexts/AppContext';
import { BookCover } from './BookCover';
import { Badge } from './Badge';
import type { Book } from '../types/resource';

export function BookCard({ b }: {b: Book;}) {
  const { openDetail, catLabel, t } = useApp();
  return (
    <article className="group relative flex h-full gap-5 rounded-xl border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-line-strong hover:shadow-card">
      <div className="transition-transform duration-200 ease-out group-hover:-rotate-1">
        <BookCover title={b.title} author={b.author} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">
          <button
            type="button"
            onClick={() => openDetail('book', b.id)}
            className="line-clamp-3 text-start outline-none transition-colors duration-150 group-hover:text-accent after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-accent">
            
            {b.title}
          </button>
        </h3>
        <p className="mt-1.5 font-serif text-sm italic text-muted">
          {b.author} <span className="not-italic">·</span> <span className="font-mono not-italic">{b.year}</span>
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <span className="truncate rounded-md border border-line bg-bg px-2 py-1 text-xs text-muted">{catLabel(b.category)}</span>
          <Badge className="ms-auto">{t(b.accessType)}</Badge>
        </div>
      </div>
    </article>);

}