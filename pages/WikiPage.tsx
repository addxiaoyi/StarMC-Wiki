
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Navigate, Link, useLocation } from 'react-router-dom';
import { Calendar, Tag, ChevronRight, ArrowLeft, Share2, Edit3, Loader2, Download, Layers } from 'lucide-react';
import { MOCK_PAGES } from '../constants';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { WikiPage as WikiPageType } from '../types';

const WikiPage: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [meta, setMeta] = useState<Partial<WikiPageType>>({});

  // 基础信息
  const basePageInfo = MOCK_PAGES.find(p => p.slug === slug);

  // 解析 MD 中的元数据
  const parseMetadata = (text: string) => {
    const metaMatch = text.match(/<!--([\s\S]*?)-->/);
    if (!metaMatch) return { cleanContent: text, metadata: {} };

    const metaStr = metaMatch[1];
    const metadata: any = {};
    const lines = metaStr.split('\n');
    
    lines.forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().toUpperCase();
        const value = parts.slice(1).join(':').trim();
        if (key === 'TITLE') metadata.title = value;
        if (key === 'CATEGORY') metadata.category = value;
        if (key === 'LAST_UPDATED') metadata.lastUpdated = value;
        if (key === 'PARENT') metadata.parent = value;
        if (key === 'ICON') metadata.icon = value;
      }
    });

    return {
      cleanContent: text.replace(metaMatch[0], '').trim(),
      metadata
    };
  };

  useEffect(() => {
    const fetchContent = async () => {
      if (!slug) return;
      setLoading(true);
      setError(false);
      try {
        // 优先尝试从 API 路径获取
        const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
        const response = await fetch(`${baseUrl}/content/wiki/${slug}.md?v=${Date.now()}`);
        if (!response.ok) throw new Error(`Failed to load markdown: ${response.status}`);
        const text = await response.text();
        
        const { cleanContent, metadata } = parseMetadata(text);
        setContent(cleanContent);
        setMeta(metadata);
      } catch (err) {
        console.error('Error fetching markdown:', err);
        if (basePageInfo?.content) {
          setContent(basePageInfo.content);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug, basePageInfo]);

  // 合并元数据
  const displayInfo = useMemo(() => ({
    ...basePageInfo,
    ...meta,
    title: meta.title || basePageInfo?.title || slug,
    category: meta.category || basePageInfo?.category || '文档',
    lastUpdated: meta.lastUpdated || basePageInfo?.lastUpdated || '2026-02-10',
  }), [basePageInfo, meta, slug]);

  // 获取子页面 (通过 parent 字段)
  const subPages = useMemo(() => {
    return MOCK_PAGES.filter(p => p.parent === slug);
  }, [slug]);

  const handleShare = async () => {
    const shareUrl = window.location.origin + location.pathname;
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayInfo?.title || 'StarMC Wiki',
          url: shareUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  if (!basePageInfo && !loading && !meta.title) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-4">
        <Loader2 size={40} className="animate-spin text-slate-200" />
        <p className="text-sm font-medium">正在从云端同步文档...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Tag size={40} />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-4">文档加载失败</h1>
        <p className="text-slate-500 mb-8">抱歉，我们无法找到该页面的 Markdown 源文件。</p>
        <Link to="/" className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 lg:py-16 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-slate-900 transition-colors">首页</Link>
        <ChevronRight size={12} />
        <span className="text-slate-900">{displayInfo?.category || 'Wiki'}</span>
        <ChevronRight size={12} />
        <span className="text-slate-500">{displayInfo?.title || slug}</span>
      </nav>

      {/* Hero Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-md">
            <Calendar size={12} />
            最后更新: {displayInfo?.lastUpdated || '2026-02-10'}
          </div>
          <div className="flex items-center gap-1.5">
            <Tag size={12} />
            {displayInfo?.category || '文档'}
          </div>
          {displayInfo?.icon && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
              <span className="text-lg">{displayInfo.icon}</span>
            </div>
          )}
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {displayInfo?.title || slug}
        </h1>
      </header>

      {/* Main Content Area */}
      <div className="relative">
        <MarkdownRenderer content={content} />
      </div>

      {/* 子页面导航 (如果存在) */}
      {subPages.length > 0 && (
        <div className="mt-16 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Layers size={20} className="text-indigo-500" />
            相关子页面
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subPages.map(page => (
              <Link 
                key={page.slug}
                to={`/wiki/${page.slug}`}
                className="group p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{page.title}</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Page Footer / Controls */}
      <footer className="mt-20 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
          >
            <ArrowLeft size={16} />
            返回首页
          </Link>
          {slug === 'template' && (
            <button 
              onClick={() => {
                const blob = new Blob([`<!--\nTITLE: 这里填写页面标题\nCATEGORY: 这里填写侧边栏分类\nLAST_UPDATED: ${new Date().toISOString().split('T')[0]}\nPARENT: \nICON: 📄\n-->\n\n# 页面主标题\n\n内容编写...`], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'template.md';
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all"
            >
              <Download size={16} />
              下载此模板
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className="p-2 text-slate-400 hover:text-slate-900 transition-colors relative" 
            title="分享"
            onClick={handleShare}
          >
            <Share2 size={20} />
            {copied && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                已复制!
              </span>
            )}
          </button>
          <a 
            href={`https://codeberg.org/addxiaoyi/starmc-wiki-page/src/branch/main/public/content/wiki/${slug}.md`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 ml-4 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
          >
            <Edit3 size={16} />
            编辑此页 (MD)
          </a>
        </div>
      </footer>

      {/* Meta info for contribution */}
      <div className="mt-12 p-6 bg-slate-900 rounded-[2.5rem] text-white overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <Edit3 size={120} />
        </div>
        <div className="relative z-10">
          <h4 className="text-lg font-black mb-2 flex items-center gap-2">
            🚀 维护说明
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg">
            该页面已全面启用 Markdown 模式。您可以直接在仓库的 <code className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono text-xs">/public/content/wiki/</code> 目录下修改对应的 <code className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-mono text-xs">.md</code> 文件来快速更新内容。
          </p>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">{i}</div>)}
             </div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">支持实时热更新</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPage;
