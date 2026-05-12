import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Zap, Target } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Task } from '@/src/types';

interface CalendarViewProps {
  tasks: Task[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  const getDayTasks = (day: number) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      return taskDate.getDate() === day && 
             taskDate.getMonth() === month && 
             taskDate.getFullYear() === year;
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6">
        <div>
          <div className="flex items-center gap-2 text-teal-600 mb-4 font-bold text-[10px] uppercase tracking-[0.25em]">
            <CalendarIcon className="w-4 h-4" />
            <span>Temporal Trajectory Node</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-sans font-bold text-slate-900 tracking-tight leading-none mb-4">
            Neural <span className="text-teal-600 italic font-serif font-medium">Calendar.</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-sm">Mapping your intentions across the space-time continuum.</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-400" />
          </button>
          <div className="px-4 text-sm font-bold text-slate-900 min-w-[140px] text-center">
            {monthNames[month]} {year}
          </div>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-slate-50 bg-slate-50/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-4 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {emptyDays.map(i => (
            <div key={`empty-${i}`} className="h-32 lg:h-40 border-r border-b border-slate-50 bg-slate-50/30" />
          ))}
          
          {days.map(day => {
            const dayTasks = getDayTasks(day);
            const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

            return (
              <div key={day} className={cn(
                "h-32 lg:h-40 border-r border-b border-slate-50 p-3 lg:p-4 transition-colors hover:bg-slate-50/50 relative group",
                isToday && "bg-teal-50/30"
              )}>
                <div className="flex justify-between items-start mb-2">
                  <span className={cn(
                    "text-xs font-bold font-mono tracking-tighter",
                    isToday ? "text-teal-600" : "text-slate-400"
                  )}>
                    {day.toString().padStart(2, '0')}
                  </span>
                  {dayTasks.length > 0 && (
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-teal-500 rounded-full" />
                      {dayTasks.length > 2 && <div className="w-1 h-1 bg-teal-300 rounded-full" />}
                    </div>
                  )}
                </div>

                <div className="space-y-1 overflow-hidden">
                  {dayTasks.slice(0, 3).map(task => (
                    <div 
                      key={task.id} 
                      className={cn(
                        "text-[9px] font-bold py-1 px-2 rounded-md truncate border",
                        task.completed 
                          ? "bg-slate-50 border-slate-100 text-slate-300 line-through" 
                          : "bg-white border-slate-100 text-slate-600 shadow-sm"
                      )}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-[8px] font-bold text-slate-300 uppercase tracking-widest pl-2">
                      + {dayTasks.length - 3} More
                    </div>
                  )}
                </div>

                {isToday && (
                  <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 bg-teal-600 rounded-full">
                    <span className="text-[7px] font-black text-white uppercase tracking-widest">Today</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-3xl p-6 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
            <Clock className="w-6 h-6 text-teal-400" />
          </div>
          <div>
            <p className="text-teal-400/60 text-[10px] uppercase font-bold tracking-widest leading-none mb-2">Month Velocity</p>
            <p className="text-xl font-serif font-bold">{Math.floor(tasks.filter(t => t.completed).length / (tasks.length || 1) * 100)}% Synchronized</p>
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-2">Deep Sessions</p>
            <p className="text-xl font-sans font-extrabold text-slate-900">14 Units</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest leading-none mb-2">Active Trajectories</p>
            <p className="text-xl font-sans font-extrabold text-slate-900">3 Major Nodes</p>
          </div>
        </div>
      </div>
    </div>
  );
};
