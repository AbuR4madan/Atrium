import React, { useState } from 'react';
import { faviconUrl } from '../utils/url';

interface ResourceIconProps {
  name: string;
  url?: string;
  size?: 'sm' | 'md' | 'xl';
}

const frame: Record<NonNullable<ResourceIconProps['size']>, string> = {
  sm: 'h-8 w-8 rounded-md text-sm',
  md: 'h-11 w-11 rounded-lg text-base',
  xl: 'h-40 w-full rounded-xl text-5xl'
};

const img: Record<NonNullable<ResourceIconProps['size']>, string> = {
  sm: 'h-[18px] w-[18px]',
  md: 'h-6 w-6',
  xl: 'h-16 w-16'
};

export function ResourceIcon({ name, url, size = 'md' }: ResourceIconProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = url ? faviconUrl(url) : null;
  const showImg = !!src && !failed;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-line bg-sunken font-semibold text-accent ${frame[size]}`}>
      
      <span aria-hidden="true" className={`transition-opacity duration-200 ease-out ${showImg && loaded ? 'opacity-0' : 'opacity-100'}`}>
        {name.charAt(0)}
      </span>
      {showImg &&
      <img
        src={src as string}
        alt=""
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`absolute object-contain transition-opacity duration-200 ease-out ${img[size]} ${loaded ? 'opacity-100' : 'opacity-0'}`} />

      }
    </div>);

}