import { describe, it, expect } from 'vitest';
import { search } from '../services/searchEngine';
import { MOCK_PAGES } from '../constants';

describe('searchEngine', () => {
  it('returns empty on empty query', () => {
    const r = search('', 1, 20);
    expect(r.total).toBe(0);
  });
  it('case-insensitive matching', () => {
    const { results } = search('SERVER', 1, 20);
    expect(results.length).toBeGreaterThan(0);
  });

  it('fuzzy matching for Chinese bigrams', () => {
    const { results } = search('红石', 1, 20);
    const slugs = results.map(r => r.slug);
    expect(slugs).toContain('redstone');
  });

  it('highlights terms', () => {
    const { results } = search('加入', 1, 20);
    const r = results.find(x => x.slug === 'join');
    expect(r).toBeTruthy();
    expect(r!.snippet).toMatch(/<mark>加入<\/mark>/);
  });

  it('sorted by relevance', () => {
    const { results } = search('经济', 1, 20);
    expect(results.length).toBeGreaterThan(0);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it('pagination', () => {
    const all = search('服务器', 1, 100).total;
    const { results: page1 } = search('服务器', 1, 2);
    const { results: page2 } = search('服务器', 2, 2);
    expect(page1.length).toBe(2);
    expect(page2.length).toBe(2);
    expect(all).toBeGreaterThanOrEqual(page1.length + page2.length);
    expect(page1[0].slug).not.toEqual(page2[0].slug);
  });
});
