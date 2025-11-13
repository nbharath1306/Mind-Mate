'use client';

import React, { useState, useEffect } from 'react';

interface Mission {
  id: string;
  codename: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'ELITE';
  category: 'PHYSICAL' | 'MENTAL' | 'TACTICAL' | 'LIFESTYLE';
  streak: number;
  lastCompleted?: Date;
  totalCompleted: number;
  isActive: boolean;
  createdAt: Date;
}

interface DayLog {
  date: string; // YYYY-MM-DD format
  completedMissions: string[]; // mission IDs
}

export function DisciplineMatrix() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [dayLogs, setDayLogs] = useState<DayLog[]>([]);
  const [showAddMission, setShowAddMission] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Load data from localStorage
  useEffect(() => {
    const savedMissions = localStorage.getItem('tactical-missions');
    const savedLogs = localStorage.getItem('tactical-logs');
    
    if (savedMissions) {
      setMissions(JSON.parse(savedMissions));
    } else {
      // Initialize with default missions
      const defaultMissions: Mission[] = [
        {
          id: 'mission-1',
          codename: 'MORNING DRILL',
          description: 'Complete morning workout routine',
          difficulty: 'MEDIUM',
          category: 'PHYSICAL',
          streak: 0,
          totalCompleted: 0,
          isActive: true,
          createdAt: new Date()
        },
        {
          id: 'mission-2',
          codename: 'HYDRATION PROTOCOL',
          description: 'Drink 8 glasses of water',
          difficulty: 'EASY',
          category: 'LIFESTYLE',
          streak: 0,
          totalCompleted: 0,
          isActive: true,
          createdAt: new Date()
        },
        {
          id: 'mission-3',
          codename: 'MENTAL ARMOR',
          description: '10 minutes meditation/mindfulness',
          difficulty: 'MEDIUM',
          category: 'MENTAL',
          streak: 0,
          totalCompleted: 0,
          isActive: true,
          createdAt: new Date()
        },
        {
          id: 'mission-4',
          codename: 'TACTICAL READING',
          description: 'Read for 30 minutes',
          difficulty: 'EASY',
          category: 'MENTAL',
          streak: 0,
          totalCompleted: 0,
          isActive: true,
          createdAt: new Date()
        }
      ];
      setMissions(defaultMissions);
      localStorage.setItem('tactical-missions', JSON.stringify(defaultMissions));
    }
    
    if (savedLogs) {
      setDayLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('tactical-missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('tactical-logs', JSON.stringify(dayLogs));
  }, [dayLogs]);

  const completeMission = (missionId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const todayLog = dayLogs.find(log => log.date === today);
    
    if (todayLog && todayLog.completedMissions.includes(missionId)) {
      // Already completed today - uncomplete it
      const updatedLogs = dayLogs.map(log => 
        log.date === today 
          ? { ...log, completedMissions: log.completedMissions.filter(id => id !== missionId) }
          : log
      );
      setDayLogs(updatedLogs);
      
      // Update mission streak and total
      setMissions(prev => prev.map(mission => 
        mission.id === missionId
          ? { 
              ...mission, 
              totalCompleted: Math.max(0, mission.totalCompleted - 1),
              streak: calculateStreak(missionId, updatedLogs)
            }
          : mission
      ));
    } else {
      // Complete the mission
      let updatedLogs;
      if (todayLog) {
        updatedLogs = dayLogs.map(log => 
          log.date === today 
            ? { ...log, completedMissions: [...log.completedMissions, missionId] }
            : log
        );
      } else {
        updatedLogs = [...dayLogs, { date: today, completedMissions: [missionId] }];
      }
      setDayLogs(updatedLogs);
      
      // Update mission streak and total
      setMissions(prev => prev.map(mission => 
        mission.id === missionId
          ? { 
              ...mission, 
              totalCompleted: mission.totalCompleted + 1,
              lastCompleted: new Date(),
              streak: calculateStreak(missionId, updatedLogs)
            }
          : mission
      ));
    }
  };

  const calculateStreak = (missionId: string, logs: DayLog[]) => {
    const sortedLogs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let streak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < 30; i++) { // Check last 30 days
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayLog = sortedLogs.find(log => log.date === dateStr);
      
      if (dayLog && dayLog.completedMissions.includes(missionId)) {
        streak++;
      } else if (streak > 0) {
        break; // Streak broken
      }
      
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    return streak;
  };

  const isMissionCompletedToday = (missionId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const todayLog = dayLogs.find(log => log.date === today);
    return todayLog?.completedMissions.includes(missionId) || false;
  };

  const getDifficultyColor = (difficulty: Mission['difficulty']) => {
    switch (difficulty) {
      case 'EASY': return 'text-green-400 border-green-400';
      case 'MEDIUM': return 'text-yellow-400 border-yellow-400';
      case 'HARD': return 'text-orange-400 border-orange-400';
      case 'ELITE': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getCategoryIcon = (category: Mission['category']) => {
    switch (category) {
      case 'PHYSICAL': return '💪';
      case 'MENTAL': return '🧠';
      case 'TACTICAL': return '🎯';
      case 'LIFESTYLE': return '⚡';
      default: return '📋';
    }
  };

  const addCustomMission = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    
    const newMission: Mission = {
      id: `mission-${Date.now()}`,
      codename: formData.get('codename') as string,
      description: formData.get('description') as string,
      difficulty: formData.get('difficulty') as Mission['difficulty'],
      category: formData.get('category') as Mission['category'],
      streak: 0,
      totalCompleted: 0,
      isActive: true,
      createdAt: new Date()
    };
    
    setMissions(prev => [...prev, newMission]);
    setShowAddMission(false);
  };

  const toggleMissionActive = (missionId: string) => {
    setMissions(prev => prev.map(mission => 
      mission.id === missionId
        ? { ...mission, isActive: !mission.isActive }
        : mission
    ));
  };

  const deleteMission = (missionId: string) => {
    setMissions(prev => prev.filter(mission => mission.id !== missionId));
    setDayLogs(prev => prev.map(log => ({
      ...log,
      completedMissions: log.completedMissions.filter(id => id !== missionId)
    })));
  };

  const activeMissions = missions.filter(m => m.isActive);
  const completedToday = activeMissions.filter(m => isMissionCompletedToday(m.id)).length;
  const completionRate = activeMissions.length > 0 ? (completedToday / activeMissions.length * 100) : 0;

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-2 border-red-600/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">[ DISCIPLINE MATRIX ]</h1>
            <div className="text-gray-400">Mission Date: {new Date().toLocaleDateString()}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{completedToday}/{activeMissions.length}</div>
            <div className="text-sm text-gray-400">MISSIONS COMPLETE</div>
            <div className={`text-lg font-bold ${completionRate >= 80 ? 'text-green-400' : completionRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
              {Math.round(completionRate)}% EFFICIENCY
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'ACTIVE MISSIONS', value: activeMissions.length, icon: '🎯' },
          { label: 'TOTAL COMPLETED', value: missions.reduce((sum, m) => sum + m.totalCompleted, 0), icon: '✅' },
          { label: 'BEST STREAK', value: Math.max(...missions.map(m => m.streak), 0), icon: '🔥' },
          { label: 'EFFICIENCY RATE', value: `${Math.round(completionRate)}%`, icon: '⚡' }
        ].map((stat, index) => (
          <div key={index} className="bg-gray-900 border border-red-600/30 p-4 rounded-none">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Mission List */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">[ ACTIVE MISSIONS ]</h2>
          <button
            onClick={() => setShowAddMission(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-none border border-red-500 transition-all"
          >
            + NEW MISSION
          </button>
        </div>

        <div className="grid gap-4">
          {activeMissions.map((mission) => (
            <div
              key={mission.id}
              className={`bg-gray-900 border-2 p-4 rounded-none transition-all ${
                isMissionCompletedToday(mission.id) 
                  ? 'border-green-500 bg-green-900/20' 
                  : 'border-red-600/30 hover:border-red-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => completeMission(mission.id)}
                    className={`w-8 h-8 rounded-none border-2 flex items-center justify-center transition-all ${
                      isMissionCompletedToday(mission.id)
                        ? 'bg-green-600 border-green-500 text-white'
                        : 'border-gray-600 hover:border-red-500'
                    }`}
                  >
                    {isMissionCompletedToday(mission.id) ? '✓' : ''}
                  </button>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{getCategoryIcon(mission.category)}</span>
                      <h3 className="text-lg font-bold text-white">{mission.codename}</h3>
                      <span className={`text-xs px-2 py-1 border rounded-none ${getDifficultyColor(mission.difficulty)}`}>
                        {mission.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{mission.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">{mission.streak}</div>
                    <div className="text-xs text-gray-500">STREAK</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{mission.totalCompleted}</div>
                    <div className="text-xs text-gray-500">TOTAL</div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleMissionActive(mission.id)}
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                    >
                      ⏸️
                    </button>
                    <button
                      onClick={() => deleteMission(mission.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Mission Modal */}
      {showAddMission && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-red-600 rounded-none p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">[ NEW MISSION BRIEFING ]</h3>
            <form onSubmit={addCustomMission} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">MISSION CODENAME</label>
                <input
                  type="text"
                  name="codename"
                  required
                  className="w-full bg-black border border-gray-600 text-white p-2 rounded-none focus:border-red-500 outline-none"
                  placeholder="e.g., MORNING DRILL"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm mb-1">MISSION DESCRIPTION</label>
                <input
                  type="text"
                  name="description"
                  required
                  className="w-full bg-black border border-gray-600 text-white p-2 rounded-none focus:border-red-500 outline-none"
                  placeholder="e.g., Complete 30 pushups"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">DIFFICULTY</label>
                  <select
                    name="difficulty"
                    className="w-full bg-black border border-gray-600 text-white p-2 rounded-none focus:border-red-500 outline-none"
                  >
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                    <option value="ELITE">ELITE</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm mb-1">CATEGORY</label>
                  <select
                    name="category"
                    className="w-full bg-black border border-gray-600 text-white p-2 rounded-none focus:border-red-500 outline-none"
                  >
                    <option value="PHYSICAL">PHYSICAL 💪</option>
                    <option value="MENTAL">MENTAL 🧠</option>
                    <option value="TACTICAL">TACTICAL 🎯</option>
                    <option value="LIFESTYLE">LIFESTYLE ⚡</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-none border border-red-500 transition-all"
                >
                  DEPLOY MISSION
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMission(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-none border border-gray-600 transition-all"
                >
                  ABORT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}