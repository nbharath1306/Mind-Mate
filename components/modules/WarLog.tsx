'use client';

import React, { useState, useEffect } from 'react';

interface LogEntry {
  id: string;
  title: string;
  content: string;
  prompt?: string;
  tags: string[];
  mood: 'CRITICAL' | 'DAMAGED' | 'OPERATIONAL' | 'STRONG' | 'VICTORIOUS';
  classified: boolean;
  timestamp: Date;
  lastModified: Date;
}

interface JournalPrompt {
  id: string;
  category: 'TACTICAL' | 'MENTAL' | 'MISSION' | 'BROTHERHOOD' | 'GROWTH';
  prompt: string;
  description: string;
}

export function WarLog() {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState<string>('ALL');
  const [currentPrompt, setCurrentPrompt] = useState<JournalPrompt | null>(null);

  const tacticalPrompts: JournalPrompt[] = [
    {
      id: 'tactical-1',
      category: 'TACTICAL',
      prompt: 'What battle did you face today and how did you overcome it?',
      description: 'Analyze challenges and tactical responses'
    },
    {
      id: 'tactical-2',
      category: 'TACTICAL',
      prompt: 'What strategies worked in your favor today?',
      description: 'Document successful tactics for future missions'
    },
    {
      id: 'mental-1',
      category: 'MENTAL',
      prompt: 'How did you strengthen your mental armor today?',
      description: 'Track psychological resilience building'
    },
    {
      id: 'mental-2',
      category: 'MENTAL',
      prompt: 'What thoughts tried to sabotage your mission and how did you counter them?',
      description: 'Combat negative thought patterns'
    },
    {
      id: 'mission-1',
      category: 'MISSION',
      prompt: 'What was your primary objective today and did you accomplish it?',
      description: 'Mission success analysis'
    },
    {
      id: 'mission-2',
      category: 'MISSION',
      prompt: 'How did you move closer to your ultimate warrior goals?',
      description: 'Long-term strategic progress'
    },
    {
      id: 'brotherhood-1',
      category: 'BROTHERHOOD',
      prompt: 'How did you support or connect with fellow warriors today?',
      description: 'Community and support network building'
    },
    {
      id: 'growth-1',
      category: 'GROWTH',
      prompt: 'What did you learn about yourself in battle today?',
      description: 'Self-awareness and personal development'
    },
    {
      id: 'growth-2',
      category: 'GROWTH',
      prompt: 'If today was a training mission, what would you do differently?',
      description: 'Continuous improvement analysis'
    }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('war-log-entries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setEntries(parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp),
        lastModified: new Date(entry.lastModified)
      })));
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('war-log-entries', JSON.stringify(entries));
  }, [entries]);

  const createNewEntry = (formData: any) => {
    const newEntry: LogEntry = {
      id: `entry-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      prompt: currentPrompt?.prompt,
      tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
      mood: formData.mood,
      classified: formData.classified,
      timestamp: new Date(),
      lastModified: new Date()
    };

    setEntries(prev => [newEntry, ...prev]);
    setShowNewEntry(false);
    setCurrentPrompt(null);
  };

  const updateEntry = (entryId: string, updates: Partial<LogEntry>) => {
    setEntries(prev => prev.map(entry => 
      entry.id === entryId 
        ? { ...entry, ...updates, lastModified: new Date() }
        : entry
    ));
  };

  const deleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
    setSelectedEntry(null);
  };

  const getMoodColor = (mood: LogEntry['mood']) => {
    switch (mood) {
      case 'CRITICAL': return 'text-red-500 bg-red-900/20 border-red-500';
      case 'DAMAGED': return 'text-orange-500 bg-orange-900/20 border-orange-500';
      case 'OPERATIONAL': return 'text-yellow-500 bg-yellow-900/20 border-yellow-500';
      case 'STRONG': return 'text-blue-500 bg-blue-900/20 border-blue-500';
      case 'VICTORIOUS': return 'text-green-500 bg-green-900/20 border-green-500';
      default: return 'text-gray-500 bg-gray-900/20 border-gray-500';
    }
  };

  const getMoodIcon = (mood: LogEntry['mood']) => {
    switch (mood) {
      case 'CRITICAL': return '🔴';
      case 'DAMAGED': return '🟠';
      case 'OPERATIONAL': return '🟡';
      case 'STRONG': return '🔵';
      case 'VICTORIOUS': return '🟢';
      default: return '⚫';
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesMood = filterMood === 'ALL' || entry.mood === filterMood;
    
    return matchesSearch && matchesMood;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    createNewEntry({
      title: formData.get('title'),
      content: formData.get('content'),
      tags: formData.get('tags'),
      mood: formData.get('mood'),
      classified: formData.get('classified') === 'true'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-2 border-red-600/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">[ WAR LOG SYSTEM ]</h1>
            <div className="text-gray-400">Classified Strategic Journal • {entries.length} Entries</div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentPrompt(tacticalPrompts[Math.floor(Math.random() * tacticalPrompts.length)])}
              className="bg-yellow-600 hover:bg-yellow-700 text-black px-4 py-2 rounded-none border border-yellow-500 transition-all font-mono"
            >
              🎯 TACTICAL PROMPT
            </button>
            <button
              onClick={() => setShowNewEntry(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-none border border-red-500 transition-all font-mono"
            >
              + NEW LOG ENTRY
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 SEARCH OPERATIONS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
            />
          </div>
          <select
            value={filterMood}
            onChange={(e) => setFilterMood(e.target.value)}
            className="bg-gray-900 border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="CRITICAL">🔴 CRITICAL</option>
            <option value="DAMAGED">🟠 DAMAGED</option>
            <option value="OPERATIONAL">🟡 OPERATIONAL</option>
            <option value="STRONG">🔵 STRONG</option>
            <option value="VICTORIOUS">🟢 VICTORIOUS</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 border-b border-gray-800">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['CRITICAL', 'DAMAGED', 'OPERATIONAL', 'STRONG', 'VICTORIOUS'].map(mood => {
            const count = entries.filter(e => e.mood === mood).length;
            return (
              <div key={mood} className={`p-3 border rounded-none text-center ${getMoodColor(mood as LogEntry['mood'])}`}>
                <div className="text-xl font-bold">{count}</div>
                <div className="text-xs">{mood}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex">
        {/* Entry List */}
        <div className="w-full md:w-1/2 border-r border-gray-800">
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-4">[ MISSION LOGS ]</h3>
            <div className="space-y-3">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`p-4 border rounded-none cursor-pointer transition-all ${
                    selectedEntry?.id === entry.id 
                      ? 'border-red-500 bg-red-900/20' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white font-bold text-sm truncate">{entry.title}</h4>
                    <div className="flex items-center space-x-2">
                      {entry.classified && <span className="text-red-500 text-xs">🔒</span>}
                      <span className={`text-xs px-2 py-1 border rounded-none ${getMoodColor(entry.mood)}`}>
                        {getMoodIcon(entry.mood)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2">{entry.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-none">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {entry.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
              
              {filteredEntries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <div>No mission logs found</div>
                  <div className="text-sm">Start your first tactical entry</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Entry Detail */}
        <div className="hidden md:block w-1/2">
          {selectedEntry ? (
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{selectedEntry.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>Created: {selectedEntry.timestamp.toLocaleString()}</span>
                    <span className={`px-2 py-1 border rounded-none ${getMoodColor(selectedEntry.mood)}`}>
                      {getMoodIcon(selectedEntry.mood)} {selectedEntry.mood}
                    </span>
                    {selectedEntry.classified && <span className="text-red-500">🔒 CLASSIFIED</span>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => deleteEntry(selectedEntry.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {selectedEntry.prompt && (
                <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-none mb-4">
                  <div className="text-yellow-400 text-sm font-bold mb-1">TACTICAL PROMPT:</div>
                  <div className="text-yellow-300 text-sm">{selectedEntry.prompt}</div>
                </div>
              )}

              <div className="bg-gray-900 border border-gray-600 p-4 rounded-none mb-4">
                <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                  {selectedEntry.content}
                </div>
              </div>

              {selectedEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedEntry.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-none text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-500">
                Last modified: {selectedEntry.lastModified.toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="p-6 flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">📋</div>
                <div>Select a mission log to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tactical Prompt Modal */}
      {currentPrompt && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-yellow-600 rounded-none p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">[ TACTICAL PROMPT: {currentPrompt.category} ]</h3>
            <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-none mb-6">
              <div className="text-yellow-300 text-lg mb-2">{currentPrompt.prompt}</div>
              <div className="text-yellow-500 text-sm">{currentPrompt.description}</div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowNewEntry(true);
                  // Don't clear currentPrompt yet - it will be used in the form
                }}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black py-3 rounded-none border border-yellow-500 transition-all font-mono"
              >
                ACCEPT MISSION
              </button>
              <button
                onClick={() => setCurrentPrompt(null)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-none border border-gray-600 transition-all font-mono"
              >
                ABORT PROMPT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Entry Modal */}
      {showNewEntry && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-red-600 rounded-none p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">[ NEW MISSION LOG ENTRY ]</h3>
            
            {currentPrompt && (
              <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-none mb-4">
                <div className="text-yellow-400 text-sm font-bold mb-1">RESPONDING TO PROMPT:</div>
                <div className="text-yellow-300 text-sm">{currentPrompt.prompt}</div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">MISSION TITLE</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full bg-black border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
                  placeholder="e.g., Day 127: Mental Warfare Victory"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">MISSION CONTENT</label>
                <textarea
                  name="content"
                  required
                  rows={8}
                  className="w-full bg-black border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono resize-none"
                  placeholder="Document your tactical operations, challenges faced, victories achieved, and strategic insights..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">MISSION STATUS</label>
                  <select
                    name="mood"
                    className="w-full bg-black border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
                  >
                    <option value="VICTORIOUS">🟢 VICTORIOUS</option>
                    <option value="STRONG">🔵 STRONG</option>
                    <option value="OPERATIONAL">🟡 OPERATIONAL</option>
                    <option value="DAMAGED">🟠 DAMAGED</option>
                    <option value="CRITICAL">🔴 CRITICAL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-1">CLASSIFICATION</label>
                  <select
                    name="classified"
                    className="w-full bg-black border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
                  >
                    <option value="false">📖 UNCLASSIFIED</option>
                    <option value="true">🔒 CLASSIFIED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-1">TAGS (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    className="w-full bg-black border border-gray-600 text-white p-3 rounded-none focus:border-red-500 outline-none font-mono"
                    placeholder="e.g., mental, victory, growth"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-none border border-red-500 transition-all font-mono"
                >
                  DEPLOY LOG ENTRY
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewEntry(false);
                    setCurrentPrompt(null);
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-none border border-gray-600 transition-all font-mono"
                >
                  ABORT MISSION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}