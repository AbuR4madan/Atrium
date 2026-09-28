import React from 'react';

interface PageHeaderProps {
  title: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({ title, meta, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-[-0.03em] text-ink md:text-[2.5rem] md:leading-[1.1]">{title}</h1>
        {meta && <div className="mt-2 text-sm text-muted">{meta}</div>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>);

}