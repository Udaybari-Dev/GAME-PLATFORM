import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GameState } from '@/types/game';
import { Home, RotateCcw, Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GAME_DURATION = 10; // seconds

const TapCounter = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const { user } = useAuth();
  const { addGameResult, getGameStats } = useGameHistory(user?.id || null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const stats = getGameStats('tap-counter');

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setStartTime(Date.now());
  }, []);

  const tap = useCallback(() => {
    if (gameState === 'playing') {
      setScore(prev => prev + 1);
    }
  }, [gameState]);

  const endGame = useCallback(() => {
    if (gameState === 'playing' && startTime) {
      const duration = Math.round((Date.now() - startTime) / 1000);
      setGameState('finished');
      addGameResult('tap-counter', 'Tap Counter', score, duration);
      
      // Use setTimeout to avoid React warning about setting state during render
      setTimeout(() => {
        const message = score >= 100 ? 'Amazing tapping speed!' : 
                       score >= 50 ? 'Great job!' : 'Good effort!';
        
        toast({
          title: "Game Complete!",
          description: `${message} You scored ${score} taps!`,
        });
      }, 0);
    }
  }, [gameState, score, startTime, addGameResult, toast]);

  const resetGame = () => {
    setGameState('idle');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setStartTime(null);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Call endGame directly without dependency
            setGameState('finished');
            if (startTime) {
              const duration = Math.round((Date.now() - startTime) / 1000);
              addGameResult('tap-counter', 'Tap Counter', score, duration);
              
              setTimeout(() => {
                const message = score >= 100 ? 'Amazing tapping speed!' : 
                               score >= 50 ? 'Great job!' : 'Good effort!';
                
                toast({
                  title: "Game Complete!",
                  description: `${message} You scored ${score} taps!`,
                });
              }, 0);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameState]);

  // Handle keyboard spacebar for tapping
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState === 'playing') {
        e.preventDefault();
        tap();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [tap, gameState]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <Home size={20} />
          Home
        </Button>
        <h1 className="game-title">⚡ Tap Counter</h1>
        <div className="w-16" />
      </div>

      <Card className="p-8 text-center bg-gradient-card border-border/50">
        <div className="mb-8">
          <div className="score-display mb-4">{score}</div>
          <p className="text-muted-foreground">Taps</p>
        </div>

        {gameState === 'idle' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Ready to Test Your Speed?</h2>
              <p className="text-muted-foreground mb-4">
                Tap the button (or press spacebar) as many times as you can in {GAME_DURATION} seconds!
              </p>
              {stats && (
                <div className="flex justify-center items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Trophy size={16} className="text-accent" />
                    <span>Best: {stats.bestScore}</span>
                  </div>
                  <div>Avg: {stats.averageScore}</div>
                  <div>Plays: {stats.totalPlays}</div>
                </div>
              )}
            </div>
            <Button variant="gaming" size="xl" onClick={startGame}>
              Start Game
            </Button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{timeLeft}s</div>
              <p className="text-muted-foreground">Time remaining</p>
            </div>
            
            <Button
              variant="gaming"
              size="xl"
              onClick={tap}
              className="w-full h-32 text-2xl transform active:scale-95 transition-transform"
            >
              TAP!
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Tip: You can also press the spacebar to tap!
            </p>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-accent mb-2">Game Over!</h2>
              <p className="text-muted-foreground mb-4">
                Final Score: <span className="text-foreground font-semibold">{score} taps</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Average: {(score / GAME_DURATION).toFixed(1)} taps per second
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="gaming" size="lg" onClick={resetGame} className="flex-1 gap-2">
                <RotateCcw size={20} />
                Play Again
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/')} className="flex-1">
                Save Game
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TapCounter;