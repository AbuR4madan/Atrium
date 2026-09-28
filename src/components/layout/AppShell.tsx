import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchPalette } from '../SearchPalette';
import { MobileFilterDrawer } from '../explore/MobileFilterDrawer';
import { Home } from '../../pages/Home';
import { Explore } from '../../pages/Explore';
import { Books } from '../../pages/Books';
import { Categories } from '../../pages/Categories';
import { Admin } from '../../pages/Admin';
import { Submit } from '../../pages/Submit';
import { About } from '../../pages/About';
import { Saved } from '../../pages/Saved';
import { Detail } from '../../pages/Detail';

function CurrentPage() {
  const { page } = useApp();
  switch (page) {
    case 'explore':return <Explore />;
    case 'books':return <Books />;
    case 'categories':return <Categories />;
    case 'admin':return <Admin />;
    case 'submit':return <Submit />;
    case 'about':return <About />;
    case 'saved':return <Saved />;
    case 'detail':return <Detail />;
    default:return <Home />;
  }
}

export function AppShell() {
  const { page, detail, editingId } = useApp();
  const pageKey = page + (detail ? `-${detail.type}-${detail.id}` : '') + (page === 'submit' ? `-${editingId ?? 'new'}` : '');

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg text-ink">
      <Header />
      <main id="app-root" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pageKey}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
            
            <CurrentPage />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <SearchPalette />
      <MobileFilterDrawer />
    </div>);

}