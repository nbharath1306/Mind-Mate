'use client';

import { useState, useEffect } from 'react';

interface Learning {
  id: string;
  title: string;
  content: string;
  source: string; // book, experience, conversation, etc.
  category: 'MINDSET' | 'STRATEGY' | 'TACTICAL' | 'PHILOSOPHY' | 'LEADERSHIP' | 'HEALTH';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dateCreated: Date;
  tags: string[];
  implementation?: Implementation;
}

interface Implementation {
  id: string;
  action: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'PAUSED';
  dateStarted?: Date;
  dateCompleted?: Date;
  notes: string;
  results?: string;
}

interface ActionPlan {
  id: string;
  learningId: string;
  title: string;
  description: string;
  steps: ActionStep[];
  deadline?: Date;
  status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
  createdAt: Date;
}

interface ActionStep {
  id: string;
  description: string;
  completed: boolean;
  completedAt?: Date;
}

const LEARNING_CATEGORIES = ['MINDSET', 'STRATEGY', 'TACTICAL', 'PHILOSOPHY', 'LEADERSHIP', 'HEALTH'] as const;
const PRIORITY_LEVELS = ['HIGH', 'MEDIUM', 'LOW'] as const;

export default function LearningsTracker() {
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [showNewLearning, setShowNewLearning] = useState(false);
  const [showNewActionPlan, setShowNewActionPlan] = useState(false);
  const [selectedLearning, setSelectedLearning] = useState<Learning | null>(null);
  const [activeTab, setActiveTab] = useState<'learnings' | 'actions' | 'analytics'>('learnings');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // Form state
  const [newLearning, setNewLearning] = useState({
    title: '',
    content: '',
    source: '',
    category: 'MINDSET' as Learning['category'],
    priority: 'MEDIUM' as Learning['priority'],
    tags: [] as string[]
  });

  const [newActionPlan, setNewActionPlan] = useState({
    learningId: '',
    title: '',
    description: '',
    steps: [''] as string[],
    deadline: ''
  });

  // Load data from localStorage
  useEffect(() => {
    const savedLearnings = localStorage.getItem('tactical_learnings');
    const savedActionPlans = localStorage.getItem('tactical_action_plans');
    
    if (savedLearnings) {
      const parsed = JSON.parse(savedLearnings).map((l: any) => ({
        ...l,
        dateCreated: new Date(l.dateCreated),
        implementation: l.implementation ? {
          ...l.implementation,
          dateStarted: l.implementation.dateStarted ? new Date(l.implementation.dateStarted) : undefined,
          dateCompleted: l.implementation.dateCompleted ? new Date(l.implementation.dateCompleted) : undefined
        } : undefined
      }));
      setLearnings(parsed);
    }

    if (savedActionPlans) {
      const parsed = JSON.parse(savedActionPlans).map((a: any) => ({
        ...a,
        createdAt: new Date(a.createdAt),
        deadline: a.deadline ? new Date(a.deadline) : undefined,
        steps: a.steps.map((s: any) => ({
          ...s,
          completedAt: s.completedAt ? new Date(s.completedAt) : undefined
        }))
      }));
      setActionPlans(parsed);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tactical_learnings', JSON.stringify(learnings));
  }, [learnings]);

  useEffect(() => {
    localStorage.setItem('tactical_action_plans', JSON.stringify(actionPlans));
  }, [actionPlans]);

  const addLearning = () => {
    if (!newLearning.title.trim() || !newLearning.content.trim()) return;

    const learning: Learning = {
      id: Date.now().toString(),
      title: newLearning.title,
      content: newLearning.content,
      source: newLearning.source,
      category: newLearning.category,
      priority: newLearning.priority,
      dateCreated: new Date(),
      tags: newLearning.tags
    };

    setLearnings(prev => [learning, ...prev]);
    setNewLearning({
      title: '',
      content: '',
      source: '',
      category: 'MINDSET',
      priority: 'MEDIUM',
      tags: []
    });
    setShowNewLearning(false);
  };

  const addImplementation = (learningId: string, action: string) => {
    const implementation: Implementation = {
      id: Date.now().toString(),
      action,
      status: 'PLANNED',
      notes: ''
    };

    setLearnings(prev => prev.map(l => 
      l.id === learningId ? { ...l, implementation } : l
    ));
  };

  const updateImplementationStatus = (learningId: string, status: Implementation['status'], results?: string) => {
    setLearnings(prev => prev.map(l => {
      if (l.id === learningId && l.implementation) {
        const updatedImplementation = {
          ...l.implementation,
          status,
          results: results || l.implementation.results
        };

        if (status === 'IN_PROGRESS' && !l.implementation.dateStarted) {
          updatedImplementation.dateStarted = new Date();
        }
        if (status === 'COMPLETED') {
          updatedImplementation.dateCompleted = new Date();
        }

        return { ...l, implementation: updatedImplementation };
      }
      return l;
    }));
  };

  const addActionPlan = () => {
    if (!newActionPlan.title.trim() || !newActionPlan.learningId) return;

    const actionPlan: ActionPlan = {
      id: Date.now().toString(),
      learningId: newActionPlan.learningId,
      title: newActionPlan.title,
      description: newActionPlan.description,
      steps: newActionPlan.steps.filter(s => s.trim()).map(s => ({
        id: Date.now().toString() + Math.random(),
        description: s,
        completed: false
      })),
      deadline: newActionPlan.deadline ? new Date(newActionPlan.deadline) : undefined,
      status: 'ACTIVE',
      createdAt: new Date()
    };

    setActionPlans(prev => [actionPlan, ...prev]);
    setNewActionPlan({
      learningId: '',
      title: '',
      description: '',
      steps: [''],
      deadline: ''
    });
    setShowNewActionPlan(false);
  };

  const toggleActionStep = (planId: string, stepId: string) => {
    setActionPlans(prev => prev.map(plan => {
      if (plan.id === planId) {
        const updatedSteps = plan.steps.map(step => {
          if (step.id === stepId) {
            return {
              ...step,
              completed: !step.completed,
              completedAt: !step.completed ? new Date() : undefined
            };
          }
          return step;
        });

        const allCompleted = updatedSteps.every(step => step.completed);
        return {
          ...plan,
          steps: updatedSteps,
          status: allCompleted ? 'COMPLETED' : 'ACTIVE'
        };
      }
      return plan;
    }));
  };

  const filteredLearnings = learnings.filter(learning => {
    const matchesSearch = learning.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learning.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learning.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         learning.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = filterCategory === 'ALL' || learning.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getAnalytics = () => {
    const totalLearnings = learnings.length;
    const implementedLearnings = learnings.filter(l => l.implementation?.status === 'COMPLETED').length;
    const activeImplementations = learnings.filter(l => l.implementation?.status === 'IN_PROGRESS').length;
    const totalActionPlans = actionPlans.length;
    const completedPlans = actionPlans.filter(p => p.status === 'COMPLETED').length;
    
    const categoryBreakdown = LEARNING_CATEGORIES.map(cat => ({
      category: cat,
      count: learnings.filter(l => l.category === cat).length
    }));

    return {
      totalLearnings,
      implementedLearnings,
      activeImplementations,
      totalActionPlans,
      completedPlans,
      implementationRate: totalLearnings > 0 ? Math.round((implementedLearnings / totalLearnings) * 100) : 0,
      categoryBreakdown
    };
  };

  const analytics = getAnalytics();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-2">🎯 TACTICAL LEARNING ARSENAL</h1>
        <p className="text-gray-300">Capture wisdom • Plan implementation • Track tactical growth</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700">
        {[
          { id: 'learnings', label: 'INTELLIGENCE LOGS', icon: '📚' },
          { id: 'actions', label: 'ACTION PLANS', icon: '⚔️' },
          { id: 'analytics', label: 'MISSION METRICS', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'learnings' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search learnings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="ALL">All Categories</option>
                {LEARNING_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setShowNewLearning(true)}
              className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              ➕ NEW LEARNING
            </button>
          </div>

          {/* New Learning Form */}
          {showNewLearning && (
            <div className="bg-gray-800 border border-red-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">🎯 CAPTURE NEW INTELLIGENCE</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Learning Title</label>
                  <input
                    type="text"
                    value={newLearning.title}
                    onChange={(e) => setNewLearning(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="Key insight or lesson learned"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
                  <input
                    type="text"
                    value={newLearning.source}
                    onChange={(e) => setNewLearning(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="Book, person, experience, etc."
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={newLearning.category}
                    onChange={(e) => setNewLearning(prev => ({ ...prev, category: e.target.value as Learning['category'] }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    {LEARNING_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                  <select
                    value={newLearning.priority}
                    onChange={(e) => setNewLearning(prev => ({ ...prev, priority: e.target.value as Learning['priority'] }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    {PRIORITY_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Learning Content</label>
                <textarea
                  value={newLearning.content}
                  onChange={(e) => setNewLearning(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-32"
                  placeholder="Detailed explanation of the learning, insight, or lesson..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowNewLearning(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={addLearning}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
                >
                  Save Learning
                </button>
              </div>
            </div>
          )}

          {/* Learnings List */}
          <div className="space-y-4">
            {filteredLearnings.map(learning => (
              <div key={learning.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{learning.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        learning.category === 'MINDSET' ? 'bg-purple-900 text-purple-300' :
                        learning.category === 'STRATEGY' ? 'bg-blue-900 text-blue-300' :
                        learning.category === 'TACTICAL' ? 'bg-red-900 text-red-300' :
                        learning.category === 'PHILOSOPHY' ? 'bg-yellow-900 text-yellow-300' :
                        learning.category === 'LEADERSHIP' ? 'bg-green-900 text-green-300' :
                        'bg-gray-900 text-gray-300'
                      }`}>
                        {learning.category}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        learning.priority === 'HIGH' ? 'bg-red-900 text-red-300' :
                        learning.priority === 'MEDIUM' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-900 text-gray-300'
                      }`}>
                        {learning.priority}
                      </span>
                      <span>Source: {learning.source || 'Unknown'}</span>
                      <span>{learning.dateCreated.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{learning.content}</p>
                
                {/* Implementation Status */}
                {learning.implementation ? (
                  <div className="bg-gray-900 border border-gray-600 rounded p-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-green-400">Implementation Plan</h4>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        learning.implementation.status === 'COMPLETED' ? 'bg-green-900 text-green-300' :
                        learning.implementation.status === 'IN_PROGRESS' ? 'bg-yellow-900 text-yellow-300' :
                        learning.implementation.status === 'FAILED' ? 'bg-red-900 text-red-300' :
                        'bg-gray-900 text-gray-300'
                      }`}>
                        {learning.implementation.status}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{learning.implementation.action}</p>
                    {learning.implementation.results && (
                      <p className="text-green-300 text-sm">Results: {learning.implementation.results}</p>
                    )}
                    
                    {learning.implementation.status !== 'COMPLETED' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateImplementationStatus(learning.id, 'IN_PROGRESS')}
                          className="text-yellow-400 hover:text-yellow-300 text-sm"
                        >
                          Start Implementation
                        </button>
                        <button
                          onClick={() => {
                            const results = prompt('Enter implementation results:');
                            if (results) updateImplementationStatus(learning.id, 'COMPLETED', results);
                          }}
                          className="text-green-400 hover:text-green-300 text-sm"
                        >
                          Mark Complete
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      const action = prompt('What action will you take based on this learning?');
                      if (action) addImplementation(learning.id, action);
                    }}
                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-sm font-semibold"
                  >
                    ➕ Plan Implementation
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'actions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-red-400">🚀 TACTICAL ACTION PLANS</h2>
            <button
              onClick={() => setShowNewActionPlan(true)}
              className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg font-semibold"
            >
              ➕ NEW ACTION PLAN
            </button>
          </div>

          {/* New Action Plan Form */}
          {showNewActionPlan && (
            <div className="bg-gray-800 border border-red-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-400 mb-4">📋 CREATE ACTION PLAN</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Related Learning</label>
                  <select
                    value={newActionPlan.learningId}
                    onChange={(e) => setNewActionPlan(prev => ({ ...prev, learningId: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Select a learning</option>
                    {learnings.map(learning => (
                      <option key={learning.id} value={learning.id}>{learning.title}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Plan Title</label>
                  <input
                    type="text"
                    value={newActionPlan.title}
                    onChange={(e) => setNewActionPlan(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    placeholder="Action plan title"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={newActionPlan.description}
                  onChange={(e) => setNewActionPlan(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
                  placeholder="Detailed description of the action plan..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Action Steps</label>
                {newActionPlan.steps.map((step, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => {
                        const newSteps = [...newActionPlan.steps];
                        newSteps[index] = e.target.value;
                        setNewActionPlan(prev => ({ ...prev, steps: newSteps }));
                      }}
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      placeholder={`Step ${index + 1}`}
                    />
                    {newActionPlan.steps.length > 1 && (
                      <button
                        onClick={() => {
                          const newSteps = newActionPlan.steps.filter((_, i) => i !== index);
                          setNewActionPlan(prev => ({ ...prev, steps: newSteps }));
                        }}
                        className="text-red-400 hover:text-red-300 px-2"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setNewActionPlan(prev => ({ ...prev, steps: [...prev.steps, ''] }))}
                  className="text-green-400 hover:text-green-300 text-sm"
                >
                  ➕ Add Step
                </button>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowNewActionPlan(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={addActionPlan}
                  className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
                >
                  Create Plan
                </button>
              </div>
            </div>
          )}

          {/* Action Plans List */}
          <div className="space-y-4">
            {actionPlans.map(plan => {
              const relatedLearning = learnings.find(l => l.id === plan.learningId);
              const completedSteps = plan.steps.filter(step => step.completed).length;
              const progressPercent = plan.steps.length > 0 ? (completedSteps / plan.steps.length) * 100 : 0;

              return (
                <div key={plan.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{plan.title}</h3>
                      {relatedLearning && (
                        <p className="text-gray-400 text-sm">Related to: {relatedLearning.title}</p>
                      )}
                      <p className="text-gray-300 mt-2">{plan.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      plan.status === 'COMPLETED' ? 'bg-green-900 text-green-300' :
                      plan.status === 'ACTIVE' ? 'bg-blue-900 text-blue-300' :
                      'bg-gray-900 text-gray-300'
                    }`}>
                      {plan.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progress</span>
                      <span>{completedSteps}/{plan.steps.length} steps completed</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Steps */}
                  <div className="space-y-2">
                    {plan.steps.map(step => (
                      <div key={step.id} className="flex items-center gap-3 p-3 bg-gray-900 rounded">
                        <input
                          type="checkbox"
                          checked={step.completed}
                          onChange={() => toggleActionStep(plan.id, step.id)}
                          className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
                        />
                        <span className={`flex-1 ${step.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                          {step.description}
                        </span>
                        {step.completed && step.completedAt && (
                          <span className="text-green-400 text-xs">
                            ✓ {step.completedAt.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-red-400">📊 TACTICAL INTELLIGENCE METRICS</h2>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white">{analytics.totalLearnings}</div>
              <div className="text-gray-400 text-sm">Total Learnings</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400">{analytics.implementedLearnings}</div>
              <div className="text-gray-400 text-sm">Implemented</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400">{analytics.activeImplementations}</div>
              <div className="text-gray-400 text-sm">In Progress</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400">{analytics.totalActionPlans}</div>
              <div className="text-gray-400 text-sm">Action Plans</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-400">{analytics.implementationRate}%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Learning Categories</h3>
            <div className="space-y-3">
              {analytics.categoryBreakdown.map(({ category, count }) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-300">{category}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${analytics.totalLearnings > 0 ? (count / analytics.totalLearnings) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-white font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}