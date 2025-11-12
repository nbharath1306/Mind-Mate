'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Calendar, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Heart,
  Smile,
  Meh,
  Frown,
  BarChart3,
  Plus
} from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { MoodTracker } from '@/components/dashboard/MoodTracker';
import { QuickJournal } from '@/components/dashboard/QuickJournal';
import { CommunityFeed } from '@/components/dashboard/CommunityFeed';
import { MoodEntry, JournalEntry } from '@/types';
import { format } from 'date-fns';

export function DashboardContent() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'mood' | 'journal' | 'community'>('overview');
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [recentJournals, setRecentJournals] = useState<JournalEntry[]>([]);

  // Mock data - in real app, this would come from Firebase
  useEffect(() => {
    // Mock recent mood data
    setRecentMoods([
      {
        id: '1',
        userId: user?.id || '',
        mood: 4,
        moodLabel: 'Good',
        note: 'Feeling productive today!',
        createdAt: new Date(),
      },
      {
        id: '2',
        userId: user?.id || '',
        mood: 3,
        moodLabel: 'Okay',
        createdAt: new Date(Date.now() - 86400000), // Yesterday
      },
    ]);

    // Mock recent journal data
    setRecentJournals([
      {
        id: '1',
        userId: user?.id || '',
        title: 'Reflecting on Today',
        content: 'Had a good conversation with a friend about setting boundaries...',
        tags: ['reflection', 'friendship'],
        isPrivate: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }, [user?.id]);

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="h-5 w-5 text-green-500" />;
    if (mood === 3) return <Meh className="h-5 w-5 text-yellow-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.displayName || (user?.isAnonymous ? 'Anonymous Warrior' : 'Friend');

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Header */}
      <header className="bg-navy-800 border-b border-navy-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Brain className="h-8 w-8 text-primary-500" />
            <div>
              <h1 className="text-xl font-bold text-white">
                {getGreeting()}, {userName}! 👋
              </h1>
              <p className="text-gray-400 text-sm">
                {format(new Date(), 'EEEE, MMMM do, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Quick Entry</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-navy-800 px-6 py-2 border-b border-navy-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  selectedTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-navy-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {selectedTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Mood Streak</p>
                      <p className="text-2xl font-bold text-white">7 days</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Journal Entries</p>
                      <p className="text-2xl font-bold text-white">12</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-primary-500" />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Community Karma</p>
                      <p className="text-2xl font-bold text-white">45</p>
                    </div>
                    <Heart className="h-8 w-8 text-teal-500" />
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary-500" />
                  Recent Activity
                </h3>
                
                <div className="space-y-4">
                  {recentMoods.slice(0, 3).map((mood) => (
                    <div key={mood.id} className="flex items-center justify-between p-3 bg-navy-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getMoodIcon(mood.mood)}
                        <div>
                          <p className="text-white font-medium">Mood: {mood.moodLabel}</p>
                          <p className="text-gray-400 text-sm">
                            {format(mood.createdAt, 'MMM d, h:mm a')}
                          </p>
                        </div>
                      </div>
                      {mood.note && (
                        <p className="text-gray-300 text-sm max-w-xs truncate">
                          "{mood.note}"
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {recentJournals.slice(0, 2).map((journal) => (
                    <div key={journal.id} className="flex items-center justify-between p-3 bg-navy-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-primary-500" />
                        <div>
                          <p className="text-white font-medium">{journal.title}</p>
                          <p className="text-gray-400 text-sm">
                            {format(journal.createdAt, 'MMM d, h:mm a')}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm max-w-xs truncate">
                        {journal.content}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-6">
              <MoodTracker />
              <QuickJournal />
            </div>
          </div>
        )}

        {selectedTab === 'mood' && <MoodTracker expanded />}
        {selectedTab === 'journal' && <QuickJournal expanded />}
        {selectedTab === 'community' && <CommunityFeed />}
      </main>
    </div>
  );
}

const tabs = [
  { id: 'overview' as const, label: 'Overview', icon: BarChart3 },
  { id: 'mood' as const, label: 'Mood Tracker', icon: Heart },
  { id: 'journal' as const, label: 'Journal', icon: BookOpen },
  { id: 'community' as const, label: 'Community', icon: Users },
];