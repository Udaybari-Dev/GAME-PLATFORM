import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useOrientation } from '@/hooks/useOrientation';
import Header from '@/components/layout/Header';
import GameLibrary from '@/components/games/GameLibrary';
import RotateDevice from '@/components/layout/RotateDevice';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { isSupported } = useOrientation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

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

  if (!user) {
    return null; // Will redirect to login
  }

  if (!isSupported) {
    return <RotateDevice />;
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />
      <main>
        <GameLibrary />
      </main>
    </div>
  );
};

export default Index;
