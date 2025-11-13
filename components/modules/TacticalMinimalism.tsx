'use client';

import { useState, useEffect } from 'react';

interface MinimalismGoal {
  id: string;
  title: string;
  category: 'DIGITAL' | 'PHYSICAL' | 'MENTAL' | 'SOCIAL' | 'FINANCIAL';
  description: string;
  status: 'PLANNING' | 'ACTIVE' | 'COMPLETED' | 'PAUSED';
  startDate: Date;
  endDate?: Date;
  progress: number; // 0-100
  metrics?: {
    itemsRemoved?: number;
    timeFreed?: number; // in hours
    moneyFreed?: number;
    mentalClarity?: number; // 1-10 scale
  };
}

interface DigitalDetox {
  id: string;
  platform: string;
  timeLimit: number; // minutes per day
  currentUsage: number;
  streakDays: number;
  isActive: boolean;
  startDate: Date;
  violations: number;
}

interface ClarityAction {
  id: string;
  action: string;
  category: MinimalismGoal['category'];
  difficulty: 'EASY' | 'MODERATE' | 'HARD' | 'EXTREME';
  timeRequired: string;
  expectedBenefit: string;
  completed: boolean;
  completedDate?: Date;
}

const TACTICAL_CLARITY_ACTIONS: ClarityAction[] = [
  {
    id: '1',
    action: 'Digital Arsenal Audit',
    category: 'DIGITAL',
    difficulty: 'EASY',
    timeRequired: '30 minutes',
    expectedBenefit: 'Remove 10+ unused apps, free mental bandwidth',
    completed: false
  },
  {
    id: '2',
    action: 'Email Intelligence Cleanup',
    category: 'DIGITAL',
    difficulty: 'MODERATE',
    timeRequired: '2 hours',
    expectedBenefit: 'Unsubscribe from 50+ lists, achieve inbox zero',
    completed: false
  },
  {
    id: '3',
    action: 'Social Media Blackout',
    category: 'DIGITAL',
    difficulty: 'HARD',
    timeRequired: '7 days',
    expectedBenefit: 'Reduce dopamine dependency, increase focus time',
    completed: false
  },
  {
    id: '4',
    action: 'Physical Command Center',
    category: 'PHYSICAL',
    difficulty: 'MODERATE',
    timeRequired: '4 hours',
    expectedBenefit: 'Create distraction-free workspace, boost productivity',
    completed: false
  },
  {
    id: '5',
    action: 'Wardrobe Tactical Simplification',
    category: 'PHYSICAL',
    difficulty: 'MODERATE',
    timeRequired: '3 hours',
    expectedBenefit: 'Reduce decision fatigue, streamline morning routine',
    completed: false
  },
  {
    id: '6',
    action: 'Financial Position Audit',
    category: 'FINANCIAL',
    difficulty: 'HARD',
    timeRequired: '5 hours',
    expectedBenefit: 'Eliminate 5+ recurring subscriptions, save $100+/month',
    completed: false
  },
  {
    id: '7',
    action: 'Commitment Inventory Assessment',
    category: 'SOCIAL',
    difficulty: 'EXTREME',
    timeRequired: '2 hours',
    expectedBenefit: 'Eliminate energy-draining obligations, focus on key relationships',
    completed: false
  },
  {
    id: '8',
    action: 'Mental Load Declutter',
    category: 'MENTAL',
    difficulty: 'HARD',
    timeRequired: '1 hour daily for 7 days',
    expectedBenefit: 'Brain dump worries, create systematic thinking processes',
    completed: false
  },
  {
    id: '9',
    action: 'Information Diet Protocol',
    category: 'MENTAL',
    difficulty: 'EXTREME',
    timeRequired: '30 days',
    expectedBenefit: 'Eliminate information overload, improve decision quality',
    completed: false
  },
  {
    id: '10',
    action: 'Digital Fortress Construction',
    category: 'DIGITAL',
    difficulty: 'EXTREME',
    timeRequired: '1 week',
    expectedBenefit: 'Create distraction-free digital environment, maximize deep work',
    completed: false
  }
];

const DIGITAL_PLATFORMS = [
  'Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'Facebook', 
  'Reddit', 'LinkedIn', 'Discord', 'Netflix', 'Gaming',
  'News Sites', 'Email', 'Messaging Apps'
];

