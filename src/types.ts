export interface Task {
  id: string;
  title: string;
  category: 'work' | 'personal' | 'growth' | 'health';
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface Goal {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: string;
  color: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'goal' | 'task' | 'community' | 'system';
  timestamp: number;
  read: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  requirement: string;
}

export type View = 'landing' | 'login' | 'dashboard' | 'tasks' | 'goals' | 'growth' | 'leaderboard' | 'nutrition' | 'focus' | 'calendar';
