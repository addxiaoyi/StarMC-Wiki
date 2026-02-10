
export interface WikiPage {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  lastUpdated: string;
  tags?: string[];
  icon?: string;
  parent?: string; // 父页面 slug
}

export interface NavItem {
  title: string;
  path?: string;
  icon?: string;
  items?: NavItem[];
}

export interface SearchResult {
  title: string;
  snippet: string;
  path: string;
  relevance: number;
}
