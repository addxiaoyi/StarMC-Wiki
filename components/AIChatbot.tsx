
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      
      const stream = geminiService.chatStream(userMessage);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, content: fullResponse }];
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我现在无法回答。请检查网络或 API 配置。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group"
      >
        <MessageSquare className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-[400px] h-[600px] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">StarMC AI 助手</h3>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Gemini 3 Pro 在线
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Bot size={48} className="text-slate-200" />
                <p className="text-slate-400 text-sm">
                  你好！我是 StarMC 的 AI 助手。你可以问我关于服务器规则、红石限制或者如何加入的问题。
                </p>
                <div className="grid grid-cols-1 gap-2 w-full">
                  {['服务器地址是多少？', '怎么申请白名单？', '可以用什么模组？'].map(q => (
                    <button 
                      key={q} 
                      onClick={() => setInput(q)}
                      className="text-xs p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  m.role === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white'
                }`}>
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm max-w-[80%] ${
                  m.role === 'user' ? 'bg-slate-100 text-slate-800 rounded-tr-none' : 'bg-white border border-slate-100 shadow-sm text-slate-700 rounded-tl-none'
                }`}>
                  {m.content || <Loader2 size={16} className="animate-spin opacity-50" />}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-slate-400 transition-all">
              <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                <ImageIcon size={18} />
              </button>
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="在此提问..."
                className="flex-1 bg-transparent outline-none text-sm px-2"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className={`p-2 rounded-xl transition-all ${
                  input.trim() ? 'bg-slate-900 text-white' : 'text-slate-300'
                }`}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="mt-2 text-[10px] text-center text-slate-400 uppercase tracking-widest">
              Powered by Google Gemini 3
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
