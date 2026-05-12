/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  LayoutDashboard, 
  ListTodo, 
  Target, 
  Trophy, 
  Settings,
  LogOut,
  Bell,
  Search,
  Sparkles
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Dashboard } from '@/src/components/Dashboard';
import { Leaderboard } from '@/src/components/Leaderboard';
import { TaskForm } from '@/src/components/TaskForm';
import { TaskBoard } from '@/src/components/TaskBoard';
import { LandingPage } from '@/src/components/LandingPage';
import { NotificationCenter } from '@/src/components/NotificationCenter';
import { Task, Goal, LeaderboardUser, Notification, View } from '@/src/types';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Plan the weekly wellness menu', category: 'health', completed: true, priority: 'medium', createdAt: Date.now() },
  { id: '2', title: 'Complete the design presentation', category: 'work', completed: false, priority: 'high', createdAt: Date.now() },
  { id: '3', title: 'Daily journaling (15 mins)', category: 'growth', completed: false, priority: 'medium', createdAt: Date.now() },
  { id: '4', title: 'Morning 5km run', category: 'health', completed: true, priority: 'high', createdAt: Date.now() },
];

const INITIAL_GOALS: Goal[] = [
  { id: 'g1', title: 'Deep Work Hours', targetValue: 40, currentValue: 28, unit: 'hrs', category: 'Productivity', color: 'bg-indigo-500' },
  { id: 'g2', title: 'Reading Challenge', targetValue: 200, currentValue: 145, unit: 'pages', category: 'Growth', color: 'bg-emerald-500' },
  { id: 'g3', title: 'Hydration Target', targetValue: 60, currentValue: 42, unit: 'liters', category: 'Health', color: 'bg-blue-500' },
];

const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { id: 'u1', name: 'Elena Vance', avatar: 'https://i.pravatar.cc/150?u=elena', score: 12450, rank: 1, trend: 'up' },
  { id: 'u2', name: 'Marcus Chen', avatar: 'https://i.pravatar.cc/150?u=marcus', score: 11200, rank: 2, trend: 'stable' },
  { id: 'u3', name: 'Sarah Miller', avatar: 'https://i.pravatar.cc/150?u=sarah', score: 9800, rank: 3, trend: 'up' },
  { id: 'u4', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?u=james', score: 8500, rank: 4, trend: 'down' },
  { id: 'u5', name: 'Aria Thorne', avatar: 'https://i.pravatar.cc/150?u=aria', score: 7200, rank: 5, trend: 'up' },
];

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'Goal Milestone', message: 'You reached 70% of your Reading Challenge goal!', type: 'goal', timestamp: Date.now() - 3600000, read: false },
  { id: 'n2', title: 'Morning Routine', message: 'Remember your 15-minute journaling session.', type: 'task', timestamp: Date.now() - 7200000, read: true },
];

