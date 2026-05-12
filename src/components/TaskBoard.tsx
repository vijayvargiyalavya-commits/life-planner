import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Trash2, Calendar, Filter } from 'lucide-react';
import { Task } from '@/src/types';
import { cn } from '@/src/lib/utils';

interface TaskBoardProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onToggle, onDelete }) => {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredTasks = tasks.filter(t => filter === 'all' || t.priority === filter);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 lg:mb-10 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-sans font-bold text-slate-900 mb-1 tracking-tight">Focus Node</h2>
          <p className="text-slate-500 text-xs lg:text-sm">Strategic organization for personal daily objectives.</p>
        </div>
        <div className="flex gap-2 self-start sm:self-auto bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {['all', 'high', 'medium', 'low'].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                filter === p ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="text-slate-400 font-medium">All cleared. Set your next intention.</p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "bg-white p-4 lg:p-5 rounded-2xl border border-slate-100 shadow-sm transition-all group flex items-start lg:items-center gap-4 lg:gap-6",
                  task.completed && "opacity-75 grayscale-[0.3]"
                )}
              >
                <button
                  onClick={() => onToggle(task.id)}
                  className={cn(
                    "w-8 h-8 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all shrink-0 mt-1 lg:mt-0",
                    task.completed 
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-100" 
                      : "bg-slate-50 text-slate-300 hover:text-teal-600 hover:bg-teal-50"
                  )}
                >
                  {task.completed ? <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6" /> : <Circle className="w-5 h-5 lg:w-6 lg:h-6" />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[8px] lg:text-[9px] font-black uppercase tracking-widest",
                      task.priority === 'high' ? "bg-rose-50 text-rose-500" :
                      task.priority === 'medium' ? "bg-amber-50 text-amber-500" : "bg-teal-50 text-teal-600"
                    )}>
                      {task.priority}
                    </span>
                    <span className="text-[9px] lg:text-[10px] text-slate-300 flex items-center gap-1 uppercase font-bold tracking-tight">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className={cn(
                    "text-lg lg:text-xl font-sans font-bold transition-all truncate",
                    task.completed ? "text-slate-300 line-through" : "text-slate-800"
                  )}>
                    {task.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <span className={cn("hidden sm:block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", 
                    task.category === 'work' ? "bg-blue-50 text-blue-500" :
                    task.category === 'personal' ? "bg-rose-50 text-rose-500" : "bg-teal-50 text-teal-600"
                  )}>
                    {task.category}
                  </span>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
