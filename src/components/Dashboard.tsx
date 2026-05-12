import React from 'react';
import { motion } from 'motion/react';
import { Target, CheckCircle2, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { Task, Goal } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface DashboardProps {
  tasks: Task[];
  goals: Goal[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks, goals }) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const taskProgress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="space-y-16">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 pt-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-teal-600 mb-6 font-bold text-[10px] uppercase tracking-[0.25em]"
          >
            <div className="w-8 h-px bg-teal-600/30" />
            <Calendar className="w-4 h-4" />
            <span>Trajectory: Monday, May 11 2026</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-sans font-extrabold text-slate-900 leading-[1.1] tracking-[-0.03em]">
            Curate your life with <br />
            <span className="text-teal-600 font-serif italic font-medium">absolute intent.</span>
          </h1>
        </div>
        
        <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 min-w-[240px] flex items-center justify-between gap-8 shadow-sm">
           <div>
             <div className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Focus Velocity</div>
             <div className="text-4xl font-serif font-bold text-slate-900 leading-none">84.2</div>
           </div>
           <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-200">
             <TrendingUp className="w-7 h-7" />
           </div>
        </div>
      </header>

      {/* Grid Layout - Editorial Style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Stats & Meta */}
        <div className="lg:col-span-4 space-y-10">
          <section className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-teal-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Daily Reflection</p>
              <p className="text-2xl font-serif italic leading-relaxed text-slate-100">
                "The secret of getting ahead is getting started."
              </p>
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white tracking-tight">Mark Twain</p>
                  <p className="text-xs text-slate-400">Author & Humorist</p>
                </div>
                <Sparkles className="w-6 h-6 text-teal-400 opacity-50" />
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full" />
          </section>

          <section className="bg-white/60 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/80 shadow-sm">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-10 flex items-center gap-3">
              <div className="w-4 h-px bg-slate-300" />
              Velocity Metrics
            </h2>
            <div className="space-y-8">
              {[
                { label: 'Goals Met', value: '12', sub: 'Last 30 days', icon: Target },
                { label: 'Growth XP', value: '4.8k', sub: 'Total earned', icon: TrendingUp },
                { label: 'Day Streak', value: '182', sub: 'Consistency', icon: Calendar },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-all border border-slate-100 group-hover:border-teal-100 shadow-sm">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-xs text-slate-400 font-medium">{stat.sub}</p>
                    </div>
                  </div>
                  <div className="text-2xl font-serif font-bold text-slate-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Active Trajectory */}
        <div className="lg:col-span-8 space-y-12">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight flex items-center gap-4">
                Active Trajectory
                <div className="h-px w-24 bg-slate-200 hidden md:block" />
              </h2>
              <button className="text-[10px] font-bold text-teal-600 px-4 py-2 bg-teal-50 rounded-full uppercase tracking-widest hover:bg-teal-600 hover:text-white transition-all">
                {goals.length} Entities Active
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  whileHover={{ y: -8 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm flex flex-col gap-6 group cursor-pointer relative overflow-hidden"
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg",
                      goal.color.replace('bg-', 'bg-opacity-10 text-')
                    )}>
                      {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{goal.category}</span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">{goal.title}</h3>
                    <p className="text-xs text-slate-400 font-medium mb-6 uppercase tracking-wider">{goal.currentValue} / {goal.targetValue} {goal.unit}</p>
                    
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}
                        className={cn("h-full rounded-full transition-all duration-1000", goal.color.replace('indigo', 'teal'))}
                      />
                    </div>
                  </div>
                  
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                    <Target className="w-32 h-32" />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
