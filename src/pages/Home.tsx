import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SearchIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ResourceCard } from '../components/ResourceCard';
import { HOME_DISCIPLINES } from '../data/categories';
import { containerClass } from '../utils/styles';
import { countResources } from '../utils/filters';

const EASE = [0.23, 1, 0.32, 1] as const;
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const rise = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } } };

export function Home() {
  const { t, resources, catLabel, exploreCategory, navigate, setSearchQuery } = useApp();
  const [query, setQuery] = useState('');
  const featured = resources.filter((r) => r.featured).slice(0, 6);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearchQuery(query.trim());
    navigate('explore');
  }

  return (
    <>
      <section className="border-b border-line">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-[900px] flex-col items-center px-5 pb-16 pt-16 text-center md:pb-24 md:pt-28">
          
          <motion.p variants={rise} className="mb-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted md:mb-8">
            {t('hero_eyebrow')}
          </motion.p>
          <motion.h1
            variants={rise}
            className="text-[clamp(3.25rem,11vw,7rem)] font-bold leading-[0.92] tracking-[-0.055em] text-ink">
            
            Atrium<span className="text-accent">.</span>
          </motion.h1>
          <motion.p
            variants={rise}
            className="mt-6 max-w-[34rem] font-serif text-[1.075rem] italic leading-relaxed text-muted md:mt-8 md:text-[1.25rem]">
            
            {t('hero_description')}
          </motion.p>

          <motion.form variants={rise} onSubmit={onSubmit} role="search" className="relative mt-10 w-full max-w-[620px] md:mt-12">
            <SearchIcon className="pointer-events-none absolute start-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_resources')}
              aria-label={t('search')}
              className="h-14 w-full rounded-xl border border-line bg-surface pe-[7.5rem] ps-[3.25rem] text-base text-ink shadow-card outline-none transition-[border-color,box-shadow] duration-150 ease-out placeholder:text-muted/80 hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent/10 md:h-16 md:text-[17px]" />
            
            <button
              type="submit"
              className="absolute end-2 top-1/2 inline-flex h-10 -translate-y-1/2 items-center gap-1.5 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg transition-[background-color,transform] duration-150 ease-out hover:bg-accent-hover active:scale-[0.97] md:h-12 md:px-5">
              
              {t('nav_explore')}
              <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
            </button>
          </motion.form>

          <motion.div variants={rise} className="mt-12 flex flex-col items-center md:mt-14">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{t('hero_explore_label')}</p>
            <div className="flex max-w-[700px] flex-wrap justify-center gap-2">
              {HOME_DISCIPLINES.map((d) =>
              <button
                key={d}
                type="button"
                onClick={() => exploreCategory(d)}
                className="group inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface ps-4 pe-3 text-sm font-medium text-ink transition-[border-color,background-color,color,transform] duration-150 ease-out hover:border-accent hover:bg-accent-soft hover:text-accent active:scale-[0.97]">
                
                  {catLabel(d)}
                  <span className="font-mono text-[11px] text-muted transition-colors duration-150 group-hover:text-accent">
                    {countResources(resources, 'category', d)}
                  </span>
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => navigate('explore')}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:text-accent">
              
              {t('hero_view_all')}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      <section className={`${containerClass} pt-16 md:pt-20`}>
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-[1.75rem]">{t('featured')}</h2>
          <button
            type="button"
            onClick={() => navigate('explore')}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            
            {t('hero_view_all')}
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {featured.map((r) =>
          <ResourceCard key={r.id} r={r} />
          )}
        </div>
      </section>
    </>);

}