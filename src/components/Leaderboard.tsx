import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowUp, ArrowDown, Minus, Crown } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { LeaderboardUser } from '@/src/types';

interface LeaderboardProps {
  users: LeaderboardUser[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 lg:mb-10">
        <h2 className="text-2xl lg:text-3xl font-sans font-bold text-slate-900 mb-2 tracking-tight">Community Leaderboard</h2>
        <p className="text-slate-500 text-xs lg:text-sm">Top growth performers and trajectory leaders this month.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        <div className="p-4 lg:p-6 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
          <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400">Rank & Performer</span>
          <span className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-400">Growth Score</span>
        </div>

        <div className="p-2 space-y-1">
          {users.sort((a, b) => a.rank - b.rank).map((user, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              key={user.id}
              className={cn(
                "p-2 lg:p-3 flex items-center justify-between rounded-xl transition-all group",
                index === 0 ? "bg-teal-50" : "hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-6 lg:w-8 flex justify-center">
                  <span className={cn(
                    "font-bold text-xs lg:text-sm",
                    index === 0 ? "text-teal-600" : "text-slate-400"
                  )}>
                    {user.rank}
                  </span>
                </div>

                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className={cn(
                        "w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 shadow-sm",
                        index === 0 ? "border-teal-200" : "border-white"
                      )}
                    />
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 bg-teal-500 rounded-full p-0.5">
                        <Crown className="w-2.5 h-2.5 lg:w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-semibold text-xs lg:text-sm",
                      index === 0 ? "text-teal-900" : "text-slate-800"
                    )}>
                      {user.name}
                      {user.id === 'me' && <span className="ml-2 py-0.5 px-1.5 bg-teal-600 text-white text-[8px] rounded-full">YOU</span>}
                    </h3>
                    <div className="flex items-center gap-1">
                      {user.trend === 'up' && <ArrowUp className="w-2.5 h-2.5 lg:w-3 h-3 text-teal-500" />}
                      {user.trend === 'down' && <ArrowDown className="w-2.5 h-2.5 lg:w-3 h-3 text-rose-500" />}
                      {user.trend === 'stable' && <Minus className="w-2.5 h-2.5 lg:w-3 h-3 text-slate-300" />}
                      <span className="text-[9px] lg:text-[10px] text-slate-400 font-medium whitespace-nowrap">{user.trend === 'up' ? 'Ascending' : 'Steady'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right pr-2">
                <div className={cn(
                  "font-sans font-bold text-sm lg:text-base",
                  index === 0 ? "text-teal-600" : "text-slate-700"
                )}>
                  {user.score.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="p-4 lg:p-6 bg-slate-50 border-t border-slate-100">
           <button className="w-full text-[9px] lg:text-[10px] font-bold text-teal-600 hover:text-teal-700 uppercase tracking-widest transition-colors">
             View All Standings →
           </button>
        </div>
      </div>
    </div>
  );
};
