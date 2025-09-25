import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Trophy, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/games');
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-orbitron font-black text-xl text-gradient-primary"
          >
            🎮 GamePortal
          </button>
        </div>

        <nav className="flex items-center gap-2">
          {user && !isHomePage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <Home size={16} />
              Home
            </Button>
          )}
          
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/history')}
              className="gap-2"
            >
              <Trophy size={16} />
              History
            </Button>
          )}

          {user && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <User size={16} className="text-primary" />
                <span className="text-foreground">{user.username}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;