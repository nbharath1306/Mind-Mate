'use client';

import { useState, useEffect } from 'react';

interface FocusSession {
  id: string;
  type: 'music' | 'audiobook' | 'dnd';
  duration: number; // in minutes
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  title: string;
  description: string;
}

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  category: 'TACTICAL' | 'CLASSICAL' | 'AMBIENT' | 'BINAURAL';
  duration: number;
  description: string;
  url?: string; // For actual implementation
}

interface AudioBook {
  id: string;
  title: string;
  author: string;
  category: 'MINDSET' | 'STRATEGY' | 'PHILOSOPHY' | 'TACTICAL';
  duration: number; // in hours
  description: string;
  chapter?: string;
}

const MUSIC_ARSENAL: MusicTrack[] = [
  {
    id: '1',
    title: 'Deep Focus Alpha Waves',
    artist: 'Tactical Audio',
    category: 'BINAURAL',
    duration: 60,
    description: 'Alpha wave frequencies for enhanced concentration and mental clarity'
  },
  {
    id: '2', 
    title: 'Warrior Meditation',
    artist: 'Combat Zen',
    category: 'AMBIENT',
    duration: 45,
    description: 'Ambient sounds designed for tactical breathing and mental fortification'
  },
  {
    id: '3',
    title: 'Mission Focus Suite',
    artist: 'Elite Performance',
    category: 'CLASSICAL',
    duration: 90,
    description: 'Classical compositions proven to enhance cognitive performance'
  },
  {
    id: '4',
    title: 'Tactical Silence',
    artist: 'Mental Warfare',
    category: 'AMBIENT',
    duration: 30,
    description: 'Minimal audio for deep work and overthinking elimination'
  },
  {
    id: '5',
    title: 'Beta Wave Combat',
    artist: 'Neural Command',
    category: 'BINAURAL',
    duration: 120,
    description: 'Beta frequencies for heightened alertness and mental precision'
  }
];

const AUDIOBOOK_ARSENAL: AudioBook[] = [
  {
    id: '1',
    title: 'The Obstacle Is The Way',
    author: 'Ryan Holiday',
    category: 'PHILOSOPHY',
    duration: 6.5,
    description: 'Stoic principles for turning trials into triumphs'
  },
  {
    id: '2',
    title: 'Mindset: The Psychology of Success',
    author: 'Carol Dweck',
    category: 'MINDSET',
    duration: 8,
    description: 'Growth mindset strategies for overcoming mental barriers'
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'STRATEGY',
    duration: 9,
    description: 'Tactical habit formation for elite performance'
  },
  {
    id: '4',
    title: 'Letters from a Stoic',
    author: 'Seneca',
    category: 'PHILOSOPHY',
    duration: 12,
    description: 'Ancient wisdom for modern mental warfare'
  },
  {
    id: '5',
    title: 'The Warrior Ethos',
    author: 'Steven Pressfield',
    category: 'TACTICAL',
    duration: 4,
    description: 'Understanding the warrior mindset and professional dedication'
  }
];

