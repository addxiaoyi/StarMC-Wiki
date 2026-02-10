import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ChevronRight, 
  Copy, 
  ExternalLink, 
  Terminal, 
  Globe, 
  Zap, 
  Check, 
  Search,
  Layout as LayoutIcon,
  ShieldCheck,
  Cpu,
  ArrowUpRight
} from 'lucide-react';
import { SERVER_NAME, SERVER_IPS, OFFICIAL_WEBSITE } from '../constants';

const Home: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 selection:bg-blue-100 dark:selection:bg-blue-900/30 transition-colors duration-500">
      {/* 谷歌杂志风格 Header 引导 */}
      <div className="max-w-7xl mx-auto px-6 pt-12 lg:pt-20">
        <div className="md:hidden mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <button 
            className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl text-slate-900 font-bold flex flex-col items-center justify-center gap-3 dark:bg-slate-900 dark:border-slate-800 dark:text-white group active:scale-[0.98] transition-all"
            onClick={() => {
              const floatingSearch = document.querySelector('[style*="zIndex: 999"] button') as HTMLButtonElement;
              floatingSearch?.click();
            }}
          >
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
              <Search size={24} />
            </div>
            <div className="text-center">
              <p className="text-lg">准备好探索了吗？</p>
              <p className="text-sm text-slate-500 font-medium">点击底部蓝色按钮开始搜索</p>
            </div>
          </button>
        </div>

        {/* Hero Section - Magazine Layout */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24 lg:mb-40">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full dark:bg-blue-950/30 dark:border-blue-900/50 animate-in fade-in duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">Documentation Hub v2.0</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tight leading-[0.85] text-slate-900 dark:text-white animate-in fade-in slide-in-from-left-8 duration-1000 delay-150">
              {SERVER_NAME.split(' ')[0]}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {SERVER_NAME.split(' ')[1] || 'WIKI'}
              </span>
            </h1>
          </div>
          
          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <p className="text-2xl text-slate-500 font-medium leading-tight dark:text-slate-400 border-l-4 border-blue-600 pl-6 dark:border-blue-400">
              专注于稳定、纯净生存与技术交流的 Minecraft 社区。在这里，每一行文档都为你指引归途。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/wiki/intro" className="flex-1 px-8 py-5 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-between group hover:bg-blue-600 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-blue-50">
                开始探索
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={OFFICIAL_WEBSITE} target="_blank" rel="noreferrer" className="px-8 py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:hover:bg-slate-900">
                官网
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </header>

        {/* Featured Section - Grid System */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-slate-200 dark:bg-slate-800 rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 mb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          {[
            { 
              title: "纯净生存", 
              desc: "回归最本真的游戏体验，无繁琐插件，唯有协作与创造。",
              icon: <Zap className="text-blue-600" />,
              bg: "bg-white dark:bg-slate-950"
            },
            { 
              title: "技术社区", 
              desc: "汇聚红石大牛与生电爱好者，共同挑战原版生存极限。",
              icon: <Cpu className="text-indigo-600" />,
              bg: "bg-white dark:bg-slate-950"
            },
            { 
              title: "安全稳定", 
              desc: "多重数据备份与专业的管理团队，守护每一份建筑成果。",
              icon: <ShieldCheck className="text-emerald-600" />,
              bg: "bg-white dark:bg-slate-950"
            }
          ].map((item, i) => (
            <div key={i} className={`p-12 ${item.bg} hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group`}>
              <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-900 w-fit rounded-2xl group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-800 transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-3xl font-black mb-4 dark:text-white">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* Access Points - Editorial Style */}
        <section className="mb-40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black mb-6 dark:text-white tracking-tight">服务器接入点</h2>
              <p className="text-xl text-slate-500 font-medium dark:text-slate-400">
                选择最适合你的连接线路。建议根据你的网络环境优先尝试主线路。
              </p>
            </div>
            <div className="hidden lg:block h-px flex-1 bg-slate-200 mx-12 mb-6 dark:bg-slate-800" />
            <div className="text-right">
              <span className="text-sm font-black text-slate-400 uppercase tracking-widest">ACCESS POINTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { label: "主连接线路", ip: SERVER_IPS.primary, icon: <Zap size={24} className="text-amber-500" />, badge: "推荐" },
              { label: "备用连接线路", ip: SERVER_IPS.secondary, icon: <Globe size={24} className="text-blue-500" />, badge: "稳定" }
            ].map((item, i) => (
              <div key={i} className="group p-10 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-blue-200 hover:bg-white dark:bg-slate-900 dark:hover:bg-slate-950 dark:hover:border-blue-900/50 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">{item.icon}</div>
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 text-xs font-black rounded-full dark:bg-blue-900/40 dark:text-blue-300">
                    {item.badge}
                  </span>
                </div>
                <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 dark:text-slate-500">{item.label}</div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <div className="flex-1 bg-white dark:bg-slate-950 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors">
                    <code className="text-xl text-slate-900 font-mono font-bold dark:text-white">{item.ip}</code>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(item.ip)}
                    className={`px-8 py-4 flex items-center justify-center gap-2 font-black rounded-2xl transition-all ${
                      copied === item.ip 
                        ? 'bg-emerald-500 text-white scale-95' 
                        : 'bg-slate-900 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500'
                    }`}
                  >
                    {copied === item.ip ? <Check size={20} /> : <Copy size={20} />}
                    {copied === item.ip ? '已复制' : '复制地址'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Editorial */}
        <footer className="border-t border-slate-200 dark:border-slate-800 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 text-white p-2 rounded-xl dark:bg-white dark:text-slate-900">
                <Terminal size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter dark:text-white uppercase">StarMC Wiki</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">
              致力于打造最详尽的生电生存指南。代码开源，内容共享。
            </p>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">快速链接</h4>
            <ul className="space-y-2">
              <li><Link to="/wiki/intro" className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">入门指南</Link></li>
              <li><Link to="/wiki/rules" className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">社区准则</Link></li>
              <li><a href={OFFICIAL_WEBSITE} className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">官方网站</a></li>
            </ul>
          </div>
          <div className="lg:col-span-3 space-y-4 text-right">
             <div className="text-sm font-black text-slate-400 uppercase tracking-widest">© 2026 STARMC</div>
             <p className="text-slate-500 dark:text-slate-400 font-medium text-xs">
               Crafted with passion for the Minecraft community.
             </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
