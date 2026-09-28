import { resourceDescriptions } from '../data/resourceDescriptions';
import type { Pricing, Resource, ResourceLanguage, ResourceType } from '../types/resource';

let rid = 1;

export function R(
name: string,
url: string,
category: string,
pricing: Pricing,
language?: ResourceLanguage,
type?: ResourceType,
popularity?: number,
tags?: string[],
featured?: boolean,
description?: string)
: Resource {
  return {
    id: rid++,
    name,
    url,
    category,
    pricing,
    language: language || 'english',
    type: type || 'website',
    popularity: popularity as number,
    tags: tags || [],
    featured: !!featured,
    description: description || resourceDescriptions[name] || ''
  };
}

export function RS(name: string, url: string, category: string): Resource {
  const type: ResourceType =
  category === '3d-software' || category === 'cad-software' || category === 'rendering' || category === 'ai' ?
  'tool' :
  'website';
  return R(name, url, category, 'free', 'english', type, 50, [], false, '');
}