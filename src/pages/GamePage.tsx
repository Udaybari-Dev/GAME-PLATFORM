import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useOrientation } from '@/hooks/useOrientation';
import { GAMES } from '@/types/game';
import Header from '@/components/layout/Header';
import RotateDevice from '@/components/layout/RotateDevice';
import TapCounter from '@/components/games/TapCounter';
import MemoryClicker from '@/components/games/MemoryClicker';
import LuckyBox from '@/components/games/LuckyBox';

const GamePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { isSupported } = useOrientation();

  const game = GAMES.find(g => g.slug === slug);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!game) {
      navigate('/games');
    }
  }, [game, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
        <div className="text-center">
          <div className="loading-dots mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !game) {
    return null; // Will redirect
  }

  if (!isSupported) {
    return <RotateDevice />;
  }

  const renderGame = () => {
    switch (game.id) {
      case 'tap-counter':
        return <TapCounter />;
      case 'memory-clicker':
        return <MemoryClicker />;
      case 'lucky-box':
        return <LuckyBox />;
      default:
        return (
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-muted-foreground">Game not found</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <main>
        {renderGame()}
      </main>
    </div>
  );
};

export default GamePage;