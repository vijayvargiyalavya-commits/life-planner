import React from 'react';
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
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-sans font-bold text-slate-900 mb-1 tracking-tight">Current Focus</h2>
          <p className="text-slate-500 text-sm">Strategic organization for personal daily objectives.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
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
            tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  "bg-white p-5 rounded-2xl border border-slate-100 shadow-sm transition-all group flex items-center gap-6",
                  task.completed && "opacity-75 grayscale-[0.3]"
                )}
              >
                <button
                  onClick={() => onToggle(task.id)}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    task.completed 
                      ? "bg-teal-600 text-white shadow-lg shadow-teal-100" 
                      : "bg-slate-50 text-slate-300 hover:text-teal-600 hover:bg-teal-50"
                  )}
                >
                  {task.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                      task.priority === 'high' ? "bg-rose-50 text-rose-500" :
                      task.priority === 'medium' ? "bg-amber-50 text-amber-500" : "bg-teal-50 text-teal-600"
                    )}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] text-slate-300 flex items-center gap-1 uppercase font-bold tracking-tight">
                      <Calendar className="w-3 h-3" />
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className={cn(
                    "text-xl font-sans font-bold transition-all",
                    task.completed ? "text-slate-300 line-through" : "text-slate-800"
                  )}>
                    {task.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest", 
                    task.category === 'work' ? "bg-blue-50 text-blue-500" :
                    task.category === 'personal' ? "bg-rose-50 text-rose-500" : "bg-teal-50 text-teal-600"
                  )}>
                    {task.category}
                  </span>
                  <button 
                    onClick={() => onDelete(task.id)}
                    className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
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
