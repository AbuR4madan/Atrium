import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { CATEGORIES } from '../data/categories';
import { R } from '../utils/resourceFactory';
import { buttonClass, inputClass } from '../utils/styles';
import type { Pricing } from '../types/resource';

export function Submit() {
  const { t, lang, resources, setResources, editingId, setEditingId, navigate } = useApp();
  const editing = editingId ? resources.find((r) => r.id === editingId) : undefined;

  const [name, setName] = useState(editing ? editing.name : '');
  const [url, setUrl] = useState(editing ? editing.url : '');
  const [category, setCategory] = useState(editing ? editing.category : CATEGORIES[0].id);
  const [pricing, setPricing] = useState<Pricing>(editing ? editing.pricing : 'free');
  const [desc, setDesc] = useState(editing ? editing.description : '');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    const u = url.trim() || '#';
    const d = desc.trim();
    if (editingId) {
      setResources((prev) => prev.map((r) => r.id === editingId ? { ...r, name: n, url: u, category, pricing, description: d } : r));
      setEditingId(null);
    } else {
      const created = R(n, u, category, pricing, lang === 'ar' ? 'arabic' : 'english', 'website', 50, [], false, d);
      setResources((prev) => [created, ...prev]);
    }
    navigate('explore');
  }

  const label = 'mb-2 block text-[13px] font-semibold text-ink';
  const selectWrap = 'relative';
  const chevron = 'pointer-events-none absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted';

  return (
    <section className="mx-auto w-full max-w-[680px] px-5 pt-10 md:pt-14">
      <h1 className="text-3xl font-bold tracking-[-0.03em] md:text-[2.5rem] md:leading-[1.1]">
        {editing ? t('edit_resource') : t('submit_resource')}
      </h1>

      <form onSubmit={onSubmit} className="mt-8 rounded-2xl border border-line bg-surface p-5 md:p-8">
        <div className="space-y-5">
          <div>
            <label className={label} htmlFor="sf-name">{t('form_name')}</label>
            <input id="sf-name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={label} htmlFor="sf-url">{t('form_url')}</label>
            <input id="sf-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" className={`${inputClass} font-mono text-sm`} />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={label} htmlFor="sf-cat">{t('category')}</label>
              <div className={selectWrap}>
                <select id="sf-cat" value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} cursor-pointer appearance-none pe-9`}>
                  {CATEGORIES.map((c) =>
                  <option key={c.id} value={c.id}>{c[lang]}</option>
                  )}
                </select>
                <ChevronDownIcon className={chevron} />
              </div>
            </div>
            <div>
              <label className={label} htmlFor="sf-price">{t('pricing')}</label>
              <div className={selectWrap}>
                <select id="sf-price" value={pricing} onChange={(e) => setPricing(e.target.value as Pricing)} className={`${inputClass} cursor-pointer appearance-none pe-9`}>
                  {(['free', 'freemium', 'paid'] as Pricing[]).map((p) =>
                  <option key={p} value={p}>{t(p)}</option>
                  )}
                </select>
                <ChevronDownIcon className={chevron} />
              </div>
            </div>
          </div>
          <div>
            <label className={label} htmlFor="sf-desc">{t('form_desc')}</label>
            <textarea id="sf-desc" value={desc} onChange={(e) => setDesc(e.target.value)} className={`${inputClass} min-h-[120px] resize-y leading-relaxed`} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
          <button type="submit" className={buttonClass('primary', 'lg')}>{t('save_resource')}</button>
          <button type="button" onClick={() => navigate('explore')} className={buttonClass('outline', 'lg')}>{t('cancel')}</button>
        </div>
      </form>
    </section>);

}