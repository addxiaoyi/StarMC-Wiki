
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, ChevronRight, Copy, ExternalLink, Terminal, Globe, Zap, Check } from 'lucide-react';
import { SERVER_NAME, SERVER_IPS, OFFICIAL_WEBSITE } from '../constants';
import { ServerStatus } from '../components/ServerStatus';

const Home: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 lg:py-24">
      {/* Hero Section */}
      <section className="text-center mb-24">
        <div className="inline-flex items-center justify-center mb-10">
          <ServerStatus />
        </div>
        
        <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-slate-900 mb-8">
          {SERVER_NAME}
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
          专注于稳定、纯净生存与技术交流的 Minecraft 社区。
          在此查阅文档了解连接方式与社区准则。
        </p>
        
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link to="/wiki/intro" className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-0 transition-all flex items-center gap-2 group">
            开始探索
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href={OFFICIAL_WEBSITE} target="_blank" rel="noreferrer" className="px-10 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2">
            官方网站
            <ExternalLink size={18} />
          </a>
        </div>
      </section>

      {/* Connection Info */}
      <section className="mb-32">
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px w-12 bg-slate-100" />
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] whitespace-nowrap">
            服务器接入点 / ACCESS POINTS
          </h2>
          <div className="h-px w-12 bg-slate-100" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "主连接线路", ip: SERVER_IPS.primary, icon: <Zap className="text-amber-500" /> },
            { label: "备用连接线路", ip: SERVER_IPS.secondary, icon: <Globe className="text-blue-500" /> },
            { label: "模组服专用", ip: SERVER_IPS.mod, icon: <Terminal className="text-purple-500" /> }
          ].map((item, i) => (
            <div key={i} className="relative group p-8 bg-white border border-slate-100 rounded-[2rem] hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col items-center">
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-500">{item.icon}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{item.label}</div>
              
              <div className="w-full relative">
                <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 w-full group-hover:bg-white transition-colors">
                  <code className="flex-1 text-slate-700 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap text-center">
                    {item.ip}
                  </code>
                </div>
                <button 
                  onClick={() => copyToClipboard(item.ip)}
                  className={`mt-4 w-full py-2 flex items-center justify-center gap-2 text-xs font-bold rounded-xl transition-all ${
                    copied === item.ip ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {copied === item.ip ? <Check size={14} /> : <Copy size={14} />}
                  {copied === item.ip ? '已复制' : '复制地址'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
              <Compass size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">维基导览</h2>
          </div>
          <div className="grid gap-4">
            {[
              { title: "新手入门", desc: "了解如何加入白名单以及基本指引", path: "/wiki/intro" },
              { title: "加入教程", desc: "详细的客户端设置与连接说明", path: "/wiki/join" },
              { title: "服务器规范", desc: "查看游玩规则，维护社区秩序", path: "/wiki/rules" },
            ].map((card, i) => (
              <Link key={i} to={card.path} className="group p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-slate-600 transition-colors">{card.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{card.desc}</p>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white group-hover:translate-x-1 transition-all">
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 text-slate-900 rounded-xl flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">最近动态</h2>
          </div>
          <div className="space-y-6">
            {[
              { date: "2025.12.01", title: "维基接入 Gemini 3 AI 助手服务" },
              { date: "2025.11.20", title: "官方网站 star-web.top 正式上线" },
              { date: "2025.11.18", title: "添加实时服务器状态监控功能" },
            ].map((update, i) => (
              <div key={i} className="flex gap-6 p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                <div className="text-xs font-black text-slate-300 font-mono pt-1 group-hover:text-slate-900 transition-colors">{update.date}</div>
                <div className="text-sm font-bold text-slate-600 leading-snug">{update.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-40 pt-16 border-t border-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-black text-slate-900">
            <Terminal size={18} />
            {SERVER_NAME}
          </div>
          <p className="text-slate-400 text-sm font-medium">
            官网: <a href={OFFICIAL_WEBSITE} className="text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-200 hover:decoration-slate-900 transition-all">{OFFICIAL_WEBSITE}</a>
          </p>
          <p className="text-slate-300 text-[10px] uppercase font-bold tracking-widest">
            StarMC Wiki Project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
