export interface Game {
  id: string;
  name: string;
  emoji: string;
  tag: string;
  description: string;
  slug: string;
  minScore?: number;
  maxScore?: number;
}

export const GAMES: Game[] = [
  {
    id: 'tap-counter',
    name: 'Tap Counter',
    emoji: '⚡',
    tag: 'Speed',
    description: 'Tap as fast as you can in 10 seconds!',
    slug: 'tap-counter',
    maxScore: 500,
  },
  {
    id: 'memory-clicker',
    name: 'Memory Clicker',
    emoji: '🧠',
    tag: 'Memory',
    description: 'Remember and repeat the sequence!',
    slug: 'memory-clicker',
    maxScore: 50,
  },
  {
    id: 'lucky-box',
    name: 'Lucky Box',
    emoji: '🎁',
    tag: 'Luck',
    description: 'Open boxes to find treasures!',
    slug: 'lucky-box',
    maxScore: 10000,
  },
];

export type GameState = 'idle' | 'playing' | 'finished' | 'paused';