import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Target, Shield, Zap, Heart } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 lg:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-slate-900/10">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
            </div>
            <span className="font-sans font-extrabold text-xl lg:text-2xl text-slate-900 tracking-tighter">Life Planner</span>
          </div>
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <a href="#" className="hover:text-teal-600 transition-colors">Methodology</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Trajectory</a>
            <a href="#" className="hover:text-teal-600 transition-colors">Community</a>
          </div>
          <button 
            onClick={onStart}
            className="px-6 lg:px-10 py-3 lg:py-3.5 bg-teal-600 text-white rounded-full font-bold text-[10px] lg:text-xs uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
          >
            Enter Workspace
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 lg:pt-56 pb-20 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-slate-100 text-teal-600 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-8 lg:mb-10 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Now in Private Beta
            </div>
            <h1 className="text-4xl sm:text-7xl lg:text-8xl font-sans font-extrabold text-slate-900 leading-[1.1] lg:leading-[0.95] tracking-[-0.04em] mb-8 lg:mb-12">
              The art of <br />
              <span className="text-teal-600 font-serif italic font-medium">becoming.</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-slate-400 mb-8 sm:mb-10 lg:mb-14 leading-relaxed max-w-xl font-medium tracking-tight">
              An editorial productivity engine designed for high-agency individuals who value focus over noise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <button 
                onClick={onStart}
                className="group px-6 lg:px-12 py-4 lg:py-5 bg-slate-900 text-white rounded-[1.25rem] lg:rounded-[2rem] font-bold text-base lg:text-xl flex items-center justify-center gap-4 hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/30 active:scale-95"
              >
                Start Journey
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 lg:px-12 py-4 lg:py-5 bg-white text-slate-600 border border-slate-100 rounded-[1.25rem] lg:rounded-[2rem] font-bold text-base lg:text-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                View Proof
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative hidden sm:block lg:block"
          >
            <div className="bg-white/80 backdrop-blur-2xl p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white relative z-10">
              <div className="flex items-center justify-between mb-8 lg:mb-12">
                <div className="flex gap-2.5">
                  <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-slate-100" />
                  <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-slate-100" />
                  <div className="w-3 h-3 lg:w-3.5 lg:h-3.5 rounded-full bg-slate-100" />
                </div>
                <div className="text-[9px] lg:text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Trajectory Node</div>
              </div>
              
              <div className="space-y-6 lg:space-y-8">
                <div className="flex items-center justify-between gap-8 lg:gap-12">
                  <div className="h-5 lg:h-6 w-32 lg:w-48 bg-slate-50 rounded-full" />
                  <div className="h-6 lg:h-8 w-12 lg:w-16 bg-teal-500 rounded-xl lg:rounded-2xl" />
                </div>
                <div className="grid grid-cols-2 gap-6 lg:gap-8">
                  <div className="h-24 lg:h-32 bg-slate-50/50 rounded-2xl lg:rounded-3xl border border-slate-100" />
                  <div className="h-24 lg:h-32 bg-slate-50/50 rounded-2xl lg:rounded-3xl border border-slate-100" />
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.4)]" />
                </div>
              </div>
            </div>

            {/* Premium Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-teal-500/10 blur-[140px] -z-10 rounded-full" />
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 bg-slate-900 p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl flex items-center gap-4 lg:gap-5 z-20 border border-white/10"
            >
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-teal-500 rounded-2xl lg:rounded-[1.5rem] flex items-center justify-center text-slate-900 shadow-lg shadow-teal-500/20">
                <Zap className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div>
                <p className="text-[9px] lg:text-[10px] font-bold uppercase text-teal-400 tracking-[0.2em] leading-none mb-1.5 lg:mb-2">Metrics</p>
                <p className="text-2xl lg:text-3xl font-serif italic font-bold text-white tracking-tight">84.2%</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section with Premium spacing */}
      <section className="py-24 lg:py-40 px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-12 mb-16 lg:mb-24">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight mb-6 lg:mb-8 text-center lg:text-left">Minimal noise. <br className="hidden lg:block" />Maximum clarity.</h2>
              <p className="text-lg lg:text-xl text-slate-400 font-medium leading-relaxed text-center lg:text-left">Every pixel is designed to facilitate deep focus and multi-year trajectory alignment.</p>
            </div>
            <button className="self-center lg:self-auto text-[10px] font-bold uppercase tracking-[0.3em] text-teal-400 border-b border-teal-400 pb-2 hover:text-white hover:border-white transition-all">
              Discover Archetypes →
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: Target, title: "Intentionality", desc: "Define your life's core missions with semantic clarity." },
              { icon: Shield, title: "Sovereignty", desc: "Your data is an extension of your mind. Secure and private." },
              { icon: Heart, title: "Vitality", desc: "Integrated biometric signals for a truly balanced evolution." },
            ].map((f, i) => (
              <div 
                key={i}
                className="group p-8 lg:p-12 bg-white/5 rounded-[2.5rem] lg:rounded-[3rem] border border-white/5 hover:bg-white/10 transition-all cursor-default"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-8 lg:min-h-[4rem] text-teal-400 group-hover:bg-teal-500 group-hover:text-slate-900 transition-all duration-500 shadow-inner">
                  <f.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-serif italic mb-4 lg:mb-6">{f.title}</h3>
                <p className="text-sm lg:text-base text-slate-400 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-t from-teal-900/20 to-transparent pointer-events-none" />
      </section>

      {/* Footer */}
      <footer className="py-16 lg:py-24 border-t border-slate-100 flex flex-col items-center gap-8 lg:gap-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-teal-400" />
          </div>
          <span className="font-extrabold text-2xl lg:text-3xl text-slate-900 tracking-tighter">Life Planner</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          <a href="#" className="hover:text-teal-600 transition-colors">Twitter</a>
          <a href="#" className="hover:text-teal-600 transition-colors">Manifesto</a>
          <a href="#" className="hover:text-teal-600 transition-colors">Support</a>
        </div>
        <p className="text-slate-300 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.4em] mt-8 lg:mt-10 text-center px-6">
          © 2026 ALPHA TRAJECTORY — ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
};
