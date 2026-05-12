import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, Shield, Zap, Target, Flame, Award, Lock, CheckCircle2 } from 'lucide-react';
import { Achievement } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const iconMap: Record<string, React.ReactNode> = {
    trophy: <Trophy className="w-6 h-6" />,
    star: <Star className="w-6 h-6" />,
    shield: <Shield className="w-6 h-6" />,
    zap: <Zap className="w-6 h-6" />,
    target: <Target className="w-6 h-6" />,
    flame: <Flame className="w-6 h-6" />,
    award: <Award className="w-6 h-6" />,
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-teal-600 mb-4 font-bold text-[10px] uppercase tracking-[0.25em]">
            <Award className="w-4 h-4" />
            <span>Legacy & Reputation Node</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-none mb-4">
            Trait <span className="text-teal-600 italic font-serif font-medium">Evolution.</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-md">Your persistent efforts manifest as tangible reputation blocks in the network.</p>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-6 lg:p-8 flex items-center gap-8 min-w-[280px]">
          <div className="flex-1">
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Sync Progress</p>
            <div className="text-3xl font-serif font-bold text-white mb-2">{unlockedCount}<span className="text-teal-400 text-lg border-l border-white/10 ml-3 pl-3">{achievements.length}</span></div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                className="h-full bg-teal-400"
               />
            </div>
          </div>
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
             <Trophy className="w-8 h-8 text-teal-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={achievement.id}
            className={cn(
              "p-6 lg:p-8 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden",
              achievement.unlocked 
                ? "bg-white border-slate-100 shadow-xl shadow-slate-200/40" 
                : "bg-slate-50/50 border-slate-100 grayscale"
            )}
          >
            {achievement.unlocked && (
              <div className="absolute top-0 right-0 p-6">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
              </div>
            )}
            
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500",
              achievement.unlocked ? "bg-teal-50 text-teal-600 shadow-inner" : "bg-slate-100 text-slate-300"
            )}>
              {iconMap[achievement.icon] || <Award className="w-6 h-6" />}
            </div>

            <h3 className={cn(
              "text-lg font-bold tracking-tight mb-2",
              achievement.unlocked ? "text-slate-900" : "text-slate-400"
            )}>
              {achievement.title}
            </h3>
            <p className={cn(
              "text-xs leading-relaxed mb-6",
              achievement.unlocked ? "text-slate-500" : "text-slate-300"
            )}>
              {achievement.description}
            </p>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Requirement</span>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-widest",
                achievement.unlocked ? "text-teal-600" : "text-slate-400"
              )}>
                {achievement.requirement}
              </span>
            </div>

            {!achievement.unlocked && (
              <div className="absolute inset-0 bg-slate-50/20 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Lock className="w-6 h-6 text-slate-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
