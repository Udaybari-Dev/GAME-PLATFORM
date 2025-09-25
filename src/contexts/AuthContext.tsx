import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  loginTime: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize demo users
    const demoUsers = [
      { id: '1', username: 'admin', password: 'admin' },
      { id: '2', username: 'guest', password: 'guest' },
      { id: '3', username: 'player1', password: 'demo' },
    ];
    
    const existingUsers = localStorage.getItem('gamePortalUsers');
    if (!existingUsers) {
      localStorage.setItem('gamePortalUsers', JSON.stringify(demoUsers));
    }

    // Load user from localStorage on app start
    const storedUser = localStorage.getItem('gamePortalUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('gamePortalUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check stored users
    const storedUsers = JSON.parse(localStorage.getItem('gamePortalUsers') || '[]');
    const existingUser = storedUsers.find((u: any) => u.username === username && u.password === password);
    
    if (existingUser) {
      const newUser: User = {
        id: existingUser.id,
        username: existingUser.username,
        loginTime: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem('gamePortalUser', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if username already exists
    const storedUsers = JSON.parse(localStorage.getItem('gamePortalUsers') || '[]');
    const existingUser = storedUsers.find((u: any) => u.username === username);
    
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUserData = {
      id: Date.now().toString(),
      username,
      password,
    };
    
    storedUsers.push(newUserData);
    localStorage.setItem('gamePortalUsers', JSON.stringify(storedUsers));
    
    const newUser: User = {
      id: newUserData.id,
      username: newUserData.username,
      loginTime: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem('gamePortalUser', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gamePortalUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};