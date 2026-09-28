import React from 'react';
import { useApp } from '../contexts/AppContext';

export function About() {
  const { t } = useApp();
  return (
    <section className="mx-auto w-full max-w-[680px] px-5 pt-16 md:pt-24">
      <h1 className="text-3xl font-bold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.1]">{t('about_atrium')}</h1>
      <div className="mt-6 h-px w-12 bg-accent" aria-hidden="true" />
      <p className="mt-6 font-serif text-xl italic leading-relaxed text-muted md:text-2xl">{t('footer_about')}</p>
    </section>);

}