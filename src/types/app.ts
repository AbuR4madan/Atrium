export type Lang = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type Page = 'home' | 'explore' | 'books' | 'categories' | 'admin' | 'submit' | 'about' | 'saved' | 'detail';
export type FilterType = 'category' | 'pricing' | 'language';
export type Filters = Record<FilterType, Set<string>>;
export type SortBy = 'relevance' | 'popularity' | 'alpha';
export type AdminTab = 'resources' | 'books';
export type DetailType = 'resource' | 'book';

export interface DetailRef {
  type: DetailType;
  id: number;
}