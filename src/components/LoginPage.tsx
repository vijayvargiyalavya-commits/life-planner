import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Mail, Lock, User, ShieldCheck, Github } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LoginPageProps {
  onLogin: (userData: { name: string; email: string }) => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth delay
    setTimeout(() => {
      onLogin({
        name: isLogin ? 'User' : formData.name,
        email: formData.email || 'user@trajectory.com'
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-teal-100 selection:text-teal-900 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] contrast-150 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex w-16 h-16 bg-slate-900 rounded-2xl items-center justify-center text-teal-400 shadow-2xl mb-6 mx-auto"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <h1 className="text-4xl font-sans font-extrabold text-slate-900 tracking-tight mb-2">
            Welcome to <span className="text-teal-600 font-serif italic font-medium">Becomming</span>
          </h1>
          <p className="text-slate-400 font-medium tracking-tight">Entry to your personal productivity node.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white">
          <div className="flex bg-slate-50 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={cn(
                "flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Access
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={cn(
                "flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                !isLogin ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Initialize
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Identity</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
                    <input 
                      type="text" 
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:bg-white focus:border-teal-100 outline-none transition-all font-medium placeholder:text-slate-300"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Node</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="identity@trajectory.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:bg-white focus:border-teal-100 outline-none transition-all font-medium placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secret Key</label>
                {isLogin && (
                  <button type="button" className="text-[10px] font-bold text-teal-600 hover:text-teal-700 uppercase tracking-widest">Forgot Key?</button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-4 pl-12 pr-4 text-sm focus:bg-white focus:border-teal-100 outline-none transition-all font-medium placeholder:text-slate-300"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Enter Workspace' : 'Initialize Node'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300">
              <span className="bg-white px-4">Authorized Via</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
              <Github className="w-4 h-4 text-slate-900" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Connect</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span className="text-[10px] font-bold uppercase tracking-widest">SSO Node</span>
            </button>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="w-full mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] hover:text-slate-600 transition-colors"
        >
          ← Return to Public Terminal
        </button>
      </motion.div>
    </div>
  );
};
