export type DocPage = { slug: string; title: string; content: string };
const files = import.meta.glob('/docs/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const toSlug = (path: string) => {
  const m = path.match(/\/docs\/(.+?)\.md$/);
  return m ? m[1] : path;
};

const parseTitle = (content: string, fallback: string) => {
  const firstLine = content.split('\n').find(l => l.trim().startsWith('# '));
  return firstLine ? firstLine.replace(/^#\s+/, '').trim() : fallback;
};

export const DOCS: DocPage[] = Object.entries(files).map(([path, content]) => {
  const slug = toSlug(path);
  const title = parseTitle(content, slug);
  return { slug, title, content };
});

export const getDoc = (slug: string) => DOCS.find(d => d.slug === slug);
