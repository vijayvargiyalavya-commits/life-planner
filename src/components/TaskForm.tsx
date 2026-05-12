import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Check, Target, Zap, Heart, Briefcase } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Task } from '@/src/types';

interface TaskFormProps {
  onAdd: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('personal');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, category, priority });
    setTitle('');
    setIsOpen(false);
  };

  const categories = [
    { id: 'work', icon: Briefcase, label: 'Work', color: 'bg-blue-100 text-blue-600' },
    { id: 'personal', icon: Heart, label: 'Personal', color: 'bg-rose-100 text-rose-600' },
    { id: 'growth', icon: Target, label: 'Growth', color: 'bg-indigo-100 text-indigo-600' },
    { id: 'health', icon: Zap, label: 'Health', color: 'bg-amber-100 text-amber-600' },
  ];

  return (
    <>
      <button
        id="open-task-form"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-teal-600 text-white rounded-xl shadow-lg shadow-teal-200 hover:bg-teal-700 transition-all flex items-center justify-center z-50 group hover:scale-110 active:scale-95"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-sans font-bold text-slate-800 tracking-tight">Set New Intention</h2>
                  <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">What is your focus?</label>
                    <input
                      autoFocus
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Master React fundamentals"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Category Cluster</label>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id as any)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border transition-all text-sm",
                            category === cat.id
                              ? "bg-teal-600 border-teal-600 text-white shadow-md"
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
                          )}
                        >
                          <cat.icon className="w-4 h-4" />
                          <span className="font-semibold">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Priority Level</label>
                    <div className="flex gap-2">
                      {(['low', 'medium', 'high'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={cn(
                            "flex-1 py-2.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                            priority === p
                              ? "bg-slate-800 text-white shadow-inner"
                              : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                          )}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 active:scale-95 mt-4"
                  >
                    <Check className="w-5 h-5" />
                    Activate Mission
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
