'use client';

import { useState, useEffect } from 'react';

interface Recommendation {
  id: string;
  scenario: string;
  category: 'MINDSET' | 'RELATIONSHIP' | 'CAREER' | 'HEALTH' | 'EMERGENCY' | 'GROWTH';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  recommendations: TacticalAction[];
  context?: string;
  dateCreated: Date;
  isUsed?: boolean;
  feedback?: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
}

interface TacticalAction {
  id: string;
  action: string;
  timeframe: 'IMMEDIATE' | 'SHORT_TERM' | 'LONG_TERM';
  difficulty: 'EASY' | 'MODERATE' | 'HARD' | 'EXTREME';
  description: string;
  resources?: string[];
}

interface Scenario {
  id: string;
  title: string;
  category: Recommendation['category'];
  description: string;
  commonContext: string[];
}

const TACTICAL_SCENARIOS: Scenario[] = [
  {
    id: '1',
    title: 'Overwhelming Anxiety/Panic',
    category: 'MINDSET',
    description: 'Feeling overwhelmed, anxious, or experiencing panic attacks',
    commonContext: ['work stress', 'social anxiety', 'financial pressure', 'health concerns']
  },
  {
    id: '2',
    title: 'Relationship Conflict',
    category: 'RELATIONSHIP',
    description: 'Arguments, misunderstandings, or communication breakdown',
    commonContext: ['partner disagreement', 'family tension', 'friend conflict', 'workplace drama']
  },
  {
    id: '3',
    title: 'Career Stagnation',
    category: 'CAREER',
    description: 'Feeling stuck, undervalued, or unclear about professional direction',
    commonContext: ['promotion denial', 'job dissatisfaction', 'skill gaps', 'industry change']
  },
  {
    id: '4',
    title: 'Physical Health Decline',
    category: 'HEALTH',
    description: 'Physical fitness, energy levels, or health concerns',
    commonContext: ['weight gain', 'fatigue', 'poor sleep', 'injury recovery']
  },
  {
    id: '5',
    title: 'Emergency Crisis',
    category: 'EMERGENCY',
    description: 'Unexpected crisis requiring immediate tactical response',
    commonContext: ['financial emergency', 'job loss', 'health crisis', 'family emergency']
  },
  {
    id: '6',
    title: 'Personal Growth Plateau',
    category: 'GROWTH',
    description: 'Lack of progress, motivation, or direction in personal development',
    commonContext: ['lost motivation', 'skill plateau', 'unclear goals', 'comfort zone']
  }
];

