import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line px-6 py-20 text-center">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sunken text-muted">{icon}</div>
      <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>);

}