export default function TacticalMinimalism() {
  const [goals, setGoals] = useState<MinimalismGoal[]>([]);
  const [detoxTracker, setDetoxTracker] = useState<DigitalDetox[]>([]);
  const [clarityActions, setClarityActions] = useState<ClarityAction[]>(TACTICAL_CLARITY_ACTIONS);
  const [activeTab, setActiveTab] = useState<'overview' | 'digital' | 'clarity' | 'goals'>('overview');
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [showNewDetox, setShowNewDetox] = useState(false);

  // Form states
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'DIGITAL' as MinimalismGoal['category'],
    description: ''
  });

  const [newDetox, setNewDetox] = useState({
    platform: '',
    timeLimit: 30
  });

  // Load data from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('tactical_minimalism_goals');
    const savedDetox = localStorage.getItem('digital_detox_tracker');
    const savedActions = localStorage.getItem('clarity_actions');

    if (savedGoals) {
      const parsed = JSON.parse(savedGoals).map((g: any) => ({
        ...g,
        startDate: new Date(g.startDate),
        endDate: g.endDate ? new Date(g.endDate) : undefined
      }));
      setGoals(parsed);
    }

    if (savedDetox) {
      const parsed = JSON.parse(savedDetox).map((d: any) => ({
        ...d,
        startDate: new Date(d.startDate)
      }));
      setDetoxTracker(parsed);
    }

    if (savedActions) {
      const parsed = JSON.parse(savedActions).map((a: any) => ({
        ...a,
        completedDate: a.completedDate ? new Date(a.completedDate) : undefined
      }));
      setClarityActions(parsed);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('tactical_minimalism_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('digital_detox_tracker', JSON.stringify(detoxTracker));
  }, [detoxTracker]);

  useEffect(() => {
    localStorage.setItem('clarity_actions', JSON.stringify(clarityActions));
  }, [clarityActions]);

  const addMinimalismGoal = () => {
    if (!newGoal.title.trim()) return;

    const goal: MinimalismGoal = {
      id: Date.now().toString(),
      title: newGoal.title,
      category: newGoal.category,
      description: newGoal.description,
      status: 'PLANNING',
      startDate: new Date(),
      progress: 0
    };

    setGoals(prev => [goal, ...prev]);
    setNewGoal({ title: '', category: 'DIGITAL', description: '' });
    setShowNewGoal(false);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        const updatedGoal = { ...g, progress };
        if (progress >= 100 && g.status !== 'COMPLETED') {
          updatedGoal.status = 'COMPLETED';
          updatedGoal.endDate = new Date();
        }
        return updatedGoal;
      }
      return g;
    }));
  };

  const addDigitalDetox = () => {
    if (!newDetox.platform) return;

    const detox: DigitalDetox = {
      id: Date.now().toString(),
      platform: newDetox.platform,
      timeLimit: newDetox.timeLimit,
      currentUsage: 0,
      streakDays: 0,
      isActive: true,
      startDate: new Date(),
      violations: 0
    };

    setDetoxTracker(prev => [detox, ...prev]);
    setNewDetox({ platform: '', timeLimit: 30 });
    setShowNewDetox(false);
  };

  const logUsage = (detoxId: string, minutes: number) => {
    setDetoxTracker(prev => prev.map(d => {
      if (d.id === detoxId) {
        const newUsage = d.currentUsage + minutes;
        const isViolation = newUsage > d.timeLimit;
        return {
          ...d,
          currentUsage: newUsage,
          violations: isViolation ? d.violations + 1 : d.violations,
          streakDays: isViolation ? 0 : d.streakDays + 1
        };
      }
      return d;
    }));
  };

  const toggleClarityAction = (actionId: string) => {
    setClarityActions(prev => prev.map(a => {
      if (a.id === actionId) {
        return {
          ...a,
          completed: !a.completed,
          completedDate: !a.completed ? new Date() : undefined
        };
      }
      return a;
    }));
  };

  const getOverviewStats = () => {
    const activeGoals = goals.filter(g => g.status === 'ACTIVE').length;
    const completedGoals = goals.filter(g => g.status === 'COMPLETED').length;
    const avgProgress = goals.length > 0 ? goals.reduce((sum, g) => sum + g.progress, 0) / goals.length : 0;
    const activeDetoxes = detoxTracker.filter(d => d.isActive).length;
    const totalDetoxStreak = detoxTracker.reduce((sum, d) => sum + d.streakDays, 0);
    const completedActions = clarityActions.filter(a => a.completed).length;
    
    return {
      activeGoals,
      completedGoals,
      avgProgress: Math.round(avgProgress),
      activeDetoxes,
      totalDetoxStreak,
      completedActions,
      totalActions: clarityActions.length
    };
  };

  const stats = getOverviewStats();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-2">⚡ TACTICAL MINIMALISM</h1>
        <p className="text-gray-300">Eliminate the unnecessary • Amplify what matters • Achieve mental clarity</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700 overflow-x-auto">
        {[
          { id: 'overview', label: 'MISSION OVERVIEW', icon: '📊' },
          { id: 'digital', label: 'DIGITAL DETOX', icon: '📱' },
          { id: 'clarity', label: 'CLARITY ACTIONS', icon: '🎯' },
          { id: 'goals', label: 'TACTICAL GOALS', icon: '🚀' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400">{stats.completedGoals}</div>
              <div className="text-gray-400 text-sm">Completed Goals</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400">{stats.activeGoals}</div>
              <div className="text-gray-400 text-sm">Active Goals</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400">{stats.avgProgress}%</div>
              <div className="text-gray-400 text-sm">Avg Progress</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-400">{stats.totalDetoxStreak}</div>
              <div className="text-gray-400 text-sm">Total Detox Days</div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">🚀 Active Minimalism Goals</h3>
              {goals.filter(g => g.status === 'ACTIVE').slice(0, 5).map(goal => (
                <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-900 rounded mb-2">
                  <div>
                    <div className="font-medium text-white text-sm">{goal.title}</div>
                    <div className="text-xs text-gray-400">{goal.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{goal.progress}%</div>
                    <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
                      <div
                        className="bg-red-500 h-1 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">📱 Digital Detox Status</h3>
              {detoxTracker.filter(d => d.isActive).slice(0, 5).map(detox => (
                <div key={detox.id} className="flex items-center justify-between p-3 bg-gray-900 rounded mb-2">
                  <div>
                    <div className="font-medium text-white text-sm">{detox.platform}</div>
                    <div className="text-xs text-gray-400">{detox.currentUsage}/{detox.timeLimit} min</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{detox.streakDays} days</div>
                    <div className="text-xs text-gray-400">{detox.violations} violations</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clarity Actions Progress */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">🎯 Tactical Clarity Progress</h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-300">Actions Completed</span>
              <span className="text-white font-semibold">{stats.completedActions}/{stats.totalActions}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${(stats.completedActions / stats.totalActions) * 100}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              {Object.entries(
                clarityActions.reduce((acc, action) => {
                  const category = action.category;
                  if (!acc[category]) acc[category] = { total: 0, completed: 0 };
                  acc[category].total++;
                  if (action.completed) acc[category].completed++;
                  return acc;
                }, {} as Record<string, { total: number; completed: number }>)
              ).map(([category, data]) => (
                <div key={category} className="text-center">
                  <div className="text-lg font-bold text-white">{data.completed}/{data.total}</div>
                  <div className="text-xs text-gray-400">{category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'digital' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-400">📱 DIGITAL DETOX COMMAND</h2>
            <button
              onClick={() => setShowNewDetox(true)}
              className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg font-semibold"
            >
              ➕ NEW DETOX TARGET
            </button>
          </div>

          {/* New Detox Form */}
          {showNewDetox && (
            <div className="bg-gray-800 border border-red-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">🎯 DEPLOY DIGITAL DETOX</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform/App</label>
                  <select
                    value={newDetox.platform}
                    onChange={(e) => setNewDetox(prev => ({ ...prev, platform: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select platform</option>
                    {DIGITAL_PLATFORMS.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Daily Time Limit (minutes)</label>
                  <input
                    type="number"
                    value={newDetox.timeLimit}
                    onChange={(e) => setNewDetox(prev => ({ ...prev, timeLimit: Number(e.target.value) }))}
                    min={5}
                    max={300}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowNewDetox(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={addDigitalDetox}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
                >
                  Deploy Detox
                </button>
              </div>
            </div>
          )}

          {/* Detox Tracker List */}
          <div className="space-y-4">
            {detoxTracker.map(detox => {
              const usagePercent = (detox.currentUsage / detox.timeLimit) * 100;
              const isOverLimit = usagePercent > 100;

              return (
                <div key={detox.id} className={`border rounded-lg p-6 ${
                  isOverLimit ? 'bg-red-900/20 border-red-500' : 'bg-gray-800 border-gray-700'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{detox.platform}</h4>
                      <p className="text-gray-400">Limit: {detox.timeLimit} minutes/day</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${isOverLimit ? 'text-red-400' : 'text-green-400'}`}>
                        {detox.streakDays} day streak
                      </div>
                      <div className="text-sm text-gray-400">{detox.violations} violations</div>
                    </div>
                  </div>

                  {/* Usage Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Today's Usage</span>
                      <span>{detox.currentUsage}/{detox.timeLimit} minutes</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-300 ${
                          isOverLimit ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Usage Logging */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => logUsage(detox.id, 15)}
                      className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                    >
                      +15 min
                    </button>
                    <button
                      onClick={() => logUsage(detox.id, 30)}
                      className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                    >
                      +30 min
                    </button>
                    <button
                      onClick={() => logUsage(detox.id, 60)}
                      className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
                    >
                      +1 hour
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'clarity' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-red-400">🎯 TACTICAL CLARITY OPERATIONS</h2>
          
          <div className="grid gap-4">
            {clarityActions.map(action => (
              <div key={action.id} className={`border rounded-lg p-6 transition-all ${
                action.completed 
                  ? 'bg-green-900/20 border-green-600' 
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        checked={action.completed}
                        onChange={() => toggleClarityAction(action.id)}
                        className="w-5 h-5 text-red-500 rounded focus:ring-red-500"
                      />
                      <h4 className={`text-lg font-semibold ${
                        action.completed ? 'line-through text-gray-500' : 'text-white'
                      }`}>
                        {action.action}
                      </h4>
                    </div>
                    
                    <div className="flex gap-4 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        action.category === 'DIGITAL' ? 'bg-blue-900 text-blue-300' :
                        action.category === 'PHYSICAL' ? 'bg-green-900 text-green-300' :
                        action.category === 'MENTAL' ? 'bg-purple-900 text-purple-300' :
                        action.category === 'SOCIAL' ? 'bg-pink-900 text-pink-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {action.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        action.difficulty === 'EASY' ? 'bg-green-800 text-green-300' :
                        action.difficulty === 'MODERATE' ? 'bg-yellow-800 text-yellow-300' :
                        action.difficulty === 'HARD' ? 'bg-orange-800 text-orange-300' :
                        'bg-red-800 text-red-300'
                      }`}>
                        {action.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-800 text-gray-300">
                        {action.timeRequired}
                      </span>
                    </div>
                    
                    <p className={`text-sm ${action.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                      <strong>Expected Benefit:</strong> {action.expectedBenefit}
                    </p>
                    
                    {action.completed && action.completedDate && (
                      <p className="text-green-400 text-sm mt-2">
                        ✅ Completed on {action.completedDate.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-400">🚀 TACTICAL MINIMALISM GOALS</h2>
            <button
              onClick={() => setShowNewGoal(true)}
              className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg font-semibold"
            >
              ➕ NEW GOAL
            </button>
          </div>

          {/* New Goal Form */}
          {showNewGoal && (
            <div className="bg-gray-800 border border-red-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">🎯 CREATE MINIMALISM GOAL</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Goal Title</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="e.g., Eliminate 50% of possessions"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as MinimalismGoal['category'] }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="DIGITAL">Digital</option>
                    <option value="PHYSICAL">Physical</option>
                    <option value="MENTAL">Mental</option>
                    <option value="SOCIAL">Social</option>
                    <option value="FINANCIAL">Financial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
                    placeholder="Detailed description of what you want to achieve..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => setShowNewGoal(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={addMinimalismGoal}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
                >
                  Create Goal
                </button>
              </div>
            </div>
          )}

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{goal.title}</h4>
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        goal.category === 'DIGITAL' ? 'bg-blue-900 text-blue-300' :
                        goal.category === 'PHYSICAL' ? 'bg-green-900 text-green-300' :
                        goal.category === 'MENTAL' ? 'bg-purple-900 text-purple-300' :
                        goal.category === 'SOCIAL' ? 'bg-pink-900 text-pink-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {goal.category}
                      </span>
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        goal.status === 'COMPLETED' ? 'bg-green-900 text-green-300' :
                        goal.status === 'ACTIVE' ? 'bg-blue-900 text-blue-300' :
                        goal.status === 'PLANNING' ? 'bg-gray-900 text-gray-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    <p className="text-gray-300">{goal.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Progress Update */}
                {goal.status !== 'COMPLETED' && (
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-white font-semibold w-12 text-center">{goal.progress}%</span>
                  </div>
                )}

                {goal.status === 'COMPLETED' && goal.endDate && (
                  <p className="text-green-400 text-sm mt-3">
                    ✅ Completed on {goal.endDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}