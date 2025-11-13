'use client';

import React, { useState, useEffect } from 'react';

interface Analytics {
  habitsCompleted: number;
  journalEntries: number;
  averageMood: number;
  longestStreak: number;
  totalDays: number;
  weeklyProgress: number[];
  moodDistribution: { [key: string]: number };
  categoryProgress: { [key: string]: number };
}

export function IntelDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90'>('30');

  useEffect(() => {
    calculateAnalytics();
  }, [timeRange]);

  const calculateAnalytics = () => {
    // Get data from localStorage
    const missions = JSON.parse(localStorage.getItem('tactical-missions') || '[]');
    const logs = JSON.parse(localStorage.getItem('tactical-logs') || '[]');
    const entries = JSON.parse(localStorage.getItem('war-log-entries') || '[]');

    const days = parseInt(timeRange);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // Filter recent logs
    const recentLogs = logs.filter((log: any) => new Date(log.date) >= cutoffDate);
    const recentEntries = entries.filter((entry: any) => new Date(entry.timestamp) >= cutoffDate);

    // Calculate habits completed
    const habitsCompleted = recentLogs.reduce((total: number, log: any) => total + log.completedMissions.length, 0);

    // Calculate journal entries
    const journalEntries = recentEntries.length;

    // Calculate average mood from journal entries
    const moodValues = {
      'CRITICAL': 1,
      'DAMAGED': 2,
      'OPERATIONAL': 3,
      'STRONG': 4,
      'VICTORIOUS': 5
    };
    
    const totalMood = recentEntries.reduce((sum: number, entry: any) => sum + (moodValues[entry.mood as keyof typeof moodValues] || 3), 0);
    const averageMood = recentEntries.length > 0 ? totalMood / recentEntries.length : 3;

    // Calculate longest streak
    const activeMissions = missions.filter((m: any) => m.isActive);
    const longestStreak = activeMissions.reduce((max: number, mission: any) => Math.max(max, mission.streak || 0), 0);

    // Calculate weekly progress (last 7 days)
    const weeklyProgress = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayLog = logs.find((log: any) => log.date === dateStr);
      const completionRate = dayLog ? (dayLog.completedMissions.length / Math.max(activeMissions.length, 1)) * 100 : 0;
      weeklyProgress.push(Math.round(completionRate));
    }

    // Calculate mood distribution
    const moodDistribution = recentEntries.reduce((dist: any, entry: any) => {
      dist[entry.mood] = (dist[entry.mood] || 0) + 1;
      return dist;
    }, {});

    // Calculate category progress
    const categoryProgress: { [key: string]: number } = {};
    const categoryMissions = activeMissions.reduce((cats: any, mission: any) => {
      cats[mission.category] = (cats[mission.category] || 0) + 1;
      return cats;
    }, {});

    recentLogs.forEach((log: any) => {
      log.completedMissions.forEach((missionId: string) => {
        const mission = missions.find((m: any) => m.id === missionId);
        if (mission && mission.category) {
          categoryProgress[mission.category] = (categoryProgress[mission.category] || 0) + 1;
        }
      });
    });

    // Convert to percentages
    Object.keys(categoryProgress).forEach(category => {
      const totalPossible = (categoryMissions[category] || 1) * days;
      categoryProgress[category] = Math.round((categoryProgress[category] / totalPossible) * 100);
    });

    setAnalytics({
      habitsCompleted,
      journalEntries,
      averageMood,
      longestStreak,
      totalDays: days,
      weeklyProgress,
      moodDistribution,
      categoryProgress
    });
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'CRITICAL': return 'text-red-500';
      case 'DAMAGED': return 'text-orange-500';
      case 'OPERATIONAL': return 'text-yellow-500';
      case 'STRONG': return 'text-blue-500';
      case 'VICTORIOUS': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'CRITICAL': return '🔴';
      case 'DAMAGED': return '🟠';
      case 'OPERATIONAL': return '🟡';
      case 'STRONG': return '🔵';
      case 'VICTORIOUS': return '🟢';
      default: return '⚫';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'PHYSICAL': return '💪';
      case 'MENTAL': return '🧠';
      case 'TACTICAL': return '🎯';
      case 'LIFESTYLE': return '⚡';
      default: return '📊';
    }
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 90) return { level: 'ELITE', color: 'text-purple-400' };
    if (percentage >= 75) return { level: 'VETERAN', color: 'text-green-400' };
    if (percentage >= 60) return { level: 'SOLDIER', color: 'text-blue-400' };
    if (percentage >= 40) return { level: 'RECRUIT', color: 'text-yellow-400' };
    return { level: 'TRAINEE', color: 'text-red-400' };
  };

  if (!analytics) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚡</div>
          <div>Loading tactical intelligence...</div>
        </div>
      </div>
    );
  }

  const overallCompletion = analytics.weeklyProgress.reduce((sum, day) => sum + day, 0) / 7;
  const performanceLevel = getPerformanceLevel(overallCompletion);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-2 border-red-600/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-red-500 mb-2">[ TACTICAL INTELLIGENCE ]</h1>
            <div className="text-gray-400">Performance Analytics • Last {timeRange} Days</div>
          </div>
          <div className="flex space-x-2">
            {['7', '30', '90'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-2 rounded-none border transition-all font-mono ${
                  timeRange === range 
                    ? 'bg-red-600 border-red-500 text-white' 
                    : 'border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400'
                }`}
              >
                {range}D
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="p-6 border-b border-gray-800">
        <div className="text-center mb-6">
          <div className={`text-4xl font-bold ${performanceLevel.color} mb-2`}>
            {Math.round(overallCompletion)}%
          </div>
          <div className={`text-xl font-bold ${performanceLevel.color}`}>
            {performanceLevel.level} STATUS
          </div>
          <div className="text-gray-400 text-sm">Overall Mission Efficiency</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-blue-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-blue-400">{analytics.habitsCompleted}</div>
            <div className="text-sm text-gray-400">MISSIONS COMPLETED</div>
            <div className="text-xs text-blue-500 mt-1">
              {(analytics.habitsCompleted / Math.max(analytics.totalDays, 1)).toFixed(1)}/day avg
            </div>
          </div>

          <div className="bg-gray-900 border border-green-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-green-400">{analytics.journalEntries}</div>
            <div className="text-sm text-gray-400">WAR LOG ENTRIES</div>
            <div className="text-xs text-green-500 mt-1">
              {(analytics.journalEntries / Math.max(analytics.totalDays, 1)).toFixed(1)}/day avg
            </div>
          </div>

          <div className="bg-gray-900 border border-yellow-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-yellow-400">{analytics.longestStreak}</div>
            <div className="text-sm text-gray-400">LONGEST STREAK</div>
            <div className="text-xs text-yellow-500 mt-1">Peak Performance</div>
          </div>

          <div className="bg-gray-900 border border-purple-600/30 p-4 rounded-none text-center">
            <div className="text-2xl font-bold text-purple-400">{analytics.averageMood.toFixed(1)}</div>
            <div className="text-sm text-gray-400">AVERAGE STATUS</div>
            <div className="text-xs text-purple-500 mt-1">Mental Readiness</div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div className="bg-gray-900 border border-red-600/30 rounded-none p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-4">[ 7-DAY TACTICAL READINESS ]</h3>
          <div className="flex items-end justify-between h-32 mb-4">
            {analytics.weeklyProgress.map((percentage, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                <div 
                  className={`w-full rounded-none transition-all ${
                    percentage >= 80 ? 'bg-green-500' : 
                    percentage >= 60 ? 'bg-yellow-500' : 
                    percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'
                  }`}
                  style={{ height: `${Math.max(percentage, 5)}%` }}
                ></div>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(Date.now() - (6-index) * 24*60*60*1000).toLocaleDateString().split('/').slice(0, 2).join('/')}
                </div>
                <div className="text-xs text-white font-bold">{percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mood Distribution */}
          <div className="bg-gray-900 border border-blue-600/30 rounded-none p-6">
            <h3 className="text-lg font-bold text-white mb-4">[ MENTAL STATUS DISTRIBUTION ]</h3>
            <div className="space-y-3">
              {Object.entries(analytics.moodDistribution).map(([mood, count]) => {
                const total = Object.values(analytics.moodDistribution).reduce((sum, val) => sum + val, 0);
                const percentage = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={mood} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span>{getMoodIcon(mood)}</span>
                      <span className={`text-sm font-mono ${getMoodColor(mood)}`}>{mood}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-700 rounded-none h-2 overflow-hidden">
                        <div 
                          className={`h-full transition-all ${mood === 'VICTORIOUS' ? 'bg-green-500' : mood === 'STRONG' ? 'bg-blue-500' : mood === 'OPERATIONAL' ? 'bg-yellow-500' : mood === 'DAMAGED' ? 'bg-orange-500' : 'bg-red-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white min-w-[40px]">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Performance */}
          <div className="bg-gray-900 border border-green-600/30 rounded-none p-6">
            <h3 className="text-lg font-bold text-white mb-4">[ CATEGORY PERFORMANCE ]</h3>
            <div className="space-y-3">
              {Object.entries(analytics.categoryProgress).map(([category, percentage]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{getCategoryIcon(category)}</span>
                    <span className="text-sm font-mono text-white">{category}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-700 rounded-none h-2 overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          percentage >= 80 ? 'bg-green-500' : 
                          percentage >= 60 ? 'bg-blue-500' : 
                          percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-white min-w-[40px]">{percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Recommendations */}
        <div className="bg-yellow-900/20 border border-yellow-600 rounded-none p-6 mt-8">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">[ TACTICAL RECOMMENDATIONS ]</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            {overallCompletion < 50 && (
              <div className="text-red-300">
                🔴 <strong>Critical Status:</strong> Mission completion below 50%. Focus on establishing basic discipline protocols.
              </div>
            )}
            {analytics.longestStreak < 7 && (
              <div className="text-orange-300">
                🟠 <strong>Streak Building:</strong> Work on maintaining consistency for at least 7 days to establish momentum.
              </div>
            )}
            {analytics.journalEntries < analytics.totalDays * 0.3 && (
              <div className="text-yellow-300">
                🟡 <strong>Intelligence Gap:</strong> Increase War Log entries to improve self-awareness and tactical planning.
              </div>
            )}
            {overallCompletion >= 75 && (
              <div className="text-green-300">
                🟢 <strong>Elite Performance:</strong> Excellent tactical discipline. Consider adding advanced missions to maintain growth.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}