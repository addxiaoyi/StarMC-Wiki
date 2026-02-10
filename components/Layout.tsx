
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Github, Terminal, Book, ChevronRight, ExternalLink } from 'lucide-react';
import { NAVIGATION, SERVER_NAME, OFFICIAL_WEBSITE } from '../constants';
 
import { search as doSearch } from '../services/searchEngine';

export const Header: React.FC<{ onOpenSearch: () => void }> = ({ onOpenSearch }) => (
  <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
    <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg transition-transform group-hover:scale-105">
            <Terminal size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight">{SERVER_NAME} <span className="text-slate-400 font-normal">Wiki</span></span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 border border-slate-200 rounded-full hover:border-slate-300 transition-colors bg-slate-50"
        >
          <Search size={16} />
          <span>搜索文档...</span>
          <kbd className="ml-2 font-sans text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200">⌘K</kbd>
        </button>
        
        <div className="h-6 w-px bg-slate-200 mx-2" />
        
        <a 
          href={OFFICIAL_WEBSITE} 
          target="_blank" 
          rel="noreferrer" 
          className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1.5"
        >
          <ExternalLink size={14} />
          官方网站
        </a>
      </div>
    </div>
  </header>
);

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-full overflow-y-auto px-4 py-8">
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={onClose}><X size={24} /></button>
        </div>
        
        <nav className="space-y-8">
          {NAVIGATION.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 px-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => window.innerWidth < 768 && onClose()}
                        className={`
                          flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-slate-100 text-slate-900 border-l-2 border-slate-900' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                        `}
                      >
                        {item.title}
                        {isActive && <ChevronRight size={14} className="text-slate-400" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<{ slug: string; title: string; score: number; snippet: string }[]>([]);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const isAdminPage = location.pathname.toLowerCase().includes('admin');

  useEffect(() => {
    const id = setTimeout(() => {
      const r = doSearch(query, page, pageSize);
      setResults(r.results);
      setTotal(r.total);
    }, 100);
    return () => clearTimeout(id);
  }, [query, page]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Header onOpenSearch={() => setSearchOpen(true)} />}
      
      <div className="flex-1 flex flex-col md:flex-row max-w-8xl mx-auto w-full">
        {!isAdminPage && <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        
        <main className={`flex-1 min-w-0 bg-white ${isAdminPage ? 'w-full px-4' : ''}`}>
          {!isAdminPage && (
            <div className="md:hidden p-4 border-b border-slate-100">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-slate-600"
              >
                <Menu size={20} />
                目录
              </button>
            </div>
          )}
          {children}
        </main>
      </div>

      
      
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="text-slate-400" size={20} />
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                placeholder="输入关键字搜索文档（支持模糊匹配与高亮）" 
                className="flex-1 outline-none text-lg text-slate-900 placeholder:text-slate-300"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              {query.trim() === '' ? (
                <div className="p-8 text-center text-slate-400">
                  <div className="mb-2"><Book size={32} className="mx-auto opacity-20" /></div>
                  <p>请输入关键词开始搜索</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-3 max-h-[400px] overflow-y-auto">
                    {results.map(r => (
                      <li key={r.slug} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                        <Link to={`/wiki/${r.slug}`} className="font-bold text-slate-900">
                          {r.title}
                        </Link>
                        <div className="mt-1 text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: r.snippet }} />
                      </li>
                    ))}
                    {results.length === 0 && (
                      <li className="p-8 text-center text-slate-400">无匹配结果</li>
                    )}
                  </ul>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-xs text-slate-500">共 {total} 条</div>
                    <div className="flex items-center gap-2">
                      <button 
                        disabled={page <= 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-3 py-1.5 text-xs rounded-md border border-slate-200 disabled:opacity-50"
                      >
                        上一页
                      </button>
                      <button 
                        disabled={page * pageSize >= total}
                        onClick={() => setPage(p => p + 1)}
                        className="px-3 py-1.5 text-xs rounded-md border border-slate-200 disabled:opacity-50"
                      >
                        下一页
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
