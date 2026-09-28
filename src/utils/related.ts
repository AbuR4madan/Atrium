import type { Resource } from '../types/resource';

// Scoring (read-only): same category +100, shared tag +15, same type +10,
// same pricing +5, popularity × 0.01 as tie-breaker.
export function getRelatedResources(item: Resource, resources: Resource[], maxCount = 4): Resource[] {
  const itemTags = item.tags || [];
  const scored: {r: Resource;score: number;}[] = [];
  for (const r of resources) {
    if (r.id === item.id) continue;
    let score = 0;
    if (r.category === item.category) score += 100;
    if (itemTags.length && r.tags && r.tags.length) {
      for (const tag of itemTags) if (r.tags.indexOf(tag) !== -1) score += 15;
    }
    if (r.type === item.type) score += 10;
    if (r.pricing === item.pricing) score += 5;
    score += r.popularity * 0.01;
    scored.push({ r, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, maxCount).map((s) => s.r);
}