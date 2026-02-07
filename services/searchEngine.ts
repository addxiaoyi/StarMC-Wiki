import { MOCK_PAGES } from '../constants';

type Posting = { doc: number; tf: number };
type Index = Map<string, Posting[]>;

const docs = MOCK_PAGES.map(p => ({ slug: p.slug, title: p.title, content: p.content }));
const N = docs.length;

const tokenize = (text: string) => {
  const lower = text.toLowerCase();
  const words = lower.match(/[a-z0-9]+/g) ?? [];
  const cn = Array.from(lower.replace(/[\s\p{P}\p{S}]/gu, '')).map((_, i, arr) => arr.slice(i, i + 2).join('')).filter(s => s.length === 2);
  return [...words, ...cn];
};

const buildIndex = (): { index: Index; df: Map<string, number>; len: number[] } => {
  const index: Index = new Map();
  const df: Map<string, number> = new Map();
  const len: number[] = [];
  for (let i = 0; i < docs.length; i++) {
    const tokens = tokenize(docs[i].title + ' ' + docs[i].content);
    len[i] = tokens.length;
    const counts: Map<string, number> = new Map();
    for (const t of tokens) counts.set(t, (counts.get(t) ?? 0) + 1);
    for (const [t, tf] of counts) {
      const postings = index.get(t) ?? [];
      postings.push({ doc: i, tf });
      index.set(t, postings);
      df.set(t, (df.get(t) ?? 0) + 1);
    }
  }
  return { index, df, len };
};

const { index, df, len } = buildIndex();
const avgdl = len.reduce((a, b) => a + b, 0) / Math.max(1, N);

const idf = (t: string) => Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));

const bm25 = (tf: number, dlen: number, k1 = 1.2, b = 0.75) => {
  const denom = tf + k1 * (1 - b + b * dlen / Math.max(1, avgdl));
  return tf * (k1 + 1) / Math.max(1e-9, denom);
};

const highlight = (content: string, terms: string[]) => {
  const lower = content.toLowerCase();
  let pos = -1;
  for (const t of terms) {
    pos = lower.indexOf(t);
    if (pos >= 0) break;
  }
  const start = Math.max(0, pos - 60);
  const end = Math.min(content.length, (pos >= 0 ? pos + 120 : 120));
  const snippet = content.slice(start, end);
  const escaped = snippet.replace(/[&<>]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[s] as string));
  const marked = terms.reduce((acc, t) => acc.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark>${m}</mark>`), escaped);
  return marked;
};

export type SearchResult = { slug: string; title: string; score: number; snippet: string };

export const search = (query: string, page = 1, pageSize = 20): { results: SearchResult[]; total: number } => {
  const terms = tokenize(query);
  if (terms.length === 0) return { results: [], total: 0 };
  const scores: Map<number, number> = new Map();
  for (const t of terms) {
    const postings = index.get(t);
    if (!postings) continue;
    const w = idf(t);
    for (const { doc, tf } of postings) {
      const s = bm25(tf, len[doc]) * w;
      scores.set(doc, (scores.get(doc) ?? 0) + s);
    }
  }
  const ranked = [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([i, score]) => {
      const d = docs[i];
      return { slug: d.slug, title: d.title, score, snippet: highlight(d.content, terms) };
    });
  const total = ranked.length;
  const start = (page - 1) * pageSize;
  const results = ranked.slice(start, start + pageSize);
  return { results, total };
};
