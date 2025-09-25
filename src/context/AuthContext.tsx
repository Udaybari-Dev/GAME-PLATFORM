// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import { generateId } from '../utils/gameHelpers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if username or email already exists
      const userExists = existingUsers.some((u: any) => 
        u.username === username || u.email === email
      );
      
      if (userExists) {
        throw new Error('Username or email already exists');
      }

      // Create new user
      const newUser: User = {
        id: generateId(),
        username,
        email,
        loginTime: new Date().toISOString()
      };

      // Store user credentials (in real app, password would be hashed)
      const newUserWithPassword = { ...newUser, password };
      existingUsers.push(newUserWithPassword);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Auto-login after registration
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user
      const foundUser = existingUsers.find((u: any) => 
        (u.username === username || u.email === username) && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      // Create user session
      const userSession: User = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        loginTime: new Date().toISOString()
      };

      setUser(userSession);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userSession));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};