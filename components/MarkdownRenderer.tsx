import React, { useState } from 'react';
import { Info, AlertTriangle, AlertCircle, CheckCircle, ZoomIn, X } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const lines = content.split('\n');
  let inList = false;
  let inTable = false;
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLang = '';
  let inAdmonition = false;
  let admonitionType = '';
  let admonitionTitle = '';
  let admonitionContent: string[] = [];

  const renderAdmonition = (type: string, title: string, contentLines: string[], key: any) => {
    const config = {
      tip: { icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50/50', border: 'border-emerald-200', darkBg: 'dark:bg-emerald-950/20', darkBorder: 'dark:border-emerald-900/50', darkText: 'dark:text-emerald-400' },
      info: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50/50', border: 'border-blue-200', darkBg: 'dark:bg-blue-950/20', darkBorder: 'dark:border-blue-900/50', darkText: 'dark:text-blue-400' },
      warning: { icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50/50', border: 'border-amber-200', darkBg: 'dark:bg-amber-950/20', darkBorder: 'dark:border-amber-900/50', darkText: 'dark:text-amber-400' },
      danger: { icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50/50', border: 'border-rose-200', darkBg: 'dark:bg-rose-950/20', darkBorder: 'dark:border-rose-900/50', darkText: 'dark:text-rose-400' },
    }[type] || { icon: Info, color: 'text-slate-600', bg: 'bg-slate-50/50', border: 'border-slate-200', darkBg: 'dark:bg-slate-900/50', darkBorder: 'dark:border-slate-800', darkText: 'dark:text-slate-400' };

    const Icon = config.icon;

    return (
      <div key={key} className={`my-8 border-l-4 ${config.border} ${config.bg} ${config.darkBorder} ${config.darkBg} rounded-r-xl overflow-hidden`}>
        <div className={`px-4 py-2 border-b ${config.border} ${config.darkBorder} flex items-center gap-2 font-bold ${config.color} ${config.darkText} text-sm uppercase tracking-wider`}>
          <Icon size={18} />
          {title || type.toUpperCase()}
        </div>
        <div className="px-4 py-3 text-slate-600 dark:text-slate-400 leading-relaxed prose-sm">
          {contentLines.map((l, i) => (
            <p key={i} className={i === contentLines.length - 1 ? 'mb-0' : 'mb-2'}>
              {l}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const elements: React.ReactNode[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Handle Code Blocks
    if (trimmedLine.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = trimmedLine.slice(3);
        codeContent = [];
        continue;
      } else {
        inCodeBlock = false;
        const code = codeContent.join('\n');
        elements.push(
          <div key={`code-${i}`} className="my-8 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            {codeLang && (
              <div className="bg-slate-50 dark:bg-slate-900 px-4 py-1.5 text-xs font-mono text-slate-400 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span>{codeLang}</span>
              </div>
            )}
            <pre className="p-4 bg-slate-950 text-slate-300 overflow-x-auto font-mono text-sm leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
        continue;
      }
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // Handle Admonitions (::: type title)
    if (trimmedLine.startsWith(':::')) {
      if (!inAdmonition) {
        inAdmonition = true;
        const parts = trimmedLine.slice(3).trim().split(' ');
        admonitionType = parts[0] || 'info';
        admonitionTitle = parts.slice(1).join(' ');
        admonitionContent = [];
        continue;
      } else {
        inAdmonition = false;
        elements.push(renderAdmonition(admonitionType, admonitionTitle, admonitionContent, `admo-${i}`));
        continue;
      }
    }

    if (inAdmonition) {
      admonitionContent.push(line);
      continue;
    }

    // Handle Images
    const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      elements.push(
        <div key={`img-${i}`} className="my-8 group relative">
          <div 
            className="relative cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
            onClick={() => setZoomImage(src)}
          >
            <img src={src} alt={alt} className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 p-2 rounded-full shadow-lg dark:bg-slate-800/90 dark:text-white">
                <ZoomIn size={20} />
              </div>
            </div>
          </div>
          {alt && <p className="mt-3 text-center text-sm text-slate-400 italic">{alt}</p>}
        </div>
      );
      continue;
    }

    // Handle Horizontal Rule
    if (trimmedLine === '---') {
      elements.push(<hr key={i} className="my-8 border-slate-200 dark:border-slate-800" />);
      continue;
    }

    // Handle Headings
    if (line.startsWith('# ')) {
      const text = line.slice(2);
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
      elements.push(<h1 key={i} id={id} className="text-3xl font-black text-slate-900 mt-16 mb-8 tracking-tight scroll-mt-24 dark:text-white">{text}</h1>);
      continue;
    }
    if (line.startsWith('## ')) {
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
      elements.push(<h2 key={i} id={id} className="text-2xl font-bold text-slate-800 mt-12 mb-6 pb-2 border-b border-slate-100 scroll-mt-24 dark:text-white dark:border-slate-800">{text}</h2>);
      continue;
    }
    if (line.startsWith('### ')) {
      const text = line.slice(4);
      const id = text.toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g, '-');
      elements.push(<h3 key={i} id={id} className="text-xl font-bold text-slate-800 mt-8 mb-4 scroll-mt-24 dark:text-white">{text}</h3>);
      continue;
    }

    // Handle Lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const formatted = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                   .replace(/\`(.*?)\`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-sm dark:bg-slate-800 dark:text-indigo-400">$1</code>')
                                   .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
                                     const finalUrl = url.startsWith('/wiki/') ? `#${url}` : url;
                                     return `<a href="${finalUrl}" class="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 decoration-indigo-200 transition-all font-medium dark:text-indigo-400 dark:hover:text-indigo-300 dark:decoration-indigo-900">${text}</a>`;
                                   });
      elements.push(
        <div key={i} className="flex gap-3 mb-2 ml-4">
          <span className="text-slate-300 select-none dark:text-slate-600">•</span>
          <span className="text-slate-600 leading-relaxed dark:text-slate-400" dangerouslySetInnerHTML={{ __html: formatted }} />
        </div>
      );
      continue;
    }

    // Handle Blockquotes
    if (line.startsWith('> ')) {
      const formatted = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <blockquote key={i} className="border-l-4 border-indigo-500 bg-indigo-50/30 px-6 py-4 rounded-r-xl my-8 italic text-slate-600 dark:bg-indigo-950/20 dark:text-slate-400">
          <p dangerouslySetInnerHTML={{ __html: formatted }} />
        </blockquote>
      );
      continue;
    }

    // Handle Empty Lines
    if (trimmedLine === '') {
      elements.push(<div key={i} className="h-4" />);
      continue;
    }

    // Handle Tables
    if (line.startsWith('|')) {
      if (line.includes('---')) continue;
      const cells = line.split('|').filter(c => c.trim() !== '');
      elements.push(
        <div key={i} className="overflow-x-auto my-6">
          <table className="min-w-full border-collapse border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <tbody className="bg-white dark:bg-slate-900">
              <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                {cells.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400 border-r border-slate-100 dark:border-slate-800 last:border-0">
                    {cell.trim()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Handle Paragraphs
    if (line.trim().length > 0) {
      const processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 text-indigo-600 rounded-md font-mono text-sm dark:bg-slate-800 dark:text-indigo-400">$1</code>')
        .replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
          const finalUrl = url.startsWith('/wiki/') ? `#${url}` : url;
          return `<a href="${finalUrl}" class="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 decoration-indigo-200 transition-all font-medium dark:text-indigo-400 dark:hover:text-indigo-300 dark:decoration-indigo-900">${text}</a>`;
        });
      
      elements.push(<p key={i} className="text-slate-600 leading-relaxed mb-6 dark:text-slate-400" dangerouslySetInnerHTML={{ __html: processedLine }} />);
    }
  }

  return (
    <div className="prose prose-slate max-w-none">
      {elements}
      
      {/* Image Zoom Overlay */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setZoomImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <img 
            src={zoomImage} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" 
            alt="Zoomed" 
          />
        </div>
      )}
    </div>
  );
};