export default function FocusHelp() {
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [isDndMode, setIsDndMode] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<MusicTrack | null>(null);
  const [selectedAudiobook, setSelectedAudiobook] = useState<AudioBook | null>(null);
  const [sessionDuration, setSessionDuration] = useState(25); // Pomodoro default
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load data from localStorage
  useEffect(() => {
    const savedSessions = localStorage.getItem('focus_sessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions).map((s: any) => ({
        ...s,
        startTime: new Date(s.startTime),
        endTime: s.endTime ? new Date(s.endTime) : undefined
      }));
      setSessions(parsed);
    }

    const savedDndMode = localStorage.getItem('dnd_mode');
    if (savedDndMode === 'true') {
      setIsDndMode(true);
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('focus_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Timer for current session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession && !activeSession.completed) {
      interval = setInterval(() => {
        setCurrentTime(new Date());
        const elapsed = (new Date().getTime() - activeSession.startTime.getTime()) / (1000 * 60);
        if (elapsed >= activeSession.duration) {
          completeSession();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const startFocusSession = (type: 'music' | 'audiobook' | 'dnd') => {
    let title = '';
    let description = '';

    if (type === 'music' && selectedMusic) {
      title = `${selectedMusic.title} - Focus Session`;
      description = selectedMusic.description;
    } else if (type === 'audiobook' && selectedAudiobook) {
      title = `${selectedAudiobook.title} - Study Session`;
      description = selectedAudiobook.description;
    } else if (type === 'dnd') {
      title = 'Deep Work - DND Mode';
      description = 'Do Not Disturb session for overthinking elimination';
      setIsDndMode(true);
      localStorage.setItem('dnd_mode', 'true');
    }

    const newSession: FocusSession = {
      id: Date.now().toString(),
      type,
      duration: sessionDuration,
      startTime: new Date(),
      completed: false,
      title,
      description
    };

    setActiveSession(newSession);
  };

  const completeSession = () => {
    if (activeSession) {
      const completedSession = {
        ...activeSession,
        endTime: new Date(),
        completed: true
      };
      setSessions(prev => [completedSession, ...prev]);
      setActiveSession(null);
      
      if (activeSession.type === 'dnd') {
        setIsDndMode(false);
        localStorage.setItem('dnd_mode', 'false');
      }
    }
  };

  const stopSession = () => {
    if (activeSession) {
      if (activeSession.type === 'dnd') {
        setIsDndMode(false);
        localStorage.setItem('dnd_mode', 'false');
      }
      setActiveSession(null);
    }
  };

  const getSessionProgress = () => {
    if (!activeSession) return 0;
    const elapsed = (currentTime.getTime() - activeSession.startTime.getTime()) / (1000 * 60);
    return Math.min((elapsed / activeSession.duration) * 100, 100);
  };

  const getRemainingTime = () => {
    if (!activeSession) return '';
    const elapsed = (currentTime.getTime() - activeSession.startTime.getTime()) / (1000 * 60);
    const remaining = Math.max(activeSession.duration - elapsed, 0);
    const minutes = Math.floor(remaining);
    const seconds = Math.floor((remaining - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTodayStats = () => {
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(s => 
      s.completed && s.startTime.toDateString() === today
    );
    
    return {
      totalSessions: todaySessions.length,
      totalMinutes: todaySessions.reduce((sum, s) => sum + s.duration, 0),
      musicSessions: todaySessions.filter(s => s.type === 'music').length,
      audiobookSessions: todaySessions.filter(s => s.type === 'audiobook').length,
      dndSessions: todaySessions.filter(s => s.type === 'dnd').length
    };
  };

  const stats = getTodayStats();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-2">🎯 FOCUS ARSENAL</h1>
        <p className="text-gray-300">Eliminate overthinking • Command your attention • Achieve tactical focus</p>
        {isDndMode && (
          <div className="mt-4 bg-red-900/30 border border-red-500 rounded-lg p-3">
            <p className="text-red-400 font-semibold">🔴 DND MODE ACTIVE - Deep Work In Progress</p>
          </div>
        )}
      </div>

      {/* Active Session Display */}
      {activeSession && (
        <div className="bg-gray-900 border border-red-500 rounded-lg p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-red-400">{activeSession.title}</h3>
            <p className="text-gray-400">{activeSession.description}</p>
            <div className="text-3xl font-mono text-red-500 mt-2">{getRemainingTime()}</div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
            <div 
              className="bg-red-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${getSessionProgress()}%` }}
            ></div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={completeSession}
              className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-lg font-semibold"
            >
              Complete Session
            </button>
            <button
              onClick={stopSession}
              className="bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold"
            >
              Stop Session
            </button>
          </div>
        </div>
      )}

      {/* Session Setup */}
      {!activeSession && (
        <div className="grid md:grid-cols-3 gap-6">
          {/* DND Mode */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🛡️</div>
              <h3 className="text-xl font-semibold text-red-400">DND MODE</h3>
              <p className="text-gray-400 text-sm">Deep work without distractions</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(Number(e.target.value))}
                  min={5}
                  max={180}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
              </div>
              
              <button
                onClick={() => startFocusSession('dnd')}
                className="w-full bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg font-semibold"
              >
                Start DND Session
              </button>
            </div>
          </div>

          {/* Music Mode */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎵</div>
              <h3 className="text-xl font-semibold text-red-400">TACTICAL AUDIO</h3>
              <p className="text-gray-400 text-sm">Focus-enhancing soundscapes</p>
            </div>
            
            <div className="space-y-3">
              {MUSIC_ARSENAL.map(track => (
                <div
                  key={track.id}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedMusic?.id === track.id
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedMusic(track)}
                >
                  <div className="font-medium text-white text-sm">{track.title}</div>
                  <div className="text-gray-400 text-xs">{track.category} • {track.duration}min</div>
                </div>
              ))}
              
              <button
                onClick={() => startFocusSession('music')}
                disabled={!selectedMusic}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-semibold"
              >
                Start Audio Session
              </button>
            </div>
          </div>

          {/* Audiobook Mode */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">📚</div>
              <h3 className="text-xl font-semibold text-red-400">TACTICAL LEARNING</h3>
              <p className="text-gray-400 text-sm">Study while you focus</p>
            </div>
            
            <div className="space-y-3">
              {AUDIOBOOK_ARSENAL.map(book => (
                <div
                  key={book.id}
                  className={`p-3 border rounded cursor-pointer transition-colors ${
                    selectedAudiobook?.id === book.id
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedAudiobook(book)}
                >
                  <div className="font-medium text-white text-sm">{book.title}</div>
                  <div className="text-gray-400 text-xs">{book.category} • {book.duration}hrs</div>
                </div>
              ))}
              
              <button
                onClick={() => startFocusSession('audiobook')}
                disabled={!selectedAudiobook}
                className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg font-semibold"
              >
                Start Learning Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Today's Stats */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-red-400 mb-4">📊 TODAY'S TACTICAL REPORT</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.totalSessions}</div>
            <div className="text-sm text-gray-400">Total Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.totalMinutes}</div>
            <div className="text-sm text-gray-400">Minutes Focused</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.dndSessions}</div>
            <div className="text-sm text-gray-400">DND Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.musicSessions}</div>
            <div className="text-sm text-gray-400">Audio Sessions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{stats.audiobookSessions}</div>
            <div className="text-sm text-gray-400">Learning Sessions</div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">📋 MISSION HISTORY</h3>
          <div className="space-y-3">
            {sessions.slice(0, 5).map(session => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-700 rounded">
                <div>
                  <div className="font-medium text-white">{session.title}</div>
                  <div className="text-sm text-gray-400">
                    {session.duration} minutes • {session.startTime.toLocaleDateString()}
                  </div>
                </div>
                <div className="text-green-400 font-semibold">✓ COMPLETE</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}