import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Target, ListTodo, Users, Sparkles, Check } from 'lucide-react';
import { Notification } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll
}) => {
  const icons = {
    goal: Target,
    task: ListTodo,
    community: Users,
    system: Sparkles,
  };

  const colors = {
    goal: 'text-teal-500 bg-teal-50',
    task: 'text-indigo-500 bg-indigo-50',
    community: 'text-amber-500 bg-amber-50',
    system: 'text-slate-500 bg-slate-50',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[70] border-l border-slate-100 flex flex-col"
          >
            <div className="p-6 lg:p-8 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h2 className="text-xl lg:text-2xl font-serif font-bold text-slate-900">Notifications</h2>
                <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Status Updates</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <X className="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              {notifications.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 text-slate-200">
                    <Bell className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 font-medium">Trajectory is silent. <br />No new signals.</p>
                </div>
              ) : (
                notifications.map((n) => {
                  const Icon = icons[n.type];
                  return (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "p-4 lg:p-5 rounded-2xl border transition-all relative group",
                        n.read ? "bg-white border-slate-50" : "bg-slate-50/50 border-teal-100 shadow-sm"
                      )}
                    >
                      <div className="flex gap-3 lg:gap-4">
                        <div className={cn("w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0", colors[n.type])}>
                          <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1 gap-2">
                            <h3 className={cn("text-xs lg:text-sm font-bold truncate", n.read ? "text-slate-600" : "text-slate-900")}>{n.title}</h3>
                            <span className="text-[8px] lg:text-[9px] font-bold text-slate-300 uppercase shrink-0 mt-0.5">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-[11px] lg:text-xs text-slate-500 leading-relaxed">{n.message}</p>
                        </div>
                      </div>
                      {!n.read && (
                        <button 
                          onClick={() => onMarkAsRead(n.id)}
                          className="absolute bottom-2 right-2 p-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity text-teal-600 hover:bg-teal-50 rounded-lg"
                        >
                          <Check className="w-3.5 h-3.5 lg:w-4 h-4" />
                        </button>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>

            {notifications.length > 0 && (
              <div className="p-4 lg:p-6 border-t border-slate-50">
                <button 
                  onClick={onClearAll}
                  className="w-full py-4 text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
                >
                  Clear All History
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