const TACTICAL_RESPONSES: Record<string, TacticalAction[]> = {
  '1': [ // Overwhelming Anxiety/Panic
    {
      id: '1-1',
      action: 'Execute Tactical Breathing Protocol',
      timeframe: 'IMMEDIATE',
      difficulty: 'EASY',
      description: '4-7-8 breathing: Inhale 4, hold 7, exhale 8. Repeat 4 cycles to activate parasympathetic nervous system.',
      resources: ['Timer app', 'Quiet space']
    },
    {
      id: '1-2',
      action: 'Deploy Ground-and-Center Technique',
      timeframe: 'IMMEDIATE',
      difficulty: 'EASY',
      description: '5-4-3-2-1 technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.',
      resources: ['Present moment awareness']
    },
    {
      id: '1-3',
      action: 'Initiate Physical Movement Protocol',
      timeframe: 'SHORT_TERM',
      difficulty: 'MODERATE',
      description: '20 minutes of intense physical exercise to metabolize stress hormones and release endorphins.',
      resources: ['Exercise equipment', 'Outdoor space']
    },
    {
      id: '1-4',
      action: 'Establish Daily Stress Inoculation',
      timeframe: 'LONG_TERM',
      difficulty: 'HARD',
      description: 'Daily meditation, cold exposure, and controlled stress training to build mental resilience.',
      resources: ['Meditation app', 'Cold shower access', 'Stress training program']
    }
  ],
  '2': [ // Relationship Conflict
    {
      id: '2-1',
      action: 'Execute Strategic Pause',
      timeframe: 'IMMEDIATE',
      difficulty: 'MODERATE',
      description: 'Take 24-hour cooling period before responding. Prevents emotional damage and allows strategic thinking.',
      resources: ['Self-control', 'Alternative activities']
    },
    {
      id: '2-2',
      action: 'Deploy Active Listening Protocol',
      timeframe: 'SHORT_TERM',
      difficulty: 'MODERATE',
      description: 'Focus on understanding their position first. Repeat back what you heard before presenting your view.',
      resources: ['Patience', 'Emotional regulation']
    },
    {
      id: '2-3',
      action: 'Initiate Solution-Focused Dialogue',
      timeframe: 'SHORT_TERM',
      difficulty: 'HARD',
      description: 'Move from blame to problem-solving. Focus on "How do we fix this?" instead of "Who was wrong?"',
      resources: ['Communication skills', 'Neutral meeting space']
    },
    {
      id: '2-4',
      action: 'Establish Relationship Maintenance Systems',
      timeframe: 'LONG_TERM',
      difficulty: 'HARD',
      description: 'Regular check-ins, appreciation practices, and conflict resolution frameworks.',
      resources: ['Calendar system', 'Relationship education', 'Counseling if needed']
    }
  ],
  '3': [ // Career Stagnation
    {
      id: '3-1',
      action: 'Conduct Skills Gap Analysis',
      timeframe: 'IMMEDIATE',
      difficulty: 'MODERATE',
      description: 'List current skills vs required skills for target position. Identify the 3 most critical gaps.',
      resources: ['Job descriptions', 'Industry research', 'Skills assessment tools']
    },
    {
      id: '3-2',
      action: 'Deploy Visibility Enhancement',
      timeframe: 'SHORT_TERM',
      difficulty: 'MODERATE',
      description: 'Volunteer for high-visibility projects, share wins with leadership, document achievements.',
      resources: ['Project opportunities', 'Internal networking', 'Achievement tracking']
    },
    {
      id: '3-3',
      action: 'Execute Skill Acquisition Campaign',
      timeframe: 'SHORT_TERM',
      difficulty: 'HARD',
      description: 'Intensive learning plan for identified skill gaps. Aim for demonstrable competency in 90 days.',
      resources: ['Learning resources', 'Practice opportunities', 'Mentorship']
    },
    {
      id: '3-4',
      action: 'Establish Professional Intelligence Network',
      timeframe: 'LONG_TERM',
      difficulty: 'EXTREME',
      description: 'Build relationships with industry leaders, join professional organizations, create thought leadership.',
      resources: ['Professional associations', 'Industry events', 'Content creation platform']
    }
  ],
  '4': [ // Physical Health Decline
    {
      id: '4-1',
      action: 'Establish Baseline Metrics',
      timeframe: 'IMMEDIATE',
      difficulty: 'EASY',
      description: 'Record current weight, energy levels (1-10), sleep quality, and basic fitness measurements.',
      resources: ['Scale', 'Measuring tape', 'Fitness tracker', 'Journal']
    },
    {
      id: '4-2',
      action: 'Deploy Minimum Viable Routine',
      timeframe: 'SHORT_TERM',
      difficulty: 'MODERATE',
      description: '10 minutes daily movement, 7+ hours sleep, 1 healthy meal replacement. Build consistency first.',
      resources: ['Timer', 'Basic equipment', 'Healthy food options']
    },
    {
      id: '4-3',
      action: 'Initiate Progressive Overload Protocol',
      timeframe: 'SHORT_TERM',
      difficulty: 'HARD',
      description: 'Gradually increase exercise intensity, duration, and complexity. Track progress weekly.',
      resources: ['Exercise plan', 'Progression tracking', 'Recovery protocols']
    },
    {
      id: '4-4',
      action: 'Establish Warrior Lifestyle Systems',
      timeframe: 'LONG_TERM',
      difficulty: 'EXTREME',
      description: 'Complete lifestyle optimization: nutrition, training, recovery, stress management, supplements.',
      resources: ['Comprehensive plan', 'Professional guidance', 'Long-term commitment']
    }
  ],
  '5': [ // Emergency Crisis
    {
      id: '5-1',
      action: 'Execute Threat Assessment',
      timeframe: 'IMMEDIATE',
      difficulty: 'MODERATE',
      description: 'List immediate threats, available resources, and required actions. Triage by urgency.',
      resources: ['Clear thinking', 'Paper/digital notes', 'Contact list']
    },
    {
      id: '5-2',
      action: 'Deploy Emergency Resource Network',
      timeframe: 'IMMEDIATE',
      difficulty: 'HARD',
      description: 'Contact family, friends, professionals who can provide immediate assistance or guidance.',
      resources: ['Emergency contacts', 'Communication device', 'Courage to ask for help']
    },
    {
      id: '5-3',
      action: 'Initiate Damage Control Operations',
      timeframe: 'SHORT_TERM',
      difficulty: 'EXTREME',
      description: 'Address most critical issues first. Create stability before pursuing optimal solutions.',
      resources: ['Available time', 'Financial resources', 'Professional help']
    },
    {
      id: '5-4',
      action: 'Establish Crisis Prevention Systems',
      timeframe: 'LONG_TERM',
      difficulty: 'HARD',
      description: 'Build emergency fund, develop multiple income streams, strengthen support network.',
      resources: ['Financial planning', 'Skill diversification', 'Relationship building']
    }
  ],
  '6': [ // Personal Growth Plateau
    {
      id: '6-1',
      action: 'Conduct Growth Audit',
      timeframe: 'IMMEDIATE',
      difficulty: 'MODERATE',
      description: 'Analyze last 6 months: What worked? What didn\'t? Where did you improve? Where did you stagnate?',
      resources: ['Journals', 'Data tracking', 'Honest self-reflection']
    },
    {
      id: '6-2',
      action: 'Deploy Discomfort Injection',
      timeframe: 'SHORT_TERM',
      difficulty: 'HARD',
      description: 'Deliberately enter situations that challenge you. Public speaking, cold calling, difficult conversations.',
      resources: ['Courage', 'Support system', 'Recovery plan']
    },
    {
      id: '6-3',
      action: 'Initiate Skill Stack Building',
      timeframe: 'SHORT_TERM',
      difficulty: 'HARD',
      description: 'Combine existing skills in new ways or add complementary skills that create unique value.',
      resources: ['Learning resources', 'Practice opportunities', 'Feedback systems']
    },
    {
      id: '6-4',
      action: 'Establish Continuous Challenge System',
      timeframe: 'LONG_TERM',
      difficulty: 'EXTREME',
      description: 'Create systematic approach to constantly pushing boundaries and expanding capabilities.',
      resources: ['Challenge framework', 'Accountability partner', 'Progress tracking']
    }
  ]
};

