import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookmarkIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon, XIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { navItems } from '../../data/navigation';
import { containerClass, iconButtonClass } from '../../utils/styles';
import type { Page } from '../../types/app';

export function Header() {
  const { page, navigate, t, lang, toggleLang, theme, toggleTheme, openSearch, saved, mobileNavOpen, setMobileNavOpen } = useApp();
  const activePage: Page = page === 'detail' || page === 'submit' ? 'explore' : page;
  const firstLinkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mobileNavOpen) firstLinkRef.current?.focus();
  }, [mobileNavOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-line bg-surface">
        <div className={`${containerClass} flex h-full items-center gap-4 md:gap-8`}>
          <button
            type="button"
            onClick={() => navigate('home')}
            className="shrink-0 text-[1.3rem] font-bold tracking-[-0.045em] text-ink">
            
            Atrium<span className="text-accent">.</span>
          </button>

          <nav aria-label="Primary" className="hidden h-full items-center md:flex">
            {navItems.map((item) => {
              const active = activePage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => navigate(item.page)}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex h-full items-center whitespace-nowrap px-3 text-sm font-medium transition-colors duration-150 ${
                  active ? 'text-ink' : 'text-muted hover:text-ink'}`
                  }>
                  
                  {t(item.labelKey)}
                  {active &&
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 520, damping: 42 }} />

                  }
                </button>);

            })}
          </nav>

          <div className="ms-auto flex items-center gap-1">
            <button type="button" onClick={openSearch} aria-label={t('search')} className="me-1 flex h-9 items-center gap-2 rounded-md border border-line bg-bg px-2.5 text-sm text-muted transition-[border-color,color] duration-150 hover:border-line-strong hover:text-ink lg:w-60" style={{ paddingLeft: "22px", width: "591px", height: "34px" }}>
              <SearchIcon className="h-4 w-4 shrink-0" />
              <span className="hidden lg:inline">{t('search')}</span>
              <kbd className="ms-auto hidden rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] lg:inline">⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={toggleLang}
              className="h-9 whitespace-nowrap rounded-md px-2.5 text-[13px] font-semibold text-muted transition-colors duration-150 hover:bg-sunken hover:text-ink">
              
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
            <button type="button" onClick={toggleTheme} aria-label="Toggle dark mode" className={iconButtonClass}>
              {theme === 'dark' ? <SunIcon className="h-[18px] w-[18px]" /> : <MoonIcon className="h-[18px] w-[18px]" />}
            </button>
            <button
              type="button"
              onClick={() => navigate('saved')}
              aria-label="Bookmarks"
              aria-current={page === 'saved' ? 'page' : undefined}
              className={`${iconButtonClass} relative ${page === 'saved' ? 'bg-accent-soft text-accent' : ''}`}>
              
              <BookmarkIcon className="h-[18px] w-[18px]" fill={page === 'saved' ? 'currentColor' : 'none'} />
              {saved.size > 0 &&
              <span className="absolute -end-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[9px] font-medium text-accent-fg">
                  {saved.size}
                </span>
              }
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Menu"
              aria-expanded={mobileNavOpen}
              aria-controls="mobile-nav-panel"
              className={`${iconButtonClass} md:hidden`}>
              
              {mobileNavOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileNavOpen &&
        <>
            <motion.div
            className="fixed inset-0 top-16 z-30 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setMobileNavOpen(false)} />
          
            <motion.nav
            id="mobile-nav-panel"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 top-16 z-30 flex flex-col gap-0.5 border-b border-line bg-surface p-3 shadow-pop md:hidden">
            
              {navItems.map((item, i) => {
              const active = activePage === item.page;
              return (
                <button
                  key={item.page}
                  ref={i === 0 ? firstLinkRef : undefined}
                  type="button"
                  onClick={() => navigate(item.page)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-start text-base font-medium transition-colors duration-150 ${
                  active ? 'bg-accent-soft text-accent' : 'text-ink hover:bg-sunken'}`
                  }>
                  
                    {t(item.labelKey)}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  </button>);

            })}
            </motion.nav>
          </>
        }
      </AnimatePresence>
    </>);

}