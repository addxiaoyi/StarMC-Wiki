
import React, { useState, useEffect } from 'react';
import { Users, WifiOff } from 'lucide-react';
import { SERVER_IPS } from '../constants';

interface StatusData {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
}

export const ServerStatus: React.FC = () => {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IPS.primary}`);
        const data = await res.json();
        setStatus({
          online: data.online,
          players: data.players
        });
      } catch (err) {
        console.error("Failed to fetch server status", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl">
        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Checking Link...</span>
      </div>
    );
  }

  if (!status?.online) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-rose-50 border border-rose-100 rounded-2xl">
        <WifiOff size={14} className="text-rose-400" />
        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">System Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-2xl group transition-all hover:bg-white hover:shadow-lg hover:shadow-emerald-100/50">
        <div className="relative">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <div className="absolute inset-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Live Now</span>
      </div>
      <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl group transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-100/50">
        <Users size={12} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
        <span className="text-[10px] font-black text-slate-600 tabular-nums">
          {status.players?.online || 0} / {status.players?.max || 0}
        </span>
      </div>
    </div>
  );
};
