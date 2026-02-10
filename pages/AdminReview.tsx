
import React, { useState, useEffect } from 'react';
import { Check, X, FileText, Clock, ShieldCheck, Trash2, AlertCircle, Lock, User, LogIn } from 'lucide-react';
import { Layout } from '../components/Layout';

interface Submission {
  id: number;
  filename: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
}

const AdminReview: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('starmc_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    const loadSubmissions = () => {
      const data = localStorage.getItem('wiki_pending_submissions');
      if (data) {
        setSubmissions(JSON.parse(data));
      }
      setLoading(false);
    };
    loadSubmissions();
    window.addEventListener('storage', loadSubmissions);
    return () => window.removeEventListener('storage', loadSubmissions);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'add' && password === 'L513148') {
      setIsAuthenticated(true);
      sessionStorage.setItem('starmc_admin_auth', 'true');
      setError('');
    } else {
      setError('账号或密码错误，请重试');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('starmc_admin_auth');
    // 强制清除可能存在的 localStorage 干扰（虽然主要用 sessionStorage）
    localStorage.removeItem('starmc_admin_auth');
    window.location.reload(); // 强制刷新以清理状态
  };

  const handleAction = (id: number, action: 'approved' | 'rejected' | 'delete') => {
    let updated = [...submissions];
    if (action === 'delete') {
      updated = updated.filter(s => s.id !== id);
    } else {
      updated = updated.map(s => s.id === id ? { ...s, status: action } : s);
      if (action === 'approved') {
        console.log('Approved submission content:', updated.find(s => s.id === id)?.content);
        alert('审核通过！(模拟：内容已记录，实际更新需后端支持)');
      }
    }
    setSubmissions(updated);
    localStorage.setItem('wiki_pending_submissions', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 mb-6 dark:bg-white dark:text-slate-900 dark:shadow-none">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight text-center dark:text-white">管理员登录</h1>
            <p className="text-slate-400 text-sm mt-2 font-medium">请输入凭据以访问后台</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">用户名</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" size={18} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 transition-all font-medium text-slate-900 dark:bg-slate-800/50 dark:border-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:border-slate-700"
                  placeholder="Admin Username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">密码</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 dark:group-focus-within:text-white transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-slate-900 transition-all font-medium text-slate-900 dark:bg-slate-800/50 dark:border-slate-800 dark:text-white dark:focus:bg-slate-800 dark:focus:border-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-4 py-3 rounded-xl border border-rose-100 text-xs font-bold animate-in fade-in slide-in-from-top-1 duration-200 dark:bg-rose-950/20 dark:border-rose-900/50">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 transition-all flex items-center justify-center gap-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:shadow-none"
            >
              <LogIn size={18} />
              验证并进入
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200 dark:bg-white dark:text-slate-900 dark:shadow-none">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 dark:text-white">
              内容审核后台
              <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] rounded-md dark:bg-white dark:text-slate-900">V2.0-READY</span>
            </h1>
            <p className="text-slate-500 font-medium dark:text-slate-400">管理用户提交的文档贡献申请</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-widest border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400">
            管理员: {username || 'add'}
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-3 bg-rose-600 text-white hover:bg-rose-700 rounded-xl transition-all flex items-center gap-2 font-black text-sm shadow-lg shadow-rose-200 animate-pulse dark:shadow-none"
            title="点击退出管理模式"
          >
            <X size={18} strokeWidth={3} />
            退出登录 (EXIT)
          </button>
        </div>
      </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">正在加载申请列表...</div>
        ) : submissions.length === 0 ? (
          <div className="py-32 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center px-6 dark:bg-slate-900/50 dark:border-slate-800">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 dark:bg-slate-800">
              <Clock size={32} className="text-slate-200 dark:text-slate-700" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 dark:text-white">暂无待处理申请</h3>
            <p className="text-slate-500 max-w-sm dark:text-slate-400">
              目前没有任何用户提交文档贡献申请。当有新申请时，它们将出现在这里供您审核。
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {submissions.map((s) => (
              <div key={s.id} className={`
                p-6 rounded-[2rem] border transition-all duration-300
                ${s.status === 'pending' 
                  ? 'bg-white border-slate-200 shadow-xl shadow-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:shadow-none' 
                  : 'bg-slate-50 border-transparent opacity-60 dark:bg-slate-800/50'}
              `}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl ${s.status === 'pending' ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' : 'bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500'}`}>
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3 dark:text-white">
                        {s.filename}
                        {s.status === 'approved' && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] uppercase tracking-widest rounded-full dark:bg-emerald-950/30 dark:text-emerald-400">已通过</span>}
                        {s.status === 'rejected' && <span className="px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] uppercase tracking-widest rounded-full dark:bg-rose-950/30 dark:text-rose-400">已拒绝</span>}
                      </h3>
                      <p className="text-sm text-slate-400 font-mono mt-1 dark:text-slate-500">
                        提交于: {new Date(s.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {s.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => handleAction(s.id, 'approved')}
                          className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-200 transition-all flex items-center justify-center gap-2 dark:shadow-none"
                        >
                          <Check size={18} /> 通过
                        </button>
                        <button 
                          onClick={() => handleAction(s.id, 'rejected')}
                          className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all flex items-center justify-center gap-2 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 dark:hover:border-rose-900"
                        >
                          <X size={18} /> 拒绝
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleAction(s.id, 'delete')}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all dark:hover:bg-rose-950/30"
                        title="删除记录"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-900 rounded-2xl overflow-hidden dark:bg-slate-950">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Content Preview</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Markdown</span>
                  </div>
                  <pre className="text-xs text-slate-300 font-mono overflow-x-auto max-h-40 whitespace-pre-wrap p-2 dark:text-slate-400">
                    {s.content}
                  </pre>
                </div>
                
                {s.status === 'pending' && (
                  <div className="mt-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400">
                    <AlertCircle size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">审核通过后，该文档将由系统自动集成至侧边栏导航。</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

export default AdminReview;
