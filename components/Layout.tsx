
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Github, Terminal, Book, ChevronRight, ExternalLink as ExternalLinkIcon, Moon, Sun, Settings } from 'lucide-react';
import { NAVIGATION, SERVER_NAME, OFFICIAL_WEBSITE } from '../constants';
 
import { search as doSearch } from '../services/searchEngine';

export const Header: React.FC<{ 
  onOpenSearch: () => void; 
  onToggleSidebar: () => void;
  isDark: boolean; 
  toggleDark: (e: React.MouseEvent) => void 
}> = ({ onOpenSearch, onToggleSidebar, isDark, toggleDark }) => (
    <header className="sticky top-0 z-[100] w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:bg-slate-950/80 dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* 移动端菜单按钮 */}
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg hidden dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu size={20} />
          </button>
          
          <Link to="/" className="flex items-center gap-1.5">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg dark:bg-white dark:text-slate-900">
              <Terminal size={18} />
            </div>
            <span className="text-sm font-black dark:text-white whitespace-nowrap overflow-hidden">
              舵星归途
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* 管理入口按钮 */}
          <Link
            to="/admin/review"
            className="p-2 text-slate-600 bg-slate-100 rounded-lg dark:text-slate-300 dark:bg-slate-800 hover:text-blue-600 transition-colors"
            title="管理后台"
          >
            <Settings size={18} />
          </Link>
          {/* 移动端搜索按钮 */}
          <button
            onClick={(e) => { e.preventDefault(); onOpenSearch(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 bg-blue-50 border border-blue-200 rounded-full dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700 hidden transition-all active:scale-95"
          >
            <Search size={14} />
            <span className="text-xs font-black">搜索</span>
          </button>
          {/* 主题切换按钮 */}
          <button
            onClick={toggleDark}
            className="p-2 text-slate-600 bg-slate-100 rounded-lg dark:text-slate-300 dark:bg-slate-800 cursor-pointer active:scale-90 transition-all flex items-center justify-center"
            title="切换主题"
          >
            {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-blue-600" />}
          </button>
        </div>
        
        <button 
          onClick={onOpenSearch}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-slate-400 border border-slate-200 rounded-full hover:border-slate-300 transition-colors bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-slate-700"
        >
          <Search size={16} />
          <span>搜索文档...</span>
          <kbd className="ml-2 font-sans text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200 dark:bg-slate-800 dark:border-slate-700">⌘K</kbd>
        </button>
        
        <div className="hidden sm:block h-6 w-px bg-slate-200 mx-1 dark:bg-slate-800" />
        
        <a 
          href={OFFICIAL_WEBSITE} 
          target="_blank" 
          rel="noreferrer" 
          className="hidden sm:flex text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors items-center gap-1.5 dark:text-slate-400 dark:hover:text-white"
        >
          <ExternalLinkIcon size={14} />
          官网
        </a>
    </div>
  </header>
);

export const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void; onOpenSearch: () => void }> = ({ isOpen, onClose, onOpenSearch }) => {
  const location = useLocation();

  const renderNavItems = (items: any[], level = 0) => {
    return (
      <ul className={`space-y-1 ${level > 0 ? 'ml-4 mt-1 border-l border-slate-100 pl-2 dark:border-slate-800' : ''}`}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const hasChildren = item.items && item.items.length > 0;

          return (
            <li key={item.path || item.title}>
              {item.path ? (
                <Link
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={`
                    flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-slate-100 text-slate-900 border-l-2 border-slate-900 dark:bg-slate-800 dark:text-white dark:border-white' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <span>{item.icon}</span>}
                    {item.title}
                  </div>
                  {isActive && <ChevronRight size={14} className="text-slate-400" />}
                </Link>
              ) : (
                <div className="px-3 py-2 text-sm font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                  {item.title}
                </div>
              )}
              {hasChildren && renderNavItems(item.items, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* 移动端侧边栏遮罩 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden animate-in fade-in duration-300" 
          onClick={onClose}
        />
      )}
      <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block dark:bg-slate-950 dark:border-slate-800
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="h-full overflow-y-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">菜单导航</span>
            <button onClick={onClose} className="lg:hidden dark:text-white p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-xl dark:hover:bg-slate-800">
              <X size={24} />
            </button>
          </div>
        </div>
        
        <nav className="space-y-8">
          {NAVIGATION.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 px-3 dark:text-slate-400">
                {section.title}
              </h3>
              {renderNavItems(section.items)}
            </div>
          ))}
        </nav>
      </div>
    </aside>
    </>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [showSyncNotify, setShowSyncNotify] = useState(false);
  const [syncMsg, setSyncMsg] = useState('');
  const [query, setQuery] = useState('');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      // 默认返回 false，即亮色模式
      return false;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    // 强制同步颜色方案到浏览器，防止浏览器误以为只切换了“系统主题”
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle Clicked, Current:', isDark);
    setIsDark(!isDark);
  };
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<{ slug: string; title: string; score: number; snippet: string }[]>([]);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll lock for search modal
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    // 页面加载后延迟 1s 触发一次欢迎提示，方便用户验证效果
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('sync-notify', { 
        detail: '欢迎使用 StarMC Wiki！已连接同步系统' 
      }));
    }, 1000);
    
    const handleSyncNotify = (e: any) => {
      setSyncMsg(e.detail || '同步成功');
      setShowSyncNotify(true);
      // 动画总时长 2.6s，留一点余量
      setTimeout(() => setShowSyncNotify(false), 2700);
    };
    window.addEventListener('sync-notify', handleSyncNotify);
    return () => {
      window.removeEventListener('sync-notify', handleSyncNotify);
      clearTimeout(timer);
    };
  }, []);

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      {!isAdminPage && (
        <Header 
          onOpenSearch={() => setSearchOpen(true)} 
          onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
          isDark={isDark} 
          toggleDark={toggleDark} 
        />
      )}
      
      <div className="flex-1 flex flex-col lg:flex-row max-w-8xl mx-auto w-full relative">
        {!isAdminPage && <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} onOpenSearch={() => setSearchOpen(true)} />}
        
        <main className={`flex-1 min-w-0 bg-white dark:bg-slate-950 ${isAdminPage ? 'w-full px-4' : ''}`}>
          {!isAdminPage && (
            <div className="lg:hidden p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/50 backdrop-blur-sm dark:bg-slate-950/50 sticky top-0 z-30">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              >
                <Menu size={18} />
                目录导航
              </button>
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
              >
                <Search size={18} />
                搜索
              </button>
            </div>
          )}
          {children}
        </main>
      </div>

      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[110] flex items-start justify-center pt-2 sm:pt-20 px-2 sm:px-4 bg-slate-900/60 backdrop-blur-sm dark:bg-black/80"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSearchOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 dark:bg-slate-900 dark:border dark:border-slate-800 flex flex-col max-h-[85vh] sm:max-h-[70vh]" onClick={e => e.stopPropagation()}>
            <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center gap-3 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              <Search className="text-slate-400 flex-shrink-0" size={18} />
              <input 
                autoFocus
                type="text" 
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                placeholder="搜索文档..." 
                className="flex-1 outline-none text-sm sm:text-lg text-slate-900 placeholder:text-slate-300 bg-transparent dark:text-white dark:placeholder:text-slate-600 min-w-0"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 flex-shrink-0">
                <X size={18} />
              </button>
            </div>
            <div className="p-2 sm:p-4 overflow-y-auto flex-1">
              {query.trim() === '' ? (
                <div className="py-12 text-center text-slate-400">
                  <div className="mb-3"><Book size={32} className="mx-auto opacity-20" /></div>
                  <p className="text-sm font-medium">请输入关键词开始搜索</p>
                </div>
              ) : (
                <>
                  <ul className="space-y-2 sm:space-y-3">
                    {results.map(r => (
                      <li key={r.slug} className="p-2.5 sm:p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors dark:border-slate-800 dark:hover:bg-slate-800">
                        <Link 
                          to={`/wiki/${r.slug}`} 
                          onClick={() => setSearchOpen(false)}
                          className="font-black text-sm sm:text-base text-slate-900 dark:text-white block mb-1"
                        >
                          {r.title}
                        </Link>
                        <div className="text-[11px] sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2" dangerouslySetInnerHTML={{ __html: r.snippet }} />
                      </li>
                    ))}
                    {results.length === 0 && (
                      <li className="py-12 text-center text-slate-400 font-medium">无匹配结果</li>
                    )}
                  </ul>
                  <div className="mt-4 sm:mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div className="text-[9px] sm:text-xs text-slate-500 uppercase tracking-widest font-black">共 {total} 条</div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button 
                        disabled={page <= 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-2.5 py-1.5 text-[9px] sm:text-xs font-black rounded-lg border border-slate-200 disabled:opacity-30 dark:border-slate-800 dark:text-slate-400 transition-all active:scale-95"
                      >
                        上一页
                      </button>
                      <button 
                        disabled={page * pageSize >= total}
                        onClick={() => setPage(p => p + 1)}
                        className="px-2.5 py-1.5 text-[9px] sm:text-xs font-black rounded-lg border border-slate-200 disabled:opacity-30 dark:border-slate-800 dark:text-slate-400 transition-all active:scale-95"
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

      {/* 同步提示浮窗 */}
      {showSyncNotify && (
        <div className="fixed top-6 right-6 z-[999] pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl px-4 py-3 flex items-center gap-3 animate-sms-float dark:bg-slate-900/90 dark:border-slate-800">
            <div className="bg-blue-500 p-1.5 rounded-lg text-white">
              <Github size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {syncMsg || '同步成功'}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {new Date().toLocaleString('zh-CN', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: false 
                }).replace(/\//g, '-')}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
          @keyframes sms-float {
            0% { opacity: 0; transform: translateY(-12px); }
            12% { opacity: 1; transform: translateY(0); }
            88% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-8px); }
          }
          .animate-sms-float {
            animation: sms-float 2.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
        `}</style>
    </div>
  );
};
