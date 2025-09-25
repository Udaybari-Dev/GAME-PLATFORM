// src/utils/gameHelpers.ts
import type { Game, GameHistory } from '../types/index';

export const GAMES: Game[] = [
  {
    id: '1',
    name: 'Tap Counter',
    emoji: '👆',
    tag: 'Speed',
    description: 'Tap as fast as you can in 10 seconds!',
    slug: 'tap-counter',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Memory Clicker',
    emoji: '🧠',
    tag: 'Memory',
    description: 'Remember the sequence and repeat it!',
    slug: 'memory-clicker',
    color: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'Lucky Box',
    emoji: '🎁',
    tag: 'Luck',
    description: 'Choose a box and win prizes!',
    slug: 'lucky-box',
    color: 'bg-green-500'
  }
];

export const getGameBySlug = (slug: string): Game | undefined => {
  return GAMES.find(game => game.slug === slug);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const saveGameResult = (gameId: string, gameName: string, result: { score: number; duration: number; details?: any }): void => {
  const history: GameHistory[] = JSON.parse(localStorage.getItem('gameHistory') || '[]');
  
  const newEntry: GameHistory = {
    id: generateId(),
    gameId,
    gameName,
    score: result.score,
    duration: result.duration,
    timestamp: new Date().toISOString(),
    details: result.details
  };

  history.unshift(newEntry);
  
  // Keep only last 50 games
  if (history.length > 50) {
    history.splice(50);
  }

  localStorage.setItem('gameHistory', JSON.stringify(history));
};

export const getGameHistory = (): GameHistory[] => {
  return JSON.parse(localStorage.getItem('gameHistory') || '[]');
};

export const getRandomPrize = () => {
  const prizes = [
    { emoji: '🏆', name: 'Trophy', points: 100 },
    { emoji: '💎', name: 'Diamond', points: 150 },
    { emoji: '🌟', name: 'Star', points: 75 },
    { emoji: '🎯', name: 'Target', points: 50 },
    { emoji: '🔥', name: 'Fire', points: 125 },
    { emoji: '⚡', name: 'Lightning', points: 90 },
    { emoji: '🎪', name: 'Fun', points: 25 },
    { emoji: '🎨', name: 'Art', points: 60 }
  ];
  
  return prizes[Math.floor(Math.random() * prizes.length)];
};



//Adding Demo User for testing purposes
   export const createDemoUser = () => {
     const users = JSON.parse(localStorage.getItem('users') || '[]');
     const demoExists = users.some((u: any) => u.username === 'demo');
     
     if (!demoExists) {
       users.push({
         id: 'demo-user-id',
         username: 'demo',
         email: 'demo@example.com',
         password: 'demo123'
       });
       localStorage.setItem('users', JSON.stringify(users));
     }
   };