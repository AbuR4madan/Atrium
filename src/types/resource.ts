export type Pricing = 'free' | 'freemium' | 'paid';
export type ResourceLanguage = 'english' | 'arabic';
export type ResourceType = 'website' | 'tool' | 'course';

export interface Resource {
  id: number;
  name: string;
  url: string;
  category: string;
  pricing: Pricing;
  language: ResourceLanguage;
  type: ResourceType;
  popularity: number;
  tags: string[];
  featured: boolean;
  description: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  pages: number;
  category: string;
  accessType: string;
  url: string;
  language: ResourceLanguage;
  tags: string[];
  description: string;
  featured: boolean;
  pricing: 'free';
  publisher?: string;
}

export interface Category {
  id: string;
  en: string;
  ar: string;
}