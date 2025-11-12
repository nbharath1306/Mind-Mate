'use client';

import React, { useState } from 'react';
import { useAuth } from '../../components/providers/AuthProvider';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState('command');

  // Create demo user if not authenticated
  const displayUser = user || {
    displayName: 'OPERATOR',
    callSign: 'ALPHA-7',
  };

  const callSign = 'callSign' in displayUser ? displayUser.callSign : 'ALPHA-7';

  const navigationItems = [
    { id: 'command', label: 'COMMAND CENTER', icon: '▣', desc: 'Mission Control' },
    { id: 'strength', label: 'DAILY STRENGTH', icon: '⚔', desc: 'Mental Fortification' },
    { id: 'discipline', label: 'DISCIPLINE MATRIX', icon: '◈', desc: 'Habit Formation' },
    { id: 'intel', label: 'BATTLE INTEL', icon: '▲', desc: 'Growth Analytics' },
    { id: 'warlog', label: 'WAR LOG', icon: '■', desc: 'Strategic Journal' },
    { id: 'arsenal', label: 'KNOWLEDGE ARSENAL', icon: '▼', desc: 'Tactical Reading' },
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
              <div className="text-green-400 font-mono text-sm">OPERATOR: {displayUser.displayName}</div>
              <div className="text-gray-400 font-mono text-xs">CLEARANCE: ALPHA</div>
            </div>
            <button
              onClick={user ? logout : () => window.location.href = '/'}
              className="bg-red-700 hover:bg-red-600 text-white font-mono px-4 py-2 border border-red-500 transition-colors"
            >
              {user ? '◀ SIGN OUT' : '◀ RETURN TO BASE'}
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
          {currentView === 'strength' && renderComingSoon(
            'DAILY STRENGTH MODULE',
            'MISSION: Deploy daily psychological warfare tactics through strategic quotes, mental health intelligence, and warrior mindset reinforcement protocols.'
          )}
          {currentView === 'discipline' && renderComingSoon(
            'DISCIPLINE MATRIX',
            'MISSION: Advanced habit formation system with military-grade consistency tracking, streak analysis, and behavioral modification protocols.'
          )}
          {currentView === 'intel' && renderComingSoon(
            'BATTLE INTELLIGENCE',
            'MISSION: Real-time analytics dashboard showing personal growth metrics, performance trends, and strategic insights for continuous improvement.'
          )}
          {currentView === 'warlog' && renderComingSoon(
            'WARRIOR LOG SYSTEM',
            'MISSION: AI-enhanced tactical journal with scenario-based recommendations, strategic thinking prompts, and psychological warfare intelligence.'
          )}
          {currentView === 'arsenal' && renderComingSoon(
            'KNOWLEDGE ARSENAL',
            'MISSION: Curated library of tactical reading materials focused on masculinity, mental toughness, leadership, and warrior philosophy.'
          )}
          {currentView === 'brotherhood' && renderComingSoon(
            'BROTHERHOOD NETWORK',
            'MISSION: Secure communication platform for elite warriors to share intelligence, provide tactical support, and execute group missions.'
          )}
          {currentView === 'focus' && renderComingSoon(
            'DEEP WORK PROTOCOLS',
            'MISSION: Combat-level focus enhancement through tactical environments, distraction elimination, and deep work session management.'
          )}
          {currentView === 'simplify' && renderComingSoon(
            'TACTICAL MINIMALISM',
            'MISSION: Strategic simplification protocols for mental clarity, operational efficiency, and elimination of non-essential elements.'
          )}
        </main>
      </div>
    </div>
  );
}

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Daily Quote & Fact */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">💫</span>
            Daily Inspiration
          </h3>
          <blockquote className="text-sm italic mb-2">"{dailyQuote.text}"</blockquote>
          <p className="text-blue-200 text-xs">— {dailyQuote.author}</p>
        </div>

        <div className="bg-gradient-to-br from-teal-900 to-teal-800 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">🧠</span>
            Mental Health Fact
          </h3>
          <p className="text-sm">{mentalHealthFact}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">85%</div>
          <div className="text-sm text-gray-400">Habit Success</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">12</div>
          <div className="text-sm text-gray-400">Day Streak</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">47</div>
          <div className="text-sm text-gray-400">Journal Entries</div>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-teal-400">3.2h</div>
          <div className="text-sm text-gray-400">Focus Time</div>
        </div>
      </div>

      {/* Today's Habits Quick View */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">🎯</span>
          Today's Habits
        </h3>
        <div className="space-y-3">
          {habits.slice(0, 3).map((habit) => (
            <div key={habit.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleHabitToggle(habit.id)}
                  className={`w-6 h-6 rounded-full border-2 ${
                    habit.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-400 hover:border-green-400'
                  }`}
                >
                  {habit.completed && <span className="text-white text-sm">✓</span>}
                </button>
                <span className="text-white">{habit.name}</span>
              </div>
              <div className="text-sm text-gray-400">
                🔥 {habit.streak} days
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setCurrentView('habits')}
          className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
        >
          View All Habits →
        </button>
      </div>
    </div>
  );

  const renderQuotes = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Daily Inspiration</h2>
        <blockquote className="text-xl italic text-gray-300 mb-4">
          "{dailyQuote.text}"
        </blockquote>
        <p className="text-gray-400">— {dailyQuote.author}</p>
        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
          Get New Quote
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Mental Health Facts</h3>
        <div className="bg-slate-700 rounded-lg p-4 mb-4">
          <p className="text-gray-300">{mentalHealthFact}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-700 rounded-lg p-4">
            <strong className="text-blue-400">💪 Physical Strength:</strong>
            <p className="text-gray-300 mt-2">Men who exercise regularly report 43% better stress management and improved emotional regulation.</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <strong className="text-green-400">🧠 Mental Resilience:</strong>
            <p className="text-gray-300 mt-2">Journaling for 15 minutes daily can reduce anxiety by up to 37% and improve decision-making clarity.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHabits = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Habit Tracker</h3>
        
        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add new habit..."
              className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
            />
            <button
              onClick={handleAddHabit}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              Add
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleHabitToggle(habit.id)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      habit.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-400 hover:border-green-400'
                    }`}
                  >
                    {habit.completed && <span className="text-white">✓</span>}
                  </button>
                  <div>
                    <h4 className="font-medium text-white">{habit.name}</h4>
                    <p className="text-sm text-gray-400">{habit.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-400">🔥 {habit.streak}</div>
                  <div className="text-sm text-gray-400">day streak</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBooks = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recommended Reading</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {bookRecommendations.map((book, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">{book.title}</h4>
              <p className="text-gray-300 text-sm mb-2">by {book.author}</p>
              <div className="flex items-center justify-between">
                <span className="bg-blue-600 text-xs px-2 py-1 rounded">{book.category}</span>
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm text-gray-400 ml-1">{book.rating}</span>
                </div>
              </div>
              <button className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm">
                Add to Reading List
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGratitude = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Daily Gratitude</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">What are you grateful for today?</label>
          <textarea
            value={gratitudeEntry}
            onChange={(e) => setGratitudeEntry(e.target.value)}
            className="w-full h-24 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="I'm grateful for..."
          />
        </div>
        <button
          onClick={() => {
            if (gratitudeEntry.trim()) {
              alert('Gratitude saved!');
              setGratitudeEntry('');
            }
          }}
          disabled={!gratitudeEntry.trim()}
          className="bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
        >
          Save Gratitude
        </button>

        <div className="mt-6">
          <h4 className="text-lg font-medium mb-3">Recent Gratitudes</h4>
          <div className="space-y-2">
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-gray-300 text-sm">Grateful for my health and the ability to work on myself daily.</p>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
            <div className="bg-slate-700 p-3 rounded-lg">
              <p className="text-gray-300 text-sm">Thankful for supportive friends who understand the journey.</p>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Demo user fallback
  if (!user) {
    const demoUser = {
      id: 'demo-user',
      displayName: 'Warrior',
      email: 'demo@mindmate.com',
      isAnonymous: false,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                🧠
              </div>
              <span className="text-xl font-bold gradient-text">MindMate</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {demoUser.displayName}</span>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-slate-800 rounded-lg p-4">
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                        currentView === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {currentView === 'overview' && renderOverview()}
            {currentView === 'quotes' && renderQuotes()}
            {currentView === 'habits' && renderHabits()}
            {currentView === 'books' && renderBooks()}
            {currentView === 'gratitude' && renderGratitude()}
            {currentView === 'journal' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">AI Journal & Recommendations - Coming Soon</h3></div>}
            {currentView === 'growth' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Growth Visualization - Coming Soon</h3></div>}
            {currentView === 'learning' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Learning & Implementation - Coming Soon</h3></div>}
            {currentView === 'focus' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Focus Zone - Coming Soon</h3></div>}
            {currentView === 'minimalism' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Minimalism Guide - Coming Soon</h3></div>}
            {currentView === 'community' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Brotherhood Community - Coming Soon</h3></div>}
          </main>
        </div>
      </div>
    );
  }

  // Authenticated user view (same layout)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              🧠
            </div>
            <span className="text-xl font-bold gradient-text">MindMate</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user.displayName || 'Warrior'}</span>
            <button
              onClick={logout}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <nav className="bg-slate-800 rounded-lg p-4">
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      currentView === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {currentView === 'overview' && renderOverview()}
          {currentView === 'quotes' && renderQuotes()}
          {currentView === 'habits' && renderHabits()}
          {currentView === 'books' && renderBooks()}
          {currentView === 'gratitude' && renderGratitude()}
          {currentView === 'journal' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">AI Journal & Recommendations - Coming Soon</h3></div>}
          {currentView === 'growth' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Growth Visualization - Coming Soon</h3></div>}
          {currentView === 'learning' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Learning & Implementation - Coming Soon</h3></div>}
          {currentView === 'focus' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Focus Zone - Coming Soon</h3></div>}
          {currentView === 'minimalism' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Minimalism Guide - Coming Soon</h3></div>}
          {currentView === 'community' && <div className="bg-slate-800 rounded-lg p-6"><h3 className="text-xl font-semibold">Brotherhood Community - Coming Soon</h3></div>}
        </main>
      </div>
    </div>
  );
}

  const renderMoodTracking = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 gradient-text">Mood Tracking</h3>
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">How are you feeling right now?</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setMoodToday(mood.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  moodToday === mood.value
                    ? `${mood.color} border-white`
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.label}</div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleMoodSubmit}
            disabled={!moodToday}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
          >
            Save Mood
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="text-lg font-medium mb-4">Weekly Mood Chart</h4>
        <div className="space-y-2">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
            <div key={day} className="flex items-center justify-between py-2">
              <span className="text-gray-300">{day}</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-4 h-4 rounded ${
                      level <= Math.floor(Math.random() * 5) + 1
                        ? 'bg-blue-500'
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderJournaling = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 gradient-text">Journal Entry</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">What's on your mind today?</label>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Write about your thoughts, feelings, or experiences..."
          />
        </div>
        <button
          onClick={handleJournalSave}
          disabled={!journalEntry.trim()}
          className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors"
        >
          Save Entry
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="text-lg font-medium mb-4">Reflection Prompts</h4>
        <div className="space-y-3">
          <div className="p-3 bg-slate-700 rounded-lg">
            <p className="text-sm text-gray-300">What made you feel strongest today?</p>
          </div>
          <div className="p-3 bg-slate-700 rounded-lg">
            <p className="text-sm text-gray-300">How did you handle stress or challenges?</p>
          </div>
          <div className="p-3 bg-slate-700 rounded-lg">
            <p className="text-sm text-gray-300">What would you tell a friend going through this?</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 gradient-text">Community Feed</h3>
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-blue-400">{post.author}</span>
                <span className="text-sm text-gray-400">{post.time}</span>
              </div>
              <p className="text-gray-300 mb-3">{post.content}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <button className="hover:text-red-400 transition-colors">
                  ❤️ {post.likes}
                </button>
                <button className="hover:text-blue-400 transition-colors">
                  💬 {post.comments}
                </button>
                <button className="hover:text-green-400 transition-colors">
                  🤝 Support
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="text-lg font-medium mb-4">Share Your Experience</h4>
        <textarea
          className="w-full h-24 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
          placeholder="Share something that might help other men..."
        />
        <button className="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
          Share Anonymously
        </button>
      </div>
    </div>
  );

  if (!user) {
    // Create a demo user for immediate access to features
    const demoUser = {
      id: 'demo-user',
      displayName: 'Demo User',
      email: 'demo@mindmate.com',
      isAnonymous: false,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                🧠
              </div>
              <span className="text-xl font-bold gradient-text">MindMate</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, {demoUser.displayName}
              </span>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-slate-800 rounded-lg p-4">
              <ul className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: '📊' },
                  { id: 'mood', label: 'Mood Tracking', icon: '❤️' },
                  { id: 'journal', label: 'Journaling', icon: '📝' },
                  { id: 'community', label: 'Community', icon: '👥' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCurrentView(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        currentView === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {currentView === 'overview' && renderOverview()}
            {currentView === 'mood' && renderMoodTracking()}
            {currentView === 'journal' && renderJournaling()}
            {currentView === 'community' && renderCommunity()}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
              🧠
            </div>
            <span className="text-xl font-bold gradient-text">MindMate</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Welcome, {user.displayName || 'Anonymous Warrior'}
            </span>
            <button
              onClick={logout}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <nav className="bg-slate-800 rounded-lg p-4">
            <ul className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'mood', label: 'Mood Tracking', icon: '❤️' },
                { id: 'journal', label: 'Journaling', icon: '📝' },
                { id: 'community', label: 'Community', icon: '👥' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentView === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {currentView === 'overview' && renderOverview()}
          {currentView === 'mood' && renderMoodTracking()}
          {currentView === 'journal' && renderJournaling()}
          {currentView === 'community' && renderCommunity()}
        </main>
      </div>
    </div>
  );
}