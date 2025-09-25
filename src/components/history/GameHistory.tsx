import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGameHistory } from '@/hooks/useGameHistory';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '@/types/game';
import { Home, Calendar, Trophy, Clock, Filter, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

const GameHistory = () => {
  const { user } = useAuth();
  const { history, getGameStats } = useGameHistory(user?.id || null);
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<string>('all');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground">Please log in to view your game history.</p>
      </div>
    );
  }

  const filteredHistory = selectedGame === 'all' 
    ? history 
    : history.filter(h => h.gameId === selectedGame);

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getGameEmoji = (gameId: string) => {
    const game = GAMES.find(g => g.id === gameId);
    return game?.emoji || '🎮';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => navigate('/games')} className="gap-2">
          <Home size={20} />
          Home
        </Button>
        <h1 className="game-title">🏆 Game History</h1>
        <div className="w-16" />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {GAMES.map(game => {
          const stats = getGameStats(game.id);
          if (!stats) return null;
          
          return (
            <Card key={game.id} className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{game.emoji}</div>
                <div>
                  <h3 className="font-semibold">{game.name}</h3>
                  <p className="text-sm text-muted-foreground">{game.tag}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Score:</span>
                  <span className="text-accent font-medium">{stats.bestScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average:</span>
                  <span>{stats.averageScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Games Played:</span>
                  <span>{stats.totalPlays}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filter */}
      <Card className="p-4 mb-6 bg-gradient-card border-border/50">
        <div className="flex items-center gap-4">
          <Filter size={20} className="text-muted-foreground" />
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedGame === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGame('all')}
            >
              All Games
            </Button>
            {GAMES.map(game => (
              <Button
                key={game.id}
                variant={selectedGame === game.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGame(game.id)}
                className="gap-2"
              >
                {game.emoji} {game.name}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* History List */}
      <Card className="bg-gradient-card border-border/50">
        <div className="p-6 border-b border-border/30">
          <h2 className="text-xl font-semibold">Recent Games</h2>
          <p className="text-muted-foreground text-sm">
            {filteredHistory.length} game{filteredHistory.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="divide-y divide-border/30">
          {filteredHistory.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <div className="text-4xl mb-4">🎮</div>
              <p>No games played yet.</p>
              <p className="text-sm">Start playing to see your history here!</p>
            </div>
          ) : (
            filteredHistory.slice(0, 50).map((game) => (
              <div key={game.id} className="p-4 hover:bg-background/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{getGameEmoji(game.gameId)}</div>
                    <div>
                      <h3 className="font-medium">{game.gameName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {format(new Date(game.timestamp), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDuration(game.duration)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-accent font-bold">
                      <Trophy size={16} />
                      {game.score}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(game.timestamp), 'HH:mm')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {filteredHistory.length > 50 && (
          <div className="p-4 text-center text-muted-foreground text-sm border-t border-border/30">
            Showing latest 50 games
          </div>
        )}
      </Card>
    </div>
  );
};

export default GameHistory;