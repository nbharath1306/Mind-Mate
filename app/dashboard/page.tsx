'use client';

import React, { useState } from 'react';
import { useAuth } from '../../components/providers/AuthProvider';
import { DisciplineMatrix } from '../../components/modules/DisciplineMatrix';
import { WarLog } from '../../components/modules/WarLog';
import { DailyStrength } from '../../components/modules/DailyStrength';
import { IntelDashboard } from '../../components/modules/IntelDashboard';
import { DailyGratitude } from '../../components/modules/DailyGratitude';
import { KnowledgeArsenal } from '../../components/modules/KnowledgeArsenal';
import FocusHelp from '../../components/modules/FocusHelp';
import LearningsTracker from '../../components/modules/LearningsTracker';
import AIRecommendations from '../../components/modules/AIRecommendations';
import TacticalMinimalism from '../../components/modules/TacticalMinimalism';

export default function Dashboard() {
  const { warrior, extract } = useAuth();
  const [currentView, setCurrentView] = useState('command');

  // Create demo warrior if not authenticated
  const displayWarrior = warrior || {
    id: 'demo-warrior',
    callsign: 'Demo-Alpha-001',
    isAnonymous: false,
    rank: 'SOLDIER' as const,
    deployedAt: new Date(),
    lastSeen: new Date()
  };

  const callSign = displayWarrior.callsign || 'ALPHA-7';

  const navigationItems = [
    { id: 'command', label: 'COMMAND CENTER', icon: '▣', desc: 'Mission Control' },
    { id: 'strength', label: 'DAILY STRENGTH', icon: '⚔', desc: 'Mental Fortification' },
    { id: 'gratitude', label: 'GRATITUDE PROTOCOL', icon: '🙏', desc: 'Mental Armor Building' },
    { id: 'discipline', label: 'DISCIPLINE MATRIX', icon: '◈', desc: 'Habit Formation' },
    { id: 'intel', label: 'BATTLE INTEL', icon: '▲', desc: 'Growth Analytics' },
    { id: 'warlog', label: 'WAR LOG', icon: '■', desc: 'Strategic Journal' },
    { id: 'arsenal', label: 'KNOWLEDGE ARSENAL', icon: '▼', desc: 'Tactical Reading' },
    { id: 'learnings', label: 'TACTICAL INTEL', icon: '🎯', desc: 'Learning Tracker' },
    { id: 'ai-rec', label: 'AI COMMAND', icon: '🤖', desc: 'AI Recommendations' },
    { id: 'brotherhood', label: 'BROTHERHOOD', icon: '◆', desc: 'Elite Network' },
    { id: 'focus', label: 'DEEP WORK', icon: '●', desc: 'Combat Focus' },
    { id: 'simplify', label: 'TACTICAL MINIMAL', icon: '◾', desc: 'Clarity Operations' }
  ];

  const renderCommandCenter = () => (
    <div className="space-y-8">
      {/* Command Header */}
      <div className="bg-black border border-red-600 rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-red-500 tracking-wider">WARRIOR STATUS</h1>
            <p className="text-red-300 font-mono">CALLSIGN: {callSign}</p>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-mono text-lg">OPERATIONAL</div>
            <div className="text-gray-400 font-mono text-sm">DAY 127 OF TRANSFORMATION</div>
          </div>
        </div>
      </div>

      {/* Daily Intel */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border-l-4 border-orange-600 p-6">
          <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center">
            <span className="mr-3 text-xl">⚔</span>
            DAILY BATTLE WISDOM
          </h3>
          <blockquote className="text-gray-200 italic border-l-2 border-gray-700 pl-4 mb-3">
            "The cave you fear to enter holds the treasure you seek. Every warrior knows that strength comes from facing what others run from."
          </blockquote>
          <p className="text-orange-300 font-mono text-sm">— COMBAT PSYCHOLOGY</p>
        </div>

        <div className="bg-gray-900 border-l-4 border-blue-600 p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
            <span className="mr-3 text-xl">■</span>
            TACTICAL INTELLIGENCE
          </h3>
          <p className="text-gray-200 mb-3">
            <strong className="text-blue-400">MISSION FACT:</strong> Physical training increases mental resilience by 60%. 
            20 minutes of intense exercise triggers neurochemical warfare against depression and anxiety.
          </p>
          <p className="text-blue-300 font-mono text-sm">SOURCE: COMBAT NEUROSCIENCE</p>
        </div>
      </div>

      {/* Combat Stats */}
      <div className="bg-black border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-6 tracking-wider">MISSION METRICS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center border border-green-600 bg-gray-900 p-4">
            <div className="text-3xl font-bold text-green-400 font-mono">89%</div>
            <div className="text-green-300 text-sm font-mono">DISCIPLINE RATE</div>
            <div className="text-xs text-gray-500 mt-1">ELITE STATUS</div>
          </div>
          <div className="text-center border border-red-600 bg-gray-900 p-4">
            <div className="text-3xl font-bold text-red-400 font-mono">23</div>
            <div className="text-red-300 text-sm font-mono">COMBAT STREAK</div>
            <div className="text-xs text-gray-500 mt-1">DAYS ACTIVE</div>
          </div>
          <div className="text-center border border-yellow-600 bg-gray-900 p-4">
            <div className="text-3xl font-bold text-yellow-400 font-mono">156</div>
            <div className="text-yellow-300 text-sm font-mono">INTEL LOGS</div>
            <div className="text-xs text-gray-500 mt-1">ENTRIES LOGGED</div>
          </div>
          <div className="text-center border border-blue-600 bg-gray-900 p-4">
            <div className="text-3xl font-bold text-blue-400 font-mono">4.7H</div>
            <div className="text-blue-300 text-sm font-mono">DEEP WORK</div>
            <div className="text-xs text-gray-500 mt-1">FOCUS HOURS</div>
          </div>
        </div>
      </div>

      {/* Active Missions */}
      <div className="bg-gray-900 border border-gray-700 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3 text-red-500">◈</span>
          ACTIVE MISSIONS
        </h3>
        <div className="space-y-4">
          {[
            { mission: 'DAWN PHYSICAL TRAINING', status: 'COMPLETED', streak: 23, threat: 'LOW' },
            { mission: 'TACTICAL READING [20 PAGES]', status: 'IN PROGRESS', streak: 15, threat: 'MEDIUM' },
            { mission: 'MENTAL FORTIFICATION [MEDITATION]', status: 'COMPLETED', streak: 8, threat: 'LOW' },
            { mission: 'DIGITAL DETOX PROTOCOL', status: 'FAILED', streak: 0, threat: 'HIGH' },
            { mission: 'KNOWLEDGE ACQUISITION [JOURNALING]', status: 'COMPLETED', streak: 31, threat: 'LOW' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-black border border-gray-600 p-4">
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-sm ${
                  item.status === 'COMPLETED' ? 'bg-green-500' : 
                  item.status === 'IN PROGRESS' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <div className="font-mono text-white">{item.mission}</div>
                  <div className="text-xs text-gray-400">STATUS: {item.status}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-orange-400">⚡ {item.streak} DAYS</div>
                <div className={`text-xs font-mono ${
                  item.threat === 'LOW' ? 'text-green-400' : 
                  item.threat === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  THREAT: {item.threat}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrentView('discipline')}
          className="mt-6 bg-red-700 hover:bg-red-600 text-white font-mono px-6 py-3 transition-colors border border-red-500"
        >
          ▶ ACCESS FULL DISCIPLINE MATRIX
        </button>
      </div>

      {/* Brotherhood Intel */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-purple-600 p-6">
          <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center">
            <span className="mr-3">◆</span>
            BROTHERHOOD STATUS
          </h3>
          <div className="space-y-2 text-gray-300 font-mono">
            <div className="flex justify-between">
              <span>WARRIORS ONLINE:</span>
              <span className="text-green-400">247</span>
            </div>
            <div className="flex justify-between">
              <span>MISSIONS SHARED:</span>
              <span className="text-blue-400">18</span>
            </div>
            <div className="flex justify-between">
              <span>SUPPORT DEPLOYED:</span>
              <span className="text-yellow-400">34</span>
            </div>
          </div>
          <button 
            onClick={() => setCurrentView('brotherhood')}
            className="mt-4 bg-purple-700 hover:bg-purple-600 text-white font-mono px-4 py-2 text-sm transition-colors"
          >
            ▶ ENTER BROTHERHOOD
          </button>
        </div>

        <div className="bg-gray-900 border border-green-600 p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center">
            <span className="mr-3">▼</span>
            CURRENT INTEL SOURCE
          </h3>
          <div className="space-y-2 text-gray-300">
            <div className="font-mono">"CAN'T HURT ME" - GOGGINS</div>
            <div className="text-sm text-green-300">PROGRESS: 73% COMPLETE</div>
            <div className="text-sm text-gray-400">CATEGORY: MENTAL WARFARE</div>
            <div className="text-sm text-gray-400">THREAT LEVEL: EXTREME GROWTH</div>
          </div>
          <button 
            onClick={() => setCurrentView('arsenal')}
            className="mt-4 bg-green-700 hover:bg-green-600 text-white font-mono px-4 py-2 text-sm transition-colors"
          >
            ▶ ACCESS ARSENAL
          </button>
        </div>
      </div>
    </div>
  );

  const renderComingSoon = (title: string, description: string) => (
    <div className="bg-black border border-red-600 p-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4 tracking-wider">{title}</h2>
        <div className="text-6xl mb-6 text-gray-600">◈</div>
        <div className="bg-gray-900 border border-gray-700 p-6 max-w-2xl mx-auto">
          <p className="text-gray-300 mb-6 font-mono">{description}</p>
          <div className="text-left space-y-2 text-sm">
            <div className="flex items-center text-green-400">
              <span className="mr-2">▣</span>
              ADVANCED TACTICAL ANALYSIS
            </div>
            <div className="flex items-center text-blue-400">
              <span className="mr-2">▣</span>
              AI-POWERED COMBAT INTELLIGENCE
            </div>
            <div className="flex items-center text-yellow-400">
              <span className="mr-2">▣</span>
              REAL-TIME MISSION TRACKING
            </div>
            <div className="flex items-center text-purple-400">
              <span className="mr-2">▣</span>
              BROTHERHOOD INTEGRATION
            </div>
            <div className="flex items-center text-red-400">
              <span className="mr-2">▣</span>
              ELITE PERFORMANCE METRICS
            </div>
          </div>
        </div>
        <div className="mt-6 text-red-400 font-mono text-sm">
          STATUS: UNDER DEVELOPMENT BY SPECIAL FORCES
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Command Header */}
      <header className="bg-black border-b border-red-600 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center font-bold text-black">
              ⚔
            </div>
            <span className="text-2xl font-bold text-red-500 tracking-wider">MINDMATE</span>
            <span className="text-gray-400 font-mono text-sm">v2.0 TACTICAL</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-green-400 font-mono text-sm">OPERATOR: {callSign}</div>
              <div className="text-gray-400 font-mono text-xs">CLEARANCE: ALPHA</div>
            </div>
            <button
              onClick={warrior ? extract : () => window.location.href = '/'}
              className="bg-red-600/20 border border-red-600 text-red-500 px-4 py-2 text-sm rounded-none hover:bg-red-600/30 transition-all font-mono"
            >
              {warrior ? '◀ EXTRACT' : '◀ RETURN TO BASE'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Tactical Navigation */}
        <aside className="w-80 flex-shrink-0">
          <nav className="bg-black border border-gray-700 p-6">
            <h3 className="text-red-500 font-bold mb-4 tracking-wider">MISSION MODULES</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full text-left p-4 transition-colors border font-mono ${
                      currentView === item.id
                        ? 'bg-red-700 border-red-500 text-white'
                        : 'bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <div>
                          <div className="font-bold">{item.label}</div>
                          <div className="text-xs text-gray-400">{item.desc}</div>
                        </div>
                      </div>
                      <span className="text-red-500">▶</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Operations Area */}
        <main className="flex-1">
          {currentView === 'command' && renderCommandCenter()}
          {currentView === 'strength' && <DailyStrength />}
          {currentView === 'gratitude' && <DailyGratitude />}
          {currentView === 'discipline' && <DisciplineMatrix />}
          {currentView === 'intel' && <IntelDashboard />}
          {currentView === 'warlog' && <WarLog />}
          {currentView === 'arsenal' && <KnowledgeArsenal />}
          {currentView === 'learnings' && <LearningsTracker />}
          {currentView === 'ai-rec' && <AIRecommendations />}
          {currentView === 'brotherhood' && renderComingSoon(
            'BROTHERHOOD NETWORK',
            'MISSION: Secure communication platform for elite warriors to share intelligence, provide tactical support, and execute group missions.'
          )}
          {currentView === 'focus' && <FocusHelp />}
          {currentView === 'simplify' && <TacticalMinimalism />}
        </main>
      </div>
    </div>
  );
}