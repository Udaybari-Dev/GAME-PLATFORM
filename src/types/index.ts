// src/types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
  loginTime: string;
}

export interface Game {
  id: string;
  name: string;
  emoji: string;
  tag: string;
  description: string;
  slug: string;
  color: string;
}

export interface GameHistory {
  id: string;
  gameId: string;
  gameName: string;
  score: number;
  timestamp: string;
  duration: number;
  details?: any;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface GameResult {
  score: number;
  duration: number;
  details?: any;
}


