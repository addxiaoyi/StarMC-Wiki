
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// Minimal implementation of a markdown-to-html like structure for the demo.
// In a production environment, one should use react-markdown.
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple heuristic parsing for the demo purposes
  const lines = content.split('\n');
  
  return (
    <div className="prose prose-slate max-w-none">
      {lines.map((line, idx) => {
        if (line.startsWith('# ')) return <h1 key={idx} className="text-4xl font-extrabold text-slate-900 mt-2 mb-8">{line.slice(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold text-slate-800 mt-12 mb-4 pb-2 border-b border-slate-100">{line.slice(3)}</h2>;
        if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-semibold text-slate-800 mt-8 mb-4">{line.slice(4)}</h3>;
        if (line.startsWith('- ')) return <li key={idx} className="ml-4 mb-2 text-slate-600 list-disc">{line.slice(2)}</li>;
        if (line.startsWith('> ')) return <blockquote key={idx} className="border-l-4 border-slate-200 pl-4 italic text-slate-500 my-6">{line.slice(2)}</blockquote>;
        if (line.startsWith('| ')) return null; // Simplified: skip tables in this mock
        if (line.trim() === '') return <div key={idx} className="h-2" />;
        
        // Handle basic bolding/links in strings
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\`(.*?)\`/g, '<code class="bg-slate-100 px-1 rounded text-pink-600 text-sm">$1</code>');
        
        return (
          <p 
            key={idx} 
            className="text-slate-600 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formattedLine }} 
          />
        );
      })}
    </div>
  );
};
