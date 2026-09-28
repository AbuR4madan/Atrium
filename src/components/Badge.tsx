import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'accent' | 'success' | 'neutral';
  className?: string;
}

const tones = {
  accent: 'bg-accent-soft text-accent',
  success: 'bg-success/10 text-success',
  neutral: 'bg-sunken text-muted'
};

export function Badge({ children, tone = 'accent', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] ${tones[tone]} ${className}`}>
      {children}
    </span>);

}