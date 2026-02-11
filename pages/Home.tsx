import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  ChevronRight, 
  Copy, 
  Terminal, 
  Globe, 
  Zap, 
  Check, 
  Search,
  Layout as LayoutIcon,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Box,
  Layers,
  Code
} from 'lucide-react';
import { SERVER_NAME, SERVER_IPS, OFFICIAL_WEBSITE } from '../constants';

type ThemeType = 'blueprint' | 'aura' | 'voxel';

const Home: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeType>('blueprint');

  useEffect(() => {
    const themes: ThemeType[] = ['blueprint', 'aura', 'voxel'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTheme(randomTheme);
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 ${
      theme === 'blueprint' ? 'bg-slate-50 dark:bg-slate-950' : 
      theme === 'aura' ? 'bg-white dark:bg-slate-950' : 
      'bg-stone-50 dark:bg-slate-950'
    }`}>
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {theme === 'blueprint' && (
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]"></div>
          </div>
        )}
        
        {theme === 'aura' && (
          <>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/20 dark:bg-blue-600/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/20 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-400/10 dark:bg-purple-600/5 blur-[100px] rounded-full animate-bounce" style={{ animationDuration: '10s' }}></div>
          </>
        )}

        {theme === 'voxel' && (
          <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 20px' }}></div>
          </div>
        )}
      </div>

      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 lg:pt-20">
        {/* Hero Section - Magazine Layout */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12 lg:mb-24 lg:mb-40">
          <div className="lg:col-span-8 space-y-4 lg:space-y-8">
            <div className={`inline-flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-1 rounded-full animate-in fade-in duration-1000 ${
              theme === 'blueprint' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-slate-800' :
              theme === 'aura' ? 'bg-blue-50 border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/50' :
              'bg-emerald-100 border-2 border-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-500/50'
            }`}>
              <span className="relative flex h-1.5 w-1.5 lg:h-2 lg:w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  theme === 'voxel' ? 'bg-emerald-400' : 'bg-blue-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 lg:h-2 lg:w-2 ${
                  theme === 'voxel' ? 'bg-emerald-500' : 'bg-blue-500'
                }`}></span>
              </span>
              <span className={`text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] ${
                theme === 'blueprint' ? 'text-inherit' :
                theme === 'aura' ? 'text-blue-700 dark:text-blue-400' :
                'text-emerald-700 dark:text-emerald-400'
              }`}>Documentation Hub v2.0</span>
            </div>
            
            <h1 className="text-[clamp(2rem,12vw,8rem)] font-black tracking-tighter leading-[0.85] text-slate-900 dark:text-white animate-in fade-in slide-in-from-left-8 duration-1000 delay-150">
              {SERVER_NAME.split(' ')[0]}<br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
                theme === 'blueprint' ? 'from-slate-700 to-slate-900 dark:from-slate-200 dark:to-white' :
                theme === 'aura' ? 'from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400' :
                'from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400'
              }`}>
                {SERVER_NAME.split(' ')[1] || 'WIKI'}
              </span>
            </h1>
          </div>
          
          <div className="lg:col-span-4 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <p className={`text-[clamp(1.1rem,2vw,1.5rem)] text-slate-500 font-medium leading-tight dark:text-slate-400 border-l-4 pl-4 md:pl-6 transition-colors duration-500 ${
              theme === 'blueprint' ? 'border-slate-900 dark:border-white' :
              theme === 'aura' ? 'border-blue-600 dark:border-blue-400' :
              'border-emerald-600 dark:border-emerald-400'
            }`}>
              专注于稳定、纯净生存与技术交流的 Minecraft 社区。在这里，每一行文档都为你指引归途。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link to="/wiki/intro" className={`flex-1 px-6 md:px-8 py-4 md:py-5 font-bold rounded-2xl flex items-center justify-between group hover:-translate-y-1 hover:shadow-2xl active:scale-[0.98] transition-all duration-300 ${
                theme === 'blueprint' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' :
                theme === 'aura' ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20' :
                'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-500/20'
              }`}>
                开始探索
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href={OFFICIAL_WEBSITE} target="_blank" rel="noreferrer" className="px-6 md:px-8 py-4 md:py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 hover:-translate-y-1 hover:border-blue-200 active:scale-[0.98] transition-all duration-300 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:hover:bg-slate-900">
                官网
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        </header>

        {/* Featured Section - Grid System */}
        <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-[2rem] md:rounded-[3rem] overflow-hidden border mb-20 md:mb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 ${
          theme === 'blueprint' ? 'bg-slate-200 border-slate-200 dark:bg-slate-800 dark:border-slate-800' :
          theme === 'aura' ? 'bg-slate-200/50 border-slate-200/50 backdrop-blur-xl dark:bg-slate-800/50 dark:border-slate-800/50' :
          'bg-stone-200 border-stone-200 dark:bg-slate-800 dark:border-slate-800'
        }`}>
          {[
            { 
              title: "纯净生存", 
              desc: "回归最本真的游戏体验，无繁琐插件，唯有协作与创造。",
              icon: <Zap className={theme === 'voxel' ? 'text-emerald-500' : 'text-blue-500'} />,
              bg: theme === 'aura' ? 'bg-white/70 dark:bg-slate-950/70' : 'bg-white dark:bg-slate-950'
            },
            { 
              title: "技术社区", 
              desc: "汇聚红石大牛与生电爱好者，共同挑战原版生存极限。",
              icon: <Cpu className={theme === 'voxel' ? 'text-teal-500' : 'text-indigo-500'} />,
              bg: theme === 'aura' ? 'bg-white/70 dark:bg-slate-950/70' : 'bg-white dark:bg-slate-950'
            },
            { 
              title: "安全稳定", 
              desc: "多重数据备份与专业的管理团队，守护每一份建筑成果。",
              icon: <ShieldCheck className={theme === 'voxel' ? 'text-amber-500' : 'text-emerald-500'} />,
              bg: theme === 'aura' ? 'bg-white/70 dark:bg-slate-950/70' : 'bg-white dark:bg-slate-950'
            }
          ].map((item, i) => (
            <div key={i} className={`p-8 md:p-12 ${item.bg} hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all duration-500 group relative overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br from-transparent opacity-0 group-hover:opacity-100 transition-opacity ${
                theme === 'blueprint' ? 'group-hover:from-slate-500/5' :
                theme === 'aura' ? 'group-hover:from-blue-500/10' :
                'group-hover:from-emerald-500/10'
              }`} />
              <div className="relative z-10">
                <div className={`mb-6 md:mb-8 p-4 w-fit rounded-2xl group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 ${
                  theme === 'blueprint' ? 'bg-slate-50 dark:bg-slate-900 group-hover:bg-white dark:group-hover:bg-slate-800' :
                  theme === 'aura' ? 'bg-blue-50 dark:bg-blue-900/30 group-hover:bg-white dark:group-hover:bg-blue-900/50' :
                  'bg-emerald-50 dark:bg-emerald-950/30 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/50'
                }`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 dark:text-white group-hover:translate-x-1 transition-transform">{item.title}</h3>
                <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed group-hover:translate-x-1 transition-transform delay-75">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Access Points - Editorial Style */}
        <section className="mb-24 md:mb-40">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4 md:mb-6 dark:text-white tracking-tight">服务器接入点</h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium dark:text-slate-400">
                选择最适合你的连接线路。建议根据你的网络环境优先尝试主线路。
              </p>
            </div>
            <div className={`hidden lg:block h-px flex-1 mx-12 mb-6 ${
              theme === 'blueprint' ? 'bg-slate-300 dark:bg-slate-700' :
              theme === 'aura' ? 'bg-blue-200 dark:bg-blue-800' :
              'bg-emerald-200 dark:bg-emerald-800'
            }`} />
            <div className="text-right">
              <span className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest">ACCESS POINTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            {[
              { label: "主连接线路", ip: SERVER_IPS.primary, icon: <Zap size={24} className={theme === 'voxel' ? 'text-emerald-500' : 'text-amber-500'} />, badge: "推荐" },
              { label: "备用连接线路", ip: SERVER_IPS.secondary, icon: <Globe size={24} className={theme === 'voxel' ? 'text-teal-500' : 'text-blue-500'} />, badge: "稳定" }
            ].map((item, i) => (
              <div key={i} className={`group p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden ${
                theme === 'blueprint' ? 'bg-slate-100/50 border-slate-200 hover:border-slate-400 hover:bg-white dark:bg-slate-900/50 dark:border-slate-800' :
                theme === 'aura' ? 'bg-white/40 backdrop-blur-md border-white/40 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 dark:bg-slate-900/40 dark:border-slate-800/40' :
                'bg-stone-100/80 border-stone-200 hover:border-emerald-300 hover:bg-white dark:bg-slate-900/80 dark:border-slate-800'
              }`}>
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700 ${
                  theme === 'blueprint' ? 'bg-slate-500/10' :
                  theme === 'aura' ? 'bg-blue-500/20' :
                  'bg-emerald-500/20'
                }`} />
                <div className="flex items-center justify-between mb-6 md:mb-8 relative z-10">
                  <div className={`p-4 rounded-2xl shadow-sm group-hover:rotate-6 transition-transform ${
                    theme === 'aura' ? 'bg-white/80 dark:bg-slate-800/80' : 'bg-white dark:bg-slate-800'
                  }`}>{item.icon}</div>
                  <span className={`px-3 py-1 text-[10px] md:text-xs font-black rounded-full ${
                    theme === 'blueprint' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' :
                    theme === 'aura' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  }`}>
                    {item.badge}
                  </span>
                </div>
                <div className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest mb-4 dark:text-slate-500 relative z-10">{item.label}</div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 relative z-10">
                  <div className={`flex-1 px-4 md:px-6 py-3 md:py-4 rounded-2xl border transition-colors shadow-inner flex items-center justify-center sm:justify-start ${
                    theme === 'aura' ? 'bg-white/60 dark:bg-slate-950/60 border-white/40 group-hover:border-blue-300' :
                    'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 group-hover:border-blue-300 dark:group-hover:border-blue-700'
                  }`}>
                    <code className="text-base md:text-xl text-slate-900 font-mono font-bold dark:text-white break-all">{item.ip}</code>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(item.ip)}
                    className={`px-6 md:px-8 py-3 md:py-4 flex items-center justify-center gap-2 font-black rounded-2xl transition-all relative overflow-hidden active:scale-95 flex-shrink-0 ${
                      copied === item.ip 
                        ? 'bg-emerald-500 text-white' 
                        : theme === 'blueprint' ? 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 shadow-lg' :
                          theme === 'aura' ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20' :
                          'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20'
                    }`}
                  >
                    {copied === item.ip ? <Check size={18} /> : <Copy size={18} />}
                    <span className="text-sm md:text-base">{copied === item.ip ? '已复制' : '复制地址'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Editorial */}
        <footer className={`border-t pt-20 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 ${
          theme === 'blueprint' ? 'border-slate-200 dark:border-slate-800' :
          theme === 'aura' ? 'border-blue-100 dark:border-blue-900/50' :
          'border-emerald-100 dark:border-emerald-900/50'
        }`}>
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${
                theme === 'blueprint' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' :
                theme === 'aura' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' :
                'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
              }`}>
                <Terminal size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter dark:text-white uppercase">StarMC Wiki</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">
              舵星归途 StarMC 官方服务器 Wiki。在这里，每一行文档都为你指引归途。
            </p>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">快速链接</h4>
            <ul className="space-y-2">
              <li><Link to="/wiki/intro" className={`text-lg font-bold transition-colors ${
                theme === 'blueprint' ? 'text-slate-900 dark:text-white hover:text-slate-600' :
                theme === 'aura' ? 'text-slate-900 dark:text-white hover:text-blue-600' :
                'text-slate-900 dark:text-white hover:text-emerald-600'
              }`}>入门指南</Link></li>
              <li><Link to="/wiki/rules" className={`text-lg font-bold transition-colors ${
                theme === 'blueprint' ? 'text-slate-900 dark:text-white hover:text-slate-600' :
                theme === 'aura' ? 'text-slate-900 dark:text-white hover:text-blue-600' :
                'text-slate-900 dark:text-white hover:text-emerald-600'
              }`}>社区准则</Link></li>
              <li><a href={OFFICIAL_WEBSITE} className={`text-lg font-bold transition-colors ${
                theme === 'blueprint' ? 'text-slate-900 dark:text-white hover:text-slate-600' :
                theme === 'aura' ? 'text-slate-900 dark:text-white hover:text-blue-600' :
                'text-slate-900 dark:text-white hover:text-emerald-600'
              }`}>官方网站</a></li>
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
