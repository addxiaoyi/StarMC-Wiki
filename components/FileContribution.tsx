
import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onUploadSuccess?: (fileData: { name: string; content: string }) => void;
}

export const FileContribution: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = async (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.md')) {
      setStatus('error');
      setMessage('仅支持 .md 格式的文件');
      return;
    }

    setFile(selectedFile);
    setStatus('uploading');
    setMessage('正在读取文件内容...');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        // 模拟 API 请求提交审核
        setTimeout(() => {
          setStatus('success');
          setMessage('申请已发送！请等待管理员审核。');
          if (onUploadSuccess) {
            onUploadSuccess({ name: selectedFile.name, content });
          }
          // 存储到本地模拟审核流（实际项目中应通过 API 发送）
          const pendingSubmissions = JSON.parse(localStorage.getItem('wiki_pending_submissions') || '[]');
          pendingSubmissions.push({
            id: Date.now(),
            filename: selectedFile.name,
            content: content,
            status: 'pending',
            timestamp: new Date().toISOString()
          });
          localStorage.setItem('wiki_pending_submissions', JSON.stringify(pendingSubmissions));
        }, 1500);
      };
      reader.readAsText(selectedFile);
    } catch (err) {
      setStatus('error');
      setMessage('文件读取失败，请重试');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
    setMessage('');
  };

  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center dark:bg-white dark:text-slate-900">
          <Upload size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">贡献文档</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">拖拽 MD 文件提交审核</p>
        </div>
      </div>

      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center
          ${dragActive ? 'border-slate-900 bg-slate-100 dark:border-white dark:bg-slate-800' : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950'}
          ${status === 'success' ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20' : ''}
          ${status === 'error' ? 'border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-950/20' : ''}
        `}
      >
        <input 
          type="file" 
          accept=".md"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {status === 'idle' && (
          <>
            <div className="p-3 bg-slate-50 rounded-full mb-3 dark:bg-slate-900">
              <FileText size={24} className="text-slate-400 dark:text-slate-600" />
            </div>
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">点击或拖拽文件到此处</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">支持 Markdown (.md) 格式</p>
          </>
        )}

        {status === 'uploading' && (
          <div className="flex flex-col items-center">
            <Loader2 size={24} className="text-slate-900 dark:text-white animate-spin mb-3" />
            <p className="text-xs font-bold text-slate-900 dark:text-white">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CheckCircle size={24} className="text-emerald-500 mb-3" />
            <p className="text-xs font-bold text-emerald-900 dark:text-emerald-400">{message}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="mt-4 text-[10px] font-bold text-emerald-700 hover:text-emerald-900 dark:text-emerald-500 dark:hover:text-emerald-400"
            >
              继续上传
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <AlertCircle size={24} className="text-rose-500 mb-3" />
            <p className="text-xs font-bold text-rose-900 dark:text-rose-400">{message}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); reset(); }}
              className="mt-4 text-[10px] font-bold text-rose-700 hover:text-rose-900 dark:text-rose-500 dark:hover:text-rose-400 flex items-center gap-1"
            >
              <X size={10} /> 重试
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
