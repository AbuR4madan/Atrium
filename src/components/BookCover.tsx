import React from 'react';
import { coverColor } from '../utils/bookCover';

interface BookCoverProps {
  title: string;
  author: string;
  size?: 'sm' | 'lg';
}

export function BookCover({ title, author, size = 'sm' }: BookCoverProps) {
  const bg = coverColor(title);

  if (size === 'sm') {
    return (
      <div
        aria-hidden="true"
        className="relative flex h-[124px] w-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[3px] shadow-[0_1px_2px_rgb(0_0_0/0.12),0_8px_16px_-8px_rgb(0_0_0/0.35)]"
        style={{ backgroundColor: bg }}>
        
        <span className="absolute inset-y-0 start-0 w-[5px] bg-black/20" />
        <span className="absolute inset-y-0 start-[5px] w-px bg-white/15" />
        <span className="font-serif text-4xl italic text-white/90">{title.charAt(0)}</span>
      </div>);

  }

  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[2/3] w-full max-w-[240px] flex-col justify-between overflow-hidden rounded-[4px] p-6 ps-8 text-white shadow-[0_2px_4px_rgb(0_0_0/0.12),0_24px_40px_-16px_rgb(0_0_0/0.45)]"
      style={{ backgroundColor: bg }}>
      
      <span className="absolute inset-y-0 start-0 w-2 bg-black/20" />
      <span className="absolute inset-y-0 start-2 w-px bg-white/15" />
      <div>
        <div className="mb-4 h-px w-10 bg-white/40" />
        <p className="font-serif text-[1.35rem] leading-snug">{title}</p>
      </div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/75">{author}</p>
    </div>);

}