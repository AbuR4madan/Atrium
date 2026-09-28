import type { Book, Resource } from '../types/resource';

export function hay(o: Resource | Book, catLabel: (id: string) => string): string {
  const name = 'name' in o ? o.name : o.title;
  const author = 'author' in o ? o.author : '';
  const type = 'type' in o ? o.type : '';
  return (
  (name || '') + ' ' + (author || '') + ' ' + (o.description || '') + ' ' + (o.tags || []).join(' ') + ' ' + catLabel(o.category) + ' ' + (type || '')).
  toLowerCase();
}