export interface User {
  id: string;
  email?: string;
  displayName?: string;
  isAnonymous: boolean;
  createdAt: Date;
  lastLogin: Date;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: 1 | 2 | 3 | 4 | 5; // 1 = Very Low, 5 = Great
  moodLabel: 'Very Low' | 'Low' | 'Okay' | 'Good' | 'Great';
  note?: string;
  createdAt: Date;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  prompt?: string;
  tags: string[];
  mood?: number;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  authorName: string; // Anonymous names like "Anonymous Warrior", "Mindful Student"
  title: string;
  content: string;
  category: 'study-stress' | 'relationships' | 'career' | 'motivation' | 'general' | 'fitness' | 'anxiety';
  tags: string[];
  likes: number;
  likedBy: string[];
  replies: CommunityReply[];
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityReply {
  id: string;
  userId: string;
  authorName: string;
  content: string;
  likes: number;
  likedBy: string[];
  createdAt: Date;
}

export interface GrowthCapsule {
  id: string;
  title: string;
  description: string;
  content: string;
  audioUrl?: string;
  imageUrl?: string;
  category: 'confidence' | 'focus' | 'habits' | 'stress-relief' | 'motivation' | 'mindfulness';
  duration: number; // in minutes
  isPremium: boolean;
  tags: string[];
  views: number;
  likes: number;
  createdAt: Date;
}

export interface UserStats {
  userId: string;
  journalStreak: number;
  moodTrackedDays: number;
  totalJournalEntries: number;
  totalMoodEntries: number;
  communityPosts: number;
  communityLikes: number;
  joinedAt: Date;
  lastActivity: Date;
}

export type MoodColor = {
  bg: string;
  text: string;
  emoji: string;
};

export type ThemeMode = 'light' | 'dark';

export interface NotificationPreferences {
  dailyReminder: boolean;
  journalReminder: boolean;
  communityUpdates: boolean;
  moodCheckIn: boolean;
  reminderTime: string; // HH:MM format
}

export interface UserProfile {
  userId: string;
  preferences: {
    theme: ThemeMode;
    notifications: NotificationPreferences;
    privacy: {
      showInCommunity: boolean;
      allowDirectMessages: boolean;
    };
  };
  goals: {
    journalFrequency: 'daily' | 'weekly' | 'custom';
    moodTracking: boolean;
    communityParticipation: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}