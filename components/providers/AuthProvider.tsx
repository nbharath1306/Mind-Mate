'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Mock Firebase for now - will implement real Firebase later
interface User {
  id: string;
  email?: string;
  displayName?: string;
  isAnonymous: boolean;
  createdAt: Date;
  lastLogin: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignInWithGoogle = async () => {
    try {
      // Mock Google sign-in
      const mockUser: User = {
        id: 'user_123',
        email: 'demo@example.com',
        displayName: 'Demo User',
        isAnonymous: false,
        createdAt: new Date(),
        lastLogin: new Date(),
      };
      setUser(mockUser);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignInAnonymously = async () => {
    try {
      // Mock anonymous sign-in
      const mockUser: User = {
        id: 'anon_123',
        isAnonymous: true,
        createdAt: new Date(),
        lastLogin: new Date(),
      };
      setUser(mockUser);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error signing in anonymously:', error);
    }
  };

  const handleLogout = async () => {
    try {
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signInWithGoogle: handleSignInWithGoogle,
    signInAnonymously: handleSignInAnonymously,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}