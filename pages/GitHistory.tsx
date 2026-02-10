import React, { useState, useEffect, useCallback } from 'react';
import { GitBranch, GitCommit, Tag, Clock, User, ExternalLink, RefreshCw, AlertCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface Commit {
  sha: string;
  message: string;
  author: {
    name: string;
    avatar_url: string;
    html_url: string;
  };
  date: string;
  html_url: string;
  type: 'commit' | 'merge' | 'tag';
}

const REPO_OWNER = 'addxiaoyi';
const REPO_NAME = 'starmc-wiki-main';
const DEPLOY_URL = 'https://addxiaoyi.codeberg.page/starmc-wiki-page/';

const GitHistory: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'commit' | 'merge'>('all');
  const [retryCount, setRetryCount] = useState(0);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 使用 GitHub API 获取提交记录
      const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?page=${page}&per_page=15`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API 速率限制已达到，请稍后再试。');
        }
        throw new Error('无法拉取 GitHub 变更历史记录');
      }

      const data = await response.json();
      
      const formattedCommits: Commit[] = data.map((item: any) => {
        const message = item.commit.message;
        const isMerge = message.startsWith('Merge') || item.parents.length > 1;
        
        return {
          sha: item.sha.substring(0, 7),
          message: message.split('\n')[0],
          author: {
            name: item.author?.login || item.commit.author.name,
            avatar_url: item.author?.avatar_url || `https://ui-avatars.com/api/?name=${item.commit.author.name}`,
            html_url: item.author?.html_url || '#',
          },
          date: item.commit.author.date,
          html_url: item.html_url,
          type: isMerge ? 'merge' : 'commit',
        };
      });

      setCommits(formattedCommits);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchHistory();
    // 设置每 60 秒自动刷新一次，实现“实时”同步感
    const interval = setInterval(fetchHistory, 60000);
    return () => clearInterval(interval);
  }, [fetchHistory]);

  const filteredCommits = commits.filter(c => 
    filter === 'all' ? true : c.type === filter
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <GitBranch className="text-blue-600" size={36} />
            仓库变更历史
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            实时同步 GitHub 仓库提交记录与部署状态
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${filter === 'all' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setFilter('commit')}
              className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${filter === 'commit' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              提交
            </button>
            <button 
              onClick={() => setFilter('merge')}
              className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${filter === 'merge' ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400' : 'text-slate-500 hover:text-slate-700'}`}
            >
              合并
            </button>
          </div>
          
          <button 
            onClick={() => fetchHistory()}
            disabled={loading}
            className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all dark:bg-blue-900/30 dark:text-blue-400 disabled:opacity-50"
            title="手动刷新"
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-100 p-8 rounded-3xl flex flex-col items-center text-center gap-4 dark:bg-red-900/10 dark:border-red-900/20">
          <AlertCircle className="text-red-500" size={48} />
          <div>
            <h3 className="text-lg font-bold text-red-900 dark:text-red-400">数据拉取失败</h3>
            <p className="text-red-600/70 dark:text-red-400/60">{error}</p>
          </div>
          <button 
            onClick={() => fetchHistory()}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all"
          >
            重试加载
          </button>
        </div>
      ) : loading && commits.length === 0 ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-50 rounded-2xl animate-pulse dark:bg-slate-900" />
          ))}
        </div>
      ) : (
        <div className="relative">
          {/* 时间轴线 */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block" />

          <div className="space-y-6">
            {filteredCommits.map((commit) => (
              <div key={commit.sha} className="group relative flex flex-col md:flex-row gap-6">
                {/* 状态图标 */}
                <div className="z-10 flex-shrink-0 w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center dark:bg-slate-950 dark:border-slate-800 transition-colors group-hover:border-blue-500">
                  {commit.type === 'merge' ? (
                    <GitBranch size={20} className="text-purple-500" />
                  ) : (
                    <GitCommit size={20} className="text-blue-500" />
                  )}
                </div>

                {/* 卡片内容 */}
                <div className="flex-1 bg-white border border-slate-100 p-5 rounded-[2rem] transition-all hover:shadow-xl hover:shadow-blue-500/5 dark:bg-slate-900/50 dark:border-slate-800 group-hover:border-blue-500/30">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md dark:bg-slate-800">
                          {commit.sha}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} />
                          {new Date(commit.date).toLocaleString('zh-CN', { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                        {commit.message}
                      </h3>
                      <div className="flex items-center gap-2">
                        <a 
                          href={commit.author.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                        >
                          <img src={commit.author.avatar_url} alt="" className="w-5 h-5 rounded-full" />
                          {commit.author.name}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a 
                        href={commit.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        <ExternalLink size={16} />
                        查看代码
                      </a>
                      <a 
                        href={DEPLOY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                      >
                        <RefreshCw size={16} />
                        部署跳转
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 分页控制 */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 disabled:opacity-30 dark:bg-slate-900 dark:border-slate-800"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-black text-slate-900 dark:text-white px-4">
              第 {page} 页
            </span>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={loading || commits.length < 15}
              className="p-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 disabled:opacity-30 dark:bg-slate-900 dark:border-slate-800"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHistory;