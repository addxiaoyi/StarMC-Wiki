
import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

interface EntranceAnimationProps {
  onComplete: () => void;
}

const EntranceAnimation: React.FC<EntranceAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 0: Initial hidden
    // Stage 1: Icon & Text fade in
    // Stage 2: Background slide/fade out
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 1800),
      setTimeout(() => onComplete(), 2400),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-all duration-700 ease-in-out ${stage === 2 ? 'opacity-0 invisible scale-110' : 'opacity-100 visible'}`}>
      <div className="relative flex flex-col items-center">
        {/* Animated Background Pulse */}
        <div className={`absolute inset-0 -m-12 bg-slate-50 rounded-full blur-3xl transition-all duration-1000 ease-out ${stage >= 1 ? 'scale-150 opacity-100' : 'scale-50 opacity-0'}`} />
        
        <div className={`relative flex flex-col items-center transition-all duration-1000 ease-out ${stage === 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl mb-6 transform rotate-12 hover:rotate-0 transition-transform duration-500">
            <Terminal size={40} strokeWidth={1.5} />
          </div>
          
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 overflow-hidden">
            <span className="inline-block animate-reveal">STAR MC</span>
          </h1>
          <div className="h-0.5 w-12 bg-slate-200 mt-4 rounded-full overflow-hidden">
            <div className={`h-full bg-slate-900 transition-all duration-[1500ms] ease-in-out ${stage >= 1 ? 'w-full' : 'w-0'}`} />
          </div>
          <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-[0.3em] ml-1">舵星归途</p>
        </div>
      </div>

      <style>{`
        @keyframes reveal {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default EntranceAnimation;
