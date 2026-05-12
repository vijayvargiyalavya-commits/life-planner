import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowUp, ArrowDown, Minus, Crown, Users, Zap, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { LeaderboardUser } from '@/src/types';

interface LeaderboardProps {
  users: LeaderboardUser[];
}

const LIVE_EVENTS = [
  { user: 'S. Tanaka', action: 'completed 50m Focus Session', time: '2m' },
  { user: 'Elena V.', action: 'unlocked "Deep Work Pioneer"', time: '5m' },
  { user: 'Marcus K.', action: 'reached Rank 4', time: '12m' },
  { user: 'J. Chen', action: 'synchronized wellness menu', time: '15m' },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  const currentUser = users.find(u => u.id === 'me');
  
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6">
        <div>
          <div className="flex items-center gap-2 text-teal-600 mb-4 font-bold text-[10px] uppercase tracking-[0.25em]">
            <Users className="w-4 h-4" />
            <span>Community Trajectory Sync</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-none mb-4">
            Global <span className="text-teal-600 italic font-serif font-medium">Hierarchy.</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-sm">Synchronizing performance data across the decentralized network.</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 min-w-[160px] shadow-sm">
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Network Size</p>
            <div className="text-2xl font-serif font-bold text-slate-900">12,408</div>
          </div>
          <div className="bg-teal-900 p-6 rounded-3xl min-w-[160px] shadow-xl shadow-teal-900/10">
            <p className="text-teal-400/60 text-[10px] uppercase font-bold tracking-widest mb-2">Your Position</p>
            <div className="text-2xl font-serif font-bold text-white">#{currentUser?.rank || '—'}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Leaderboard */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 lg:p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Biological Performer</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Network Score</span>
            </div>

            <div className="p-4 space-y-2">
              {users.sort((a, b) => a.rank - b.rank).map((user, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={user.id}
                  className={cn(
                    "p-4 flex items-center justify-between rounded-2xl transition-all group",
                    user.id === 'me' ? "bg-teal-50/80 border border-teal-100" : "hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-8 flex justify-center">
                      <span className={cn(
                        "font-bold text-sm",
                        index < 3 ? "text-teal-600" : "text-slate-300"
                      )}>
                        {user.rank.toString().padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          referrerPolicy="no-referrer"
                          className={cn(
                            "w-12 h-12 rounded-2xl object-cover border-2 shadow-sm transition-transform group-hover:scale-105",
                            index < 3 ? "border-teal-200" : "border-white"
                          )}
                        />
                        {index === 0 && (
                          <div className="absolute -top-2 -right-2 bg-teal-500 rounded-full p-1 shadow-lg ring-4 ring-white">
                            <Crown className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className={cn(
                          "font-bold text-sm lg:text-base tracking-tight",
                          user.id === 'me' ? "text-teal-900" : "text-slate-800"
                        )}>
                          {user.name}
                          {user.id === 'me' && <span className="ml-3 py-1 px-3 bg-teal-600 text-white text-[9px] font-black tracking-widest rounded-full uppercase">You</span>}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          {user.trend === 'up' && <ArrowUp className="w-3 h-3 text-teal-500" />}
                          {user.trend === 'down' && <ArrowDown className="w-3 h-3 text-rose-500" />}
                          {user.trend === 'stable' && <Minus className="w-3 h-3 text-slate-300" />}
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user.trend === 'up' ? 'Ascending' : 'Stable'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right pr-4">
                    <div className={cn(
                      "font-sans font-black text-lg",
                      index < 3 ? "text-teal-600" : "text-slate-700"
                    )}>
                      {user.score.toLocaleString()}
                    </div>
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest leading-none">Trajectory Points</div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weekly Synchronization ends in</p>
               <div className="text-sm font-bold text-slate-900">03:14:22:18</div>
            </div>
          </div>
        </div>

        {/* Sidebar Activity Feed */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Live Activity Feed
            </h4>
            <div className="space-y-6">
              {LIVE_EVENTS.map((event, idx) => (
                <div key={idx} className="relative pl-6 pb-6 border-l border-white/10 last:pb-0">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
                  <p className="text-xs font-bold mb-1">{event.user}</p>
                  <p className="text-[10px] text-slate-400 mb-1">{event.action}</p>
                  <span className="text-[9px] font-black text-teal-500/60 uppercase">{event.time} ago</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50/50 rounded-[2.5rem] p-8 border border-teal-100/50">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
              <Zap className="w-6 h-6 text-teal-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Performance Tip</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Users who complete more than 3 <strong>Focus Sessions</strong> per day see a 42% faster rank climbs in the trajectory network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

