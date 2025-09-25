import React from 'react';
import { Button } from '@/components/ui/button';
import { Game } from '@/types/game';
import { useNavigate } from 'react-router-dom';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Clock, Target } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getGameStats } = useGameHistory(user?.id || null);
  
  const stats = getGameStats(game.id);

  return (
    <Button
      variant="card"
      size="card"
      onClick={() => navigate(`/games/${game.slug}`)}
      className="text-left flex-col items-start justify-between h-auto min-h-[160px]"
    >
      <div className="w-full">
        <div className="flex items-start justify-between mb-3">
          <div className="text-4xl">{game.emoji}</div>
          <div className="px-2 py-1 rounded-lg bg-primary/20 text-primary text-xs font-medium">
            {game.tag}
          </div>
        </div>
        
        <h3 className="font-orbitron font-bold text-lg mb-2">{game.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
      </div>

      {stats && (
        <div className="w-full pt-3 border-t border-border/30">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Trophy size={12} className="text-accent" />
              <span className="text-accent font-medium">{stats.bestScore}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target size={12} className="text-secondary" />
              <span className="text-secondary font-medium">{stats.totalPlays}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} className="text-muted-foreground" />
              <span className="text-muted-foreground">{stats.averageScore}</span>
            </div>
          </div>
        </div>
      )}
    </Button>
  );
};

export default GameCard;