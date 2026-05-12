import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Coffee, Zap, Moon, Sun, ArrowRight, Trophy } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FocusTimerProps {
  onSessionComplete: (duration: number) => void;
}

export const FocusTimer: React.FC<FocusTimerProps> = ({ onSessionComplete }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  }, [mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => {}); // Play notification sound
      
      if (mode === 'focus') {
        setSessionsCompleted(prev => prev + 1);
        onSessionComplete(25);
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('focus');
        setTimeLeft(25 * 60);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, onSessionComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto h-full flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-teal-600 mb-4 font-bold text-[10px] uppercase tracking-[0.25em]">
          <Zap className="w-4 h-4" />
          <span>Cognitive Performance Node</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-sans font-extrabold text-slate-900 mb-4 tracking-tight">
          Current State: <span className="text-teal-600 italic font-serif font-medium">{mode === 'focus' ? 'Absolute Intent' : 'Neural Recovery'}</span>
        </h2>
        <p className="text-slate-400 font-medium max-w-sm mx-auto">Maintain equilibrium during deep work cycles.</p>
      </div>

      <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center mb-16">
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 transform">
          <circle
            cx="50%"
            cy="50%"
            r="48%"
            className="stroke-slate-100 fill-none"
            strokeWidth="2"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="48%"
            fill="none"
            stroke={mode === 'focus' ? 'currentColor' : '#334155'}
            className={cn(
                "transition-colors duration-500",
                mode === 'focus' ? "text-teal-500" : "text-slate-700"
            )}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ strokeDasharray: "0 1000" }}
            animate={{ strokeDasharray: `${(progress / 100) * 1200} 1200` }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>

        {/* Center Display */}
        <div className="relative z-10 flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">
                {mode === 'focus' ? 'Deep Work' : 'Interval'}
            </span>
            <div className="text-7xl lg:text-8xl font-mono font-bold text-slate-900 tracking-tighter tabular-nums">
                {formatTime(timeLeft)}
            </div>
            <div className="mt-8 flex gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                    <Trophy className="w-3 h-3 text-teal-600" />
                    <span className="text-[10px] font-bold text-slate-500">{sessionsCompleted} Units Complete</span>
                </div>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={resetTimer}
          className="p-4 text-slate-400 hover:text-slate-600 hover:bg-white rounded-2xl transition-all"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        <button 
          onClick={toggleTimer}
          className={cn(
            "w-20 h-20 rounded-[2.5rem] flex items-center justify-center transition-all shadow-2xl active:scale-95",
            isActive 
              ? "bg-white text-slate-900 border border-slate-100 shadow-slate-200" 
              : "bg-slate-900 text-white shadow-slate-900/30"
          )}
        >
          {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
        </button>

        <button 
          onClick={() => {
              setMode(mode === 'focus' ? 'break' : 'focus');
              resetTimer();
          }}
          className="p-4 text-slate-400 hover:text-slate-600 hover:bg-white rounded-2xl transition-all"
        >
          {mode === 'focus' ? <Coffee className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
        </button>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-4 w-full">
          <div className="p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                  <Sun className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                  <h4 className="text-xs font-bold text-slate-900">Standard Flow</h4>
                  <p className="text-[10px] text-slate-500 font-medium">25m Work / 5m Recovery</p>
              </div>
          </div>
          <div className="p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white flex items-center gap-4 opacity-50 cursor-not-allowed">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                  <Moon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                  <h4 className="text-xs font-bold text-slate-900">Extended Void</h4>
                  <p className="text-[10px] text-slate-500 font-medium">50m Work / 10m Recovery</p>
              </div>
          </div>
      </div>
    </div>
  );
};
