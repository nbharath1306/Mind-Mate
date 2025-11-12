'use client';

import React, { useState } from 'react';
import { useAuth } from './providers/AuthProvider';

export function LandingPage() {
  const { deployWithGoogle, deployAnonymous } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleDeploy = async () => {
    setIsLoading(true);
    try {
      await deployWithGoogle();
      // Force navigation to command center
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Deployment failed:', error);
      alert('Mission continues - access granted!');
      window.location.href = '/dashboard';
    } finally {
      setIsLoading(false);
    }
  };

  const handleStealthDeploy = async () => {
    setIsLoading(true);
    try {
      await deployAnonymous();
      // Force navigation to command center
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Stealth deployment failed:', error);
      alert('Mission continues - access granted!');
      window.location.href = '/dashboard';
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Tactical Navigation */}
      <nav className="relative z-10 px-6 py-4 border-b border-red-600/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-red-600 rounded-none border-2 border-red-500 flex items-center justify-center shadow-warrior-glow">
              ⚔️
            </div>
            <span className="text-xl font-bold text-red-500 tracking-wider">MINDMATE</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-gray-300 font-mono">
            <a href="#arsenal" className="hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500">ARSENAL</a>
            <a href="#mission" className="hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500">MISSION</a>
            <a href="#brotherhood" className="hover:text-red-500 transition-colors border-b border-transparent hover:border-red-500">BROTHERHOOD</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Command Center */}
      <section className="relative px-6 py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 text-red-500 font-mono text-sm tracking-wider">
            [ OPERATION: MENTAL WARFARE ]
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono leading-tight">
            <span className="text-red-500">MENTAL</span>
            <br />
            <span className="text-white">STRENGTH</span>
            <br />
            <span className="text-red-500">TACTICAL</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-mono">
            Elite mental warfare platform designed for warriors. 
            Build discipline, track missions, forge unbreakable mental armor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleGoogleDeploy}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-4 text-lg rounded-none border-2 border-red-500 transition-all font-mono min-w-[200px] shadow-warrior-glow hover:shadow-red-500/50"
            >
              <span>{isLoading ? '[DEPLOYING...]' : '[ DEPLOY ]'}</span>
              <span className="ml-2">▶</span>
            </button>
            
            <button 
              onClick={handleStealthDeploy}
              disabled={isLoading}
              className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white px-8 py-4 text-lg rounded-none border-2 border-gray-600 transition-all font-mono min-w-[200px]"
            >
              <span>🛡️</span>
              <span className="ml-2">[ STEALTH MODE ]</span>
            </button>

            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-black border-2 border-red-600 hover:bg-red-900/20 text-red-500 px-8 py-4 text-lg rounded-none transition-all font-mono min-w-[200px] shadow-warrior-glow"
            >
              <span>⚡</span>
              <span className="ml-2">[ COMMAND CENTER ]</span>
            </button>
          </div>

          <div className="text-sm text-gray-500 mt-6 font-mono tracking-wider">
            [ CLASSIFIED ] • [ NO COMPROMISE ] • [ WARRIOR CODE ]
          </div>
        </div>
      </section>

      {/* Tactical Arsenal Section */}
      <section id="arsenal" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-red-500 font-mono text-sm tracking-wider mb-4">
              [ TACTICAL ARSENAL ]
            </div>
            <h2 className="text-4xl font-bold mb-4 text-white font-mono">WARRIOR'S TOOLKIT</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
              Combat-tested mental warfare systems for the modern warrior
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tacticalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-black border-2 border-red-600/30 rounded-none shadow-lg p-6 hover:border-red-500 hover:shadow-warrior-glow transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3 text-red-500">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-white font-mono">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-4 font-mono text-sm">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.weapons.map((weapon, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-400 font-mono">
                      <span className="text-red-500 mr-2">▶</span>
                      {weapon}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Battle Statistics Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-red-500 font-mono text-sm tracking-wider mb-4">
            [ MISSION INTEL ]
          </div>
          <h2 className="text-3xl font-bold mb-12 text-white font-mono">BATTLEFIELD ANALYSIS</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {combatStats.map((stat, index) => (
              <div key={stat.label} className="text-center border-2 border-red-600/30 bg-gray-900/50 p-6 rounded-none">
                <div className="text-4xl font-bold text-red-500 mb-2 font-mono">{stat.value}</div>
                <div className="text-xl font-semibold mb-2 text-white font-mono">{stat.label}</div>
                <div className="text-gray-400 text-sm font-mono">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t-2 border-red-600/30 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-6 w-6 bg-red-600 rounded-none border border-red-500 flex items-center justify-center text-sm">
              ⚔️
            </div>
            <span className="text-lg font-bold text-red-500 font-mono">MINDMATE</span>
          </div>
          <p className="text-gray-400 mb-6 font-mono">
            Elite mental warfare platform for modern warriors. Classified. Tactical. Uncompromising.
          </p>
          <div className="text-sm text-gray-500 font-mono">
            © 2024 MINDMATE TACTICAL. WARRIOR CODE ENFORCED.
          </div>
        </div>
      </footer>
    </div>
  );
}

const tacticalFeatures = [
  {
    icon: '⚔️',
    title: 'DISCIPLINE MATRIX',
    description: 'Combat-ready habit tracking system for building unbreakable discipline',
    weapons: [
      'Mission streak tracking',
      'Victory/defeat analysis',
      'Tactical pattern recognition'
    ]
  },
  {
    icon: '📝',
    title: 'WAR LOG',
    description: 'Strategic battlefield journal for processing combat experiences',
    weapons: [
      'Classified entry system',
      'Mission debrief protocols',
      'Intel pattern analysis'
    ]
  },
  {
    icon: '🎯',
    title: 'TARGET ACQUISITION',
    description: 'Precision goal tracking and mission objective management',
    weapons: [
      'Strategic objective setting',
      'Progress surveillance',
      'Victory condition tracking'
    ]
  },
  {
    icon: '🛡️',
    title: 'BROTHERHOOD',
    description: 'Secure warrior network for tactical support and intel sharing',
    weapons: [
      'Encrypted communications',
      'Peer mission support',
      'Combat experience exchange'
    ]
  },
  {
    icon: '📊',
    title: 'INTEL DASHBOARD',
    description: 'Advanced tactical analytics for mission performance optimization',
    weapons: [
      'Performance metrics',
      'Threat assessment reports',
      'Victory probability analysis'
    ]
  },
  {
    icon: '�',
    title: 'STRENGTH PROTOCOLS',
    description: 'Mental fortification systems for building warrior resilience',
    weapons: [
      'Stress resistance training',
      'Mental armor enhancement',
      'Tactical mindset development'
    ]
  }
];

const combatStats = [
  {
    value: '75%',
    label: 'OF WARRIORS',
    description: 'engage in stealth mode due to tactical security requirements'
  },
  {
    value: '3X',
    label: 'CASUALTY RATE',
    description: 'among warriors aged 20-30 in mental warfare operations'
  },
  {
    value: '1 IN 8',
    label: 'SOLDIERS',
    description: 'experience combat stress but maintain operational security'
  }
];