type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium select-none transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[15px]'
};

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent-hover',
  outline: 'border border-line bg-surface text-ink hover:border-line-strong hover:bg-sunken',
  ghost: 'text-muted hover:bg-sunken hover:text-ink',
  danger: 'bg-danger/10 text-danger hover:bg-danger/[0.18]'
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = ''): string {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`.trim();
}

export const iconButtonClass =
'inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-[background-color,color,transform] duration-150 ease-out hover:bg-sunken hover:text-ink active:scale-95';

export const inputClass =
'w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/80 outline-none transition-[border-color,box-shadow] duration-150 ease-out hover:border-line-strong focus:border-accent focus:ring-4 focus:ring-accent/10';

export const containerClass = 'mx-auto w-full max-w-[1280px] px-5 md:px-8';

export const pricingDot: Record<string, string> = {
  free: 'bg-success',
  freemium: 'bg-accent',
  paid: 'bg-warning'
};