export default function AIRecommendations() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [customContext, setCustomContext] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showingRecommendation, setShowingRecommendation] = useState<Recommendation | null>(null);
  const [activeTab, setActiveTab] = useState<'scenarios' | 'history' | 'analytics'>('scenarios');

  // Load recommendations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tactical_recommendations');
    if (saved) {
      const parsed = JSON.parse(saved).map((r: any) => ({
        ...r,
        dateCreated: new Date(r.dateCreated)
      }));
      setRecommendations(parsed);
    }
  }, []);

  // Save recommendations to localStorage
  useEffect(() => {
    localStorage.setItem('tactical_recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  const generateRecommendations = () => {
    if (!selectedScenario) return;

    const tacticalActions = TACTICAL_RESPONSES[selectedScenario.id] || [];
    
    const recommendation: Recommendation = {
      id: Date.now().toString(),
      scenario: selectedScenario.title,
      category: selectedScenario.category,
      priority: determinePriority(selectedScenario.category),
      recommendations: tacticalActions,
      context: customContext || undefined,
      dateCreated: new Date()
    };

    setRecommendations(prev => [recommendation, ...prev]);
    setShowingRecommendation(recommendation);
    setSelectedScenario(null);
    setCustomContext('');
  };

  const determinePriority = (category: Recommendation['category']): Recommendation['priority'] => {
    switch (category) {
      case 'EMERGENCY': return 'CRITICAL';
      case 'HEALTH': return 'HIGH';
      case 'MINDSET': return 'HIGH';
      case 'RELATIONSHIP': return 'MEDIUM';
      case 'CAREER': return 'MEDIUM';
      case 'GROWTH': return 'LOW';
      default: return 'MEDIUM';
    }
  };

  const markAsUsed = (recommendationId: string, feedback?: Recommendation['feedback']) => {
    setRecommendations(prev => prev.map(r => 
      r.id === recommendationId 
        ? { ...r, isUsed: true, feedback }
        : r
    ));
  };

  const getAnalytics = () => {
    const totalRecommendations = recommendations.length;
    const usedRecommendations = recommendations.filter(r => r.isUsed).length;
    const excellentFeedback = recommendations.filter(r => r.feedback === 'EXCELLENT').length;
    const categoryBreakdown = recommendations.reduce((acc, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRecommendations,
      usedRecommendations,
      usageRate: totalRecommendations > 0 ? Math.round((usedRecommendations / totalRecommendations) * 100) : 0,
      excellentFeedback,
      successRate: usedRecommendations > 0 ? Math.round((excellentFeedback / usedRecommendations) * 100) : 0,
      categoryBreakdown
    };
  };

  const analytics = getAnalytics();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-500 mb-2">🤖 TACTICAL AI COMMAND</h1>
        <p className="text-gray-300">AI-powered tactical guidance • Scenario-based recommendations • Combat-tested strategies</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700">
        {[
          { id: 'scenarios', label: 'MISSION SCENARIOS', icon: '🎯' },
          { id: 'history', label: 'COMMAND HISTORY', icon: '📋' },
          { id: 'analytics', label: 'INTEL METRICS', icon: '📊' }
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

      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          {/* Current Recommendation Display */}
          {showingRecommendation && (
            <div className="bg-gray-800 border border-red-500 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-red-400">⚡ TACTICAL RECOMMENDATION DEPLOYED</h3>
                <button
                  onClick={() => setShowingRecommendation(null)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    showingRecommendation.category === 'EMERGENCY' ? 'bg-red-900 text-red-300' :
                    showingRecommendation.category === 'HEALTH' ? 'bg-green-900 text-green-300' :
                    showingRecommendation.category === 'MINDSET' ? 'bg-purple-900 text-purple-300' :
                    showingRecommendation.category === 'RELATIONSHIP' ? 'bg-pink-900 text-pink-300' :
                    showingRecommendation.category === 'CAREER' ? 'bg-blue-900 text-blue-300' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {showingRecommendation.category}
                  </span>
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    showingRecommendation.priority === 'CRITICAL' ? 'bg-red-900 text-red-300' :
                    showingRecommendation.priority === 'HIGH' ? 'bg-orange-900 text-orange-300' :
                    showingRecommendation.priority === 'MEDIUM' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-gray-900 text-gray-300'
                  }`}>
                    {showingRecommendation.priority} PRIORITY
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">SCENARIO: {showingRecommendation.scenario}</h4>
                {showingRecommendation.context && (
                  <p className="text-gray-400 mb-4">CONTEXT: {showingRecommendation.context}</p>
                )}
              </div>

              <div className="space-y-4">
                <h5 className="font-semibold text-green-400">🎯 TACTICAL ACTIONS:</h5>
                {showingRecommendation.recommendations.map(action => (
                  <div key={action.id} className="bg-gray-900 border border-gray-600 rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h6 className="font-semibold text-white">{action.action}</h6>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          action.timeframe === 'IMMEDIATE' ? 'bg-red-800 text-red-300' :
                          action.timeframe === 'SHORT_TERM' ? 'bg-yellow-800 text-yellow-300' :
                          'bg-blue-800 text-blue-300'
                        }`}>
                          {action.timeframe}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          action.difficulty === 'EASY' ? 'bg-green-800 text-green-300' :
                          action.difficulty === 'MODERATE' ? 'bg-yellow-800 text-yellow-300' :
                          action.difficulty === 'HARD' ? 'bg-orange-800 text-orange-300' :
                          'bg-red-800 text-red-300'
                        }`}>
                          {action.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{action.description}</p>
                    {action.resources && action.resources.length > 0 && (
                      <div className="text-sm text-gray-400">
                        <strong>Resources needed:</strong> {action.resources.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-600">
                <h6 className="text-sm font-semibold text-gray-400 mb-3">MISSION FEEDBACK:</h6>
                <div className="flex gap-2">
                  {['EXCELLENT', 'GOOD', 'FAIR', 'POOR'].map(feedback => (
                    <button
                      key={feedback}
                      onClick={() => markAsUsed(showingRecommendation.id, feedback as Recommendation['feedback'])}
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        feedback === 'EXCELLENT' ? 'bg-green-600 hover:bg-green-500 text-white' :
                        feedback === 'GOOD' ? 'bg-blue-600 hover:bg-blue-500 text-white' :
                        feedback === 'FAIR' ? 'bg-yellow-600 hover:bg-yellow-500 text-white' :
                        'bg-red-600 hover:bg-red-500 text-white'
                      }`}
                    >
                      {feedback}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scenario Selection */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">🎯 SELECT MISSION SCENARIO</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {TACTICAL_SCENARIOS.map(scenario => (
                <div
                  key={scenario.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedScenario?.id === scenario.id
                      ? 'border-red-500 bg-red-900/20'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-900'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">{scenario.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      scenario.category === 'EMERGENCY' ? 'bg-red-800 text-red-300' :
                      scenario.category === 'HEALTH' ? 'bg-green-800 text-green-300' :
                      scenario.category === 'MINDSET' ? 'bg-purple-800 text-purple-300' :
                      scenario.category === 'RELATIONSHIP' ? 'bg-pink-800 text-pink-300' :
                      scenario.category === 'CAREER' ? 'bg-blue-800 text-blue-300' :
                      'bg-yellow-800 text-yellow-300'
                    }`}>
                      {scenario.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{scenario.description}</p>
                  <div className="text-xs text-gray-500">
                    Common contexts: {scenario.commonContext.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            {selectedScenario && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Context (Optional)
                  </label>
                  <textarea
                    value={customContext}
                    onChange={(e) => setCustomContext(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
                    placeholder="Provide specific details about your situation for more targeted recommendations..."
                  />
                </div>

                <button
                  onClick={generateRecommendations}
                  className="w-full bg-red-600 hover:bg-red-500 px-6 py-3 rounded-lg font-semibold text-lg"
                >
                  🚀 DEPLOY TACTICAL RECOMMENDATIONS
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-red-400">📋 COMMAND HISTORY</h2>
          
          {recommendations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No tactical recommendations generated yet.</p>
              <p className="text-sm">Switch to MISSION SCENARIOS to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map(recommendation => (
                <div key={recommendation.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{recommendation.scenario}</h4>
                      <p className="text-sm text-gray-400">{recommendation.dateCreated.toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        recommendation.priority === 'CRITICAL' ? 'bg-red-800 text-red-300' :
                        recommendation.priority === 'HIGH' ? 'bg-orange-800 text-orange-300' :
                        recommendation.priority === 'MEDIUM' ? 'bg-yellow-800 text-yellow-300' :
                        'bg-gray-800 text-gray-300'
                      }`}>
                        {recommendation.priority}
                      </span>
                      {recommendation.isUsed && (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-green-800 text-green-300">
                          EXECUTED
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 mb-3">
                    {recommendation.recommendations.length} tactical actions recommended
                  </p>

                  {recommendation.feedback && (
                    <div className="text-sm">
                      <span className="text-gray-400">Feedback: </span>
                      <span className={`font-semibold ${
                        recommendation.feedback === 'EXCELLENT' ? 'text-green-400' :
                        recommendation.feedback === 'GOOD' ? 'text-blue-400' :
                        recommendation.feedback === 'FAIR' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {recommendation.feedback}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => setShowingRecommendation(recommendation)}
                    className="mt-3 text-red-400 hover:text-red-300 text-sm font-semibold"
                  >
                    ▶ Review Recommendations
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-red-400">📊 TACTICAL INTELLIGENCE</h2>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white">{analytics.totalRecommendations}</div>
              <div className="text-gray-400 text-sm">Total Missions</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400">{analytics.usedRecommendations}</div>
              <div className="text-gray-400 text-sm">Executed</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400">{analytics.usageRate}%</div>
              <div className="text-gray-400 text-sm">Usage Rate</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-yellow-400">{analytics.excellentFeedback}</div>
              <div className="text-gray-400 text-sm">Excellent Results</div>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-400">{analytics.successRate}%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Mission Categories</h3>
            <div className="space-y-3">
              {Object.entries(analytics.categoryBreakdown).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-300">{category}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ 
                          width: `${analytics.totalRecommendations > 0 ? (count / analytics.totalRecommendations) * 100 : 0}%` 
                        }}
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