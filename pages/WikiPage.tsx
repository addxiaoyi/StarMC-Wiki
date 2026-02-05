
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Calendar, Tag, ChevronRight, ArrowLeft, Share2, Printer, Edit3 } from 'lucide-react';
import { MOCK_PAGES } from '../constants';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const WikiPage: React.FC = () => {
  const { slug } = useParams();
  const page = MOCK_PAGES.find(p => p.slug === slug);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 lg:py-16 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-slate-900 transition-colors">首页</Link>
        <ChevronRight size={12} />
        <span className="text-slate-900">{page.category}</span>
        <ChevronRight size={12} />
        <span className="text-slate-500">{page.title}</span>
      </nav>

      {/* Hero Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 mb-4">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-md">
            <Calendar size={12} />
            最后更新: {page.lastUpdated}
          </div>
          <div className="flex items-center gap-1.5">
            <Tag size={12} />
            {page.category}
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {page.title}
        </h1>
      </header>

      {/* Main Content Area */}
      <div className="relative">
        <MarkdownRenderer content={page.content} />
      </div>

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
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors" title="分享">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors" title="打印">
            <Printer size={20} />
          </button>
          <button className="flex items-center gap-2 ml-4 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all">
            <Edit3 size={16} />
            编辑此页
          </button>
        </div>
      </footer>

      {/* Meta info for GitHub deployment help */}
      <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100">
        <h4 className="text-sm font-bold text-amber-900 mb-2 flex items-center gap-2">
          💡 贡献说明
        </h4>
        <p className="text-sm text-amber-800 leading-relaxed">
          您可以直接在 GitHub 仓库的 <code className="bg-amber-100 px-1 rounded font-mono">(docs)</code> 文件夹中提交 Markdown 文件来更新或新增 Wiki 页面。
          提交后，系统将自动重新部署。
        </p>
      </div>
    </div>
  );
};

export default WikiPage;
