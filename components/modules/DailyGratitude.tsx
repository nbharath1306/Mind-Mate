'use client';

import React, { useState, useEffect } from 'react';

interface GratitudeEntry {
  id: string;
  content: string;
  category: 'PERSONAL' | 'PEOPLE' | 'ACHIEVEMENTS' | 'EXPERIENCES' | 'GROWTH';
  timestamp: Date;
}

interface GratitudeStreak {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  lastEntryDate?: string;
}

export function DailyGratitude() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [todaysEntries, setTodaysEntries] = useState<GratitudeEntry[]>([]);
  const [streak, setStreak] = useState<GratitudeStreak>({ currentStreak: 0, longestStreak: 0, totalEntries: 0 });
  const [newGratitude, setNewGratitude] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GratitudeEntry['category']>('PERSONAL');
  const [viewMode, setViewMode] = useState<'today' | 'history' | 'insights'>('today');

  // Gratitude prompts for when users need inspiration
  const gratitudePrompts = [
    "What made you smile today, even for just a moment?",
    "Who in your life are you most grateful for right now?",
    "What challenge taught you something valuable recently?",
    "What simple pleasure brought you joy today?",
    "What strength or skill do you appreciate about yourself?",
    "What opportunity are you grateful to have?",
    "What moment of peace or calm did you experience?",
    "What progress, no matter how small, are you proud of?",
    "What act of kindness did you witness or receive?",
    "What aspect of your health are you thankful for?"
  ];

  const [currentPrompt, setCurrentPrompt] = useState('');

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('gratitude-entries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      const entriesWithDates = parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setEntries(entriesWithDates);
      
      // Filter today's entries
      const today = new Date().toISOString().split('T')[0];
      const todayEntries = entriesWithDates.filter((entry: GratitudeEntry) => 
        entry.timestamp.toISOString().split('T')[0] === today
      );
      setTodaysEntries(todayEntries);
    }

    // Set daily prompt
    const promptIndex = new Date().getDay(); // 0-6 for days of week
    setCurrentPrompt(gratitudePrompts[promptIndex]);
  }, []);

  // Calculate streak whenever entries change
  useEffect(() => {
    calculateStreak();
    localStorage.setItem('gratitude-entries', JSON.stringify(entries));
  }, [entries]);

  const calculateStreak = () => {
    if (entries.length === 0) {
      setStreak({ currentStreak: 0, longestStreak: 0, totalEntries: 0 });
      return;
    }

    // Group entries by date
    const entriesByDate = entries.reduce((groups: { [key: string]: GratitudeEntry[] }, entry) => {
      const date = entry.timestamp.toISOString().split('T')[0];
      if (!groups[date]) groups[date] = [];
      groups[date].push(entry);
      return groups;
    }, {});

    const dates = Object.keys(entriesByDate).sort().reverse();
    
    let currentStreak = 0;
    let longestStreak = 0;
    let currentRun = 0;

    const today = new Date();
    let checkDate = new Date(today);

    // Check current streak
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      if (entriesByDate[dateStr] && entriesByDate[dateStr].length > 0) {
        currentStreak++;
      } else if (currentStreak > 0) {
        break; // Streak broken
      }
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Calculate longest streak
    for (let i = 0; i < dates.length; i++) {
      currentRun = 1;
      const currentDate = new Date(dates[i]);
      
      for (let j = i + 1; j < dates.length; j++) {
        const nextDate = new Date(dates[j]);
        const dayDiff = (currentDate.getTime() - nextDate.getTime()) / (1000 * 60 * 60 * 24);
        
        if (dayDiff === currentRun) {
          currentRun++;
        } else {
          break;
        }
      }
      
      longestStreak = Math.max(longestStreak, currentRun);
    }

    setStreak({
      currentStreak,
      longestStreak,
      totalEntries: entries.length,
      lastEntryDate: dates[0]
    });
  };

  const addGratitudeEntry = () => {
    if (!newGratitude.trim()) return;

    const entry: GratitudeEntry = {
      id: `gratitude-${Date.now()}`,
      content: newGratitude.trim(),
      category: selectedCategory,
      timestamp: new Date()
    };

    setEntries(prev => [entry, ...prev]);
    
    // Update today's entries
    const today = new Date().toISOString().split('T')[0];
    if (entry.timestamp.toISOString().split('T')[0] === today) {
      setTodaysEntries(prev => [entry, ...prev]);
    }

    setNewGratitude('');
  };

  const deleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
    setTodaysEntries(prev => prev.filter(entry => entry.id !== entryId));
  };

  const getCategoryIcon = (category: GratitudeEntry['category']) => {
    switch (category) {
      case 'PERSONAL': return '💪';
      case 'PEOPLE': return '👥';
      case 'ACHIEVEMENTS': return '🏆';
      case 'EXPERIENCES': return '✨';
      case 'GROWTH': return '🌱';
      default: return '🙏';
    }
  };

  const getCategoryColor = (category: GratitudeEntry['category']) => {
    switch (category) {
      case 'PERSONAL': return 'border-blue-500 text-blue-400';
      case 'PEOPLE': return 'border-green-500 text-green-400';
      case 'ACHIEVEMENTS': return 'border-yellow-500 text-yellow-400';
      case 'EXPERIENCES': return 'border-purple-500 text-purple-400';
      case 'GROWTH': return 'border-red-500 text-red-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const getInsights = () => {
    if (entries.length === 0) return null;

    const last30Days = entries.filter(entry => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return entry.timestamp >= thirtyDaysAgo;
    });

    const categoryCount = last30Days.reduce((count: { [key: string]: number }, entry) => {
      count[entry.category] = (count[entry.category] || 0) + 1;
      return count;
    }, {});

    const mostCommonCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    );

    const averagePerDay = last30Days.length / 30;

    return {
      last30Days: last30Days.length,
      averagePerDay: averagePerDay,
      mostCommonCategory,
      categoryDistribution: categoryCount
    };
  };

  const insights = getInsights();

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-2 border-red-600/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">[ DAILY GRATITUDE PROTOCOL ]</h1>
            <div className="text-gray-400">Mental Armor Building • {new Date().toLocaleDateString()}</div>
          </div>
          <div className="flex space-x-2">
            {['today', 'history', 'insights'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-4 py-2 rounded-none border transition-all font-mono ${
                  viewMode === mode 
                    ? 'bg-red-600 border-red-500 text-white' 
                    : 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400'
                }`}
              >
                {mode.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Streak Display */}
      <div className="p-6 border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border border-green-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-green-400">{streak.currentStreak}</div>
            <div className="text-sm text-gray-400">CURRENT STREAK</div>
          </div>
          <div className="bg-gray-900 border border-blue-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-blue-400">{streak.longestStreak}</div>
            <div className="text-sm text-gray-400">LONGEST STREAK</div>
          </div>
          <div className="bg-gray-900 border border-yellow-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-yellow-400">{streak.totalEntries}</div>
            <div className="text-sm text-gray-400">TOTAL GRATITUDE</div>
          </div>
          <div className="bg-gray-900 border border-purple-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-purple-400">{todaysEntries.length}</div>
            <div className="text-sm text-gray-400">TODAY'S COUNT</div>
          </div>
        </div>
      </div>

      {/* Today View */}
      {viewMode === 'today' && (
        <div className="p-6 space-y-6">
          {/* Daily Prompt */}
          <div className="bg-yellow-900/20 border border-yellow-600 p-6 rounded-none">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">[ TODAY'S REFLECTION PROMPT ]</h3>
            <p className="text-yellow-300 text-lg mb-4">"{currentPrompt}"</p>
            <button
              onClick={() => setCurrentPrompt(gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)])}
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded-none border border-yellow-500 transition-all font-mono text-sm"
            >
              🎯 NEW PROMPT
            </button>
          </div>

          {/* Add New Gratitude */}
          <div className="bg-gray-900 border border-red-600/30 rounded-none p-6">
            <h3 className="text-lg font-bold text-white mb-4">[ ADD GRATITUDE ENTRY ]</h3>
            <div className="space-y-4">
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as GratitudeEntry['category'])}
                  className="w-full md:w-auto bg-black border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono mb-4"
                >
                  <option value="PERSONAL">💪 PERSONAL STRENGTH</option>
                  <option value="PEOPLE">👥 PEOPLE & RELATIONSHIPS</option>
                  <option value="ACHIEVEMENTS">🏆 ACHIEVEMENTS & VICTORIES</option>
                  <option value="EXPERIENCES">✨ EXPERIENCES & MOMENTS</option>
                  <option value="GROWTH">🌱 GROWTH & LEARNING</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newGratitude}
                  onChange={(e) => setNewGratitude(e.target.value)}
                  placeholder="I'm grateful for..."
                  className="flex-1 bg-black border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
                  onKeyPress={(e) => e.key === 'Enter' && addGratitudeEntry()}
                />
                <button
                  onClick={addGratitudeEntry}
                  disabled={!newGratitude.trim()}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-none border border-red-500 transition-all font-mono"
                >
                  DEPLOY
                </button>
              </div>
            </div>
          </div>

          {/* Today's Entries */}
          <div className="bg-gray-900 border border-green-600/30 rounded-none p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">[ TODAY'S GRATITUDE ({todaysEntries.length}) ]</h3>
            {todaysEntries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-4">🙏</div>
                <div>No gratitude entries today</div>
                <div className="text-sm">Start building your mental armor</div>
              </div>
            ) : (
              <div className="space-y-3">
                {todaysEntries.map((entry, index) => (
                  <div key={entry.id} className="bg-black border border-gray-600 p-4 rounded-none">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span>{getCategoryIcon(entry.category)}</span>
                          <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(entry.category)}`}>
                            {entry.category}
                          </span>
                          <span className="text-gray-500 text-xs">#{index + 1}</span>
                        </div>
                        <p className="text-gray-100 leading-relaxed">{entry.content}</p>
                        <div className="text-xs text-gray-500 mt-2">
                          {entry.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors ml-4"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* History View */}
      {viewMode === 'history' && (
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">[ GRATITUDE HISTORY ]</h3>
          {entries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📜</div>
              <div className="text-xl mb-2">No history yet</div>
              <div>Start your gratitude journey today</div>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.slice(0, 50).map((entry) => (
                <div key={entry.id} className="bg-gray-900 border border-gray-600 p-4 rounded-none">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span>{getCategoryIcon(entry.category)}</span>
                        <span className={`text-xs px-2 py-1 border rounded-none ${getCategoryColor(entry.category)}`}>
                          {entry.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {entry.timestamp.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-100 leading-relaxed">{entry.content}</p>
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors ml-4"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Insights View */}
      {viewMode === 'insights' && insights && (
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-6">[ GRATITUDE INTELLIGENCE ]</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-blue-600/30 rounded-none p-6">
              <h4 className="text-lg font-bold text-blue-400 mb-4">Performance Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Last 30 Days:</span>
                  <span className="text-white font-bold">{insights.last30Days} entries</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Daily Average:</span>
                  <span className="text-white font-bold">{insights.averagePerDay.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Most Common:</span>
                  <span className="text-white font-bold">
                    {getCategoryIcon(insights.mostCommonCategory as GratitudeEntry['category'])} {insights.mostCommonCategory}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-green-600/30 rounded-none p-6">
              <h4 className="text-lg font-bold text-green-400 mb-4">Category Distribution</h4>
              <div className="space-y-3">
                {Object.entries(insights.categoryDistribution).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getCategoryIcon(category as GratitudeEntry['category'])}</span>
                      <span className="text-gray-300 text-sm">{category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-700 rounded-none h-2 overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${(count / insights.last30Days) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-white text-sm min-w-[20px]">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-900/20 border border-yellow-600 rounded-none p-6 mt-8">
            <h4 className="text-lg font-bold text-yellow-400 mb-4">[ TACTICAL RECOMMENDATIONS ]</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {streak.currentStreak < 7 && (
                <div className="text-orange-300">
                  🟠 <strong>Consistency Protocol:</strong> Focus on building a 7-day gratitude streak to establish neural pathways.
                </div>
              )}
              {insights.averagePerDay < 1 && (
                <div className="text-red-300">
                  🔴 <strong>Frequency Alert:</strong> Aim for at least 1 gratitude entry per day for optimal mental armor building.
                </div>
              )}
              {streak.currentStreak >= 7 && (
                <div className="text-green-300">
                  🟢 <strong>Elite Status:</strong> Excellent gratitude discipline. This consistency is rewiring your brain for positivity.
                </div>
              )}
              {Object.keys(insights.categoryDistribution).length < 3 && (
                <div className="text-yellow-300">
                  🟡 <strong>Diversity Training:</strong> Try exploring gratitude in different life categories for broader perspective.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}