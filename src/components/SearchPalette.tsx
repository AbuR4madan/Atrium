import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenIcon, CornerDownLeftIcon, SearchIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ResourceIcon } from './ResourceIcon';
import { hay } from '../utils/search';
import type { DetailType } from '../types/app';

interface SearchItem {
  type: DetailType;
  id: number;
  title: string;
  desc: string;
  url?: string;
}

export function SearchPalette() {
  const { searchOpen, closeSearch, resources, books, t, catLabel, lang, openDetail } = useApp();
  const [query, setQuery] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQuery('');
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [searchOpen]);

  const { resCount, items } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { resCount: 0, items: [] as SearchItem[] };
    const res = resources.filter((r) => hay(r, catLabel).includes(q)).slice(0, 7);
    const bks = books.filter((b) => hay(b, catLabel).includes(q)).slice(0, 4);
    const list: SearchItem[] = [
    ...res.map((r) => ({ type: 'resource' as const, id: r.id, title: r.name, desc: catLabel(r.category), url: r.url })),
    ...bks.map((b) => ({ type: 'book' as const, id: b.id, title: b.title, desc: b.author }))];

    return { resCount: res.length, items: list };
  }, [query, resources, books, catLabel]);

  useEffect(() => setSel(0), [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${sel}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [sel]);

  function openItem(it: SearchItem) {
    closeSearch();
    openDetail(it.type, it.id);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!items.length) return;
      e.preventDefault();
      setSel((s) => (s + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const it = items[sel];
      if (it) openItem(it);
    }
  }

  const groupTitle = (label: 'Resources' | 'Books') =>
  lang === 'ar' ? label === 'Books' ? 'الكتب' : 'الموارد' : label;

  function renderItem(it: SearchItem, idx: number) {
    const active = idx === sel;
    return (
      <button
        type="button"
        key={it.type + it.id}
        data-idx={idx}
        onClick={() => openItem(it)}
        onMouseMove={() => sel !== idx && setSel(idx)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-start transition-colors duration-100 ${active ? 'bg-accent-soft' : ''}`}>
        
        {it.type === 'resource' ?
        <ResourceIcon name={it.title} url={it.url} size="sm" /> :

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-sunken text-accent">
            <BookOpenIcon className="h-4 w-4" />
          </span>
        }
        <span className={`min-w-0 flex-1 truncate text-sm font-medium ${active ? 'text-accent' : 'text-ink'}`}>{it.title}</span>
        <span className="hidden shrink-0 truncate text-xs text-muted sm:block sm:max-w-[40%]">{it.desc}</span>
        <CornerDownLeftIcon className={`h-3.5 w-3.5 shrink-0 text-accent transition-opacity duration-100 ${active ? 'opacity-100' : 'opacity-0'}`} />
      </button>);

  }

  const hasQuery = query.trim().length > 0;

  return (
    <AnimatePresence>
      {searchOpen &&
      <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[10vh]">
          <motion.div
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closeSearch} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={t('search')}
          initial={{ opacity: 0, scale: 0.97, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-line bg-surface shadow-pop">
          
            <div className="flex items-center gap-3 border-b border-line px-5">
              <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
              <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search websites, books, tools, resources..."
              autoComplete="off"
              aria-label={t('search')}
              className="h-16 min-w-0 flex-1 bg-transparent text-[17px] text-ink outline-none placeholder:text-muted/80" />
            
              <button
              type="button"
              onClick={closeSearch}
              className="rounded-md border border-line px-2 py-1 font-mono text-[11px] text-muted transition-colors duration-150 hover:text-ink">
              
                Esc
              </button>
            </div>

            {hasQuery &&
          <div ref={listRef} className="max-h-[56vh] overflow-y-auto p-2">
                {items.length === 0 ?
            <p className="px-3 py-10 text-center text-sm text-muted">{t('no_results')}</p> :

            <>
                    {resCount > 0 &&
              <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{groupTitle('Resources')}</div>
              }
                    {items.slice(0, resCount).map((it, i) => renderItem(it, i))}
                    {items.length > resCount &&
              <div className="px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{groupTitle('Books')}</div>
              }
                    {items.slice(resCount).map((it, j) => renderItem(it, resCount + j))}
                  </>
            }
              </div>
          }

            <div className="flex items-center justify-between gap-4 border-t border-line bg-bg/60 px-5 py-3 text-xs text-muted">
              <span className="truncate">{t('search_footer')}</span>
              <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
                <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px]">↑</kbd>
                <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px]">↓</kbd>
                <span>{t('navigate')}</span>
                <kbd className="ms-2 rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px]">Enter</kbd>
                <span>{t('select')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}