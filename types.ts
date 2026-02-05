
export interface WikiPage {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  lastUpdated: string;
  tags?: string[];
  icon?: string;
}

export interface NavItem {
  title: string;
  items: {
    title: string;
    path: string;
  }[];
}

export interface SearchResult {
  title: string;
  snippet: string;
  path: string;
  relevance: number;
}
