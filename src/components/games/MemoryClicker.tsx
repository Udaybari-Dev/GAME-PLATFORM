import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GameState } from '@/types/game';
import { Home, RotateCcw, Trophy, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const COLORS = [
  { id: 1, color: 'bg-red-500', name: 'Red' },
  { id: 2, color: 'bg-blue-500', name: 'Blue' },
  { id: 3, color: 'bg-green-500', name: 'Green' },
  { id: 4, color: 'bg-yellow-500', name: 'Yellow' },
  { id: 5, color: 'bg-purple-500', name: 'Purple' },
  { id: 6, color: 'bg-orange-500', name: 'Orange' },
];

const MemoryClicker = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showingSequence, setShowingSequence] = useState(false);
  const [highlightedButton, setHighlightedButton] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const { user } = useAuth();
  const { addGameResult, getGameStats } = useGameHistory(user?.id || null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const stats = getGameStats('memory-clicker');

  const generateNextSequence = useCallback(() => {
    const nextNumber = Math.floor(Math.random() * COLORS.length) + 1;
    setSequence(prev => [...prev, nextNumber]);
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    setCurrentLevel(1);
    setSequence([]);
    setPlayerSequence([]);
    setStartTime(Date.now());
    
    // Generate first sequence item
    const firstNumber = Math.floor(Math.random() * COLORS.length) + 1;
    setSequence([firstNumber]);
  }, []);

  const showSequence = useCallback(async () => {
    setShowingSequence(true);
    setPlayerSequence([]);
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setHighlightedButton(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setHighlightedButton(null);
    }
    
    setShowingSequence(false);
  }, [sequence]);

  const handleButtonClick = (buttonId: number) => {
    if (showingSequence || gameState !== 'playing') return;
    
    const newPlayerSequence = [...playerSequence, buttonId];
    setPlayerSequence(newPlayerSequence);
    
    // Check if the clicked button is correct
    const currentIndex = playerSequence.length;
    if (sequence[currentIndex] !== buttonId) {
      // Game over - wrong sequence
      endGame(false);
      return;
    }
    
    // Check if player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      // Level completed
      setCurrentLevel(prev => prev + 1);
      
      if (currentLevel >= 15) {
        // Game won!
        endGame(true);
      } else {
        // Next level
        setTimeout(() => {
          generateNextSequence();
        }, 1000);
      }
    }
  };

  const endGame = useCallback((isWin: boolean) => {
    if (startTime) {
      const duration = Math.round((Date.now() - startTime) / 1000);
      setGameState('finished');
      addGameResult('memory-clicker', 'Memory Clicker', currentLevel, duration);
      
      const message = isWin ? 'Perfect memory!' : 
                     currentLevel >= 10 ? 'Excellent memory!' :
                     currentLevel >= 5 ? 'Good memory!' : 'Keep practicing!';
      
      toast({
        title: isWin ? "You Won!" : "Game Over!",
        description: `${message} You reached level ${currentLevel}!`,
      });
    }
  }, [currentLevel, startTime, addGameResult, toast]);

  const resetGame = () => {
    setGameState('idle');
    setSequence([]);
    setPlayerSequence([]);
    setCurrentLevel(1);
    setShowingSequence(false);
    setHighlightedButton(null);
    setStartTime(null);
  };

  // Show sequence when it updates
  useEffect(() => {
    if (sequence.length > 0 && gameState === 'playing') {
      showSequence();
    }
  }, [sequence, gameState, showSequence]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <Home size={20} />
          Home
        </Button>
        <h1 className="game-title">🧠 Memory Clicker</h1>
        <div className="w-16" />
      </div>

      <Card className="p-8 text-center bg-gradient-card border-border/50">
        <div className="mb-8">
          <div className="score-display mb-4">{currentLevel}</div>
          <p className="text-muted-foreground">Level</p>
        </div>

        {gameState === 'idle' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Test Your Memory!</h2>
              <p className="text-muted-foreground mb-4">
                Watch the sequence, then repeat it by clicking the colored buttons.
              </p>
              {stats && (
                <div className="flex justify-center items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Trophy size={16} className="text-accent" />
                    <span>Best: Level {stats.bestScore}</span>
                  </div>
                  <div>Avg: Level {stats.averageScore}</div>
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
              <div className="flex items-center justify-center gap-2 mb-4">
                {showingSequence ? (
                  <>
                    <Eye className="text-primary" size={20} />
                    <span className="text-primary font-medium">Watch the sequence...</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="text-accent" size={20} />
                    <span className="text-accent font-medium">Now repeat it!</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Progress: {playerSequence.length} / {sequence.length}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              {COLORS.map((colorInfo) => (
                <button
                  key={colorInfo.id}
                  onClick={() => handleButtonClick(colorInfo.id)}
                  disabled={showingSequence}
                  className={`
                    w-20 h-20 rounded-xl border-2 border-white/20 transition-all duration-200
                    ${colorInfo.color}
                    ${highlightedButton === colorInfo.id ? 'scale-110 brightness-150 border-white' : ''}
                    ${showingSequence ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 cursor-pointer'}
                    disabled:cursor-not-allowed
                  `}
                />
              ))}
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-accent mb-2">
                {currentLevel >= 15 ? 'Perfect Score!' : 'Game Over!'}
              </h2>
              <p className="text-muted-foreground mb-4">
                Final Level: <span className="text-foreground font-semibold">{currentLevel}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {currentLevel >= 15 ? 'Amazing memory skills!' : 
                 currentLevel >= 10 ? 'Great memory!' :
                 currentLevel >= 5 ? 'Good job!' : 'Keep practicing!'}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button variant="gaming" size="lg" onClick={resetGame} className="flex-1 gap-2">
                <RotateCcw size={20} />
                Play Again
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/')} className="flex-1">
                Home
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MemoryClicker;