export default function App() {
  const [activeView, setActiveView] = useState<View>('landing');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [goals] = useState<Goal[]>(INITIAL_GOALS);
  const [leaderboardUsers] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const addNotification = (title: string, message: string, type: Notification['type']) => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      type,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    addNotification('Task Activated', `New focus item: "${taskData.title}"`, 'task');
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.9 },
      colors: ['#5c755c', '#a4b8a4']
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed) {
          addNotification('Achievement Unlocked', `Task completed: "${t.title}"`, 'task');
          confetti({
            particleCount: 15,
            spread: 20,
            origin: { y: 0.6 },
            colors: ['#5c755c', '#a4b8a4']
          });
        }
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (taskToDelete) {
      addNotification('Trajectory Modified', `Focus item removed: "${taskToDelete.title}"`, 'system');
    }
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Focus', icon: ListTodo },
    { id: 'goals', label: 'Milestones', icon: Target },
    { id: 'leaderboard', label: 'Community', icon: Trophy },
  ];

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight();
    return () => window.removeEventListener('resize', appHeight);
  }, []);

  if (activeView === 'landing') {
    return <LandingPage onStart={() => setActiveView('dashboard')} />;
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col lg:flex-row h-screen-dynamic lg:h-screen bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-hidden text-slate-900 relative">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] contrast-150 z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Sidebar Navigation - Desktop only */}
      <aside className="hidden lg:flex w-24 lg:w-80 bg-white border-r border-slate-100 flex-col p-8 z-50 relative">
        <div className="flex items-center gap-4 mb-20 px-2 leading-none">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-900/10">
            <Sparkles className="text-teal-400 w-6 h-6" />
          </div>
          <span className="hidden lg:block font-sans font-extrabold text-2xl text-slate-900 tracking-tighter">Life Planner</span>
        </div>

        <nav className="flex-1 space-y-3">
          <p className="hidden lg:block text-[10px] font-bold text-slate-300 uppercase tracking-[0.25em] mb-6 ml-4">Trajectory Control</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group",
                activeView === item.id 
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 lg:translate-x-2" 
                  : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-500",
                activeView === item.id ? "scale-110" : "group-hover:scale-110"
              )} />
              <span className="hidden lg:block font-bold text-sm tracking-tight">{item.label}</span>
              {activeView === item.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-6 bg-teal-400 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="pt-10 mt-auto border-t border-slate-50">
          <div className="flex items-center gap-4 p-2">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 p-0.5 overflow-hidden">
              <img 
                src="https://i.pravatar.cc/150?u=me" 
                alt="Me" 
                className="w-full h-full rounded-[0.85rem] object-cover grayscale-[0.2]"
              />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-extrabold text-slate-900 tracking-tight">Alex Sterling</p>
              <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest leading-none mt-1">Growth Tier 4</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative pb-24 lg:pb-0">
        {/* Top Navbar */}
        <header className="h-20 lg:h-24 bg-white/40 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-40">
           <div className="flex-1 max-w-lg">
             <div className="relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-teal-500 transition-colors" />
               <input
                type="text"
                placeholder="Search trajectory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white lg:bg-slate-50/50 border border-slate-100 lg:border-transparent rounded-xl py-2.5 lg:py-3 pl-10 lg:pl-12 pr-4 text-xs lg:text-sm focus:bg-white focus:border-slate-200 placeholder:text-slate-400 outline-none transition-all font-medium"
               />
             </div>
           </div>
           
           <div className="flex items-center gap-4 lg:gap-8 ml-4 lg:ml-10">
             <div className="hidden sm:flex items-center gap-2 group cursor-pointer" onClick={() => addNotification('System Status', 'All nodes operational. Trajectory optimal.', 'system')}>
               <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-600 transition-colors">Sync</span>
             </div>
             <div className="hidden sm:block w-px h-6 bg-slate-200" />
             <button 
               onClick={() => setIsNotificationsOpen(true)}
               className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-teal-600 hover:border-teal-100 transition-all shadow-sm"
              >
               <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
               {unreadCount > 0 && (
                 <div className="absolute top-2.5 right-2.5 lg:top-3 lg:right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
               )}
             </button>
           </div>
        </header>

        {/* Dynamic View Section */}
        <div className="p-6 lg:p-12 max-w-[1500px] mx-auto w-full pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {activeView === 'dashboard' && (
                <Dashboard tasks={tasks} goals={goals} />
              )}
              {activeView === 'tasks' && (
                <TaskBoard tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
              )}
              {activeView === 'leaderboard' && (
                <Leaderboard users={leaderboardUsers} />
              )}
              {activeView === 'goals' && (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 text-teal-500">
                    <Target className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Milestone Management</h2>
                  <p className="text-slate-500 max-w-sm">Define your multi-year trajectory. This module is under active construction.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-6 left-6 right-6 bg-slate-900/95 backdrop-blur-md rounded-[2.5rem] p-2 flex items-center justify-between z-[60] shadow-2xl shadow-slate-900/40 border border-white/10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as View)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-3 rounded-[2rem] transition-all relative overflow-hidden",
              activeView === item.id ? "text-teal-400" : "text-slate-400 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300",
              activeView === item.id && "scale-110"
            )} />
            <span className="text-[7px] font-black uppercase tracking-[0.1em]">{item.label}</span>
            {activeView === item.id && (
              <motion.div
                layoutId="activeNavMobile"
                className="absolute bottom-0 w-8 h-1 bg-teal-400 rounded-full"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Notification Center */}
      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
        onClearAll={() => setNotifications([])}
      />

      {/* Global Task Creation Trigger */}
      <TaskForm onAdd={addTask} />

      {/* Aesthetic Accents - Cleaner for Geometric Theme */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-teal-500/5 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/20 blur-[150px] -z-10 rounded-full pointer-events-none"></div>
    </div>
  );
}

