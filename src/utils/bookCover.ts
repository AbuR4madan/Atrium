const COVER_VARS = ['--cover-1', '--cover-2', '--cover-3', '--cover-4', '--cover-5', '--cover-6'];

export function coverColor(title: string): string {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = h * 31 + title.charCodeAt(i) >>> 0;
  return `var(${COVER_VARS[h % COVER_VARS.length]})`;
}