import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Badge } from '../components/Badge';
import { buttonClass, containerClass } from '../utils/styles';
import { hostnameOf } from '../utils/url';
import type { AdminTab } from '../types/app';

export function Admin() {
  const { t, resources, setResources, books, setBooks, catLabel, adminTab, setAdminTab, setEditingId, navigate } = useApp();
  const tab = adminTab || 'resources';

  const tabs: {id: AdminTab;key: string;count: number;}[] = [
  { id: 'resources', key: 'manage_resources', count: resources.length },
  { id: 'books', key: 'manage_books', count: books.length }];


  function editResource(id: number) {
    setEditingId(id);
    navigate('submit');
  }

  function addResource() {
    setEditingId(null);
    navigate('submit');
  }

  const th = 'px-4 py-3 text-start text-[11px] font-semibold uppercase tracking-[0.1em] text-muted';
  const td = 'px-4 py-3 align-middle';

  return (
    <section className={`${containerClass} pt-10 md:pt-14`}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line">
        <div>
          <h1 className="text-3xl font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.1]">{t('admin_panel')}</h1>
          <nav role="tablist" className="mt-6 flex gap-1 overflow-x-auto">
            {tabs.map((tb) => {
              const active = tab === tb.id;
              return (
                <button
                  key={tb.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setAdminTab(tb.id)}
                  className={`relative flex items-center gap-2 whitespace-nowrap px-3 pb-3 pt-1 text-sm font-medium transition-colors duration-150 ${
                  active ? 'text-ink' : 'text-muted hover:text-ink'}`
                  }>
                  
                  {t(tb.key)}
                  <span className={`rounded px-1.5 font-mono text-[11px] ${active ? 'bg-accent-soft text-accent' : 'bg-sunken text-muted'}`}>{tb.count}</span>
                  {active &&
                  <motion.span layoutId="admin-tab" className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-accent" transition={{ type: 'spring', stiffness: 520, damping: 42 }} />
                  }
                </button>);

            })}
          </nav>
        </div>
        {tab === 'resources' &&
        <button type="button" onClick={addResource} className={buttonClass('primary', 'md', 'mb-3')}>
            <PlusIcon className="h-4 w-4" />
            {t('add_resource')}
          </button>
        }
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-surface">
        {tab === 'books' ?
        <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-line bg-sunken/60">
              <tr>
                <th className={th}>{t('title')}</th>
                <th className={th}>{t('author')}</th>
                <th className={th}>{t('year')}</th>
                <th className={th}>{t('access_type')}</th>
                <th className={`${th} text-end`}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {books.map((b) =>
            <tr key={b.id} className="transition-colors duration-100 hover:bg-bg">
                  <td className={`${td} font-medium text-ink`}>{b.title}</td>
                  <td className={`${td} text-muted`}>{b.author}</td>
                  <td className={`${td} font-mono text-muted`}>{b.year}</td>
                  <td className={td}><Badge tone="neutral">{t(b.accessType)}</Badge></td>
                  <td className={`${td} text-end`}>
                    <button type="button" onClick={() => setBooks((prev) => prev.filter((x) => x.id !== b.id))} className={buttonClass('danger', 'sm')}>
                      {t('delete')}
                    </button>
                  </td>
                </tr>
            )}
            </tbody>
          </table> :

        <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-line bg-sunken/60">
              <tr>
                <th className={th}>{t('title')}</th>
                <th className={th}>{t('category')}</th>
                <th className={th}>{t('pricing')}</th>
                <th className={th}>{t('status')}</th>
                <th className={`${th} text-end`}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {resources.map((r) =>
            <tr key={r.id} className="transition-colors duration-100 hover:bg-bg">
                  <td className={td}>
                    <div className="font-medium text-ink">{r.name}</div>
                    <div className="mt-0.5 font-mono text-xs text-muted">{hostnameOf(r.url)}</div>
                  </td>
                  <td className={`${td} text-muted`}>{catLabel(r.category)}</td>
                  <td className={`${td} text-muted`}>{t(r.pricing)}</td>
                  <td className={td}><Badge tone="success">{t('active')}</Badge></td>
                  <td className={`${td} text-end`}>
                    <div className="inline-flex gap-2">
                      <button type="button" onClick={() => editResource(r.id)} className={buttonClass('outline', 'sm')}>
                        {t('edit')}
                      </button>
                      <button type="button" onClick={() => setResources((prev) => prev.filter((x) => x.id !== r.id))} className={buttonClass('danger', 'sm')}>
                        {t('delete')}
                      </button>
                    </div>
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        }
      </div>
    </section>);

}