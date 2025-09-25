import React from 'react';
import { GAMES } from '@/types/game';
import GameCard from './GameCard';
import { useAuth } from '@/contexts/AuthContext';

const GameLibrary = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-orbitron font-black text-4xl md:text-5xl text-gradient-primary mb-4">
          Welcome{user ? `, ${user.username}` : ''}!
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Choose your adventure and start gaming
        </p>
        <div className="h-1 w-24 bg-gradient-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {GAMES.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground text-sm">
          More games coming soon! Stay tuned for updates.
        </p>
      </div>
    </div>
  );
};

export default GameLibrary;