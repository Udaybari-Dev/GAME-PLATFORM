import { useState, useEffect } from 'react';

export interface GameHistory {
  id: string;
  gameId: string;
  gameName: string;
  score: number;
  timestamp: string;
  duration: number; // in seconds
  userId: string;
}

export const useGameHistory = (userId: string | null) => {
  const [history, setHistory] = useState<GameHistory[]>([]);

  useEffect(() => {
    if (!userId) {
      setHistory([]);
      return;
    }

    const storedHistory = localStorage.getItem(`gameHistory_${userId}`);
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (error) {
        console.error('Error parsing game history:', error);
        setHistory([]);
      }
    }
  }, [userId]);

  const addGameResult = (gameId: string, gameName: string, score: number, duration: number) => {
    if (!userId) return;

    const newResult: GameHistory = {
      id: Date.now().toString(),
      gameId,
      gameName,
      score,
      duration,
      timestamp: new Date().toISOString(),
      userId,
    };

    const updatedHistory = [newResult, ...history].slice(0, 100); // Keep only last 100 games
    setHistory(updatedHistory);
    localStorage.setItem(`gameHistory_${userId}`, JSON.stringify(updatedHistory));
  };

  const getGameStats = (gameId: string) => {
    const gameResults = history.filter(h => h.gameId === gameId);
    if (gameResults.length === 0) return null;

    const scores = gameResults.map(r => r.score);
    return {
      totalPlays: gameResults.length,
      bestScore: Math.max(...scores),
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      lastPlayed: gameResults[0].timestamp,
    };
  };

  return {
    history,
    addGameResult,
    getGameStats,
  };
};