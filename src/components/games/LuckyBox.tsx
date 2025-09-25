import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GameState } from '@/types/game';
import { Home, RotateCcw, Trophy, Gift, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const REWARDS = [
  { id: 1, name: 'Common Gem', emoji: '💎', value: 10, chance: 40, rarity: 'Common' },
  { id: 2, name: 'Silver Coin', emoji: '🪙', value: 25, chance: 25, rarity: 'Uncommon' },
  { id: 3, name: 'Gold Coin', emoji: '🥇', value: 50, chance: 15, rarity: 'Rare' },
  { id: 4, name: 'Crystal', emoji: '🔮', value: 100, chance: 10, rarity: 'Epic' },
  { id: 5, name: 'Diamond', emoji: '💍', value: 250, chance: 7, rarity: 'Legendary' },
  { id: 6, name: 'Treasure Chest', emoji: '👑', value: 500, chance: 2.5, rarity: 'Mythic' },
  { id: 7, name: 'Dragon Egg', emoji: '🐲', value: 1000, chance: 0.5, rarity: 'Divine' },
];

const BOXES_PER_GAME = 10;

const LuckyBox = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [totalScore, setTotalScore] = useState(0);
  const [boxesOpened, setBoxesOpened] = useState(0);
  const [currentReward, setCurrentReward] = useState<typeof REWARDS[0] | null>(null);
  const [rewardHistory, setRewardHistory] = useState<typeof REWARDS>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  const { user } = useAuth();
  const { addGameResult, getGameStats } = useGameHistory(user?.id || null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const stats = getGameStats('lucky-box');

  const getRandomReward = () => {
    const random = Math.random() * 100;
    let cumulativeChance = 0;
    
    for (const reward of REWARDS) {
      cumulativeChance += reward.chance;
      if (random <= cumulativeChance) {
        return reward;
      }
    }
    
    return REWARDS[0]; // Fallback to common gem
  };

  const startGame = useCallback(() => {
    setGameState('playing');
    setTotalScore(0);
    setBoxesOpened(0);
    setCurrentReward(null);
    setRewardHistory([]);
    setStartTime(Date.now());
  }, []);

  const openBox = () => {
    if (gameState !== 'playing') return;
    
    const reward = getRandomReward();
    setCurrentReward(reward);
    setTotalScore(prev => prev + reward.value);
    setBoxesOpened(prev => prev + 1);
    setRewardHistory(prev => [...prev, reward]);
    
    if (boxesOpened + 1 >= BOXES_PER_GAME) {
      // Game finished
      setTimeout(() => {
        endGame();
      }, 2000);
    }
  };

  const endGame = useCallback(() => {
    if (startTime) {
      const duration = Math.round((Date.now() - startTime) / 1000);
      setGameState('finished');
      addGameResult('lucky-box', 'Lucky Box', totalScore, duration);
      
      const message = totalScore >= 1000 ? 'Incredible luck!' : 
                     totalScore >= 500 ? 'Great fortune!' :
                     totalScore >= 200 ? 'Good luck!' : 'Better luck next time!';
      
      toast({
        title: "All Boxes Opened!",
        description: `${message} Total treasure: ${totalScore} points!`,
      });
    }
  }, [totalScore, startTime, addGameResult, toast]);

  const resetGame = () => {
    setGameState('idle');
    setTotalScore(0);
    setBoxesOpened(0);
    setCurrentReward(null);
    setRewardHistory([]);
    setStartTime(null);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Uncommon': return 'text-green-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      case 'Mythic': return 'text-red-400';
      case 'Divine': return 'text-gradient-primary';
      default: return 'text-gray-400';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'Epic': return <Star size={16} />;
      case 'Legendary': return <Trophy size={16} />;
      case 'Mythic': case 'Divine': return <Zap size={16} />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
          <Home size={20} />
          Home
        </Button>
        <h1 className="game-title">🎁 Lucky Box</h1>
        <div className="w-16" />
      </div>

      <Card className="p-8 text-center bg-gradient-card border-border/50">
        <div className="mb-8">
          <div className="score-display mb-4">{totalScore}</div>
          <p className="text-muted-foreground">Total Treasure</p>
        </div>

        {gameState === 'idle' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Test Your Luck!</h2>
              <p className="text-muted-foreground mb-4">
                Open {BOXES_PER_GAME} mystery boxes and collect treasures. Each box contains a random reward!
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
              Start Opening Boxes
            </Button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-lg font-medium text-primary mb-2">
                Box {boxesOpened + 1} of {BOXES_PER_GAME}
              </div>
              <div className="w-full bg-border rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(boxesOpened / BOXES_PER_GAME) * 100}%` }}
                />
              </div>
            </div>
            
            {currentReward && (
              <div className="mb-6 p-4 rounded-xl bg-background/50 border border-border/30">
                <div className="text-4xl mb-2">{currentReward.emoji}</div>
                <div className={`font-semibold mb-1 flex items-center justify-center gap-2 ${getRarityColor(currentReward.rarity)}`}>
                  {getRarityIcon(currentReward.rarity)}
                  {currentReward.name}
                </div>
                <div className="text-accent font-bold">+{currentReward.value} points</div>
                <div className="text-xs text-muted-foreground mt-1">{currentReward.rarity}</div>
              </div>
            )}
            
            <Button
              variant="gaming"
              size="xl"
              onClick={openBox}
              disabled={boxesOpened >= BOXES_PER_GAME}
              className="w-full h-24 text-xl gap-3"
            >
              <Gift size={24} />
              {boxesOpened >= BOXES_PER_GAME ? 'Opening...' : 'Open Box'}
            </Button>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-accent mb-2">All Boxes Opened!</h2>
              <p className="text-muted-foreground mb-4">
                Final Treasure: <span className="text-foreground font-semibold">{totalScore} points</span>
              </p>
              
              <div className="max-h-32 overflow-y-auto mb-4">
                <h3 className="text-sm font-medium mb-2">Your Rewards:</h3>
                <div className="grid grid-cols-5 gap-2">
                  {rewardHistory.map((reward, index) => (
                    <div 
                      key={index}
                      className="text-2xl p-2 rounded bg-background/30"
                      title={`${reward.name} - ${reward.value} points`}
                    >
                      {reward.emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button variant="gaming" size="lg" onClick={resetGame} className="flex-1 gap-2">
                <RotateCcw size={20} />
                Try Again
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

export default LuckyBox;