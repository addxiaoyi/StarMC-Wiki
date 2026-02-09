import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const lines = content.split('\n');
  let inList = false;
  let inTable = false;
  
  return (
    <div className="prose prose-slate max-w-none">
      {lines.map((line, idx) => {
        const trimmedLine = line.trim();
        
        // Handle Horizontal Rule
        if (trimmedLine === '---') {
          return <hr key={idx} className="my-8 border-slate-200" />;
        }

        // Handle Headings
        if (line.startsWith('# ')) {
          return <h1 key={idx} className="text-3xl font-black text-slate-900 mt-16 mb-8 tracking-tight">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl font-bold text-slate-800 mt-12 mb-6 pb-2 border-b border-slate-100">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-xl font-bold text-slate-800 mt-8 mb-4">{line.slice(4)}</h3>;
        }

        // Handle Lists
        if (line.startsWith('- ') || line.startsWith('* ')) {
          inList = true;
          const formatted = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                       .replace(/\`(.*?)\`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-sm">$1</code>');
          return (
            <div key={idx} className="flex gap-3 mb-2 ml-4">
              <span className="text-slate-300 select-none">•</span>
              <span className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted }} />
            </div>
          );
        }

        // Handle Blockquotes
        if (line.startsWith('> ')) {
          const formatted = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          return (
            <blockquote key={idx} className="border-l-4 border-indigo-500 bg-indigo-50/30 px-6 py-4 rounded-r-xl my-8 italic text-slate-600">
              <p dangerouslySetInnerHTML={{ __html: formatted }} />
            </blockquote>
          );
        }

        // Handle Empty Lines
        if (trimmedLine === '') {
          inList = false;
          return <div key={idx} className="h-4" />;
        }

        // Handle Tables (Minimal support for Markdown tables)
        if (line.startsWith('|')) {
          if (line.includes('---')) return null; // Skip separator line
          const cells = line.split('|').filter(c => c.trim() !== '');
          return (
            <div key={idx} className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-slate-200 rounded-lg overflow-hidden">
                <tbody className="bg-white">
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-sm text-slate-600 border-r border-slate-100 last:border-0">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }

        // Default Paragraph Handling
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\`(.*?)\`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-mono text-sm">$1</code>')
                                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-indigo-600 hover:text-indigo-800 underline underline-offset-4 decoration-indigo-200 transition-all font-medium">$1</a>');
        
        return (
          <p 
            key={idx} 
            className="text-slate-600 leading-relaxed mb-4 text-[15px]"
            dangerouslySetInnerHTML={{ __html: formattedLine }} 
          />
        );
      })}
    </div>
  );
};
