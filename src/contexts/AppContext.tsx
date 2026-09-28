import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { resources as initialResources } from '../data/resources';
import { books as initialBooks } from '../data/books';
import { CATEGORIES } from '../data/categories';
import { translate, TranslateFn } from '../utils/i18n';
import { STORAGE_KEYS, readSavedSet, safeGetItem, safeSetItem } from '../utils/storage';
import { emptyFilters } from '../utils/filters';
import type { AdminTab, DetailRef, DetailType, Filters, FilterType, Lang, Page, SortBy, Theme } from '../types/app';
import type { Book, Resource } from '../types/resource';

interface AppContextValue {
  page: Page;
  navigate: (page: Page) => void;
  lang: Lang;
  toggleLang: () => void;
  t: TranslateFn;
  catLabel: (id: string) => string;
  langLabel: (v: string) => string;
  theme: Theme;
  toggleTheme: () => void;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  activeFilters: Filters;
  toggleFilter: (type: FilterType, value: string) => void;
  applyFilters: (f: Filters) => void;
  clearAllFilters: () => void;
  exploreCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
  visibleCount: number;
  loadMore: () => void;
  saved: Set<string>;
  isSaved: (key: string) => boolean;
  toggleSave: (key: string) => void;
  detail: DetailRef | null;
  openDetail: (type: DetailType, id: number) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  mobileFiltersOpen: boolean;
  openMobileFilters: () => void;
  closeMobileFilters: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function scrollTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
}

export function AppProvider({ children }: {children: React.ReactNode;}) {
  const [page, setPage] = useState<Page>('home');
  const [lang, setLang] = useState<Lang>(() => safeGetItem(STORAGE_KEYS.lang) === 'ar' ? 'ar' : 'en');
  const [theme, setTheme] = useState<Theme>(() => safeGetItem(STORAGE_KEYS.theme) === 'dark' ? 'dark' : 'light');
  const [saved, setSaved] = useState<Set<string>>(readSavedSet);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [activeFilters, setActiveFilters] = useState<Filters>(emptyFilters);
  const [searchQuery, setSearchQueryState] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('relevance');
  const [visibleCount, setVisibleCount] = useState(12);
  const [detail, setDetail] = useState<DetailRef | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adminTab, setAdminTab] = useState<AdminTab>('resources');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Document attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    safeSetItem(STORAGE_KEYS.lang, lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    safeSetItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.saved, JSON.stringify(Array.from(saved)));
  }, [saved]);

  // Lock page scroll behind modal overlays
  useEffect(() => {
    document.body.style.overflow = searchOpen || mobileFiltersOpen ? 'hidden' : '';
  }, [searchOpen, mobileFiltersOpen]);

  // Global keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileFiltersOpen(false);
        setMobileNavOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Programmatic data verification (preserved)
  useEffect(() => {
    const names = initialResources.map((r) => r.name);
    const dupNames = names.filter((n, i) => names.indexOf(n) !== i);
    const perCat: Record<string, number> = {};
    initialResources.forEach((r) => {
      perCat[r.category] = (perCat[r.category] || 0) + 1;
    });
    console.log(
      '[Atrium data check] resources: ' + initialResources.length + ' | categories: ' + CATEGORIES.length + ' | books: ' + initialBooks.length +
      ' | duplicate exact names: ' + (dupNames.length ? JSON.stringify(dupNames) : 'none') + ' | per-category: ',
      perCat
    );
  }, []);

  const t = useCallback<TranslateFn>((key, params) => translate(lang, key, params), [lang]);
  const catLabel = useCallback((id: string) => {
    const c = CATEGORIES.find((x) => x.id === id);
    return c ? c[lang] : id;
  }, [lang]);
  const langLabel = useCallback(
    (v: string) => v === 'arabic' ? lang === 'ar' ? 'العربية' : 'Arabic' : lang === 'ar' ? 'الإنجليزية' : 'English',
    [lang]
  );

  const navigate = useCallback((next: Page) => {
    setPage(next);
    if (next !== 'detail') setDetail(null);
    if (next !== 'submit') setEditingId(null);
    setMobileNavOpen(false);
    scrollTop();
  }, []);

  const openDetail = useCallback((type: DetailType, id: number) => {
    setPage('detail');
    setDetail({ type, id });
    scrollTop();
  }, []);

  const toggleFilter = useCallback((type: FilterType, value: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev[type]);
      if (next.has(value)) next.delete(value);else
      next.add(value);
      return { ...prev, [type]: next };
    });
    setVisibleCount(12);
  }, []);

  const applyFilters = useCallback((f: Filters) => {
    setActiveFilters({ category: new Set(f.category), pricing: new Set(f.pricing), language: new Set(f.language) });
    setVisibleCount(12);
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters(emptyFilters());
    setVisibleCount(12);
  }, []);

  const exploreCategory = useCallback((cat: string) => {
    setActiveFilters({ category: new Set([cat]), pricing: new Set(), language: new Set() });
    setSearchQueryState('');
    setVisibleCount(12);
    navigate('explore');
  }, [navigate]);

  const setSearchQuery = useCallback((q: string) => {
    setSearchQueryState(q);
    setVisibleCount(12);
  }, []);

  const toggleSave = useCallback((key: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);else
      next.add(key);
      return next;
    });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      page, navigate, lang,
      toggleLang: () => setLang((l) => l === 'en' ? 'ar' : 'en'),
      t, catLabel, langLabel, theme,
      toggleTheme: () => setTheme((th) => th === 'dark' ? 'light' : 'dark'),
      resources, setResources, books, setBooks,
      activeFilters, toggleFilter, applyFilters, clearAllFilters, exploreCategory,
      searchQuery, setSearchQuery, sortBy, setSortBy, visibleCount,
      loadMore: () => setVisibleCount((c) => c + 12),
      saved, isSaved: (key: string) => saved.has(key), toggleSave,
      detail, openDetail, editingId, setEditingId, adminTab, setAdminTab,
      searchOpen, openSearch: () => setSearchOpen(true), closeSearch: () => setSearchOpen(false),
      mobileNavOpen, setMobileNavOpen,
      mobileFiltersOpen, openMobileFilters: () => setMobileFiltersOpen(true), closeMobileFilters: () => setMobileFiltersOpen(false)
    }),
    [page, navigate, lang, t, catLabel, langLabel, theme, resources, books, activeFilters, toggleFilter, applyFilters, clearAllFilters, exploreCategory, searchQuery, setSearchQuery, sortBy, visibleCount, saved, toggleSave, detail, openDetail, editingId, adminTab, searchOpen, mobileNavOpen, mobileFiltersOpen]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}