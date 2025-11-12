'use client';

import React, { createContext, useContext, useState } from 'react';

// Tactical Warrior Auth System
interface Warrior {
  id: string;
  callsign?: string;
  email?: string;
  isAnonymous: boolean;
  rank: 'RECRUIT' | 'SOLDIER' | 'VETERAN' | 'COMMANDER';
  deployedAt: Date;
  lastSeen: Date;
}

interface TacticalAuthType {
  warrior: Warrior | null;
  loading: boolean;
  deployWithGoogle: () => Promise<void>;
  deployAnonymous: () => Promise<void>;
  extract: () => Promise<void>;
}

const TacticalAuthContext = createContext<TacticalAuthType | undefined>(undefined);

export function TacticalAuthProvider({ children }: { children: React.ReactNode }) {
  const [warrior, setWarrior] = useState<Warrior | null>(null);
  const [loading, setLoading] = useState(false);

  const deployWithGoogle = async () => {
    setLoading(true);
    try {
      // Simulate tactical deployment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newWarrior: Warrior = {
        id: `warrior-${Date.now()}`,
        callsign: 'Alpha-' + Math.floor(Math.random() * 1000),
        email: 'classified@tactical.ops',
        isAnonymous: false,
        rank: 'SOLDIER',
        deployedAt: new Date(),
        lastSeen: new Date()
      };
      
      setWarrior(newWarrior);
      localStorage.setItem('tactical-warrior', JSON.stringify(newWarrior));
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const deployAnonymous = async () => {
    setLoading(true);
    try {
      // Simulate stealth deployment
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const stealthWarrior: Warrior = {
        id: `stealth-${Date.now()}`,
        callsign: 'Ghost-' + Math.floor(Math.random() * 1000),
        isAnonymous: true,
        rank: 'RECRUIT',
        deployedAt: new Date(),
        lastSeen: new Date()
      };
      
      setWarrior(stealthWarrior);
      localStorage.setItem('tactical-warrior', JSON.stringify(stealthWarrior));
    } catch (error) {
      console.error('Stealth deployment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const extract = async () => {
    setWarrior(null);
    localStorage.removeItem('tactical-warrior');
  };

  return (
    <TacticalAuthContext.Provider value={{ 
      warrior, 
      loading, 
      deployWithGoogle,
      deployAnonymous, 
      extract 
    }}>
      {children}
    </TacticalAuthContext.Provider>
  );
}

export function useTacticalAuth() {
  const context = useContext(TacticalAuthContext);
  if (context === undefined) {
    throw new Error('useTacticalAuth must be used within a TacticalAuthProvider');
  }
  return context;
}

// Legacy compatibility
export const AuthProvider = TacticalAuthProvider;
export const useAuth = useTacticalAuth;